import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ApplyHeader() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-[#080808]/90 backdrop-blur-md border-b border-white/5" />
      <div className="relative flex items-center justify-between px-6 md:px-10 lg:px-16 h-16 max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 group"
          aria-label="Back to main site"
        >
          <img
            src="/images/logos/logo.PNG"
            alt="Kingmaker Society Logo"
            className="h-10 w-auto object-contain"
          />
          <div className="flex flex-col leading-none">
            <span className="text-[13px] font-bold text-white tracking-tight">
              Kingmaker
            </span>
            <span className="text-[13px] font-bold text-[#FFC300] tracking-tight">
              Application
            </span>
          </div>
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="hidden sm:flex items-center gap-1.5 text-[11px] text-gray-400 font-medium tracking-wide hover:text-white transition-colors duration-200 group"
            aria-label="Return to main site"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back to Main Site
          </button>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/8 bg-white/4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
            <span className="text-[11px] text-gray-400 font-medium tracking-wide">
              Application Portal
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
