import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useApplication } from '../context/ApplicationContext';
import { submitQuestionnaire } from '../services/leadService';
import { trackCompleteQuestionnaire } from '../utils/analytics';
import StepTransition from './apply/StepTransition';
import WelcomeStep from './apply/WelcomeStep';
import GoalsVisionStep from './apply/GoalsVisionStep';
import CurrentRealityStep from './apply/CurrentRealityStep';
import BeliefCommitmentStep from './apply/BeliefCommitmentStep';
import VerdictStep from './apply/VerdictStep';
import PricingStep from './apply/PricingStep';
import type { ApplyStep } from '../context/ApplicationContext';

const STEP_ORDER: ApplyStep[] = [
  'welcome',
  'goals-vision',
  'current-reality',
  'belief-commitment',
  'verdict',
  'pricing',
];

const STEP_LABELS: Record<ApplyStep, string> = {
  welcome: 'Welcome',
  'goals-vision': 'Goals & Vision',
  'current-reality': 'Current Reality',
  'belief-commitment': 'Belief & Commitment',
  verdict: 'Decision',
  pricing: 'Membership',
};

const PROGRESS_STEPS: ApplyStep[] = ['welcome', 'goals-vision', 'current-reality', 'belief-commitment', 'verdict'];

export default function ApplyPage() {
  const navigate = useNavigate();
  const { applyStep, setApplyStep, leadId, leadEmail, setQuestionnaireSubmitted, leadSubmitted } = useApplication();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [goalsData, setGoalsData] = useState({
    mainGoal90Days: '',
    life12Months: '',
    wantBusiness: '',
    improvementArea: '',
  });

  const [realityData, setRealityData] = useState({
    alreadyTried: '',
    whatStopsConsistency: '',
    disciplineRating: '',
    trainingDaysPerWeek: '',
    prayerDaysPerWeek: '',
  });

  const [beliefData, setBeliefData] = useState({
    tryingAlone: '',
    believeBrotherhoodHelps: '',
    costOfStaying: '',
    seriousnessRating: '',
    willingToInvest: '',
    interestedPath: '',
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [applyStep]);

  const goToStep = (step: ApplyStep) => {
    setApplyStep(step);
  };

  const handleSubmitQuestionnaire = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    const allData = { ...goalsData, ...realityData, ...beliefData };
    const result = await submitQuestionnaire(leadId, allData, leadEmail);

    setIsSubmitting(false);

    if (result.success) {
      setQuestionnaireSubmitted(true);
      trackCompleteQuestionnaire(allData);
      goToStep('verdict');
    } else {
      setSubmitError(result.error || 'Failed to submit. Please try again.');
    }
  };

  const progressIndex = PROGRESS_STEPS.indexOf(applyStep);
  const showProgress = applyStep !== 'pricing';
  const progressPercent = progressIndex >= 0 ? ((progressIndex) / (PROGRESS_STEPS.length - 1)) * 100 : 100;

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0B0B0B]/90 backdrop-blur-md border-b border-[#1B1B1B]">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2"
        >
          <img
            src="/images/logos/kingmaker-society-logo-red-metal.jpg"
            alt="Kingmaker Society"
            className="h-8 w-8 rounded object-cover"
          />
          <span className="text-sm font-bold text-white hidden sm:block">Kingmaker Society</span>
        </button>

        {showProgress && (
          <div className="flex-1 max-w-xs mx-6">
            <div className="relative h-1 bg-[#1B1B1B] rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FFC300] to-[#D4A000] rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 text-center mt-1">{STEP_LABELS[applyStep]}</p>
          </div>
        )}

        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-1.5 text-gray-500 hover:text-white transition-colors duration-200 text-sm"
        >
          <X className="w-4 h-4" />
          <span className="hidden sm:block">Exit</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center pt-20 pb-12 px-4">
        {submitError && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-[#D11F2A]/90 border border-[#D11F2A] rounded-xl text-white text-sm backdrop-blur-md">
            {submitError}
          </div>
        )}

        <StepTransition stepKey={applyStep}>
          {applyStep === 'welcome' && (
            <WelcomeStep onContinue={() => goToStep('goals-vision')} />
          )}

          {applyStep === 'goals-vision' && (
            <GoalsVisionStep
              data={goalsData}
              onChange={setGoalsData}
              onContinue={() => goToStep('current-reality')}
              onBack={() => goToStep('welcome')}
            />
          )}

          {applyStep === 'current-reality' && (
            <CurrentRealityStep
              data={realityData}
              onChange={setRealityData}
              onContinue={() => goToStep('belief-commitment')}
              onBack={() => goToStep('goals-vision')}
            />
          )}

          {applyStep === 'belief-commitment' && (
            <BeliefCommitmentStep
              data={beliefData}
              onChange={setBeliefData}
              onContinue={handleSubmitQuestionnaire}
              onBack={() => goToStep('current-reality')}
              isSubmitting={isSubmitting}
            />
          )}

          {applyStep === 'verdict' && (
            <VerdictStep
              onBookCall={() => {}}
              onChooseMembership={() => goToStep('pricing')}
            />
          )}

          {applyStep === 'pricing' && <PricingStep />}
        </StepTransition>
      </main>
    </div>
  );
}
