import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FaStar, FaCrown, FaGift, FaSparkles } from 'react-icons/fa';
import toast from 'react-hot-toast';

const NitroPage = () => {
  const plans = [
    {
      name: 'Standard',
      price: '$9.99',
      features: [
        'Animated Avatar',
        'Custom Profile Banner',
        '50MB File Upload',
        'Custom Emoji',
        'Exclusive Badge',
      ],
      icon: FaStar,
    },
    {
      name: 'Premium',
      price: '$19.99',
      features: [
        'Everything in Standard',
        'HD Video Calls',
        'Screen Sharing',
        'Custom Profile Theme',
        'Animated Name Effects',
        'Special Profile Effects',
        'Couple Badges',
        '500MB File Upload',
      ],
      icon: FaCrown,
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen bg-darker pt-20 pb-12">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <FaSparkles className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">TwoHearts Nitro</h1>
          <p className="text-xl text-white/70">Unlock premium features for an enhanced experience</p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`card-glass p-8 relative ${
                  plan.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-bl-lg">
                    Popular
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <Icon className="text-2xl text-primary" />
                  <h2 className="text-2xl font-bold">{plan.name}</h2>
                </div>

                <div className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  {plan.price}
                  <span className="text-sm text-white/50">/month</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <FaGift className="text-primary text-sm" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toast.success(`Subscribed to ${plan.name}!`)}
                  className={`w-full py-3 rounded-lg font-medium transition-all ${
                    plan.popular ? 'btn-primary' : 'btn-ghost'
                  }`}
                >
                  Subscribe
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="card-glass p-8"
        >
          <h3 className="text-2xl font-bold mb-8">Premium Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Animated Avatars',
                desc: 'Show your personality with animated profile pictures',
              },
              {
                title: 'Custom Themes',
                desc: 'Personalize your profile with exclusive themes',
              },
              {
                title: 'HD Calls',
                desc: 'Crystal clear video and voice calls',
              },
              {
                title: 'Screen Sharing',
                desc: 'Share your screen during calls',
              },
              {
                title: 'Special Effects',
                desc: 'Add magical effects to your profile',
              },
              {
                title: 'Exclusive Badges',
                desc: 'Unlock rare and exclusive badges',
              },
            ].map((feature, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <h4 className="font-bold mb-2">{feature.title}</h4>
                <p className="text-sm text-white/50">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NitroPage;
