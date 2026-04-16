import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const STORAGE_KEY = 'kms_application_session';

type ApplicationStep = 'lead-form' | 'questionnaire' | 'call-booking' | 'complete';

interface StoredSession {
  applicationToken: string;
  applicationStep: ApplicationStep;
}

interface ApplicationContextType {
  applicationToken: string | null;
  setApplicationToken: (token: string) => void;
  applicationStep: ApplicationStep;
  setApplicationStep: (step: ApplicationStep) => void;
  leadSubmitted: boolean;
  setLeadSubmitted: (submitted: boolean) => void;
  questionnaireSubmitted: boolean;
  setQuestionnaireSubmitted: (submitted: boolean) => void;
  resetApplication: () => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

function loadSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredSession;
  } catch {
    return null;
  }
}

function saveSession(token: string, step: ApplicationStep) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ applicationToken: token, applicationStep: step }));
  } catch {
    // localStorage unavailable — continue without persistence
  }
}

function clearSession() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const stored = loadSession();

  const [applicationToken, setApplicationTokenState] = useState<string | null>(
    stored?.applicationToken ?? null
  );
  const [applicationStep, setApplicationStepState] = useState<ApplicationStep>(
    stored?.applicationStep ?? 'lead-form'
  );
  const [leadSubmitted, setLeadSubmitted] = useState(!!stored?.applicationToken);
  const [questionnaireSubmitted, setQuestionnaireSubmitted] = useState(
    stored?.applicationStep === 'complete'
  );

  const setApplicationToken = (token: string) => {
    setApplicationTokenState(token);
    setLeadSubmitted(true);
    saveSession(token, applicationStep);
  };

  const setApplicationStep = (step: ApplicationStep) => {
    setApplicationStepState(step);
    if (applicationToken) {
      saveSession(applicationToken, step);
    }
  };

  useEffect(() => {
    if (applicationToken) {
      saveSession(applicationToken, applicationStep);
    }
  }, [applicationToken, applicationStep]);

  const resetApplication = () => {
    setApplicationTokenState(null);
    setApplicationStepState('lead-form');
    setLeadSubmitted(false);
    setQuestionnaireSubmitted(false);
    clearSession();
  };

  return (
    <ApplicationContext.Provider
      value={{
        applicationToken,
        setApplicationToken,
        applicationStep,
        setApplicationStep,
        leadSubmitted,
        setLeadSubmitted,
        questionnaireSubmitted,
        setQuestionnaireSubmitted,
        resetApplication,
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
