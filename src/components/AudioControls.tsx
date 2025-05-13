
import React from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface AudioControlsProps {
  isPlaying: boolean;
  loading: boolean;
  volume: number;
  onPlayPause: () => void;
  onVolumeChange: (value: number) => void;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying,
  loading,
  volume,
  onPlayPause,
  onVolumeChange
}) => {
  const handleVolumeChange = (values: number[]) => {
    onVolumeChange(values[0]);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      <div className="flex items-center justify-center w-full mb-4">
        <button
          onClick={onPlayPause}
          className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
          disabled={loading}
        >
          {loading ? (
            <div className="h-5 w-5 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
          ) : isPlaying ? (
            <Pause size={28} />
          ) : (
            <Play size={28} className="ml-1" />
          )}
        </button>
      </div>

      <div className="flex items-center space-x-3 w-full">
        <button
          className="text-primary hover:text-primary/80 transition-colors"
          onClick={() => onVolumeChange(volume > 0 ? 0 : 0.7)}
        >
          {volume === 0 ? (
            <VolumeX size={18} />
          ) : (
            <Volume2 size={18} />
          )}
        </button>
        
        <Slider
          value={[volume]}
          min={0}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default AudioControls;
