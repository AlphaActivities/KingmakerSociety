type ApplicationStep = 'lead-form' | 'questionnaire' | 'call-booking' | 'complete';

interface Stage {
  key: ApplicationStep;
  label: string;
  number: number;
}

const STAGES: Stage[] = [
  { key: 'lead-form', label: 'Profile', number: 1 },
  { key: 'questionnaire', label: 'Goals', number: 2 },
  { key: 'call-booking', label: 'Confirm', number: 3 },
];

function getStageIndex(step: ApplicationStep): number {
  const map: Record<ApplicationStep, number> = {
    'lead-form': 0,
    'questionnaire': 1,
    'call-booking': 2,
    'complete': 2,
  };
  return map[step];
}

interface StageIndicatorProps {
  currentStep: ApplicationStep;
}

export default function StageIndicator({ currentStep }: StageIndicatorProps) {
  const activeIndex = getStageIndex(currentStep);

  return (
    <div className="flex items-center space-x-1 sm:space-x-2">
      {STAGES.map((stage, index) => {
        const isComplete = index < activeIndex;
        const isActive = index === activeIndex;

        return (
          <div key={stage.key} className="flex items-center">
            <div className="flex flex-col items-center space-y-1">
              <div
                className={[
                  'relative flex items-center justify-center transition-all duration-500',
                  'w-7 h-7 sm:w-8 sm:h-8 rounded-full text-[11px] sm:text-xs font-bold',
                  isComplete
                    ? 'bg-[#FFC300] text-[#0B0B0B] shadow-[0_0_12px_rgba(255,195,0,0.4)]'
                    : isActive
                    ? 'bg-transparent border-2 border-[#FFC300] text-[#FFC300] shadow-[0_0_16px_rgba(255,195,0,0.25)]'
                    : 'bg-transparent border border-white/15 text-white/25',
                ].join(' ')}
              >
                {isComplete ? (
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  stage.number
                )}
                {isActive && (
                  <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-[#FFC300]" />
                )}
              </div>
              <span
                className={[
                  'hidden sm:block text-[10px] font-medium tracking-widest uppercase transition-colors duration-300',
                  isActive ? 'text-[#FFC300]' : isComplete ? 'text-[#FFC300]/60' : 'text-white/20',
                ].join(' ')}
              >
                {stage.label}
              </span>
            </div>

            {index < STAGES.length - 1 && (
              <div
                className={[
                  'mx-1 sm:mx-2 h-px transition-all duration-700',
                  'w-6 sm:w-10',
                  index < activeIndex ? 'bg-[#FFC300]/60' : 'bg-white/10',
                ].join(' ')}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
