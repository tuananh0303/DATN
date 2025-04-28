import { useContext } from 'react';
import { SocketContext } from '@/providers/SocketServiceProvider';
import { SocketService } from '@/services/socket.service';

export const useSocketService = (): SocketService => {
  const socketService = useContext(SocketContext);
  
  if (!socketService) {
    throw new Error('useSocketService must be used within a SocketServiceProvider');
  }
  
  return socketService;
}; 