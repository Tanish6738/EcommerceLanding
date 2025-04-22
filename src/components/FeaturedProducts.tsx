import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

// Product data
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

// Simplified animation variants with better performance
const cardVariants = {
  offscreen: { opacity: 0 },
  onscreen: { opacity: 1, transition: { duration: 0.5 } }
};

// Individual product card component to reduce re-renders
const ProductCard = memo(({ product, index, isMobile }: { 
  product: typeof products[0], 
  index: number,
  isMobile: boolean
}) => {
  return (
    <motion.div
      key={product.name}
      className="min-w-[220px] sm:min-w-[260px] max-w-xs flex-shrink-0 bg-white border border-gray-100 rounded-2xl md:rounded-3xl shadow-md hover:shadow-xl flex flex-col items-center p-5 sm:p-8 snap-center font-serif"
      variants={cardVariants}
      // Only enable hover animations on desktop
      {...(!isMobile && { whileHover: { scale: 1.02 } })}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl md:rounded-2xl mb-4 sm:mb-6 shadow-sm"
        loading="lazy"
      />
      <h3 className="font-semibold text-base sm:text-xl mb-1 text-center text-gray-900 font-serif">{product.name}</h3>
      <p className="text-gray-700 font-bold mb-3 font-sans text-sm sm:text-base">{product.price}</p>
      <motion.button
        whileTap={{ scale: 0.97 }}
        className="mt-auto px-4 sm:px-6 py-2 rounded-full bg-gray-900 text-white text-sm sm:text-base font-medium shadow hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 font-sans"
        aria-label={`View ${product.name} in App`}
      >
        View in App
      </motion.button>
    </motion.div>
  );
});

const FeaturedProducts: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  
  // Optimized mobile detection with performance check
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      
      // Detect low performance devices
      const lowPerformance = mobile && 
        (navigator.hardwareConcurrency <= 4 || 
         /Android [456]|iPhone OS ([789]|1[0-2])_/.test(navigator.userAgent));
      
      setIsLowPerformance(lowPerformance);
    };
    
    checkDevice();
    
    // Throttle resize event for better performance
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(checkDevice, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    // Use requestAnimationFrame for better scroll performance
    requestAnimationFrame(() => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const scrollPosition = container.scrollLeft;
      const itemWidth = container.scrollWidth / products.length;
      const newIndex = Math.round(scrollPosition / itemWidth);
      
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < products.length) {
        setCurrentIndex(newIndex);
      }
    });
  }, [currentIndex]);
  
  // Navigate to specific index
  const scrollToIndex = useCallback((index: number) => {
    if (scrollContainerRef.current && index >= 0 && index < products.length) {
      const container = scrollContainerRef.current;
      const itemWidth = container.scrollWidth / products.length;
      container.scrollTo({ left: itemWidth * index, behavior: 'smooth' });
      setCurrentIndex(index);
    }
  }, []);

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-[#f2e9e1] to-[#f8fafc]" id="products">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 md:mb-12 text-center text-gray-900 tracking-tight">
          Featured Looks
        </h2>
        
        <div className="relative">
          {/* Product carousel - simplified for performance */}
          <div 
            className="overflow-x-auto pb-6 md:pb-8"
            ref={scrollContainerRef}
            onScroll={handleScroll}
            style={{ 
              scrollSnapType: 'x mandatory', 
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <div className="flex gap-6 md:gap-10 lg:gap-12 pb-4">
              {products.map((product, i) => (
                <ProductCard 
                  key={product.name}
                  product={product} 
                  index={i}
                  isMobile={isMobile || isLowPerformance}
                />
              ))}
            </div>
          </div>
          
          {/* Mobile scroll indicators - simplified */}
          {isMobile && !isLowPerformance && (
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
          
          {/* Scroll hint - only on mobile and first load */}
          {isMobile && currentIndex === 0 && !isLowPerformance && (
            <div className="absolute right-2 top-1/3 bg-white bg-opacity-70 p-2 rounded-full shadow-md animate-pulse">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Button - simplified animation */}
        <div className="mt-10 text-center">
          <button
            className="inline-flex items-center px-6 py-3 rounded-full bg-transparent border-2 border-gray-900 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 active:scale-95"
          >
            View All Products
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default memo(FeaturedProducts);
