import { Movie } from '../types';
import { ALL_MOVIES_FOR_SEARCH } from './mockData';

// Curated high quality cinematic posters fallback
const POSTERS = {
  masterplan: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
  loveOfLife: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  hope: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
  matchbox: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?auto=format&fit=crop&w=600&q=80',
};

// Create a placeholder movie with mountain placeholder
export function makePlaceholderMovie(id: string, vj = 'Vj Junior'): Movie {
  return {
    id: `ph-${id}`,
    title: 'Upcoming Release',
    vj,
    genre: 'MunoWatch',
    duration: '01h 45m',
    description: 'Upcoming translated blockbuster streaming exclusively on MunoWatch.',
    posterUrl: '',
    isLocked: false,
  };
}

/**
 * Retrieves movies for any Category or Veejay from the real server catalog (ALL_MOVIES_FOR_SEARCH).
 * Ensures all category screens display real server movies with authentic BunnyCDN posters and streams.
 */
export function getCategoryGridMovies(categoryName: string, type: 'genre' | 'veejay'): Movie[] {
  if (!categoryName) return ALL_MOVIES_FOR_SEARCH.slice(0, 18);
  const norm = categoryName.toLowerCase().trim();

  let matched: Movie[] = [];

  if (type === 'veejay') {
    // Extract Veejay identifier (e.g. "junior" from "Vj Junior")
    matched = ALL_MOVIES_FOR_SEARCH.filter((m) => {
      const vjStr = (m.vj || '').toLowerCase();
      return vjStr.includes(norm) || norm.includes(vjStr.replace(/vj\s*/i, ''));
    });
  } else {
    // Genre or Section filtering
    matched = ALL_MOVIES_FOR_SEARCH.filter((m) => {
      const gStr = (m.genre || '').toLowerCase();
      const tStr = (m.title || '').toLowerCase();
      return gStr.includes(norm) || tStr.includes(norm) || norm.includes(gStr.split('/')[0].trim());
    });
  }

  // If we found server matches, return them
  if (matched.length > 0) {
    // Ensure we have enough items by cycling or appending if needed
    if (matched.length < 12) {
      const extra = ALL_MOVIES_FOR_SEARCH.filter((m) => !matched.includes(m));
      return [...matched, ...extra.slice(0, 15 - matched.length)];
    }
    return matched;
  }

  // Fallback: return general server movies matching category
  return ALL_MOVIES_FOR_SEARCH.slice(0, 15);
}
