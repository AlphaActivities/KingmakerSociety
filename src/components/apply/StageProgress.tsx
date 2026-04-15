import type { WizardStage } from '../../pages/ApplyPage';

interface StageMeta {
  label: string;
  subtitle: string;
  step: number;
}

interface StageProgressProps {
  currentStep: number;
  totalSteps: number;
  stageMeta: Record<WizardStage, StageMeta>;
  stage: WizardStage;
}

const STEP_LABELS = ['Identity', 'Vision', 'Reality', 'Commitment'];

export default function StageProgress({ currentStep, totalSteps, stageMeta, stage }: StageProgressProps) {
  const pct = Math.round(((currentStep - 1) / totalSteps) * 100);

  return (
    <div className="relative z-10 px-6 pt-5 pb-4 border-b border-white/5">
      <div className="max-w-xl mx-auto space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-semibold text-sm">{stageMeta[stage].label}</p>
            <p className="text-gray-500 text-xs">{stageMeta[stage].subtitle}</p>
          </div>
          <span className="text-[#FFC300] text-xs font-bold tabular-nums">
            {currentStep} / {totalSteps}
          </span>
        </div>

        <div className="w-full h-1 bg-white/8 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FFC300] to-[#D4A000] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep) / totalSteps) * 100}%` }}
          />
        </div>

        <div className="flex justify-between">
          {STEP_LABELS.map((label, i) => {
            const stepNum = i + 1;
            const done = currentStep > stepNum;
            const active = currentStep === stepNum;
            return (
              <span
                key={label}
                className={`text-xs transition-colors duration-200 ${
                  done ? 'text-[#FFC300]/70' : active ? 'text-[#FFC300] font-semibold' : 'text-gray-600'
                }`}
              >
                {label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
