import { useState } from 'react';
import { Shield, Calendar, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Container from '../ui/Container';
import TimezoneSelect from '../ui/TimezoneSelect';
import PremiumSelect from '../ui/PremiumSelect';
import LuxFadeIn from '../ui/LuxFadeIn';
import HeroBackgroundSlider from '../ui/HeroBackgroundSlider';
import { luxuryScrollToSection, scrollToApplication } from '../../utils/luxuryScroll';
import { validateLeadForm, ValidationError } from '../../utils/validation';
import { submitLead } from '../../services/leadService';
import { useApplication } from '../../context/ApplicationContext';
import { trackBeginApplication, trackCompleteLeadForm } from '../../utils/analytics';

export default function Hero() {
  const { setApplicationToken, setApplicationStep, setLeadSubmitted } = useApplication();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    timezone: '',
    occupation: '',
    struggle: '',
  });
  const [errors, setErrors] = useState<ValidationError>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formStarted, setFormStarted] = useState(false);

  const handleFormStart = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackBeginApplication();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitError('');

    const validationErrors = validateLeadForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const result = await submitLead(formData);

    setIsSubmitting(false);

    if (result.success) {
      if (result.applicationToken) {
        setApplicationToken(result.applicationToken);
      }
      setLeadSubmitted(true);
      setSubmitSuccess(true);
      setApplicationStep('questionnaire');

      trackCompleteLeadForm({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
      });

      setTimeout(() => {
        luxuryScrollToSection('questionnaire', 80);
      }, 1500);
    } else {
      setSubmitError(result.error || 'Failed to submit application. Please try again.');
    }
  };

  const scrollToSection = (id: string) => {
    luxuryScrollToSection(id, 80);
  };

  const struggles = [
    { value: 'discipline-consistency', label: 'Discipline & Consistency' },
    { value: 'fitness-body', label: 'Fitness & Body' },
    { value: 'faith-purpose', label: 'Faith & Purpose' },
    { value: 'direction-goals', label: 'Direction & Goals' },
    { value: 'energy-health', label: 'Energy & Health' },
    { value: 'building-business', label: 'Building a Future Business' },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-start pt-32 overflow-hidden luxury-grain">
      <HeroBackgroundSlider />

      <div className="absolute inset-0 z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFGMUYxRiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFC300]/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D11F2A]/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

      <Container className="relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center py-12 md:py-16 lg:py-20">
          <div className="space-y-8 -mt-8 md:mt-0">
            <LuxFadeIn delay={0.1}>
              <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#D11F2A]/10 border-2 border-[#D11F2A]/40 rounded-full shadow-lg shadow-[#D11F2A]/20 hover:shadow-[#D11F2A]/40 hover:scale-105 transition-all duration-300 animate-pulse-glow-subtle">
                <Shield className="w-5 h-5 text-[#D11F2A] drop-shadow-[0_0_8px_rgba(209,31,42,0.6)]" />
                <span className="text-sm font-bold text-[#D11F2A] drop-shadow-[0_0_8px_rgba(209,31,42,0.3)]">Elite Brotherhood</span>
              </div>
            </LuxFadeIn>

            <LuxFadeIn delay={0.2}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] hover:drop-shadow-[0_4px_30px_rgba(255,255,255,0.2)] transition-all duration-500">Kingmaker</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] via-[#FFD033] to-[#D4A000] drop-shadow-[0_0_40px_rgba(255,195,0,0.6)] animate-gradient-shift">Society</span>
              </h1>
            </LuxFadeIn>

            <LuxFadeIn delay={0.3}>
              <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
                A structured brotherhood for <span className="whitespace-nowrap">faith-driven</span> men working a <span className="whitespace-nowrap">9-to-5</span> who want to build their body, discipline, goals, and future business
                <span className="text-[#FFC300] font-semibold"> without doing it alone.</span>
              </p>
              <p className="text-lg sm:text-xl text-gray-400 italic mt-4">
                Built for men who want to lead their life, not just live it.
              </p>
            </LuxFadeIn>

            <LuxFadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" onClick={scrollToApplication} className="animate-pulse-glow">
                  Start Application
                </Button>
                <Button variant="outline" size="lg" onClick={() => scrollToSection('book-call')} className="whitespace-nowrap">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book a Call
                </Button>
              </div>

            </LuxFadeIn>
          </div>

          <LuxFadeIn delay={0.5} className="w-full">
            {submitSuccess ? (
              <div className="bg-gradient-to-br from-[#1B1B1B] to-[#2B2B2B] border-2 border-[#FFC300]/40 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-[#FFC300]/20">
                <div className="text-center space-y-6">
                  <CheckCircle className="w-16 h-16 text-[#FFC300] mx-auto" />
                  <h3 className="text-2xl font-bold text-white">Application Started!</h3>
                  <p className="text-gray-300">
                    Thank you for taking the first step. Let's continue with a few more questions to understand your goals.
                  </p>
                  <p className="text-[#FFC300] text-sm">Redirecting to questionnaire...</p>
                </div>
              </div>
            ) : (
              <form id="application-form" onSubmit={handleSubmit} className="relative bg-gradient-to-br from-[#1B1B1B]/98 to-[#2B2B2B]/98 border-2 border-[#FFC300]/40 rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(255,195,0,0.25)] hover:border-[#FFC300]/60 hover:shadow-[0_12px_48px_rgba(255,195,0,0.35)] transition-all duration-500 backdrop-blur-md luxury-grain before:absolute before:inset-0 before:rounded-2xl before:p-[2px] before:bg-gradient-to-br before:from-[#FFC300]/20 before:via-transparent before:to-[#D11F2A]/20 before:-z-10 before:blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Start Your Application
                </h3>

                {submitError && (
                  <div className="mb-4 p-4 bg-[#D11F2A]/10 border border-[#D11F2A]/30 rounded-lg text-[#D11F2A] text-sm">
                    {submitError}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      onFocus={handleFormStart}
                      error={errors.firstName}
                      required
                    />
                    <Input
                      label="Last Name"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      error={errors.lastName}
                      required
                    />
                  </div>

                  <Input
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={errors.email}
                    required
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    error={errors.phone}
                    required
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Age"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="25"
                      value={formData.age}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, age: val });
                      }}
                      error={errors.age}
                      required
                    />
                    <div className="relative">
                      <TimezoneSelect
                        label="Time Zone"
                        value={formData.timezone}
                        onChange={(val) => setFormData({ ...formData, timezone: val })}
                        error={errors.timezone}
                        required
                      />
                    </div>
                  </div>

                  <Input
                    label="Occupation (9-to-5 Role)"
                    type="text"
                    placeholder="Your current job"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    error={errors.occupation}
                    required
                  />

                  <PremiumSelect
                    label="Biggest Struggle"
                    placeholder="Select your biggest struggle"
                    options={struggles}
                    value={formData.struggle}
                    onChange={(val) => setFormData({ ...formData, struggle: val })}
                    error={errors.struggle}
                    required
                  />

                  <Button type="submit" variant="secondary" size="lg" className="w-full mt-6" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>

                  <p className="text-xs text-gray-400 text-center mt-4">
                    No spam. Used only to contact you about your application.
                  </p>
                </div>
              </form>
            )}
          </LuxFadeIn>
        </div>
      </Container>
    </section>
  );
}
