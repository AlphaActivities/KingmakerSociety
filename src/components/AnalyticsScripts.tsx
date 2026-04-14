import { useEffect } from 'react';
import { analyticsConfig } from '../config/analytics';

export default function AnalyticsScripts() {
  useEffect(() => {
    if (analyticsConfig.ga4.enabled && analyticsConfig.ga4.measurementId) {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.ga4.measurementId}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${analyticsConfig.ga4.measurementId}', {
          page_path: window.location.pathname,
          send_page_view: true
        });
      `;
      document.head.appendChild(script2);

      window.gtag = function gtag() {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(arguments);
      };

      return () => {
        if (script1.parentNode) script1.parentNode.removeChild(script1);
        if (script2.parentNode) script2.parentNode.removeChild(script2);
      };
    }
  }, []);

  useEffect(() => {
    if (analyticsConfig.metaPixel.enabled && analyticsConfig.metaPixel.pixelId) {
      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${analyticsConfig.metaPixel.pixelId}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);

      const noscript = document.createElement('noscript');
      noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${analyticsConfig.metaPixel.pixelId}&ev=PageView&noscript=1" />`;
      document.body.appendChild(noscript);

      return () => {
        if (script.parentNode) script.parentNode.removeChild(script);
        if (noscript.parentNode) noscript.parentNode.removeChild(noscript);
      };
    }
  }, []);

  return null;
}
