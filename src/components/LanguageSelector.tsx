import React from 'react';
import { useLanguage } from './LanguageProvider';
import { SUPPORTED_LANGUAGES, LanguageCode } from '@/utils/languageUtils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className }: LanguageSelectorProps) {
  const { currentLanguage, setLanguage } = useLanguage();
  
  // Get current language display name
  const currentLanguageConfig = SUPPORTED_LANGUAGES.find(
    lang => lang.code === currentLanguage
  );
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("flex items-center gap-1", className)}
        >
          <Globe size={16} />
          <span className="hidden sm:inline">{currentLanguageConfig?.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SUPPORTED_LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLanguage(language.code as LanguageCode)}
            className={cn(
              "cursor-pointer",
              currentLanguage === language.code && "font-bold bg-muted"
            )}
          >
            {language.nativeName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 