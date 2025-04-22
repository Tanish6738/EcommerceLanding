import React, { useState, memo, useEffect, useCallback } from 'react';

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
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
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
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
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
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <path d="M8 15c6 0 9-5 9-9v-.5A6.5 6.5 0 0 0 20 4s-1 .5-2 .5A4.5 4.5 0 0 0 4 8.5v.5"/>
      </svg>
    ),
  },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll effect for navbar - optimized with throttling
  useEffect(() => {
    // let lastScrollY = window.scrollY;
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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar - Always visible with good contrast on mobile */}
      <nav className={`fixed top-0 left-0 w-full z-50 ${
        isMobile ? 'bg-white shadow-md' : 
        scrolled ? 'bg-white shadow-md' : 'bg-black/40 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className={`text-xl sm:text-2xl font-bold ${
              (isMobile || scrolled) ? 'text-teal-700' : 'text-white'
            }`}>ShopEase</span>
          </div>
          <div className="hidden md:flex space-x-6">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`font-medium ${
                  scrolled ? 'text-gray-700 hover:text-teal-700' : 'text-white hover:text-teal-100'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="md:hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              className={`focus:outline-none ${
                (isMobile || scrolled) ? 'text-gray-700 hover:text-teal-700' : 'text-white hover:text-teal-100'
              }`}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Mobile menu - animation simplified for performance */}
        <div 
          className={`md:hidden bg-white shadow-lg ${
            menuOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="px-4 py-2">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="block py-3 text-gray-700 hover:text-teal-700 font-medium border-b border-gray-100 last:border-b-0"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 pt-16 pb-16 bg-gray-50">
        {children}
      </main>

      {/* Footer - simplified for better performance */}
      <footer className="bg-white border-t py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-between space-y-6">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-2">
            {footerLinks.map(link => (
              <a key={link.name} href={link.href} className="text-gray-600 hover:text-teal-700 text-sm font-medium">
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex space-x-5">
            {socialIcons.map(icon => (
              <a 
                key={icon.name} 
                href={icon.href} 
                className="text-gray-500 hover:text-teal-700 p-2 rounded-full" 
                aria-label={icon.name}
              >
                {icon.svg}
              </a>
            ))}
          </div>
          <div className="text-center text-gray-500 text-sm mt-4">
            © {new Date().getFullYear()} ShopEase. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default memo(Layout);
