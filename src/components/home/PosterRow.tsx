import React, { useRef, useState } from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import { Movie } from '../../types';

interface PosterRowProps {
  title: string;
  movies: Movie[];
  onArrowClick: () => void;
  onMovieClick: (movie: Movie) => void;
}

export const PosterRow: React.FC<PosterRowProps> = ({
  title,
  movies,
  onArrowClick,
  onMovieClick,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragInfo = useRef({ startX: 0, scrollLeft: 0, hasMoved: false });

  // Mouse drag-to-scroll support for desktop preview
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!rowRef.current) return;
    setIsDragging(true);
    dragInfo.current = {
      startX: e.pageX - rowRef.current.offsetLeft,
      scrollLeft: rowRef.current.scrollLeft,
      hasMoved: false,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !rowRef.current) return;
    const x = e.pageX - rowRef.current.offsetLeft;
    const walk = (x - dragInfo.current.startX) * 1.5;
    if (Math.abs(walk) > 5) {
      dragInfo.current.hasMoved = true;
    }
    rowRef.current.scrollLeft = dragInfo.current.scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleMovieItemClick = (movie: Movie) => {
    // Suppress click if user was dragging horizontally
    if (dragInfo.current.hasMoved) {
      dragInfo.current.hasMoved = false;
      return;
    }
    onMovieClick(movie);
  };

  return (
    <section className="mt-5 select-none">
      {/* Section Header with Title & Arrow (exact match to Screenshot 12) */}
      <div className="px-4 flex items-center justify-between">
        <h3 className="text-white text-[17px] font-bold tracking-tight">
          {title}
        </h3>

        <button
          onClick={onArrowClick}
          className="text-white hover:text-white/80 p-1 -mr-1 transition-colors focus:outline-none"
          aria-label={`View more ${title}`}
        >
          <ArrowRight className="w-5 h-5 stroke-[2.2]" />
        </button>
      </div>

      {/* 
        Horizontal Scrollable Poster List:
        - Natural touch scrolling: both vertical page scrolls and horizontal carousels work seamlessly!
        - Mouse drag support on desktop
      */}
      <div
        ref={rowRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className="mt-2.5 flex overflow-x-auto scrollbar-none px-4 space-x-2.5 pb-2 cursor-grab active:cursor-grabbing"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleMovieItemClick(movie)}
            className="flex-shrink-0 w-[124px] sm:w-[130px] cursor-pointer group"
          >
            <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-[#111128] shadow-md transition-transform duration-200 group-hover:scale-[1.02]">
              {movie.posterUrl && (
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  loading="lazy"
                  draggable={false}
                  className="w-full h-full object-cover pointer-events-none"
                />
              )}

              {/* Top-Left Lock Icon Badge (from Screenshot 12) */}
              {movie.isLocked && (
                <div className="absolute top-1.5 left-1.5 bg-black/50 backdrop-blur-xs p-1 rounded pointer-events-none">
                  <Lock className="w-3.5 h-3.5 text-white/90" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
