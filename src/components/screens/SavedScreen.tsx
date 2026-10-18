import React from 'react';
import { ArrowLeft, Cast, Bell, Search, Plus, Trash2 } from 'lucide-react';
import { Movie } from '../../types';

interface SavedScreenProps {
  savedMovies: Movie[];
  onBack: () => void;
  onMovieClick: (movie: Movie) => void;
  onRemoveMovie: (movieId: string) => void;
  onExploreClick: () => void;
  onSearchClick: () => void;
  onCastClick: () => void;
  onNotificationsClick: () => void;
}

export const SavedScreen: React.FC<SavedScreenProps> = ({
  savedMovies,
  onBack,
  onMovieClick,
  onRemoveMovie,
  onExploreClick,
  onSearchClick,
  onCastClick,
  onNotificationsClick,
}) => {
  return (
    <div className="min-h-full bg-[#05051F] text-white flex flex-col pb-20 select-none">
      {/* Top Header matching Screenshot 1 */}
      <div className="h-14 px-4 flex items-center justify-between sticky top-0 bg-[#05051F]/95 backdrop-blur-md z-30 border-b border-white/[0.04]">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-white hover:text-white/80 transition-colors focus:outline-none"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
          <h2 className="text-white text-[18px] font-bold tracking-tight">Saved</h2>
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

      {/* Body: Matching Screenshot 1 */}
      {savedMovies.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center min-h-[65vh]">
          {/* Large Plus Icon matching Screenshot 1 */}
          <div className="mb-4">
            <Plus className="w-14 h-14 text-white stroke-[2.5]" />
          </div>

          <p className="text-white text-[13.5px] leading-relaxed max-w-[280px]">
            To keep track of the movies that you want to watch, just tap watch Add Mylist icon.
          </p>
        </div>
      ) : (
        <div className="p-4 grid grid-cols-3 gap-2.5">
          {savedMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onMovieClick(movie)}
              className="relative aspect-[2/3] rounded-lg overflow-hidden bg-[#111128] cursor-pointer group"
            >
              {movie.posterUrl && (
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveMovie(movie.id);
                }}
                className="absolute top-1 right-1 p-1 bg-black/60 rounded text-[#9292A5] hover:text-red-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
