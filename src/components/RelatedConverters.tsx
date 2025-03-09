
import { useParams, Link } from "react-router-dom";
import { getRelatedConverters, slugToFormat, formatToSlug } from "@/utils/formatUtils";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function RelatedConverters() {
  const { slug } = useParams<{ slug: string }>();
  const currentFormats = slug ? slugToFormat(slug) : null;
  
  if (!currentFormats) return null;
  
  const relatedConverters = getRelatedConverters(currentFormats.source)
    .filter(pair => pair.target !== currentFormats.target);
  
  if (relatedConverters.length === 0) return null;
  
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-2">
        Related {currentFormats.source.toUpperCase()} Converters
      </h2>
      <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
        Convert your {currentFormats.source.toUpperCase()} images to other popular formats
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {relatedConverters.map((converter, index) => {
          const conversionSlug = formatToSlug(converter.source, converter.target);
          return (
            <Link
              key={index}
              to={`/${conversionSlug}`}
              className="no-underline text-foreground"
            >
              <Card className={cn(
                "p-4 flex flex-col items-center justify-center text-center h-full transition-all duration-300",
                "hover:shadow-md hover:-translate-y-1 glass-card"
              )}>
                <div className="font-medium flex items-center gap-2 mb-2">
                  <span>{converter.source.toUpperCase()}</span>
                  <ArrowRight size={16} className="text-primary" />
                  <span>{converter.target.toUpperCase()}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Convert {converter.source.toUpperCase()} to {converter.target.toUpperCase()} format
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
