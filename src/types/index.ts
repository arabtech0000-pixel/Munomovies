export interface Movie {
  id: string;
  title: string;
  secondaryLabel?: string; // e.g. "Junior" or "Vj Ice P"
  vj: string;
  genre: string;
  year?: string;
  duration: string;
  fileSize?: string;
  rating?: string;
  narration?: string; // e.g. "English to Luganda"
  description: string;
  posterUrl: string | undefined | null;
  heroBannerUrl?: string;
  isLocked?: boolean;
  progressPercent?: number; // for continue watching
  episodesCount?: number;
  uploadedTimeAgo?: string;
  punctuality?: string; // e.g. "On-Time: 2h ago" or "Daily 8PM Drop"
  endpoint?: string;    // MunoWatch API endpoint
}

export interface MovieCategory {
  id: string;
  title: string;
  punctuality: string;
  endpoint: string;
  movies: Movie[];
}

export interface Veejay {
  id: string;
  name: string;
  avatarColor?: string;
  movieCount?: number;
  endpoint?: string;
}

export interface Genre {
  id: string;
  name: string;
  endpoint?: string;
}

export type ActiveTab = 'home' | 'categories' | 'saved' | 'menu';
export type ViewScreen =
  | 'home'
  | 'detail'
  | 'categories'
  | 'saved'
  | 'menu'
  | 'search'
  | 'login'
  | 'notifications'
  | 'new_uploads'
  | 'shows'
  | 'recently_watched'
  | 'downloads'
  | 'settings'
  | 'account'
  | 'support'
  | 'category_view';


