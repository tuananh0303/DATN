import { useState, useEffect, useContext } from 'react';
import { SocketPlaymate } from '@/types/socket-playmate.type';
import { PlaymateSocketContext } from '@/contexts/PlaymateSocketContext';

export const usePlaymateSocket = () => {
  const socketService = useContext(PlaymateSocketContext);
  
  if (!socketService) {
    throw new Error('usePlaymateSocket must be used within a PlaymateSocketProvider');
  }
  
  const [isConnected, setIsConnected] = useState(false);
  const [newPlaymate, setNewPlaymate] = useState<SocketPlaymate | null>(null);
  const [updatedPlaymate, setUpdatedPlaymate] = useState<SocketPlaymate | null>(null);

  useEffect(() => {
    // Subscribe to connection status
    const connectionSubscription = socketService.getConnectionStatus().subscribe(
      (connected) => {
        setIsConnected(connected);
      }
    );

    // Subscribe to new playmate events
    const newPlaymateSubscription = socketService.getNewPlaymate().subscribe(
      (playmate) => {
        if (playmate) {
          setNewPlaymate(playmate);
        }
      }
    );

    // Subscribe to updated playmate events
    const updatedPlaymateSubscription = socketService.getUpdatedPlaymate().subscribe(
      (playmate) => {
        if (playmate) {
          setUpdatedPlaymate(playmate);
        }
      }
    );

    // Cleanup subscriptions when component unmounts
    return () => {
      connectionSubscription.unsubscribe();
      newPlaymateSubscription.unsubscribe();
      updatedPlaymateSubscription.unsubscribe();
    };
  }, [socketService]);

  return {
    isConnected,
    newPlaymate,
    updatedPlaymate
  };
};

export default usePlaymateSocket; 