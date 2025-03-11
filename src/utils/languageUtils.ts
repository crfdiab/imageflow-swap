// Define supported language codes
export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja' | 'ar';

// Language configuration with display names and RTL support
export interface LanguageConfig {
  code: LanguageCode;
  nativeName: string;
  englishName: string;
  isRtl: boolean;
}

// Define all supported languages
export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: 'en', nativeName: 'English', englishName: 'English', isRtl: false },
  { code: 'es', nativeName: 'Español', englishName: 'Spanish', isRtl: false },
  { code: 'fr', nativeName: 'Français', englishName: 'French', isRtl: false },
  { code: 'de', nativeName: 'Deutsch', englishName: 'German', isRtl: false },
  { code: 'it', nativeName: 'Italiano', englishName: 'Italian', isRtl: false },
  { code: 'pt', nativeName: 'Português', englishName: 'Portuguese', isRtl: false },
  { code: 'ru', nativeName: 'Русский', englishName: 'Russian', isRtl: false },
  { code: 'zh', nativeName: '中文', englishName: 'Chinese', isRtl: false },
  { code: 'ja', nativeName: '日本語', englishName: 'Japanese', isRtl: false },
  { code: 'ar', nativeName: 'العربية', englishName: 'Arabic', isRtl: true },
];

// Default language
export const DEFAULT_LANGUAGE: LanguageCode = 'en';

// Get language from URL path
export function getLanguageFromPath(path: string): LanguageCode | null {
  const pathSegments = path.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];
  
  if (firstSegment && isValidLanguageCode(firstSegment)) {
    return firstSegment as LanguageCode;
  }
  
  return null;
}

// Check if a string is a valid language code
export function isValidLanguageCode(code: string): boolean {
  return SUPPORTED_LANGUAGES.some(lang => lang.code === code);
}

// Get language config by code
export function getLanguageConfig(code: LanguageCode): LanguageConfig {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code) || 
    SUPPORTED_LANGUAGES.find(lang => lang.code === DEFAULT_LANGUAGE)!;
}

// Add language prefix to path
export function addLanguagePrefix(path: string, language: LanguageCode): string {
  // If path already starts with language code, replace it
  const pathWithoutLeadingSlash = path.startsWith('/') ? path.substring(1) : path;
  const segments = pathWithoutLeadingSlash.split('/');
  
  if (segments[0] && isValidLanguageCode(segments[0])) {
    segments[0] = language;
    return '/' + segments.join('/');
  }
  
  // Otherwise, add language code
  return language === DEFAULT_LANGUAGE 
    ? path  // Don't add prefix for default language
    : `/${language}${path.startsWith('/') ? path : `/${path}`}`;
}

// Remove language prefix from path
export function removeLanguagePrefix(path: string): string {
  const pathWithoutLeadingSlash = path.startsWith('/') ? path.substring(1) : path;
  const segments = pathWithoutLeadingSlash.split('/');
  
  if (segments[0] && isValidLanguageCode(segments[0])) {
    return '/' + segments.slice(1).join('/');
  }
  
  return path.startsWith('/') ? path : `/${path}`;
}

// Generate alternate URLs for hreflang tags
export function generateAlternateUrls(path: string): { [key: string]: string } {
  const pathWithoutLanguage = removeLanguagePrefix(path);
  const alternateUrls: { [key: string]: string } = {};
  
  SUPPORTED_LANGUAGES.forEach(lang => {
    const url = lang.code === DEFAULT_LANGUAGE 
      ? `https://convertify.click${pathWithoutLanguage}`
      : `https://convertify.click/${lang.code}${pathWithoutLanguage}`;
    
    alternateUrls[lang.code] = url;
  });
  
  return alternateUrls;
} 