import { useState, useRef, useEffect } from 'react';
import { AudioPlayer } from './components/AudioPlayer';
import { Header } from './components/Header';
import { StationList } from './components/StationList';
import { Player } from './components/Player';
import { Footer } from './components/Footer';
import { Playlist } from './components/Playlist';

interface Track {
  id: string;
  title: string;
  artist: string;
  photo: string;
  url: string;
  duration: string;
}

interface Station {
  id: string;
  name: string;
  description: string;
  tracks: Track[];
  disabled?: boolean;
}

const stations: Station[] = [
  {
    id: 'tartil',
    name: 'Tartil Style',
    description: 'Beautiful and measured recitation by Mansour As-salemi',
    tracks: [
      {
        id: '1',
        title: 'Surah Maryam',
        artist: 'Mansour As-salemi',
        photo: 'https://ui-avatars.com/api/?name=Mansour+As-salemi&background=40916C&color=fff&size=400',
        url: '/audio/1.mp3',
        duration: '00:03:45'
      },
      {
        id: '2',
        title: 'Surah Houd',
        artist: 'Unknown',
        photo: 'https://ui-avatars.com/api/?name=Mansour+As-salemi&background=40916C&color=fff&size=400',
        url: '/audio/3.mp3',
        duration: '00:15:30'
      },
      {
        id: '3',
        title: 'Surah Al-Mumenun',
        artist: 'Mansour As-salemi',
        photo: 'https://ui-avatars.com/api/?name=Mansour+As-salemi&background=40916C&color=fff&size=400',
        url: '/audio/momenun-salemi.mp3',
        duration: '00:12:30'
      }
    ]
  },
  {
    id: 'research',
    name: 'Research Style',
    description: 'Coming Soon',
    disabled: true,
    tracks: []
  }
];

const App = () => {
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentStation = stations[currentStationIndex];
  const currentTrack = currentStation.tracks[currentTrackIndex];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100">
      <div className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full pb-32 md:pb-36">
        <Header 
          title="Quran Radio"
          description="Listen to beautiful recitations of the Holy Quran from renowned reciters"
        />
        
        <main className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 flex flex-col">
            <Player track={currentTrack} isPlaying={isPlaying} />
          </div>
          
          <div className="space-y-6">
            <StationList
              stations={stations}
              currentStationIndex={currentStationIndex}
              onStationSelect={(index) => {
                setCurrentStationIndex(index);
                setCurrentTrackIndex(0);
              }}
            />

            <Playlist
              tracks={currentStation.tracks}
              currentTrackIndex={currentTrackIndex}
              onTrackSelect={setCurrentTrackIndex}
            />
          </div>
        </main>
      </div>
      
      <AudioPlayer 
        tracks={currentStation.tracks} 
        onPlayStateChange={setIsPlaying}
        currentTrackIndex={currentTrackIndex}
        onTrackChange={setCurrentTrackIndex}
      />
      <Footer />
    </div>
  );
};

export default App;
