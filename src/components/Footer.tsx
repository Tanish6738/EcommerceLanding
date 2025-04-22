import React from 'react';

const footerLinks = [
  { name: 'About', href: '#' },
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

const Footer: React.FC = () => (
  <footer className="bg-[#006D5B] text-white py-8 mt-auto border-t border-[#004d3a]">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 mb-2 md:mb-0">
        {footerLinks.map(link => (
          <a
            key={link.name}
            href={link.href}
            className="text-white hover:text-yellow-400 text-sm font-medium transition-colors duration-200 underline-offset-4 hover:underline"
          >
            {link.name}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-4">
        {socialIcons.map(icon => (
          <a
            key={icon.name}
            href={icon.href}
            className="text-white hover:text-yellow-400 transition-colors duration-200"
            aria-label={icon.name}
          >
            {icon.svg}
          </a>
        ))}
      </div>
    </div>
    <div className="mt-4 text-center text-xs text-white/70">© {new Date().getFullYear()} ShopEase. All rights reserved.</div>
  </footer>
);

export default Footer;
