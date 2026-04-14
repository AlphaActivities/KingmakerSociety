import { useEffect } from 'react';

interface NavLink {
  label: string;
  id: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  isPrewarmed?: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  onNavigate: (id: string) => void;
}

export default function MobileMenu({
  isOpen,
  isPrewarmed: isPrewarmingPhase = false,
  onClose,
  navLinks,
  onNavigate,
}: MobileMenuProps) {
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

  const handleNavClick = (id: string) => {
    onNavigate(id);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-20 left-0 right-0 bottom-0 bg-black/80 z-[105]"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

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
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            <div className="px-6 pt-8 pb-6">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FFC300]/60 mb-6">
                Navigation
              </p>

              <nav aria-label="Mobile navigation links">
                <ul className="space-y-1">
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <button
                        onClick={() => handleNavClick(link.id)}
                        className="w-full text-left px-4 py-4 text-white hover:text-[#FFC300] font-medium text-lg tracking-wide transition-colors duration-150 border-b border-white/5 last:border-b-0"
                        aria-label={`Navigate to ${link.label}`}
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <div className="px-6 py-6 border-t border-white/10">
            <div className="text-center">
              <p className="text-xs text-white/30 tracking-widest uppercase">
                Kingmaker Society
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
