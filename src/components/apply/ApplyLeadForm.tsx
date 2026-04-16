import { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Input from '../ui/Input';
import PremiumSelect from '../ui/PremiumSelect';
import TimezoneSelect from '../ui/TimezoneSelect';
import Button from '../ui/Button';
import { useApplication } from '../../context/ApplicationContext';
import { submitLead } from '../../services/leadService';
import { validateLeadForm, ValidationError } from '../../utils/validation';
import { trackBeginApplication, trackCompleteLeadForm } from '../../utils/analytics';

const STRUGGLES = [
  { value: 'discipline-consistency', label: 'Discipline & Consistency' },
  { value: 'fitness-body', label: 'Fitness & Body' },
  { value: 'faith-purpose', label: 'Faith & Purpose' },
  { value: 'direction-goals', label: 'Direction & Goals' },
  { value: 'energy-health', label: 'Energy & Health' },
  { value: 'building-business', label: 'Building a Future Business' },
];

export default function ApplyLeadForm() {
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
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
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

      trackCompleteLeadForm({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
      });

      setTimeout(() => {
        setApplicationStep('questionnaire');
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
          <h2 className="text-2xl font-bold text-white mb-2">Profile Saved</h2>
          <p className="text-gray-400 text-sm">Loading your next step...</p>
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
          Your Profile
        </h1>
        <p className="text-gray-400 text-base leading-relaxed max-w-md mx-auto">
          Tell us who you are. This stays private and is used only by the Kingmaker team.
        </p>
      </div>

      {submitError && (
        <div className="p-4 bg-[#D11F2A]/10 border border-[#D11F2A]/30 rounded-xl text-[#D11F2A] text-sm">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-white/3 border border-white/8 rounded-2xl p-6 space-y-5">
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
            label="Email Address"
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
            <TimezoneSelect
              label="Time Zone"
              value={formData.timezone}
              onChange={(val) => setFormData({ ...formData, timezone: val })}
              error={errors.timezone}
              required
            />
          </div>

          <Input
            label="Current Occupation"
            type="text"
            placeholder="Your 9-to-5 role"
            value={formData.occupation}
            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            error={errors.occupation}
            required
          />

          <PremiumSelect
            label="Biggest Struggle"
            placeholder="Select your biggest struggle"
            options={STRUGGLES}
            value={formData.struggle}
            onChange={(val) => setFormData({ ...formData, struggle: val })}
            error={errors.struggle}
            required
          />
        </div>

        <Button
          type="submit"
          variant="secondary"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center space-x-2">
              <span>Saving...</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2">
              <span>Continue to Goals</span>
              <ArrowRight className="w-5 h-5" />
            </span>
          )}
        </Button>

        <p className="text-[11px] text-gray-600 text-center">
          No spam. Used only to contact you about your application.
        </p>
      </form>
    </div>
  );
}
