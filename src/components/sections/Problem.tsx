import { AlertCircle } from 'lucide-react';
import Section from '../ui/Section';
import LuxFadeIn from '../ui/LuxFadeIn';

export default function Problem() {
  return (
    <Section id="problem" background="darker">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D11F2A]/5 to-transparent opacity-50"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D11F2A]/10 rounded-full blur-[150px] animate-pulse"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
        <LuxFadeIn>
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#D11F2A]/10 border border-[#D11F2A]/30 rounded-full mb-8">
            <AlertCircle className="w-4 h-4 text-[#D11F2A]" />
            <span className="text-sm font-semibold text-[#D11F2A]">The Real Problem</span>
          </div>
        </LuxFadeIn>

        <LuxFadeIn delay={0.1}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Most Men Fail Because They Are{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D11F2A] to-[#8B1419] drop-shadow-[0_0_40px_rgba(209,31,42,0.5)] animate-pulse">
                Alone
              </span>
              <span className="absolute -inset-1 bg-[#D11F2A]/20 blur-xl -z-10 animate-pulse"></span>
            </span>
            <br />
            Not Because They Are{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D11F2A] to-[#8B1419] drop-shadow-[0_0_40px_rgba(209,31,42,0.5)] animate-pulse delay-300">
                Lazy
              </span>
              <span className="absolute -inset-1 bg-[#D11F2A]/20 blur-xl -z-10 animate-pulse delay-300"></span>
            </span>
          </h2>
        </LuxFadeIn>

        <LuxFadeIn delay={0.2}>
          <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed">
            <p>
              You wake up every day with big plans. You tell yourself today will be different.
              You'll hit the gym, work on your side hustle, read that book, pray more, get your life together.
            </p>
            <p className="text-white font-semibold">
              But by the end of the day, nothing changes.
            </p>
            <p>
              It's not because you're weak. It's not because you lack potential.
              It's because you're doing it <span className="text-[#D11F2A] font-bold">alone</span>.
            </p>
            <p>
              No accountability. No structure. No one pushing you. No one to answer to.
              Just you, your excuses, and the same cycle repeating.
            </p>
          </div>
        </LuxFadeIn>

        <LuxFadeIn delay={0.3}>
          <div className="relative mt-12 p-8 md:p-10 bg-gradient-to-br from-[#2B2B2B]/95 to-[#1B1B1B]/95 border-2 border-[#D11F2A]/40 rounded-2xl hover:border-[#D11F2A]/60 hover:shadow-[0_20px_60px_rgba(209,31,42,0.3)] transition-all duration-500 backdrop-blur-sm overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D11F2A]/10 via-transparent to-[#FFC300]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D11F2A] to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFC300] to-transparent"></div>

            <div className="relative z-10">
              <p className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                The truth is, you don't need more motivation.
              </p>
              <p className="text-xl md:text-2xl text-[#FFC300] mt-4 font-semibold drop-shadow-[0_0_20px_rgba(255,195,0,0.3)]">
                You need a system. You need brothers. You need structure.
              </p>
            </div>
          </div>
        </LuxFadeIn>
      </div>
      </div>
    </Section>
  );
}
