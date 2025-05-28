import { useState } from 'react';
import { AudioPlayer } from './components/AudioPlayer';
import { Queue } from './components/Queue';
import { Volume2, Clock, Heart, User } from 'lucide-react';

const sampleTracks = [
  {
    id: '1',
    title: 'Surah Al-Fatiha',
    arabicTitle: 'سورة الفاتحة',
    artist: 'Mishary Rashid Alafasy',
    photo: 'https://ui-avatars.com/api/?name=Mishary+Alafasy&background=1B4332&color=fff&size=400',
    url: '/audio/surah-fatiha.mp3',
    duration: '3:45',
    likes: 1234
  },
  {
    id: '2',
    title: 'Surah Al-Baqarah',
    arabicTitle: 'سورة البقرة',
    artist: 'Abdul Rahman Al-Sudais',
    photo: 'https://ui-avatars.com/api/?name=Abdul+Sudais&background=2D6A4F&color=fff&size=400',
    url: '/audio/surah-baqarah.mp3',
    duration: '4:20',
    likes: 2345
  },
  {
    id: '3',
    title: 'Surah Yasin',
    arabicTitle: 'سورة يس',
    artist: 'Saad Al-Ghamdi',
    photo: 'https://ui-avatars.com/api/?name=Saad+Al-Ghamdi&background=40916C&color=fff&size=400',
    url: '/audio/surah-yasin.mp3',
    duration: '5:15',
    likes: 3456
  }
];

const App = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <header className="text-center mb-8">
          <div className="inline-block p-2 px-4 rounded-full glass mb-4">
            <Volume2 className="h-5 w-5 text-emerald-400 inline-block mr-2" />
            <span className="text-emerald-400 text-sm font-medium">Live Streaming</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-3">
            Quran Radio
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Listen to beautiful recitations of the Holy Quran from renowned reciters around the world
          </p>
        </header>
        
        <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="glass rounded-2xl p-8 shadow-xl card-hover">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-medium text-gray-200">
                  Now Playing
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{sampleTracks[currentTrackIndex].duration}</span>
                  </div>
                  <button className="flex items-center text-gray-400 hover:text-emerald-400 transition-colors">
                    <Heart className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{sampleTracks[currentTrackIndex].likes}</span>
                  </button>
                </div>
              </div>
              <div className="aspect-video bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl flex items-center justify-center border border-gray-800/50 shadow-inner overflow-hidden">
                <div className="text-center relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90 z-10" />
                  <img 
                    src={sampleTracks[currentTrackIndex].photo} 
                    alt={sampleTracks[currentTrackIndex].artist}
                    className="w-full h-full object-cover opacity-50"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(sampleTracks[currentTrackIndex].artist)}&background=1B4332&color=fff&size=400`;
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-emerald-500/20 mb-4 bg-gray-800">
                      <img 
                        src={sampleTracks[currentTrackIndex].photo} 
                        alt={sampleTracks[currentTrackIndex].artist}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(sampleTracks[currentTrackIndex].artist)}&background=1B4332&color=fff&size=400`;
                        }}
                      />
                    </div>
                    <div className="text-xl font-medium text-gray-100 mb-1">{sampleTracks[currentTrackIndex].title}</div>
                    <div className="text-2xl arabic-text text-emerald-400 mb-2">{sampleTracks[currentTrackIndex].arabicTitle}</div>
                    <div className="text-sm text-gray-400">{sampleTracks[currentTrackIndex].artist}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass rounded-2xl shadow-xl card-hover">
            <div className="p-6 border-b border-gray-800/50">
              <h2 className="text-2xl font-medium text-gray-200">
                Playlist
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {sampleTracks.length} tracks available
              </p>
            </div>
            <Queue
              tracks={sampleTracks}
              currentTrackIndex={currentTrackIndex}
              onTrackSelect={setCurrentTrackIndex}
            />
          </div>
        </main>
      </div>
      
      <AudioPlayer tracks={sampleTracks} />
    </div>
  );
};

export default App;
