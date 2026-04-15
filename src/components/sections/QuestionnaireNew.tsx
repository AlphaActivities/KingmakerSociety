import { useState } from 'react';
import { ClipboardList, CheckCircle } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import LuxFadeIn from '../ui/LuxFadeIn';
import Input from '../ui/Input';
import PremiumSelect from '../ui/PremiumSelect';
import Button from '../ui/Button';
import { useApplication } from '../../context/ApplicationContext';
import { submitQuestionnaire } from '../../services/leadService';
import { luxuryScrollToSection } from '../../utils/luxuryScroll';
import { trackCompleteQuestionnaire } from '../../utils/analytics';

export default function Questionnaire() {
  const { leadId, leadSubmitted, setQuestionnaireSubmitted, setApplicationStep } = useApplication();
  const [formData, setFormData] = useState({
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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!leadId) {
      setSubmitError('Please complete the application form first');
      luxuryScrollToSection('hero', 80);
      return;
    }

    setIsSubmitting(true);
    const result = await submitQuestionnaire(leadId, formData);
    setIsSubmitting(false);

    if (result.success) {
      setQuestionnaireSubmitted(true);
      setSubmitSuccess(true);
      setApplicationStep('call-booking');

      trackCompleteQuestionnaire(formData);

      setTimeout(() => {
        luxuryScrollToSection('book-call', 80);
      }, 2000);
    } else {
      setSubmitError(result.error || 'Failed to submit questionnaire');
    }
  };

  if (!leadSubmitted) {
    return (
      <Section id="questionnaire" background="gradient">
        <LuxFadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <Card variant="premium" className="p-12">
              <ClipboardList className="w-16 h-16 text-[#FFC300] mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Complete Step 1 First</h2>
              <p className="text-gray-300 mb-6">
                Please submit your application above to continue to the questionnaire.
              </p>
              <Button variant="secondary" onClick={() => luxuryScrollToSection('hero', 80)}>
                Go to Application Form
              </Button>
            </Card>
          </div>
        </LuxFadeIn>
      </Section>
    );
  }

  if (submitSuccess) {
    return (
      <Section id="questionnaire" background="gradient">
        <LuxFadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <Card variant="gold" className="p-12">
              <CheckCircle className="w-16 h-16 text-[#FFC300] mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Questionnaire Complete!</h2>
              <p className="text-gray-300 mb-4">
                Great work. You're one step closer to joining the brotherhood.
              </p>
              <p className="text-[#FFC300]">Moving to next step...</p>
            </Card>
          </div>
        </LuxFadeIn>
      </Section>
    );
  }

  return (
    <Section id="questionnaire" background="gradient">
      <LuxFadeIn>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#FFC300]/10 border border-[#FFC300]/30 rounded-full mb-6">
            <ClipboardList className="w-4 h-4 text-[#FFC300]" />
            <span className="text-sm font-semibold text-[#FFC300]">Step 2: Application Questions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tell Us About Your Goals
          </h2>
          <p className="text-xl text-gray-300">
            These questions help us understand if Kingmaker Society is the right fit for you.
          </p>
        </div>
      </LuxFadeIn>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
        {submitError && (
          <div className="p-4 bg-[#D11F2A]/10 border border-[#D11F2A]/30 rounded-lg text-[#D11F2A] text-sm">
            {submitError}
          </div>
        )}

        <LuxFadeIn delay={0.1}>
          <Card variant="premium" className="p-8">
            <h3 className="text-2xl font-bold text-[#FFC300] mb-6">Goals & Vision</h3>
            <div className="space-y-4">
              <Input
                label="What is your main goal for the next 90 days?"
                type="text"
                value={formData.mainGoal90Days}
                onChange={(e) => setFormData({ ...formData, mainGoal90Days: e.target.value })}
                required
              />
              <Input
                label="What would your life look like 12 months from now if you stayed consistent?"
                type="text"
                value={formData.life12Months}
                onChange={(e) => setFormData({ ...formData, life12Months: e.target.value })}
                required
              />
              <PremiumSelect
                  label="Do you want to build your own business or income path one day?"
                  placeholder="Select one"
                  options={[
                    { value: 'yes', label: 'Yes', description: 'I want to build something of my own' },
                    { value: 'no', label: 'No', description: 'I am focused on other goals right now' },
                    { value: 'unsure', label: 'Unsure', description: "I haven't decided yet" },
                  ]}
                  value={formData.wantBusiness}
                  onChange={(val) => setFormData({ ...formData, wantBusiness: val })}
                  required
                />
              <PremiumSelect
                  label="Which area do you want the most improvement in?"
                  placeholder="Select one"
                  options={[
                    { value: 'fitness', label: 'Fitness', description: 'Strength, physique, and athletic performance' },
                    { value: 'faith', label: 'Faith', description: 'Spiritual growth and connection to God' },
                    { value: 'health', label: 'Health', description: 'Nutrition, recovery, and long-term vitality' },
                    { value: 'goals', label: 'Goals', description: 'Clarity, direction, and executing on your vision' },
                    { value: 'business', label: 'Business', description: 'Building income and entrepreneurial skills' },
                  ]}
                  value={formData.improvementArea}
                  onChange={(val) => setFormData({ ...formData, improvementArea: val })}
                  required
                />
            </div>
          </Card>
        </LuxFadeIn>

        <LuxFadeIn delay={0.2}>
          <Card variant="premium" className="p-8">
            <h3 className="text-2xl font-bold text-[#FFC300] mb-6">Current Reality</h3>
            <div className="space-y-4">
              <Input
                label="What have you already tried to reach your goals?"
                type="text"
                value={formData.alreadyTried}
                onChange={(e) => setFormData({ ...formData, alreadyTried: e.target.value })}
                required
              />
              <Input
                label="What keeps stopping you from being consistent?"
                type="text"
                value={formData.whatStopsConsistency}
                onChange={(e) => setFormData({ ...formData, whatStopsConsistency: e.target.value })}
                required
              />
              <PremiumSelect
                  label="Rate your current discipline from 1 to 10"
                  placeholder="Select a rating"
                  options={[
                    { value: '1', label: '1 — Barely started', description: 'Little to no consistent habits yet' },
                    { value: '2', label: '2 — Struggling', description: 'Inconsistent, more misses than wins' },
                    { value: '3', label: '3 — Below average', description: 'Some effort but lacking structure' },
                    { value: '4', label: '4 — Getting there', description: 'Occasional wins, still inconsistent' },
                    { value: '5', label: '5 — Average', description: 'Half and half — room to level up' },
                    { value: '6', label: '6 — Above average', description: 'Mostly consistent with some gaps' },
                    { value: '7', label: '7 — Solid', description: 'Strong habits, occasional slip-ups' },
                    { value: '8', label: '8 — Very disciplined', description: 'High output, rare misses' },
                    { value: '9', label: '9 — Elite', description: 'Near-daily execution on commitments' },
                    { value: '10', label: '10 — Locked in', description: 'No excuses, full accountability every day' },
                  ]}
                  value={formData.disciplineRating}
                  onChange={(val) => setFormData({ ...formData, disciplineRating: val })}
                  required
                />
              <PremiumSelect
                  label="How many days per week are you currently training?"
                  placeholder="Select days per week"
                  options={[
                    { value: '0', label: '0 days', description: 'Not training yet' },
                    { value: '1', label: '1 day', description: 'Just getting started' },
                    { value: '2', label: '2 days', description: 'Light schedule' },
                    { value: '3', label: '3 days', description: 'Moderate consistency' },
                    { value: '4', label: '4 days', description: 'Solid training week' },
                    { value: '5', label: '5 days', description: 'Strong commitment' },
                    { value: '6', label: '6 days', description: 'High frequency' },
                    { value: '7', label: '7 days', description: 'Every single day' },
                  ]}
                  value={formData.trainingDaysPerWeek}
                  onChange={(val) => setFormData({ ...formData, trainingDaysPerWeek: val })}
                  required
                />
              <PremiumSelect
                  label="How many days per week are you currently reading scripture or praying?"
                  placeholder="Select days per week"
                  options={[
                    { value: '0', label: '0 days', description: 'Not yet practicing' },
                    { value: '1', label: '1 day', description: 'Occasionally' },
                    { value: '2', label: '2 days', description: 'A couple times a week' },
                    { value: '3', label: '3 days', description: 'Several times a week' },
                    { value: '4', label: '4 days', description: 'More than half the week' },
                    { value: '5', label: '5 days', description: 'Most days' },
                    { value: '6', label: '6 days', description: 'Nearly every day' },
                    { value: '7', label: '7 days', description: 'Daily practice' },
                  ]}
                  value={formData.prayerDaysPerWeek}
                  onChange={(val) => setFormData({ ...formData, prayerDaysPerWeek: val })}
                  required
                />
            </div>
          </Card>
        </LuxFadeIn>

        <LuxFadeIn delay={0.3}>
          <Card variant="premium" className="p-8">
            <h3 className="text-2xl font-bold text-[#FFC300] mb-6">Belief & Commitment</h3>
            <div className="space-y-4">
              <PremiumSelect
                  label="Have you been trying to do this alone?"
                  placeholder="Select one"
                  options={[
                    { value: 'yes', label: 'Yes', description: 'No accountability or brotherhood' },
                    { value: 'no', label: 'No', description: 'I have some support in my corner' },
                  ]}
                  value={formData.tryingAlone}
                  onChange={(val) => setFormData({ ...formData, tryingAlone: val })}
                  required
                />
              <PremiumSelect
                  label="Do you believe a structured brotherhood and accountability would accelerate your results?"
                  placeholder="Select one"
                  options={[
                    { value: 'yes', label: 'Yes', description: 'Brotherhood and structure would make a real difference for my life' },
                    { value: 'no', label: 'No', description: 'I think I can get there on my own' },
                  ]}
                  value={formData.believeBrotherhoodHelps}
                  onChange={(val) => setFormData({ ...formData, believeBrotherhoodHelps: val })}
                  required
                />
              <Input
                label="What is the cost of staying where you are for another year?"
                type="text"
                value={formData.costOfStaying}
                onChange={(e) => setFormData({ ...formData, costOfStaying: e.target.value })}
                required
              />
              <PremiumSelect
                  label="How serious are you about changing your life right now? (1-10)"
                  placeholder="Select a rating"
                  options={[
                    { value: '1', label: '1 — Just curious', description: 'Exploring, not fully committed yet' },
                    { value: '2', label: '2 — Thinking about it', description: 'Interested but not ready to act' },
                    { value: '3', label: '3 — Somewhat serious', description: 'Want change but hesitant' },
                    { value: '4', label: '4 — Getting motivated', description: 'Starting to feel the urgency' },
                    { value: '5', label: '5 — Serious', description: 'Ready to make moves soon' },
                    { value: '6', label: '6 — Very serious', description: 'Actively looking for a solution' },
                    { value: '7', label: '7 — Committed', description: 'I know I need to change now' },
                    { value: '8', label: '8 — Highly committed', description: 'This is a top priority for me' },
                    { value: '9', label: '9 — All in', description: "I'm ready to invest and execute" },
                    { value: '10', label: '10 — No going back', description: 'I am fully committed — let\'s go' },
                  ]}
                  value={formData.seriousnessRating}
                  onChange={(val) => setFormData({ ...formData, seriousnessRating: val })}
                  required
                />
              <PremiumSelect
                  label="If accepted, are you willing to invest in mentorship and accountability?"
                  placeholder="Select one"
                  options={[
                    { value: 'yes', label: 'Yes', description: 'I am ready to invest in my growth' },
                    { value: 'no', label: 'No', description: 'Not at this time' },
                    { value: 'depends', label: 'Depends', description: 'Need more information first' },
                  ]}
                  value={formData.willingToInvest}
                  onChange={(val) => setFormData({ ...formData, willingToInvest: val })}
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
                  onChange={(val) => setFormData({ ...formData, interestedPath: val })}
                  required
                />
            </div>
          </Card>
        </LuxFadeIn>

        <LuxFadeIn delay={0.4}>
          <Card variant="gold" className="p-8 text-center">
            <Button type="submit" variant="secondary" size="lg" className="w-full md:w-auto px-12" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Questionnaire'}
            </Button>
            <p className="text-gray-300 mt-4">
              After submission, we'll guide you to book a call or choose your membership tier.
            </p>
          </Card>
        </LuxFadeIn>
      </form>
    </Section>
  );
}
