// src/services/socket.service.ts
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message, Conversation, Participant } from '@/types/chat.type';

export class SocketService {
  private socket: Socket;
  private connectedUsers = new BehaviorSubject<string[]>([]);
  private conversations = new BehaviorSubject<Conversation[]>([]);
  private messages = new BehaviorSubject<{ [key: string]: Message[] }>({});

  constructor() {
    this.socket = io('http://localhost:3000/ws/message', {
      extraHeaders: {
        Authorization: `Bearer ${this.getToken()}`
      },
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });
    this.setupSocketListeners();
    
    // Listen for token changes
    window.addEventListener('storage', (event) => {
      if (event.key === 'access_token') {
        // Reconnect socket with new token
        this.disconnect();
        this.socket = io('http://localhost:3000/ws/message', {
          extraHeaders: {
            Authorization: `Bearer ${this.getToken()}`
          },
          autoConnect: true,
          reconnection: true
        });
        this.setupSocketListeners();
      }
    });
  }

  private getToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  private setupSocketListeners(): void {
    this.socket.on('connect', () => {
      console.log('Connected to chat server');
    });

    this.socket.on('exception', (error: string) => {
      console.error('Socket error:', error);
    });

    this.socket.on('connected-users', (users: string[]) => {
      this.connectedUsers.next(users);
    });

    this.socket.on('receive-message', (message: Message) => {
      const currentMessages = this.messages.value;
      const conversationId = message.conversation.id;
      
      if (!currentMessages[conversationId]) {
        currentMessages[conversationId] = [];
      }
      
      currentMessages[conversationId].push(message);
      this.messages.next({...currentMessages});
    });

    this.socket.on('seen-message', (participant: Participant) => {
      // Xử lý khi có người xem tin nhắn
      const convos = this.conversations.value;
      const index = convos.findIndex((c: Conversation) => 
        c.participants.some((p: Participant) => p.id === participant.id)
      );
      
      if (index !== -1) {
        const updatedConvos = [...convos];
        const participantIndex = updatedConvos[index].participants
          .findIndex((p: Participant) => p.id === participant.id);
        
        if (participantIndex !== -1) {
          updatedConvos[index].participants[participantIndex] = participant;
          this.conversations.next(updatedConvos);
        }
      }
    });

    this.socket.on('join-conversation', (conversation: Conversation) => {
      const convos = this.conversations.value;
      this.conversations.next([...convos, conversation]);
    });

    this.socket.on('add-person-notificate', (participant: Participant) => {
      // Xử lý thông báo khi có người được thêm vào cuộc trò chuyện
      console.log('Person added notification:', participant);
    });

    this.socket.on('add-person', (conversation: Conversation) => {
      const convos = this.conversations.value;
      this.conversations.next([...convos, conversation]);
    });
  }

  // Các phương thức để emit events
  sendMessage(conversationId: string, content: string): void {
    this.socket.emit('send-message', {
      conversationId,
      content
    });
  }

  sendImages(conversationId: string, imageUrls: string[]): void {
    this.socket.emit('send-images', {
      conversationId,
      imageUrls
    });
  }

  markAsSeen(conversationId: string): void {
    this.socket.emit('seen-message', {
      conversationId
    });
  }

  // Observables để component có thể đăng ký nghe sự kiện
  getConnectedUsers(): Observable<string[]> {
    return this.connectedUsers.asObservable();
  }

  getConversations(): Observable<Conversation[]> {
    return this.conversations.asObservable(); 
  }

  getMessages(conversationId: string): Observable<Message[]> {
    return new Observable((observer: { next: (value: Message[]) => void }) => {
      observer.next(this.messages.value[conversationId] || []);
      
      const subscription = this.messages.subscribe((messagesMap: { [key: string]: Message[] }) => {
        observer.next(messagesMap[conversationId] || []);
      });
      
      return () => subscription.unsubscribe();
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}