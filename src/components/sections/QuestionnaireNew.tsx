import { useState } from 'react';
import { ClipboardList, CheckCircle } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import LuxFadeIn from '../ui/LuxFadeIn';
import Input from '../ui/Input';
import Select from '../ui/Select';
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
              <Select
                label="Do you want to build your own business or income path one day?"
                options={[
                  { value: '', label: 'Select one' },
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                  { value: 'unsure', label: 'Unsure' },
                ]}
                value={formData.wantBusiness}
                onChange={(e) => setFormData({ ...formData, wantBusiness: e.target.value })}
                required
              />
              <Select
                label="Which area do you want the most improvement in?"
                options={[
                  { value: '', label: 'Select one' },
                  { value: 'fitness', label: 'Fitness' },
                  { value: 'faith', label: 'Faith' },
                  { value: 'health', label: 'Health' },
                  { value: 'goals', label: 'Goals' },
                  { value: 'business', label: 'Business' },
                ]}
                value={formData.improvementArea}
                onChange={(e) => setFormData({ ...formData, improvementArea: e.target.value })}
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
              <Select
                label="Rate your current discipline from 1 to 10"
                options={Array.from({ length: 11 }, (_, i) => ({ value: i.toString(), label: i.toString() }))}
                value={formData.disciplineRating}
                onChange={(e) => setFormData({ ...formData, disciplineRating: e.target.value })}
                required
              />
              <Select
                label="How many days per week are you currently training?"
                options={Array.from({ length: 8 }, (_, i) => ({ value: i.toString(), label: i.toString() }))}
                value={formData.trainingDaysPerWeek}
                onChange={(e) => setFormData({ ...formData, trainingDaysPerWeek: e.target.value })}
                required
              />
              <Select
                label="How many days per week are you currently reading scripture or praying?"
                options={Array.from({ length: 8 }, (_, i) => ({ value: i.toString(), label: i.toString() }))}
                value={formData.prayerDaysPerWeek}
                onChange={(e) => setFormData({ ...formData, prayerDaysPerWeek: e.target.value })}
                required
              />
            </div>
          </Card>
        </LuxFadeIn>

        <LuxFadeIn delay={0.3}>
          <Card variant="premium" className="p-8">
            <h3 className="text-2xl font-bold text-[#FFC300] mb-6">Belief & Commitment</h3>
            <div className="space-y-4">
              <Select
                label="Have you been trying to do this alone?"
                options={[
                  { value: '', label: 'Select one' },
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ]}
                value={formData.tryingAlone}
                onChange={(e) => setFormData({ ...formData, tryingAlone: e.target.value })}
                required
              />
              <Select
                label="Do you believe a structured brotherhood and accountability would accelerate your results?"
                options={[
                  { value: '', label: 'Select one' },
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ]}
                value={formData.believeBrotherhoodHelps}
                onChange={(e) => setFormData({ ...formData, believeBrotherhoodHelps: e.target.value })}
                required
              />
              <Input
                label="What is the cost of staying where you are for another year?"
                type="text"
                value={formData.costOfStaying}
                onChange={(e) => setFormData({ ...formData, costOfStaying: e.target.value })}
                required
              />
              <Select
                label="How serious are you about changing your life right now? (1-10)"
                options={Array.from({ length: 11 }, (_, i) => ({ value: i.toString(), label: i.toString() }))}
                value={formData.seriousnessRating}
                onChange={(e) => setFormData({ ...formData, seriousnessRating: e.target.value })}
                required
              />
              <Select
                label="If accepted, are you willing to invest in mentorship and accountability?"
                options={[
                  { value: '', label: 'Select one' },
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                  { value: 'depends', label: 'Depends' },
                ]}
                value={formData.willingToInvest}
                onChange={(e) => setFormData({ ...formData, willingToInvest: e.target.value })}
                required
              />
              <Select
                label="Which path are you most interested in?"
                options={[
                  { value: '', label: 'Select one' },
                  { value: 'community', label: 'Brotherhood community only' },
                  { value: 'guided', label: 'Guided growth with small group mentorship' },
                  { value: 'vip', label: 'VIP mentorship with 1-on-1 support' },
                ]}
                value={formData.interestedPath}
                onChange={(e) => setFormData({ ...formData, interestedPath: e.target.value })}
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
