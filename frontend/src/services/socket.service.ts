// src/services/socket.service.ts
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message, Conversation, Participant, SocketMessage } from '@/types/chat.type';
import api from './api';
import { authService } from './auth.service';

export class SocketService {
  private socket: Socket | null = null;
  private connectedUsers = new BehaviorSubject<string[]>([]);
  private conversations = new BehaviorSubject<Conversation[]>([]);
  private messages = new BehaviorSubject<{ [key: string]: Message[] }>({});
  private activeConversation: string | null = null;
  private isConnecting = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor() {
    // Không kết nối ngay lập tức, đợi token sẵn sàng
    this.setupSocketListeners();
    
    // Lắng nghe sự thay đổi token
    window.addEventListener('storage', (event) => {
      if (event.key === 'access_token') {
        this.reconnect();
      }
    });
  }

  private getToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  private setupSocketListeners(): void {
    // Không thiết lập socket ở đây, sẽ được gọi trong connect()
  }

  private connect(): void {
    if (this.isConnecting || this.socket?.connected) return;
    
    const token = this.getToken();
    if (!token) {
      console.log('No token available, socket connection delayed');
      return;
    }

    this.isConnecting = true;
    console.log('Attempting to connect to socket server...');
    
    try {
      // Ngắt kết nối cũ nếu có
      if (this.socket) {
        this.socket.disconnect();
      }

      // Tạo kết nối mới
      this.socket = io('http://localhost:3000/ws/message', {
        extraHeaders: {
          Authorization: token
        },
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: 1000
      });

      // Thiết lập các event listeners
      this.socket.on('connect', () => {
        console.log('Connected to chat server');
        this.reconnectAttempts = 0;
        this.isConnecting = false;
      });
      
      this.socket.on('exception', (error: string) => {
        console.error('Socket error:', error);
      });

      this.socket.on('connected-users', (users: string[]) => {
        console.log('Connected users updated:', users);
        this.connectedUsers.next(users);
      });

      this.socket.on('receive-message', (message: SocketMessage) => {
        console.log('Received message:', message);
        // Cập nhật messages trong conversation tương ứng
        const conversationId = message.conversation.id;
        const currentMessages = this.messages.value;
        const currentUserId = this.getCurrentUserId();
        
        if (!currentMessages[conversationId]) {
          currentMessages[conversationId] = [];
        }
        
        // Kiểm tra xem message đã tồn tại chưa để tránh duplicate
        const messageExists = currentMessages[conversationId].some(m => m.id === message.id);
        if (!messageExists) {
          // Chuyển đổi SocketMessage thành Message trước khi lưu
          const regularMessage: Message = {
            id: message.id,
            content: message.content,
            createdAt: message.createdAt,
            images: message.images,
            sender: message.sender
          };
          currentMessages[conversationId].push(regularMessage);
          this.messages.next({...currentMessages});
        }

        // Cập nhật conversations để cập nhật last message và unread count
        const convos = this.conversations.value;
        const convoIndex = convos.findIndex(c => c.id === conversationId);
        
        if (convoIndex !== -1) {
          const updatedConvos = [...convos];
          const convo = updatedConvos[convoIndex];
          
          // Cập nhật messages array
          if (!convo.messages) {
            convo.messages = [];
          }
          
          // Kiểm tra xem tin nhắn đã tồn tại chưa
          if (!convo.messages.some(m => m.id === message.id)) {
            // Chuyển đổi SocketMessage thành Message trước khi lưu
            const regularMessage: Message = {
              id: message.id,
              content: message.content,
              createdAt: message.createdAt,
              images: message.images,
              sender: message.sender
            };
            convo.messages.push(regularMessage);
            
            // Chỉ tăng số tin chưa đọc khi:
            // 1. Tin nhắn đến từ người khác (không phải người dùng hiện tại)
            // 2. Conversation hiện tại không phải là conversation đang active (người dùng không đang xem)
            if (message.sender.id !== currentUserId && conversationId !== this.activeConversation) {
              convo.unreadMessageCount = (convo.unreadMessageCount || 0) + 1;
            }
            
            this.conversations.next([...updatedConvos]);
          }
        }
      });

      this.socket.on('seen-message', (participant: Participant) => {
        console.log('Received seen-message event:', participant);
        const currentUserId = this.getCurrentUserId();
        
        // Cập nhật seen status trong conversations
        const convos = this.conversations.value;
        const convoIndex = convos.findIndex(c => c.id === participant.conversationId);
        
        if (convoIndex !== -1) {
          const updatedConvos = [...convos];
          const convo = updatedConvos[convoIndex];
          
          // Cập nhật participant trong conversation
          const participantIndex = convo.participants
            .findIndex(p => p.personId === participant.personId);
          
          if (participantIndex !== -1) {
            // Cập nhật participant
            convo.participants[participantIndex] = participant;
            
            // Nếu người dùng hiện tại đọc tin nhắn, xóa số tin nhắn chưa đọc
            if (participant.personId === currentUserId) {
              convo.unreadMessageCount = 0;
            }
            
            // Cập nhật trạng thái đã đọc cho các tin nhắn
            if (convo.messages && convo.messages.length > 0 && participant.seen) {
              const seenMessageIndex = convo.messages.findIndex(m => m.id === participant.seen?.id);
              
              if (seenMessageIndex !== -1) {
                // Đánh dấu tất cả tin nhắn của người dùng hiện tại tới index này là đã đọc
                const updatedMessages = [...convo.messages];
                for (let i = 0; i <= seenMessageIndex; i++) {
                  if (updatedMessages[i].sender.id === currentUserId) {
                    updatedMessages[i] = {
                      ...updatedMessages[i],
                      isRead: true
                    };
                  }
                }
                
                convo.messages = updatedMessages;
                this.conversations.next([...updatedConvos]);
              }
            }
            
            this.conversations.next([...updatedConvos]);
          }
        }
        
        // Cập nhật trạng thái đã đọc trong messages
        if (participant.seen) {
          const allMessages = this.messages.value;
          const conversationMessages = allMessages[participant.conversationId];
          
          if (conversationMessages) {
            const seenMessageIndex = conversationMessages.findIndex(m => m.id === participant.seen?.id);
            
            if (seenMessageIndex !== -1) {
              // Đánh dấu tất cả tin nhắn của người dùng hiện tại tới index này là đã đọc
              const updatedMessages = [...conversationMessages];
              for (let i = 0; i <= seenMessageIndex; i++) {
                if (updatedMessages[i].sender.id === currentUserId) {
                  updatedMessages[i] = {
                    ...updatedMessages[i],
                    isRead: true
                  };
                }
              }
              
              allMessages[participant.conversationId] = updatedMessages;
              this.messages.next({...allMessages});
            }
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

      this.socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
        this.isConnecting = false;
        
        // Nếu bị ngắt kết nối do token hết hạn, thử refresh token
        if (reason === 'io server disconnect' || reason === 'transport close') {
          this.handleTokenError();
        }
      });

    } catch (error) {
      console.error('Error setting up socket:', error);
      this.isConnecting = false;
    }
  }

  private handleTokenError(): void {
    // Thử refresh token nếu có thể
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      // Sử dụng authService để refresh token
      authService.refreshToken(refreshToken)
        .then(data => {
          if (data.accessToken) {
            localStorage.setItem('access_token', data.accessToken);
            if (data.refreshToken) {
              localStorage.setItem('refresh_token', data.refreshToken);
            }
            // Kết nối lại sau khi refresh token
            this.reconnect();
          } else {
            // Nếu không refresh được, đăng xuất
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/';
          }
        })
        .catch(error => {
          console.error('Error refreshing token:', error);
          // Nếu lỗi, đăng xuất
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/';
        });
    } else {
      // Không có refresh token, đăng xuất
      localStorage.removeItem('access_token');
      window.location.href = '/';
    }
  }

  private reconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }
    
