import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { Progress } from './ui/progress';

interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
}

interface AudioPlayerProps {
  tracks: AudioTrack[];
}

export function AudioPlayer({ tracks }: AudioPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleEnded = () => {
    handleNext();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md border-t border-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
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
          </div>
          <div className="flex-1 mx-4">
            <div className="text-sm font-medium text-gray-200">{currentTrack.title}</div>
            <div className="text-xs text-gray-400">{currentTrack.artist}</div>
            <Progress value={progress} className="mt-2 bg-gray-800" />
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </div>
  );
} 