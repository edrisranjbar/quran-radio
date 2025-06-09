import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001');

export const ListenerCount: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    socket.on('listenerCount', (newCount: number) => {
      setCount(newCount);
    });

    return () => {
      socket.off('listenerCount');
    };
  }, []);

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-400">
      <Users className="h-4 w-4" />
      <span>{count} listening now</span>
    </div>
  );
}; 