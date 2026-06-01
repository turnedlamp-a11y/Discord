import { Server as SocketIOServer, Socket } from 'socket.io';
import User from '../models/User.js';
import Message from '../models/Message.js';

const onlineUsers = new Map<string, string>();
const userSockets = new Map<string, string>();

export const initializeSocketHandlers = (io: SocketIOServer): void => {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('user:online', async (userId: string) => {
      onlineUsers.set(userId, socket.id);
      userSockets.set(socket.id, userId);

      await User.findByIdAndUpdate(userId, { status: 'online', lastSeen: new Date() });

      io.emit('user:status-changed', {
        userId,
        status: 'online',
      });
    });

    socket.on('user:status', async (data: { userId: string; status: string }) => {
      await User.findByIdAndUpdate(data.userId, { status: data.status });
      io.emit('user:status-changed', data);
    });

    socket.on('message:typing', (data: { senderId: string; recipientId: string }) => {
      const recipientSocket = onlineUsers.get(data.recipientId);
      if (recipientSocket) {
        io.to(recipientSocket).emit('message:typing', {
          senderId: data.senderId,
        });
      }
    });

    socket.on('message:stop-typing', (data: { senderId: string; recipientId: string }) => {
      const recipientSocket = onlineUsers.get(data.recipientId);
      if (recipientSocket) {
        io.to(recipientSocket).emit('message:stop-typing', {
          senderId: data.senderId,
        });
      }
    });

    socket.on('message:send', async (data: any) => {
      try {
        const message = new Message({
          senderId: data.senderId,
          recipientId: data.recipientId,
          content: data.content,
          fileUrl: data.fileUrl,
          fileType: data.fileType || 'text',
          read: false,
        });

        await message.save();
        await message.populate('senderId', 'username avatar');

        const recipientSocket = onlineUsers.get(data.recipientId);
        if (recipientSocket) {
          io.to(recipientSocket).emit('message:receive', message);
        }
      } catch (error) {
        console.error('Message send error:', error);
      }
    });

    socket.on('message:read', async (data: { messageId: string; recipientId: string }) => {
      await Message.findByIdAndUpdate(data.messageId, { read: true, readAt: new Date() });

      const senderSocket = onlineUsers.get(data.recipientId);
      if (senderSocket) {
        io.to(senderSocket).emit('message:read', {
          messageId: data.messageId,
        });
      }
    });

    socket.on('message:edit', async (data: { messageId: string; content: string; recipientId: string }) => {
      await Message.findByIdAndUpdate(data.messageId, {
        content: data.content,
        edited: true,
        editedAt: new Date(),
      });

      const recipientSocket = onlineUsers.get(data.recipientId);
      if (recipientSocket) {
        io.to(recipientSocket).emit('message:edited', {
          messageId: data.messageId,
          content: data.content,
        });
      }
    });

    socket.on('call:initiate', (data: { from: string; to: string; type: string }) => {
      const recipientSocket = onlineUsers.get(data.to);
      if (recipientSocket) {
        io.to(recipientSocket).emit('call:incoming', {
          from: data.from,
          callType: data.type,
        });
      }
    });

    socket.on('call:accept', (data: { from: string; to: string }) => {
      const callerSocket = onlineUsers.get(data.from);
      if (callerSocket) {
        io.to(callerSocket).emit('call:accepted', {
          from: data.to,
        });
      }
    });

    socket.on('call:reject', (data: { from: string; to: string }) => {
      const callerSocket = onlineUsers.get(data.from);
      if (callerSocket) {
        io.to(callerSocket).emit('call:rejected', {
          from: data.to,
        });
      }
    });

    socket.on('disconnect', async () => {
      const userId = userSockets.get(socket.id);
      if (userId) {
        onlineUsers.delete(userId);
        userSockets.delete(socket.id);
        await User.findByIdAndUpdate(userId, { status: 'offline', lastSeen: new Date() });
        io.emit('user:status-changed', {
          userId,
          status: 'offline',
        });
      }
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
