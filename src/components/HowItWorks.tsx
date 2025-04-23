import React, { memo } from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Browse collections',
    desc: 'Explore curated products tailored for you.',
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="6" width="16" height="12" rx="3"/>
        <path d="M8 10h8M8 14h5"/>
      </svg>
    ),
  },
  {
    title: 'Tap to buy',
    desc: 'Seamless checkout in just a tap.',
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8"/>
        <path d="M12 8v4l2 2"/>
      </svg>
    ),
  },
  {
    title: 'Track & enjoy',
    desc: 'Follow your order and enjoy fast delivery.',
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="7" width="18" height="10" rx="4"/>
        <path d="M7 17v2M17 17v2"/>
      </svg>
    ),
  },
];

const cardVariants = {
  offscreen: { opacity: 0, y: 40 },
  onscreen: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.18, duration: 0.7, ease: 'easeOut' } })
};

const HowItWorks: React.FC = () => (
  <section className="py-20 bg-gradient-to-b from-[#e2d6c6] to-[#f5eee6] font-serif" id="how-it-works">
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-4xl script-accent mb-12 text-center text-[#3a2c1a] tracking-tight drop-shadow"
      >How It Works</motion.h2>
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-10 relative">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            className="flex-1 flex flex-col items-center text-center bg-white border border-[#e2d6c6] rounded-3xl shadow-xl p-10 relative z-10 transition-transform hover:-translate-y-2 hover:shadow-2xl duration-200 font-serif cursor-pointer"
            custom={i}
            variants={cardVariants}
            whileHover={{ scale: 1.06, rotate: 1 }}
            whileTap={{ scale: 0.98, rotate: -1 }}
          >
            <motion.div
              className="mb-5 text-gray-900"
              whileHover={{ rotate: 10 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >{step.icon}</motion.div>
            <h3 className="script-accent mb-2 text-[#3a2c1a] tracking-tight">{step.title}</h3>
            <p className="text-[#7c6a58] text-lg font-sans">{step.desc}</p>
          </motion.div>
        ))}
        {/* Connecting lines/arrows */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 z-0" style={{transform: 'translateY(-50%)'}} />
        <div className="md:hidden flex flex-col items-center absolute left-1/2 top-0 h-full w-0.5 bg-gray-200 z-0" style={{transform: 'translateX(-50%)'}} />
      </div>
    </motion.div>
  </section>
);

export default memo(HowItWorks);
