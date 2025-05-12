
import React from 'react';
import type { QuranReciter } from '../hooks/useAudio';
import { Radio } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface StationsListProps {
  stations: QuranReciter[];
  currentStation: QuranReciter | null;
  onSelectStation: (station: QuranReciter) => void;
  isPlaying: boolean;
}

const StationsList: React.FC<StationsListProps> = ({
  stations,
  currentStation,
  onSelectStation,
  isPlaying
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stations.map((station) => {
        const isActive = currentStation?.id === station.id;
        return (
          <div
            key={station.id}
            className={`station-card ${isActive ? 'border-islamic' : ''}`}
            onClick={() => onSelectStation(station)}
          >
            <div className="flex items-center">
              <div className="mr-4 h-12 w-12 flex items-center justify-center rounded-full overflow-hidden">
                {station.image ? (
                  <Avatar className="h-full w-full">
                    <AvatarImage src={station.image} alt={station.reciter} />
                    <AvatarFallback className="bg-islamic/10 text-islamic">
                      <Radio size={20} />
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="h-full w-full flex items-center justify-center rounded-full bg-islamic/10 text-islamic">
                    <Radio size={20} />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg text-foreground">{station.name}</h3>
                <p className="text-sm text-muted-foreground">{station.reciter}</p>
              </div>
              {isActive && isPlaying && (
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-3 bg-islamic animate-pulse-opacity rounded-full"></div>
                  <div className="w-1 h-5 bg-islamic animate-pulse-opacity rounded-full"></div>
                  <div className="w-1 h-3 bg-islamic animate-pulse-opacity rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StationsList;
