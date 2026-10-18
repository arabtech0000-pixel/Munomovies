import React, { useState } from 'react';
import { ArrowLeft, Cast, Search, Lock, X } from 'lucide-react';
import { ALL_MOVIES_FOR_SEARCH } from '../../data/mockData';
import { Movie } from '../../types';

interface SearchScreenProps {
  onBack: () => void;
  onMovieClick: (movie: Movie) => void;
  initialQuery?: string;
  onCastClick: () => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  onBack,
  onMovieClick,
  initialQuery = '',
  onCastClick,
}) => {
  const [query, setQuery] = useState(initialQuery);

  const filteredMovies = ALL_MOVIES_FOR_SEARCH.filter((m) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      m.genre.toLowerCase().includes(q) ||
      m.vj.toLowerCase().includes(q) ||
      (m.secondaryLabel && m.secondaryLabel.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-full bg-[#05051F] text-white flex flex-col pb-20 select-none">
      {/* Top Header matching Screenshot 7 */}
      <div className="h-14 px-3 flex items-center space-x-2 sticky top-0 bg-[#05051F]/95 backdrop-blur-md z-30 border-b border-white/5">
        <button
          onClick={onBack}
          className="p-1 text-white hover:text-[#00D522] transition-colors focus:outline-none flex-shrink-0"
          aria-label="Back"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </button>

        {/* Search Input Field */}
        <div className="flex-1 relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie, series, veeja..."
            autoFocus
            className="w-full bg-transparent text-white placeholder-[#9292A5] text-[14px] font-normal focus:outline-none pr-8 truncate"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-1 text-[#9292A5] hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={onCastClick}
          className="p-1.5 text-white/90 hover:text-white flex-shrink-0 focus:outline-none"
        >
          <Cast className="w-5 h-5 stroke-[2.2]" />
        </button>
      </div>



      {/* 3-Column Dense Poster Grid matching Screenshot 7 */}
      <div className="p-2 grid grid-cols-3 gap-2">
        {filteredMovies.map((movie) => (
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

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Top-Left Lock Icon */}
            {movie.isLocked && (
              <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-xs p-0.5 rounded">
                <Lock className="w-3 h-3 text-white" />
              </div>
            )}

            {/* Title snippet */}
            <div className="absolute inset-x-0 bottom-0 p-1 text-center">
              <p className="text-white text-[10px] font-bold truncate leading-tight uppercase">
                {movie.title}
              </p>
              {movie.vj && (
                <p className="text-[#00D522] text-[9px] font-medium truncate">
                  {movie.vj}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-[#9292A5] mt-12">
          <Search className="w-12 h-12 text-[#9292A5]/50 mb-3" />
          <p className="text-white text-sm font-semibold">No results found for "{query}"</p>
          <p className="text-xs text-[#9292A5] mt-1">Try searching for Vj Junior, action movies, or thriller series.</p>
        </div>
      )}
    </div>
  );
};
