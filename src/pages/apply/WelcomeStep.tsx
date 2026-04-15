import { Shield } from 'lucide-react';
import { useApplication } from '../../context/ApplicationContext';

interface WelcomeStepProps {
  onContinue: () => void;
}

export default function WelcomeStep({ onContinue }: WelcomeStepProps) {
  const { firstName } = useApplication();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="mb-8 relative">
        <div className="absolute -inset-4 bg-[#FFC300]/20 rounded-full blur-2xl animate-pulse"></div>
        <Shield className="relative w-20 h-20 text-[#FFC300] drop-shadow-[0_0_30px_rgba(255,195,0,0.6)]" />
      </div>

      <div className="inline-flex items-center space-x-2 px-5 py-2 bg-[#FFC300]/10 border border-[#FFC300]/30 rounded-full mb-8">
        <div className="w-2 h-2 bg-[#FFC300] rounded-full animate-pulse"></div>
        <span className="text-sm font-semibold text-[#FFC300] tracking-widest uppercase">Application Received</span>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
        {firstName ? (
          <>
            Welcome,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] via-[#FFD033] to-[#D4A000]">
              {firstName}.
            </span>
          </>
        ) : (
          <>
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] via-[#FFD033] to-[#D4A000]">
              Kingmaker.
            </span>
          </>
        )}
      </h1>

      <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed">
        Your application has been received.
      </p>
      <p className="text-lg text-gray-400 max-w-xl mx-auto mb-16 leading-relaxed">
        What comes next is not a form. It is an assessment — a chance for us to understand who you are,
        where you are, and whether this brotherhood is the right environment to carry you forward.
      </p>

      <button
        onClick={onContinue}
        className="group relative px-12 py-5 bg-gradient-to-r from-[#FFC300] via-[#FFD033] to-[#D4A000] text-[#0B0B0B] font-bold text-lg rounded-xl shadow-[0_4px_30px_rgba(255,195,0,0.4)] hover:shadow-[0_8px_50px_rgba(255,195,0,0.6)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        <span className="relative z-10">Begin Your Assessment</span>
        <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></span>
      </button>

      <p className="mt-6 text-sm text-gray-500">Takes approximately 5 minutes</p>
    </div>
  );
}
