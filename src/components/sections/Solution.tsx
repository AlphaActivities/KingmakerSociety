import { Shield, Video, Users, Target, TrendingUp, Calendar } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import LuxFadeIn from '../ui/LuxFadeIn';

export default function Solution() {
  const features = [
    {
      icon: Users,
      title: 'Members Only Hub',
      description: '24/7 access to a brotherhood of faith-driven men pursuing discipline, fitness, and purpose',
    },
    {
      icon: Video,
      title: 'Daily Zoom Calls',
      description: 'Guaranteed daily accountability call from 12:00-1:00 PM CST, plus mentor-led topic sessions',
    },
    {
      icon: Shield,
      title: 'Brotherhood Accountability',
      description: 'Real men holding you to real standards. No excuses, just results',
    },
    {
      icon: Target,
      title: 'Structured Growth System',
      description: 'Faith, fitness, health, mindset, goals, and business direction all covered weekly',
    },
    {
      icon: TrendingUp,
      title: 'Expert Mentorship',
      description: 'Learn from men actively living what they teach: MMA, bodybuilding, calisthenics, business',
    },
    {
      icon: Calendar,
      title: 'Weekly Topic Structure',
      description: 'Each day targets a specific pillar. The latest schedule is always pinned in Discord',
    },
  ];

  return (
    <Section id="solution" background="gradient">
      <LuxFadeIn>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#FFC300]/10 border border-[#FFC300]/30 rounded-full mb-6">
            <Calendar className="w-4 h-4 text-[#FFC300]" />
            <span className="text-sm font-semibold text-[#FFC300]">The Solution</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Kingmaker System
          </h2>
          <p className="text-xl text-gray-300">
            A complete brotherhood ecosystem designed to help you master your body, habits, and purpose while building the business and life you were called to lead.
          </p>
        </div>
      </LuxFadeIn>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <LuxFadeIn key={index} delay={index * 0.1}>
            <Card variant="premium" hover className="p-6 h-full">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FFC300] to-[#D4A000] rounded-xl flex items-center justify-center shadow-lg shadow-[#FFC300]/30">
                <feature.icon className="w-8 h-8 text-[#0B0B0B]" />
              </div>
              <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          </Card>
          </LuxFadeIn>
        ))}
      </div>

      <LuxFadeIn delay={0.6}>
        <Card variant="gold" className="p-8 md:p-12 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          This Is More Than a Community
        </h3>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Kingmaker Society exists to build disciplined, faith-driven men who master their body, habits, and purpose while developing the structure, brotherhood, and accountability to escape mediocrity and create the life and business they were called to lead.
        </p>
      </Card>
      </LuxFadeIn>
    </Section>
  );
}
