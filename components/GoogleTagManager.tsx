'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface GoogleTagManagerProps {
  gtmId: string;
}

export function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  const pathname = usePathname();
  
  // Initialize GTM
  useEffect(() => {
    const scriptId = 'google-tag-manager';
    
    // Check if script already exists
    if (document.getElementById(scriptId)) return;
    
    // Add GTM script
    const script = document.createElement('script');
    script.id = scriptId;
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `;
    document.head.appendChild(script);
    
    return () => {
      // Cleanup if needed
    };
  }, [gtmId]);
  
  // Track page views
  useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        page: {
          path: pathname,
          title: document.title
        }
      });
    }
  }, [pathname]);
  
  return null;
}