import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';

const EmailSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }
    try {
      // Simulate POST
      await new Promise(res => setTimeout(res, 800));
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-[#f5eee6] to-[#e2d6c6] font-serif" id="signup">
      <motion.div
        className="max-w-lg sm:max-w-2xl mx-auto px-2 xs:px-4 sm:px-8 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h2 className="text-xl xs:text-2xl sm:text-3xl script-accent mb-6 sm:mb-8 text-[#3a2c1a] tracking-tight drop-shadow">Join our VIP list for early access & 10% off</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center items-center">
          <motion.input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 px-5 py-4 rounded-full border border-[#e2d6c6] focus:ring-2 focus:ring-[#b8a99a] focus:outline-none text-lg shadow font-sans"
            placeholder="Enter your email"
            required
            aria-label="Email address"
            whileFocus={{ scale: 1.03 }}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-full btn font-semibold text-lg shadow-lg hover:bg-[#3a2c1a] hover:text-[#f5eee6] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#b8a99a] font-serif"
            aria-label="Subscribe"
          >
            Subscribe
          </motion.button>
        </form>
        {status !== 'idle' && (
          <div className={`mt-4 text-base ${status === 'success' ? 'text-[#3a2c1a]' : 'text-red-600'} font-sans`}>{message}</div>
        )}
      </motion.div>
    </section>
  );
};

export default memo(EmailSignup);
