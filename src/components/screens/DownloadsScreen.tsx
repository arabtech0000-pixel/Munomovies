import React from 'react';
import { ArrowLeft, Cast, Bell, Search, CloudDownload, Trash2 } from 'lucide-react';
import { Movie } from '../../types';

interface DownloadsScreenProps {
  onBack: () => void;
  onMovieClick: (movie: Movie) => void;
  onSearchClick: () => void;
  onCastClick: () => void;
  onNotificationsClick: () => void;
  downloadedMovies?: Movie[];
  onDeleteDownload?: (id: string) => void;
}

export const DownloadsScreen: React.FC<DownloadsScreenProps> = ({
  onBack,
  onMovieClick,
  onSearchClick,
  onCastClick,
  onNotificationsClick,
  downloadedMovies = [],
  onDeleteDownload,
}) => {
  return (
    <div className="min-h-full bg-[#05051F] text-white flex flex-col pb-20 select-none">
      {/* Top Header matching Screenshot 4 */}
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
            My downloads
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

      {/* Body: Matching Screenshot 4 (Centered cloud icon and exact text) */}
      {downloadedMovies.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center min-h-[65vh]">
          {/* Cloud icon with down arrow matching Screenshot 4 */}
          <div className="mb-4 text-white">
            <svg
              className="w-16 h-16 mx-auto text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
            </svg>
          </div>

          <p className="text-white text-[13.5px] leading-relaxed max-w-[280px]">
            You haven't downloaded anything yet,<br />
            Find Something to Download.
          </p>
        </div>
      ) : (
        <div className="px-4 py-3 space-y-3">
          {downloadedMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onMovieClick(movie)}
              className="flex items-center space-x-3 bg-white/[0.03] p-2.5 rounded-xl cursor-pointer"
            >
              {movie.posterUrl && (
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-16 h-20 object-cover rounded-lg"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">{movie.title}</p>
                <p className="text-[#00D522] text-xs mt-0.5">{movie.vj}</p>
                <p className="text-[#9292A5] text-[11px] mt-0.5">{movie.fileSize || '1.2 GB'}</p>
              </div>
              {onDeleteDownload && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteDownload(movie.id);
                  }}
                  className="p-2 text-[#9292A5] hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
