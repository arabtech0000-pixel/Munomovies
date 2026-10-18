import React from 'react';
import { ArrowLeft, Cast, Bell, Search, Download, ChevronRight, Lock } from 'lucide-react';
import { NEW_UPLOADS_LIST } from '../../data/mockData';
import { Movie } from '../../types';

interface NewUploadsScreenProps {
  onBack: () => void;
  onMovieClick: (movie: Movie) => void;
  onSearchClick: () => void;
  onCastClick: () => void;
  onNotificationsClick: () => void;
}

export const NewUploadsScreen: React.FC<NewUploadsScreenProps> = ({
  onBack,
  onMovieClick,
  onSearchClick,
  onCastClick,
  onNotificationsClick,
}) => {
  return (
    <div className="min-h-full bg-[#05051F] text-white flex flex-col pb-20 select-none">
      {/* Top Header matching Screenshot_20261018_110344_Munowatch.jpg */}
      <div className="h-14 px-4 flex items-center justify-between sticky top-0 bg-[#05051F] z-30">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-white hover:text-white/80 transition-colors focus:outline-none"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
          <h1 className="text-white text-[18px] font-bold tracking-tight">
            New uploads
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onCastClick}
            className="p-1 text-white hover:opacity-80 transition-opacity"
            aria-label="Cast to TV"
          >
            <Cast className="w-[20px] h-[20px] stroke-[2]" />
          </button>
          <button
            onClick={onNotificationsClick}
            className="p-1 text-white hover:opacity-80 transition-opacity"
            aria-label="Notifications"
          >
            <Bell className="w-[20px] h-[20px] stroke-[2]" />
          </button>
          <button
            onClick={onSearchClick}
            className="p-1 text-white hover:opacity-80 transition-opacity"
            aria-label="Search"
          >
            <Search className="w-[20px] h-[20px] stroke-[2]" />
          </button>
        </div>
      </div>

      {/* List of New Uploads matching the exact items in the screenshot */}
      <div className="divide-y divide-white/[0.04]">
        {NEW_UPLOADS_LIST.map((movie, idx) => (
          <div
            key={movie.id}
            onClick={() => onMovieClick(movie)}
            className="px-4 py-3 flex items-start space-x-3.5 hover:bg-white/[0.02] cursor-pointer"
          >
            {/* Square Poster with VIP Lock Badge top-left */}
            <div className="relative w-[78px] h-[78px] flex-shrink-0 rounded-[4px] overflow-hidden bg-[#111128]">
              {movie.posterUrl && (
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              )}
              {movie.isLocked && (
                <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-xs p-0.5 rounded-[3px]">
                  <Lock className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {/* Movie Info */}
            <div className="flex-1 min-w-0 pr-1">
              <h3 className="text-white text-[14px] font-bold truncate leading-tight">
                {movie.title}
              </h3>

              <p className="text-[#8E8E9F] text-[11px] line-clamp-2 mt-1 leading-snug">
                {movie.description}
              </p>

              <div className="flex items-center space-x-4 mt-2">
                {movie.fileSize && (
                  <span className="text-[#00D522] font-semibold text-[12px]">
                    {movie.fileSize}
                  </span>
                )}
                <span className="text-white text-[12px] font-normal">
                  {movie.duration}
                </span>
              </div>
            </div>

            {/* Right Action: Download icon for items 0..2, Chevron for items 3..5 */}
            <div className="self-center pl-1 text-white flex-shrink-0">
              {idx < 3 ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-1 text-white hover:text-[#00D522] transition-colors focus:outline-none"
                  aria-label="Download"
                >
                  <Download className="w-5 h-5 stroke-[2]" />
                </button>
              ) : (
                <div className="p-1 text-white">
                  <ChevronRight className="w-5 h-5 stroke-[2]" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
