import { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import Input from '../ui/Input';
import PremiumSelect from '../ui/PremiumSelect';
import Button from '../ui/Button';
import { useApplication } from '../../context/ApplicationContext';
import { submitQuestionnaire } from '../../services/leadService';
import { trackCompleteQuestionnaire } from '../../utils/analytics';

type FormData = {
  mainGoal90Days: string;
  life12Months: string;
  wantBusiness: string;
  improvementArea: string;
  alreadyTried: string;
  whatStopsConsistency: string;
  disciplineRating: string;
  currentlyTrains: string;
  trainingDaysPerWeek: string;
  prayerDaysPerWeek: string;
  tryingAlone: string;
  believeBrotherhoodHelps: string;
  costOfStaying: string;
  seriousnessRating: string;
  willingToInvest: string;
  interestedPath: string;
};

const INITIAL_FORM: FormData = {
  mainGoal90Days: '',
  life12Months: '',
  wantBusiness: '',
  improvementArea: '',
  alreadyTried: '',
  whatStopsConsistency: '',
  disciplineRating: '',
  currentlyTrains: '',
  trainingDaysPerWeek: '',
  prayerDaysPerWeek: '',
  tryingAlone: '',
  believeBrotherhoodHelps: '',
  costOfStaying: '',
  seriousnessRating: '',
  willingToInvest: '',
  interestedPath: '',
};

const DAYS_OPTIONS = [
  { value: '0', label: '0 days' },
  { value: '1', label: '1 day' },
  { value: '2', label: '2 days' },
  { value: '3', label: '3 days' },
  { value: '4', label: '4 days' },
  { value: '5', label: '5 days' },
  { value: '6', label: '6 days' },
  { value: '7', label: '7 days' },
];

const CURRENTLY_TRAINS_OPTIONS = [
  { value: 'yes-consistently', label: 'Yes, consistently' },
  { value: 'occasionally', label: 'Occasionally' },
  { value: 'no-ready-to-start', label: 'No, but I\'m ready to start' },
];

const DISCIPLINE_OPTIONS = [
  { value: '1', label: '1, Barely started' },
  { value: '2', label: '2, Struggling' },
  { value: '3', label: '3, Below average' },
  { value: '4', label: '4, Getting there' },
  { value: '5', label: '5, Average' },
  { value: '6', label: '6, Above average' },
  { value: '7', label: '7, Solid' },
  { value: '8', label: '8, Very disciplined' },
  { value: '9', label: '9, Elite' },
  { value: '10', label: '10, Locked in' },
];

const SERIOUSNESS_OPTIONS = [
  { value: '1', label: '1, Just curious' },
  { value: '2', label: '2, Thinking about it' },
  { value: '3', label: '3, Somewhat serious' },
  { value: '4', label: '4, Getting motivated' },
  { value: '5', label: '5, Serious' },
  { value: '6', label: '6, Very serious' },
  { value: '7', label: '7, Committed' },
  { value: '8', label: '8, Highly committed' },
  { value: '9', label: '9, All in' },
  { value: '10', label: '10, No going back' },
];

const SCREEN_COUNT = 3;
type ScreenKey = 0 | 1 | 2;

const SCREENS: { title: string; subtitle: string }[] = [
  { title: 'Your Standard', subtitle: 'What kind of man are you trying to become?' },
  { title: 'Current State', subtitle: 'Where are you falling short right now?' },
  { title: 'Your Commitment', subtitle: 'Are you ready to move?' },
];

type ScreenError = Partial<Record<keyof FormData, string>>;

function validateScreen(screen: ScreenKey, form: FormData): ScreenError {
  const errors: ScreenError = {};
  if (screen === 0) {
    if (!form.mainGoal90Days.trim()) errors.mainGoal90Days = 'Required';
    if (!form.life12Months.trim()) errors.life12Months = 'Required';
    if (!form.improvementArea) errors.improvementArea = 'Required';
  }
  if (screen === 1) {
    if (!form.alreadyTried.trim()) errors.alreadyTried = 'Required';
    if (!form.whatStopsConsistency.trim()) errors.whatStopsConsistency = 'Required';
    if (!form.disciplineRating) errors.disciplineRating = 'Required';
    if (!form.currentlyTrains) errors.currentlyTrains = 'Required';
    if (!form.trainingDaysPerWeek) errors.trainingDaysPerWeek = 'Required';
    if (!form.prayerDaysPerWeek) errors.prayerDaysPerWeek = 'Required';
  }
  if (screen === 2) {
    if (!form.tryingAlone) errors.tryingAlone = 'Required';
    if (!form.believeBrotherhoodHelps) errors.believeBrotherhoodHelps = 'Required';
    if (!form.costOfStaying.trim()) errors.costOfStaying = 'Required';
    if (!form.seriousnessRating) errors.seriousnessRating = 'Required';
    if (!form.willingToInvest) errors.willingToInvest = 'Required';
    if (!form.interestedPath) errors.interestedPath = 'Required';
  }
  return errors;
}

interface ScreenProps {
  form: FormData;
  errors: ScreenError;
  set: (key: keyof FormData) => (val: string) => void;
  setInput: (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ScreenVision({ form, errors, set, setInput }: ScreenProps) {
  return (
    <div className="space-y-5">
      <Input
        label="What is your main goal for the next 90 days?"
        type="text"
        placeholder="Be specific"
        value={form.mainGoal90Days}
        onChange={setInput('mainGoal90Days')}
        error={errors.mainGoal90Days}
        required
      />
      <Input
        label="What would your life look like 12 months from now if you stayed consistent?"
        type="text"
        placeholder="Describe it clearly"
        value={form.life12Months}
        onChange={setInput('life12Months')}
        error={errors.life12Months}
        required
      />
      <PremiumSelect
        label="Which area do you want the most improvement in?"
        placeholder="Select one"
        options={[
          { value: 'fitness', label: 'Fitness', description: 'Strength, physique, athletic performance' },
          { value: 'faith', label: 'Faith', description: 'Spiritual growth and connection to God' },
          { value: 'health', label: 'Health', description: 'Nutrition, recovery, and long-term vitality' },
          { value: 'discipline', label: 'Discipline', description: 'Clarity, direction, and executing on your vision' },
          { value: 'physical-strength', label: 'Physical Strength & Conditioning', description: 'Building a stronger, harder body' },
        ]}
        value={form.improvementArea}
        onChange={set('improvementArea')}
        error={errors.improvementArea}
        required
      />
    </div>
  );
}

function ScreenReality({ form, errors, set, setInput }: ScreenProps) {
  return (
    <div className="space-y-5">
      <Input
        label="What have you already tried to reach your goals?"
        type="text"
        placeholder="Programs, approaches, habits..."
        value={form.alreadyTried}
        onChange={setInput('alreadyTried')}
        error={errors.alreadyTried}
        required
      />
      <Input
        label="What keeps stopping you from being consistent?"
        type="text"
        placeholder="Be honest"
        value={form.whatStopsConsistency}
        onChange={setInput('whatStopsConsistency')}
        error={errors.whatStopsConsistency}
        required
      />
      <PremiumSelect
        label="Rate your current level of discipline (1–10)"
        placeholder="Select a rating"
        options={DISCIPLINE_OPTIONS}
        value={form.disciplineRating}
        onChange={set('disciplineRating')}
        error={errors.disciplineRating}
        required
      />
      <PremiumSelect
        label="Do you currently train (gym, martial arts, or other)?"
        placeholder="Select one"
        options={CURRENTLY_TRAINS_OPTIONS}
        value={form.currentlyTrains}
        onChange={set('currentlyTrains')}
        error={errors.currentlyTrains}
        required
      />
      <PremiumSelect
        label="How many days per week are you currently training?"
        placeholder="Select days"
        options={DAYS_OPTIONS}
        value={form.trainingDaysPerWeek}
        onChange={set('trainingDaysPerWeek')}
        error={errors.trainingDaysPerWeek}
        required
      />
      <PremiumSelect
        label="How many days per week are you reading scripture or praying?"
        placeholder="Select days"
        options={DAYS_OPTIONS}
        value={form.prayerDaysPerWeek}
        onChange={set('prayerDaysPerWeek')}
        error={errors.prayerDaysPerWeek}
        required
      />
    </div>
  );
}

function ScreenCommitment({ form, errors, set, setInput }: ScreenProps) {
  return (
    <div className="space-y-5">
      <PremiumSelect
        label="Have you been trying to figure this out alone?"
        placeholder="Select one"
        options={[
          { value: 'yes', label: 'Yes', description: 'No accountability or brotherhood' },
          { value: 'no', label: 'No', description: 'I have some support already' },
        ]}
        value={form.tryingAlone}
        onChange={set('tryingAlone')}
        error={errors.tryingAlone}
        required
      />
      <PremiumSelect
        label="Are you actually willing to follow through on this?"
        placeholder="Select one"
        options={[
          { value: 'yes', label: 'Yes', description: 'Brotherhood and structure would make a real difference' },
          { value: 'no', label: 'No', description: 'I think I can get there on my own' },
        ]}
        value={form.believeBrotherhoodHelps}
        onChange={set('believeBrotherhoodHelps')}
        error={errors.believeBrotherhoodHelps}
        required
      />
      <Input
        label="What is the real cost of staying where you are for another year?"
        type="text"
        placeholder="Think about it honestly"
        value={form.costOfStaying}
        onChange={setInput('costOfStaying')}
        error={errors.costOfStaying}
        required
      />
      <PremiumSelect
        label="How serious are you about changing your life right now? (1–10)"
        placeholder="Select a rating"
        options={SERIOUSNESS_OPTIONS}
        value={form.seriousnessRating}
        onChange={set('seriousnessRating')}
        error={errors.seriousnessRating}
        required
      />
      <PremiumSelect
        label="If accepted, are you ready to invest in your growth?"
        placeholder="Select one"
        options={[
          { value: 'yes', label: 'Yes', description: 'Ready to invest in mentorship and accountability' },
          { value: 'no', label: 'No', description: 'Not at this time' },
          { value: 'depends', label: 'Depends', description: 'Need more information first' },
        ]}
        value={form.willingToInvest}
        onChange={set('willingToInvest')}
        error={errors.willingToInvest}
        required
      />
      <PremiumSelect
        label="Which path interests you most?"
        placeholder="Select one"
        options={[
          { value: 'accountability', label: 'Accountability & Pressure', description: 'Shared accountability and brotherhood access' },
          { value: 'brotherhood', label: 'Structured Brotherhood', description: 'Small group mentorship with structured programming' },
          { value: 'vip', label: 'VIP Mentorship', description: '1-on-1 direct access to leadership' },
        ]}
        value={form.interestedPath}
        onChange={set('interestedPath')}
        error={errors.interestedPath}
        required
      />
    </div>
  );
}

export default function ApplyQuestionnaire() {
  const { applicationToken, setQuestionnaireSubmitted, setApplicationStep } = useApplication();
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [screen, setScreen] = useState<ScreenKey>(0);
  const [errors, setErrors] = useState<ScreenError>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  if (!applicationToken) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6 text-center">
        <div className="w-14 h-14 rounded-full bg-[#D11F2A]/10 border border-[#D11F2A]/30 flex items-center justify-center mx-auto">
          <span className="text-[#D11F2A] text-2xl font-bold">!</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Session Expired</h2>
          <p className="text-gray-400 text-sm max-w-xs mx-auto">
            Your session could not be verified. Please start your application from the beginning.
          </p>
        </div>
        <Button variant="outline" size="md" onClick={() => setApplicationStep('lead-form')}>
          Restart Application
        </Button>
      </div>
    );
  }

  const set = (key: keyof FormData) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const setInput = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleNext = () => {
    const errs = validateScreen(screen, form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setScreen((s) => (s + 1) as ScreenKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setErrors({});
    setScreen((s) => (s - 1) as ScreenKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateScreen(screen, form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    const result = await submitQuestionnaire(applicationToken, form);
    setIsSubmitting(false);

    if (result.success) {
      setQuestionnaireSubmitted(true);
      setSubmitSuccess(true);
      trackCompleteQuestionnaire(form);

      setTimeout(() => {
        setApplicationStep('call-booking');
      }, 1400);
    } else {
      setSubmitError(result.error || 'Failed to submit. Please try again.');
    }
  };

  if (submitSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-[#FFC300]/20 rounded-full blur-xl scale-150" />
          <CheckCircle className="relative w-16 h-16 text-[#FFC300]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Goals Recorded</h2>
          <p className="text-gray-400 text-sm">Preparing your final step...</p>
        </div>
        <div className="flex space-x-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#FFC300]/60 animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    );
  }

  const screenInfo = SCREENS[screen];
  const isLastScreen = screen === SCREEN_COUNT - 1;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 mb-8">
        <div className="flex items-center justify-center space-x-1.5 mb-4">
          {Array.from({ length: SCREEN_COUNT }, (_, i) => (
            <div
              key={i}
              className={[
                'h-0.5 rounded-full transition-all duration-500',
                i === 0 ? 'w-10' : 'w-8',
                i <= screen ? 'bg-[#FFC300]' : 'bg-white/10',
              ].join(' ')}
            />
          ))}
          <span className="text-[11px] text-white/25 font-medium tracking-widest ml-2 uppercase">
            {screen + 1} / {SCREEN_COUNT}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
          {screenInfo.title}
        </h1>
        <p className="text-gray-400 text-base">{screenInfo.subtitle}</p>
      </div>

      {submitError && (
        <div className="p-4 bg-[#D11F2A]/10 border border-[#D11F2A]/30 rounded-xl text-[#D11F2A] text-sm">
          {submitError}
        </div>
      )}

      <div key={screen} className="fade-in">
        <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
          {screen === 0 && <ScreenVision form={form} errors={errors} set={set} setInput={setInput} />}
          {screen === 1 && <ScreenReality form={form} errors={errors} set={set} setInput={setInput} />}
          {screen === 2 && <ScreenCommitment form={form} errors={errors} set={set} setInput={setInput} />}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {screen > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center space-x-2 px-5 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all duration-200 text-sm font-medium shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        )}
        {isLastScreen ? (
          <form onSubmit={handleSubmit} className="flex-1">
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <span className="flex items-center space-x-2">
                  <span>Continue Forward</span>
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>
        ) : (
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="flex-1"
            onClick={handleNext}
          >
            <span className="flex items-center space-x-2">
              <span>Keep Moving Forward</span>
              <ArrowRight className="w-5 h-5" />
            </span>
          </Button>
        )}
      </div>
    </div>
  );
}
