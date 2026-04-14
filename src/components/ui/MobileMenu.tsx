import { useEffect, useState } from 'react';

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

  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleNavClick = (id: string) => {
    onNavigate(id);
  };

  const activateLink = (id: string) => setActiveLink(id);
  const deactivateLink = () => setActiveLink(null);

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

        {/* Static interior depth — warm gold radial bloom from top-left */}
        <div
          className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 70% 45% at 10% 0%, rgba(255,195,0,0.07) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Static interior depth — deep crimson floor warmth at bottom */}
        <div
          className="absolute left-0 right-0 bottom-0 h-2/5 pointer-events-none z-0"
          style={{
            background: 'linear-gradient(to top, rgba(209,31,42,0.06) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        <div className="relative flex flex-col h-full z-[1]">
          <div className="flex-1 overflow-y-auto">
            <div className="px-6 pt-6 pb-4">
              <nav aria-label="Mobile navigation links">
                <ul className="space-y-0">
                  {navLinks.map((link) => {
                    const isActive = activeLink === link.id;
                    return (
                      <li key={link.id}>
                        <button
                          onClick={() => handleNavClick(link.id)}
                          onMouseEnter={() => activateLink(link.id)}
                          onMouseLeave={deactivateLink}
                          onTouchStart={() => activateLink(link.id)}
                          onTouchEnd={deactivateLink}
                          onTouchCancel={deactivateLink}
                          className="relative w-full text-left px-4 py-[18px] font-medium text-lg tracking-wide border-b border-white/5 last:border-b-0 outline-none focus-visible:ring-1 focus-visible:ring-[#FFC300]/40"
                          style={{
                            color: isActive ? '#FFC300' : 'rgba(255,255,255,0.9)',
                            textShadow: isActive ? '0 0 14px rgba(255,195,0,0.4)' : 'none',
                            transition: 'color 120ms ease, text-shadow 120ms ease',
                            WebkitTapHighlightColor: 'transparent',
                            overflow: 'visible',
                          }}
                          aria-label={`Navigate to ${link.label}`}
                        >
                          {/* Soft gold rounded glow behind the row — no border, rounded container feel */}
                          <span
                            className="absolute pointer-events-none"
                            style={{
                              inset: '3px 8px 3px 2px',
                              borderRadius: '6px',
                              background: isActive
                                ? 'radial-gradient(ellipse 85% 100% at 5% 50%, rgba(255,195,0,0.13) 0%, rgba(255,195,0,0.05) 45%, transparent 100%)'
                                : 'transparent',
                              transition: 'background 200ms ease',
                            }}
                            aria-hidden="true"
                          />
                          {/* Left vertical gold accent bar — full width, overflow-safe */}
                          <span
                            className="absolute top-1/2 -translate-y-1/2 rounded-r-full bg-[#FFC300]"
                            style={{
                              left: '-1px',
                              width: '4px',
                              height: isActive ? '58%' : '0%',
                              opacity: isActive ? 1 : 0,
                              boxShadow: isActive ? '0 0 10px 2px rgba(255,195,0,0.5), 4px 0 18px rgba(255,195,0,0.18)' : 'none',
                              transition: 'height 220ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 180ms ease, box-shadow 220ms ease',
                            }}
                            aria-hidden="true"
                          />
                          <span className="relative">{link.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>

          <div className="px-6 pt-6 pb-7 border-t border-white/10 space-y-5">
            <div className="flex items-center justify-center">
              <div className="relative inline-flex items-center">
                <span
                  className="absolute inset-0 rounded-full bg-[#FFC300]/20 animate-badge-pulse"
                  aria-hidden="true"
                />
                <span className="relative inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#FFC300]/45 bg-[#FFC300]/10 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC300] shrink-0" aria-hidden="true" />
                  <span className="text-[11px] font-extrabold tracking-[0.06em] text-[#FFC300]">100+</span>
                  <span className="text-[10px] font-semibold tracking-[0.13em] text-[#FFC300]/80">Elite Members</span>
                </span>
              </div>
            </div>

            <div className="relative">
              {/* Ambient gold bloom behind button */}
              <span
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,195,0,0.22) 0%, transparent 70%)',
                  filter: 'blur(8px)',
                  transform: 'translateY(4px)',
                }}
                aria-hidden="true"
              />
              <button
                onClick={onClose}
                className="relative w-full py-4 px-6 font-bold text-sm tracking-[0.14em] uppercase rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#FFC300]/60 active:scale-[0.97]"
                style={{
                  background: 'linear-gradient(160deg, #FFD340 0%, #FFC300 35%, #e6a800 70%, #FFC300 100%)',
                  color: '#0A0A0A',
                  boxShadow: '0 2px 0 rgba(255,255,255,0.18) inset, 0 -1px 0 rgba(0,0,0,0.25) inset, 0 6px 28px rgba(255,195,0,0.40), 0 1px 6px rgba(255,195,0,0.25)',
                  border: '1px solid rgba(255,215,60,0.7)',
                  letterSpacing: '0.14em',
                  WebkitTapHighlightColor: 'transparent',
                  transition: 'transform 90ms ease, box-shadow 120ms ease, filter 120ms ease',
                  willChange: 'transform',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 0 rgba(255,255,255,0.22) inset, 0 -1px 0 rgba(0,0,0,0.25) inset, 0 8px 36px rgba(255,195,0,0.55), 0 2px 10px rgba(255,195,0,0.35)';
                  (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.06)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 0 rgba(255,255,255,0.18) inset, 0 -1px 0 rgba(0,0,0,0.25) inset, 0 6px 28px rgba(255,195,0,0.40), 0 1px 6px rgba(255,195,0,0.25)';
                  (e.currentTarget as HTMLButtonElement).style.filter = '';
                }}
                onTouchStart={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 0 rgba(255,255,255,0.12) inset, 0 -1px 0 rgba(0,0,0,0.3) inset, 0 3px 14px rgba(255,195,0,0.30), 0 1px 4px rgba(255,195,0,0.18)';
                  (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(0.95)';
                }}
                onTouchEnd={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = '';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 0 rgba(255,255,255,0.18) inset, 0 -1px 0 rgba(0,0,0,0.25) inset, 0 6px 28px rgba(255,195,0,0.40), 0 1px 6px rgba(255,195,0,0.25)';
                  (e.currentTarget as HTMLButtonElement).style.filter = '';
                }}
                onTouchCancel={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = '';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 0 rgba(255,255,255,0.18) inset, 0 -1px 0 rgba(0,0,0,0.25) inset, 0 6px 28px rgba(255,195,0,0.40), 0 1px 6px rgba(255,195,0,0.25)';
                  (e.currentTarget as HTMLButtonElement).style.filter = '';
                }}
                aria-label="Start your application"
              >
                {/* Top highlight edge */}
                <span
                  className="absolute top-0 left-[10%] right-[10%] h-px pointer-events-none"
                  style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.55), transparent)' }}
                  aria-hidden="true"
                />
                Start Application
              </button>
            </div>

            <div className="text-center pt-2">
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
