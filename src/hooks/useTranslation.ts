import { useLanguage } from '@/components/LanguageProvider';
import translations from '@/i18n/translations';
import { get } from 'lodash';

export function useTranslation() {
  const { currentLanguage } = useLanguage();
  
  // Get the translations for the current language
  const currentTranslations = translations[currentLanguage];
  
  // Translation function
  const t = (key: string, replacements: Record<string, any> = {}) => {
    // Get the translation from the nested object using lodash.get
    let translation = get(currentTranslations, key, key);
    
    // If translation is not found, try to get it from the English translations
    if (translation === key && currentLanguage !== 'en') {
      translation = get(translations.en, key, key);
    }
    
    // Replace placeholders with values
    if (typeof translation === 'string') {
      return Object.entries(replacements).reduce((result, [key, value]) => {
        // Simple placeholder replacement
        return result.replace(new RegExp(`{${key}}`, 'g'), String(value));
      }, translation);
    }
    
    return translation;
  };
  
  return { t };
} 