import { useEffect, useState, useRef } from 'react';
import { X, Crown } from 'lucide-react';
import { luxuryScrollToSection } from '../../utils/luxuryScroll';

interface MembersOnlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MembersOnlyModal({ isOpen, onClose }: MembersOnlyModalProps) {
  const [isExiting, setIsExiting] = useState(false);
  const shouldRestoreScrollRef = useRef(true);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.top = `-${scrollY}px`;
      document.body.classList.add('modal-open');
      setIsExiting(false);
      shouldRestoreScrollRef.current = true;

      return () => {
        document.body.classList.remove('modal-open');
        const scrollY = document.body.style.top;
        document.body.style.top = '';

        if (shouldRestoreScrollRef.current) {
          window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      setIsExiting(false);
    }, 350);
  };

  const handleViewMembership = () => {
    shouldRestoreScrollRef.current = false;
    setIsExiting(false);
    onClose();

    setTimeout(() => {
      luxuryScrollToSection('pricing', 80);
    }, 100);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  if (!isOpen && !isExiting) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-[200] ${
          isExiting ? 'opacity-0' : 'animate-modal-backdrop-enter'
        }`}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.75) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          transition: 'opacity 350ms cubic-bezier(0.4, 0, 0.6, 1)',
        }}
        onClick={handleClose}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='a' x='0' y='0'%3E%3CfeTurbulence baseFrequency='.75' stitchTiles='stitch' type='fractalNoise'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Cpath d='M0 0h300v300H0z' filter='url(%23a)' opacity='.05'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-none">
        <div
          className={`relative w-full max-w-md mx-auto pointer-events-auto ${
            isExiting ? 'animate-modal-container-exit' : 'animate-modal-container-enter'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 rounded-2xl border border-[#FFC300]/30 pointer-events-none z-20 animate-modal-glow-pulse" />

            <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none z-20 opacity-60 animate-modal-corner-glow">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FFC300] via-[#FFC300]/50 to-transparent" />
              <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-[#FFC300] via-[#FFC300]/50 to-transparent" />
              <div className="absolute top-0 left-0 w-2 h-2 bg-[#FFC300] rounded-full shadow-[0_0_10px_rgba(255,195,0,0.8)]" />
            </div>

            <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none z-20 opacity-60 animate-modal-corner-glow" style={{ animationDelay: '0.5s' }}>
              <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-[#FFC300] via-[#FFC300]/50 to-transparent" />
              <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-[#FFC300] via-[#FFC300]/50 to-transparent" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-[#FFC300] rounded-full shadow-[0_0_10px_rgba(255,195,0,0.8)]" />
            </div>

            <div className="absolute bottom-0 left-0 w-24 h-24 pointer-events-none z-20 opacity-60 animate-modal-corner-glow" style={{ animationDelay: '1s' }}>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#D11F2A] via-[#D11F2A]/50 to-transparent" />
              <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-[#D11F2A] via-[#D11F2A]/50 to-transparent" />
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#D11F2A] rounded-full shadow-[0_0_10px_rgba(209,31,42,0.8)]" />
            </div>

            <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none z-20 opacity-60 animate-modal-corner-glow" style={{ animationDelay: '1.5s' }}>
              <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-[#D11F2A] via-[#D11F2A]/50 to-transparent" />
              <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-[#D11F2A] via-[#D11F2A]/50 to-transparent" />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#D11F2A] rounded-full shadow-[0_0_10px_rgba(209,31,42,0.8)]" />
            </div>

            <div className="relative bg-gradient-to-br from-[#1B1B1B] to-[#0B0B0B] rounded-2xl p-8">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#FFC300]/20 to-[#D11F2A]/20 backdrop-blur-sm text-white transition-all duration-300 hover:scale-110 hover:from-[#FFC300]/30 hover:to-[#D11F2A]/30 z-30 group"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300 origin-center transform rotate-0" />
              </button>

              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FFC300] to-[#D4A000] rounded-full flex items-center justify-center shadow-lg shadow-[#FFC300]/40">
                    <Crown className="w-8 h-8 text-black" />
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white">
                  Members Only
                </h2>

                <p className="text-gray-300 text-lg leading-relaxed">
                  Access to the Kingmaker Brotherhood is granted after enrollment. Join the brotherhood to unlock your member access, live calls, and private community.
                </p>

                <div className="space-y-3 pt-4">
                  <button
                    onClick={handleViewMembership}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#FFC300] to-[#D4A000] text-black font-bold rounded-lg transition-all duration-300 hover:from-[#FFD033] hover:to-[#FFC300] hover:shadow-lg hover:shadow-[#FFC300]/50 hover:scale-105"
                  >
                    View Membership Options
                  </button>

                  <button
                    onClick={handleClose}
                    className="w-full px-6 py-4 bg-gradient-to-br from-[#2B2B2B] to-[#1B1B1B] text-white font-semibold rounded-lg border border-[#3B3B3B] transition-all duration-300 hover:border-[#FFC300]/50 hover:shadow-lg hover:shadow-[#FFC300]/20"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
