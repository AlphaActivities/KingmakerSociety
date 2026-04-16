import { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Input from '../ui/Input';
import PremiumSelect from '../ui/PremiumSelect';
import Button from '../ui/Button';
import { useApplication } from '../../context/ApplicationContext';
import { submitQuestionnaire } from '../../services/leadService';
import { trackCompleteQuestionnaire } from '../../utils/analytics';

const INITIAL_FORM = {
  mainGoal90Days: '',
  life12Months: '',
  wantBusiness: '',
  improvementArea: '',
  alreadyTried: '',
  whatStopsConsistency: '',
  disciplineRating: '',
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
  { value: '0', label: '0 days', description: 'Not yet' },
  { value: '1', label: '1 day', description: 'Just starting' },
  { value: '2', label: '2 days', description: 'Light' },
  { value: '3', label: '3 days', description: 'Moderate' },
  { value: '4', label: '4 days', description: 'Solid' },
  { value: '5', label: '5 days', description: 'Strong' },
  { value: '6', label: '6 days', description: 'High frequency' },
  { value: '7', label: '7 days', description: 'Every day' },
];

const RATING_10_OPTIONS = (labels: string[]) =>
  Array.from({ length: 10 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1} — ${labels[i]}`,
    description: '',
  }));

const DISCIPLINE_LABELS = [
  'Barely started', 'Struggling', 'Below average', 'Getting there', 'Average',
  'Above average', 'Solid', 'Very disciplined', 'Elite', 'Locked in',
];

const SERIOUSNESS_LABELS = [
  'Just curious', 'Thinking about it', 'Somewhat serious', 'Getting motivated', 'Serious',
  'Very serious', 'Committed', 'Highly committed', 'All in', 'No going back',
];

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function FormSection({ title, children }: SectionProps) {
  return (
    <div className="bg-white/3 border border-white/8 rounded-2xl p-6 space-y-5">
      <h3 className="text-xs font-bold tracking-[0.2em] text-[#FFC300]/70 uppercase">{title}</h3>
      {children}
    </div>
  );
}

export default function ApplyQuestionnaire() {
  const { applicationToken, setQuestionnaireSubmitted, setApplicationStep } = useApplication();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const set = (key: keyof typeof INITIAL_FORM) => (val: string) =>
    setFormData((prev) => ({ ...prev, [key]: val }));

  const setInput = (key: keyof typeof INITIAL_FORM) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!applicationToken) {
      setSubmitError('Session expired. Please restart your application.');
      return;
    }

    setIsSubmitting(true);
    const result = await submitQuestionnaire(applicationToken, formData);
    setIsSubmitting(false);

    if (result.success) {
      setQuestionnaireSubmitted(true);
      setSubmitSuccess(true);
      trackCompleteQuestionnaire(formData);

      setTimeout(() => {
        setApplicationStep('call-booking');
      }, 1200);
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
        <div className="flex space-x-1">
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

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
          Your Goals
        </h1>
        <p className="text-gray-400 text-base leading-relaxed max-w-md mx-auto">
          Be honest. These answers help us determine the best path for you.
        </p>
      </div>

      {submitError && (
        <div className="p-4 bg-[#D11F2A]/10 border border-[#D11F2A]/30 rounded-xl text-[#D11F2A] text-sm">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormSection title="Vision">
          <Input
            label="What is your main goal for the next 90 days?"
            type="text"
            value={formData.mainGoal90Days}
            onChange={setInput('mainGoal90Days')}
            required
          />
          <Input
            label="What would your life look like 12 months from now if you stayed consistent?"
            type="text"
            value={formData.life12Months}
            onChange={setInput('life12Months')}
            required
          />
          <PremiumSelect
            label="Do you want to build your own business or income path one day?"
            placeholder="Select one"
            options={[
              { value: 'yes', label: 'Yes', description: 'I want to build something of my own' },
              { value: 'no', label: 'No', description: 'Focused on other goals right now' },
              { value: 'unsure', label: 'Unsure', description: "Haven't decided yet" },
            ]}
            value={formData.wantBusiness}
            onChange={set('wantBusiness')}
            required
          />
          <PremiumSelect
            label="Which area do you want the most improvement in?"
            placeholder="Select one"
            options={[
              { value: 'fitness', label: 'Fitness', description: 'Strength, physique, athletic performance' },
              { value: 'faith', label: 'Faith', description: 'Spiritual growth and connection to God' },
              { value: 'health', label: 'Health', description: 'Nutrition, recovery, and long-term vitality' },
              { value: 'goals', label: 'Goals', description: 'Clarity, direction, and executing on your vision' },
              { value: 'business', label: 'Business', description: 'Building income and entrepreneurial skills' },
            ]}
            value={formData.improvementArea}
            onChange={set('improvementArea')}
            required
          />
        </FormSection>

        <FormSection title="Current Reality">
          <Input
            label="What have you already tried to reach your goals?"
            type="text"
            value={formData.alreadyTried}
            onChange={setInput('alreadyTried')}
            required
          />
          <Input
            label="What keeps stopping you from being consistent?"
            type="text"
            value={formData.whatStopsConsistency}
            onChange={setInput('whatStopsConsistency')}
            required
          />
          <PremiumSelect
            label="Rate your current discipline (1–10)"
            placeholder="Select a rating"
            options={RATING_10_OPTIONS(DISCIPLINE_LABELS)}
            value={formData.disciplineRating}
            onChange={set('disciplineRating')}
            required
          />
          <PremiumSelect
            label="How many days per week are you currently training?"
            placeholder="Select days per week"
            options={DAYS_OPTIONS}
            value={formData.trainingDaysPerWeek}
            onChange={set('trainingDaysPerWeek')}
            required
          />
          <PremiumSelect
            label="How many days per week are you reading scripture or praying?"
            placeholder="Select days per week"
            options={DAYS_OPTIONS}
            value={formData.prayerDaysPerWeek}
            onChange={set('prayerDaysPerWeek')}
            required
          />
        </FormSection>

        <FormSection title="Commitment">
          <PremiumSelect
            label="Have you been trying to do this alone?"
            placeholder="Select one"
            options={[
              { value: 'yes', label: 'Yes', description: 'No accountability or brotherhood' },
              { value: 'no', label: 'No', description: 'I have some support' },
            ]}
            value={formData.tryingAlone}
            onChange={set('tryingAlone')}
            required
          />
          <PremiumSelect
            label="Would a structured brotherhood and accountability accelerate your results?"
            placeholder="Select one"
            options={[
              { value: 'yes', label: 'Yes', description: 'Brotherhood and structure would make a real difference' },
              { value: 'no', label: 'No', description: 'I think I can get there on my own' },
            ]}
            value={formData.believeBrotherhoodHelps}
            onChange={set('believeBrotherhoodHelps')}
            required
          />
          <Input
            label="What is the cost of staying where you are for another year?"
            type="text"
            value={formData.costOfStaying}
            onChange={setInput('costOfStaying')}
            required
          />
          <PremiumSelect
            label="How serious are you about changing your life right now? (1–10)"
            placeholder="Select a rating"
            options={RATING_10_OPTIONS(SERIOUSNESS_LABELS)}
            value={formData.seriousnessRating}
            onChange={set('seriousnessRating')}
            required
          />
          <PremiumSelect
            label="If accepted, are you willing to invest in mentorship and accountability?"
            placeholder="Select one"
            options={[
              { value: 'yes', label: 'Yes', description: 'Ready to invest in my growth' },
              { value: 'no', label: 'No', description: 'Not at this time' },
              { value: 'depends', label: 'Depends', description: 'Need more information first' },
            ]}
            value={formData.willingToInvest}
            onChange={set('willingToInvest')}
            required
          />
          <PremiumSelect
            label="Which path are you most interested in?"
            placeholder="Select one"
            options={[
              { value: 'community', label: 'Brotherhood Community', description: 'Access to the brotherhood and shared accountability' },
              { value: 'guided', label: 'Guided Growth', description: 'Small group mentorship with structured programming' },
              { value: 'vip', label: 'VIP Mentorship', description: '1-on-1 support with direct access to leadership' },
            ]}
            value={formData.interestedPath}
            onChange={set('interestedPath')}
            required
          />
        </FormSection>

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
              <span>Submit & Continue</span>
              <ArrowRight className="w-5 h-5" />
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}
