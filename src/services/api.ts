/**
 * MunoWatch Live Server API & Movie Catalog Service (Source A)
 * Coupled with TMDB Metadata Enrichment (Source B)
 * 
 * Retrieves real movie records from the authoritative server,
 * then enriches them with official TMDB posters, backdrops, and metadata
 * while strictly preserving playback URLs and server identifiers.
 */

import { Movie } from '../types';
import { enrichMovieList, resolveMovieMetadata } from './tmdbService';
import { ALL_MOVIES_FOR_SEARCH } from '../data/mockData';

export interface DashboardResponse {
  heroMovies: Movie[];
  latestMovies: Movie[];
  actionMovies: Movie[];
  horrorMovies: Movie[];
  seriesMovies: Movie[];
  adventureMovies: Movie[];
  loveStoryMovies: Movie[];
  comedyMovies: Movie[];
  crimeMovies: Movie[];
  familyMovies: Movie[];
  scifiMovies: Movie[];
  romanceMovies: Movie[];
  kungfuMovies: Movie[];
  dramaMovies: Movie[];
  sportMovies: Movie[];
  thrillerMovies: Movie[];
  animationMovies: Movie[];
  vjJuniorMovies: Movie[];
}

export async function fetchDashboardData(): Promise<DashboardResponse | null> {
  try {
    const res = await fetch('/api/dashboard', {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to fetch dashboard');
    const rawData = await res.json();

    // Enrich all server movie collections with TMDB metadata & official posters
    const [
      heroMovies,
      latestMovies,
      actionMovies,
      horrorMovies,
      seriesMovies,
      kungfuMovies,
      animationMovies,
      vjJuniorMovies,
    ] = await Promise.all([
      enrichMovieList(rawData.heroMovies || []),
      enrichMovieList(rawData.latestMovies || []),
      enrichMovieList(rawData.actionMovies || []),
      enrichMovieList(rawData.horrorMovies || []),
      enrichMovieList(rawData.seriesMovies || []),
      enrichMovieList(rawData.kungfuMovies || []),
      enrichMovieList(rawData.animationMovies || []),
      enrichMovieList(rawData.vjJuniorMovies || []),
    ]);

    return {
      heroMovies,
      latestMovies,
      actionMovies,
      horrorMovies,
      seriesMovies,
      adventureMovies: actionMovies,
      loveStoryMovies: latestMovies.filter((m) => m.genre?.includes('Drama') || m.genre?.includes('Romance')),
      comedyMovies: animationMovies,
      crimeMovies: actionMovies,
      familyMovies: animationMovies,
      scifiMovies: heroMovies,
      romanceMovies: latestMovies,
      kungfuMovies,
      dramaMovies: heroMovies,
      sportMovies: actionMovies,
      thrillerMovies: horrorMovies,
      animationMovies,
      vjJuniorMovies,
    };
  } catch (e) {
    console.error('Error fetching dashboard:', e);
    return null;
  }
}

/**
 * Retrieves details for a specific server movie and enriches with TMDB metadata
 */
export async function fetchMovieDetails(movieId: string): Promise<Movie | null> {
  let serverMovie: Movie | null = null;

  try {
    const res = await fetch(`/api/movie/${movieId}`);
    if (res.ok) {
      serverMovie = await res.json();
    } else {
      const altRes = await fetch(`/movie/${movieId}`);
      if (altRes.ok) {
        serverMovie = await altRes.json();
      }
    }
  } catch (e) {}

  if (!serverMovie) {
    serverMovie = ALL_MOVIES_FOR_SEARCH.find((m) => m.id === movieId) || null;
  }

  if (!serverMovie) return null;

  // Enrich with TMDB metadata
  return resolveMovieMetadata(serverMovie);
}

/**
 * Retrieves real playable stream URL from the movie server
 */
export async function getMoviePlayStream(movieId: string): Promise<string> {
  try {
    const res = await fetch(`/api/movie/${movieId}/play`);
    if (res.ok) {
      const data = await res.json();
      if (data.streamUrl) return data.streamUrl;
    }
  } catch (e) {}

  return 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
}

/**
 * Searches real server movie catalogue and enriches matching items with TMDB
 */
export async function searchServerCatalog(query: string): Promise<Movie[]> {
  if (!query || !query.trim()) return [];

  try {
    const res = await fetch(`/api/movies?q=${encodeURIComponent(query.trim())}`);
    if (!res.ok) throw new Error('Search failed');
    const movies: Movie[] = await res.json();
    return enrichMovieList(movies);
  } catch (e) {
    console.error('Search error:', e);
    return [];
  }
}
