import React from 'react';
import { ArrowLeft, Cast, Bell, Search, Lock } from 'lucide-react';
import { Movie } from '../../types';

interface ShowsScreenProps {
  onBack: () => void;
  onMovieClick: (movie: Movie) => void;
  onSearchClick: () => void;
  onCastClick: () => void;
  onNotificationsClick: () => void;
}

export const TV_SHOWS_LIST: Array<{
  id: string;
  title: string;
  vj: string;
  eps: string;
  posterUrl: string;
  isLocked: boolean;
}> = [
  {
    id: 'show-sardar',
    title: 'Sardar',
    vj: 'Vj Ice P',
    eps: 'EPS',
    posterUrl: '',
    isLocked: true,
  },
  {
    id: 'show-allegiance',
    title: 'Allegiance',
    vj: 'Vj Junior',
    eps: 'EPS',
    posterUrl: '',
    isLocked: true,
  },
  {
    id: 'show-last-seen',
    title: 'Last Seen',
    vj: 'Vj Emmy',
    eps: 'EPS',
    posterUrl: '',
    isLocked: true,
  },
  {
    id: 'show-dream-to-you',
    title: 'Dream to You',
    vj: 'Vj Junior',
    eps: 'EPS',
    posterUrl: '',
    isLocked: false,
  },
  {
    id: 'show-carrie',
    title: 'Carrie',
    vj: 'Vj Junior',
    eps: 'EPS',
    posterUrl: '',
    isLocked: true,
  },
  {
    id: 'show-blossoms',
    title: 'Blossoms of Power',
    vj: 'Vj Emmy',
    eps: 'EPS',
    posterUrl: '',
    isLocked: true,
  },
  {
    id: 'show-beauty-in-black',
    title: 'Beauty in Black',
    vj: 'Vj Junior',
    eps: 'EPS 3.1',
    posterUrl: '',
    isLocked: true,
  },
  {
    id: 'show-2gen-one-laugh',
    title: '2 Generations One Laugh',
    vj: 'Vj Emmy',
    eps: 'EPS',
    posterUrl: '',
    isLocked: false,
  },
  {
    id: 'show-mobland',
    title: 'Mobland Season 2',
    vj: 'Vj Emmy',
    eps: 'EPS 2.1',
    posterUrl: '',
    isLocked: true,
  },
];

export const ShowsScreen: React.FC<ShowsScreenProps> = ({
  onBack,
  onMovieClick,
  onSearchClick,
  onCastClick,
  onNotificationsClick,
}) => {
  return (
    <div className="min-h-full bg-[#05051F] text-white flex flex-col pb-20 select-none">
      {/* Top Header matching Screenshot 15 */}
      <div className="h-14 px-4 flex items-center justify-between sticky top-0 bg-[#05051F]/95 backdrop-blur-md z-30 border-b border-white/[0.04]">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-white hover:text-white/80 transition-colors focus:outline-none"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
          <h1 className="text-white text-[18px] font-bold tracking-tight">
            Tv shows
          </h1>
        </div>

        <div className="flex items-center space-x-3.5">
          <button
            onClick={onCastClick}
            className="text-white hover:opacity-80 transition-opacity focus:outline-none"
            aria-label="Cast"
          >
            <Cast className="w-[20px] h-[20px] stroke-[2]" />
          </button>
          <button
            onClick={onNotificationsClick}
            className="text-white hover:opacity-80 transition-opacity focus:outline-none"
            aria-label="Notifications"
          >
            <Bell className="w-[20px] h-[20px] stroke-[2]" />
          </button>
          <button
            onClick={onSearchClick}
            className="text-white hover:opacity-80 transition-colors focus:outline-none"
            aria-label="Search"
          >
            <Search className="w-[20px] h-[20px] stroke-[2]" />
          </button>
        </div>
      </div>

      {/* 3-Column Dense Poster Grid matching Screenshot 15 */}
      <div className="p-3 grid grid-cols-3 gap-2.5">
        {TV_SHOWS_LIST.map((show) => (
          <div
            key={show.id}
            onClick={() =>
              onMovieClick({
                id: show.id,
                title: show.title,
                vj: show.vj,
                genre: 'Series',
                duration: '45m / ep',
                description: `${show.title} episodic TV show streaming exclusively on MunoWatch with full translation.`,
                posterUrl: show.posterUrl,
                isLocked: show.isLocked,
              })
            }
            className="cursor-pointer group flex flex-col"
          >
            <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-[#111128] shadow-md transition-transform group-hover:scale-[1.02]">
              {show.posterUrl && (
                <img
                  src={show.posterUrl}
                  alt={show.title}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Top-Left Lock Icon Badge */}
              {show.isLocked && (
                <div className="absolute top-1.5 left-1.5 bg-black/60 p-1 rounded">
                  <Lock className="w-3 h-3 text-white" />
                </div>
              )}

              {/* Top-Right Green EPS Badge */}
              <div className="absolute top-1.5 right-1.5 text-[#00D522] text-[10px] font-bold drop-shadow">
                {show.eps}
              </div>

              {/* Bottom Title */}
              <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <p className="text-white text-[10.5px] font-bold truncate leading-tight">
                  {show.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
