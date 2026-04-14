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
        className="fixed top-20 bottom-0 right-0 w-full sm:w-80 z-[108]"
        style={{
          transform: isOpen || isPrewarmingPhase ? 'translateX(0) translateZ(0)' : 'translateX(100%) translateZ(0)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          visibility: isOpen || isPrewarmingPhase ? 'visible' : 'hidden',
          background: '#0B0B0B',
          borderLeft: '1px solid rgba(209,31,42,0.45)',
          borderTop: '1px solid rgba(209,31,42,0.3)',
          boxShadow: '-4px 0 32px rgba(209,31,42,0.12), -1px 0 0 rgba(255,195,0,0.08)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Left luxury bar + inner glow */}
        <div
          className="absolute top-0 left-0 bottom-0 w-[3px] z-10"
          style={{
            background: 'linear-gradient(to bottom, #D11F2A, #FFC300 50%, #D11F2A)',
            boxShadow: '2px 0 18px rgba(209,31,42,0.5), 4px 0 32px rgba(255,195,0,0.15)',
          }}
          aria-hidden="true"
        />

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            <div className="px-6 pt-8 pb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative inline-flex items-center">
                  <span
                    className="absolute inset-0 rounded-full bg-[#FFC300]/20 animate-badge-pulse"
                    aria-hidden="true"
                  />
                  <span className="relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#FFC300]/40 bg-[#FFC300]/10 text-[#FFC300] text-[10px] font-bold tracking-[0.15em] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFC300]" aria-hidden="true" />
                    Elite 100+ Members
                  </span>
                </div>
              </div>

              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FFC300]/60 mb-6">
                Navigation
              </p>

              <nav aria-label="Mobile navigation links">
                <ul className="space-y-1">
                  {navLinks.map((link) => (
                    <li key={link.id} className="group">
                      <button
                        onClick={() => handleNavClick(link.id)}
                        className="relative w-full text-left px-4 py-4 text-white/90 font-medium text-lg tracking-wide border-b border-white/5 last:border-b-0"
                        onMouseEnter={e => {
                          const btn = e.currentTarget as HTMLButtonElement;
                          btn.style.color = '#FFC300';
                          btn.style.textShadow = '0 0 12px rgba(255,195,0,0.35)';
                          const bar = btn.querySelector<HTMLSpanElement>('[data-accent]');
                          if (bar) { bar.style.height = '60%'; bar.style.opacity = '1'; }
                        }}
                        onMouseLeave={e => {
                          const btn = e.currentTarget as HTMLButtonElement;
                          btn.style.color = '';
                          btn.style.textShadow = 'none';
                          const bar = btn.querySelector<HTMLSpanElement>('[data-accent]');
                          if (bar) { bar.style.height = '0%'; bar.style.opacity = '0'; }
                        }}
                        aria-label={`Navigate to ${link.label}`}
                      >
                        <span
                          data-accent
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full bg-[#FFC300]"
                          style={{ height: '0%', opacity: 0, transition: 'height 150ms ease, opacity 150ms ease' }}
                          aria-hidden="true"
                        />
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
