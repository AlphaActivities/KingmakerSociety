import { useEffect } from 'react';
import { ApplicationProvider, useApplication } from '../context/ApplicationContext';
import ApplyHeader from '../components/apply/ApplyHeader';
import StageIndicator from '../components/apply/StageIndicator';
import ApplyLeadForm from '../components/apply/ApplyLeadForm';
import ApplyQuestionnaire from '../components/apply/ApplyQuestionnaire';
import ApplyCallBooking from '../components/apply/ApplyCallBooking';

function ApplyShell() {
  const { applicationStep } = useApplication();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [applicationStep]);

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFGMUYxRiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-[0.12] fixed inset-0 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#FFC300]/5 rounded-full blur-[150px] fixed pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#D11F2A]/5 rounded-full blur-[120px] fixed pointer-events-none" />

      <ApplyHeader />

      <main className="relative z-10 pt-24 pb-24 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-10">
            <StageIndicator currentStep={applicationStep} />
          </div>

          <div key={applicationStep} className="fade-in">
            {applicationStep === 'lead-form' && <ApplyLeadForm />}
            {applicationStep === 'questionnaire' && <ApplyQuestionnaire />}
            {(applicationStep === 'call-booking' || applicationStep === 'complete') && <ApplyCallBooking />}
          </div>
        </div>
      </main>

      <footer className="relative z-10 pb-8 text-center">
        <p className="text-[11px] text-white/15 tracking-widest uppercase">
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
