import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FaUser, FaCog, FaCamera } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-darker pt-20">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div className="card-glass p-8">
            <div className="relative mb-6">
              <div className="h-32 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-lg"></div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute bottom-0 left-4 transform translate-y-1/2"
              >
                <div className="w-32 h-32 rounded-full border-4 border-darker bg-white/10 flex items-center justify-center text-4xl">
                  <FaUser />
                </div>
              </motion.div>
            </div>

            <div className="ml-36 space-y-4">
              <div>
                <h1 className="text-3xl font-bold">Welcome</h1>
                <p className="text-white/50">User Profile</p>
              </div>
              <p className="text-sm">
                Status: <span className="px-3 py-1 bg-primary/20 border border-primary/50 rounded-full text-primary text-xs uppercase">
                  Online
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
