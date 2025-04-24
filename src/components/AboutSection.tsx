import React, { memo } from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => (
  <section id="about" className="py-16 sm:py-24 bg-[#f5eee6] font-serif">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 sm:gap-12 px-2 xs:px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="flex-1 w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-none mb-6 sm:mb-8 md:mb-0"
      >
        <img
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
          alt="Designer at work"
          className="rounded-3xl shadow-2xl w-full object-cover"
          loading="lazy"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        className="flex-1 w-full max-w-lg md:max-w-none"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-4xl md:text-5xl script-accent mb-6 text-[#3a2c1a] tracking-tight drop-shadow"
        >Our Story</motion.h2>
        <motion.p
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="text-xl text-[#7c6a58] mb-6 font-sans"
        >Atelier Luxe was born from a passion for timeless design and modern craftsmanship. Each piece in our collection is thoughtfully curated and meticulously crafted, blending classic elegance with contemporary flair.</motion.p>
        <motion.p
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          className="text-lg text-[#b8a99a] font-sans"
        >We believe fashion is an expression of individuality. Our mission is to empower you to define your own signature style—sustainably, ethically, and beautifully.</motion.p>
      </motion.div>
    </div>
  </section>
);

export default memo(AboutSection);
