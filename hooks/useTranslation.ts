import { useLanguage } from '@/components/LanguageProvider';
import translations from '@/i18n/translations';

export function useTranslation() {
  const { currentLanguage } = useLanguage();
  
  // Get the translations for the current language
  const currentTranslations = translations[currentLanguage];
  
  // Translation function
  const t = (key: string, replacements: Record<string, any> = {}) => {
    // Get the translation from the nested object using a simple path resolver
    let translation = getNestedValue(currentTranslations, key);
    
    // If translation is not found, try to get it from the English translations
    if (translation === key && currentLanguage !== 'en') {
      translation = getNestedValue(translations.en, key);
    }
    
    // If still not found, return the key
    if (typeof translation !== 'string') {
      return key;
    }
    
    // Replace placeholders with values
    return Object.entries(replacements).reduce((result, [key, value]) => {
      // Simple placeholder replacement
      return result.replace(new RegExp(`{${key}}`, 'g'), String(value));
    }, translation);
  };
  
  return { t };
}

// Simple nested object value getter
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : path;
  }, obj);
}