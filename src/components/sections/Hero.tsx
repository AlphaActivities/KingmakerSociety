import { Shield, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Container from '../ui/Container';
import LuxFadeIn from '../ui/LuxFadeIn';
import HeroBackgroundSlider from '../ui/HeroBackgroundSlider';
import { luxuryScrollToSection } from '../../utils/luxuryScroll';

export default function Hero() {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    luxuryScrollToSection(id, 80);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 overflow-hidden luxury-grain">
      <HeroBackgroundSlider />

      <div className="absolute inset-0 z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFGMUYxRiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFC300]/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D11F2A]/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

      <Container className="relative z-20">
        <div className="max-w-3xl mx-auto text-center space-y-10 py-16 md:py-24">
          <LuxFadeIn delay={0.1}>
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#D11F2A]/10 border-2 border-[#D11F2A]/40 rounded-full shadow-lg shadow-[#D11F2A]/20 hover:shadow-[#D11F2A]/40 hover:scale-105 transition-all duration-300 animate-pulse-glow-subtle">
              <Shield className="w-5 h-5 text-[#D11F2A] drop-shadow-[0_0_8px_rgba(209,31,42,0.6)]" />
              <span className="text-sm font-bold text-[#D11F2A] drop-shadow-[0_0_8px_rgba(209,31,42,0.3)]">Elite Brotherhood</span>
            </div>
          </LuxFadeIn>

          <LuxFadeIn delay={0.2}>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-tight">
              <span className="text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">Kingmaker</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] via-[#FFD033] to-[#D4A000] drop-shadow-[0_0_40px_rgba(255,195,0,0.6)] animate-gradient-shift">Society</span>
            </h1>
          </LuxFadeIn>

          <LuxFadeIn delay={0.3}>
            <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              A structured brotherhood for faith-driven men working a 9-to-5 who want to build their body, discipline, goals, and future business
              <span className="text-[#FFC300] font-semibold"> without doing it alone.</span>
            </p>
            <p className="text-lg sm:text-xl text-gray-400 italic mt-4">
              Built for men who want to lead their life, not just live it.
            </p>
          </LuxFadeIn>

          <LuxFadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/apply')}
                className="animate-pulse-glow"
              >
                Start Your Application
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('book-call')}
                className="whitespace-nowrap"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book a Call
              </Button>
            </div>
          </LuxFadeIn>

          <LuxFadeIn delay={0.5}>
            <div className="flex items-center justify-center gap-8 pt-4">
              {[
                { value: '<5%', label: 'Acceptance Rate' },
                { value: '90 Days', label: 'To Transform' },
                { value: '100%', label: 'Brotherhood' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-bold text-[#FFC300]">{value}</p>
                  <p className="text-xs text-gray-500 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </LuxFadeIn>
        </div>
      </Container>
    </section>
  );
}
