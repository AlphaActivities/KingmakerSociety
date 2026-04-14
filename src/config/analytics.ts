export const analyticsConfig = {
  ga4: {
    measurementId: import.meta.env.VITE_GA4_MEASUREMENT_ID || '',
    enabled: !!import.meta.env.VITE_GA4_MEASUREMENT_ID,
  },
  metaPixel: {
    pixelId: import.meta.env.VITE_META_PIXEL_ID || '',
    enabled: !!import.meta.env.VITE_META_PIXEL_ID,
  },
  googleAds: {
    conversionId: import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID || '',
    enabled: !!import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID,
  },
  chat: {
    websiteId: import.meta.env.VITE_CHAT_WEBSITE_ID || '',
    enabled: !!import.meta.env.VITE_CHAT_WEBSITE_ID,
    provider: import.meta.env.VITE_CHAT_PROVIDER || 'crisp',
    loadDelay: 2500,
  },
};

export const isAnalyticsEnabled = () => {
  return analyticsConfig.ga4.enabled || analyticsConfig.metaPixel.enabled;
};

export const isChatEnabled = () => {
  return analyticsConfig.chat.enabled;
};
