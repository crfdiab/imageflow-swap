
import { Link } from "react-router-dom";
import { generateConversionPairs, formatToSlug } from "@/utils/formatUtils";

export function Footer() {
  const year = new Date().getFullYear();
  const conversionPairs = generateConversionPairs().slice(0, 12); // Limit to 12 for footer
  
  return (
    <footer className="w-full border-t border-border/50 mt-8">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Branding */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Convertify
              </span>
            </h3>
            <p className="text-muted-foreground">
              Fast, free, and secure image conversion directly in your browser.
              No data is ever uploaded to our servers.
            </p>
          </div>
          
          {/* Popular conversions */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Popular Conversions</h3>
            <nav className="grid grid-cols-2 gap-2">
              {conversionPairs.map((pair, index) => {
                const slug = formatToSlug(pair.source, pair.target);
                return (
                  <Link
                    key={index}
                    to={`/${slug}`}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {pair.source.toUpperCase()} to {pair.target.toUpperCase()}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          {/* Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Info</h3>
            <nav className="space-y-2">
              <Link to="/" className="text-sm block hover:text-primary transition-colors">
                Home
              </Link>
              <a href="#faq" className="text-sm block hover:text-primary transition-colors">
                FAQ
              </a>
              <p className="text-sm text-muted-foreground pt-4">
                © {year} Convertify. All rights reserved.
              </p>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
