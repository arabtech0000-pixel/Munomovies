import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Hls from 'hls.js';
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
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const initialStream = movie.videoUrl ? movie.videoUrl.replace(/^http:\/\//i, 'https://') : null;
  const [streamUrl, setStreamUrl] = useState<string | null>(initialStream);
  const [isLoading, setIsLoading] = useState(!initialStream);
  const [backupIndex, setBackupIndex] = useState(0);
  const hlsInstanceRef = useRef<Hls | null>(null);

  // Fetch approved stream URL from server if not already preloaded
  useEffect(() => {
    let isMounted = true;

    if (!streamUrl) {
      setIsLoading(true);
      getMoviePlayStream(movie.id)
        .then((url) => {
          if (!isMounted) return;
          const clean = url ? url.replace(/^http:\/\//i, 'https://') : BACKUP_STREAMS[0];
          setStreamUrl(clean);
          setIsLoading(false);
        })
        .catch(() => {
          if (!isMounted) return;
          setStreamUrl(BACKUP_STREAMS[0]);
          setIsLoading(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [movie.id, streamUrl]);

  // Initialize HLS.js or direct video source
  useEffect(() => {
    if (!streamUrl || !videoRef.current) return;
    const video = videoRef.current;

    if (hlsInstanceRef.current) {
      hlsInstanceRef.current.destroy();
      hlsInstanceRef.current = null;
    }

    const isHls = streamUrl.includes('.m3u8');

    if (isHls && Hls.isSupported()) {
      const hls = new Hls();
      hlsInstanceRef.current = hls;
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().then(() => setIsPlaying(true)).catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        });
      });
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          handleVideoError();
        }
      });
    } else {
      video.src = streamUrl;
      video.load();
      video.play().then(() => setIsPlaying(true)).catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      });
    }

    return () => {
      if (hlsInstanceRef.current) {
        hlsInstanceRef.current.destroy();
        hlsInstanceRef.current = null;
      }
    };
  }, [streamUrl]);

  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  const handleVideoError = () => {
    const nextIdx = (backupIndex + 1) % BACKUP_STREAMS.length;
    setBackupIndex(nextIdx);
    setStreamUrl(BACKUP_STREAMS[nextIdx]);
    setIsLoading(true);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
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

  const skipSeconds = (secs: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + secs));
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
      containerRef.current.requestFullscreen().catch(() => {});
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

  const playerContent = (
    <div
      ref={containerRef}
      onMouseMove={resetControlsTimeout}
      onClick={resetControlsTimeout}
      className="fixed inset-0 w-screen h-screen bg-[#05051F] flex flex-col justify-between overflow-hidden select-none z-[99999]"
    >
      {/* Video Element */}
      {streamUrl && (
        <video
          ref={videoRef}
          playsInline
          autoPlay
          onCanPlay={() => setIsLoading(false)}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => {
            setIsLoading(false);
            setIsPlaying(true);
          }}
          onError={handleVideoError}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => {
            setIsPlaying(false);
            if (onProgressUpdate) onProgressUpdate(movie.id, 100);
          }}
          className="w-full h-full object-contain absolute inset-0 cursor-pointer bg-black"
          onClick={togglePlay}
        />
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#05051F]/80 z-30 pointer-events-none">
          <Loader2 className="w-12 h-12 text-[#00D522] animate-spin mb-3" />
          <p className="text-white text-xs font-semibold tracking-wide">
            Loading movie stream...
          </p>
        </div>
      )}

      {/* Top Header Overlay */}
      <div
        className={`relative z-40 px-6 py-4 bg-gradient-to-b from-[#05051F] via-[#05051F]/60 to-transparent flex items-center justify-between transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center space-x-3 min-w-0">
          <button
            onClick={onClose}
            className="p-2 text-white hover:text-[#00D522] rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
          <div className="min-w-0">
            <h2 className="text-white font-bold text-sm sm:text-base truncate">{movie.title}</h2>
            <div className="flex items-center space-x-2 text-xs text-neutral-300 mt-0.5">
              <span className="text-[#00D522] font-semibold flex items-center space-x-1">
                <Headphones className="w-3 h-3" />
                <span>{movie.vj || 'Vj Junior'}</span>
              </span>
              <span>•</span>
              <span>{movie.genre || 'Action'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center Play/Pause Touch Indicator */}
      <div
        className={`relative z-30 flex items-center justify-center transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={togglePlay}
          className="w-20 h-20 rounded-full bg-[#00D522] text-black flex items-center justify-center shadow-2xl transition transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          {isPlaying ? <Pause className="w-8 h-8 fill-black" /> : <Play className="w-8 h-8 fill-black ml-1" />}
        </button>
      </div>

      {/* Bottom Controls Dock */}
      <div
        className={`relative z-40 px-6 pb-6 pt-12 bg-gradient-to-t from-[#05051F] via-[#05051F]/80 to-transparent flex flex-col space-y-3 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Timeline Scrubber */}
        <div className="relative w-full flex items-center cursor-pointer py-1">
          <input
            type="range"
            min="0"
            max="100"
            value={progressPercent || 0}
            onChange={handleSeek}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#00D522] focus:outline-none"
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between text-xs text-white">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button onClick={togglePlay} className="hover:text-[#00D522] transition cursor-pointer">
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            </button>

            <button onClick={() => skipSeconds(-10)} className="hover:text-[#00D522] transition cursor-pointer" title="Rewind 10s">
              <RotateCcw className="w-5 h-5" />
            </button>

            <button onClick={() => skipSeconds(10)} className="hover:text-[#00D522] transition cursor-pointer" title="Forward 10s">
              <RotateCw className="w-5 h-5" />
            </button>

            <button onClick={toggleMute} className="hover:text-[#00D522] transition cursor-pointer">
              {isMuted ? <VolumeX className="w-5 h-5 text-[#00D522]" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <div className="font-mono text-neutral-300">
              <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button onClick={toggleFullscreen} className="p-2 hover:text-[#00D522] transition cursor-pointer" title="Fullscreen">
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(playerContent, document.body);
};
