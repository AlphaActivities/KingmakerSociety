import { Shield } from 'lucide-react';

export default function ApplyHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-[#080808]/90 backdrop-blur-md border-b border-white/5" />
      <div className="relative flex items-center justify-between px-6 md:px-10 lg:px-16 h-16 max-w-5xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute inset-0 bg-[#FFC300]/20 rounded-full blur-md" />
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#FFC300]/20 to-[#D4A000]/10 border border-[#FFC300]/30 flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#FFC300]" />
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#FFC300]/60 uppercase">
              Kingmaker
            </span>
            <span className="text-[13px] font-bold text-white tracking-tight">
              Society
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/8 bg-white/4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
          <span className="text-[11px] text-gray-400 font-medium tracking-wide">
            Application Portal
          </span>
        </div>
      </div>
    </header>
  );
}
