import { useEffect, useState } from 'react';
import { analyticsConfig } from '../config/analytics';

declare global {
  interface Window {
    $crisp?: unknown[];
    CRISP_WEBSITE_ID?: string;
  }
}

export default function ChatWidget() {
  const [isLoading, setIsLoading] = useState(false);
  const isDevelopment = import.meta.env.DEV;

  useEffect(() => {
    if (!analyticsConfig.chat.enabled) {
      if (isDevelopment) {
        console.log('[Chat] Chat widget disabled - no website ID configured');
      }
      return;
    }

    const loadDelay = analyticsConfig.chat.loadDelay || 2500;

    const timeoutId = setTimeout(() => {
      setIsLoading(true);
      loadChatWidget();
    }, loadDelay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const loadChatWidget = () => {
    const provider = analyticsConfig.chat.provider;
    const websiteId = analyticsConfig.chat.websiteId;

    if (isDevelopment) {
      console.log(`[Chat] Loading ${provider} chat widget with ID: ${websiteId}`);
    }

    if (provider === 'crisp') {
      loadCrispChat(websiteId);
    } else {
      if (isDevelopment) {
        console.warn(`[Chat] Unknown provider: ${provider}. Defaulting to Crisp.`);
      }
      loadCrispChat(websiteId);
    }
  };

  const loadCrispChat = (websiteId: string) => {
    if (window.$crisp) {
      if (isDevelopment) {
        console.log('[Chat] Crisp already loaded');
      }
      return;
    }

    window.$crisp = [];
    window.CRISP_WEBSITE_ID = websiteId;

    const script = document.createElement('script');
    script.src = 'https://client.crisp.chat/l.js';
    script.async = true;

    script.onload = () => {
      if (isDevelopment) {
        console.log('[Chat] Crisp chat loaded successfully');
      }
    };

    script.onerror = () => {
      if (isDevelopment) {
        console.error('[Chat] Failed to load Crisp chat');
      }
    };

    document.head.appendChild(script);
  };

  return null;
}
