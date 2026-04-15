import { Crown, ArrowRight } from 'lucide-react';
import Section from '../ui/Section';
import Button from '../ui/Button';
import LuxFadeIn from '../ui/LuxFadeIn';
import { luxuryScrollToSection } from '../../utils/luxuryScroll';
import { trackFinalCTA } from '../../utils/analytics';

export default function FinalCTA() {
  const scrollToSection = (id: string) => {
    luxuryScrollToSection(id, 80);
  };

  const handleApplyClick = () => {
    trackFinalCTA('apply');
    scrollToSection('hero');
  };

  const handleBookCallClick = () => {
    trackFinalCTA('book_call');
    scrollToSection('book-call');
  };

  return (
    <Section id="final-cta" background="gradient" className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/posters/kingmaker-rise-above-the-ordinary-poster.png"
          alt=""
          className="w-full h-full object-cover opacity-20 animate-[hero-ken-burns_20s_ease-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/80 via-[#0B0B0B]/70 to-[#0B0B0B]/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#D11F2A]/10 to-[#FFC300]/10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFC300]/10 rounded-full blur-[150px] animate-pulse"></div>
      </div>

      <div className="relative z-10">
        <div className="relative text-center max-w-4xl mx-auto space-y-8">
          <LuxFadeIn>
            <div className="relative inline-block">
              <Crown className="w-20 h-20 text-[#FFC300] mx-auto drop-shadow-[0_0_40px_rgba(255,195,0,0.6)] animate-pulse" />
              <div className="absolute -inset-4 bg-[#FFC300]/20 rounded-full blur-2xl animate-pulse"></div>
            </div>
          </LuxFadeIn>

          <LuxFadeIn delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">Your Transformation Starts</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] via-[#FFD033] to-[#D4A000] drop-shadow-[0_0_35px_rgba(255,195,0,0.5)]">
                Today
              </span>
            </h2>
          </LuxFadeIn>

          <LuxFadeIn delay={0.2}>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              You have two choices. Keep trying to do this alone, watching another year slip by. Or join a brotherhood of faith-driven men building discipline, purpose, and the life they were called to lead.
            </p>
          </LuxFadeIn>

          <LuxFadeIn delay={0.3}>
            <div className="relative bg-gradient-to-br from-[#1B1B1B]/95 to-[#2B2B2B]/95 border-2 border-[#FFC300]/40 rounded-2xl p-8 md:p-12 hover:border-[#FFC300]/60 hover:shadow-2xl hover:shadow-[#FFC300]/30 transition-all duration-500 backdrop-blur-sm luxury-grain overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFC300]/5 via-[#D11F2A]/5 to-[#FFC300]/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
            <p className="text-2xl md:text-3xl font-bold text-white mb-6">
              The Question Is Simple:
            </p>
            <p className="text-xl md:text-2xl text-[#FFC300] mb-8">
              Are you ready to lead your life, not just live it?
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={handleApplyClick}
                className="text-lg group relative overflow-hidden shadow-[0_0_40px_rgba(255,195,0,0.3)] hover:shadow-[0_0_60px_rgba(255,195,0,0.5)] animate-pulse-glow transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center justify-center relative z-10">
                  Start Your Application
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleBookCallClick}
                className="text-lg whitespace-nowrap hover:scale-105 transition-transform duration-300"
              >
                Book a Strategy Call
              </Button>
            </div>
            </div>
          </div>
          </LuxFadeIn>

          <LuxFadeIn delay={0.4}>
            <div className="pt-8">
              <p className="text-gray-400 text-lg">
                Join hundreds of faith-driven men mastering their body, habits, and purpose through the Kingmaker Society brotherhood.
              </p>
            </div>
          </LuxFadeIn>
        </div>
      </div>
    </Section>
  );
}
