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
      let title = 'Convertify - Free Online Image Format Conversion Tools | Bulk Convert 50 Images';
      let description = 'Convert images between PNG, JPEG, WebP, AVIF, GIF, SVG and more. Process up to 50 images at once with no upload needed - all processing happens in your browser for privacy.';
      let url = 'https://convertify.click';
      
      // If not homepage and has a valid slug, customize for the specific converter
      if (!isHomepage && slug) {
        const formats = slugToFormat(slug);
        if (formats) {
          const { source, target } = formats;
          title = `Convert ${source.toUpperCase()} To ${target.toUpperCase()} Free Online 50 Images Bulk In-Time - Convertify`;
          description = `Convert ${source.toUpperCase()} to ${target.toUpperCase()} format online for free. Process up to 50 images at once with no upload required - all conversion happens in your browser for complete privacy. Fast, secure, and high quality.`;
          url = `https://convertify.click/${slug}`;
        }
      }
      
      // Update document title
      document.title = title;
      
      // Set Open Graph tags
      setMetaTag('og:title', title);
      setMetaTag('og:description', description);
      setMetaTag('og:url', url);
      setMetaTag('og:type', 'website');
      setMetaTag('og:image', 'https://convertify.click/og-image.png');
      setMetaTag('og:image:width', '1200');
      setMetaTag('og:image:height', '630');
      setMetaTag('og:site_name', 'Convertify');
      
      // Set Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image');
      setMetaTag('twitter:title', title);
      setMetaTag('twitter:description', description);
      setMetaTag('twitter:image', 'https://convertify.click/og-image.png');
      
      // Set regular meta tags
      setMetaTag('description', description);
      setMetaTag('author', 'Convertify');
      
      // Set canonical URL
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', url);
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