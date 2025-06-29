'use client';

import { useParams } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { slugToFormat, formatToSlug, ImageFormat } from "@/utils/formatUtils";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { useLanguage } from "./LanguageProvider";
import { useTranslation } from "@/hooks/useTranslation";

export function RelatedConverters() {
  const params = useParams();
  const slug = params?.slug as string;
  const formats = slug ? slugToFormat(slug) : null;
  const { languagePath } = useLanguage();
  const { t } = useTranslation();
  
  if (!formats) return null;
  
  const { source, target } = formats;
  
  // Get related conversions (same source or same target)
  const getRelatedFormats = (): { source: ImageFormat; target: ImageFormat; slug: string }[] => {
    const relatedFormats: ImageFormat[] = ['png', 'jpeg', 'webp', 'avif', 'gif', 'svg', 'bmp', 'ico'];
    
    // Filter out current formats
    const filteredFormats = relatedFormats.filter(format => 
      format !== source && format !== target
    );
    
    // Create related conversions
    const sameSource = filteredFormats.map(format => ({
      source,
      target: format as ImageFormat,
      slug: formatToSlug(source, format as ImageFormat)
    }));
    
    const sameTarget = filteredFormats.map(format => ({
      source: format as ImageFormat,
      target,
      slug: formatToSlug(format as ImageFormat, target)
    }));
    
    // Combine and limit to 8 total
    return [...sameSource, ...sameTarget].slice(0, 8);
  };
  
  const relatedConverters = getRelatedFormats();
  
  // Function to scroll to top when link is clicked
  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t('common.relatedConverters')}
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {relatedConverters.map(({ source, target, slug }) => (
            <Link
              key={slug}
              href={languagePath(`/${slug}`)}
              className="no-underline text-foreground"
              onClick={handleLinkClick}
            >
              <Card className={cn(
                "p-4 flex flex-col items-center justify-center text-center h-full transition-all duration-300",
                "hover:shadow-md hover:-translate-y-1"
              )}>
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <span>{source.toUpperCase()}</span>
                  <ArrowRight size={16} className="text-primary" />
                  <span>{target.toUpperCase()}</span>
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('common.convert')} {source.toUpperCase()} {t('common.to')} {target.toUpperCase()} {t('common.format')}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}