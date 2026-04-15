import { Shield, Calendar, Crown } from 'lucide-react';
import { trackClickBookCall } from '../../utils/analytics';

interface VerdictStepProps {
  onBookCall: () => void;
  onChooseMembership: () => void;
}

export default function VerdictStep({ onBookCall, onChooseMembership }: VerdictStepProps) {
  const handleBookCall = () => {
    trackClickBookCall('verdict_step');
    window.open('https://calendly.com/jordanaliwork/30min', '_blank');
    onBookCall();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-3xl mx-auto px-4 text-center">
      <div className="mb-8 relative">
        <div className="absolute -inset-6 bg-[#FFC300]/15 rounded-full blur-3xl animate-pulse"></div>
        <Shield className="relative w-24 h-24 text-[#FFC300] drop-shadow-[0_0_40px_rgba(255,195,0,0.7)]" />
      </div>

      <div className="inline-flex items-center space-x-2 px-5 py-2 bg-[#FFC300]/10 border border-[#FFC300]/30 rounded-full mb-8">
        <div className="w-2 h-2 bg-[#FFC300] rounded-full animate-pulse"></div>
        <span className="text-sm font-semibold text-[#FFC300] tracking-widest uppercase">Assessment Complete</span>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
        Based on what you've shared,{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] via-[#FFD033] to-[#D4A000]">
          you are exactly who this is built for.
        </span>
      </h1>

      <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed">
        The Kingmaker Society was built for men like you — faith-driven, hungry, and done settling.
        The only question left is how you want to move forward.
      </p>

      <p className="text-gray-500 mb-16">Choose the path that speaks to you now.</p>

      <div className="w-full grid sm:grid-cols-2 gap-6">
        <button
          onClick={handleBookCall}
          className="group relative p-8 rounded-2xl border-2 border-[#FFC300]/40 bg-[#1B1B1B] hover:border-[#FFC300] hover:bg-[#FFC300]/5 transition-all duration-300 text-left overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFC300]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <Calendar className="w-10 h-10 text-[#FFC300] mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Book a Strategy Call</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Speak with our team to find the right tier for you. 30 minutes, free, no pressure.
            </p>
            <span className="inline-flex items-center text-[#FFC300] font-semibold text-sm">
              Schedule Now
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </span>
          </div>
        </button>

        <button
          onClick={onChooseMembership}
          className="group relative p-8 rounded-2xl border-2 border-[#D11F2A]/40 bg-[#1B1B1B] hover:border-[#D11F2A] hover:bg-[#D11F2A]/5 transition-all duration-300 text-left overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#D11F2A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <Crown className="w-10 h-10 text-[#D11F2A] mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Choose My Membership</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Ready to commit? Select your tier and start your transformation today.
            </p>
            <span className="inline-flex items-center text-[#D11F2A] font-semibold text-sm">
              See Membership Tiers
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
