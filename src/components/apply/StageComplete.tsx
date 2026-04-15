import { CheckCircle, Calendar, ArrowLeft } from 'lucide-react';
import Button from '../ui/Button';

const PATH_LABELS: Record<string, string> = {
  community: 'Brotherhood Community',
  guided: 'Guided Growth',
  vip: 'VIP Mentorship',
};

interface StageCompleteProps {
  firstName: string;
  interestedPath: string;
  onBookCall: () => void;
  onGoHome: () => void;
}

export default function StageComplete({ firstName, interestedPath, onBookCall, onGoHome }: StageCompleteProps) {
  const pathLabel = PATH_LABELS[interestedPath] || 'our program';

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="relative inline-block">
          <div className="w-20 h-20 bg-[#FFC300]/10 rounded-full flex items-center justify-center mx-auto border border-[#FFC300]/30">
            <CheckCircle className="w-10 h-10 text-[#FFC300]" />
          </div>
          <div className="absolute inset-0 rounded-full bg-[#FFC300]/10 animate-ping opacity-30" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold tracking-[0.2em] text-[#FFC300]/60 uppercase">Application Received</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Welcome to the arena,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] to-[#D4A000]">
              {firstName || 'Brother'}
            </span>
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Your application for{' '}
            <span className="text-white font-semibold">{pathLabel}</span>{' '}
            has been received. We review every application personally.
          </p>
        </div>
      </div>

      <div className="bg-[#1B1B1B] border border-[#FFC300]/15 rounded-xl p-6 space-y-4 text-left">
        <p className="text-xs font-bold tracking-wider text-[#FFC300]/70 uppercase">What happens next</p>
        <ol className="space-y-3">
          {[
            'Our team reviews your application within 24-48 hours',
            'If you are a strong fit, you will receive a personal message',
            'You may be invited to book a strategy call with Jordan',
          ].map((item, i) => (
            <li key={item} className="flex items-start gap-3 text-gray-300 text-sm">
              <span className="w-5 h-5 rounded-full bg-[#FFC300]/15 text-[#FFC300] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-3">
        <p className="text-gray-400 text-sm">Want to fast-track your review? Book a call now.</p>
        <Button variant="secondary" size="lg" className="w-full" onClick={onBookCall}>
          <span className="flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" /> Book a Strategy Call
          </span>
        </Button>
        <button
          onClick={onGoHome}
          className="flex items-center justify-center gap-2 w-full py-3 text-gray-500 hover:text-gray-300 transition-colors duration-200 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Return to site
        </button>
      </div>
    </div>
  );
}
