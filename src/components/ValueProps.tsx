import React, { memo } from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Handpicked Collections',
    desc: 'Only the best, just for you.',
    icon: (
      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="4"/>
        <path d="M8 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    title: 'Fast & Free Shipping',
    desc: 'Delivered to your door, on us.',
    icon: (
      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="7" width="15" height="10" rx="3"/>
        <path d="M17 9h4v6h-4"/>
        <circle cx="7" cy="17" r="2"/>
        <circle cx="17" cy="17" r="2"/>
      </svg>
    ),
  },
  {
    title: 'Sustainable Sourcing',
    desc: 'Ethically made, consciously chosen.',
    icon: (
      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2v6m0 0C7 8 4 12 4 16c0 3 2 6 8 6s8-3 8-6c0-4-3-8-8-8z"/>
      </svg>
    ),
  },
];

const cardVariants = {
  offscreen: { opacity: 0, y: 40 },
  onscreen: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' } })
};

const ValueProps: React.FC = () => (
  <section className="py-12 sm:py-20 bg-gradient-to-b from-[#f5eee6] to-[#e2d6c6]" id="features">
    <motion.div
      className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-8"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex flex-col md:flex-row gap-6 sm:gap-10 justify-center items-stretch">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className="flex-1 bg-white border border-[#e2d6c6] rounded-3xl shadow-xl p-10 flex flex-col items-center text-center transition-transform hover:-translate-y-2 hover:shadow-2xl duration-200 font-serif cursor-pointer"
            custom={i}
            variants={cardVariants}
            whileHover={{ scale: 1.06, rotate: -2 }}
            whileTap={{ scale: 0.98, rotate: 1 }}
          >
            <motion.div
              className="mb-5 text-gray-900"
              whileHover={{ rotate: 8 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >{f.icon}</motion.div>
            <h3 className="text-2xl script-accent mb-2 text-[#3a2c1a] tracking-tight">{f.title}</h3>
            <p className="text-[#7c6a58] text-lg font-sans">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default memo(ValueProps);
