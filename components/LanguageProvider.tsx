'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LanguageCode, 
  DEFAULT_LANGUAGE, 
  getLanguageFromPath, 
  addLanguagePrefix, 
  removeLanguagePrefix,
  isValidLanguageCode
} from '@/utils/languageUtils';

// Define the context type
interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  languagePath: (path: string) => string;
  isRtl: boolean;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  languagePath: (path: string) => path,
  isRtl: false,
});

// Hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  
  // Initialize language from URL or localStorage or browser preference
  const initializeLanguage = (): LanguageCode => {
    // First check URL
    const pathLanguage = getLanguageFromPath(pathname);
    if (pathLanguage) return pathLanguage;
    
    // Then check localStorage (only on client side)
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as LanguageCode | null;
      if (savedLanguage && isValidLanguageCode(savedLanguage)) return savedLanguage;
      
      // Then check browser preference
      const browserLanguages = navigator.languages || [navigator.language];
      for (const lang of browserLanguages) {
        const code = lang.split('-')[0] as LanguageCode;
        if (isValidLanguageCode(code)) return code;
      }
    }
    
    // Default to English
    return DEFAULT_LANGUAGE;
  };
  
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(initializeLanguage);
  const [isRtl, setIsRtl] = useState<boolean>(false);
  
  // Update RTL status when language changes
  useEffect(() => {
    const isRtlLanguage = currentLanguage === 'ar';
    setIsRtl(isRtlLanguage);
    
    // Update document direction
    if (typeof document !== 'undefined') {
      document.documentElement.dir = isRtlLanguage ? 'rtl' : 'ltr';
      
      // Save to localStorage
      localStorage.setItem('language', currentLanguage);
    }
  }, [currentLanguage]);
  
  // Function to change language
  const setLanguage = (language: LanguageCode) => {
    if (language === currentLanguage) return;
    
    setCurrentLanguage(language);
    
    // Update URL to reflect language change
    const pathWithoutLanguage = removeLanguagePrefix(pathname);
    const newPath = language === DEFAULT_LANGUAGE 
      ? pathWithoutLanguage 
      : addLanguagePrefix(pathWithoutLanguage, language);
    
    router.push(newPath);
  };
  
  // Function to get language-aware path
  const languagePath = (path: string): string => {
    return currentLanguage === DEFAULT_LANGUAGE 
      ? path 
      : addLanguagePrefix(path, currentLanguage);
  };
  
  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      setLanguage, 
      languagePath,
      isRtl
    }}>
      {children}
    </LanguageContext.Provider>
  );
};