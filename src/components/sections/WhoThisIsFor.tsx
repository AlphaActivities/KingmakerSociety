import { Check, Target, Flame, Heart, TrendingUp, Users, Briefcase } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import LuxFadeIn from '../ui/LuxFadeIn';

export default function WhoThisIsFor() {
  const qualifications = [
    {
      icon: Target,
      title: 'Men 18 to 40',
      description: 'In your prime years, ready to build your legacy',
    },
    {
      icon: Briefcase,
      title: 'Working a 9-to-5',
      description: 'Employed professionals building toward something greater',
    },
    {
      icon: Heart,
      title: 'Faith Driven',
      description: 'Grounded in purpose and spiritual foundation',
    },
    {
      icon: Flame,
      title: 'Fitness & Health Focused',
      description: 'Committed to building a strong body and mind',
    },
    {
      icon: TrendingUp,
      title: 'Goal Oriented',
      description: 'Driven to achieve and exceed your potential',
    },
    {
      icon: Users,
      title: 'Aspiring Entrepreneurs',
      description: 'Inspired to build a business and create the freedom you deserve',
    },
  ];

  return (
    <Section id="who-this-is-for" background="gradient">
      <LuxFadeIn>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#FFC300]/10 border border-[#FFC300]/30 rounded-full mb-6">
            <Check className="w-4 h-4 text-[#FFC300]" />
            <span className="text-sm font-semibold text-[#FFC300]">Qualification Checklist</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Who This Is For
          </h2>
          <p className="text-xl text-gray-300">
            Kingmaker Society is built for faith-driven men ready to master their body, habits, and purpose through structure, brotherhood, and real accountability.
          </p>
        </div>
      </LuxFadeIn>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {qualifications.map((qual, index) => (
          <LuxFadeIn key={index} delay={index * 0.1}>
            <Card variant="premium" hover className="p-6 h-full group">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#D11F2A] to-[#A01620] rounded-lg flex items-center justify-center shadow-lg shadow-[#D11F2A]/30 group-hover:shadow-[#D11F2A]/60 group-hover:scale-110 transition-all duration-300">
                  <qual.icon className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FFC300] transition-colors duration-300">{qual.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{qual.description}</p>
                </div>
              </div>
            </Card>
          </LuxFadeIn>
        ))}
      </div>

      <LuxFadeIn delay={0.6}>
        <div className="mt-12 text-center">
          <Card variant="gold" className="p-8 inline-block">
            <p className="text-xl font-semibold text-white">
              If this describes you, you're in the right place.
              <span className="text-[#FFC300]"> Welcome to the Brotherhood.</span>
            </p>
          </Card>
        </div>
      </LuxFadeIn>
    </Section>
  );
}
