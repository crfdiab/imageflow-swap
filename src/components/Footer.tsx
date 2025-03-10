import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { IMAGE_FORMATS, formatToSlug, ImageFormat } from "@/utils/formatUtils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
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
            <h3 className="text-lg font-semibold mb-4">About Convertify</h3>
            <p className="text-foreground opacity-90 text-sm">
              Convertify offers free online image format conversion tools. Convert between PNG, JPEG, WebP, AVIF, GIF, SVG and more with no upload required - all processing happens right in your browser.
            </p>
          </div>
          
          {/* Popular Conversions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Conversions</h3>
            <ul className="space-y-2">
              {popularConversions.map(({ source, target }) => (
                <li key={`${source}-${target}`}>
                  <Link 
                    to={`/${formatToSlug(source, target)}`} 
                    className="text-sm text-foreground hover:text-primary transition-colors"
                    onClick={handleLinkClick}
                  >
                    {source.toUpperCase()} to {target.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-primary transition-colors" onClick={handleLinkClick}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-primary transition-colors" onClick={handleLinkClick}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-primary transition-colors" onClick={handleLinkClick}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:text-primary transition-colors" onClick={handleLinkClick}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-primary transition-colors" onClick={handleLinkClick}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <Link 
              to="/contact" 
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={handleLinkClick}
            >
              Contact Us
            </Link>
          </div>
        </div>
        
        <div className="border-t border-border/40 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground opacity-90 mb-4 md:mb-0">
            © {new Date().getFullYear()} Convertify. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link 
              to="/privacy" 
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
              onClick={handleLinkClick}
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
              onClick={handleLinkClick}
            >
              Terms
            </Link>
            <Link 
              to="/data-protection" 
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
