
import React from 'react';
import AudioControls from './AudioControls';
import ReciterSelector from './ReciterSelector';
import useAudio from '../hooks/useAudio';
import { Loader2, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RadioPlayer: React.FC = () => {
  const {
    reciter,
    reciters,
    isPlaying,
    volume,
    loading,
    togglePlay,
    changeVolume,
    isLoading,
    currentRecitation,
    changeReciter,
    selectRandomReciter,
    nextRecitation,
    previousRecitation
  } = useAudio();

  return (
    <div className="container mx-auto px-4 max-w-3xl">
      {isLoading ? (
        <div className="islamic-card flex flex-col items-center justify-center p-10">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 text-foreground">Loading Quran Reciters...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Player Section */}
          <section className="islamic-card">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-medium text-primary">{reciter?.name || "Select a Reciter"}</h2>
              <p className="text-muted-foreground">
                {currentRecitation ? `Playing: ${currentRecitation.name}` : 'Select a recitation'}
              </p>
            </div>
            
            <AudioControls
              isPlaying={isPlaying}
              loading={loading}
              volume={volume}
              onPlayPause={togglePlay}
              onVolumeChange={changeVolume}
            />
            
            {/* Navigation Buttons */}
            <div className="flex justify-center mt-6 space-x-4">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={previousRecitation}
                disabled={loading}
              >
                <SkipBack size={20} />
                <span className="sr-only">Previous Recitation</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={nextRecitation}
                disabled={loading}
              >
                <SkipForward size={20} />
                <span className="sr-only">Next Recitation</span>
              </Button>
            </div>
          </section>
          
          {/* Reciters Selector */}
          <div className="islamic-card p-4">
            <h3 className="text-lg font-medium mb-4">Change Reciter</h3>
            <ReciterSelector 
              reciters={reciters}
              currentReciter={reciter}
              onSelectReciter={changeReciter}
              onRandomReciter={selectRandomReciter}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RadioPlayer;
