export const luxuryScrollToSection = (sectionId: string, offset: number = 80) => {
  const element = document.getElementById(sectionId);
  if (!element) return;

  // Special handling for application-form: use 96px on mobile for proper positioning
  // All other sections: use 40px on mobile, 80px on desktop/tablet
  let finalOffset: number;
  if (sectionId === 'application-form') {
    finalOffset = window.innerWidth < 768 ? 96 : 80;
  } else {
    finalOffset = window.innerWidth < 768 ? 40 : offset;
  }

  // Wait for any ongoing animations/transitions to complete before calculating position
  // This prevents race conditions with CSS transforms and layout shifts
  const performScroll = () => {
    // Force a reflow to ensure all CSS animations have settled
    element.offsetHeight;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - finalOffset;
    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;
    const duration = 1300;
    let start: number | null = null;

    const easeOutQuart = (t: number): number => {
      return 1 - Math.pow(1 - t, 4);
    };

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeOutQuart(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  // Check if element has any ongoing transitions
  const computedStyle = window.getComputedStyle(element);
  const transitionDuration = computedStyle.transitionDuration;

  // If there are active transitions, wait for them to complete
  if (transitionDuration && transitionDuration !== '0s') {
    // Parse all transition durations and delays to find the longest total time
    const durations = transitionDuration.split(',').map(d => parseFloat(d) * 1000);
    const delays = (computedStyle.transitionDelay || '0s').split(',').map(d => parseFloat(d) * 1000);
    const maxTime = Math.max(...durations.map((d, i) => d + (delays[i] || 0)));

    // Wait for transitions to complete, then perform scroll
    setTimeout(performScroll, Math.min(maxTime + 50, 100));
  } else {
    // No transitions detected, but still add small delay for safety
    requestAnimationFrame(performScroll);
  }
};

export const scrollToApplication = () => {
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    luxuryScrollToSection('application-form', 80);
  } else {
    luxuryScrollToSection('hero', 80);
  }
};
