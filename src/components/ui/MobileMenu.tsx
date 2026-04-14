import { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  isPrewarmed?: boolean;
  onClose: () => void;
  navLinks: Array<{ label: string; id: string }>;
  onNavigate: (id: string) => void;
}

export default function MobileMenu({ isOpen, isPrewarmed: isPrewarmingPhase = false, onClose, navLinks: _navLinks, onNavigate: _onNavigate }: MobileMenuProps) {
  useEffect(() => {
    const root = document.getElementById('root');
    if (isOpen) {
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
      root?.classList.add('menu-open-freeze');
    } else {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
      root?.classList.remove('menu-open-freeze');
    }
    return () => {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
      root?.classList.remove('menu-open-freeze');
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const prevent = (e: Event) => e.preventDefault();
    window.addEventListener('wheel', prevent, { passive: false });
    window.addEventListener('touchmove', prevent, { passive: false });
    return () => {
      window.removeEventListener('wheel', prevent);
      window.removeEventListener('touchmove', prevent);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop — proof test: no fade, immediate */}
      {isOpen && (
        <div
          className="fixed top-20 left-0 right-0 bottom-0 bg-black/80 z-[105]"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Outer panel — minimal shell proof test */}
      <div
        className="fixed top-20 bottom-0 right-0 w-full sm:w-80 z-[108] bg-[#0B0B0B]"
        style={{
          transform: isOpen || isPrewarmingPhase ? 'translateX(0) translateZ(0)' : 'translateX(100%) translateZ(0)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          visibility: isOpen || isPrewarmingPhase ? 'visible' : 'hidden',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <p className="text-white p-8">Menu test</p>
      </div>
    </>
  );
}
