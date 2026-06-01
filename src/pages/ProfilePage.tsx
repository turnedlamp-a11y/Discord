import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { useAuthStore } from '../store/auth';
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
          {/* Profile Header */}
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
                <h1 className="text-3xl font-bold">{user?.username}</h1>
                <p className="text-white/50">{user?.email}</p>
              </div>
              <p className="text-sm">
                Status:{' '}
                <span className="px-3 py-1 bg-primary/20 border border-primary/50 rounded-full text-primary text-xs uppercase">
                  {user?.status}
                </span>
              </p>
            </div>
          </div>

          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-glass p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaCog className="text-primary text-xl" />
              <h2 className="text-2xl font-bold">Profile Settings</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  placeholder="Tell us about yourself..."
                  className="input-field h-24 resize-none"
                  defaultValue={user?.statusMessage}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Status Message</label>
                  <input type="text" placeholder="What's on your mind?" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select className="input-field">
                    <option>Online</option>
                    <option>Idle</option>
                    <option>Do Not Disturb</option>
                    <option>Offline</option>
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toast.success('Profile updated!')}
                className="btn-primary w-full md:w-auto"
              >
                Save Changes
              </motion.button>
            </div>
          </motion.div>

          {/* Theme Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card-glass p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Appearance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label>Dark Theme</label>
                <input type="checkbox" defaultChecked className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <label>Animations</label>
                <input type="checkbox" defaultChecked className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <label>Sound Notifications</label>
                <input type="checkbox" defaultChecked className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
