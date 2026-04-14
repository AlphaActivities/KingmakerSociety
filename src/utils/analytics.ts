declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export interface AnalyticsEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  data?: Record<string, unknown>;
}

const isDevelopment = import.meta.env.DEV;

const logEvent = (platform: string, event: string, params?: unknown) => {
  if (isDevelopment) {
    console.log(`[${platform}]`, event, params);
  }
};

export const trackPageView = (path?: string) => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path || window.location.pathname,
    });
    logEvent('GA4', 'page_view', { page_path: path });
  }

  if (window.fbq) {
    window.fbq('track', 'PageView');
    logEvent('Meta', 'PageView', {});
  }
};

export const trackBeginApplication = () => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'begin_application', {
      event_category: 'engagement',
      event_label: 'hero_form_started',
    });
    logEvent('GA4', 'begin_application', {});
  }

  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: 'Application Form',
      content_category: 'Lead Generation',
    });
    logEvent('Meta', 'ViewContent', { content_name: 'Application Form' });
  }
};

export const trackCompleteLeadForm = (data?: { name?: string; email?: string }) => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'complete_lead_form', {
      event_category: 'conversion',
      event_label: 'hero_form_submitted',
    });
    logEvent('GA4', 'complete_lead_form', {});
  }

  if (window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: 'Hero Application',
      content_category: 'Lead Form',
    });
    logEvent('Meta', 'Lead', { content_name: 'Hero Application' });
  }
};

export const trackCompleteQuestionnaire = (answers?: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'complete_questionnaire', {
      event_category: 'conversion',
      event_label: 'questionnaire_submitted',
    });
    logEvent('GA4', 'complete_questionnaire', {});
  }

  if (window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: 'Full Questionnaire',
      content_category: 'Qualification',
    });
    logEvent('Meta', 'Lead', { content_name: 'Full Questionnaire' });
  }
};

export const trackClickBookCall = (source?: string) => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'click_book_call', {
      event_category: 'engagement',
      event_label: source || 'book_call_section',
    });
    logEvent('GA4', 'click_book_call', { source });
  }

  if (window.fbq) {
    window.fbq('track', 'Contact', {
      content_name: 'Book Strategy Call',
      content_category: 'Calendly',
    });
    logEvent('Meta', 'Contact', { content_name: 'Book Strategy Call' });
  }
};

export const trackClickJoinTier = (tier: 'general' | 'vip' | 'elite', price: number) => {
  if (typeof window === 'undefined') return;

  const eventName = tier === 'general'
    ? 'click_join_now_tier_1'
    : tier === 'vip'
    ? 'click_join_now_tier_2'
    : 'click_join_now_tier_3';

  if (window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'conversion',
      event_label: `${tier}_tier`,
      value: price,
      currency: 'USD',
    });
    logEvent('GA4', eventName, { tier, price });
  }

  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_name: `${tier.charAt(0).toUpperCase() + tier.slice(1)} Membership`,
      content_category: 'Subscription',
      value: price,
      currency: 'USD',
    });
    logEvent('Meta', 'InitiateCheckout', { tier, price });
  }
};

export const trackSocialProofView = () => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'view_social_proof', {
      event_category: 'engagement',
      event_label: 'social_proof_section',
    });
    logEvent('GA4', 'view_social_proof', {});
  }

  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: 'Social Proof',
      content_category: 'Testimonials',
    });
    logEvent('Meta', 'ViewContent', { content_name: 'Social Proof' });
  }
};

export const trackFinalCTA = (action: 'apply' | 'book_call') => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'click_final_cta', {
      event_category: 'engagement',
      event_label: `final_cta_${action}`,
    });
    logEvent('GA4', 'click_final_cta', { action });
  }
};

export const initializeAnalytics = () => {
  if (typeof window === 'undefined') return;

  if (isDevelopment) {
    console.log('[Analytics] Initialized in development mode - events will be logged to console');
  }

  trackPageView();
};
