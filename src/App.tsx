/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Movie, ActiveTab, ViewScreen } from './types';
import {
  FEATURED_HERO_MOVIES,
  LATEST_ON_MUNOWATCH,
  CONTINUE_WATCHING_LIST,
  ACTION_MOVIES,
  HORROR_MOVIES,
  TV_SERIES_MOVIES,
  KUNGFU_MOVIES,
  ANIMES_MOVIES,
  VJ_JUNIOR_EXCLUSIVES,
} from './data/mockData';
import { BottomNav } from './components/common/BottomNav';
import { FeaturedHero } from './components/home/FeaturedHero';
import { PosterRow } from './components/home/PosterRow';
import { ContinueWatchingRow } from './components/home/ContinueWatchingRow';
import { MovieDetailScreen, YOU_MAY_ALSO_LIKE_LIST } from './components/screens/MovieDetailScreen';
import { CategoriesScreen } from './components/screens/CategoriesScreen';
import { SavedScreen } from './components/screens/SavedScreen';
import { MenuScreen } from './components/screens/MenuScreen';
import { SearchScreen } from './components/screens/SearchScreen';
import { NewUploadsScreen } from './components/screens/NewUploadsScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { ShowsScreen } from './components/screens/ShowsScreen';
import { RecentlyWatchedScreen } from './components/screens/RecentlyWatchedScreen';
import { DownloadsScreen } from './components/screens/DownloadsScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { SupportScreen } from './components/screens/SupportScreen';
import { PhoneSimulator } from './components/phone/PhoneSimulator';
import { fetchDashboardData } from './services/api';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ViewScreen>('home');
  const [currentTab, setCurrentTab] = useState<ActiveTab>('home');
  const [heroMovies, setHeroMovies] = useState<Movie[]>(FEATURED_HERO_MOVIES);
  const [latestMovies, setLatestMovies] = useState<Movie[]>(LATEST_ON_MUNOWATCH);
  const [actionMovies, setActionMovies] = useState<Movie[]>(ACTION_MOVIES);
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>(HORROR_MOVIES);
  const [seriesMovies, setSeriesMovies] = useState<Movie[]>(TV_SERIES_MOVIES);
  const [kungfuMovies, setKungfuMovies] = useState<Movie[]>(KUNGFU_MOVIES);
  const [animationMovies, setAnimationMovies] = useState<Movie[]>(ANIMES_MOVIES);
  const [vjJuniorMovies, setVjJuniorMovies] = useState<Movie[]>(VJ_JUNIOR_EXCLUSIVES);
  const [selectedMovie, setSelectedMovie] = useState<Movie>(LATEST_ON_MUNOWATCH[2]); // "Love of Your Life"
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]); // Starts empty matching Screenshot 1
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    fetchDashboardData().then(data => {
      if (data.heroMovies?.length) setHeroMovies(data.heroMovies.map((m: Movie) => ({ ...m, isLocked: false })));
      if (data.latestMovies?.length) setLatestMovies(data.latestMovies.map((m: Movie) => ({ ...m, isLocked: false })));
      if (data.actionMovies?.length) setActionMovies(data.actionMovies.map((m: Movie) => ({ ...m, isLocked: false })));
      if (data.horrorMovies?.length) setHorrorMovies(data.horrorMovies.map((m: Movie) => ({ ...m, isLocked: false })));
      if (data.seriesMovies?.length) setSeriesMovies(data.seriesMovies.map((m: Movie) => ({ ...m, isLocked: false })));
      if (data.kungfuMovies?.length) setKungfuMovies(data.kungfuMovies.map((m: Movie) => ({ ...m, isLocked: false })));
      if (data.animationMovies?.length) setAnimationMovies(data.animationMovies.map((m: Movie) => ({ ...m, isLocked: false })));
      if (data.vjJuniorMovies?.length) setVjJuniorMovies(data.vjJuniorMovies.map((m: Movie) => ({ ...m, isLocked: false })));
    }).catch(err => {
      console.log('Using synchronized local catalog:', err);
    });
  }, []);

  // Scroll container and smooth vertical mouse drag scrolling for desktop
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingY = useRef(false);
  const dragYInfo = useRef({ startY: 0, scrollTop: 0, hasMoved: false });

  const handleScrollMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Only primary mouse button
    const target = e.target as HTMLElement;
    // Don't intercept clicks on buttons or search inputs
    if (target.closest('button, input, a, select')) return;

    if (!scrollContainerRef.current) return;
    isDraggingY.current = true;
    dragYInfo.current = {
      startY: e.clientY,
      scrollTop: scrollContainerRef.current.scrollTop,
      hasMoved: false,
    };
  };

  const handleScrollMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingY.current || !scrollContainerRef.current) return;
    const dy = e.clientY - dragYInfo.current.startY;
    if (Math.abs(dy) > 4) {
      dragYInfo.current.hasMoved = true;
    }
    scrollContainerRef.current.scrollTop = dragYInfo.current.scrollTop - dy;
  };

  const handleScrollMouseUp = () => {
    isDraggingY.current = false;
  };

  const handleTabChange = (tab: ActiveTab) => {
    setCurrentTab(tab);
    if (tab === 'home') setActiveScreen('home');
    if (tab === 'categories') setActiveScreen('categories');
    if (tab === 'saved') setActiveScreen('saved');
    if (tab === 'menu') setActiveScreen('menu');
  };

  const handleMovieClick = (movie: Movie) => {
    if (dragYInfo.current.hasMoved) {
      dragYInfo.current.hasMoved = false;
      return;
    }
    setSelectedMovie(movie);
    setActiveScreen('detail');
  };

  const handleWatchNow = (movie: Movie) => {
    if (dragYInfo.current.hasMoved) {
      dragYInfo.current.hasMoved = false;
      return;
    }
    setSelectedMovie(movie);
    setActiveScreen('detail');
  };

  const handleToggleSave = (movie: Movie) => {
    setSavedMovies((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) {
        return prev.filter((m) => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  const handleRemoveSaved = (movieId: string) => {
    setSavedMovies((prev) => prev.filter((m) => m.id !== movieId));
  };

  const handleSelectCategory = (name: string) => {
    setSearchQuery(name);
    setActiveScreen('search');
  };

  const currentHeroMovie = heroMovies[0] || FEATURED_HERO_MOVIES[0]; // "Omuzigo" from Screenshot 12

  return (
    <PhoneSimulator>
      {/* 
        Scrollable Container (.scroll-container):
        Smoothly scrolls through all categories while BottomNav is permanently fixed at the bottom!
        Supports both natural mobile touch scrolling and desktop drag/wheel scrolling.
      */}
      <div
        ref={scrollContainerRef}
        onMouseDown={handleScrollMouseDown}
        onMouseMove={handleScrollMouseMove}
        onMouseUp={handleScrollMouseUp}
        onMouseLeave={handleScrollMouseUp}
        className="flex-1 overflow-y-auto scroll-container min-h-0 relative bg-[#05051F]"
      >
        {/* 1. HOME SCREEN (Screenshot 12) */}
        {activeScreen === 'home' && (
          <div className="flex flex-col pb-24">
            {/* Featured Hero Banner with Top Header inside (Screenshot 12) */}
            <FeaturedHero
              movie={currentHeroMovie}
              onSearchClick={() => {
                setSearchQuery('');
                setActiveScreen('search');
              }}
              onCastClick={() => {}}
              onNotificationsClick={() => setActiveScreen('new_uploads')}
              onWatchNowClick={handleWatchNow}
              onMovieClick={handleMovieClick}
            />

            {/* Latest on Munowatch (Screenshot 12) */}
            <PosterRow
              title="Latest on Munowatch"
              movies={latestMovies}
              onArrowClick={() => setActiveScreen('new_uploads')}
              onMovieClick={handleMovieClick}
            />

            {/* Continue watching (Screenshot 12) */}
            <ContinueWatchingRow
              movies={CONTINUE_WATCHING_LIST}
              onArrowClick={() => setActiveScreen('recently_watched')}
              onMovieClick={handleMovieClick}
            />

            {/* You may also like (Screenshots 11 & 13) */}
            <PosterRow
              title="You may also like"
              movies={YOU_MAY_ALSO_LIKE_LIST}
              onArrowClick={() => setActiveScreen('search')}
              onMovieClick={handleMovieClick}
            />

            {/* Action (Screenshots 11 & 13) */}
            <PosterRow
              title="Action"
              movies={actionMovies}
              onArrowClick={() => setActiveScreen('search')}
              onMovieClick={handleMovieClick}
            />

            {/* Horror (Screenshot 7) */}
            <PosterRow
              title="Horror"
              movies={horrorMovies}
              onArrowClick={() => setActiveScreen('search')}
              onMovieClick={handleMovieClick}
            />

            {/* Series (Screenshot 7 & 15) */}
            <PosterRow
              title="Series"
              movies={seriesMovies}
              onArrowClick={() => setActiveScreen('shows')}
              onMovieClick={handleMovieClick}
            />

            {/* Kungu Fu (Screenshot 7) */}
            <PosterRow
              title="Kungu Fu"
              movies={kungfuMovies}
              onArrowClick={() => setActiveScreen('search')}
              onMovieClick={handleMovieClick}
            />

            {/* Animation (Screenshot 7) */}
            <PosterRow
              title="Animation"
              movies={animationMovies}
              onArrowClick={() => setActiveScreen('search')}
              onMovieClick={handleMovieClick}
            />

            {/* Vj Junior (Screenshot 6) */}
            <PosterRow
              title="Vj Junior"
              movies={vjJuniorMovies}
              onArrowClick={() => setActiveScreen('new_uploads')}
              onMovieClick={handleMovieClick}
            />
          </div>
        )}

        {/* 2. MOVIE DETAIL SCREEN (Screenshots 11 & 13) */}
        {activeScreen === 'detail' && (
          <MovieDetailScreen
            movie={selectedMovie}
            onBack={() => setActiveScreen('home')}
            isSaved={savedMovies.some((m) => m.id === selectedMovie.id)}
            onToggleSave={handleToggleSave}
            onMovieClick={handleMovieClick}
            onSearchClick={() => setActiveScreen('search')}
            onCastClick={() => {}}
            onNotificationsClick={() => setActiveScreen('new_uploads')}
          />
        )}

        {/* 3. CATEGORIES SCREEN (Screenshots 6 & 7) */}
        {activeScreen === 'categories' && (
          <CategoriesScreen
            onBack={() => {
              setActiveScreen('home');
              setCurrentTab('home');
            }}
            onSelectCategory={handleSelectCategory}
            onSearchClick={() => setActiveScreen('search')}
            onCastClick={() => {}}
            onNotificationsClick={() => setActiveScreen('new_uploads')}
          />
        )}

        {/* 4. SAVED SCREEN (Screenshot 1) */}
        {activeScreen === 'saved' && (
          <SavedScreen
            savedMovies={savedMovies}
            onBack={() => {
              setActiveScreen('home');
              setCurrentTab('home');
            }}
            onMovieClick={handleMovieClick}
            onRemoveMovie={handleRemoveSaved}
            onExploreClick={() => {
              setActiveScreen('home');
              setCurrentTab('home');
            }}
            onSearchClick={() => setActiveScreen('search')}
            onCastClick={() => {}}
            onNotificationsClick={() => setActiveScreen('new_uploads')}
          />
        )}

        {/* 5. APP MENU SCREEN (Screenshot 3) */}
        {activeScreen === 'menu' && (
          <MenuScreen
            onClose={() => {
              setActiveScreen('home');
              setCurrentTab('home');
            }}
            onNavigate={(screen) => setActiveScreen(screen)}
            onLogout={() => setActiveScreen('login')}
            onOpenSupport={() => setIsSupportModalOpen(true)}
          />
        )}

        {/* 6. TV SHOWS SCREEN (Screenshot 15) */}
        {activeScreen === 'shows' && (
          <ShowsScreen
            onBack={() => setActiveScreen('home')}
            onMovieClick={handleMovieClick}
            onSearchClick={() => setActiveScreen('search')}
            onCastClick={() => {}}
            onNotificationsClick={() => setActiveScreen('new_uploads')}
          />
        )}

        {/* 7. YOU RECENTLY WATCH... SCREEN (Screenshot 16) */}
        {activeScreen === 'recently_watched' && (
          <RecentlyWatchedScreen
            onBack={() => setActiveScreen('home')}
            onMovieClick={handleMovieClick}
            onSearchClick={() => setActiveScreen('search')}
            onCastClick={() => {}}
            onNotificationsClick={() => setActiveScreen('new_uploads')}
          />
        )}

        {/* 8. MY DOWNLOADS SCREEN (Screenshot 4) */}
        {activeScreen === 'downloads' && (
          <DownloadsScreen
            onBack={() => setActiveScreen('home')}
            onMovieClick={handleMovieClick}
            onSearchClick={() => setActiveScreen('search')}
            onCastClick={() => {}}
            onNotificationsClick={() => setActiveScreen('new_uploads')}
          />
        )}

        {/* 9. SETTINGS & ACCOUNT SCREEN (Screenshots 9 & 10) */}
        {activeScreen === 'settings' && (
          <SettingsScreen
            onBack={() => setActiveScreen('home')}
            onLogout={() => setActiveScreen('login')}
          />
        )}

        {/* 10. NEW UPLOADS SCREEN (Screenshot_20261018_110344_Munowatch.jpg) */}
        {(activeScreen === 'notifications' || activeScreen === 'new_uploads') && (
          <NewUploadsScreen
            onBack={() => setActiveScreen('home')}
            onMovieClick={handleMovieClick}
            onSearchClick={() => setActiveScreen('search')}
            onCastClick={() => {}}
            onNotificationsClick={() => {}}
          />
        )}

        {/* 11. SEARCH SCREEN (Screenshot 17) */}
        {activeScreen === 'search' && (
          <SearchScreen
            initialQuery={searchQuery}
            onBack={() => setActiveScreen('home')}
            onMovieClick={handleMovieClick}
            onCastClick={() => {}}
          />
        )}

        {/* 12. LOGIN SCREEN (Screenshot 2) */}
        {activeScreen === 'login' && (
          <LoginScreen
            onBack={() => setActiveScreen('home')}
            onLoginSuccess={() => {
              setActiveScreen('home');
              setCurrentTab('home');
            }}
          />
        )}
      </div>

      {/* Support Action Sheet Modal (Screenshot 8) */}
      {isSupportModalOpen && (
        <SupportScreen
          onBack={() => setIsSupportModalOpen(false)}
        />
      )}

      {/* 
        Permanently Fixed Bottom Navigation Bar:
        Always visible at the bottom of the phone frame matching all screenshots
      */}
      {activeScreen !== 'login' && (
        <BottomNav
          currentTab={currentTab}
          onTabChange={handleTabChange}
        />
      )}
    </PhoneSimulator>
  );
}
