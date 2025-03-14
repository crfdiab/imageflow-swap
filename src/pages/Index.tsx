import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { ConversionArea } from "@/components/ConversionArea";
import { FAQSection } from "@/components/FAQSection";
import { RelatedConverters } from "@/components/RelatedConverters";
import { Footer } from "@/components/Footer";
import { slugToFormat, IMAGE_FORMATS, formatToSlug, ImageFormat } from "@/utils/formatUtils";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SlugViewer } from "@/components/DevTools/SlugViewer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { FormatGallery } from "@/components/FormatGallery";
import { useLanguage } from "@/components/LanguageProvider";
import { useTranslation } from "@/hooks/useTranslation";

const Index = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { languagePath, currentLanguage } = useLanguage();
  const { t } = useTranslation();
  
  // Group formats for the homepage
  const formatGroups = [
    { format: 'png' as ImageFormat, title: 'PNG' },
    { format: 'jpeg' as ImageFormat, title: 'JPEG' },
    { format: 'webp' as ImageFormat, title: 'WebP' },
    { format: 'avif' as ImageFormat, title: 'AVIF' },
    { format: 'gif' as ImageFormat, title: 'GIF' },
    { format: 'svg' as ImageFormat, title: 'SVG' },
  ];
  
  // If no format specified in URL, show homepage
  useEffect(() => {
    if (slug && !slugToFormat(slug)) {
      // If invalid slug, redirect to default
      navigate(languagePath("/png-jpeg"), { replace: true });
    }
  }, [slug, navigate, languagePath]);
  
  // Set page metadata based on current conversion formats
  useEffect(() => {
    if (slug) {
      const formats = slugToFormat(slug);
      if (formats) {
        // Set page title with new format
        const pageTitle = t('pages.converter.titleTemplate', {
          source: formats.source.toUpperCase(),
          target: formats.target.toUpperCase()
        });
        document.title = pageTitle;
        
        // Set meta description for SEO with enhanced CTR
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.setAttribute('name', 'description');
          document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', 
          t('pages.converter.descriptionTemplate', {
            source: formats.source.toUpperCase(),
            target: formats.target.toUpperCase()
          })
        );
        
        // Set canonical link
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
          canonicalLink = document.createElement('link');
          canonicalLink.setAttribute('rel', 'canonical');
          document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', `https://convertify.click${languagePath(`/${slug}`)}`);
        
        // Add schema.org structured data for SEO
        let structuredData = document.querySelector('#structured-data');
        if (!structuredData) {
          structuredData = document.createElement('script');
          structuredData.setAttribute('id', 'structured-data');
          structuredData.setAttribute('type', 'application/ld+json');
          document.head.appendChild(structuredData);
        }
        
        const schemaData = {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": `Convert ${formats.source.toUpperCase()} To ${formats.target.toUpperCase()} Free Online 50 Images Bulk In-Time`,
          "url": `https://convertify.click${languagePath(`/${slug}`)}`,
          "description": `Free online tool to convert ${formats.source.toUpperCase()} images to ${formats.target.toUpperCase()} format. Process up to 50 images at once with high quality and privacy.`,
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        };
        
        structuredData.textContent = JSON.stringify(schemaData);
      }
    } else {
      // Homepage metadata with enhanced title and description
      document.title = t('pages.home.title');
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', t('pages.home.description'));
      
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', `https://convertify.click${languagePath('/')}`);
    }
  }, [slug, languagePath, t, currentLanguage]);
  
  // Helper function to generate target formats for a source format
  const getTargetFormats = (sourceFormat: ImageFormat): ImageFormat[] => {
    return IMAGE_FORMATS.filter(format => 
      format !== sourceFormat && 
      // Filter out jpg when jpeg is present
      !(format === 'jpg' && sourceFormat === 'jpeg') && 
      !(sourceFormat === 'jpg' && format === 'jpeg')
    ) as ImageFormat[];
  };
  
  // Function to scroll to top when link is clicked
  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // If we have a slug, show the converter page
  if (slug) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumb slug={slug} />
          </div>
          <ConversionArea />
          <div id="faq">
            <FAQSection />
          </div>
          <RelatedConverters />
          
          {/* Add Format Gallery Section */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6 text-center">
                {t('common.allFormats')}
              </h2>
              <FormatGallery />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Otherwise, show the homepage with all tool categories
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('pages.home.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('pages.home.description')}
          </p>
        </section>
        
        {/* Tool categories by format */}
        {formatGroups.map((group) => (
          <section className="mb-12" key={group.format}>
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">
              {t('pages.home.toolsTitle', { format: group.title })}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getTargetFormats(group.format).map((targetFormat) => {
                const conversionSlug = formatToSlug(group.format, targetFormat);
                return (
                  <Link
                    key={targetFormat}
                    to={languagePath(`/${conversionSlug}`)}
                    className="no-underline text-foreground"
                    onClick={handleLinkClick}
                  >
                    <Card className={cn(
                      "p-4 flex flex-col items-center justify-center text-center h-full transition-all duration-300",
                      "hover:shadow-md hover:-translate-y-1"
                    )}>
                      <h3 className="font-medium flex items-center gap-2 mb-2">
                        <span>{group.format.toUpperCase()}</span>
                        <ArrowRight size={16} className="text-primary" />
                        <span>{targetFormat.toUpperCase()}</span>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t('common.convert')} {group.format.toUpperCase()} {t('common.to')} {targetFormat.toUpperCase()} {t('common.format')}
                      </p>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
        
        {/* FAQ Section for homepage */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">
            {t('faq.title')}
          </h2>
          <div className="max-w-3xl mx-auto">
            <FAQSection />
          </div>
        </section>
        
        {process.env.NODE_ENV === 'development' && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">
              Development: Available Slugs
            </h2>
            <SlugViewer />
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
