import { FC } from 'react';
import { Queue } from './Queue';

interface Track {
  id: string;
  title: string;
  artist: string;
  photo: string;
  url: string;
  duration: string;
}

interface PlaylistProps {
  tracks: Track[];
  currentTrackIndex: number;
  onTrackSelect: (index: number) => void;
}

export const Playlist: FC<PlaylistProps> = ({
  tracks,
  currentTrackIndex,
  onTrackSelect,
}) => {
  return (
    <div className="glass rounded-2xl shadow-xl card-hover">
      <div className="p-6 border-b border-gray-800/50">
        <h2 className="text-xl font-medium text-gray-200">
          Playlist
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          {tracks.length} tracks available
        </p>
      </div>
      <Queue
        tracks={tracks}
        currentTrackIndex={currentTrackIndex}
        onTrackSelect={onTrackSelect}
      />
    </div>
  );
}; 