import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface GoalsVisionData {
  mainGoal90Days: string;
  life12Months: string;
  wantBusiness: string;
  improvementArea: string;
}

interface GoalsVisionStepProps {
  data: GoalsVisionData;
  onChange: (data: GoalsVisionData) => void;
  onContinue: () => void;
  onBack: () => void;
}

const IMPROVEMENT_OPTIONS = [
  { value: 'fitness', label: 'Fitness', desc: 'Strength, physique, and athletic performance' },
  { value: 'faith', label: 'Faith', desc: 'Spiritual growth and connection to God' },
  { value: 'health', label: 'Health', desc: 'Nutrition, recovery, and long-term vitality' },
  { value: 'goals', label: 'Goals', desc: 'Clarity, direction, and executing on your vision' },
  { value: 'business', label: 'Business', desc: 'Building income and entrepreneurial skills' },
];

const BUSINESS_OPTIONS = [
  { value: 'yes', label: 'Yes', desc: 'I want to build something of my own' },
  { value: 'no', label: 'No', desc: 'I am focused on other goals right now' },
  { value: 'unsure', label: 'Unsure', desc: "I haven't decided yet" },
];

export default function GoalsVisionStep({ data, onChange, onContinue, onBack }: GoalsVisionStepProps) {
  const [subStep, setSubStep] = useState(0);
  const [localError, setLocalError] = useState('');

  const advance = () => {
    setLocalError('');
    if (subStep === 0 && !data.mainGoal90Days.trim()) {
      setLocalError('Please describe your main goal.');
      return;
    }
    if (subStep === 1 && !data.life12Months.trim()) {
      setLocalError('Please describe your vision.');
      return;
    }
    if (subStep === 2 && !data.wantBusiness) {
      setLocalError('Please select an option.');
      return;
    }
    if (subStep === 3) {
      if (!data.improvementArea) {
        setLocalError('Please select an area.');
        return;
      }
      onContinue();
      return;
    }
    setSubStep(s => s + 1);
  };

  const goBack = () => {
    setLocalError('');
    if (subStep === 0) {
      onBack();
    } else {
      setSubStep(s => s - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-2xl mx-auto px-4">
      <div className="w-full mb-10">
        <div className="flex space-x-1 mb-2">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= subStep ? 'bg-[#FFC300]' : 'bg-[#2B2B2B]'}`}
            />
          ))}
        </div>
        <p className="text-xs text-gray-500 text-right">{subStep + 1} of 4</p>
      </div>

      {subStep === 0 && (
        <div className="w-full space-y-6">
          <p className="text-sm font-semibold text-[#FFC300] uppercase tracking-widest">Goals & Vision</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            What is your main goal for the next 90 days?
          </h2>
          <textarea
            className="w-full bg-[#1B1B1B] border-2 border-[#3B3B3B] focus:border-[#FFC300] text-white rounded-xl p-5 text-lg resize-none transition-colors duration-200 outline-none placeholder:text-gray-600"
            rows={4}
            placeholder="Be specific, what do you want to achieve?"
            value={data.mainGoal90Days}
            onChange={e => onChange({ ...data, mainGoal90Days: e.target.value })}
            spellCheck
          />
        </div>
      )}

      {subStep === 1 && (
        <div className="w-full space-y-6">
          <p className="text-sm font-semibold text-[#FFC300] uppercase tracking-widest">Goals & Vision</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            What would your life look like 12 months from now if you stayed consistent?
          </h2>
          <textarea
            className="w-full bg-[#1B1B1B] border-2 border-[#3B3B3B] focus:border-[#FFC300] text-white rounded-xl p-5 text-lg resize-none transition-colors duration-200 outline-none placeholder:text-gray-600"
            rows={4}
            placeholder="Paint the picture, what does that version of you look like?"
            value={data.life12Months}
            onChange={e => onChange({ ...data, life12Months: e.target.value })}
            spellCheck
          />
        </div>
      )}

      {subStep === 2 && (
        <div className="w-full space-y-6">
          <p className="text-sm font-semibold text-[#FFC300] uppercase tracking-widest">Goals & Vision</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Do you want to build your own business or income path one day?
          </h2>
          <div className="space-y-3">
            {BUSINESS_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => onChange({ ...data, wantBusiness: opt.value })}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                  data.wantBusiness === opt.value
                    ? 'border-[#FFC300] bg-[#FFC300]/10 shadow-[0_0_20px_rgba(255,195,0,0.2)]'
                    : 'border-[#2B2B2B] bg-[#1B1B1B] hover:border-[#3B3B3B]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-bold text-lg ${data.wantBusiness === opt.value ? 'text-[#FFC300]' : 'text-white'}`}>{opt.label}</p>
                    <p className="text-gray-400 text-sm mt-1">{opt.desc}</p>
                  </div>
                  {data.wantBusiness === opt.value && (
                    <div className="w-6 h-6 bg-[#FFC300] rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                      <Check className="w-4 h-4 text-[#0B0B0B]" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {subStep === 3 && (
        <div className="w-full space-y-6">
          <p className="text-sm font-semibold text-[#FFC300] uppercase tracking-widest">Goals & Vision</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Which area do you want improvement in?
          </h2>
          <div className="space-y-3">
            {IMPROVEMENT_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => onChange({ ...data, improvementArea: opt.value })}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                  data.improvementArea === opt.value
                    ? 'border-[#FFC300] bg-[#FFC300]/10 shadow-[0_0_20px_rgba(255,195,0,0.2)]'
                    : 'border-[#2B2B2B] bg-[#1B1B1B] hover:border-[#3B3B3B]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-bold text-lg ${data.improvementArea === opt.value ? 'text-[#FFC300]' : 'text-white'}`}>{opt.label}</p>
                    <p className="text-gray-400 text-sm mt-1">{opt.desc}</p>
                  </div>
                  {data.improvementArea === opt.value && (
                    <div className="w-6 h-6 bg-[#FFC300] rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                      <Check className="w-4 h-4 text-[#0B0B0B]" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {localError && (
        <p className="mt-4 text-[#D11F2A] text-sm">{localError}</p>
      )}

      <div className="mt-10 flex items-center space-x-4">
        <button
          onClick={goBack}
          className="flex items-center space-x-2 px-6 py-4 border-2 border-[#2B2B2B] bg-[#1B1B1B] text-gray-400 hover:text-white hover:border-[#3B3B3B] font-bold text-base rounded-xl transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <button
          onClick={advance}
          className="group flex items-center space-x-3 px-10 py-4 bg-gradient-to-r from-[#FFC300] via-[#FFD033] to-[#D4A000] text-[#0B0B0B] font-bold text-base rounded-xl shadow-[0_4px_20px_rgba(255,195,0,0.35)] hover:shadow-[0_8px_40px_rgba(255,195,0,0.55)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
        >
          <span>{subStep === 3 ? 'Continue' : 'Next'}</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
}
