import React from 'react';
import { motion } from 'framer-motion';

interface MessageProps {
  message: {
    _id: string;
    senderId: { username: string; avatar: string };
    content: string;
    createdAt: string;
    edited: boolean;
  };
  isOwn: boolean;
}

const Message = ({ message, isOwn }: MessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isOwn
            ? 'bg-gradient-to-r from-primary to-secondary text-white'
            : 'bg-white/10 border border-white/20 text-white'
        }`}
      >
        <p>{message.content}</p>
        <p className="text-xs opacity-70 mt-1">
          {new Date(message.createdAt).toLocaleTimeString()}
          {message.edited && ' (edited)'}
        </p>
      </div>
    </motion.div>
  );
};

export default Message;
