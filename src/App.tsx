import { useState } from 'react';
import { AudioPlayer } from './components/AudioPlayer';
import { Header } from './components/Header';
import { StationList } from './components/StationList';
import { Player } from './components/Player';
import { Footer } from './components/Footer';
import { Playlist } from './components/Playlist';

const stations = [
  {
    id: '1',
    name: 'Tartil Style',
    description: 'Modern recitation style with beautiful melodies and clear pronunciation',
    tracks: [
      {
        id: '4',
        title: 'Surah Al-Fatiha',
        artist: 'Mansour As-salemi',
        photo: 'https://ui-avatars.com/api/?name=Mansour+As-salemi&background=40916C&color=fff&size=400',
        url: 'https://server8.mp3quran.net/mansour/001.mp3',
        duration: '4:20'
      },
      {
        id: '5',
        title: 'Surah Al-Baqarah',
        artist: 'Mansour As-salemi',
        photo: 'https://ui-avatars.com/api/?name=Mansour+As-salemi&background=40916C&color=fff&size=400',
        url: 'https://server8.mp3quran.net/mansour/002.mp3',
        duration: '6:15'
      },
      {
        id: '6',
        title: 'Surah Yasin',
        artist: 'Mansour As-salemi',
        photo: 'https://ui-avatars.com/api/?name=Mansour+As-salemi&background=40916C&color=fff&size=400',
        url: 'https://server8.mp3quran.net/mansour/036.mp3',
        duration: '5:30'
      }
    ]
  },
  {
    id: '2',
    name: 'Tahqiq Style',
    description: 'Classical recitation style with precise tajweed and measured pace (Coming Soon)',
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
      
      <AudioPlayer tracks={currentStation.tracks} onPlayStateChange={setIsPlaying} />
      <Footer />
    </div>
  );
};

export default App;
