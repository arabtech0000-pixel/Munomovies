import React from 'react';
import { Cast, Bell, Search } from 'lucide-react';

interface HeaderProps {
  onSearchClick: () => void;
  onCastClick?: () => void;
  onNotificationsClick?: () => void;
  activeScreen?: string;
  onBackClick?: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchClick,
  onCastClick,
  onNotificationsClick,
  activeScreen = 'home',
  onBackClick,
  title,
}) => {
  // If we are on a secondary screen with title (like Saved, Genres, Detail, etc.)
  if (title || (activeScreen !== 'home' && activeScreen !== 'menu')) {
    return (
      <header className="h-14 px-4 flex items-center justify-between bg-[#05051F] sticky top-0 z-30 transition-all">
        <div className="flex items-center space-x-3">
          {onBackClick && (
            <button
              onClick={onBackClick}
              className="p-1 -ml-1 text-white hover:text-[#00D522] transition-colors focus:outline-none"
              aria-label="Go back"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          )}
          <h1 className="text-white text-lg font-bold tracking-tight">
            {title || 'MunoWatch'}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onCastClick}
            className="text-white hover:opacity-80 transition-opacity focus:outline-none"
            aria-label="Chromecast"
          >
            <Cast className="w-[22px] h-[22px] stroke-[2]" />
          </button>
          <button
            onClick={onNotificationsClick}
            className="text-white hover:opacity-80 transition-opacity focus:outline-none"
            aria-label="Notifications"
          >
            <Bell className="w-[22px] h-[22px] stroke-[2]" />
          </button>
          <button
            onClick={onSearchClick}
            className="text-white hover:text-[#00D522] transition-colors focus:outline-none"
            aria-label="Search"
          >
            <Search className="w-[22px] h-[22px] stroke-[2]" />
          </button>
        </div>
      </header>
    );
  }

  // Primary Home Screen Top Bar directly from Screenshot 6
  return (
    <header className="h-14 px-4 pt-1 flex items-center justify-between bg-transparent relative z-30">
      {/* Left: The exact stylized "MN" 3D logo as seen in Screenshot 6 */}
      <div className="flex items-center cursor-pointer select-none">
        <svg
          className="h-8 w-auto"
          viewBox="0 0 110 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized MunoWatch 3D "MN" mark */}
          <defs>
            <linearGradient id="whiteMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <linearGradient id="greenVivid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FF2A" />
              <stop offset="50%" stopColor="#00D522" />
              <stop offset="100%" stopColor="#009915" />
            </linearGradient>
            <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Left leg of M */}
          <path
            d="M6 34V4h8l9 17 9-17h8v30h-7V16l-8 15h-4l-8-15v18H6z"
            fill="url(#whiteMetallic)"
            filter="url(#shadow3d)"
          />

          {/* Connected Green N with 3D angle */}
          <path
            d="M36 34V4h7l14 20V4h7v30h-7L43 14v20h-7z"
            fill="url(#greenVivid)"
            filter="url(#shadow3d)"
          />
        </svg>
      </div>

      {/* Right: Cast, Bell, Search icons - exact size and alignment as in Screenshot 6 */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onCastClick}
          className="text-white hover:opacity-80 transition-opacity focus:outline-none"
          title="Cast"
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
    </header>
  );
};
