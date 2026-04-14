import { Check, Star, Crown } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LuxFadeIn from '../ui/LuxFadeIn';
import { trackClickJoinTier } from '../../utils/analytics';

export default function Pricing() {
  const handleJoinTier = (tierName: string, price: number, stripeLink: string) => {
    const tierType = tierName === 'General Access' ? 'general' : tierName === 'VIP Access' ? 'vip' : 'elite';
    trackClickJoinTier(tierType, price);
    window.open(stripeLink, '_blank');
  };

  const tiers = [
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
        'No 1-on-1 mentorship in this tier',
      ],
      variant: 'premium' as const,
      recommended: false,
      bgGradient: 'from-[#3B3B3B]/40 to-[#2B2B2B]/40',
      borderColor: 'border-[#5B5B5B]/40',
      glowColor: '',
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
        'Priority Q&A',
        'Faster responses',
        'Hot seats and real-time troubleshooting',
        'Member spotlights and progress reviews',
      ],
      variant: 'premium' as const,
      recommended: false,
      bgGradient: 'from-[#D11F2A]/15 to-[#8B1F1F]/10',
      borderColor: 'border-[#D11F2A]/50',
      glowColor: 'shadow-[0_10px_40px_rgba(209,31,42,0.25)]',
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
        'Priority feedback and faster direct support',
        'Early access to future programs and events',
        'Limited spots to maintain quality',
      ],
      variant: 'gold' as const,
      recommended: true,
      bgGradient: 'from-[#FFC300]/20 to-[#D4A000]/20',
      borderColor: 'border-[#FFC300]/60',
      glowColor: 'shadow-[0_12px_48px_rgba(255,195,0,0.3)]',
    },
  ];

  return (
    <Section id="pricing" background="gradient">
      <LuxFadeIn>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#FFC300]/10 border border-[#FFC300]/30 rounded-full mb-6">
            <Crown className="w-4 h-4 text-[#FFC300]" />
            <span className="text-sm font-semibold text-[#FFC300]">Membership Tiers</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your Level
          </h2>
          <p className="text-xl text-gray-300">
            Select the tier that matches your commitment level and goals. All tiers include lifetime brotherhood access.
          </p>
        </div>
      </LuxFadeIn>

      <div className="grid md:grid-cols-3 gap-12 items-center">
        {tiers.map((tier, index) => (
          <LuxFadeIn key={index} delay={index * 0.15}>
            <div className={`relative ${tier.recommended ? 'md:scale-105 z-10' : tier.badge === 'Popular' ? 'md:scale-100' : 'md:scale-95'}`}>
              {tier.recommended && (
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FFC300]/30 via-[#FFD700]/20 to-[#FFC300]/30 rounded-3xl blur-2xl animate-pulse"></div>
              )}
              {tier.badge === 'Popular' && (
                <div className="absolute -inset-3 bg-gradient-to-r from-[#D11F2A]/25 via-[#FFC300]/15 to-[#D11F2A]/25 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              )}
              <Card
                variant={tier.variant}
                className={`p-10 relative h-full bg-gradient-to-br ${tier.bgGradient} backdrop-blur-md border-2 ${tier.borderColor} ${tier.glowColor} ${tier.recommended ? 'hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,195,0,0.4)] animate-pulse-glow' : tier.badge === 'Popular' ? 'hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(209,31,42,0.3)] transition-all duration-500 group' : 'hover:-translate-y-1'} transition-all duration-500`}
              >
            {tier.badge && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                <div className={`${tier.recommended ? 'bg-gradient-to-r from-[#FFC300] via-[#FFD700] to-[#FFC300] animate-gradient-shift' : 'bg-gradient-to-r from-[#D11F2A] to-[#A01620]'} px-5 py-2 rounded-full flex items-center space-x-2 shadow-[0_4px_20px_rgba(255,195,0,0.4)] border-2 border-white/20`}>
                  <Star className={`w-4 h-4 ${tier.recommended ? 'text-black' : 'text-white'} drop-shadow-lg`} />
                  <span className={`text-sm font-bold ${tier.recommended ? 'text-black' : 'text-white'} drop-shadow-lg`}>{tier.badge}</span>
                </div>
              </div>
            )}

            <div className="text-center mb-10 pt-4">
              {tier.recommended && <Crown className="w-12 h-12 text-[#FFC300] mx-auto mb-4 drop-shadow-[0_0_20px_rgba(255,195,0,0.6)] animate-pulse" />}
              {tier.badge === 'Popular' && <Star className="w-10 h-10 text-[#D11F2A] mx-auto mb-4 drop-shadow-[0_0_16px_rgba(209,31,42,0.6)] animate-pulse" />}
              <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">{tier.name}</h3>
              <div className="flex items-baseline justify-center space-x-2">
                <span className={`text-5xl font-bold ${tier.recommended ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] via-[#FFD700] to-[#FFC300] animate-gradient-shift' : tier.badge === 'Popular' ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#D11F2A] via-[#FF4444] to-[#D11F2A]' : 'text-[#FFC300]'} drop-shadow-[0_0_20px_rgba(255,195,0,0.3)]`}>${tier.price}</span>
                <span className="text-gray-400">/month</span>
              </div>
            </div>

            <div className="space-y-5 mb-10">
              {tier.features.map((feature, fIndex) => (
                <div key={fIndex} className="flex items-start space-x-3">
                  <Check className={`w-5 h-5 ${tier.recommended ? 'text-[#FFC300]' : tier.badge === 'Popular' ? 'text-[#D11F2A]' : 'text-[#FFC300]'} flex-shrink-0 mt-0.5`} />
                  <span className="text-gray-300 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              variant={tier.recommended ? 'secondary' : tier.badge === 'Popular' ? 'primary' : 'primary'}
              size="lg"
              className={`w-full ${tier.badge === 'Popular' ? 'bg-gradient-to-r from-[#D11F2A] to-[#A01620] hover:from-[#FF1F2A] hover:to-[#D11F2A] shadow-[0_4px_20px_rgba(209,31,42,0.4)] hover:shadow-[0_6px_28px_rgba(209,31,42,0.6)]' : ''}`}
              onClick={() => handleJoinTier(tier.name, tier.price, tier.stripeLink)}
            >
              {tier.recommended ? 'Join Elite' : tier.badge === 'Popular' ? 'Join VIP' : 'Get Started'}
            </Button>

            {tier.recommended && (
              <p className="text-center text-[#FFC300] text-sm font-semibold mt-4">
                Limited spots available
              </p>
            )}
          </Card>
            </div>
          </LuxFadeIn>
        ))}
      </div>

      <LuxFadeIn delay={0.5}>
        <div className="relative mt-16 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#D11F2A]/30 via-[#FFC300]/30 to-[#D11F2A]/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>

          <div className="relative bg-gradient-to-br from-[#1B1B1B]/98 to-[#2B2B2B]/98 border-2 border-[#FFC300]/40 rounded-2xl p-10 md:p-12 backdrop-blur-md luxury-grain overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5),0_4px_16px_rgba(255,195,0,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFC300]/5 via-[#D11F2A]/5 to-[#FFC300]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFC300] to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D11F2A] to-transparent"></div>

            <div className="absolute top-1/2 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-[#FFC300] to-transparent -translate-y-1/2"></div>
            <div className="absolute top-1/2 right-0 w-1 h-32 bg-gradient-to-b from-transparent via-[#FFC300] to-transparent -translate-y-1/2"></div>

            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#FFC300]"></div>
                <div className="w-2 h-2 bg-[#FFC300] rounded-full animate-pulse shadow-[0_0_10px_rgba(255,195,0,0.6)]"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#FFC300]"></div>
              </div>

              <p className="text-2xl md:text-3xl font-bold text-white mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                Flexible <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] via-[#FFD700] to-[#FFC300]">Membership</span>
              </p>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                All memberships are <span className="text-[#FFC300] font-semibold">month-to-month</span>. Cancel anytime.
                <span className="block mt-2 text-white font-semibold">Your transformation is our priority.</span>
              </p>

              <div className="flex items-center justify-center space-x-3 mt-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D11F2A]"></div>
                <div className="w-2 h-2 bg-[#D11F2A] rounded-full animate-pulse shadow-[0_0_10px_rgba(209,31,42,0.6)]"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D11F2A]"></div>
              </div>
            </div>
          </div>
        </div>
      </LuxFadeIn>
    </Section>
  );
}
