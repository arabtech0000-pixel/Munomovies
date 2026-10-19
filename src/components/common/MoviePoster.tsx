import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface MoviePosterProps {
  src?: string | null;
  alt: string;
  title: string;
  vj?: string;
  isLocked?: boolean;
  episodesCount?: number | string;
  progressPercent?: number; // e.g. 68 or 0.68
  aspectRatio?: string; // e.g. 'aspect-[2/3]'
  className?: string;
  showOverlayText?: boolean;
  isPlaceholder?: boolean;
}

export const MountainPlaceholder: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg
    className={`${className} text-white/90 fill-current drop-shadow-sm`}
    viewBox="0 0 100 100"
  >
    {/* Left peak: lower geometric triangle */}
    <polygon points="12,74 38,36 58,74" />
    {/* Right peak: taller geometric triangle */}
    <polygon points="40,74 68,18 94,74" />
  </svg>
);

export const MoviePoster: React.FC<MoviePosterProps> = ({
  src,
  alt,
  title,
  vj,
  isLocked = true,
  episodesCount,
  progressPercent,
  aspectRatio = 'aspect-[2/3]',
  className = '',
  showOverlayText = false,
  isPlaceholder = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const normalizedProgress =
    progressPercent != null
      ? progressPercent > 1
        ? progressPercent
        : progressPercent * 100
      : null;

  // Enforce zero mock Unsplash pictures: only valid TMDB or custom real image URLs
  const isValidImage = Boolean(
    src &&
    !src.includes('unsplash.com') &&
    src !== 'placeholder' &&
    !hasError
  );

  const showMountainPlaceholder = isPlaceholder || !isValidImage;

  return (
    <div
      className={`relative w-full ${aspectRatio} rounded-lg overflow-hidden bg-[#0A0A28] shadow-md select-none transition-transform duration-200 group-hover:scale-[1.02] ${className}`}
    >
      {/* Real TMDB Poster Artwork or Neutral Dual-Mountain Placeholder */}
      {isValidImage ? (
        <img
          src={src || ''}
          alt={alt || title}
          loading="lazy"
          draggable={false}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover pointer-events-none transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        /* Neutral application-designed placeholder matching the reference screenshots */
        <div className="w-full h-full bg-gradient-to-b from-[#0B0B2A] to-[#040416] flex flex-col items-center justify-center p-2 relative">
          <MountainPlaceholder className="w-12 h-12 opacity-85 mb-1" />
          {title && (
            <p className="text-white/80 text-[10px] font-semibold text-center line-clamp-2 px-1 uppercase tracking-tight">
              {title}
            </p>
          )}
          {vj && (
            <p className="text-[#00D522] text-[9px] font-medium text-center truncate">
              {vj}
            </p>
          )}
        </div>
      )}

      {/* Top-Left Small White Lock Icon (matching Screenshots 201123 & 201136) */}
      {isLocked && (
        <div className="absolute top-1.5 left-1.5 z-10 p-0.5 rounded bg-black/40 backdrop-blur-xs pointer-events-none">
          <Lock className="w-3.5 h-3.5 text-white stroke-[2.2]" />
        </div>
      )}

      {/* Top-Right Green EPS Text Badge */}
      {episodesCount && (
        <div className="absolute top-1.5 right-1.5 z-10 text-[#00D522] text-[10px] font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] pointer-events-none">
          {typeof episodesCount === 'number' ? `EPS ${episodesCount}` : episodesCount}
        </div>
      )}

      {/* Bottom Progress Bar along the edge (Continue Watching) */}
      {normalizedProgress != null && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10">
          <div
            className="h-full bg-[#00D522] transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, normalizedProgress))}%` }}
          />
        </div>
      )}

      {/* Optional Title & VJ text overlay when enabled and image is loaded */}
      {isValidImage && showOverlayText && title && (
        <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none z-10">
          <p className="text-white text-[10px] font-bold truncate leading-tight uppercase">
            {title}
          </p>
          {vj && (
            <p className="text-[#00D522] text-[9px] font-medium truncate">
              {vj}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
