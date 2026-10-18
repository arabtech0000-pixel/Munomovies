import React, { useState, useEffect } from 'react';
import { ArrowLeft, Cast, Bell, Search, Play } from 'lucide-react';
import { Movie } from '../../types';
import { fetchDashboardData } from '../../services/api';

interface CategoriesScreenProps {
  onBack: () => void;
  onMovieClick: (movie: Movie) => void;
  onSearchClick: () => void;
  onCastClick: () => void;
  onNotificationsClick: () => void;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  onBack,
  onMovieClick,
  onSearchClick,
  onCastClick,
  onNotificationsClick,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadServerMovies() {
      try {
        const data = await fetchDashboardData();
        const all = [...(data.heroMovies || []), ...(data.latestMovies || [])];
        setMovies(all);
      } catch (e) {
        console.warn('Failed to load server movies on second page:', e);
      } finally {
        setLoading(false);
      }
    }
    loadServerMovies();
  }, []);

  return (
    <div className="min-h-full bg-[#05051F] text-white flex flex-col pb-24 select-none">
      {/* Top Header */}
      <div className="h-14 px-4 flex items-center justify-between sticky top-0 bg-[#05051F]/95 backdrop-blur-md z-30 border-b border-white/[0.04]">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-white hover:text-white/80 transition-colors focus:outline-none"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
          <h1 className="text-white text-[18px] font-bold tracking-tight">Movies & Posters</h1>
        </div>

        <div className="flex items-center space-x-3.5">
          <button onClick={onCastClick} className="p-1 text-white hover:opacity-80">
            <Cast className="w-[20px] h-[20px] stroke-[2]" />
          </button>
          <button onClick={onNotificationsClick} className="p-1 text-white hover:opacity-80">
            <Bell className="w-[20px] h-[20px] stroke-[2]" />
          </button>
          <button onClick={onSearchClick} className="p-1 text-white hover:opacity-80">
            <Search className="w-[20px] h-[20px] stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Movie Posters Grid Fetched from Server */}
      <div className="flex-1 px-4 py-4">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-[#8E8E9F] text-sm">
            Fetching movies and posters from server...
          </div>
        ) : movies.length === 0 ? (
          <div className="flex items-center justify-center py-20 text-[#8E8E9F] text-sm">
            No movies available from server.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {movies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => onMovieClick(movie)}
                className="flex flex-col cursor-pointer group bg-[#0A0A2E] rounded-xl overflow-hidden border border-white/[0.06] hover:border-white/20 transition-all duration-300"
              >
                {/* Poster Image */}
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#12123A]">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05051F]/80 via-transparent to-transparent opacity-80" />
                  
                  {/* Duration Badge */}
                  {movie.duration && (
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 backdrop-blur-sm text-[10px] font-medium text-white rounded">
                      {movie.duration}
                    </span>
                  )}
                </div>

                {/* Movie Info */}
                <div className="p-2.5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-[13px] font-semibold text-white line-clamp-1 group-hover:text-[#00D522] transition-colors">
                      {movie.title}
                    </h3>
                    <p className="text-[11px] text-[#8E8E9F] mt-0.5">
                      {movie.vj || movie.genre || 'MunoWatch'}
                    </p>
                  </div>
                  {movie.fileSize && (
                    <span className="text-[10px] text-white/50 mt-1">
                      {movie.fileSize}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
