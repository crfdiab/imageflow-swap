'use client';

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { IMAGE_FORMATS, formatToSlug, ImageFormat } from "@/utils/formatUtils";
import { useLanguage } from "./LanguageProvider";
import { useTranslation } from "@/hooks/useTranslation";

export function FormatGallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const { languagePath } = useLanguage();
  const { t } = useTranslation();
  
  // Generate all possible format combinations
  const allCombinations = useMemo(() => {
    const combinations: { source: ImageFormat; target: ImageFormat; slug: string }[] = [];
    
    IMAGE_FORMATS.forEach(source => {
      IMAGE_FORMATS.forEach(target => {
        if (source !== target) {
          // Filter out jpg when jpeg is present to avoid duplicates
          if (!(source === 'jpg' && target === 'jpeg') && 
              !(source === 'jpeg' && target === 'jpg')) {
            combinations.push({
              source: source as ImageFormat,
              target: target as ImageFormat,
              slug: formatToSlug(source as ImageFormat, target as ImageFormat)
            });
          }
        }
      });
    });
    
    return combinations;
  }, []);
  
  // Filter combinations based on search query
  const filteredCombinations = useMemo(() => {
    if (!searchQuery.trim()) return allCombinations;
    
    const query = searchQuery.toLowerCase();
    return allCombinations.filter(combo => 
      combo.source.toLowerCase().includes(query) || 
      combo.target.toLowerCase().includes(query) ||
      `${combo.source} to ${combo.target}`.toLowerCase().includes(query)
    );
  }, [allCombinations, searchQuery]);
  
  // Function to scroll to top when link is clicked
  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="max-w-md mx-auto">
        <Input
          type="search"
          placeholder={t('common.searchFormats')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      
      {filteredCombinations.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          {t('common.noResults')}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredCombinations.map(({ source, target, slug }) => (
            <Link
              key={slug}
              href={languagePath(`/${slug}`)}
              className="no-underline text-foreground"
              onClick={handleLinkClick}
            >
              <Card className={cn(
                "p-3 flex flex-col items-center justify-center text-center h-full transition-all duration-300",
                "hover:shadow-md hover:-translate-y-1"
              )}>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <span>{source.toUpperCase()}</span>
                  <ArrowRight size={14} className="text-primary" />
                  <span>{target.toUpperCase()}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}