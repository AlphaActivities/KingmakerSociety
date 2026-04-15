import { useEffect, useRef, useState } from 'react';

interface NavLink {
  label: string;
  id: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  isPrewarmed?: boolean;
  onClose: () => void;
  onCtaClick: () => void;
  navLinks: NavLink[];
  onNavigate: (id: string) => void;
}

export default function MobileMenu({
  isOpen,
  isPrewarmed: isPrewarmingPhase = false,
  onClose,
  onCtaClick,
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
  const [barReady, setBarReady] = useState(false);
  const barTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (barTimerRef.current) clearTimeout(barTimerRef.current);
    if (isOpen) {
      barTimerRef.current = setTimeout(() => setBarReady(true), 16);
    } else {
      setBarReady(false);
    }
    return () => {
      if (barTimerRef.current) clearTimeout(barTimerRef.current);
    };
  }, [isOpen]);

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
          borderTop: '1px solid rgba(255,195,0,0.15)',
          boxShadow: '-4px 0 32px rgba(0,0,0,0.5), -1px 0 0 rgba(255,195,0,0.08)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Left luxury bar + inner glow */}
        <div
          className="absolute top-0 left-0 bottom-0 w-[3px] z-10"
          style={{
            background: 'linear-gradient(to bottom, #B8151E 0%, #D11F2A 12%, #E8451A 28%, #FFC300 52%, #E8A800 72%, rgba(232,168,0,0.45) 88%, rgba(232,168,0,0.40) 100%)',
            boxShadow: '1px 0 10px rgba(209,31,42,0.65), 3px 0 22px rgba(209,31,42,0.30), 2px 0 28px rgba(255,195,0,0.20)',
            transform: barReady ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'top',
            transition: barReady ? 'transform 1080ms cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
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
                            className="absolute top-1/2 -translate-y-1/2 rounded-full bg-[#FFC300]"
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
            {/* Elite Members badge */}
            <div className="flex items-center justify-center">
              <div className="relative inline-flex items-center">
                {/* Outer pulse halo */}
                <span
                  className="absolute inset-0 rounded-full animate-badge-pulse pointer-events-none"
                  style={{ background: 'rgba(255,195,0,0.18)' }}
                  aria-hidden="true"
                />
                {/* Badge pill */}
                <span
                  className="relative inline-flex items-center gap-1.5 px-4 py-[5px] rounded-full uppercase"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,195,0,0.22) 0%, rgba(255,195,0,0.10) 60%, rgba(255,195,0,0.16) 100%)',
                    border: '1px solid rgba(255,195,0,0.55)',
                    boxShadow: '0 0 12px rgba(255,195,0,0.20) inset, 0 0 18px rgba(255,195,0,0.12)',
                  }}
                >
                  {/* Live dot */}
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: '#FFC300', boxShadow: '0 0 5px rgba(255,195,0,0.8)' }}
                    aria-hidden="true"
                  />
                  <span className="text-[11px] font-extrabold tracking-[0.07em] text-[#FFC300]">100+</span>
                  <span
                    className="text-[10px] font-semibold tracking-[0.14em]"
                    style={{ color: 'rgba(255,210,60,0.85)' }}
                  >Elite Members</span>
                </span>
              </div>
            </div>

            {/* Start Application CTA */}
            <div className="relative">
              {/* Ambient under-glow — sits below, not on top */}
              <span
                className="absolute pointer-events-none"
                style={{
                  inset: '30% 10% -10px',
                  background: 'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(255,195,0,0.35) 0%, transparent 70%)',
                  filter: 'blur(10px)',
                }}
                aria-hidden="true"
              />
              <button
                onClick={onCtaClick}
                className="relative w-full py-4 px-6 font-bold text-sm tracking-[0.14em] uppercase rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#FFC300]/60"
                style={{
                  background: 'linear-gradient(175deg, #FFD84D 0%, #FFC300 28%, #E8A800 65%, #D49800 100%)',
                  color: '#0A0A0A',
                  border: 'none',
                  boxShadow: '0 1px 0 rgba(255,255,255,0.30) inset, 0 -2px 0 rgba(0,0,0,0.22) inset, 0 8px 32px rgba(255,195,0,0.38), 0 2px 8px rgba(255,195,0,0.20)',
                  letterSpacing: '0.14em',
                  WebkitTapHighlightColor: 'transparent',
                  transition: 'transform 90ms ease, box-shadow 110ms ease, filter 110ms ease',
                  willChange: 'transform',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.filter = 'brightness(1.07)';
                  el.style.boxShadow = '0 1px 0 rgba(255,255,255,0.34) inset, 0 -2px 0 rgba(0,0,0,0.22) inset, 0 10px 40px rgba(255,195,0,0.52), 0 3px 12px rgba(255,195,0,0.30)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.filter = '';
                  el.style.boxShadow = '0 1px 0 rgba(255,255,255,0.30) inset, 0 -2px 0 rgba(0,0,0,0.22) inset, 0 8px 32px rgba(255,195,0,0.38), 0 2px 8px rgba(255,195,0,0.20)';
                }}
                onTouchStart={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.transform = 'scale(0.97)';
                  el.style.filter = 'brightness(0.94)';
                  el.style.boxShadow = '0 1px 0 rgba(255,255,255,0.18) inset, 0 -2px 0 rgba(0,0,0,0.28) inset, 0 3px 14px rgba(255,195,0,0.28), 0 1px 4px rgba(255,195,0,0.16)';
                }}
                onTouchEnd={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.transform = '';
                  el.style.filter = '';
                  el.style.boxShadow = '0 1px 0 rgba(255,255,255,0.30) inset, 0 -2px 0 rgba(0,0,0,0.22) inset, 0 8px 32px rgba(255,195,0,0.38), 0 2px 8px rgba(255,195,0,0.20)';
                }}
                onTouchCancel={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.transform = '';
                  el.style.filter = '';
                  el.style.boxShadow = '0 1px 0 rgba(255,255,255,0.30) inset, 0 -2px 0 rgba(0,0,0,0.22) inset, 0 8px 32px rgba(255,195,0,0.38), 0 2px 8px rgba(255,195,0,0.20)';
                }}
                aria-label="Start your application"
              >
                {/* Top satin highlight — embedded, not a box edge */}
                <span
                  className="absolute top-0 left-[8%] right-[8%] h-[1px] pointer-events-none rounded-full"
                  style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.65), transparent)' }}
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
