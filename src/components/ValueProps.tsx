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
  <section className="py-20 bg-gradient-to-b from-[#f8fafc] to-[#f2e9e1]" id="features">
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-6xl mx-auto px-4"
    >
      <div className="flex flex-col md:flex-row gap-10 justify-center items-stretch">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className="flex-1 bg-white border border-gray-100 rounded-3xl shadow-xl p-10 flex flex-col items-center text-center transition-transform hover:-translate-y-2 hover:shadow-2xl duration-200 font-serif"
            custom={i}
            variants={cardVariants}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
          >
            <div className="mb-5 text-gray-900">{f.icon}</div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900 tracking-tight font-serif">{f.title}</h3>
            <p className="text-gray-500 text-lg font-sans">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default memo(ValueProps);
