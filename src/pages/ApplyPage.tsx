import { useEffect, useRef } from 'react';
import { ApplicationProvider, useApplication } from '../context/ApplicationContext';
import ApplyHeader from '../components/apply/ApplyHeader';
import StageIndicator from '../components/apply/StageIndicator';
import ApplyLeadForm from '../components/apply/ApplyLeadForm';
import ApplyQuestionnaire from '../components/apply/ApplyQuestionnaire';
import ApplyCallBooking from '../components/apply/ApplyCallBooking';

function ApplyShell() {
  const { applicationStep } = useApplication();
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [applicationStep]);

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='%231F1F1F' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-[#FFC300]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-[#D11F2A]/5 rounded-full blur-[120px] pointer-events-none" />

      <ApplyHeader />

      <main className="relative z-10 pt-24 pb-28 px-4 sm:px-6">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <StageIndicator currentStep={applicationStep} />
          </div>

          <div key={applicationStep} className="slide-up" ref={stepRef}>
            {applicationStep === 'lead-form' && <ApplyLeadForm />}
            {applicationStep === 'questionnaire' && <ApplyQuestionnaire />}
            {(applicationStep === 'call-booking' || applicationStep === 'complete') && <ApplyCallBooking />}
          </div>
        </div>
      </main>

      <footer className="relative z-10 pb-8 text-center">
        <p className="text-[11px] text-white/10 tracking-[0.2em] uppercase">
          Kingmaker Society &mdash; Application Portal
        </p>
      </footer>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <ApplicationProvider>
      <ApplyShell />
    </ApplicationProvider>
  );
}
