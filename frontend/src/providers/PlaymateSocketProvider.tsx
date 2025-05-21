import React, { useEffect, useMemo, ReactNode } from 'react';
import { playmateSocketService } from '@/services/playmate-socket.service';
import { PlaymateSocketContext } from '@/contexts/PlaymateSocketContext';

interface PlaymateSocketProviderProps {
  children: ReactNode;
}

export const PlaymateSocketProvider: React.FC<PlaymateSocketProviderProps> = ({ children }) => {
  // Sử dụng singleton instance đã được tạo từ service
  const socketService = useMemo(() => playmateSocketService, []);

  useEffect(() => {
    return () => {
      // Ngắt kết nối socket khi unmount
      socketService.disconnect();
    };
  }, [socketService]);

  return (
    <PlaymateSocketContext.Provider value={socketService}>
      {children}
    </PlaymateSocketContext.Provider>
  );
}; 