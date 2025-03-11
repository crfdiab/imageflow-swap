import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { IMAGE_FORMATS, formatToSlug, ImageFormat } from "@/utils/formatUtils";
import { useLanguage } from "./LanguageProvider";
import { useTranslation } from "@/hooks/useTranslation";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const { languagePath } = useLanguage();
  const { t } = useTranslation();
  
  // Most popular conversion pairs for the footer
  const popularConversions = [
    { source: 'png' as ImageFormat, target: 'jpeg' as ImageFormat },
    { source: 'jpeg' as ImageFormat, target: 'png' as ImageFormat },
    { source: 'png' as ImageFormat, target: 'webp' as ImageFormat },
    { source: 'webp' as ImageFormat, target: 'png' as ImageFormat },
    { source: 'jpeg' as ImageFormat, target: 'webp' as ImageFormat },
    { source: 'webp' as ImageFormat, target: 'jpeg' as ImageFormat },
    { source: 'png' as ImageFormat, target: 'avif' as ImageFormat },
    { source: 'avif' as ImageFormat, target: 'png' as ImageFormat },
  ];
  
  // Function to scroll to top when link is clicked
  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={cn("w-full border-t border-border/40 bg-background", className)}>
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('common.footer.aboutConvertify')}</h3>
            <p className="text-foreground opacity-90 text-sm">
              Convertify is a free online tool that allows you to convert images between different formats directly in your browser. No uploads required, ensuring complete privacy and security.
            </p>
          </div>
          
          {/* Popular Conversions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('common.footer.popularConversions')}</h3>
            <ul className="space-y-2">
              {popularConversions.map(({ source, target }) => {
                const conversionSlug = formatToSlug(source, target);
                return (
                  <li key={conversionSlug}>
                    <Link 
                      to={languagePath(`/${conversionSlug}`)} 
                      className="text-sm text-foreground hover:text-primary transition-colors"
                      onClick={handleLinkClick}
                    >
                      {t('common.convert')} {source.toUpperCase()} {t('common.to')} {target.toUpperCase()}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('common.footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to={languagePath("/")} 
                  className="text-sm hover:text-primary transition-colors"
                  onClick={handleLinkClick}
                >
                  {t('common.home')}
                </Link>
              </li>
              <li>
                <Link 
                  to={languagePath("/about")} 
                  className="text-sm hover:text-primary transition-colors"
                  onClick={handleLinkClick}
                >
                  {t('common.aboutUs')}
                </Link>
              </li>
              <li>
                <Link 
                  to={languagePath("/privacy")} 
                  className="text-sm hover:text-primary transition-colors"
                  onClick={handleLinkClick}
                >
                  {t('common.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link 
                  to={languagePath("/terms")} 
                  className="text-sm hover:text-primary transition-colors"
                  onClick={handleLinkClick}
                >
                  {t('common.termsOfService')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('common.footer.contact')}</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {t('common.footer.contactText')}
            </p>
            <Link 
              to={languagePath("/contact")} 
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={handleLinkClick}
            >
              {t('common.contactUs')}
            </Link>
          </div>
        </div>
        
        <div className="border-t border-border/40 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground opacity-90 mb-4 md:mb-0">
            {t('common.footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center space-x-4">
            <Link 
              to={languagePath("/privacy")} 
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
              onClick={handleLinkClick}
            >
              {t('common.footer.privacy')}
            </Link>
            <Link 
              to={languagePath("/terms")} 
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
              onClick={handleLinkClick}
            >
              {t('common.footer.terms')}
            </Link>
            <Link 
              to={languagePath("/data-protection")} 
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
              onClick={handleLinkClick}
            >
              Data Protection
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
