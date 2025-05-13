
import React from 'react';
import AudioControls from './AudioControls';
import useAudio from '../hooks/useAudio';
import { Loader2 } from 'lucide-react';

const RadioPlayer: React.FC = () => {
  const {
    reciter,
    isPlaying,
    volume,
    loading,
    togglePlay,
    changeVolume,
    isLoading
  } = useAudio();

  return (
    <div className="container mx-auto px-4 max-w-3xl">
      {isLoading ? (
        <div className="islamic-card flex flex-col items-center justify-center p-10">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 text-foreground">Loading Quran Reciter...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Player Section */}
          <section className="islamic-card">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                {reciter?.image && (
                  <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-primary">
                    <img 
                      src={reciter.image} 
                      alt={reciter.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-medium text-primary">{reciter?.name || "Islam Sobhi"}</h2>
              <p className="text-muted-foreground">Quran Recitation</p>
            </div>
            
            <AudioControls
              isPlaying={isPlaying}
              loading={loading}
              volume={volume}
              onPlayPause={togglePlay}
              onVolumeChange={changeVolume}
            />
          </section>
        </div>
      )}
    </div>
  );
};

export default RadioPlayer;
