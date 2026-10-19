import React from 'react';
import { ArrowLeft, Cast, Bell, Search, Download, ChevronRight, Lock } from 'lucide-react';
import { Movie } from '../../types';
import { MoviePoster } from '../common/MoviePoster';

interface RecentlyWatchedScreenProps {
  onBack: () => void;
  onMovieClick: (movie: Movie) => void;
  onSearchClick: () => void;
  onCastClick: () => void;
  onNotificationsClick: () => void;
}

export const RECENTLY_WATCHED_ITEMS: Array<{
  id: string;
  title: string;
  description: string;
  size: string;
  duration: string;
  posterUrl: string;
  hasDownload: boolean;
}> = [
  {
    id: 'rec-nirvana',
    title: 'Love of Nirvana | Vj Banks',
    description: 'Xiao Wu Xia, the young lord of Yueluo City, lives in hiding as Wei Zhao in Liang Kingdom, seeking truth.',
    size: '280.63 MB',
    duration: '43h 30m',
    posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    hasDownload: false,
  },
  {
    id: 'rec-secret-kingdom',
    title: 'The Secret Kingdom | Vj Ice P',
    description: 'Join Peter and Verity on a magical journey as they embark on a quest to unite five mystical treasures.',
    size: '870.31 MB',
    duration: '01h 38m',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    hasDownload: true,
  },
  {
    id: 'rec-squid-game',
    title: 'Squid Game Season 2 | Vj Junior',
    description: 'A vengeful Gi-hun makes a U-turn at the airport to uncover the organizers behind the deadly game.',
    size: '641.07 MB',
    duration: '01h 00m',
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
    hasDownload: false,
  },
  {
    id: 'rec-snow-eagle',
    title: 'Snow Eagle Lord | Vj Ice P',
    description: 'Dong Bo Xue Ying is a young martial artist who was born in an icy territory surrounded by mountain beasts.',
    size: '515.24 MB',
    duration: '48h 58m',
    posterUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
    hasDownload: false,
  },
  {
    id: 'rec-gladiator-2',
    title: 'Gladiator II | Vj Junior',
    description: 'After his home is conquered by the tyrannical emperors of Rome, Lucius is forced to enter the Colosseum.',
    size: '1.31 GB',
    duration: '02h 19m',
    posterUrl: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?auto=format&fit=crop&w=600&q=80',
    hasDownload: true,
  },
  {
    id: 'rec-kraven',
    title: 'Kraven: The Hunter | Vj Junior',
    description: "Kraven's complex relationship with his ruthless father Nikolai Kravinoff starts him down a path of retribution.",
    size: '1023.19 MB',
    duration: '01h 58m',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    hasDownload: true,
  },
];

export const RecentlyWatchedScreen: React.FC<RecentlyWatchedScreenProps> = ({
  onBack,
  onMovieClick,
  onSearchClick,
  onCastClick,
  onNotificationsClick,
}) => {
  return (
    <div className="min-h-full bg-[#05051F] text-white flex flex-col pb-24 select-none animate-fadeIn">
      {/* Top Header matching Screenshot 16 */}
      <div className="h-14 px-4 flex items-center justify-between sticky top-0 bg-[#05051F]/95 backdrop-blur-md z-30 border-b border-white/[0.04]">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-white hover:text-[#00D522] transition-colors focus:outline-none cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
          <h1 className="text-white text-[18px] font-bold tracking-tight">
            You recently watch...
          </h1>
        </div>

        <div className="flex items-center space-x-3.5">
          <button
            onClick={onCastClick}
            className="text-white hover:opacity-80 transition-opacity focus:outline-none cursor-pointer"
            aria-label="Cast"
          >
            <Cast className="w-[20px] h-[20px] stroke-[2]" />
          </button>
          <button
            onClick={onNotificationsClick}
            className="text-white hover:opacity-80 transition-opacity focus:outline-none cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-[20px] h-[20px] stroke-[2]" />
          </button>
          <button
            onClick={onSearchClick}
            className="text-white hover:text-[#00D522] transition-colors focus:outline-none cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-[20px] h-[20px] stroke-[2]" />
          </button>
        </div>
      </div>

      {/* List items matching Screenshot 16 */}
      <div className="divide-y divide-white/[0.03]">
        {RECENTLY_WATCHED_ITEMS.map((item) => (
          <div
            key={item.id}
            onClick={() =>
              onMovieClick({
                id: item.id,
                title: item.title.split(' | ')[0],
                vj: item.title.split(' | ')[1] || 'Vj Junior',
                genre: 'Series',
                duration: item.duration,
                description: item.description,
                posterUrl: item.posterUrl,
                isLocked: true,
                fileSize: item.size,
              })
            }
            className="px-4 py-3 flex items-start space-x-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
          >
            {/* Square Poster with Lock Badge */}
            <div className="relative w-20 h-20 rounded-md overflow-hidden bg-[#111128] flex-shrink-0">
              <MoviePoster
                src={item.posterUrl}
                alt={item.title}
                title={item.title}
                isLocked
                aspectRatio="aspect-square"
              />
            </div>

            {/* Content Details */}
            <div className="flex-1 min-w-0 pr-1">
              <h3 className="text-white text-[14px] font-semibold leading-snug truncate">
                {item.title}
              </h3>
              <p className="text-[#8E8E9F] text-[11px] leading-relaxed line-clamp-2 mt-1">
                {item.description}
              </p>
              <div className="mt-2 flex items-center space-x-3">
                <span className="text-[#00D522] font-semibold text-[11px]">
                  {item.size}
                </span>
                <span className="text-[#8E8E9F] text-[11px]">
                  {item.duration}
                </span>
              </div>
            </div>

            {/* Right Action: Download or Chevron icon */}
            <div className="self-center pl-1 text-white">
              {item.hasDownload ? (
                <Download className="w-5 h-5 text-white stroke-[2]" />
              ) : (
                <ChevronRight className="w-5 h-5 text-white stroke-[2]" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
