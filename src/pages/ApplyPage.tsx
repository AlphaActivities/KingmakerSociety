import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, ArrowRight, CheckCircle, Calendar } from 'lucide-react';
import Input from '../components/ui/Input';
import PremiumSelect from '../components/ui/PremiumSelect';
import TimezoneSelect from '../components/ui/TimezoneSelect';
import Button from '../components/ui/Button';
import { submitLead, submitQuestionnaire } from '../services/leadService';
import { validateLeadForm, ValidationError } from '../utils/validation';
import { trackBeginApplication, trackCompleteLeadForm, trackCompleteQuestionnaire } from '../utils/analytics';
import StageIntro from '../components/apply/StageIntro';
import StageProgress from '../components/apply/StageProgress';
import StageComplete from '../components/apply/StageComplete';

export type WizardStage =
  | 'intro'
  | 'identity'
  | 'vision'
  | 'reality'
  | 'commitment'
  | 'complete';

const STAGES: WizardStage[] = ['intro', 'identity', 'vision', 'reality', 'commitment', 'complete'];

const STAGE_META: Record<WizardStage, { label: string; subtitle: string; step: number }> = {
  intro:      { label: 'Welcome', subtitle: 'Your journey begins here', step: 0 },
  identity:   { label: 'Your Identity', subtitle: 'Tell us who you are', step: 1 },
  vision:     { label: 'Your Vision', subtitle: 'Where are you going?', step: 2 },
  reality:    { label: 'Your Reality', subtitle: 'Where are you now?', step: 3 },
  commitment: { label: 'Your Commitment', subtitle: 'Are you ready?', step: 4 },
  complete:   { label: 'Complete', subtitle: "You're in the arena", step: 5 },
};

