import { useEffect, useState, useRef } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  enabled?: boolean;
}

export function useCountUp({ end, duration = 2000, start = 0, enabled = true }: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!enabled) return;

    const startTime = Date.now();
    const difference = end - start;

    const easeOutQuart = (t: number): number => {
      return 1 - Math.pow(1 - t, 4);
    };

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = easeOutQuart(progress);
      const currentCount = Math.floor(start + difference * easedProgress);

      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, start, duration, enabled]);

  return count;
}
