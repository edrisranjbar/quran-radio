
import React from 'react';
import AudioControls from './AudioControls';
import ReciterSelector from './ReciterSelector';
import SurahQueue from './SurahQueue';
import useAudio from '../hooks/useAudio';
import { Loader2, MoonIcon, SunIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';

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

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="flex justify-end mb-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="rounded-full"
        >
          {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </Button>
      </div>
      
      {isLoading ? (
        <div className="islamic-card flex flex-col items-center justify-center p-10">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 text-foreground">Loading Quran Reciters...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Reciters Section */}
          <section className="islamic-card">
            <ReciterSelector 
              reciters={reciters}
              currentReciter={currentReciter}
              onSelectReciter={selectReciter}
            />
          </section>
          
          {/* Player Section - Only show when reciter is selected */}
          {currentReciter && (
            <section className="islamic-card">
              <div className="text-center mb-4">
                <h2 className="text-xl font-medium text-primary">{currentReciter.name}</h2>
                {currentSurah && (
                  <p className="text-muted-foreground">{currentSurah.name}</p>
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
            </section>
          )}
          
          {/* Queue Section - Only show when reciter is selected */}
          {currentReciter && (
            <SurahQueue
              surahs={queue}
              currentSurah={currentSurah}
              onSelectSurah={playSurah}
              isPlaying={isPlaying}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default RadioPlayer;
