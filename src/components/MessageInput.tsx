import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperclip, FaSmile, FaPaperPlane } from 'react-icons/fa';
import { useChatStore } from '../store/chat';

interface MessageInputProps {
  recipientId: string;
}

const MessageInput = ({ recipientId }: MessageInputProps) => {
  const [content, setContent] = useState('');
  const { sendMessage } = useChatStore();

  const handleSend = () => {
    if (content.trim()) {
      sendMessage(recipientId, content);
      setContent('');
    }
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-darker/80 backdrop-blur-md p-4"
    >
      <div className="max-w-4xl mx-auto flex gap-3">
        <motion.button whileHover={{ scale: 1.1 }} className="p-2 hover:bg-white/10 rounded-lg">
          <FaPaperclip className="text-primary" />
        </motion.button>

        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Send a message..."
          className="input-field flex-1"
        />

        <motion.button whileHover={{ scale: 1.1 }} className="p-2 hover:bg-white/10 rounded-lg">
          <FaSmile className="text-primary" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={handleSend}
          className="p-2 bg-primary hover:bg-secondary rounded-lg transition-colors"
        >
          <FaPaperPlane className="text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MessageInput;
