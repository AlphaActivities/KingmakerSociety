import { useState, useEffect, useRef } from 'react';
import Button from './ui/Button';
import HamburgerIcon from './ui/HamburgerIcon';
import MobileMenu from './ui/MobileMenu';
import { luxuryScrollToSection, scrollToApplication } from '../utils/luxuryScroll';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuPrewarmed, setIsMenuPrewarmed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isMobileMenuOpenRef = useRef(false);

  useEffect(() => {
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let startTimer: ReturnType<typeof setTimeout>;
    let endTimer: ReturnType<typeof setTimeout>;
    startTimer = setTimeout(() => {
      setIsMenuPrewarmed(true);
      endTimer = setTimeout(() => setIsMenuPrewarmed(false), 180);
    }, 300);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer!);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpenRef.current) return;

      setIsScrolled(window.scrollY > 50);

      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    luxuryScrollToSection(id, 80);
  };

  const handleNavigate = (id: string) => {
    luxuryScrollToSection(id, 80);
    setIsMobileMenuOpen(false);
  };

  const handleMobileCtaClick = () => {
    scrollToApplication();
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'who-this-is-for' },
    { label: 'Schedule', id: 'schedule' },
    { label: 'Mentors', id: 'mentors' },
    { label: 'Pricing', id: 'pricing' },
  ];

  return (
    <>
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-[100] transition-[background-color,border-color,box-shadow] duration-300 ease-out ${
        isScrolled
          ? 'bg-[#0B0B0B]/98 backdrop-blur-xl shadow-2xl shadow-black/60 border-b border-[#FFC300]/20'
          : 'bg-[#0B0B0B]/30 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#D11F2A] via-[#FFC300] to-[#D11F2A] transition-all duration-300 shadow-[0_0_10px_rgba(255,195,0,0.5)]"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => scrollToSection('hero')}
            aria-label="Go to homepage"
          >
            <img
              src="/images/logos/logo.PNG"
              alt="Kingmaker Society Logo"
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,195,0,0.4)]"
              aria-hidden="true"
            />
            <span className="text-xl font-bold text-white transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(255,195,0,0.3)]">
              Kingmaker <span className="text-[#FFC300]">Society</span>
            </span>
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-white hover:text-[#FFC300] transition-all duration-300 font-medium relative group"
              aria-label="Navigate to Home"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFC300] group-hover:w-full transition-all duration-300" aria-hidden="true"></span>
            </button>
            <button
              onClick={() => scrollToSection('who-this-is-for')}
              className="text-white hover:text-[#FFC300] transition-all duration-300 font-medium relative group"
              aria-label="Navigate to About"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFC300] group-hover:w-full transition-all duration-300" aria-hidden="true"></span>
            </button>
            <button
              onClick={() => scrollToSection('schedule')}
              className="text-white hover:text-[#FFC300] transition-all duration-300 font-medium relative group"
              aria-label="Navigate to Schedule"
            >
              Schedule
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFC300] group-hover:w-full transition-all duration-300" aria-hidden="true"></span>
            </button>
            <button
              onClick={() => scrollToSection('mentors')}
              className="text-white hover:text-[#FFC300] transition-all duration-300 font-medium relative group"
              aria-label="Navigate to Mentors"
            >
              Mentors
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFC300] group-hover:w-full transition-all duration-300" aria-hidden="true"></span>
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-white hover:text-[#FFC300] transition-all duration-300 font-medium relative group"
              aria-label="Navigate to Pricing"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFC300] group-hover:w-full transition-all duration-300" aria-hidden="true"></span>
            </button>
            <Button
              variant="secondary"
              size="sm"
              onClick={scrollToApplication}
            >
              Start Application
            </Button>
          </div>

          <div className={isMobileMenuOpen ? 'opacity-0 pointer-events-none' : ''} aria-hidden={isMobileMenuOpen}>
            <HamburgerIcon
              isOpen={false}
              onClick={() => setIsMobileMenuOpen(true)}
            />
          </div>
        </div>
      </div>
    </nav>

    {isMobileMenuOpen && (
      <div
        className="fixed top-0 right-0 z-[200] flex items-start justify-end"
        style={{ paddingTop: '20px', paddingRight: '16px' }}
      >
        <HamburgerIcon
          isOpen={true}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      </div>
    )}

    <MobileMenu
      isOpen={isMobileMenuOpen}
      isPrewarmed={isMenuPrewarmed}
      onClose={() => setIsMobileMenuOpen(false)}
      onCtaClick={handleMobileCtaClick}
      navLinks={navLinks}
      onNavigate={handleNavigate}
    />
    </>
  );
}
