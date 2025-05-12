
import React from 'react';
import AudioControls from './AudioControls';
import ReciterSelector from './ReciterSelector';
import SurahQueue from './SurahQueue';
import useAudio from '../hooks/useAudio';
import { Loader2 } from 'lucide-react';

const RadioPlayer: React.FC = () => {
  const {
    reciters,
    currentReciter,
    queue,
    currentSurah,
    isPlaying,
    volume,
    loading,
    selectReciter,
    togglePlay,
    changeVolume,
    playSurah,
    playNextSurah,
    playPreviousSurah,
    isLoading
  } = useAudio();

  return (
    <div className="container mx-auto px-4">
      {isLoading ? (
        <div className="islamic-card flex flex-col items-center justify-center p-10">
          <Loader2 className="h-10 w-10 animate-spin text-islamic" />
          <p className="mt-4 text-islamic">Loading Quran Reciters...</p>
        </div>
      ) : (
        <>
          <div className="mb-8 islamic-card bg-white">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center mb-2">
                <ReciterSelector 
                  reciters={reciters}
                  currentReciter={currentReciter}
                  onSelectReciter={selectReciter}
                />
              </div>
              
              {currentReciter ? (
                <>
                  <h2 className="text-xl font-medium text-islamic">{currentReciter.name}</h2>
                  {currentSurah && (
                    <p className="text-muted-foreground">{currentSurah.name}</p>
                  )}
                </>
              ) : (
                <h2 className="text-xl font-medium text-islamic">Select a reciter to begin</h2>
              )}
            </div>
            
            <AudioControls
              isPlaying={isPlaying}
              loading={loading}
              volume={volume}
              onPlayPause={togglePlay}
              onVolumeChange={changeVolume}
              onSkipNext={playNextSurah}
              onSkipPrevious={playPreviousSurah}
            />
          </div>
          
          {currentReciter && (
            <SurahQueue
              surahs={queue}
              currentSurah={currentSurah}
              onSelectSurah={playSurah}
              isPlaying={isPlaying}
            />
          )}
        </>
      )}
    </div>
  );
};

export default RadioPlayer;
