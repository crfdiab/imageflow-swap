import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { IMAGE_FORMATS, formatToSlug, ImageFormat } from "@/utils/formatUtils";
import { useParams } from "react-router-dom";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "./LanguageProvider";
import { useTranslation } from "@/hooks/useTranslation";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { slug } = useParams<{ slug: string }>();
  const { languagePath } = useLanguage();
  const { t } = useTranslation();

  // Most common conversion pairs for the navigation menu
  const commonConversions = [
    { source: 'png' as ImageFormat, target: 'jpeg' as ImageFormat },
    { source: 'jpeg' as ImageFormat, target: 'png' as ImageFormat },
    { source: 'png' as ImageFormat, target: 'webp' as ImageFormat },
    { source: 'webp' as ImageFormat, target: 'png' as ImageFormat },
    { source: 'jpeg' as ImageFormat, target: 'webp' as ImageFormat },
  ];
  
  // Function to scroll to top when link is clicked
  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header className={cn("w-full border-b border-border/40 backdrop-blur-sm sticky top-0 z-50", className)}>
      <div className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-between py-4 px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link to={languagePath("/")} className="flex items-center space-x-2" onClick={handleLinkClick}>
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-pulse-slow">
              Convertify
            </span>
          </Link>
          <div className="flex items-center md:hidden">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
        
        <nav className="flex flex-col md:flex-row items-start md:items-center mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-6">
          <div className="flex items-center space-x-6">
            <Link to={languagePath("/")} className="text-sm font-medium hover:text-primary transition-colors" onClick={handleLinkClick}>
              {t('common.tools')}
            </Link>
            <Link to={languagePath("/about")} className="text-sm font-medium hover:text-primary transition-colors" onClick={handleLinkClick}>
              {t('common.aboutUs')}
            </Link>
            <Link to={languagePath("/contact")} className="text-sm font-medium hover:text-primary transition-colors" onClick={handleLinkClick}>
              {t('common.contactUs')}
            </Link>
            <div className="hidden md:flex items-center space-x-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
