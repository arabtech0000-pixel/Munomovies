import React from 'react';
import { Cast, Bell, Search, Play } from 'lucide-react';
import { Movie } from '../../types';

interface FeaturedHeroProps {
  movie: Movie;
  onSearchClick: () => void;
  onCastClick: () => void;
  onNotificationsClick: () => void;
  onWatchNowClick: (movie: Movie) => void;
  onMovieClick: (movie: Movie) => void;
}

export const FeaturedHero: React.FC<FeaturedHeroProps> = ({
  movie,
  onSearchClick,
  onCastClick,
  onNotificationsClick,
  onWatchNowClick,
  onMovieClick,
}) => {
  return (
    <div className="relative w-full overflow-hidden select-none bg-[#05051F]">
      {/* 
        The entire hero banner spans from the very top (Y: 0).
        Top header (MN logo, Cast, Bell, Search) is inside this banner.
        Title, description, and Watch Now are inside this banner.
      */}

      {/* Cinematic Background Image Container */}
      <div
        onClick={() => onMovieClick(movie)}
        className="relative w-full min-h-[380px] sm:min-h-[420px] flex flex-col justify-between cursor-pointer group"
      >
        {/* Background Image with dark cinematic treatment */}
        <div className="absolute inset-0 z-0">
          {(movie.heroBannerUrl || movie.posterUrl) && (
            <img
              src={movie.heroBannerUrl || movie.posterUrl || undefined}
              alt={movie.title}
              className="w-full h-full object-cover object-center opacity-70 group-hover:scale-102 transition-transform duration-700"
            />
          )}

          {/* Deep Navy/Black Gradient Overlay matching Screenshot 6 */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#05051F]/90 via-[#05051F]/60 to-[#05051F]" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#05051F] via-[#05051F]/90 to-transparent" />
        </div>

        {/* 1. TOP HEADER INSIDE THE BANNER */}
        <div className="relative z-20 h-14 px-4 pt-2 flex items-center justify-between">
          {/* Left: The exact stylized "MN" 3D logo as seen in Screenshot 6 */}
          <div className="flex items-center cursor-pointer">
            <svg
              className="h-[28px] w-auto"
              viewBox="0 0 110 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="whiteMetallicHero" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#E2E8F0" />
                  <stop offset="100%" stopColor="#94A3B8" />
                </linearGradient>
                <linearGradient id="greenVividHero" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00FF2A" />
                  <stop offset="50%" stopColor="#00D522" />
                  <stop offset="100%" stopColor="#009915" />
                </linearGradient>
                <filter id="shadow3dHero" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.8" />
                </filter>
              </defs>

              {/* Left leg of M */}
              <path
                d="M6 34V4h8l9 17 9-17h8v30h-7V16l-8 15h-4l-8-15v18H6z"
                fill="url(#whiteMetallicHero)"
                filter="url(#shadow3dHero)"
              />

              {/* Connected Green N with 3D angle */}
              <path
                d="M36 34V4h7l14 20V4h7v30h-7L43 14v20h-7z"
                fill="url(#greenVividHero)"
                filter="url(#shadow3dHero)"
              />
            </svg>
          </div>

          {/* Right: Cast, Bell, Search icons - exact size and alignment from Screenshot 6 */}
          <div
            className="flex items-center space-x-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onCastClick}
              className="text-white hover:opacity-80 transition-opacity focus:outline-none"
              title="Cast to screen"
              aria-label="Chromecast"
            >
              <Cast className="w-[22px] h-[22px] stroke-[2]" />
            </button>
            <button
              onClick={onNotificationsClick}
              className="text-white hover:opacity-80 transition-opacity focus:outline-none"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-[22px] h-[22px] stroke-[2]" />
            </button>
            <button
              onClick={onSearchClick}
              className="text-white hover:text-[#00D522] transition-colors focus:outline-none"
              title="Search"
              aria-label="Search"
            >
              <Search className="w-[22px] h-[22px] stroke-[2]" />
            </button>
          </div>
        </div>

        {/* 2. BANNER CONTENT (Title, Description, and Watch Now Button) */}
        <div className="relative z-20 px-4 pt-16 pb-4 flex flex-col justify-end">
          {/* Movie Title: "Omuzigo :" */}
          <div className="flex items-baseline space-x-2 flex-wrap">
            <h2 className="text-white text-[26px] font-bold tracking-tight leading-tight drop-shadow-md">
              {movie.title} :
            </h2>
            {movie.secondaryLabel && (
              <span className="text-[#00D522] font-bold text-[22px] tracking-tight">
                {movie.secondaryLabel}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-1.5 text-[#D0D0D8] text-[13.5px] leading-[1.4] font-normal line-clamp-3 max-w-[340px]">
            {movie.description}
          </p>

          {/* Watch Now Button Row directly inside the banner */}
          <div
            className="mt-4 flex items-center space-x-3.5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onWatchNowClick(movie)}
              className="w-13 h-13 rounded-full bg-[#00D522] hover:bg-[#02ec27] active:scale-95 flex items-center justify-center shadow-[0_4px_16px_rgba(0,213,34,0.45)] transition-all group/btn focus:outline-none"
              aria-label="Play Featured Movie"
            >
              <Play className="w-6 h-6 text-white fill-white ml-0.5 group-hover/btn:scale-105 transition-transform" />
            </button>

            <button
              onClick={() => onWatchNowClick(movie)}
              className="text-white hover:text-[#00D522] text-[15px] font-semibold tracking-wide transition-colors focus:outline-none"
            >
              Watch Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
