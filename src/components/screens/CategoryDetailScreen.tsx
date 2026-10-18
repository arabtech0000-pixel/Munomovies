import React, { useState } from 'react';
import { ArrowLeft, Cast, Bell, Search, Lock, Globe, Clock, Play } from 'lucide-react';
import { Movie } from '../../types';

interface CategoryDetailScreenProps {
  categoryTitle: string;
  punctuality?: string;
  endpoint?: string;
  movies: Movie[];
  onBack: () => void;
  onMovieClick: (movie: Movie) => void;
  onSearchClick: () => void;
  onCastClick: () => void;
  onNotificationsClick: () => void;
}

export const CategoryDetailScreen: React.FC<CategoryDetailScreenProps> = ({
  categoryTitle,
  punctuality,
  endpoint,
  movies,
  onBack,
  onMovieClick,
  onSearchClick,
  onCastClick,
  onNotificationsClick,
}) => {
  const [selectedVj, setSelectedVj] = useState<string>('All');

  // Extract unique VJs in this category
  const availableVjs = ['All', ...Array.from(new Set(movies.map((m) => m.vj)))];

  const filteredMovies = movies.filter((m) => {
    if (selectedVj === 'All') return true;
    return m.vj === selectedVj;
  });

  return (
    <div className="min-h-full bg-[#05051F] text-white flex flex-col pb-20 select-none animate-fadeIn">
      {/* Top Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-white/[0.04] sticky top-0 bg-[#05051F]/95 backdrop-blur-md z-30">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-white hover:text-[#00D522] transition-colors focus:outline-none"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
          <h1 className="text-white text-[18px] font-bold tracking-tight truncate max-w-[200px]">
            {categoryTitle}
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
            className="text-white hover:text-[#00D522] transition-colors focus:outline-none"
            aria-label="Search"
          >
            <Search className="w-[20px] h-[20px] stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Category Punctuality & API Endpoint Information Banner */}
      <div className="mx-4 mt-3 p-3 bg-white/[0.03] border border-white/[0.05] rounded-xl space-y-1.5">
        {punctuality && (
          <div className="flex items-center space-x-2 text-xs">
            <Clock className="w-3.5 h-3.5 text-[#00D522]" />
            <span className="text-[#00D522] font-semibold">{punctuality}</span>
          </div>
        )}
        {endpoint && (
          <div className="flex items-center space-x-2 text-[11px] text-[#9292A5]">
            <Globe className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span className="font-mono truncate">https://munowatch.com{endpoint}</span>
          </div>
        )}
      </div>

      {/* VJ Filter Pills */}
      {availableVjs.length > 2 && (
        <div className="px-4 py-2.5 flex items-center space-x-2 overflow-x-auto scrollbar-none border-b border-white/[0.04]">
          {availableVjs.map((vj) => (
            <button
              key={vj}
              onClick={() => setSelectedVj(vj)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedVj === vj
                  ? 'bg-[#00D522] text-[#05051F]'
                  : 'bg-white/[0.06] text-[#9292A5] hover:text-white'
              }`}
            >
              {vj}
            </button>
          ))}
        </div>
      )}

      {/* Grid of Posters */}
      <div className="p-4 grid grid-cols-3 gap-2.5 flex-1">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => onMovieClick(movie)}
            className="cursor-pointer group flex flex-col"
          >
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-[#111128] shadow-md transition-transform group-hover:scale-105">
              {movie.posterUrl && (
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {movie.isLocked && (
                <div className="absolute top-1.5 left-1.5 bg-black/60 p-1 rounded">
                  <Lock className="w-3 h-3 text-white" />
                </div>
              )}

              {movie.episodesCount && (
                <div className="absolute top-1.5 right-1.5 bg-[#00D522] text-[#05051F] px-1 rounded text-[9px] font-black">
                  EPS {movie.episodesCount}
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 p-1.5">
                <p className="text-white text-[10.5px] font-bold truncate leading-tight">
                  {movie.title}
                </p>
                <p className="text-[#00D522] text-[9.5px] font-medium truncate mt-0.5">
                  {movie.vj}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