    this.reconnectAttempts++;
    this.connect();
  }

  private getCurrentUserId(): string | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user.id;
      } catch (e) {
        console.error('Error parsing user:', e);
        return null;
      }
    }
    return null;
  }

  // Các phương thức để emit events
  sendMessage(conversationId: string, content: string): void {
    console.log('Attempting to send message:', { conversationId, content });
    
    if (!this.socket?.connected) {
      // Only attempt to connect if not already connected
      if (!this.isConnecting) {
        console.log('Socket not connected. Attempting to connect...');
        this.connect();
        
        // Đợi kết nối thành công trước khi gửi tin nhắn
        setTimeout(() => {
          if (this.socket?.connected) {
            console.log('Connected. Sending delayed message.');
            this.socket.emit('send-message', {
              conversationId,
              content
            });
          } else {
            console.error('Failed to connect socket for sending message.');
          }
        }, 500); // Increased timeout to ensure connection completes
      } else {
        console.log('Already attempting to connect. Message not sent.');
      }
    } else {
      console.log('Socket connected. Sending message immediately.');
      this.socket.emit('send-message', {
        conversationId,
        content
      });
    }
  }
  
  sendImages(conversationId: string, imageUrls: string[]): void {
    if (!this.socket?.connected) {
      // Only attempt to connect if not already connected
      if (!this.isConnecting) {
        this.connect();
        
        // Đợi kết nối thành công trước khi gửi hình ảnh
        setTimeout(() => {
          if (this.socket?.connected) {
            this.socket.emit('send-images', {
              conversationId,
              imageUrls
            });
          }
        }, 500); // Increased timeout
      }
    } else {
      this.socket.emit('send-images', {
        conversationId,
        imageUrls
      });
    }
  }

  markAsSeen(conversationId: string, messageId: string): void {
    if (!this.socket?.connected) {
      // Only attempt to connect if not already in the process of connecting
      if (!this.isConnecting) {
        this.connect();
        // Đợi kết nối thành công trước khi gửi seen message
        setTimeout(() => {
          if (this.socket?.connected) {
            this.socket.emit('seen-message', {
              conversationId,
              messageId
            });
          }
        }, 200);
      }
    } else {
      this.socket.emit('seen-message', {
        conversationId,
        messageId
      });
    }
  }

  // Observables để component có thể đăng ký nghe sự kiện
  getConnectedUsers(): Observable<string[]> {
    // Đảm bảo kết nối đã được thiết lập trước khi trả về giá trị
    if (!this.socket?.connected && !this.isConnecting) {
      this.connect();
    }
    return this.connectedUsers.asObservable();
  }

  getConversations(): Observable<Conversation[]> {
    if (!this.socket?.connected && !this.isConnecting) {
      this.connect();
    }
    return this.conversations.asObservable(); 
  }

  getMessages(conversationId: string): Observable<Message[]> {
    if (!this.socket?.connected && !this.isConnecting) {
      this.connect();
    }
    
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
      this.socket = null;
    }
  }

  setActiveConversation(conversationId: string | null) {
    this.activeConversation = conversationId;
  }

  // Kiểm tra xem một userId có đang online không
  isUserOnline(userId: string): boolean {
    return this.connectedUsers.value.includes(userId);
  }

  // Observable cho trạng thái online của một người dùng cụ thể
  getUserOnlineStatus(userId: string): Observable<boolean> {
    if (!this.socket?.connected && !this.isConnecting) {
      this.connect();
    }
    
    return new Observable((observer: { next: (value: boolean) => void }) => {
      // Trả về giá trị hiện tại
      observer.next(this.connectedUsers.value.includes(userId));
      
      // Theo dõi các thay đổi
      const subscription = this.connectedUsers.subscribe((users: string[]) => {
        observer.next(users.includes(userId));
      });
      
      return () => subscription.unsubscribe();
    });
  }
}

export default api;