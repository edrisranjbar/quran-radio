import { FC } from 'react';
import { Radio } from 'lucide-react';

interface Station {
  id: string;
  name: string;
  description: string;
  tracks: Track[];
}

interface Track {
  id: string;
  title: string;
  artist: string;
  photo: string;
  url: string;
  duration: string;
}

interface StationListProps {
  stations: Station[];
  currentStationIndex: number;
  onStationSelect: (index: number) => void;
}

export const StationList: FC<StationListProps> = ({
  stations,
  currentStationIndex,
  onStationSelect,
}) => {
  return (
    <div className="glass rounded-2xl p-6 shadow-xl card-hover">
      <h2 className="text-xl font-medium text-gray-200 mb-4 flex items-center">
        <Radio className="h-5 w-5 text-emerald-400 mr-2" />
        Stations
      </h2>
      <div className="space-y-3">
        {stations.map((station, index) => (
          <button
            key={station.id}
            onClick={() => onStationSelect(index)}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
              currentStationIndex === index
                ? 'bg-emerald-500/20 border border-emerald-500/30'
                : 'hover:bg-gray-800/50 border border-transparent'
            }`}
          >
            <div className="font-medium text-gray-100">{station.name}</div>
            <div className="text-sm text-gray-400">{station.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}; 