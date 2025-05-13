
import React from 'react';
import AudioControls from './AudioControls';
import RecitationsList from './RecitationsList';
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
    isLoading,
    recitations,
    currentRecitation,
    changeRecitation
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
              <h2 className="text-2xl font-medium text-primary">{reciter?.name || "Islam Sobhi"}</h2>
              <p className="text-muted-foreground">
                {currentRecitation ? `Playing: ${currentRecitation.name}` : 'Quran Recitation'}
              </p>
            </div>
            
            <AudioControls
              isPlaying={isPlaying}
              loading={loading}
              volume={volume}
              onPlayPause={togglePlay}
              onVolumeChange={changeVolume}
            />
          </section>
          
          {/* Recitations List */}
          <RecitationsList 
            recitations={recitations}
            currentRecitation={currentRecitation}
            onSelectRecitation={changeRecitation}
          />
        </div>
      )}
    </div>
  );
};

export default RadioPlayer;
