import { useState } from 'react';
import { ChevronRight, ChevronLeft, Loader, Check } from 'lucide-react';
import SubStepTransition from './SubStepTransition';

interface BeliefCommitmentData {
  tryingAlone: string;
  believeBrotherhoodHelps: string;
  costOfStaying: string;
  seriousnessRating: string;
  willingToInvest: string;
  interestedPath: string;
}

interface BeliefCommitmentStepProps {
  data: BeliefCommitmentData;
  onChange: (data: BeliefCommitmentData) => void;
  onContinue: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const YESNO = [
  { value: 'yes', label: 'Yes', desc: 'No accountability or brotherhood' },
  { value: 'no', label: 'No', desc: 'I have some support in my corner' },
];

const BROTHERHOOD = [
  { value: 'yes', label: 'Yes', desc: 'Brotherhood and structure would make a real difference for my life' },
  { value: 'no', label: 'No', desc: 'I think I can get there on my own' },
];

const INVEST = [
  { value: 'yes', label: 'Yes', desc: 'I am ready to invest in my growth' },
  { value: 'no', label: 'No', desc: 'Not at this time' },
  { value: 'depends', label: 'Depends', desc: 'Need more information first' },
];

const PATHS = [
  { value: 'community', label: 'Brotherhood Community', desc: '$30/mo, Access to the brotherhood and shared accountability' },
  { value: 'guided', label: 'Guided Growth', desc: '$60/mo, Small group mentorship with structured programming' },
  { value: 'vip', label: 'VIP Mentorship', desc: '$90/mo, 1-on-1 support with direct access to leadership' },
];

const SERIOUSNESS = Array.from({ length: 10 }, (_, i) => ({ value: String(i + 1), label: `${i + 1}` }));

function SelectCards({
  options,
  selected,
  onSelect,
}: {
  options: { value: string; label: string; desc: string }[];
  selected: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="space-y-3 w-full">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className={`w-full text-left p-5 rounded-xl border-2 transition-colors duration-200 ${
            selected === opt.value
              ? 'border-[#FFC300] bg-[#FFC300]/10'
              : 'border-[#2B2B2B] bg-[#1B1B1B] hover:border-[#3B3B3B]'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className={`font-bold text-lg ${selected === opt.value ? 'text-[#FFC300]' : 'text-white'}`}>{opt.label}</p>
              <p className="text-gray-400 text-sm mt-1">{opt.desc}</p>
            </div>
            <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-colors duration-200 ${
              selected === opt.value ? 'bg-[#FFC300] border-[#FFC300]' : 'border-[#3B3B3B] bg-transparent'
            }`}>
              {selected === opt.value && <Check className="w-3.5 h-3.5 text-[#0B0B0B]" strokeWidth={3} />}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default function BeliefCommitmentStep({ data, onChange, onContinue, onBack, isSubmitting }: BeliefCommitmentStepProps) {
  const [subStep, setSubStep] = useState(0);
  const [localError, setLocalError] = useState('');

  const advance = () => {
    setLocalError('');
    if (subStep === 0 && !data.tryingAlone) { setLocalError('Please select an option.'); return; }
    if (subStep === 1 && !data.believeBrotherhoodHelps) { setLocalError('Please select an option.'); return; }
    if (subStep === 2 && !data.costOfStaying.trim()) { setLocalError('Please share what staying costs you.'); return; }
    if (subStep === 3 && !data.seriousnessRating) { setLocalError('Please rate your seriousness.'); return; }
    if (subStep === 4 && !data.willingToInvest) { setLocalError('Please select an option.'); return; }
    if (subStep === 5) {
      if (!data.interestedPath) { setLocalError('Please choose a path.'); return; }
      onContinue();
      return;
    }
    setSubStep(s => s + 1);
  };

  const goBack = () => {
    setLocalError('');
    if (subStep === 0) { onBack(); } else { setSubStep(s => s - 1); }
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto px-4">
      <div className="w-full mb-10">
        <div className="flex space-x-1 mb-2">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= subStep ? 'bg-[#FFC300]' : 'bg-[#2B2B2B]'}`} />
          ))}
        </div>
        <p className="text-xs text-gray-500 text-right">{subStep + 1} of 6</p>
      </div>

      <SubStepTransition stepKey={subStep}>
        {subStep === 0 && (
          <div className="w-full space-y-6">
            <p className="text-sm font-semibold text-[#FFC300] uppercase tracking-widest">Belief & Commitment</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Have you been trying to do this alone?
            </h2>
            <SelectCards options={YESNO} selected={data.tryingAlone} onSelect={v => onChange({ ...data, tryingAlone: v })} />
          </div>
        )}

        {subStep === 1 && (
          <div className="w-full space-y-6">
            <p className="text-sm font-semibold text-[#FFC300] uppercase tracking-widest">Belief & Commitment</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Do you believe a structured brotherhood and accountability would accelerate your results?
            </h2>
            <SelectCards options={BROTHERHOOD} selected={data.believeBrotherhoodHelps} onSelect={v => onChange({ ...data, believeBrotherhoodHelps: v })} />
          </div>
        )}

        {subStep === 2 && (
          <div className="w-full space-y-6">
            <p className="text-sm font-semibold text-[#FFC300] uppercase tracking-widest">Belief & Commitment</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              What is the cost of staying where you are for another year?
            </h2>
            <p className="text-gray-400 text-lg">Not in dollars. In regret, missed time, unlived potential.</p>
            <textarea
              className="w-full bg-[#1B1B1B] border-2 border-[#3B3B3B] focus:border-[#FFC300] text-white rounded-xl p-5 text-lg resize-none transition-colors duration-200 outline-none placeholder:text-gray-600"
              rows={5}
              placeholder="Be brutally honest with yourself here..."
              value={data.costOfStaying}
              onChange={e => onChange({ ...data, costOfStaying: e.target.value })}
              spellCheck
            />
          </div>
        )}

        {subStep === 3 && (
          <div className="w-full space-y-6">
            <p className="text-sm font-semibold text-[#FFC300] uppercase tracking-widest">Belief & Commitment</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              How serious are you about changing your life right now?
            </h2>
            <p className="text-gray-400">1 = just curious &nbsp;|&nbsp; 10 = no going back</p>
            <div className="grid grid-cols-5 gap-3">
              {SERIOUSNESS.map(r => (
                <button
                  key={r.value}
                  onClick={() => onChange({ ...data, seriousnessRating: r.value })}
                  className={`py-4 rounded-xl font-bold text-xl border-2 transition-colors duration-200 ${
                    data.seriousnessRating === r.value
                      ? 'border-[#FFC300] bg-[#FFC300] text-[#0B0B0B]'
                      : 'border-[#2B2B2B] bg-[#1B1B1B] text-white hover:border-[#FFC300]/40'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {subStep === 4 && (
          <div className="w-full space-y-6">
            <p className="text-sm font-semibold text-[#FFC300] uppercase tracking-widest">Belief & Commitment</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              If accepted, are you willing to invest in mentorship and accountability?
            </h2>
            <SelectCards options={INVEST} selected={data.willingToInvest} onSelect={v => onChange({ ...data, willingToInvest: v })} />
          </div>
        )}

        {subStep === 5 && (
          <div className="w-full space-y-6">
            <p className="text-sm font-semibold text-[#FFC300] uppercase tracking-widest">Belief & Commitment</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Which path are you most interested in?
            </h2>
            <SelectCards options={PATHS} selected={data.interestedPath} onSelect={v => onChange({ ...data, interestedPath: v })} />
          </div>
        )}
      </SubStepTransition>

      {localError && <p className="mt-4 text-[#D11F2A] text-sm">{localError}</p>}

      <div className="mt-10 flex items-center space-x-4">
        <button
          onClick={goBack}
          disabled={isSubmitting}
          className="flex items-center space-x-2 px-6 py-4 border-2 border-[#2B2B2B] bg-[#1B1B1B] text-gray-400 hover:text-white hover:border-[#3B3B3B] font-bold text-base rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <button
          onClick={advance}
          disabled={isSubmitting}
          className="group flex items-center space-x-3 px-10 py-4 bg-gradient-to-r from-[#FFC300] via-[#FFD033] to-[#D4A000] text-[#0B0B0B] font-bold text-base rounded-xl shadow-[0_4px_20px_rgba(255,195,0,0.35)] hover:shadow-[0_8px_40px_rgba(255,195,0,0.55)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <span>{subStep === 5 ? 'Submit & Continue' : 'Next'}</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