export default function ApplyPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<WizardStage>('intro');
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [leadId, setLeadId] = useState<string | null>(null);
  const [formStarted, setFormStarted] = useState(false);

  const [identity, setIdentity] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    age: '', timezone: '', occupation: '', struggle: '',
  });
  const [identityErrors, setIdentityErrors] = useState<ValidationError>({});
  const [identitySubmitting, setIdentitySubmitting] = useState(false);
  const [identityError, setIdentityError] = useState('');

  const [vision, setVision] = useState({
    mainGoal90Days: '',
    life12Months: '',
    wantBusiness: '',
    improvementArea: '',
  });

  const [reality, setReality] = useState({
    alreadyTried: '',
    whatStopsConsistency: '',
    disciplineRating: '',
    trainingDaysPerWeek: '',
    prayerDaysPerWeek: '',
  });

  const [commitment, setCommitment] = useState({
    tryingAlone: '',
    believeBrotherhoodHelps: '',
    costOfStaying: '',
    seriousnessRating: '',
    willingToInvest: '',
    interestedPath: '',
  });
  const [commitSubmitting, setCommitSubmitting] = useState(false);
  const [commitError, setCommitError] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [stage]);

  const transitionTo = (next: WizardStage, dir: 'forward' | 'back' = 'forward') => {
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setStage(next);
      setAnimating(false);
    }, 320);
  };

  const handleIdentitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIdentityError('');
    const errors = validateLeadForm(identity);
    if (Object.keys(errors).length > 0) {
      setIdentityErrors(errors);
      return;
    }
    setIdentitySubmitting(true);
    const result = await submitLead(identity);
    setIdentitySubmitting(false);
    if (result.success && result.leadId) {
      setLeadId(result.leadId);
      trackCompleteLeadForm({ name: `${identity.firstName} ${identity.lastName}`, email: identity.email });
      transitionTo('vision');
    } else {
      setIdentityError(result.error || 'Something went wrong. Please try again.');
    }
  };

  const handleVisionNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vision.mainGoal90Days.trim() || !vision.life12Months.trim() || !vision.wantBusiness || !vision.improvementArea) return;
    transitionTo('reality');
  };

  const handleRealityNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reality.alreadyTried.trim() || !reality.whatStopsConsistency.trim() || !reality.disciplineRating || !reality.trainingDaysPerWeek || !reality.prayerDaysPerWeek) return;
    transitionTo('commitment');
  };

  const handleCommitmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadId) return;
    if (!commitment.tryingAlone || !commitment.believeBrotherhoodHelps || !commitment.costOfStaying.trim() || !commitment.seriousnessRating || !commitment.willingToInvest || !commitment.interestedPath) return;
    setCommitSubmitting(true);
    setCommitError('');
    const result = await submitQuestionnaire(leadId, { ...vision, ...reality, ...commitment });
    setCommitSubmitting(false);
    if (result.success) {
      trackCompleteQuestionnaire({ ...vision, ...reality, ...commitment });
      transitionTo('complete');
    } else {
      setCommitError(result.error || 'Something went wrong. Please try again.');
    }
  };

  const struggles = [
    { value: 'discipline-consistency', label: 'Discipline & Consistency' },
    { value: 'fitness-body', label: 'Fitness & Body' },
    { value: 'faith-purpose', label: 'Faith & Purpose' },
    { value: 'direction-goals', label: 'Direction & Goals' },
    { value: 'energy-health', label: 'Energy & Health' },
    { value: 'building-business', label: 'Building a Future Business' },
  ];

  const ratingOptions = Array.from({ length: 10 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
    description: i === 0 ? 'Not at all serious' : i === 9 ? 'Completely committed' : undefined,
  }));

  const dayOptions = Array.from({ length: 8 }, (_, i) => ({
    value: String(i),
    label: i === 0 ? 'None' : i === 1 ? '1 day' : `${i} days`,
  }));

  const currentStep = STAGE_META[stage].step;
  const totalSteps = 4;

  const slideClass = animating
    ? direction === 'forward'
      ? 'opacity-0 translate-x-8'
      : 'opacity-0 -translate-x-8'
    : 'opacity-100 translate-x-0';

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex flex-col relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFC300]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D11F2A]/5 rounded-full blur-[140px] pointer-events-none" />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/5">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to site
        </button>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#FFC300]" />
          <span className="text-[#FFC300] font-bold text-sm tracking-wider">KINGMAKER SOCIETY</span>
        </div>
        <div className="w-24" />
      </header>

      {stage !== 'intro' && stage !== 'complete' && (
        <StageProgress currentStep={currentStep} totalSteps={totalSteps} stageMeta={STAGE_META} stage={stage} />
      )}

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div
          className={`w-full max-w-xl transition-all duration-300 ease-out ${slideClass}`}
        >
          {stage === 'intro' && (
            <StageIntro
              onStart={() => {
                if (!formStarted) { setFormStarted(true); trackBeginApplication(); }
                transitionTo('identity');
              }}
            />
          )}

          {stage === 'identity' && (
            <form onSubmit={handleIdentitySubmit} className="space-y-6">
              <div className="text-center mb-8">
                <p className="text-xs font-bold tracking-[0.2em] text-[#FFC300]/60 uppercase mb-2">Stage 1 of 4</p>
                <h2 className="text-3xl font-bold text-white mb-2">Who are you?</h2>
                <p className="text-gray-400">Let's start with the basics so we know who we're talking to.</p>
              </div>

              {identityError && (
                <div className="p-4 bg-[#D11F2A]/10 border border-[#D11F2A]/30 rounded-lg text-[#D11F2A] text-sm">
                  {identityError}
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="First Name" type="text" placeholder="John" value={identity.firstName}
                    onChange={(e) => setIdentity({ ...identity, firstName: e.target.value })}
                    error={identityErrors.firstName} required />
                  <Input label="Last Name" type="text" placeholder="Doe" value={identity.lastName}
                    onChange={(e) => setIdentity({ ...identity, lastName: e.target.value })}
                    error={identityErrors.lastName} required />
                </div>
                <Input label="Email" type="email" placeholder="john@example.com" value={identity.email}
                  onChange={(e) => setIdentity({ ...identity, email: e.target.value })}
                  error={identityErrors.email} required />
                <Input label="Phone Number" type="tel" placeholder="+1 (555) 123-4567" value={identity.phone}
                  onChange={(e) => setIdentity({ ...identity, phone: e.target.value })}
                  error={identityErrors.phone} required />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Age" type="text" inputMode="numeric" pattern="[0-9]*" placeholder="25" value={identity.age}
                    onChange={(e) => setIdentity({ ...identity, age: e.target.value.replace(/\D/g, '') })}
                    error={identityErrors.age} required />
                  <TimezoneSelect label="Time Zone" value={identity.timezone}
                    onChange={(val) => setIdentity({ ...identity, timezone: val })}
                    error={identityErrors.timezone} required />
                </div>
                <Input label="Your 9-to-5 Role" type="text" placeholder="Your current job" value={identity.occupation}
                  onChange={(e) => setIdentity({ ...identity, occupation: e.target.value })}
                  error={identityErrors.occupation} required />
                <PremiumSelect label="Biggest Struggle Right Now" placeholder="Select your biggest struggle"
                  options={struggles} value={identity.struggle}
                  onChange={(val) => setIdentity({ ...identity, struggle: val })}
                  error={identityErrors.struggle} required />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => transitionTo('intro', 'back')}
                  className="flex items-center gap-2 px-5 py-3 text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200 text-sm">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <Button type="submit" variant="secondary" size="lg" className="flex-1" disabled={identitySubmitting}>
                  {identitySubmitting ? 'Saving...' : (
                    <span className="flex items-center justify-center gap-2">Continue <ArrowRight className="w-4 h-4" /></span>
                  )}
                </Button>
              </div>
            </form>
          )}

          {stage === 'vision' && (
            <form onSubmit={handleVisionNext} className="space-y-6">
              <div className="text-center mb-8">
                <p className="text-xs font-bold tracking-[0.2em] text-[#FFC300]/60 uppercase mb-2">Stage 2 of 4</p>
                <h2 className="text-3xl font-bold text-white mb-2">Your Vision</h2>
                <p className="text-gray-400">A man without a vision is just surviving. Tell us where you're going.</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#FFC300] mb-2">
                    What is your main goal for the next 90 days? <span className="text-[#D11F2A]">*</span>
                  </label>
                  <textarea
                    value={vision.mainGoal90Days}
                    onChange={(e) => setVision({ ...vision, mainGoal90Days: e.target.value })}
                    placeholder="Be specific — what does winning look like in 90 days?"
                    rows={3}
                    required
                    className="w-full px-4 py-3 bg-[#2B2B2B]/80 border-2 border-[#3B3B3B] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC300] focus:ring-4 focus:ring-[#FFC300]/20 resize-none transition-all duration-300 text-sm leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#FFC300] mb-2">
                    What would your life look like 12 months from now if you stayed consistent? <span className="text-[#D11F2A]">*</span>
                  </label>
                  <textarea
                    value={vision.life12Months}
                    onChange={(e) => setVision({ ...vision, life12Months: e.target.value })}
                    placeholder="Paint the picture — body, mindset, relationships, finances..."
                    rows={3}
                    required
                    className="w-full px-4 py-3 bg-[#2B2B2B]/80 border-2 border-[#3B3B3B] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC300] focus:ring-4 focus:ring-[#FFC300]/20 resize-none transition-all duration-300 text-sm leading-relaxed"
                  />
                </div>

                <PremiumSelect
                  label="Do you want to build your own business or income path one day?"
                  placeholder="Select one"
                  options={[
                    { value: 'yes', label: 'Yes', description: 'I want to build something of my own' },
                    { value: 'no', label: 'No', description: 'I am focused on other goals right now' },
                    { value: 'unsure', label: 'Not sure yet', description: 'I am open to exploring it' },
                  ]}
                  value={vision.wantBusiness}
                  onChange={(val) => setVision({ ...vision, wantBusiness: val })}
                  required
                />

                <PremiumSelect
                  label="Which area do you want the most improvement in?"
                  placeholder="Select one"
                  options={[
                    { value: 'fitness', label: 'Fitness & Strength', description: 'Body composition, training, physical health' },
                    { value: 'faith', label: 'Faith & Purpose', description: 'Spiritual growth, scripture, prayer life' },
                    { value: 'health', label: 'Health & Vitality', description: 'Energy, sleep, nutrition habits' },
                    { value: 'goals', label: 'Goals & Discipline', description: 'Focus, consistency, execution' },
                    { value: 'business', label: 'Business & Income', description: 'Building a future outside the 9-to-5' },
                  ]}
                  value={vision.improvementArea}
                  onChange={(val) => setVision({ ...vision, improvementArea: val })}
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => transitionTo('identity', 'back')}
                  className="flex items-center gap-2 px-5 py-3 text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200 text-sm">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <Button type="submit" variant="secondary" size="lg" className="flex-1">
                  <span className="flex items-center justify-center gap-2">Continue <ArrowRight className="w-4 h-4" /></span>
                </Button>
              </div>
            </form>
          )}

          {stage === 'reality' && (
            <form onSubmit={handleRealityNext} className="space-y-6">
              <div className="text-center mb-8">
                <p className="text-xs font-bold tracking-[0.2em] text-[#FFC300]/60 uppercase mb-2">Stage 3 of 4</p>
                <h2 className="text-3xl font-bold text-white mb-2">Your Reality</h2>
                <p className="text-gray-400">No judgment. Honest answers help us place you in the right tier.</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#FFC300] mb-2">
                    What have you already tried to reach your goals? <span className="text-[#D11F2A]">*</span>
                  </label>
                  <textarea
                    value={reality.alreadyTried}
                    onChange={(e) => setReality({ ...reality, alreadyTried: e.target.value })}
                    placeholder="Programs, apps, coaches, books, willpower..."
                    rows={3}
                    required
                    className="w-full px-4 py-3 bg-[#2B2B2B]/80 border-2 border-[#3B3B3B] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC300] focus:ring-4 focus:ring-[#FFC300]/20 resize-none transition-all duration-300 text-sm leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#FFC300] mb-2">
                    What keeps stopping you from being consistent? <span className="text-[#D11F2A]">*</span>
                  </label>
                  <textarea
                    value={reality.whatStopsConsistency}
                    onChange={(e) => setReality({ ...reality, whatStopsConsistency: e.target.value })}
                    placeholder="Be brutally honest with yourself here..."
                    rows={3}
                    required
                    className="w-full px-4 py-3 bg-[#2B2B2B]/80 border-2 border-[#3B3B3B] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC300] focus:ring-4 focus:ring-[#FFC300]/20 resize-none transition-all duration-300 text-sm leading-relaxed"
                  />
                </div>

                <PremiumSelect
                  label="Rate your current discipline from 1 to 10"
                  placeholder="Select a rating"
                  options={ratingOptions}
                  value={reality.disciplineRating}
                  onChange={(val) => setReality({ ...reality, disciplineRating: val })}
                  required
                />

                <PremiumSelect
                  label="How many days per week are you currently training?"
                  placeholder="Select days"
                  options={dayOptions}
                  value={reality.trainingDaysPerWeek}
                  onChange={(val) => setReality({ ...reality, trainingDaysPerWeek: val })}
                  required
                />

                <PremiumSelect
                  label="How many days per week are you reading scripture or praying?"
                  placeholder="Select days"
                  options={dayOptions}
                  value={reality.prayerDaysPerWeek}
                  onChange={(val) => setReality({ ...reality, prayerDaysPerWeek: val })}
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => transitionTo('vision', 'back')}
                  className="flex items-center gap-2 px-5 py-3 text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200 text-sm">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <Button type="submit" variant="secondary" size="lg" className="flex-1">
                  <span className="flex items-center justify-center gap-2">Continue <ArrowRight className="w-4 h-4" /></span>
                </Button>
              </div>
            </form>
          )}

          {stage === 'commitment' && (
            <form onSubmit={handleCommitmentSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <p className="text-xs font-bold tracking-[0.2em] text-[#FFC300]/60 uppercase mb-2">Stage 4 of 4</p>
                <h2 className="text-3xl font-bold text-white mb-2">Your Commitment</h2>
                <p className="text-gray-400">This is where kings are separated from spectators. Be honest.</p>
              </div>

              {commitError && (
                <div className="p-4 bg-[#D11F2A]/10 border border-[#D11F2A]/30 rounded-lg text-[#D11F2A] text-sm">
                  {commitError}
                </div>
              )}

              <div className="space-y-5">
                <PremiumSelect
                  label="Have you been trying to do this alone?"
                  placeholder="Select one"
                  options={[
                    { value: 'yes', label: 'Yes', description: 'No accountability or brotherhood' },
                    { value: 'no', label: 'No', description: 'I have some support in my corner' },
                  ]}
                  value={commitment.tryingAlone}
                  onChange={(val) => setCommitment({ ...commitment, tryingAlone: val })}
                  required
                />

                <PremiumSelect
                  label="Do you believe a structured brotherhood and accountability would accelerate your results?"
                  placeholder="Select one"
                  options={[
                    { value: 'yes', label: 'Yes', description: 'Brotherhood and structure would make a real difference for my life' },
                    { value: 'no', label: 'No', description: 'I think I can get there on my own' },
                  ]}
                  value={commitment.believeBrotherhoodHelps}
                  onChange={(val) => setCommitment({ ...commitment, believeBrotherhoodHelps: val })}
                  required
                />

                <div>
                  <label className="block text-sm font-semibold text-[#FFC300] mb-2">
                    What is the cost of staying where you are for another year? <span className="text-[#D11F2A]">*</span>
                  </label>
                  <textarea
                    value={commitment.costOfStaying}
                    onChange={(e) => setCommitment({ ...commitment, costOfStaying: e.target.value })}
                    placeholder="What do you lose — physically, spiritually, financially — if nothing changes?"
                    rows={3}
                    required
                    className="w-full px-4 py-3 bg-[#2B2B2B]/80 border-2 border-[#3B3B3B] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC300] focus:ring-4 focus:ring-[#FFC300]/20 resize-none transition-all duration-300 text-sm leading-relaxed"
                  />
                </div>

                <PremiumSelect
                  label="How serious are you about changing your life right now? (1-10)"
                  placeholder="Select a rating"
                  options={ratingOptions}
                  value={commitment.seriousnessRating}
                  onChange={(val) => setCommitment({ ...commitment, seriousnessRating: val })}
                  required
                />

                <PremiumSelect
                  label="If accepted, are you willing to invest in mentorship and accountability?"
                  placeholder="Select one"
                  options={[
                    { value: 'yes', label: 'Yes, I am ready', description: 'I understand growth requires investment' },
                    { value: 'depends', label: 'Depends on the cost', description: 'I need to see what is involved' },
                    { value: 'no', label: 'Not right now', description: 'I am not in a position to invest currently' },
                  ]}
                  value={commitment.willingToInvest}
                  onChange={(val) => setCommitment({ ...commitment, willingToInvest: val })}
                  required
                />

                <PremiumSelect
                  label="Which path are you most interested in?"
                  placeholder="Select one"
                  options={[
                    { value: 'community', label: 'Brotherhood Community', description: 'Accountability, structure, and brotherhood' },
                    { value: 'guided', label: 'Guided Growth', description: 'Small group mentorship with a dedicated coach' },
                    { value: 'vip', label: 'VIP Mentorship', description: '1-on-1 direct coaching with Jordan Ali' },
                  ]}
                  value={commitment.interestedPath}
                  onChange={(val) => setCommitment({ ...commitment, interestedPath: val })}
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => transitionTo('reality', 'back')}
                  className="flex items-center gap-2 px-5 py-3 text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200 text-sm">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <Button type="submit" variant="primary" size="lg" className="flex-1" disabled={commitSubmitting}>
                  {commitSubmitting ? 'Submitting...' : (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Submit Application
                    </span>
                  )}
                </Button>
              </div>
            </form>
          )}

          {stage === 'complete' && (
            <StageComplete
              firstName={identity.firstName}
              interestedPath={commitment.interestedPath}
              onBookCall={() => window.open('https://calendly.com/jordanaliwork/30min', '_blank')}
              onGoHome={() => navigate('/')}
            />
          )}
        </div>
      </main>
    </div>
  );
}
