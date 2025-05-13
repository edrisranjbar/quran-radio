
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
    <div className="w-full islamic-card">
      <div className="flex items-center mb-3">
        <ListMusic size={18} className="mr-2 text-primary" />
        <h2 className="text-xl font-medium text-primary">Quran Surahs</h2>
      </div>
      
      <div className="grid gap-2 max-h-[50vh] overflow-y-auto pr-1">
        {surahs.map((surah) => (
          <div
            key={surah.id}
            className={`flex items-center p-2.5 border rounded-lg cursor-pointer hover:bg-accent/20 ${
              currentSurah?.id === surah.id ? 'bg-accent/30 border-primary/30' : 'border-transparent'
            }`}
            onClick={() => onSelectSurah(surah)}
          >
            <div className="mr-3 flex-shrink-0">
              <div className={`flex items-center justify-center h-7 w-7 rounded-full bg-accent text-primary ${
                currentSurah?.id === surah.id && isPlaying ? 'animate-pulse-opacity' : ''
              }`}>
                <span className="text-xs font-medium">{surah.id}</span>
              </div>
            </div>
            <div className="overflow-hidden">
              <h3 className="font-medium truncate text-sm">{surah.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurahQueue;
