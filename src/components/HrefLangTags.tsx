import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageProvider';
import { generateAlternateUrls, SUPPORTED_LANGUAGES } from '@/utils/languageUtils';

export function HrefLangTags() {
  const location = useLocation();
  const { currentLanguage } = useLanguage();
  
  useEffect(() => {
    // Generate alternate URLs for all supported languages
    const alternateUrls = generateAlternateUrls(location.pathname);
    
    // Remove any existing hreflang tags
    const existingTags = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingTags.forEach(tag => tag.remove());
    
    // Add new hreflang tags for each language
    SUPPORTED_LANGUAGES.forEach(language => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', language.code);
      link.setAttribute('href', alternateUrls[language.code]);
      document.head.appendChild(link);
    });
    
    // Add x-default hreflang tag (pointing to default English version)
    const xDefaultLink = document.createElement('link');
    xDefaultLink.setAttribute('rel', 'alternate');
    xDefaultLink.setAttribute('hreflang', 'x-default');
    xDefaultLink.setAttribute('href', alternateUrls['en']);
    document.head.appendChild(xDefaultLink);
    
    // Update canonical link to point to current language version
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', alternateUrls[currentLanguage]);
    
  }, [location.pathname, currentLanguage]);
  
  // This component doesn't render anything visible
  return null;
} 