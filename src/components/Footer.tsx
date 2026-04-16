import { Mail, Facebook, Instagram, Youtube, MessageCircle, Calendar } from 'lucide-react';
import { luxuryScrollToSection } from '../utils/luxuryScroll';
import { trackClickBookCall } from '../utils/analytics';

interface FooterProps {
  onMembersClick?: () => void;
}

export default function Footer({ onMembersClick }: FooterProps) {
  const scrollToSection = (id: string) => {
    luxuryScrollToSection(id, 80);
  };

  const handleBookCall = () => {
    trackClickBookCall('footer_contact');
    window.open('https://calendly.com/jordanaliwork/30min', '_blank');
  };

  const footerLinks = {
    navigation: [
      { label: 'Home', id: 'hero' },
      { label: 'About', id: 'who-this-is-for' },
      { label: 'Schedule', id: 'schedule' },
      { label: 'Mentors', id: 'mentors' },
      { label: 'Pricing', id: 'pricing' },
    ],
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: 'https://www.facebook.com/share/1AjDsJoufe/?mibextid=wwXIfr',
      label: 'Facebook',
      gradient: 'from-blue-600 to-blue-400',
      hoverGlow: 'hover:shadow-blue-500/50',
      isExternal: true,
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/kingmakersocial?igsh=YXdveTkyczZkazgy',
      label: 'Instagram',
      gradient: 'from-pink-600 via-purple-600 to-orange-500',
      hoverGlow: 'hover:shadow-pink-500/50',
      isExternal: true,
    },
    {
      icon: Youtube,
      href: 'https://www.youtube.com/@KINGMAKERSOCIETY',
      label: 'YouTube',
      gradient: 'from-red-600 to-red-500',
      hoverGlow: 'hover:shadow-red-500/50',
      isExternal: true,
    },
    {
      icon: MessageCircle,
      href: '',
      label: 'Members Only',
      gradient: 'from-indigo-600 to-indigo-500',
      hoverGlow: 'hover:shadow-indigo-500/50',
      isExternal: false,
    },
  ];

  return (
    <footer className="bg-black border-t border-[#2B2B2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-12 mb-8">
          <div className="md:col-span-1 flex flex-col">
            <div className="flex flex-col items-center space-y-3 mb-6">
              <img
                src="/images/logos/logo.PNG"
                alt="Kingmaker Society Logo"
                className="h-24 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,195,0,0.3)] transition-all duration-500 hover:drop-shadow-[0_0_25px_rgba(255,195,0,0.5)] hover:scale-105"
              />
              <span className="text-2xl font-bold text-white tracking-wide">
                Kingmaker <span className="text-[#FFC300]">Society</span>
              </span>
            </div>
            <div className="text-gray-400 text-sm text-center leading-relaxed space-y-3 flex-1">
              <p className="text-gray-300">Built for men who want to lead their life, not just live it.</p>
              <p className="text-gray-300">Where discipline meets purpose, and brotherhood fuels transformation.</p>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-white font-bold mb-6">Navigation</h3>
            <nav className="flex flex-col space-y-1.5 md:space-y-0 md:flex-1">
              {footerLinks.navigation.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.id)}
                  className="group relative flex items-center text-sm font-medium text-gray-400 hover:text-[#FFC300] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFC300] text-left py-3 min-h-[44px] md:py-0 md:min-h-0 md:flex-1 w-full"
                >
                  <span>{link.label}</span>
                  <span className="pointer-events-none absolute left-0 -bottom-0.5 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#FFD54F] via-[#FFC300] to-[#FFB000] transition-transform duration-300 group-hover:scale-x-100" />
                </button>
              ))}
            </nav>
          </div>

          <div className="flex flex-col">
            <h3 className="text-white font-bold mb-6">Connect</h3>
            <div className="flex flex-col space-y-4 flex-1">
              {socialLinks.map((social, index) => {
                const content = (
                  <>
                    <div className={`relative w-10 h-10 rounded-lg bg-gradient-to-br ${social.gradient} flex items-center justify-center transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-6 shadow-xl ${social.hoverGlow}`}>
                      <social.icon className="w-5 h-5 text-white" />
                      <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-200">
                      {social.label}
                    </span>
                  </>
                );

                if (social.isExternal) {
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-3"
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <button
                    key={index}
                    onClick={onMembersClick}
                    className="group flex items-center space-x-3"
                  >
                    {content}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-white font-bold mb-6">Contact</h3>
            <div className="space-y-5 flex-1">
              <a
                href="mailto:contact@kingmakersociety.com"
                className="flex items-center space-x-2 text-gray-400 hover:text-[#FFC300] transition-colors duration-200 text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>contact@kingmakersociety.com</span>
              </a>

              <button
                onClick={handleBookCall}
                className="group relative w-full px-4 py-2.5 bg-gradient-to-r from-[#FFC300] via-[#FFD033] to-[#D4A000] text-[#0B0B0B] font-bold rounded-lg transition-all duration-400 hover:from-[#FFD033] hover:via-[#FFE066] hover:to-[#E5B100] shadow-[0_3px_16px_rgba(255,195,0,0.35)] hover:shadow-[0_6px_24px_rgba(255,195,0,0.55)] hover:-translate-y-0.5 hover:scale-105 transform-gpu active:scale-95 focus:outline-none focus:ring-3 focus:ring-offset-2 focus:ring-offset-[#0B0B0B] focus:ring-[#FFC300]/60 overflow-hidden text-sm min-h-[44px]"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Book Strategy Call</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#2B2B2B] pt-8">
          <div className="flex justify-center items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Kingmaker Society. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
