import { createContext, useContext, useState, ReactNode } from 'react';

interface ApplicationContextType {
  leadId: string | null;
  setLeadId: (id: string) => void;
  applicationStep: 'lead-form' | 'questionnaire' | 'call-booking' | 'pricing' | 'complete';
  setApplicationStep: (step: 'lead-form' | 'questionnaire' | 'call-booking' | 'pricing' | 'complete') => void;
  leadSubmitted: boolean;
  setLeadSubmitted: (submitted: boolean) => void;
  questionnaireSubmitted: boolean;
  setQuestionnaireSubmitted: (submitted: boolean) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [leadId, setLeadId] = useState<string | null>(null);
  const [applicationStep, setApplicationStep] = useState<'lead-form' | 'questionnaire' | 'call-booking' | 'pricing' | 'complete'>('lead-form');
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [questionnaireSubmitted, setQuestionnaireSubmitted] = useState(false);

  return (
    <ApplicationContext.Provider
      value={{
        leadId,
        setLeadId,
        applicationStep,
        setApplicationStep,
        leadSubmitted,
        setLeadSubmitted,
        questionnaireSubmitted,
        setQuestionnaireSubmitted,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApplication must be used within an ApplicationProvider');
  }
  return context;
};
