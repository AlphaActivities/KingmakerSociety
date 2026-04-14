import { useEffect, useRef, useState, ReactNode } from 'react';

interface LuxFadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function LuxFadeIn({
  children,
  delay = 0,
  duration = 0.9,
  className = ''
}: LuxFadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Mark animation as complete after delay + duration
      const totalTime = (delay + duration) * 1000;
      const timer = setTimeout(() => {
        setAnimationComplete(true);
        if (elementRef.current) {
          elementRef.current.setAttribute('data-animation-complete', 'true');
        }
      }, totalTime);

      return () => clearTimeout(timer);
    }
  }, [isVisible, delay, duration]);

  return (
    <div
      ref={elementRef}
      className={className}
      data-animation-complete={animationComplete ? 'true' : 'false'}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1) rotateX(0deg)' : 'translateY(40px) scale(0.95) rotateX(5deg)',
        transition: `opacity ${duration}s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s, transform ${duration}s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
