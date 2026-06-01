import { create } from 'zustand';
import io, { Socket } from 'socket.io-client';

interface Message {
  _id: string;
  senderId: { username: string; avatar: string };
  recipientId: string;
  content: string;
  fileUrl?: string;
  fileType: string;
  reactions: any[];
  read: boolean;
  edited: boolean;
  createdAt: string;
}

interface ChatStore {
  messages: Message[];
  typingUsers: Set<string>;
  socket: Socket | null;
  initializeSocket: (userId: string) => void;
  sendMessage: (recipientId: string, content: string, fileUrl?: string) => void;
  addMessage: (message: Message) => void;
  setTyping: (senderId: string) => void;
  removeTyping: (senderId: string) => void;
}

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  typingUsers: new Set(),
  socket: null,

  initializeSocket: (userId: string) => {
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('Socket connected');
      socket.emit('user:online', userId);
    });

    socket.on('message:receive', (message: Message) => {
      set((state) => ({ messages: [...state.messages, message] }));
    });

    socket.on('message:typing', (data: { senderId: string }) => {
      set((state) => {
        state.typingUsers.add(data.senderId);
        return { typingUsers: new Set(state.typingUsers) };
      });
    });

    socket.on('message:stop-typing', (data: { senderId: string }) => {
      set((state) => {
        state.typingUsers.delete(data.senderId);
        return { typingUsers: new Set(state.typingUsers) };
      });
    });

    set({ socket });
  },

  sendMessage: (recipientId, content, fileUrl) => {
    const { socket } = get();
    if (socket) {
      socket.emit('message:send', {
        recipientId,
        content,
        fileUrl,
        fileType: fileUrl ? 'file' : 'text',
      });
    }
  },

  addMessage: (message: Message) => {
    set((state) => ({ messages: [...state.messages, message] }));
  },

  setTyping: (senderId: string) => {
    set((state) => {
      state.typingUsers.add(senderId);
      return { typingUsers: new Set(state.typingUsers) };
    });
  },

  removeTyping: (senderId: string) => {
    set((state) => {
      state.typingUsers.delete(senderId);
      return { typingUsers: new Set(state.typingUsers) };
    });
  },
}));
