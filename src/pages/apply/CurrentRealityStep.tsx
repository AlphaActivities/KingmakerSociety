import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface CurrentRealityData {
  alreadyTried: string;
  whatStopsConsistency: string;
  disciplineRating: string;
  trainingDaysPerWeek: string;
  prayerDaysPerWeek: string;
}

interface CurrentRealityStepProps {
  data: CurrentRealityData;
  onChange: (data: CurrentRealityData) => void;
  onContinue: () => void;
  onBack: () => void;
}

const RATINGS = Array.from({ length: 10 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1}`,
}));

const DAYS = Array.from({ length: 8 }, (_, i) => ({
  value: String(i),
  label: i === 0 ? '0 days' : i === 1 ? '1 day' : `${i} days`,
}));

export default function CurrentRealityStep({ data, onChange, onContinue, onBack }: CurrentRealityStepProps) {
  const [subStep, setSubStep] = useState(0);
  const [localError, setLocalError] = useState('');

  const advance = () => {
    setLocalError('');
    if (subStep === 0 && !data.alreadyTried.trim()) { setLocalError('Please share what you have tried.'); return; }
    if (subStep === 1 && !data.whatStopsConsistency.trim()) { setLocalError('Please describe what stops you.'); return; }
    if (subStep === 2 && !data.disciplineRating) { setLocalError('Please rate your discipline.'); return; }
    if (subStep === 3 && !data.trainingDaysPerWeek) { setLocalError('Please select your training days.'); return; }
    if (subStep === 4) {
      if (!data.prayerDaysPerWeek) { setLocalError('Please select your prayer days.'); return; }
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
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= subStep ? 'bg-[#FFC300]' : 'bg-[#2B2B2B]'}`}
            />
          ))}
        </div>
        <p className="text-xs text-gray-500 text-right">{subStep + 1} of 5</p>
      </div>

      {subStep === 0 && (
        <div className="w-full space-y-6">
          <p className="text-sm font-semibold text-[#FFC300] uppercase tracking-widest">Current Reality</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            What have you already tried to reach your goals?
          </h2>
          <textarea
            className="w-full bg-[#1B1B1B] border-2 border-[#3B3B3B] focus:border-[#FFC300] text-white rounded-xl p-5 text-lg resize-none transition-colors duration-200 outline-none placeholder:text-gray-600"
            rows={4}
            placeholder="Programs, routines, coaches, habits, what have you attempted?"
            value={data.alreadyTried}
            onChange={e => onChange({ ...data, alreadyTried: e.target.value })}
            spellCheck
          />
        </div>
      )}

      {subStep === 1 && (
        <div className="w-full space-y-6">
          <p className="text-sm font-semibold text-[#FFC300] uppercase tracking-widest">Current Reality</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            What keeps stopping you from being consistent?
          </h2>
          <textarea
            className="w-full bg-[#1B1B1B] border-2 border-[#3B3B3B] focus:border-[#FFC300] text-white rounded-xl p-5 text-lg resize-none transition-colors duration-200 outline-none placeholder:text-gray-600"
            rows={4}
            placeholder="Be honest, what is the real obstacle?"
            value={data.whatStopsConsistency}
            onChange={e => onChange({ ...data, whatStopsConsistency: e.target.value })}
            spellCheck
          />
        </div>
      )}

      {subStep === 2 && (
        <div className="w-full space-y-6">
          <p className="text-sm font-semibold text-[#FFC300] uppercase tracking-widest">Current Reality</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Rate your current discipline from 1 to 10.
          </h2>
          <p className="text-gray-400">1 = barely started &nbsp;|&nbsp; 10 = locked in every single day</p>
          <div className="grid grid-cols-5 gap-3">
            {RATINGS.map(r => (
              <button
                key={r.value}
                onClick={() => onChange({ ...data, disciplineRating: r.value })}
                className={`py-4 rounded-xl font-bold text-xl border-2 transition-all duration-200 ${
                  data.disciplineRating === r.value
                    ? 'border-[#FFC300] bg-[#FFC300] text-[#0B0B0B] shadow-[0_0_20px_rgba(255,195,0,0.4)]'
                    : 'border-[#2B2B2B] bg-[#1B1B1B] text-white hover:border-[#FFC300]/40'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {subStep === 3 && (
        <div className="w-full space-y-6">
          <p className="text-sm font-semibold text-[#FFC300] uppercase tracking-widest">Current Reality</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            How many days per week are you currently training?
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {DAYS.map(d => (
              <button
                key={d.value}
                onClick={() => onChange({ ...data, trainingDaysPerWeek: d.value })}
                className={`py-4 px-2 rounded-xl font-bold text-base border-2 transition-all duration-200 ${
                  data.trainingDaysPerWeek === d.value
                    ? 'border-[#FFC300] bg-[#FFC300] text-[#0B0B0B] shadow-[0_0_20px_rgba(255,195,0,0.4)]'
                    : 'border-[#2B2B2B] bg-[#1B1B1B] text-white hover:border-[#FFC300]/40'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {subStep === 4 && (
        <div className="w-full space-y-6">
          <p className="text-sm font-semibold text-[#FFC300] uppercase tracking-widest">Current Reality</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            How many days per week are you currently reading scripture or praying?
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {DAYS.map(d => (
              <button
                key={d.value}
                onClick={() => onChange({ ...data, prayerDaysPerWeek: d.value })}
                className={`py-4 px-2 rounded-xl font-bold text-base border-2 transition-all duration-200 ${
                  data.prayerDaysPerWeek === d.value
                    ? 'border-[#FFC300] bg-[#FFC300] text-[#0B0B0B] shadow-[0_0_20px_rgba(255,195,0,0.4)]'
                    : 'border-[#2B2B2B] bg-[#1B1B1B] text-white hover:border-[#FFC300]/40'
                }`}
              >
                {d.label}
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
          <span>{subStep === 4 ? 'Continue' : 'Next'}</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
}
