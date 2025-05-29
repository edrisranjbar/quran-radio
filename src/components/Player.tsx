import { FC } from 'react';
import { Volume2, Clock } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  photo: string;
  url: string;
  duration: string;
}

interface PlayerProps {
  track: Track;
}

export const Player: FC<PlayerProps> = ({ track }) => {
  return (
    <div className="glass rounded-2xl p-4 md:p-8 shadow-xl card-hover">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-medium text-gray-200 flex items-center">
          <Volume2 className="h-5 w-5 text-emerald-400 mr-2" />
          Live Streaming
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-400">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{track.duration}</span>
          </div>
        </div>
      </div>
      <div className="aspect-video rounded-xl flex items-center justify-center overflow-hidden">
        <div className="text-center relative w-full h-full">
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-emerald-500/20 mb-4 bg-gray-800">
              <img 
                src={track.photo} 
                alt={track.artist}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(track.artist)}&background=1B4332&color=fff&size=400`;
                }}
              />
            </div>
            <div className="text-xl font-medium text-gray-100 mb-1">{track.title}</div>
            <div className="text-sm text-gray-400">{track.artist}</div>
          </div>
        </div>
      </div>
    </div>
  );
}; 