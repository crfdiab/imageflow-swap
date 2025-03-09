import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { slugToFormat } from '@/utils/formatUtils';

export function OpenGraphTags() {
  const location = useLocation();
  const { pathname } = location;
  const isHomepage = pathname === '/';
  const slug = pathname.substring(1); // Remove leading slash
  
  useEffect(() => {
    // Set up meta tags
    const setupMetaTags = () => {
      // Default values for homepage
      let title = 'Convertify - Free Online Image Format Converter';
      let description = 'Convert images between PNG, JPEG, WebP, AVIF, GIF, SVG and more. No upload needed - all processing happens in your browser for privacy.';
      let url = 'https://convertify.click';
      
      // If not homepage and has a valid slug, customize for the specific converter
      if (!isHomepage && slug) {
        const formats = slugToFormat(slug);
        if (formats) {
          const { source, target } = formats;
          title = `Convert ${source.toUpperCase()} to ${target.toUpperCase()} - Free Online Converter`;
          description = `Convert ${source.toUpperCase()} images to ${target.toUpperCase()} format online for free. No upload required - secure browser-based conversion.`;
          url = `https://convertify.click/${slug}`;
        }
      }
      
      // Set Open Graph tags
      setMetaTag('og:title', title);
      setMetaTag('og:description', description);
      setMetaTag('og:url', url);
      setMetaTag('og:type', 'website');
      setMetaTag('og:image', 'https://convertify.click/og-image.png');
      setMetaTag('og:image:width', '1200');
      setMetaTag('og:image:height', '630');
      
      // Set Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image');
      setMetaTag('twitter:title', title);
      setMetaTag('twitter:description', description);
      setMetaTag('twitter:image', 'https://convertify.click/og-image.png');
      
      // Set regular meta tags
      setMetaTag('description', description);
      
      // Set page title
      document.title = title;
    };
    
    setupMetaTags();
    
    // Cleanup function
    return () => {
      // No cleanup needed for meta tags as they'll be overwritten
    };
  }, [isHomepage, slug, pathname]);
  
  // Helper function to set or update meta tags
  const setMetaTag = (name: string, content: string) => {
    let meta = document.querySelector(`meta[property="${name}"]`) || 
               document.querySelector(`meta[name="${name}"]`);
    
    if (!meta) {
      meta = document.createElement('meta');
      if (name.startsWith('og:')) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  };
  
  return null;
} 