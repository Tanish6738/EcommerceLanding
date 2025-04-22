import React from 'react';
import { motion } from 'framer-motion';

const products = [
  {
    name: 'Eco Tote Bag',
    price: '$24.99',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Minimalist Watch',
    price: '$89.00',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Ceramic Mug',
    price: '$16.50',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Wireless Earbuds',
    price: '$59.99',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Scented Candle',
    price: '$12.00',
    image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Leather Wallet',
    price: '$39.95',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
  },
];

const cardVariants = {
  offscreen: { opacity: 0, y: 40 },
  onscreen: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.7, ease: 'easeOut' } })
};

const FeaturedProducts: React.FC = () => (
  <section className="py-20 bg-gradient-to-b from-[#f2e9e1] to-[#f8fafc]" id="products">
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12"
    >
      <h2 className="text-4xl font-serif font-bold mb-12 text-center text-gray-900 tracking-tight">Featured Looks</h2>
      <div className="overflow-x-auto">
        <div className="flex flex-col sm:flex-row gap-10 md:gap-12 snap-x snap-mandatory pb-4">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              className="min-w-[260px] max-w-xs bg-white border border-gray-100 rounded-3xl shadow-xl flex flex-col items-center p-8 snap-center transition-transform hover:-translate-y-2 hover:shadow-2xl duration-200 font-serif"
              custom={i}
              variants={cardVariants}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
            >
              <motion.img
                src={p.image}
                alt={p.name}
                className="w-40 h-40 object-cover rounded-2xl mb-6 shadow-md"
                loading="lazy"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
              />
              <h3 className="font-semibold text-xl mb-1 text-center text-gray-900 font-serif">{p.name}</h3>
              <p className="text-gray-700 font-bold mb-3 font-sans">{p.price}</p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="mt-auto px-6 py-2 rounded-full bg-gray-900 text-white font-medium shadow hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 font-sans"
                aria-label={`View ${p.name} in App`}
              >
                View in App
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  </section>
);

export default FeaturedProducts;
