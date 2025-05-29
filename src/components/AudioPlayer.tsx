import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Repeat } from 'lucide-react';
import { Progress } from './ui/progress';

interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: string;
}

interface AudioPlayerProps {
  tracks: AudioTrack[];
  onPlayStateChange?: (playing: boolean) => void;
  currentTrackIndex: number;
  onTrackChange: (index: number) => void;
}

export function AudioPlayer({ tracks, onPlayStateChange, currentTrackIndex, onTrackChange }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState(tracks[0].duration);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isRepeat, setIsRepeat] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    setDuration(currentTrack.duration);
    setCurrentTime('0:00');
    setProgress(0);
  }, [currentTrackIndex, currentTrack.duration]);

  // Notify parent about play state changes
  useEffect(() => {
    if (onPlayStateChange) {
      onPlayStateChange(isPlaying);
    }
  }, [isPlaying, onPlayStateChange]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    onTrackChange((currentTrackIndex + 1) % tracks.length);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    onTrackChange((currentTrackIndex - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
      setCurrentTime(formatTime(audioRef.current.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const actualDuration = formatTime(audioRef.current.duration);
      setDuration(actualDuration);
    }
  };

  const handleEnded = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      handleNext();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md border-t border-gray-800 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-stretch justify-between gap-2 sm:gap-0">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlayPause}
              className="text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleRepeat}
              className={`text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 ${isRepeat ? 'text-emerald-400' : ''}`}
            >
              <Repeat className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 sm:w-20 accent-emerald-500"
            />
          </div>
          <div className="flex-1 w-full sm:mx-4 flex flex-col sm:block items-center">
            <div className="text-sm font-medium text-gray-200 text-center sm:text-left">{currentTrack.title}</div>
            <div className="text-xs text-gray-400 text-center sm:text-left">{currentTrack.artist}</div>
            <div className="flex items-center space-x-2 mt-1 w-full mb-2">
              <span className="text-xs text-gray-400 min-w-[2.5rem]">{currentTime}</span>
              <Progress value={progress} className="flex-1 bg-gray-800" />
              <span className="text-xs text-gray-400 min-w-[2.5rem]">{duration}</span>
            </div>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />
    </div>
  );
} 