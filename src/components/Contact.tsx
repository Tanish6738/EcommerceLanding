import React, { useState } from 'react';
import { motion } from 'framer-motion';

const inputVariants = {
  focus: { scale: 1.04, boxShadow: '0 0 0 2px #b8a99a' },
  rest: { scale: 1, boxShadow: '0 0 0 0px #b8a99a' },
};

const buttonVariants = {
  hover: { scale: 1.05, backgroundColor: '#3a2c1a', color: '#f5eee6' },
  tap: { scale: 0.97 },
};

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focus, setFocus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFocus = (field: string) => setFocus(field);
  const handleBlur = () => setFocus('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      return;
    }
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    }, 800);
  };

  return (
    <section id="contact" className="py-12 sm:py-20 bg-gradient-to-b from-[#e2d6c6] to-[#f5eee6] font-serif">
      <div className="max-w-lg sm:max-w-2xl mx-auto px-2 xs:px-4 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-xl xs:text-2xl sm:text-3xl script-accent mb-6 sm:mb-8 text-[#3a2c1a] tracking-tight drop-shadow text-center"
        >
          Contact Us
        </motion.h2>
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/90 rounded-2xl sm:rounded-3xl shadow-xl border border-[#e2d6c6] p-5 sm:p-8 flex flex-col gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            onFocus={() => handleFocus('name')}
            onBlur={handleBlur}
            className="px-5 py-4 rounded-full border border-[#e2d6c6] text-lg font-sans focus:outline-none bg-transparent"
            variants={inputVariants}
            animate={focus === 'name' ? 'focus' : 'rest'}
            whileFocus="focus"
          />
          <motion.input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
            className="px-5 py-4 rounded-full border border-[#e2d6c6] text-lg font-sans focus:outline-none bg-transparent"
            variants={inputVariants}
            animate={focus === 'email' ? 'focus' : 'rest'}
            whileFocus="focus"
          />
          <motion.textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            onFocus={() => handleFocus('message')}
            onBlur={handleBlur}
            className="px-5 py-4 rounded-3xl border border-[#e2d6c6] text-lg font-sans focus:outline-none bg-transparent min-h-[120px] resize-none"
            variants={inputVariants}
            animate={focus === 'message' ? 'focus' : 'rest'}
            whileFocus="focus"
          />
          <motion.button
            type="submit"
            className="mt-2 px-8 py-4 rounded-full btn font-semibold text-lg shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#b8a99a] font-serif"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Send Message
          </motion.button>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#3a2c1a] text-center mt-2 font-sans"
            >
              Thank you! We'll get back to you soon.
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 text-center mt-2 font-sans"
            >
              Please fill in all fields.
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
