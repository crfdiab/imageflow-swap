import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function SchemaMarkup() {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  
  useEffect(() => {
    // Only add schema markup on the homepage
    if (!isHomepage) return;
    
    const scriptId = 'schema-markup';
    
    // Remove existing script if it exists
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }
    
    // Create and add the schema script
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.innerHTML = `
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://convertify.click/#webapp",
      "name": "Convertify",
      "image": "https://convertify.click/og-image.png",
      "applicationCategory": "MultimediaApplication",
      "url": "https://convertify.click",
      "applicationSubCategory": "Image Conversion Tool",
      "operatingSystem": "Windows, Chrome OS, Linux, MacOS, Android, iOS",
      "description": "Free online image format conversion tools. Convert between PNG, JPEG, WebP, AVIF, GIF, SVG and more. No upload required - all processing happens right in your browser for complete privacy.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://convertify.click"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "250"
      },
      "screenshot": "https://convertify.click/og-image.png",
      "creator": {
        "@type": "Organization",
        "name": "Winning SERP",
        "url": "https://convertify.click"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Winning SERP",
        "logo": {
          "@type": "ImageObject",
          "url": "https://winningserp.agency/wp-content/uploads/2025/02/cropped-Winning-SERP.png"
        }
      },
      "softwareVersion": "1.0.0",
      "datePublished": "2025-03-09",
      "inLanguage": "en",
      "featureList": [
        "https://convertify.click/png-jpeg",
        "https://convertify.click/png-webp",
        "https://convertify.click/png-avif",
        "https://convertify.click/png-gif",
        "https://convertify.click/png-svg",
        "https://convertify.click/png-bmp",
        "https://convertify.click/png-ico",
        "https://convertify.click/jpeg-png",
        "https://convertify.click/jpeg-webp",
        "https://convertify.click/jpeg-avif",
        "https://convertify.click/jpeg-gif",
        "https://convertify.click/jpeg-svg",
        "https://convertify.click/jpeg-bmp",
        "https://convertify.click/jpeg-ico",
        "https://convertify.click/webp-png",
        "https://convertify.click/webp-jpeg",
        "https://convertify.click/webp-avif",
        "https://convertify.click/webp-gif",
        "https://convertify.click/webp-svg",
        "https://convertify.click/webp-bmp",
        "https://convertify.click/webp-ico",
        "https://convertify.click/avif-png",
        "https://convertify.click/avif-jpeg",
        "https://convertify.click/avif-webp",
        "https://convertify.click/avif-gif",
        "https://convertify.click/avif-svg",
        "https://convertify.click/avif-bmp",
        "https://convertify.click/avif-ico",
        "https://convertify.click/gif-png",
        "https://convertify.click/gif-jpeg",
        "https://convertify.click/gif-webp",
        "https://convertify.click/gif-avif",
        "https://convertify.click/gif-svg",
        "https://convertify.click/gif-bmp",
        "https://convertify.click/gif-ico",
        "https://convertify.click/svg-png",
        "https://convertify.click/svg-jpeg",
        "https://convertify.click/svg-webp",
        "https://convertify.click/svg-avif",
        "https://convertify.click/svg-gif",
        "https://convertify.click/svg-bmp",
        "https://convertify.click/svg-ico",
        "https://convertify.click/bmp-png",
        "https://convertify.click/bmp-jpeg",
        "https://convertify.click/bmp-webp",
        "https://convertify.click/bmp-avif",
        "https://convertify.click/bmp-gif",
        "https://convertify.click/bmp-svg",
        "https://convertify.click/bmp-ico",
        "https://convertify.click/ico-png",
        "https://convertify.click/ico-jpeg",
        "https://convertify.click/ico-webp",
        "https://convertify.click/ico-avif",
        "https://convertify.click/ico-gif",
        "https://convertify.click/ico-svg",
        "https://convertify.click/ico-bmp"
      ]
    }
  ]
}
    `;
    document.head.appendChild(script);
    
    return () => {
      // Clean up when component unmounts or route changes
      const script = document.getElementById(scriptId);
      if (script) {
        script.remove();
      }
    };
  }, [isHomepage, location.pathname]);
  
  return null;
} 