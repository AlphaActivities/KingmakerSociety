import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  videoUrl: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ videoUrl, title, isOpen, onClose }: VideoModalProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      setVideoLoaded(false);
      setIsExiting(false);

      return () => {
        document.body.classList.remove('modal-open');
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
          className={`relative w-full max-w-lg mx-auto pointer-events-auto ${
            isExiting ? 'animate-modal-container-exit' : 'animate-modal-container-enter'
          }`}
        >
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 rounded-xl border border-[#FFC300]/30 pointer-events-none z-20 animate-modal-glow-pulse" />

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

            <div className="relative bg-black rounded-xl overflow-hidden group/video">
              <button
                onClick={handleClose}
                className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#FFC300]/20 to-[#D11F2A]/20 backdrop-blur-sm text-white transition-all duration-300 hover:scale-110 hover:from-[#FFC300]/30 hover:to-[#D11F2A]/30 z-30 opacity-0 group-hover/video:opacity-100 group ${
                  isExiting ? 'opacity-0' : ''
                }`}
                aria-label="Close video"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFC300]/40 to-[#D11F2A]/40 opacity-0 hover:opacity-100 transition-opacity duration-300 blur-xl" />

                <X className="w-6 h-6 z-10 transition-transform group-hover:rotate-90 duration-300 origin-center transform rotate-0" />
              </button>

              {!videoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center z-5 bg-black">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-[#FFC300]/20 border-t-[#FFC300] rounded-full animate-spin" />
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-[#D11F2A]/50 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
                  </div>
                </div>
              )}

              <video
                src={videoUrl}
                controls
                autoPlay
                playsInline
                onLoadedData={() => setVideoLoaded(true)}
                className={`w-full aspect-[9/16] object-contain transition-opacity duration-500 ${
                  videoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ maxHeight: 'calc(100vh - 8rem)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
