import { ReactNode, useEffect, useState } from 'react';

interface StepTransitionProps {
  children: ReactNode;
  stepKey: string;
}

export default function StepTransition({ children, stepKey }: StepTransitionProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, [stepKey]);

  return (
    <div
      className="w-full transition-all duration-500 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(40px)',
      }}
    >
      {children}
    </div>
  );
}
