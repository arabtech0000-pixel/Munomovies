import React from 'react';
import { ArrowLeft, Cast, Bell, Search } from 'lucide-react';
import { Movie } from '../../types';
import { MoviePoster } from '../common/MoviePoster';

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
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    isLocked: true,
  },
  {
    id: 'show-allegiance',
    title: 'Allegiance',
    vj: 'Vj Junior',
    eps: 'EPS',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    isLocked: true,
  },
  {
    id: 'show-last-seen',
    title: 'Last Seen',
    vj: 'Vj Emmy',
    eps: 'EPS',
    posterUrl: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?auto=format&fit=crop&w=600&q=80',
    isLocked: true,
  },
  {
    id: 'show-dream-to-you',
    title: 'Dream to You',
    vj: 'Vj Junior',
    eps: 'EPS',
    posterUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    isLocked: false,
  },
  {
    id: 'show-carrie',
    title: 'Carrie',
    vj: 'Vj Junior',
    eps: 'EPS',
    posterUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=600&q=80',
    isLocked: true,
  },
  {
    id: 'show-blossoms',
    title: 'Blossoms of Power',
    vj: 'Vj Emmy',
    eps: 'EPS',
    posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    isLocked: true,
  },
  {
    id: 'show-beauty-in-black',
    title: 'Beauty in Black',
    vj: 'Vj Junior',
    eps: 'EPS 3.1',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    isLocked: true,
  },
  {
    id: 'show-2gen-one-laugh',
    title: '2 Generations One Laugh',
    vj: 'Vj Emmy',
    eps: 'EPS',
    posterUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
    isLocked: false,
  },
  {
    id: 'show-mobland',
    title: 'Mobland Season 2',
    vj: 'Vj Emmy',
    eps: 'EPS 2.1',
    posterUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
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
    <div className="min-h-full bg-[#05051F] text-white flex flex-col pb-24 select-none animate-fadeIn">
      {/* Top Header matching Screenshot 15 */}
      <div className="h-14 px-4 flex items-center justify-between sticky top-0 bg-[#05051F]/95 backdrop-blur-md z-30 border-b border-white/[0.04]">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-white hover:text-[#00D522] transition-colors focus:outline-none cursor-pointer"
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
            className="text-white hover:opacity-80 transition-opacity focus:outline-none cursor-pointer"
            aria-label="Cast"
          >
            <Cast className="w-[20px] h-[20px] stroke-[2]" />
          </button>
          <button
            onClick={onNotificationsClick}
            className="text-white hover:opacity-80 transition-opacity focus:outline-none cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-[20px] h-[20px] stroke-[2]" />
          </button>
          <button
            onClick={onSearchClick}
            className="text-white hover:text-[#00D522] transition-colors focus:outline-none cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-[20px] h-[20px] stroke-[2]" />
          </button>
        </div>
      </div>

      {/* 3-Column Dense Poster Grid matching Screenshot 15 */}
      <div className="p-3 grid grid-cols-3 gap-2.5 flex-1">
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
            <MoviePoster
              src={show.posterUrl}
              alt={show.title}
              title={show.title}
              vj={show.vj}
              isLocked={show.isLocked}
              episodesCount={show.eps}
              showOverlayText
            />
          </div>
        ))}
      </div>
    </div>
  );
};
