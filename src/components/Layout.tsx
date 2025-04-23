import React, { useState, memo, useEffect, useCallback } from 'react';
import Contact from './Contact';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'Features', href: '#features' },
  { name: 'Products', href: '#products' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

const footerLinks = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms', href: '#' },
  { name: 'Support', href: '#' },
];

const socialIcons = [
  {
    name: 'Instagram',
    href: '#',
    svg: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="5"/>
        <circle cx="18" cy="6" r="1.5"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    svg: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <path d="M16 8h-2a2 2 0 0 0-2 2v2h4"/>
        <path d="M12 16v-4"/>
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: '#',
    svg: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <path d="M8 15c6 0 9-5 9-9v-.5A6.5 6.5 0 0 0 20 4s-1 .5-2 .5A4.5 4.5 0 0 0 4 8.5v.5"/>
      </svg>
    ),
  },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar - optimized with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 10;
          if (isScrolled !== scrolled) {
            setScrolled(isScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when clicking outside
  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (menuOpen && !target.closest('nav')) {
      setMenuOpen(false);
    }
  }, [menuOpen]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  // Animate elements when they enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-animate').forEach(el => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.section-animate').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Luxury Navbar */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white shadow-lg backdrop-blur-md' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <span className="script-accent text-2xl sm:text-3xl tracking-widest">ShopEase</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-sm font-medium tracking-wider uppercase hover:text-[var(--color-accent)] transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Button - visible on desktop only */}
            <div className="hidden md:block">
              <a 
                href="#contact" 
                className="btn px-6 py-2 text-xs"
              >
                Shop Now
              </a>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={e => {
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
                className="flex items-center p-2 rounded-md focus:outline-none"
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out ${
            menuOpen 
              ? 'max-h-80 opacity-100 border-b border-gray-100' 
              : 'max-h-0 opacity-0 pointer-events-none overflow-hidden'
          }`}
        >
          <div className="px-4 py-3 space-y-2 bg-white/95 backdrop-blur-md">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-sm font-medium tracking-wider uppercase hover:text-[var(--color-accent)] transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <a 
                href="#contact" 
                className="btn block text-center w-full py-2 text-xs"
                onClick={() => setMenuOpen(false)}
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 pt-20">
        {children}
        <Contact />
      </main>

      {/* Luxury Footer */}
      <footer className="bg-[var(--color-primary)] text-white py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <span className="script-accent text-xl tracking-widest">ShopEase</span>
              <p className="text-gray-300 text-sm max-w-xs mt-2">
                Elevating the online shopping experience with elegance, quality, and exceptional service.
              </p>
              {/* Social Icons */}
              <div className="flex space-x-5 pt-4">
                {socialIcons.map(icon => (
                  <a 
                    key={icon.name} 
                    href={icon.href} 
                    className="text-gray-300 hover:text-[var(--color-accent)] transition-colors duration-200" 
                    aria-label={icon.name}
                  >
                    {icon.svg}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-medium tracking-wide mb-4 text-[var(--color-accent)]">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map(link => (
                  <a 
                    key={link.name}
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm tracking-wide transition-colors duration-200 py-1"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Legal Links */}
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-medium tracking-wide mb-4 text-[var(--color-accent)]">Legal</h4>
              <div className="space-y-2">
                {footerLinks.map(link => (
                  <a 
                    key={link.name}
                    href={link.href}
                    className="block text-gray-300 hover:text-white text-sm tracking-wide transition-colors duration-200 py-1"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              
              <div className="pt-4 mt-4 border-t border-gray-700">
                <p className="text-gray-400 text-xs">
                  © {new Date().getFullYear()} ShopEase. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default memo(Layout);
