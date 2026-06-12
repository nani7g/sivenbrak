
import React, { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Clients', href: '#testimonials' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group" onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          <img
            src="/assets/sivenbrak-logo.png"
            alt="Sivenbrak Technologies"
            className="h-12 w-auto max-w-[210px] object-contain transition-transform group-hover:scale-[1.02]"
          />
        </a>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-slate-600 hover:text-rose-600 transition-colors flex items-center gap-1.5"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={(e) => scrollToSection(e, '#contact')}
            className="bg-rose-600 text-white px-6 py-2.5 rounded-full hover:bg-rose-700 transition-all shadow-md shadow-rose-200 active:scale-95"
          >
            Contact
          </a>
        </div>

        <button 
          className="md:hidden text-slate-600 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-xl transition-all duration-300 origin-top ${
        isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
      }`}>
        <div className="p-6 space-y-4 flex flex-col items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-slate-600 hover:text-rose-600 font-bold py-2 w-full text-center text-lg"
              onClick={(e) => scrollToSection(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="w-full bg-rose-600 text-white text-center py-4 rounded-xl font-bold text-lg"
            onClick={(e) => scrollToSection(e, '#contact')}
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
