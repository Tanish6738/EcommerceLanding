import React, { useState } from 'react';
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
    <section className="py-20 bg-gradient-to-b from-[#f8fafc] to-[#f2e9e1] font-serif" id="signup">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-xl mx-auto px-4 md:px-8 lg:px-12 text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-8 text-gray-900 tracking-tight">Join our VIP list for early access & 10% off</h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 px-5 py-4 rounded-full border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none text-lg shadow font-sans"
            placeholder="Enter your email"
            required
            aria-label="Email address"
            whileFocus={{ scale: 1.03 }}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-full bg-gray-900 text-white font-semibold text-lg shadow-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 font-sans"
            aria-label="Subscribe"
          >
            Subscribe
          </motion.button>
        </form>
        {status !== 'idle' && (
          <div className={`mt-4 text-base ${status === 'success' ? 'text-gray-900' : 'text-red-600'} font-sans`}>{message}</div>
        )}
      </motion.div>
    </section>
  );
};

export default EmailSignup;
