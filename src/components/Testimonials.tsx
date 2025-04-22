import React, { memo, useState, useEffect } from 'react';
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

// Reduced logos for mobile performance
const mediaLogos = [
  'https://upload.wikimedia.org/wikipedia/commons/0/0e/Vogue_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/2e/Elle_Magazine_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/4/4e/Harper%27s_Bazaar_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/6/62/Forbes_logo.svg', 
  'https://upload.wikimedia.org/wikipedia/commons/0/08/TechCrunch_logo.svg',
];

const Star = () => (
  <svg width="16" height="16" className="sm:w-5 sm:h-5" fill="#F2C14E" viewBox="0 0 20 20" aria-hidden="true"><polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,19.02 10,15.27 4.18,19.02 6,12.14 0.49,7.64 7.41,7.36"/></svg>
);

const cardVariants = {
  offscreen: { opacity: 0, y: 40 },
  onscreen: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.18, duration: 0.7, ease: 'easeOut' } })
};

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Auto rotate testimonials on mobile
    let interval: number | null = null;
    if (isMobile) {
      interval = window.setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (interval) clearInterval(interval);
    };
  }, [isMobile]);
  
  // Handle manual navigation
  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-[#f2e9e1] to-[#f8fafc] font-serif" id="testimonials">
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12"
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 md:mb-12 text-center text-gray-900 tracking-tight">What Our Customers Say</h2>
        
        {/* Desktop view - show all testimonials */}
        <div className="hidden md:flex flex-row gap-10 justify-center items-stretch mb-12">
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
              <p className="text-gray-500 text-lg font-sans">"{t.quote}"</p>
            </motion.div>
          ))}
        </div>
        
        {/* Mobile view - carousel style */}
        <div className="md:hidden relative mb-8">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div 
                  key={t.name}
                  className="w-full flex-shrink-0 bg-white border border-gray-100 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center"
                >
                  <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mb-4 object-cover shadow" loading="lazy" />
                  <h3 className="font-semibold text-lg mb-1 text-gray-900 font-serif">{t.name}</h3>
                  <div className="flex mb-2" aria-label="5 star rating">{Array(5).fill(0).map((_, i) => <Star key={i} />)}</div>
                  <p className="text-gray-500 text-base font-sans">"{t.quote}"</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile navigation dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${i === activeIndex ? 'bg-gray-800' : 'bg-gray-300'}`}
                onClick={() => goToTestimonial(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="mb-3 text-gray-500 text-sm md:text-base font-sans">As seen in</div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-center">
            {mediaLogos.map((logo, i) => (
              <motion.img
                key={i}
                src={logo}
                alt="Media logo"
                className="h-6 md:h-10 w-auto grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                loading="lazy"
                initial={{ opacity: 0.5 }}
                whileInView={{ opacity: 0.7 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default memo(Testimonials);
