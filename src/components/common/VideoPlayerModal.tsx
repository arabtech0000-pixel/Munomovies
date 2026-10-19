import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Headphones,
  Check,
  AlertCircle,
  RefreshCw,
  Loader2,
} from 'lucide-react';
import { Movie } from '../../types';
import { getMoviePlayStream } from '../../services/api';

interface VideoPlayerModalProps {
  movie: Movie;
  onClose: () => void;
  onProgressUpdate?: (movieId: string, progressPercent: number) => void;
}

const BACKUP_STREAMS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
];

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  movie,
  onClose,
  onProgressUpdate,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quality, setQuality] = useState<'720p' | '1080p' | 'Auto'>('720p');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [streamUrl, setStreamUrl] = useState<string | null>(movie.videoUrl || null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [backupIndex, setBackupIndex] = useState(0);

  // Fetch Stream URL
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setHasError(false);

    getMoviePlayStream(movie.id)
      .then((url) => {
        if (!isMounted) return;
        if (url) {
          setStreamUrl(url);
        } else {
          setStreamUrl(BACKUP_STREAMS[0]);
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setStreamUrl(BACKUP_STREAMS[0]);
      });

    return () => {
      isMounted = false;
    };
  }, [movie.id]);

  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3500);
  };

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  const handleVideoError = () => {
    console.warn('Video failed to load source. Falling back to high-res backup stream...');
    const nextIdx = (backupIndex + 1) % BACKUP_STREAMS.length;
    setBackupIndex(nextIdx);
    setStreamUrl(BACKUP_STREAMS[nextIdx]);
    setHasError(false);
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    setHasError(false);
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            if (err.name !== 'AbortError') {
              console.warn('Auto-play blocked or interrupted:', err);
            }
            setIsPlaying(false);
          });
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      const p = videoRef.current.play();
      if (p !== undefined) {
        p.then(() => setIsPlaying(true)).catch(() => {});
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    resetControlsTimeout();
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    setCurrentTime(cur);
    if (dur && !isNaN(dur) && dur > 0) {
      setDuration(dur);
      const percent = Math.round((cur / dur) * 100);
      if (onProgressUpdate) {
        onProgressUpdate(movie.id, percent);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current || !duration) return;
    const seekTo = (parseFloat(e.target.value) / 100) * duration;
    videoRef.current.currentTime = seekTo;
    setCurrentTime(seekTo);
    resetControlsTimeout();
  };

  const skipSeconds = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(
      0,
      Math.min(duration, videoRef.current.currentTime + seconds)
    );
    resetControlsTimeout();
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    resetControlsTimeout();
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
    resetControlsTimeout();
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={resetControlsTimeout}
      onClick={resetControlsTimeout}
      className="fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden select-none animate-fadeIn"
    >
      {/* Video Element */}
      {streamUrl && (
        <video
          ref={videoRef}
          src={streamUrl}
          playsInline
          onCanPlay={handleCanPlay}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => {
            setIsLoading(false);
            setIsPlaying(true);
          }}
          onError={handleVideoError}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setDuration(videoRef.current.duration);
            }
          }}
          onEnded={() => {
            setIsPlaying(false);
            if (onProgressUpdate) onProgressUpdate(movie.id, 100);
          }}
          className="w-full h-full object-contain absolute inset-0 cursor-pointer"
          onClick={togglePlay}
        />
      )}

      {/* Loading Buffering Indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-30 pointer-events-none">
          <Loader2 className="w-12 h-12 text-[#00D522] animate-spin mb-2" />
          <p className="text-white text-xs font-semibold tracking-wide">Buffering MunoMovies Stream...</p>
        </div>
      )}

      {/* Top Header Controls Overlay */}
      <div
        className={`relative z-40 px-4 py-3 bg-gradient-to-b from-black/90 via-black/40 to-transparent flex items-center justify-between transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center space-x-3 min-w-0 pr-4">
          <button
            onClick={onClose}
            className="p-1.5 -ml-1.5 text-white/90 hover:text-white rounded-full bg-black/40 hover:bg-black/60 transition-colors focus:outline-none cursor-pointer"
            aria-label="Close Player"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>

          <div className="min-w-0">
            <h2 className="text-white text-sm font-bold truncate drop-shadow">
              {movie.title}
            </h2>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className="flex items-center space-x-1 text-[11px] text-[#00D522] font-semibold">
                <Headphones className="w-3 h-3" />
                <span>{movie.vj || 'VJ Emmy'} (Luganda)</span>
              </span>
              <span className="text-white/40 text-[10px]">•</span>
              <span className="text-white/70 text-[10px]">{movie.genre}</span>
            </div>
          </div>
        </div>

        {/* Quality Selector */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowQualityMenu(!showQualityMenu);
            }}
            className="px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-xs font-bold text-white transition-colors cursor-pointer"
          >
            {quality}
          </button>

          {showQualityMenu && (
            <div className="absolute right-0 top-8 bg-[#0D0D2E] border border-white/15 rounded-lg py-1 shadow-2xl z-50 min-w-[90px]">
              {(['1080p', '720p', 'Auto'] as const).map((q) => (
                <button
                  key={q}
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuality(q);
                    setShowQualityMenu(false);
                  }}
                  className={`w-full px-3 py-1.5 text-xs text-left flex items-center justify-between hover:bg-white/10 cursor-pointer ${
                    quality === q ? 'text-[#00D522] font-bold' : 'text-white'
                  }`}
                >
                  <span>{q}</span>
                  {quality === q && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center Big Play/Pause Touch Control */}
      <div
        className={`relative z-30 flex items-center justify-center transition-opacity duration-300 ${
          showControls && !isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={togglePlay}
          className="w-16 h-16 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform shadow-2xl cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 fill-white" />
          ) : (
            <Play className="w-8 h-8 fill-white ml-1" />
          )}
        </button>
      </div>

      {/* Bottom Controls Overlay */}
      <div
        className={`relative z-40 px-4 pb-6 pt-10 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col space-y-2 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress Timeline Scrubber */}
        <div className="relative w-full flex items-center group/scrub">
          <input
            type="range"
            min="0"
            max="100"
            value={progressPercent || 0}
            onChange={handleSeek}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#00D522] focus:outline-none"
          />
        </div>

        {/* Playback Controls & Timestamp */}
        <div className="flex items-center justify-between text-xs text-white/90 pt-1">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="text-white hover:text-[#00D522] transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            </button>

            <button
              onClick={() => skipSeconds(-10)}
              className="text-white hover:text-[#00D522] transition-colors cursor-pointer"
              title="Rewind 10 seconds"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={() => skipSeconds(10)}
              className="text-white hover:text-[#00D522] transition-colors cursor-pointer"
              title="Fast forward 10 seconds"
            >
              <RotateCw className="w-5 h-5" />
            </button>

            <button
              onClick={toggleMute}
              className="text-white hover:text-[#00D522] transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <span className="font-mono text-[11px] text-white/80">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleVideoError}
              className="p-1 text-white/60 hover:text-[#00D522] transition-colors cursor-pointer flex items-center space-x-1"
              title="Switch video source"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-[10px]">Switch CDN</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-[#00D522] transition-colors cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
