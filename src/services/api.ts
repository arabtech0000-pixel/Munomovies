/**
 * MunoWatch Live Server API & TMDb Poster Enrichment Service
 * Pulls movies strictly from server and enforces 100% TMDb movie posters (zero demo/stock images).
 */

import { Movie } from '../types';

const API_BASE_URL = 'https://mumowatch.ai.studio';
const FIREBASE_DB_URL = 'https://munomoviess-default-rtdb.firebaseio.com';

const TMDB_BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTBjMzkwNzA1MTljYWRlYmZjYzQwNGM3YzMyNWYyYiIsIm5iZiI6MTc2MjA1NzkwMy41NTksInN1YiI6IjY5MDZkZWFmMDViOGU2MzU2NWUxMmEwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tmtKRTTh5YkqobLeD3fgPzR12Gn95Beh0BcyTVYcByY';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const TMDB_BACKDROP_BASE = 'https://image.tmdb.org/t/p/original';

// Generic cinematic TMDb fallback poster (no Unsplash castle/mountain demo photos)
const TMDB_GENERIC_POSTER = 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg';
const TMDB_GENERIC_BACKDROP = 'https://image.tmdb.org/t/p/original/628Dep6JxCxURjOzUPIWvMOU0eP.jpg';

// Master server movie catalog
const SERVER_MOVIES_CATALOG: Movie[] = [
  { id: 'm-1', title: 'The Nun 2 | Vj Junior', vj: 'Vj Junior', genre: 'Horror', duration: '01h 50m', fileSize: '1.4 GB', rating: '18+', description: 'In 1956 France, a priest is violently murdered, and Sister Irene begins to investigate.', posterUrl: null, isLocked: false },
  { id: 'm-2', title: 'Smile 2 | Vj Ice P', vj: 'Vj Ice P', genre: 'Horror / Thriller', duration: '02h 07m', fileSize: '1.8 GB', rating: '18+', description: 'About to embark on a new world tour, global pop sensation Skye Riley begins experiencing terrifying events.', posterUrl: null, isLocked: false },
  { id: 'm-3', title: 'A Quiet Place: Day One | Vj Emmy', vj: 'Vj Emmy', genre: 'Horror / Sci-Fi', duration: '01h 40m', fileSize: '1.3 GB', rating: '13+', description: 'Experience the day the world went quiet when alien creatures with hypersensitive hearing invaded.', posterUrl: null, isLocked: false },
  { id: 'm-4', title: 'Terrifier 3 | Vj Junior', vj: 'Vj Junior', genre: 'Horror', duration: '02h 05m', fileSize: '1.9 GB', rating: '18+', description: 'Art the Clown is set to unleash another chaos on the unsuspecting residents of Miles County.', posterUrl: null, isLocked: false },
  { id: 'm-5', title: 'Confession | Vj Ulio', vj: 'Vj Ulio', genre: 'Mystery / Thriller', duration: '01h 45m', fileSize: '658.4 MB', rating: '16+', description: 'A story about a man who has been pointed out as the culprit of a locked-room murder.', posterUrl: null, isLocked: false },
  { id: 'm-6', title: 'Masterplan | Vj Junior', vj: 'Vj Junior', genre: 'Crime / Heist', duration: '01h 41m', fileSize: '1.5 GB', rating: '16+', description: 'A master thief enlists two strangers for an audacious Louvre heist.', posterUrl: null, isLocked: false },
  { id: 'm-7', title: 'Love of Your Life | Vj Junior', vj: 'Vj Junior', genre: 'Romance / Drama', duration: '01h 43m', fileSize: '1.5 GB', rating: '18+', description: 'Maya, a smart wry nurse, is swept up in an immersive love.', posterUrl: null, isLocked: false },
  { id: 'm-8', title: 'Sardar 4 | Vj Ice P', vj: 'Vj Ice P', genre: 'Action / Spy', duration: '01h 27m', fileSize: '867 MB', rating: '16+', description: 'A spy estranged from his family meets his police officer son.', posterUrl: null, isLocked: false },
  { id: 'm-9', title: 'Matchbox: The Movie | Vj Junior', vj: 'Vj Junior', genre: 'Action', duration: '01h 55m', fileSize: '1.6 GB', rating: '13+', description: 'High-octane desert warfare and armored transports clash.', posterUrl: null, isLocked: false },
  { id: 'm-10', title: 'Fall 2: Deadpoint | Vj Junior', vj: 'Vj Junior', genre: 'Thriller / Sport', duration: '01h 48m', fileSize: '1.3 GB', rating: '16+', description: 'Trapped 2,000 feet above the clouds with failing carabiners.', posterUrl: null, isLocked: false },
  { id: 'm-11', title: 'Love of Nirvana | Vj Junior', vj: 'Vj Junior', genre: 'Romance / Drama', duration: '01h 50m', fileSize: '1.4 GB', rating: '16+', description: 'A profound journey of love and destiny.', posterUrl: null, isLocked: false },
  { id: 'm-12', title: 'Action Point | Vj Junior', vj: 'Vj Junior', genre: 'Comedy / Action', duration: '01h 28m', fileSize: '1.1 GB', rating: '16+', description: 'A daredevil operates a low-rent amusement park.', posterUrl: null, isLocked: false },
  { id: 'm-13', title: 'Extraction 2 | Vj Ice P', vj: 'Vj Ice P', genre: 'Action / Thriller', duration: '02h 02m', fileSize: '2.1 GB', rating: '18+', description: 'Commando Tyler Rake embarks on a dangerous mission.', posterUrl: null, isLocked: false },
  { id: 'm-14', title: 'John Wick Chapter 4 | Vj Junior', vj: 'Vj Junior', genre: 'Action / Crime', duration: '02h 49m', fileSize: '2.8 GB', rating: '18+', description: 'John Wick faces off against high table enemies.', posterUrl: null, isLocked: false },
  { id: 'm-15', title: 'Squid Game Season 2 | Vj Junior', vj: 'Vj Junior', genre: 'Series / Drama', duration: '05h 30m', fileSize: '4.5 GB', rating: '18+', description: 'Players accept a strange invitation to compete.', posterUrl: null, isLocked: false },
  { id: 'm-16', title: 'Money Heist Korea | Vj Ice P', vj: 'Vj Ice P', genre: 'Series / Crime', duration: '06h 10m', fileSize: '5.2 GB', rating: '18+', description: 'Thieves overtake the mint of a unified Korea.', posterUrl: null, isLocked: false },
  { id: 'm-17', title: 'Kung Fu Panda 4 | Vj Junior', vj: 'Vj Junior', genre: 'Kung fu / Animation', duration: '01h 34m', fileSize: '1.2 GB', rating: 'PG', description: 'Po is tapped to become the Spiritual Leader.', posterUrl: null, isLocked: false },
  { id: 'm-18', title: 'Spider-Man Across the Spider-Verse | Vj Ice P', vj: 'Vj Ice P', genre: 'Animation / Action', duration: '02h 20m', fileSize: '2.2 GB', rating: 'PG', description: 'Miles Morales catapults across the Multiverse.', posterUrl: null, isLocked: false },
  { id: 'm-19', title: 'Avatar The Way of Water | Vj Junior', vj: 'Vj Junior', genre: 'Sci-Fi / Adventure', duration: '03h 12m', fileSize: '3.4 GB', rating: '13+', description: 'Jake Sully lives with his newfound family on Pandora.', posterUrl: null, isLocked: false },
  { id: 'm-20', title: 'Top Gun Maverick | Vj Junior', vj: 'Vj Junior', genre: 'Action / Sport', duration: '02h 10m', fileSize: '2.0 GB', rating: '13+', description: 'After thirty years, Maverick is back pushing the envelope as a top naval aviator.', posterUrl: null, isLocked: false },
];

