import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface GoogleTagManagerProps {
  gtmId: string;
}

export function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  const location = useLocation();
  
  // Initialize GTM
  useEffect(() => {
    // Skip in development mode if needed
    // if (process.env.NODE_ENV === 'development') return;
    
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
    
    // Add GTM noscript fallback
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
    
    return () => {
      // Cleanup if needed
    };
  }, [gtmId]);
  
  // Track page views
  useEffect(() => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        page: {
          path: location.pathname,
          title: document.title
        }
      });
    }
  }, [location]);
  
  return null;
} 