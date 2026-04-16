import { Check, Crown, Star } from 'lucide-react';
import { trackClickJoinTier } from '../../utils/analytics';

const TIERS = [
  {
    name: 'General Access',
    price: 30,
    badge: null,
    stripeLink: 'https://buy.stripe.com/9B6dR87h74wuavgf0M7AI0f',
    features: [
      '24/7 access to the Kingmaker Society private member brotherhood',
      'Access to live Zoom calls covering Faith, Fitness, Health, Mindset, Goals',
      'Structured pillar system',
      'Community accountability and brotherhood support',
      'High standard environment for mental, physical, and spiritual growth',
    ],
    borderClass: 'border-[#3B3B3B]',
    priceClass: 'text-[#FFC300]',
    btnClass: 'bg-gradient-to-r from-[#3B3B3B] to-[#2B2B2B] text-white hover:from-[#4B4B4B] hover:to-[#3B3B3B]',
    btnLabel: 'Get Started',
  },
  {
    name: 'VIP Access',
    price: 60,
    badge: 'Popular',
    stripeLink: 'https://buy.stripe.com/7sY3cucBrfb8avg05S7AI0g',
    features: [
      'Everything in General Access',
      'Monthly 1-on-1 mini audit',
      'Personalized weekly check-in',
      'Priority Q&A and hot seats',
      'Member spotlights and progress reviews',
    ],
    borderClass: 'border-[#D11F2A]/50',
    priceClass: 'text-transparent bg-clip-text bg-gradient-to-r from-[#D11F2A] via-[#FF4444] to-[#D11F2A]',
    btnClass: 'bg-gradient-to-r from-[#D11F2A] to-[#A01620] text-white hover:from-[#E02030] hover:to-[#B01828] shadow-[0_4px_20px_rgba(209,31,42,0.4)]',
    btnLabel: 'Join VIP',
  },
  {
    name: 'Elite Access',
    price: 90,
    badge: 'Recommended',
    stripeLink: 'https://buy.stripe.com/aFa00ieJzbYWavg3i47AI0h',
    features: [
      'Everything in General + VIP',
      'Weekly VIP mentorship and accountability structure',
      'Monthly 1-on-1 mentorship call on private Zoom',
      'Elite-only inner circle chat with direct access to mentors',
      'Personalized Kingmaker growth game plan',
      'Monthly progress audit and accountability review',
    ],
    borderClass: 'border-[#FFC300]/60',
    priceClass: 'text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] via-[#FFD700] to-[#FFC300]',
    btnClass: 'bg-gradient-to-r from-[#FFC300] via-[#FFD033] to-[#D4A000] text-[#0B0B0B] font-bold shadow-[0_4px_20px_rgba(255,195,0,0.4)] hover:shadow-[0_8px_32px_rgba(255,195,0,0.6)]',
    btnLabel: 'Join Elite',
  },
];

export default function PricingStep() {
  const handleJoin = (tier: (typeof TIERS)[0]) => {
    const type = tier.name === 'General Access' ? 'general' : tier.name === 'VIP Access' ? 'vip' : 'elite';
    trackClickJoinTier(type, tier.price);
    window.open(tier.stripeLink, '_blank');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 px-5 py-2 bg-[#FFC300]/10 border border-[#FFC300]/30 rounded-full mb-6">
          <Crown className="w-4 h-4 text-[#FFC300]" />
          <span className="text-sm font-semibold text-[#FFC300] tracking-widest uppercase">Choose Your Level</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Select Your Membership
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          All tiers are month-to-month. Cancel anytime. Start your transformation today.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        {TIERS.map((tier, i) => (
          <div
            key={i}
            className={`relative p-8 rounded-2xl border-2 bg-[#1B1B1B] transition-all duration-300 hover:-translate-y-1 ${tier.borderClass} ${
              tier.badge === 'Recommended'
                ? 'shadow-[0_12px_48px_rgba(255,195,0,0.25)] md:scale-105'
                : tier.badge === 'Popular'
                ? 'shadow-[0_8px_32px_rgba(209,31,42,0.2)]'
                : ''
            }`}
          >
            {tier.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <div className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center space-x-1.5 ${
                  tier.badge === 'Recommended'
                    ? 'bg-gradient-to-r from-[#FFC300] via-[#FFD700] to-[#FFC300] text-[#0B0B0B]'
                    : 'bg-gradient-to-r from-[#D11F2A] to-[#A01620] text-white'
                }`}>
                  <Star className="w-3 h-3" />
                  <span>{tier.badge}</span>
                </div>
              </div>
            )}

            {tier.badge === 'Recommended' && (
              <div className="absolute -inset-3 bg-[#FFC300]/15 rounded-3xl blur-xl -z-10 animate-pulse"></div>
            )}

            <div className="text-center mb-8 pt-2">
              {tier.badge === 'Recommended' && <Crown className="w-10 h-10 text-[#FFC300] mx-auto mb-3 drop-shadow-[0_0_15px_rgba(255,195,0,0.5)]" />}
              <h3 className="text-xl font-bold text-white mb-4">{tier.name}</h3>
              <div className="flex items-baseline justify-center space-x-1">
                <span className={`text-5xl font-bold ${tier.priceClass}`}>${tier.price}</span>
                <span className="text-gray-500 text-sm">/month</span>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {tier.features.map((f, fi) => (
                <div key={fi} className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-[#FFC300] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm leading-relaxed">{f}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleJoin(tier)}
              className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 hover:-translate-y-0.5 ${tier.btnClass}`}
            >
              {tier.btnLabel}
            </button>

            {tier.badge === 'Recommended' && (
              <p className="text-center text-[#FFC300] text-xs font-semibold mt-3">Limited spots available</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-500 text-sm">
          Not sure which tier is right for you?{' '}
          <button
            onClick={() => window.open('https://calendly.com/jordanaliwork/30min', '_blank')}
            className="text-[#FFC300] hover:underline font-semibold"
          >
            Book a free strategy call
          </button>
          {' '}and we'll help you decide.
        </p>
      </div>
    </div>
  );
}
