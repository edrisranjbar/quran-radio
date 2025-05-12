
import React from 'react';
import { QuranSurah } from '../hooks/useAudio';
import { ListMusic } from 'lucide-react';

interface SurahQueueProps {
  surahs: QuranSurah[];
  currentSurah: QuranSurah | null;
  onSelectSurah: (surah: QuranSurah) => void;
  isPlaying: boolean;
}

const SurahQueue: React.FC<SurahQueueProps> = ({
  surahs,
  currentSurah,
  onSelectSurah,
  isPlaying
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center mb-3">
        <ListMusic size={20} className="mr-2 text-islamic" />
        <h2 className="text-xl font-semibold text-islamic">Quran Surahs</h2>
      </div>
      
      <div className="grid gap-2">
        {surahs.map((surah) => (
          <div
            key={surah.id}
            className={`flex items-center p-3 border rounded-lg cursor-pointer hover:bg-accent/40 ${
              currentSurah?.id === surah.id ? 'bg-accent/70 border-islamic/30' : 'border-transparent'
            }`}
            onClick={() => onSelectSurah(surah)}
          >
            <div className="mr-3 flex-shrink-0">
              <div className={`flex items-center justify-center h-8 w-8 rounded-full bg-islamic/10 text-islamic ${
                currentSurah?.id === surah.id && isPlaying ? 'animate-pulse-opacity' : ''
              }`}>
                <span className="text-xs font-medium">{surah.id}</span>
              </div>
            </div>
            <div className="overflow-hidden">
              <h3 className="font-medium truncate">{surah.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurahQueue;
