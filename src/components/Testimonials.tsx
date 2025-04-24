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
    <section className="relative py-12 sm:py-20 bg-gradient-to-b from-[#f5eee6] to-[#e2d6c6] font-serif" id="testimonials">
      {/* Decorative background accent */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-40 bg-gradient-to-r from-[#e6b65522] via-[#fff0] to-[#e6b65522] rounded-b-3xl blur-2xl opacity-60" />
      </div>
      <motion.div className="relative max-w-5xl mx-auto px-4 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl md:text-5xl script-accent mb-10 text-center text-[#3a2c1a] tracking-tight drop-shadow-lg"
        >
          What Our Customers Say
        </motion.h2>
        {/* Desktop view - show all testimonials */}
        <div className="hidden md:flex gap-8 justify-center items-stretch mb-14">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="flex-1 bg-white border border-[#e2d6c6] rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center transition-transform hover:-translate-y-2 hover:shadow-2xl duration-200 font-serif cursor-pointer group"
              custom={i}
              variants={cardVariants}
              whileHover={{ scale: 1.06, rotate: 1 }}
              whileTap={{ scale: 0.98, rotate: -1 }}
            >
              <motion.img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full mb-5 object-cover shadow-lg border-4 border-[#f5eee6] group-hover:border-[#e6b655] transition-all duration-300" loading="lazy" whileHover={{ rotate: 8 }} transition={{ type: 'spring', stiffness: 200 }} />
              <h3 className="script-accent mb-1 text-[#3a2c1a] text-xl font-semibold">{t.name}</h3>
              <div className="flex mb-2" aria-label="5 star rating">{Array(5).fill(0).map((_, i) => <Star key={i} />)}</div>
              <p className="text-[#7c6a58] text-lg font-sans italic leading-relaxed">“{t.quote}”</p>
            </motion.div>
          ))}
        </div>
        {/* Mobile view - carousel style */}
        <div className="md:hidden relative mb-10">
          <div className="overflow-hidden rounded-2xl shadow-xl border border-[#e2d6c6] bg-white/90">
            <div 
              className="flex transition-transform duration-500 ease-in-out w-full"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((t) => (
                <motion.div 
                  key={t.name}
                  className="w-full flex-shrink-0 p-7 flex flex-col items-center text-center cursor-pointer min-w-0"
                  whileHover={{ scale: 1.04, rotate: 1 }}
                  whileTap={{ scale: 0.97, rotate: -1 }}
                >
                  <div className="w-20 h-20 flex items-center justify-center mb-4">
                    <motion.img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full object-cover shadow-lg border-4 border-[#f5eee6]" loading="lazy" style={{display:'block',maxWidth:'100%',height:'auto'}} whileHover={{ rotate: 8 }} transition={{ type: 'spring', stiffness: 200 }} />
                  </div>
                  <h3 className="script-accent mb-1 text-[#3a2c1a] text-lg font-semibold">{t.name}</h3>
                  <div className="flex mb-2" aria-label="5 star rating">{Array(5).fill(0).map((_, i) => <Star key={i} />)}</div>
                  <p className="text-[#7c6a58] text-base font-sans italic leading-relaxed">“{t.quote}”</p>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Mobile navigation dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full border-2 border-[#e6b655] transition-all duration-200 ${i === activeIndex ? 'bg-[#e6b655] scale-110 shadow' : 'bg-white'}`}
                onClick={() => goToTestimonial(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
        {/* Media logos */}
        <div className="text-center mt-8">
          <div className="mb-3 text-[#b8a99a] text-sm md:text-base font-sans tracking-wide uppercase">As seen in</div>
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
