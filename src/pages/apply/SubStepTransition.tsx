import { ReactNode, useEffect, useState } from 'react';

interface SubStepTransitionProps {
  stepKey: number;
  children: ReactNode;
}

export default function SubStepTransition({ stepKey, children }: SubStepTransitionProps) {
  const [visible, setVisible] = useState(true);
  const [displayKey, setDisplayKey] = useState(stepKey);

  useEffect(() => {
    setVisible(false);
    const t1 = setTimeout(() => {
      setDisplayKey(stepKey);
      setVisible(true);
    }, 150);
    return () => clearTimeout(t1);
  }, [stepKey]);

  return (
    <div
      className="w-full transition-all duration-200 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
      }}
      key={displayKey}
    >
      {children}
    </div>
  );
}
