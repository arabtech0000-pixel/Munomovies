import React from 'react';
import { ArrowLeft, Cast, Bell, Search, Lock } from 'lucide-react';
import { Movie } from '../../types';

interface TvShowsScreenProps {
  onBack: () => void;
  onMovieClick: (movie: Movie) => void;
  onSearchClick: () => void;
  onCastClick: () => void;
  onNotificationsClick: () => void;
}

export const TV_SHOWS_LIST: Movie[] = [
  {
    id: 'tv-sardar',
    title: 'Sardar',
    vj: 'Vj Ice P',
    genre: 'Series',
    duration: '45m / ep',
    episodesCount: 1,
    description: 'A spy estranged from his family meets his police son.',
    posterUrl: '',
    isLocked: true,
  },
  {
    id: 'tv-allegiance',
    title: 'Allegiance',
    vj: 'Vj Junior',
    genre: 'Series',
    duration: '50m / ep',
    episodesCount: 1,
    description: 'A young intelligence officer navigates undercover betrayal.',
    posterUrl: '',
    isLocked: true,
  },
  {
    id: 'tv-lastseen',
    title: 'Last Seen',
    vj: 'Vj Emmy',
    genre: 'Series',
    duration: '48m / ep',
    episodesCount: 1,
    description: 'A frantic search ensues through high-stakes urban sprawl.',
    posterUrl: '',
    isLocked: true,
  },
  {
    id: 'tv-dream',
    title: 'Dream to You',
    vj: 'Vj Sammy',
    genre: 'Series / Romance',
    duration: '60m / ep',
    episodesCount: 8,
    description: 'Two aspiring musicians cross paths under rain-slicked city lights.',
    posterUrl: '',
    isLocked: false,
  },
  {
    id: 'tv-carrie',
    title: 'Carrie',
    vj: 'Vj Junior',
    genre: 'Series / Horror',
    duration: '45m / ep',
    episodesCount: 3,
    description: 'Supernatural fury unleashed in an unrelenting high school drama.',
    posterUrl: '',
    isLocked: true,
  },
  {
    id: 'tv-blossoms',
    title: 'Blossoms of Power',
    vj: 'Vj Junior',
    genre: 'Series / Fantasy',
    duration: '42m / ep',
    episodesCount: 14,
    description: 'An immortal fairy court fractures over forbidden martial scrolls.',
    posterUrl: '',
    isLocked: true,
  },
  {
    id: 'tv-beauty',
    title: 'Beauty in Black (EPS 3.1)',
    vj: 'Vj Ice P',
    genre: 'Series / Drama',
    duration: '55m / ep',
    episodesCount: 3,
    description: 'Two women with diametrically opposite lives cross paths explosively.',
    posterUrl: '',
    isLocked: true,
  },
  {
    id: 'tv-laugh',
    title: '2 Generations One Laugh',
    vj: 'Vj Emmy',
    genre: 'Series / Comedy',
    duration: '35m / ep',
    episodesCount: 6,
    description: 'Hilarious Ugandan family stand-up and comic skits.',
    posterUrl: '',
    isLocked: false,
  },
  {
    id: 'tv-mobland',
    title: 'Mobland (EPS 21)',
    vj: 'Vj Junior',
    genre: 'Series / Crime',
    duration: '50m / ep',
    episodesCount: 21,
    description: 'Underworld crime families clash in tense dockyard power plays.',
    posterUrl: '',
    isLocked: true,
  },
];

export const TvShowsScreen: React.FC<TvShowsScreenProps> = ({
  onBack,
  onMovieClick,
  onSearchClick,
  onCastClick,
  onNotificationsClick,
}) => {
  return (
    <div className="min-h-full bg-[#05051F] text-white flex flex-col pb-20 select-none">
      {/* Top Header matching Screenshot_20261018_102907_Munowatch.jpg */}
      <div className="h-14 px-4 flex items-center justify-between sticky top-0 bg-[#05051F]/95 backdrop-blur-md z-30 border-b border-white/5">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-white hover:text-[#00D522] transition-colors focus:outline-none"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
          <h2 className="text-white text-lg font-bold tracking-tight">Tv shows</h2>
        </div>

        <div className="flex items-center space-x-3.5">
          <button onClick={onCastClick} className="p-1 text-white hover:opacity-80">
            <Cast className="w-5 h-5 stroke-[2]" />
          </button>
          <button onClick={onNotificationsClick} className="p-1 text-white hover:opacity-80 relative">
            <Bell className="w-5 h-5 stroke-[2]" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#00D522] rounded-full"></span>
          </button>
          <button onClick={onSearchClick} className="p-1 text-white hover:text-[#00D522]">
            <Search className="w-5 h-5 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* 3-Column Dense Poster Grid matching Screenshot 102907 */}
      <div className="p-2 grid grid-cols-3 gap-2">
        {TV_SHOWS_LIST.map((movie) => (
          <div
            key={movie.id}
            onClick={() => onMovieClick(movie)}
            className="relative aspect-[2/3] rounded-md overflow-hidden bg-[#111128] cursor-pointer group shadow-sm transition-transform duration-200 group-hover:scale-[1.02]"
          >
            {movie.posterUrl && (
              <img
                src={movie.posterUrl}
                alt={movie.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Lock icon */}
            {movie.isLocked && (
              <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-xs p-0.5 rounded">
                <Lock className="w-3 h-3 text-white" />
              </div>
            )}

            {/* Green EPS Badge top right matching Screenshot 102907 */}
            <div className="absolute top-1 right-1 px-1 py-0.5 rounded bg-black/40 text-[9px] font-bold text-[#00D522]">
              {movie.episodesCount ? `EPS ${movie.episodesCount}` : 'EPS'}
            </div>

            {/* Title */}
            <div className="absolute inset-x-0 bottom-0 p-1 text-center">
              <p className="text-white text-[10px] font-bold truncate leading-tight uppercase">
                {movie.title}
              </p>
              <p className="text-[#00D522] text-[9px] font-medium truncate">
                {movie.vj}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
