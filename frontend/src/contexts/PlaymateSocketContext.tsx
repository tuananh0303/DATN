import { createContext } from 'react';
import { PlaymateSocketService } from '@/services/playmate-socket.service';

export const PlaymateSocketContext = createContext<PlaymateSocketService | null>(null); 