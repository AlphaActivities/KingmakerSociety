import { createContext, useContext, useState, ReactNode } from 'react';

export type ApplyStep =
  | 'welcome'
  | 'goals-vision'
  | 'current-reality'
  | 'belief-commitment'
  | 'verdict'
  | 'pricing';

interface ApplicationContextType {
  leadId: string | null;
  setLeadId: (id: string) => void;
  leadEmail: string;
  setLeadEmail: (email: string) => void;
  firstName: string;
  setFirstName: (name: string) => void;
  applyStep: ApplyStep;
  setApplyStep: (step: ApplyStep) => void;
  leadSubmitted: boolean;
  setLeadSubmitted: (submitted: boolean) => void;
  questionnaireSubmitted: boolean;
  setQuestionnaireSubmitted: (submitted: boolean) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [leadId, setLeadId] = useState<string | null>(null);
  const [leadEmail, setLeadEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [applyStep, setApplyStep] = useState<ApplyStep>('welcome');
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [questionnaireSubmitted, setQuestionnaireSubmitted] = useState(false);

  return (
    <ApplicationContext.Provider
      value={{
        leadId,
        setLeadId,
        leadEmail,
        setLeadEmail,
        firstName,
        setFirstName,
        applyStep,
        setApplyStep,
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
