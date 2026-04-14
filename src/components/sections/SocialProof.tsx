import { Facebook, Instagram, Youtube, Link as LinkIcon, MessageCircle, Users, Flame, Phone } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import LuxFadeIn from '../ui/LuxFadeIn';
import { useCountUp } from '../../hooks/useCountUp';
import { useInViewport } from '../../hooks/useInViewport';

interface SocialProofProps {
  onMembersClick?: () => void;
}

export default function SocialProof({ onMembersClick }: SocialProofProps) {
  const { ref: statsRef, isInViewport } = useInViewport({ threshold: 0.3 });
  const membersCount = useCountUp({ end: 100, duration: 2500, enabled: isInViewport });
  const transformationsCount = useCountUp({ end: 1000, duration: 2500, enabled: isInViewport });
  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/share/1AjDsJoufe/?mibextid=wwXIfr',
      gradient: 'from-blue-600 to-blue-400',
      hoverGlow: 'group-hover:shadow-blue-500/60',
      iconColor: 'text-blue-400',
      isExternal: true,
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/kingmakersocial?igsh=YXdveTkyczZkazgy',
      gradient: 'from-pink-600 via-purple-600 to-orange-500',
      hoverGlow: 'group-hover:shadow-pink-500/60',
      iconColor: 'text-pink-400',
      isExternal: true,
    },
    {
      name: 'TikTok',
      icon: MessageCircle,
      url: 'https://www.tiktok.com/@kingmaker.society?_r=1&_t=ZP-946vWbtdl9S',
      gradient: 'from-cyan-500 to-pink-500',
      hoverGlow: 'group-hover:shadow-cyan-400/60',
      iconColor: 'text-cyan-400',
      isExternal: true,
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/@KINGMAKERSOCIETY',
      gradient: 'from-red-600 to-red-400',
      hoverGlow: 'group-hover:shadow-red-500/60',
      iconColor: 'text-red-400',
      isExternal: true,
    },
    {
      name: 'Linktree',
      icon: LinkIcon,
      url: 'https://linktr.ee/kingmakersocialwork',
      gradient: 'from-green-600 to-emerald-400',
      hoverGlow: 'group-hover:shadow-green-500/60',
      iconColor: 'text-green-400',
      isExternal: true,
    },
    {
      name: 'Members Only',
      icon: MessageCircle,
      url: '',
      gradient: 'from-indigo-600 to-indigo-400',
      hoverGlow: 'group-hover:shadow-indigo-500/60',
      iconColor: 'text-indigo-400',
      isExternal: false,
    },
  ];

  const stats = [
    {
      value: '100+',
      label: 'Active Members',
      gradient: 'from-[#FFC300] via-[#FFD700] to-[#FFA500]',
      glowColor: 'group-hover:shadow-[#FFC300]/60',
      icon: Users,
    },
    {
      value: '1000+',
      label: 'Transformations',
      gradient: 'from-[#FFC300] via-[#FFD700] to-[#FFA500]',
      glowColor: 'group-hover:shadow-[#FFC300]/60',
      icon: Flame,
    },
    {
      value: 'Daily',
      label: 'Accountability Calls',
      gradient: 'from-[#FFC300] via-[#FFD700] to-[#FFA500]',
      glowColor: 'group-hover:shadow-[#FFC300]/60',
      icon: Phone,
    },
  ];

  return (
    <Section id="social" background="darker">
      <LuxFadeIn>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join the Brotherhood
          </h2>
          <p className="text-xl text-gray-300">
            Connect with us on social media and see the daily wins, transformations, and brotherhood in action.
          </p>
        </div>
      </LuxFadeIn>

      <LuxFadeIn delay={0.1}>
        <div className="relative p-12 bg-gradient-to-br from-[#1B1B1B]/95 to-[#2B2B2B]/95 border-2 border-[#FFC300]/30 rounded-2xl shadow-2xl shadow-[#FFC300]/20 backdrop-blur-sm luxury-grain overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFC300]/5 via-transparent to-[#D11F2A]/5 animate-pulse"></div>
          <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {socialLinks.map((social, index) => {
              const content = (
                <>
                  <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${social.gradient} flex items-center justify-center transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-6 shadow-xl ${social.hoverGlow}`}>
                    <social.icon className="w-10 h-10 text-white drop-shadow-lg" />
                    <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
                  </div>
                  <span className={`text-sm font-semibold ${social.iconColor} group-hover:text-white transition-colors duration-300`}>
                    {social.name}
                  </span>
                </>
              );

              if (social.isExternal) {
                return (
                  <a
                    key={index}
                    href={social.url}
                    className="flex flex-col items-center space-y-4 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                );
              }

              return (
                <button
                  key={index}
                  onClick={onMembersClick}
                  className="flex flex-col items-center space-y-4 group"
                >
                  {content}
                </button>
              );
            })}
          </div>
        </div>
      </LuxFadeIn>

      <div ref={statsRef} className="grid md:grid-cols-3 gap-8 mt-12">
        {stats.map((stat, index) => {
          const displayValue = index === 0 ? `${membersCount}+` : index === 1 ? `${transformationsCount}+` : stat.value;

          return (
            <LuxFadeIn key={index} delay={0.2 + index * 0.1}>
              <div className="group relative px-8 pt-8 pb-12 bg-gradient-to-br from-[#1B1B1B]/95 to-[#2B2B2B]/95 border-2 border-[#FFC300]/30 rounded-2xl shadow-2xl hover:border-[#FFC300]/60 transition-all duration-500 hover:scale-105 luxury-grain overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 shadow-2xl ${stat.glowColor} transition-all duration-500 rounded-2xl`}></div>

                <div className="relative text-center space-y-3">
                  <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <stat.icon
                      size={48}
                      strokeWidth={2.5}
                      className={`text-[#FFC300] drop-shadow-[0_2px_10px_rgba(255,195,0,0.4)] group-hover:drop-shadow-[0_4px_20px_rgba(255,195,0,0.7)] transition-all duration-300`}
                    />
                  </div>
                  <div className={`text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,195,0,0.3)] group-hover:drop-shadow-[0_4px_20px_rgba(255,195,0,0.6)] transition-all duration-500`}>
                    {displayValue}
                  </div>
                  <p className="text-gray-300 text-lg font-semibold group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </LuxFadeIn>
          );
        })}
      </div>
    </Section>
  );
}
