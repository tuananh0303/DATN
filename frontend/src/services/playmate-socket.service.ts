import { io, Socket } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { SocketPlaymate } from '@/types/socket-playmate.type';

export class PlaymateSocketService {
  private socket: Socket | null = null;
  private isConnected = new BehaviorSubject<boolean>(false);
  private newPlaymate = new BehaviorSubject<SocketPlaymate | null>(null);
  private updatedPlaymate = new BehaviorSubject<SocketPlaymate | null>(null);
  private isConnecting = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor() {
    // Try to connect immediately
    setTimeout(() => {
      this.connect();
    }, 100);
  }

  private connect(): void {
    if (this.isConnecting) {
      console.log('Already attempting to connect playmate socket. Skipping redundant connect call.');
      return;
    }
    
    if (this.socket?.connected) {
      console.log('Playmate socket already connected.');
      return;
    }

    this.isConnecting = true;
    
    try {
      // Disconnect existing socket if any
      if (this.socket) {
        console.log('Disconnecting existing playmate socket');
        this.socket.disconnect();
        this.socket = null;
      }

      // Create new connection
      console.log('Creating new playmate socket connection');
      this.socket = io(import.meta.env.VITE_API_URL + '/ws/playmate', {
        withCredentials: true,
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: 1000,
        timeout: 5000
      });

      // Set up event listeners
      this.socket.on('connect', () => {
        console.log('Connected to playmate socket server');
        this.reconnectAttempts = 0;
        this.isConnecting = false;
        this.isConnected.next(true);
      });
      
      this.socket.on('connect_error', (error) => {
        console.error('Playmate socket connection error:', error);
        this.isConnecting = false;
        this.isConnected.next(false);
      });
      
      this.socket.on('exception', (error: string) => {
        console.error('Playmate socket error:', error);
      });

      this.socket.on('new-playmate', (playmate: SocketPlaymate) => {
        console.log('Received new playmate:', playmate);
        this.newPlaymate.next(playmate);
      });

      this.socket.on('update-playmate', (playmate: SocketPlaymate) => {
        console.log('Received updated playmate:', playmate);
        this.updatedPlaymate.next(playmate);
      });

      this.socket.on('disconnect', (reason) => {
        console.log('Playmate socket disconnected:', reason);
        this.isConnecting = false;
        this.isConnected.next(false);
        
        // Try to reconnect if disconnected unexpectedly
        if (reason === 'io server disconnect' || reason === 'transport close') {
          this.reconnect();
        }
      });

    } catch (error) {
      console.error('Error setting up playmate socket:', error);
      this.isConnecting = false;
      this.isConnected.next(false);
    }
  }

  private reconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached for playmate socket');
      return;
    }
    
    this.reconnectAttempts++;
    this.connect();
  }

  getConnectionStatus() {
    return this.isConnected.asObservable();
  }

  getNewPlaymate() {
    if (!this.socket || !this.socket.connected) {
      if (!this.isConnecting) {
        this.connect();
      }
    }
    return this.newPlaymate.asObservable();
  }

  getUpdatedPlaymate() {
    if (!this.socket || !this.socket.connected) {
      if (!this.isConnecting) {
        this.connect();
      }
    }
    return this.updatedPlaymate.asObservable();
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

// Create a singleton instance
export const playmateSocketService = new PlaymateSocketService();

export default playmateSocketService; 