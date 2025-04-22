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
  <section className="py-20 bg-gradient-to-b from-[#f8fafc] to-[#f2e9e1] font-serif" id="how-it-works">
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12"
    >
      <h2 className="text-4xl font-serif font-bold mb-12 text-center text-gray-900 tracking-tight">How It Works</h2>
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-10 relative">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            className="flex-1 flex flex-col items-center text-center bg-white border border-gray-100 rounded-3xl shadow-xl p-10 relative z-10 transition-transform hover:-translate-y-2 hover:shadow-2xl duration-200 font-serif"
            custom={i}
            variants={cardVariants}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
          >
            <div className="mb-5 text-gray-900">{step.icon}</div>
            <h3 className="font-semibold text-2xl mb-2 text-gray-900 tracking-tight font-serif">{step.title}</h3>
            <p className="text-gray-500 text-lg font-sans">{step.desc}</p>
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
