import { ArrowRight, Shield, Zap, Users, Target } from 'lucide-react';
import Button from '../ui/Button';

interface StageIntroProps {
  onStart: () => void;
}

const pillars = [
  { icon: Target, label: 'Your Vision', desc: 'Where you are going' },
  { icon: Zap, label: 'Your Reality', desc: 'Where you are now' },
  { icon: Users, label: 'Your Commitment', desc: 'Are you ready to lead?' },
];

export default function StageIntro({ onStart }: StageIntroProps) {
  return (
    <div className="text-center space-y-10">
      <div className="space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFC300]/10 border border-[#FFC300]/25 rounded-full">
          <Shield className="w-4 h-4 text-[#FFC300]" />
          <span className="text-xs font-bold tracking-[0.15em] text-[#FFC300] uppercase">Elite Application</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
          This Is Not a{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] to-[#D4A000]">
            Sign-Up Form
          </span>
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed max-w-md mx-auto">
          This is a discovery process. We take less than 5% of applicants.
          What you share here determines whether we can help you.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {pillars.map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="bg-[#1B1B1B] border border-white/8 rounded-xl p-4 space-y-2"
          >
            <div className="w-9 h-9 bg-[#FFC300]/10 rounded-lg flex items-center justify-center mx-auto">
              <Icon className="w-4 h-4 text-[#FFC300]" />
            </div>
            <p className="text-white text-xs font-semibold">{label}</p>
            <p className="text-gray-500 text-xs">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#1B1B1B] border border-[#FFC300]/15 rounded-xl p-5 text-left space-y-3">
        <p className="text-xs font-bold tracking-wider text-[#FFC300]/70 uppercase">Before you begin</p>
        <ul className="space-y-2">
          {[
            'Answer every question honestly — vague answers get rejected',
            'This takes about 4 minutes to complete',
            'Your information is private and never shared',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-gray-300 text-sm">
              <span className="text-[#FFC300] mt-0.5 shrink-0">—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Button variant="secondary" size="lg" className="w-full" onClick={onStart}>
        <span className="flex items-center justify-center gap-2">
          Begin Application <ArrowRight className="w-4 h-4" />
        </span>
      </Button>

      <p className="text-gray-600 text-xs">4 stages · ~4 minutes · No spam ever</p>
    </div>
  );
}
