import { ScrollArea } from './ui/scroll-area';
import { Clock, Heart, User } from 'lucide-react';

interface AudioTrack {
  id: string;
  title: string;
  arabicTitle: string;
  artist: string;
  photo: string;
  url: string;
  duration: string;
  likes: number;
}

interface QueueProps {
  tracks: AudioTrack[];
  currentTrackIndex: number;
  onTrackSelect: (index: number) => void;
}

export function Queue({ tracks, currentTrackIndex, onTrackSelect }: QueueProps) {
  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <div className="space-y-2 p-4">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            onClick={() => onTrackSelect(index)}
            className={`p-4 rounded-xl cursor-pointer transition-all ${
              index === currentTrackIndex
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'hover:bg-gray-800/50 border border-transparent'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
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
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium text-gray-200 truncate">{track.title}</div>
                  <div className="flex items-center space-x-3 text-sm flex-shrink-0">
                    <div className="flex items-center text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      <span className="font-medium">{track.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Heart className="h-3 w-3 mr-1" />
                      <span className="font-medium">{track.likes}</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm arabic-text text-emerald-400 mb-1">{track.arabicTitle}</div>
                <div className="text-sm text-gray-400 truncate">{track.artist}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
} 