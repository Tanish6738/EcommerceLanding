import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Ava Martinez',
    quote: 'ShopEase made finding unique gifts so easy! The app is a game changer.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Liam Chen',
    quote: 'Fast shipping and beautiful products. Highly recommend!',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Sofia Rossi',
    quote: 'Love the sustainable options. I feel good about my purchases.',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

const mediaLogos = [
  'https://upload.wikimedia.org/wikipedia/commons/4/44/Google_News_icon.svg',
  'https://upload.wikimedia.org/wikipedia/commons/0/08/TechCrunch_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/6/62/Forbes_logo.svg',
];

const Star = () => (
  <svg width="20" height="20" fill="#F2C14E" viewBox="0 0 20 20" aria-hidden="true"><polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,19.02 10,15.27 4.18,19.02 6,12.14 0.49,7.64 7.41,7.36"/></svg>
);

const cardVariants = {
  offscreen: { opacity: 0, y: 40 },
  onscreen: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.18, duration: 0.7, ease: 'easeOut' } })
};

const Testimonials: React.FC = () => (
  <section className="py-20 bg-gradient-to-b from-[#f2e9e1] to-[#f8fafc] font-serif" id="testimonials">
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12"
    >
      <h2 className="text-4xl font-serif font-bold mb-12 text-center text-gray-900 tracking-tight">What Our Customers Say</h2>
      <div className="flex flex-col md:flex-row gap-10 justify-center items-stretch mb-12">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            className="flex-1 bg-white border border-gray-100 rounded-3xl shadow-xl p-10 flex flex-col items-center text-center transition-transform hover:-translate-y-2 hover:shadow-2xl duration-200 font-serif"
            custom={i}
            variants={cardVariants}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
          >
            <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full mb-5 object-cover shadow" loading="lazy" />
            <h3 className="font-semibold text-xl mb-1 text-gray-900 font-serif">{t.name}</h3>
            <div className="flex mb-2" aria-label="5 star rating">{Array(5).fill(0).map((_, i) => <Star key={i} />)}</div>
            <p className="text-gray-500 text-lg font-sans">“{t.quote}”</p>
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        <div className="mb-2 text-gray-500 text-base font-sans">As seen in</div>
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {mediaLogos.map((logo, i) => (
            <motion.img
              key={i}
              src={logo}
              alt="Media logo"
              className="h-10 w-auto grayscale opacity-70"
              loading="lazy"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 + i * 0.1, ease: 'easeOut' }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  </section>
);

export default Testimonials;
