'use client';

import { Header } from '@/components/Header';
import { ConversionArea } from '@/components/ConversionArea';
import { FAQSection } from '@/components/FAQSection';
import { RelatedConverters } from '@/components/RelatedConverters';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FormatGallery } from '@/components/FormatGallery';
import { useTranslation } from '@/hooks/useTranslation';

interface ConverterPageProps {
  slug: string;
}

export function ConverterPage({ slug }: ConverterPageProps) {
  const { t } = useTranslation();

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