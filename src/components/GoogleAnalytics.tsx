import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface GoogleAnalyticsProps {
  measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const location = useLocation();
  
  // Initialize GA
  useEffect(() => {
    const scriptId = 'google-analytics';
    const configId = 'google-analytics-config';
    
    // Check if scripts already exist
    if (document.getElementById(scriptId)) return;
    
    // Add GA script
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);
    
    // Add GA config
    const configScript = document.createElement('script');
    configScript.id = configId;
    configScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}', { send_page_view: false });
    `;
    document.head.appendChild(configScript);
    
    return () => {
      // Cleanup if needed
    };
  }, [measurementId]);
  
  // Track page views
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname,
        page_title: document.title
      });
    }
  }, [location]);
  
  return null;
} 