import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Message from '../components/Message';
import MessageInput from '../components/MessageInput';
import { useAuthStore } from '../store/auth';
import { useChatStore } from '../store/chat';
import axios from 'axios';

const ChatPage = () => {
  const { user } = useAuthStore();
  const { messages } = useChatStore();
  const [recipientId] = useState(''); // In a real app, this would come from context or params
  const [otherUser, setOtherUser] = useState<any>(null);

  useEffect(() => {
    // Load chat history
    const loadMessages = async () => {
      if (!recipientId || !user) return;
      try {
        const response = await axios.get(`/api/messages/${recipientId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        // Handle messages
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    };

    loadMessages();
  }, [recipientId, user]);

  return (
    <div className="min-h-screen bg-darker pt-20 pb-20">
      <Navbar />

      <div className="max-w-4xl mx-auto">
        {recipientId ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-b from-darker to-dark/50 rounded-2xl p-6 min-h-[500px] border border-white/10"
          >
            <div className="space-y-4 max-h-[500px] overflow-y-auto mb-4">
              {messages.map((msg) => (
                <Message key={msg._id} message={msg} isOwn={msg.senderId === user?.id} />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-[500px] text-center"
          >
            <div>
              <h2 className="text-2xl font-bold mb-4">Select a chat to start</h2>
              <p className="text-white/50">Choose a conversation or start a new one</p>
            </div>
          </motion.div>
        )}
      </div>

      {recipientId && <MessageInput recipientId={recipientId} />}
    </div>
  );
};

export default ChatPage;
