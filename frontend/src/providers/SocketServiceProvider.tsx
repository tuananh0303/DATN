import React, { createContext, useEffect, useMemo, ReactNode } from 'react';
import { SocketService } from '@/services/socket.service';

export const SocketContext = createContext<SocketService | null>(null);

interface SocketServiceProviderProps {
  children: ReactNode;
}

export const SocketServiceProvider: React.FC<SocketServiceProviderProps> = ({ children }) => {
  const socketService = useMemo(() => new SocketService(), []);

  useEffect(() => {
    return () => {
      socketService.disconnect();
    };
  }, [socketService]);

  return (
    <SocketContext.Provider value={socketService}>
      {children}
    </SocketContext.Provider>
  );
}; 