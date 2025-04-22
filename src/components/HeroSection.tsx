import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

// Lazy load heavy Three.js components
const ThreeScene = lazy(() => import('../components/ThreeScene'));

const Spinner = () => (
  <div className="flex items-center justify-center w-full h-full">
    <svg className="animate-spin" width="36" height="36" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="none" stroke="#888" strokeWidth="5" strokeDasharray="31.4 31.4" />
    </svg>
  </div>
);

// Static fallback for very low-performance devices
const StaticImage = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <img 
      src="https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?auto=format&fit=crop&w=800&q=80" 
      alt="Luxurious cube display" 
      className="w-40 h-40 object-cover rounded-xl shadow-lg opacity-80"
    />
  </div>
);

const HeroSection: React.FC = () => {
  // States for component
  const [show3D, setShow3D] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  
  // Performance detection
  useEffect(() => {
    // Check device performance and screen size
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Check for low performance devices
      const lowPerformance = mobile && 
        (navigator.hardwareConcurrency <= 4 || 
         /Android [456]|iPhone OS ([789]|1[0-2])_/.test(navigator.userAgent));
      
      setIsLowPerformance(lowPerformance);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    // Delayed loading of 3D scene
    const timer = setTimeout(() => {
      setShow3D(true);
    }, isLowPerformance ? 800 : isMobile ? 400 : 200);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      clearTimeout(timer);
    };
  }, [isMobile, isLowPerformance]);

  return (
    <section className="relative w-full h-[100vh] md:h-[90vh] min-h-[500px] md:min-h-[600px] flex items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#f2e9e1] to-[#e3e6e8] font-serif overflow-hidden">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1500&q=80"
        alt="Fashion background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-70"
        style={{ filter: 'blur(3px)', pointerEvents: 'none' }}
        loading="lazy"
      />
      
      {/* Conditional 3D rendering based on device capability */}
      {!isLowPerformance ? (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {show3D ? (
            <Suspense fallback={<Spinner />}>
              <ThreeScene isMobile={isMobile} />
            </Suspense>
          ) : (
            <Spinner />
          )}
        </div>
      ) : (
        <StaticImage />
      )}
      
      {/* Content with reduced animations for better performance */}
      <div
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full max-w-2xl mx-auto"
        style={{ textShadow: '0 4px 32px rgba(0,0,0,0.45)' }}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl font-serif font-extrabold text-white mb-4 md:mb-6 drop-shadow-xl tracking-tight leading-[1.1]"
        >
          Atelier Luxe
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl xs:text-2xl sm:text-3xl md:text-4xl text-gray-100 mb-8 md:mb-12 max-w-2xl font-light font-sans px-2"
        >
          Timeless Fashion. Modern Craft. Your Signature Style.
        </motion.p>
        <motion.a
          whileTap={{ scale: 0.98 }}
          href="#about"
          className="px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-full bg-white text-gray-900 text-lg sm:text-xl font-semibold shadow-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 tracking-wide font-sans w-[80%] max-w-[300px] md:w-auto"
          aria-label="View Collection"
        >
          View Collection
        </motion.a>
        
        {/* Scroll indicator - simpler animation */}
        {!isLowPerformance && (
          <div
            className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
          >
            <svg width="28" height="28" fill="none" stroke="gray" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