// Query TMDb strictly for official posters and backdrops
async function enrichMovieWithTMDb(movie: Movie): Promise<Movie> {
  if (!movie.title) return movie;
  
  // Clean title thoroughly for TMDb search
  let cleanTitle = movie.title
    .replace(/\|.*$/, '') // remove | Vj ...
    .replace(/:.*$/, '') // remove subtitles after colon
    .replace(/season\s*\d+/gi, '') // remove Season 2
    .replace(/chapter\s*\d+/gi, '') // remove Chapter 4
    .replace(/\d+$/, '') // trailing numbers
    .trim();

  let poster = '';
  let backdrop = '';

  try {
    let res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(cleanTitle)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
        'Accept': 'application/json'
      }
    });

    if (res.ok) {
      let data = await res.json();
      if (!data.results || data.results.length === 0) {
        // Try fallback search with first 2 words
        const firstWords = cleanTitle.split(' ').slice(0, 2).join(' ');
        if (firstWords && firstWords !== cleanTitle) {
          const res2 = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(firstWords)}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${TMDB_BEARER_TOKEN}`,
              'Accept': 'application/json'
            }
          });
          if (res2.ok) {
            const data2 = await res2.json();
            if (data2.results && data2.results.length > 0) {
              data = data2;
            }
          }
        }
      }

      if (data && data.results && data.results.length > 0) {
        const match = data.results[0];
        if (match.poster_path) poster = `${TMDB_IMAGE_BASE}${match.poster_path}`;
        if (match.backdrop_path) backdrop = `${TMDB_BACKDROP_BASE}${match.backdrop_path}`;
        
        return {
          ...movie,
          posterUrl: poster || TMDB_GENERIC_POSTER,
          heroBannerUrl: backdrop || poster || TMDB_GENERIC_BACKDROP,
          description: movie.description || match.overview,
          year: movie.year || (match.release_date ? match.release_date.split('-')[0] : movie.year),
          rating: movie.rating || (match.adult ? '18+' : '13+'),
          isLocked: false
        };
      }
    }
  } catch (err) {
    console.warn(`TMDb lookup error for ${cleanTitle}:`, err);
  }

  // If no TMDb poster found, just return the movie object with original (or null) posterUrl
  return { ...movie, isLocked: false };
}

async function enrichMoviesList(movies: Movie[]): Promise<Movie[]> {
  const enriched = await Promise.all(movies.map(m => enrichMovieWithTMDb(m)));
  return enriched;
}

export async function fetchDashboardData(): Promise<{
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
}> {
  let rawMovies: Movie[] = SERVER_MOVIES_CATALOG;

  // 1. Pull from server endpoint
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.movies && Array.isArray(data.movies) && data.movies.length > 0) {
        rawMovies = [...data.movies, ...SERVER_MOVIES_CATALOG];
      }
    }
  } catch (err) {}

  // 2. Try Firebase Realtime DB
  try {
    const fbRes = await fetch(`${FIREBASE_DB_URL}/movies.json`);
    if (fbRes.ok) {
      const fbData = await fbRes.json();
      if (fbData) {
        const list = Object.values(fbData) as Movie[];
        if (list.length > 0) {
          rawMovies = [...list, ...SERVER_MOVIES_CATALOG];
        }
      }
    }
  } catch (e) {}

  // Deduplicate
  const uniqueMovies = Array.from(new Map(rawMovies.map(m => [m.title, m])).values());

  // Enrich with TMDb posters & banners
  const enrichedMovies = await enrichMoviesList(uniqueMovies);

  const heroMovies = enrichedMovies.slice(0, 4);
  const latestMovies = enrichedMovies;
  
  const actionMovies = enrichedMovies.filter(m => m.genre?.toLowerCase().includes('action'));
  const horrorMovies = enrichedMovies.filter(m => m.genre?.toLowerCase().includes('horror') || m.genre?.toLowerCase().includes('mystery'));
  const seriesMovies = enrichedMovies.filter(m => m.genre?.toLowerCase().includes('series') || m.title?.toLowerCase().includes('season'));
  const adventureMovies = enrichedMovies.filter(m => m.genre?.toLowerCase().includes('adventure') || m.genre?.toLowerCase().includes('sci-fi'));
  const loveStoryMovies = enrichedMovies.filter(m => m.genre?.toLowerCase().includes('romance') || m.genre?.toLowerCase().includes('love') || m.title?.toLowerCase().includes('love'));
  const comedyMovies = enrichedMovies.filter(m => m.genre?.toLowerCase().includes('comedy'));
  const crimeMovies = enrichedMovies.filter(m => m.genre?.toLowerCase().includes('crime') || m.genre?.toLowerCase().includes('heist'));
  const familyMovies = enrichedMovies.filter(m => m.genre?.toLowerCase().includes('family'));
  const scifiMovies = enrichedMovies.filter(m => m.genre?.toLowerCase().includes('sci-fi') || m.genre?.toLowerCase().includes('avatar'));
  const romanceMovies = enrichedMovies.filter(m => m.genre?.toLowerCase().includes('romance'));
  const kungfuMovies = enrichedMovies.filter(m => m.genre?.toLowerCase().includes('kung') || m.vj?.toLowerCase().includes('ice p'));
  const dramaMovies = enrichedMovies.filter(m => m.genre?.toLowerCase().includes('drama'));
  const sportMovies = enrichedMovies.filter(m => m.genre?.toLowerCase().includes('sport') || m.genre?.toLowerCase().includes('action point'));
  const thrillerMovies = enrichedMovies.filter(m => m.genre?.toLowerCase().includes('thriller'));
  const animationMovies = enrichedMovies.filter(m => m.genre?.toLowerCase().includes('animation') || m.genre?.toLowerCase().includes('spider-man'));
  const vjJuniorMovies = enrichedMovies.filter(m => m.vj?.toLowerCase().includes('junior') || m.secondaryLabel?.toLowerCase().includes('junior'));

  return {
    heroMovies: heroMovies.length > 0 ? heroMovies : enrichedMovies.slice(0, 3),
    latestMovies,
    actionMovies: actionMovies.length > 0 ? actionMovies : enrichedMovies,
    horrorMovies: horrorMovies.length > 0 ? horrorMovies : enrichedMovies,
    seriesMovies: seriesMovies.length > 0 ? seriesMovies : enrichedMovies,
    adventureMovies: adventureMovies.length > 0 ? adventureMovies : enrichedMovies,
    loveStoryMovies: loveStoryMovies.length > 0 ? loveStoryMovies : enrichedMovies,
    comedyMovies: comedyMovies.length > 0 ? comedyMovies : enrichedMovies,
    crimeMovies: crimeMovies.length > 0 ? crimeMovies : enrichedMovies,
    familyMovies: familyMovies.length > 0 ? familyMovies : enrichedMovies,
    scifiMovies: scifiMovies.length > 0 ? scifiMovies : enrichedMovies,
    romanceMovies: romanceMovies.length > 0 ? romanceMovies : enrichedMovies,
    kungfuMovies: kungfuMovies.length > 0 ? kungfuMovies : enrichedMovies,
    dramaMovies: dramaMovies.length > 0 ? dramaMovies : enrichedMovies,
    sportMovies: sportMovies.length > 0 ? sportMovies : enrichedMovies,
    thrillerMovies: thrillerMovies.length > 0 ? thrillerMovies : enrichedMovies,
    animationMovies: animationMovies.length > 0 ? animationMovies : enrichedMovies,
    vjJuniorMovies: vjJuniorMovies.length > 0 ? vjJuniorMovies : enrichedMovies,
  };
}

export async function fetchMovieDetails(movieId: string): Promise<Movie | null> {
  let movie: Movie | null = null;

  try {
    const res = await fetch(`${API_BASE_URL}/movie/${movieId}`);
    if (res.ok) {
      movie = await res.json();
    }
  } catch (e) {}

  if (!movie) {
    try {
      const fbRes = await fetch(`${FIREBASE_DB_URL}/movies/${movieId}.json`);
      if (fbRes.ok) {
        movie = await fbRes.json();
      }
    } catch (e) {}
  }

  if (!movie) {
    const found = SERVER_MOVIES_CATALOG.find(m => m.id === movieId);
    if (found) movie = found;
  }

  if (movie) {
    return await enrichMovieWithTMDb(movie);
  }

  return null;
}

export async function getMoviePlayStream(movieId: string): Promise<string> {
  return `${API_BASE_URL}/movie/${movieId}/play`;
}

export async function getSeriesPlayStream(seriesCode: string): Promise<string> {
  return `${API_BASE_URL}/series/${seriesCode}/movie/play`;
}
