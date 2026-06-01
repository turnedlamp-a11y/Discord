import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { FaHeart, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-darker/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/chat')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <FaHeart className="text-rose text-2xl" />
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            TwoHearts
          </span>
        </motion.div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/profile')}
            className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            Profile
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/nitro')}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white hover:shadow-glow transition-all"
          >
            Nitro
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <FaSignOutAlt className="text-xl" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
