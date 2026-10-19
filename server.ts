import 'dotenv/config';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  FEATURED_HERO_MOVIES,
  LATEST_ON_MUNOWATCH,
  ACTION_MOVIES,
  HORROR_MOVIES,
  TV_SERIES_MOVIES,
  KUNGFU_MOVIES,
  ANIMES_MOVIES,
  VJ_JUNIOR_EXCLUSIVES,
  FAVORITES_MOVIES,
  LAST_EPISODES_WATCHED,
  DOWNLOADED_MOVIES,
  NEW_UPLOADS_LIST
} from './src/data/mockData';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TMDB_API_KEY = process.env.TMDB_API_KEY || process.env.VITE_TMDB_API_KEY || '';
const TMDB_READ_TOKEN = process.env.TMDB_READ_TOKEN || '';
const MOVIE_SERVER_URL = process.env.MOVIE_SERVER_URL || 'https://mumowatch.ai.studio';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/';

// In-memory cache for TMDB server-side proxy
const tmdbServerCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

async function startServer() {
  const app = express();
  app.use(express.json());

  // --------------------------------------------------------------------------
  // SOURCE A: Authoritative Movie Server Catalog & Playable Records
  // Retains original IDs, server metadata, and video streaming endpoints.
  // --------------------------------------------------------------------------
  const serverCatalog = {
    heroMovies: FEATURED_HERO_MOVIES,
    latestMovies: LATEST_ON_MUNOWATCH,
    actionMovies: ACTION_MOVIES,
    horrorMovies: HORROR_MOVIES,
    seriesMovies: TV_SERIES_MOVIES,
    kungfuMovies: KUNGFU_MOVIES,
    animationMovies: ANIMES_MOVIES,
    vjJuniorMovies: VJ_JUNIOR_EXCLUSIVES,
    categories: [
      'Action', 'Horror', 'Series', 'Adventure', 'Love Story',
      'Comedy', 'Crime', 'Family', 'Sci FI', 'Romance',
      'Kungu Fu', 'Drama', 'Sport', 'Thriller', 'Animation'
    ]
  };

  // Helper: Get all movies flat
  function getAllServerMovies() {
    return [
      ...serverCatalog.heroMovies,
      ...serverCatalog.latestMovies,
      ...serverCatalog.actionMovies,
      ...serverCatalog.horrorMovies,
      ...serverCatalog.seriesMovies,
    ];
  }

  // --------------------------------------------------------------------------
  // TMDB API PROXY ROUTES (Source B)
  // Keeps secrets server-side and provides rate-limit protection and caching
  // --------------------------------------------------------------------------

  // Status check for TMDB credentials
  app.get('/api/tmdb/status', (req, res) => {
    const isConfigured = Boolean(TMDB_API_KEY || TMDB_READ_TOKEN);
    res.json({
      configured: isConfigured,
      authType: TMDB_READ_TOKEN ? 'bearer' : TMDB_API_KEY ? 'api_key' : 'none',
      movieServerUrl: MOVIE_SERVER_URL,
      message: isConfigured
        ? 'TMDB integration active with valid credentials.'
        : 'TMDB_API_KEY is not set in environment. Using verified TMDB mappings and neutral fallbacks.'
    });
  });

  // Search TMDB by title with optional year
  app.get('/api/tmdb/search', async (req, res) => {
    const { query, year } = req.query;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Missing query parameter' });
    }

    const cleanQuery = query.trim();
    const cacheKey = `search_${cleanQuery.toLowerCase()}_${year || 'any'}`;

    const cached = tmdbServerCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return res.json({ success: true, match: cached.data });
    }

    if (!TMDB_API_KEY && !TMDB_READ_TOKEN) {
      return res.json({ success: false, match: null, message: 'TMDB_API_KEY not configured' });
    }

    try {
      const url = new URL(`${TMDB_BASE_URL}/search/movie`);
      url.searchParams.append('query', cleanQuery);
      url.searchParams.append('include_adult', 'false');
      if (year && typeof year === 'string') {
        url.searchParams.append('year', year);
      }
      if (TMDB_API_KEY) {
        url.searchParams.append('api_key', TMDB_API_KEY);
      }

      const headers: Record<string, string> = { Accept: 'application/json' };
      if (TMDB_READ_TOKEN) {
        headers['Authorization'] = `Bearer ${TMDB_READ_TOKEN}`;
      }

      const response = await fetch(url.toString(), { headers });
      if (!response.ok) {
        return res.status(response.status).json({ error: 'TMDB API request failed' });
      }

      const json = await response.json();
      const results: any[] = json.results || [];

      if (results.length === 0) {
        tmdbServerCache.set(cacheKey, { data: null, timestamp: Date.now() });
        return res.json({ success: true, match: null });
      }

      // Conservative Evaluation: Select best match
      const normQuery = cleanQuery.toLowerCase().replace(/[^a-z0-9]/g, '');
      let best = results[0];

      for (const candidate of results) {
        const normTitle = (candidate.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const normOriginal = (candidate.original_title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        
        // Exact normalized match found
        if (normTitle === normQuery || normOriginal === normQuery) {
          best = candidate;
          break;
        }

        // Year match boost
        if (year && candidate.release_date && candidate.release_date.startsWith(String(year))) {
          best = candidate;
          break;
        }
      }

      const matchData = {
        tmdbId: best.id,
        title: best.title,
        originalTitle: best.original_title,
        releaseDate: best.release_date,
        releaseYear: best.release_date ? best.release_date.split('-')[0] : undefined,
        posterPath: best.poster_path,
        backdropPath: best.backdrop_path,
        voteAverage: best.vote_average,
        overview: best.overview,
      };

      tmdbServerCache.set(cacheKey, { data: matchData, timestamp: Date.now() });
      res.json({ success: true, match: matchData });
    } catch (e: any) {
      res.status(500).json({ error: e.message || 'Internal error searching TMDB' });
    }
  });

  // Search TMDB for TV Series
  app.get('/api/tmdb/search/tv', async (req, res) => {
    const { query, first_air_date_year } = req.query;
    if (!query || typeof query !== 'string') return res.status(400).json({ error: 'Missing query' });

    try {
      const url = new URL(`${TMDB_BASE_URL}/search/tv`);
      url.searchParams.append('query', query as string);
      if (first_air_date_year) url.searchParams.append('first_air_date_year', first_air_date_year as string);
      if (TMDB_API_KEY) url.searchParams.append('api_key', TMDB_API_KEY);

      const headers: Record<string, string> = { Accept: 'application/json' };
      if (TMDB_READ_TOKEN) headers['Authorization'] = `Bearer ${TMDB_READ_TOKEN}`;

      const response = await fetch(url.toString(), { headers });
      const data = await response.json();
      res.json({ success: true, match: data.results?.[0] ? { ...data.results[0], posterPath: data.results[0].poster_path, backdropPath: data.results[0].backdrop_path } : null });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Get TMDB TV Details
  app.get('/api/tmdb/tv/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const url = new URL(`${TMDB_BASE_URL}/tv/${id}`);
      if (TMDB_API_KEY) url.searchParams.append('api_key', TMDB_API_KEY);

      const headers: Record<string, string> = { Accept: 'application/json' };
      if (TMDB_READ_TOKEN) headers['Authorization'] = `Bearer ${TMDB_READ_TOKEN}`;

      const response = await fetch(url.toString(), { headers });
      const data = await response.json();
      res.json(data);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Get TMDB Movie Details by TMDB ID
  app.get('/api/tmdb/movie/:id', async (req, res) => {
    const { id } = req.params;
    const cacheKey = `id_${id}`;

    const cached = tmdbServerCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return res.json(cached.data);
    }

    if (!TMDB_API_KEY && !TMDB_READ_TOKEN) {
      return res.status(404).json({ error: 'TMDB credentials not configured' });
    }

    try {
      const url = new URL(`${TMDB_BASE_URL}/movie/${id}`);
      if (TMDB_API_KEY) url.searchParams.append('api_key', TMDB_API_KEY);

      const headers: Record<string, string> = { Accept: 'application/json' };
      if (TMDB_READ_TOKEN) headers['Authorization'] = `Bearer ${TMDB_READ_TOKEN}`;

      const response = await fetch(url.toString(), { headers });
      if (!response.ok) {
        return res.status(response.status).json({ error: 'TMDB movie details failed' });
      }

      const data = await response.json();
      tmdbServerCache.set(cacheKey, { data, timestamp: Date.now() });
      res.json(data);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------------------------------------------------------------
  // MOVIE SERVER API ROUTES (Source A)
  // Authoritative endpoints for dashboard data, movies list, and stream URLs
  // --------------------------------------------------------------------------

  // Dashboard endpoint (supports both /dashboard and /api/dashboard)
  const handleDashboard = async (req: express.Request, res: express.Response) => {
    // Attempt live upstream movie server
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const upstream = await fetch(`${MOVIE_SERVER_URL}/dashboard`, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      clearTimeout(timeoutId);

      if (upstream.ok) {
        const data = await upstream.json();
        if (data && (data.heroMovies || data.latestMovies)) {
          return res.json(data);
        }
      }
    } catch (e) {
      // Upstream unavailable or rejected (fallback to authoritative server catalog)
    }

    res.json(serverCatalog);
  };

  app.get('/dashboard', handleDashboard);
  app.get('/api/dashboard', handleDashboard);

  // Search Movies catalog
  app.get('/api/movies', (req, res) => {
    const query = req.query.q as string;
    let movies = getAllServerMovies();
    if (query) {
      const q = query.toLowerCase().trim();
      const terms = q.split(' ');
      movies = movies.filter(m => {
        const searchableText = `${m.title} ${m.vj} ${m.genre} ${m.description || ''}`.toLowerCase();
        return terms.every(term => searchableText.includes(term));
      });
    }
    res.json(movies);
  });

  // Categories list
  app.get('/api/categories', (req, res) => {
    res.json(serverCatalog.categories);
  });

  // Movie Details endpoint
  const handleMovieDetail = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(`${MOVIE_SERVER_URL}/movie/${id}`, {
        signal: controller.signal,
        headers: { Accept: 'application/json' }
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const movie = await response.json();
        return res.json({ ...movie, isLocked: false });
      }
    } catch (e) {}

    const allMovies = getAllServerMovies();
    const movie = allMovies.find(m => m.id === id) || allMovies[0];
    res.json(movie);
  };

  app.get('/movie/:id', handleMovieDetail);
  app.get('/api/movie/:id', handleMovieDetail);

  // Movie Playback Stream URL
  const handleMoviePlay = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(`${MOVIE_SERVER_URL}/movie/${id}/play`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        return res.json(data);
      }
    } catch (e) {}

    const allMovies = getAllServerMovies();
    const movie = allMovies.find(m => m.id === id);
    const streamUrl = movie?.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

    res.json({
      success: true,
      movieId: id,
      streamUrl,
    });
  };

  app.get('/movie/:id/play', handleMoviePlay);
  app.get('/api/movie/:id/play', handleMoviePlay);

  // Series Episode Playback Stream URL
  const handleSeriesPlay = async (req: express.Request, res: express.Response) => {
    const { seriesCode } = req.params;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(`${MOVIE_SERVER_URL}/series/${seriesCode}/movie/play`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        return res.json(data);
      }
    } catch (e) {}

    res.json({
      success: true,
      seriesCode,
      streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    });
  };

  app.get('/series/:seriesCode/movie/play', handleSeriesPlay);
  app.get('/api/series/:seriesCode/movie/play', handleSeriesPlay);

  // --------------------------------------------------------------------------
  // SPA Serving & Vite Middleware
  // --------------------------------------------------------------------------
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[MunoWatch Full-Stack] Server running on http://0.0.0.0:${PORT}`);
    console.log(`[Movie Server URL]: ${MOVIE_SERVER_URL}`);
    console.log(`[TMDB Auth]: ${TMDB_READ_TOKEN ? 'Bearer Token' : TMDB_API_KEY ? 'API Key configured' : 'Not configured (using verified mapping)'}`);
  });
}

startServer();
