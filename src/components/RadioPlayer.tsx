
import React from 'react';
import AudioControls from './AudioControls';
import StationsList from './StationsList';
import useAudio from '../hooks/useAudio';

const RadioPlayer: React.FC = () => {
  const {
    stations,
    currentStation,
    isPlaying,
    volume,
    loading,
    playStation,
    togglePlay,
    changeVolume,
  } = useAudio();

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8 islamic-card bg-white">
        <div className="text-center mb-4">
          {currentStation ? (
            <>
              <h2 className="text-xl font-medium text-islamic">{currentStation.name}</h2>
              <p className="text-muted-foreground">{currentStation.reciter}</p>
            </>
          ) : (
            <h2 className="text-xl font-medium text-islamic">Select a station to begin</h2>
          )}
        </div>
        
        <AudioControls
          isPlaying={isPlaying}
          loading={loading}
          volume={volume}
          onPlayPause={togglePlay}
          onVolumeChange={changeVolume}
        />
      </div>
      
      <h2 className="text-2xl font-semibold mb-4 text-islamic">Quran Stations</h2>
      
      <StationsList
        stations={stations}
        currentStation={currentStation}
        onSelectStation={(station) => {
          if (!isPlaying || currentStation?.id !== station.id) {
            playStation(station);
            if (!isPlaying) togglePlay();
          }
        }}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default RadioPlayer;
