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
  // MOVIE SERVER API ROUTES (Source A: Primary Authoritative Source)
  // Approved Endpoints:
  // - Dashboard: https://mumowatch.ai.studio/dashboard
  // - Movie Details: https://mumowatch.ai.studio/movie/:id
  // - Stream Streamer (GET Play): https://mumowatch.ai.studio/movie/:id/play
  // - Search Engine: https://mumowatch.ai.studio/search?q=:q
  // - Series Container: https://mumowatch.ai.studio/series/:code
  // --------------------------------------------------------------------------

  // Dashboard endpoint (supports both /dashboard and /api/dashboard)
  const handleDashboard = async (req: express.Request, res: express.Response) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const upstream = await fetch(`${MOVIE_SERVER_URL}/dashboard`, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      clearTimeout(timeoutId);

      if (upstream.ok) {
        const data = await upstream.json();
        if (data && Array.isArray(data.movies) && data.movies.length > 0) {
          
          const catMap: Record<number, string> = {
            1: 'Action', 2: 'Horror', 5: 'Series', 6: 'Kung Fu', 9: 'Comedy', 14: 'Animation', 25: 'Drama', 12: 'Crime', 26: 'Sport'
          };

          const movies = data.movies.map((m: any) => {
            const catId = parseInt(m.category_id);
            const genre = catMap[catId] || 'Action';
            
            return {
              id: String(m.id),
              title: m.title && m.title.trim() ? m.title.trim() : `Movie ${m.id}`,
              vj: (m.vj && m.vj.trim()) ? m.vj.trim() : 'Vj Junior',
              genre: genre,
              category_id: String(catId),
              duration: m.duration || '01h 30m',
              fileSize: m.size || '1.0 GB',
              rating: m.rating || '16+',
              description: m.description || `Exclusive Luganda release.`,
              posterUrl: (m.image && !m.image.includes('unsplash.com')) ? m.image.replace(/^http:\/\//i, 'https://') : undefined,
              videoUrl: m.playingurl ? m.playingurl.replace(/^http:\/\//i, 'https://') : undefined,
              isLocked: false,
            };
          });

          const categorized = {
            heroMovies: movies.slice(0, 5),
            latestMovies: movies,
            actionMovies: movies.filter((m: any) => m.genre === 'Action'),
            horrorMovies: movies.filter((m: any) => m.genre === 'Horror'),
            seriesMovies: movies.filter((m: any) => m.genre === 'Series'),
            kungfuMovies: movies.filter((m: any) => m.genre === 'Kung Fu'),
            animationMovies: movies.filter((m: any) => m.genre === 'Animation'),
            vjJuniorMovies: movies.filter((m: any) => m.vj?.toLowerCase().includes('junior')),
            categories: serverCatalog.categories
          };
          return res.json(categorized);
        }
      }
    } catch (e) {}

    res.json(serverCatalog);
  };

  app.get('/dashboard', handleDashboard);
  app.get('/api/dashboard', handleDashboard);

  // Search Engine endpoint (approved: https://mumowatch.ai.studio/search?q=:q)
  const handleSearch = async (req: express.Request, res: express.Response) => {
    const query = (req.query.q as string) || '';
    if (!query.trim()) {
      return res.json([]);
    }

    // 1. Query upstream live search
    let upstreamResults: any[] = [];
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const response = await fetch(`${MOVIE_SERVER_URL}/search?q=${encodeURIComponent(query.trim())}`, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const searchData = await response.json();
        if (searchData) {
          if (Array.isArray(searchData)) {
            upstreamResults = searchData;
          } else {
            if (Array.isArray(searchData.movies)) {
              upstreamResults.push(...searchData.movies);
            }
            if (Array.isArray(searchData.series)) {
              for (const s of searchData.series) {
                if (s.episodes && Array.isArray(s.episodes)) {
                  for (const ep of s.episodes) {
                    upstreamResults.push({
                      id: String(ep.id || s.series_code),
                      title: ep.title || s.title,
                      vj: 'Vj Junior',
                      genre: 'TV Series',
                      posterUrl: ep.image || s.image,
                      videoUrl: ep.playingurl,
                      isSeries: true,
                    });
                  }
                } else {
                  upstreamResults.push({
                    id: String(s.series_code),
                    title: s.title,
                    vj: 'Vj Junior',
                    genre: 'TV Series',
                    posterUrl: s.image,
                    isSeries: true,
                  });
                }
              }
            }
          }
        }
      }
    } catch (e) {}

    // 2. Query local server catalog
    const allMovies = getAllServerMovies();
    const qLower = query.toLowerCase().trim();
    const terms = qLower.split(' ');
    const localMatches = allMovies.filter((m) => {
      const text = `${m.title} ${m.vj} ${m.genre} ${m.description || ''}`.toLowerCase();
      return terms.every((term) => text.includes(term));
    });

    // Merge unique results prioritizing full local records
    const map = new Map<string, any>();
    for (const m of localMatches) {
      map.set(String(m.id), m);
    }
    for (const m of upstreamResults) {
      const key = String(m.id || m.series_code || m.title);
      if (!map.has(key)) {
        map.set(key, {
          id: String(m.id || m.series_code),
          title: m.title,
          vj: m.vj || 'Vj Junior',
          genre: m.category_name || m.genre || 'Action',
          posterUrl: (m.image && !m.image.includes('unsplash.com')) ? m.image.replace(/^http:\/\//i, 'https://') : undefined,
          videoUrl: m.playingurl ? m.playingurl.replace(/^http:\/\//i, 'https://') : undefined,
          isLocked: false,
        });
      }
    }

    res.json(Array.from(map.values()));
  };

  app.get('/search', handleSearch);
  app.get('/api/search', handleSearch);
  app.get('/api/movies', handleSearch);

  // Categories list
  app.get('/api/categories', (req, res) => {
    res.json(serverCatalog.categories);
  });

  // Movie Details endpoint (approved: https://mumowatch.ai.studio/movie/:id)
  const handleMovieDetail = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const response = await fetch(`${MOVIE_SERVER_URL}/movie/${id}`, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const rawMovie = await response.json();
        if (rawMovie && rawMovie.title) {
          const secureStream = rawMovie.playingurl ? rawMovie.playingurl.replace(/^http:\/\//i, 'https://') : undefined;
          const securePoster = rawMovie.image ? rawMovie.image.replace(/^http:\/\//i, 'https://') : undefined;
          return res.json({
            id: String(rawMovie.id),
            title: rawMovie.title,
            vj: (rawMovie.vj && rawMovie.vj.trim()) ? rawMovie.vj.trim() : 'Vj Junior',
            genre: rawMovie.genre || 'Action',
            duration: rawMovie.duration || '01h 45m',
            fileSize: rawMovie.size || '1.45 GB',
            rating: rawMovie.rating || '16+',
            narration: 'English to Luganda',
            description: rawMovie.description || `Exclusive Luganda translated release with ${rawMovie.vj || 'Vj Junior'}.`,
            posterUrl: securePoster,
            heroBannerUrl: securePoster,
            videoUrl: secureStream,
            isLocked: false,
          });
        }
      }
    } catch (e) {}

    const allMovies = getAllServerMovies();
    const movie = allMovies.find((m) => String(m.id) === String(id) || m.id === id) || allMovies[0];
    res.json(movie);
  };

  app.get('/movie/:id', handleMovieDetail);
  app.get('/api/movie/:id', handleMovieDetail);

  // Movie Playback Stream URL (approved: https://mumowatch.ai.studio/movie/:id/play)
  // Handles HTTP 302 redirect directly to BunnyCDN .mp4 stream and ensures HTTPS
  const handleMoviePlay = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;

    // 1. Attempt live upstream redirect resolution
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const response = await fetch(`${MOVIE_SERVER_URL}/movie/${id}/play`, {
        signal: controller.signal,
        redirect: 'manual', // intercept 302 redirect
      });
      clearTimeout(timeoutId);

      // Check 302 redirect Location header
      const location = response.headers.get('location');
      if (location) {
        const secureUrl = location.replace(/^http:\/\//i, 'https://');
        return res.json({
          success: true,
          movieId: id,
          streamUrl: secureUrl,
        });
      }

      if (response.ok) {
        const text = await response.text();
        try {
          const json = JSON.parse(text);
          if (json.streamUrl || json.playingurl) {
            const url = (json.streamUrl || json.playingurl).replace(/^http:\/\//i, 'https://');
            return res.json({ success: true, movieId: id, streamUrl: url });
          }
        } catch (_) {}
      }
    } catch (e) {}

    // 2. Fallback: check details endpoint /movie/:id which contains playingurl
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const detailRes = await fetch(`${MOVIE_SERVER_URL}/movie/${id}`, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      clearTimeout(timeoutId);

      if (detailRes.ok) {
        const detail = await detailRes.json();
        if (detail && detail.playingurl) {
          const secureUrl = detail.playingurl.replace(/^http:\/\//i, 'https://');
          return res.json({
            success: true,
            movieId: id,
            streamUrl: secureUrl,
          });
        }
      }
    } catch (e) {}

    // 3. Fallback to authoritative server catalog record
    const allMovies = getAllServerMovies();
    const movie = allMovies.find((m) => String(m.id) === String(id) || m.id === id);
    const streamUrl =
      movie?.videoUrl?.replace(/^http:\/\//i, 'https://') ||
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

    res.json({
      success: true,
      movieId: id,
      streamUrl,
    });
  };

  app.get('/movie/:id/play', handleMoviePlay);
  app.get('/api/movie/:id/play', handleMoviePlay);

  // Series Container endpoint (approved: https://mumowatch.ai.studio/series/:code)
  const handleSeriesDetails = async (req: express.Request, res: express.Response) => {
    const { code } = req.params;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(`${MOVIE_SERVER_URL}/series/${code}`, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data && data.episodes) {
          // Ensure all episode stream URLs use HTTPS
          const secureEpisodes = data.episodes.map((ep: any) => ({
            ...ep,
            playingurl: ep.playingurl ? ep.playingurl.replace(/^http:\/\//i, 'https://') : ep.playingurl,
            image: ep.image ? ep.image.replace(/^http:\/\//i, 'https://') : ep.image,
          }));
          return res.json({
            ...data,
            episodes: secureEpisodes,
          });
        }
      }
    } catch (e) {}

    res.json({
      series_code: code,
      count: 0,
      episodes: [],
    });
  };

  app.get('/series/:code', handleSeriesDetails);
  app.get('/api/series/:code', handleSeriesDetails);

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
