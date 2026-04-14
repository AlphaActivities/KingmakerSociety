const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

const runScrollAnimation = (from: number, to: number) => {
  const distance = to - from;
  if (Math.abs(distance) < 1) return;
  const duration = Math.min(1800, Math.max(900, Math.abs(distance) * 0.42));
  let startTime: number | null = null;

  const tick = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, from + distance * easeOutQuart(progress));
    if (elapsed < duration) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

export const luxuryScrollToTop = () => {
  requestAnimationFrame(() => {
    const from = window.pageYOffset;
    if (from < 1) return;
    runScrollAnimation(from, 0);
  });
};

export const luxuryScrollToSection = (sectionId: string, offset: number = 80) => {
  const element = document.getElementById(sectionId);
  if (!element) return;

  let finalOffset: number;
  if (sectionId === 'application-form') {
    finalOffset = window.innerWidth < 768 ? 96 : 80;
  } else {
    finalOffset = window.innerWidth < 768 ? 40 : offset;
  }

  const performScroll = () => {
    void element.offsetHeight;

    let absoluteTop = 0;
    let el: HTMLElement | null = element;
    while (el) {
      absoluteTop += el.offsetTop;
      el = el.offsetParent as HTMLElement | null;
    }

    const target = Math.max(0, absoluteTop - finalOffset);
    const from = window.pageYOffset;
    runScrollAnimation(from, target);
  };

  requestAnimationFrame(performScroll);
};

export const scrollToApplication = () => {
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    luxuryScrollToSection('application-form', 80);
  } else {
    luxuryScrollToSection('hero', 80);
  }
};
