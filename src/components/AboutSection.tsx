import React, { memo } from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => (
  <section id="about" className="py-24 bg-white font-serif">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4 md:px-8 lg:px-12">
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="flex-1 w-full max-w-md md:max-w-none mb-8 md:mb-0"
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
        className="flex-1 w-full max-w-xl md:max-w-none"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">Our Story</h2>
        <p className="text-xl text-gray-700 mb-6 font-sans">
          Atelier Luxe was born from a passion for timeless design and modern craftsmanship. Each piece in our collection is thoughtfully curated and meticulously crafted, blending classic elegance with contemporary flair.
        </p>
        <p className="text-lg text-gray-500 font-sans">
          We believe fashion is an expression of individuality. Our mission is to empower you to define your own signature style—sustainably, ethically, and beautifully.
        </p>
      </motion.div>
    </div>
  </section>
);

export default memo(AboutSection);
