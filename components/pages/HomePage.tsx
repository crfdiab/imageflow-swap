'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FormatGallery } from '@/components/FormatGallery';
import { FAQSection } from '@/components/FAQSection';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { IMAGE_FORMATS, formatToSlug, ImageFormat } from '@/utils/formatUtils';
import { useLanguage } from '@/components/LanguageProvider';
import { useTranslation } from '@/hooks/useTranslation';

export function HomePage() {
  const { languagePath } = useLanguage();
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
                    href={languagePath(`/${conversionSlug}`)}
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
      </main>
      <Footer />
    </div>
  );
}