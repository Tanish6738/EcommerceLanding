import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#f2e9e1] to-[#e3e6e8] font-serif">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1500&q=80"
        alt="Fashion editorial background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-70"
        loading="lazy"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-[#e3e6e8]/60 z-10" aria-hidden="true" />
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full max-w-2xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
          className="text-6xl sm:text-7xl md:text-8xl font-serif font-extrabold text-gray-900 mb-6 drop-shadow-xl tracking-tight leading-tight"
        >
          Atelier Luxe
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
          className="text-2xl sm:text-3xl md:text-4xl text-gray-700 mb-12 max-w-2xl font-light font-sans"
        >
          Timeless Fashion. Modern Craft. Your Signature Style.
        </motion.p>
        <motion.a
          whileHover={{ scale: 1.06, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}
          whileTap={{ scale: 0.98 }}
          href="#about"
          className="px-10 py-4 rounded-full bg-gray-900 text-white text-xl font-semibold shadow-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 tracking-wide font-sans"
          aria-label="View Collection"
        >
          View Collection
        </motion.a>
        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, 16, 0] }}
          transition={{ delay: 1.2, duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <svg width="32" height="32" fill="none" stroke="gray" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
