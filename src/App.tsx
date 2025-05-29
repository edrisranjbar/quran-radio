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
    name: 'Mishary Rashid Alafasy',
    description: 'Beautiful recitations by Sheikh Mishary Rashid Alafasy',
    tracks: [
      {
        id: '1',
        title: 'Surah Al-Fatiha',
        artist: 'Mishary Rashid Alafasy',
        photo: 'https://ui-avatars.com/api/?name=Mishary+Alafasy&background=1B4332&color=fff&size=400',
        url: '/quran-radio/audio/1.mp3',
        duration: '4:32'
      },
      {
        id: '2',
        title: 'Surah Al-Baqarah',
        artist: 'Mishary Rashid Alafasy',
        photo: 'https://ui-avatars.com/api/?name=Mishary+Alafasy&background=1B4332&color=fff&size=400',
        url: '/quran-radio/audio/2.mp3',
        duration: '3:15'
      }
    ]
  },
  {
    id: '2',
    name: 'Abdul Rahman Al-Sudais',
    description: 'Powerful recitations by Sheikh Abdul Rahman Al-Sudais',
    tracks: [
      {
        id: '3',
        title: 'Surah Yasin',
        artist: 'Abdul Rahman Al-Sudais',
        photo: 'https://ui-avatars.com/api/?name=Abdul+Sudais&background=2D6A4F&color=fff&size=400',
        url: '/quran-radio/audio/3.mp3',
        duration: '5:48'
      },
      {
        id: '4',
        title: 'Surah Ar-Rahman',
        artist: 'Abdul Rahman Al-Sudais',
        photo: 'https://ui-avatars.com/api/?name=Abdul+Sudais&background=2D6A4F&color=fff&size=400',
        url: '/quran-radio/audio/4.mp3',
        duration: '4:20'
      }
    ]
  },
  {
    id: '3',
    name: 'Saad Al-Ghamdi',
    description: 'Melodic recitations by Sheikh Saad Al-Ghamdi',
    tracks: [
      {
        id: '5',
        title: 'Surah Al-Mulk',
        artist: 'Saad Al-Ghamdi',
        photo: 'https://ui-avatars.com/api/?name=Saad+Al-Ghamdi&background=40916C&color=fff&size=400',
        url: '/quran-radio/audio/5.mp3',
        duration: '6:15'
      },
      {
        id: '6',
        title: 'Surah Al-Waqiah',
        artist: 'Saad Al-Ghamdi',
        photo: 'https://ui-avatars.com/api/?name=Saad+Al-Ghamdi&background=40916C&color=fff&size=400',
        url: '/quran-radio/audio/6.mp3',
        duration: '5:30'
      }
    ]
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
