import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[90vh] min-h-[400px] flex items-center justify-center bg-transparent font-serif overflow-hidden border-b border-[#e2d6c6] sm:h-[90vh] sm:min-h-[500px] max-w-full overflow-x-hidden">
      {/* Content styled to match other sections */}
      <div
        className="relative z-20 flex flex-col items-center justify-center text-center box-border px-2 xs:px-4 sm:px-8 max-w-lg sm:max-w-2xl mx-auto bg-white/90 rounded-2xl sm:rounded-3xl shadow-2xl border border-[#e2d6c6] py-7 xs:py-10 sm:py-16 w-full"
        style={{ backdropFilter: 'blur(2px)' }}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl script-accent mb-2 xs:mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] drop-shadow"
        >
          Atelier Luxe
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base xs:text-lg sm:text-2xl md:text-4xl text-[#7c6a58] mb-5 xs:mb-6 sm:mb-8 md:mb-12 max-w-2xl font-light font-sans px-1 xs:px-2"
        >
          Timeless Fashion. Modern Craft. Your Signature Style.
        </motion.p>
        <motion.a
          whileTap={{ scale: 0.98 }}
          href="#about"
          className="px-4 xs:px-6 sm:px-8 md:px-10 py-2 xs:py-3 md:py-4 rounded-full btn text-base xs:text-lg sm:text-xl font-semibold shadow-lg hover:bg-[#3a2c1a] hover:text-[#f5eee6] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#b8a99a] tracking-wide font-serif w-[90%] max-w-[260px] sm:max-w-[300px] md:w-auto"
          aria-label="View Collection"
        >
          View Collection
        </motion.a>
        {/* Scroll indicator */}
        <div
          className="absolute bottom-3 xs:bottom-4 sm:bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <svg width="24" height="24" fill="none" stroke="#b8a99a" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
