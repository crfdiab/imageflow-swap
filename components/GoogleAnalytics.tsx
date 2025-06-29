'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface GoogleAnalyticsProps {
  measurementId: string;
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  
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
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_title: document.title
      });
    }
  }, [pathname]);
  
  return null;
}