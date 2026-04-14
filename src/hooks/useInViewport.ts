import { useEffect, useState, useRef } from 'react';

interface UseInViewportOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function useInViewport({ threshold = 0.1, triggerOnce = true }: UseInViewportOptions = {}) {
  const [isInViewport, setIsInViewport] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (triggerOnce && hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInViewport(inView);

        if (inView && triggerOnce) {
          setHasTriggered(true);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, triggerOnce, hasTriggered]);

  return { ref, isInViewport };
}
