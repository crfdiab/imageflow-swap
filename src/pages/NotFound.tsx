import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { useTranslation } from "@/hooks/useTranslation";

const NotFound = () => {
  const { languagePath } = useLanguage();
  const { t } = useTranslation();
  
  // Set page metadata
  useEffect(() => {
    document.title = t('pages.notFound.title');
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', t('pages.notFound.description'));
    
    // No canonical link for 404 page
  }, [t]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">
            {t('pages.notFound.title')}
          </h2>
          <p className="text-muted-foreground mb-8">
            {t('pages.notFound.description')}
          </p>
          <Button asChild>
            <Link to={languagePath("/")}>
              {t('pages.notFound.goHome')}
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
