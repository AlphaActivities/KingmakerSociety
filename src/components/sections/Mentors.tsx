import { Crown, Dumbbell, Swords, Activity } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import LuxFadeIn from '../ui/LuxFadeIn';
import MediaImage from '../ui/MediaImage';

export default function Mentors() {
  const founder = {
    name: 'Jordan Ali',
    role: 'Founder, Kingmaker Society',
    icon: Crown,
    image: '/images/founders/jordan-ali-founder-selfie-portrait.jpg',
    description: 'Professional MMA fighter, business owner, and man of God. Jordan founded Kingmaker Society to create a high-accountability environment where men sharpen men through structure, brotherhood, and real action. He lives the standards he teaches: show up daily, train with intention, and build a life you can be proud of.',
  };

  const mentors = [
    {
      name: 'Willie',
      division: 'MMA Division Lead',
      icon: Swords,
      image: '/images/mentors/willie-mma-division-lead-champion.jpg',
      description: 'Combat sports expert teaching discipline, toughness, and warrior mentality.',
    },
    {
      name: 'Marcus',
      division: 'Bodybuilding Division Lead',
      icon: Dumbbell,
      image: '/images/mentors/marcus-bodybuilding-division-lead-stage.jpg',
      description: 'Bodybuilding specialist focused on building mass, strength, and aesthetic physiques.',
    },
    {
      name: 'Jordan Ali',
      division: 'Calisthenics Division Lead',
      icon: Activity,
      image: '/images/founders/jordan-ali-founder-gym-portrait.jpg',
      description: 'Calisthenics master teaching bodyweight mastery and functional strength.',
    },
  ];

  return (
    <Section id="mentors" background="darker">
      <LuxFadeIn>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#FFC300]/10 border border-[#FFC300]/30 rounded-full mb-6 shadow-lg shadow-[#FFC300]/20">
            <Crown className="w-4 h-4 text-[#FFC300]" />
            <span className="text-sm font-semibold text-[#FFC300]">Leadership</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">Meet Your</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] via-[#FFD033] to-[#D4A000] drop-shadow-[0_0_30px_rgba(255,195,0,0.4)]">Mentors</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Learn from men who have walked the path and built the life you want.
          </p>
        </div>
      </LuxFadeIn>

      <div className="mb-16">
        <LuxFadeIn delay={0.1}>
          <h3 className="text-2xl font-bold text-[#FFC300] mb-8 text-center drop-shadow-[0_0_20px_rgba(255,195,0,0.3)]">Founder</h3>
        </LuxFadeIn>
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <LuxFadeIn delay={0.2}>
              <Card variant="gold" className="p-8 h-full hover:scale-105 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#FFC300]/10 to-transparent rounded-full blur-3xl"></div>
                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-[#FFC300] shadow-2xl shadow-[#FFC300]/40">
                    <MediaImage
                      src={founder.image}
                      alt={`${founder.name}, ${founder.role}`}
                      className="w-full h-full"
                      objectFit="cover"
                      lazy={false}
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">{founder.name}</h4>
                    <p className="text-[#FFC300] font-semibold mb-4 drop-shadow-[0_0_15px_rgba(255,195,0,0.3)]">{founder.role}</p>
                    <p className="text-gray-300 leading-relaxed">{founder.description}</p>
                  </div>
                </div>
              </Card>
            </LuxFadeIn>
          </div>
        </div>
      </div>

      <div>
        <LuxFadeIn delay={0.4}>
          <h3 className="text-2xl font-bold text-[#FFC300] mb-8 text-center drop-shadow-[0_0_20px_rgba(255,195,0,0.3)]">Division Mentors</h3>
        </LuxFadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {mentors.map((mentor, index) => (
            <LuxFadeIn key={index} delay={0.5 + index * 0.1}>
              <Card variant="premium" hover className="p-6 h-full">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#FFC300]/30 shadow-xl shadow-[#D11F2A]/20">
                  <MediaImage
                    src={mentor.image}
                    alt={`${mentor.name}, ${mentor.division}`}
                    className="w-full h-full"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#D11F2A]/60 to-transparent" />
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                    <mentor.icon className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">{mentor.name}</h4>
                  <p className="text-[#FFC300] font-semibold text-sm mb-3">{mentor.division}</p>
                  <p className="text-gray-400 text-sm">{mentor.description}</p>
                </div>
              </div>
            </Card>
            </LuxFadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}
