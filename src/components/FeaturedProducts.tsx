import React, { memo, useState, useRef, useEffect } from 'react';
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

const FeaturedProducts: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile and handle resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Handle scroll pagination indicators
  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.scrollWidth / products.length;
      container.scrollTo({ left: itemWidth * index, behavior: 'smooth' });
      setCurrentIndex(index);
    }
  };
  
  // Handle auto-detection of current item
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollPosition = container.scrollLeft;
      const itemWidth = container.scrollWidth / products.length;
      const newIndex = Math.round(scrollPosition / itemWidth);
      
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-[#f2e9e1] to-[#f8fafc]" id="products">
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12"
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 md:mb-12 text-center text-gray-900 tracking-tight">
          Featured Looks
        </h2>
        
        <div className="relative">
          {/* Product carousel */}
          <div 
            className="overflow-x-auto scrollbar-hide pb-6 md:pb-8"
            ref={scrollContainerRef}
            onScroll={handleScroll}
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          >
            <div className="flex gap-6 md:gap-10 lg:gap-12 pb-4">
              {products.map((p, i) => (
                <motion.div
                  key={p.name}
                  className="min-w-[220px] sm:min-w-[260px] max-w-xs flex-shrink-0 bg-white border border-gray-100 rounded-2xl md:rounded-3xl shadow-md hover:shadow-xl flex flex-col items-center p-5 sm:p-8 snap-center transition-transform duration-200 font-serif"
                  custom={i}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
                >
                  <motion.img
                    src={p.image}
                    alt={p.name}
                    className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl md:rounded-2xl mb-4 sm:mb-6 shadow-sm"
                    loading="lazy"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
                  />
                  <h3 className="font-semibold text-base sm:text-xl mb-1 text-center text-gray-900 font-serif">{p.name}</h3>
                  <p className="text-gray-700 font-bold mb-3 font-sans text-sm sm:text-base">{p.price}</p>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-auto px-4 sm:px-6 py-2 rounded-full bg-gray-900 text-white text-sm sm:text-base font-medium shadow hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 font-sans"
                    aria-label={`View ${p.name} in App`}
                  >
                    View in App
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Mobile scroll indicators */}
          {isMobile && (
            <div className="flex justify-center gap-2 mt-4">
              {products.map((_, i) => (
                <button
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${i === currentIndex ? 'bg-gray-800' : 'bg-gray-300'}`}
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to product ${i + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* Scroll hint - only on mobile */}
          {isMobile && currentIndex === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 1, duration: 2, repeat: 2, repeatType: 'reverse' }}
              className="absolute right-2 top-1/3 bg-white bg-opacity-70 p-2 rounded-full shadow-md"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          )}
        </div>
        
        {/* Desktop view more button */}
        <div className="mt-10 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-transparent border-2 border-gray-900 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition-colors duration-300"
          >
            View All Products
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default memo(FeaturedProducts);
