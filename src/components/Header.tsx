
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { IMAGE_FORMATS, formatToSlug } from "@/utils/formatUtils";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  // Most common conversion pairs for the navigation menu
  const commonConversions = [
    { source: 'png', target: 'jpeg' },
    { source: 'jpeg', target: 'png' },
    { source: 'png', target: 'webp' },
    { source: 'webp', target: 'png' },
    { source: 'jpeg', target: 'webp' },
  ];

  return (
    <header className={cn("w-full border-b border-border/40 backdrop-blur-sm sticky top-0 z-50", className)}>
      <div className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-between py-4 px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-pulse-slow">
              Convertify
            </span>
          </Link>
          <ThemeToggle className="md:hidden" />
        </div>
        
        <nav className="flex flex-col md:flex-row items-start md:items-center mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-6">
          <div className="hidden md:flex items-center space-x-6">
            {commonConversions.map((conversion, index) => (
              <Link 
                key={index}
                to={`/${formatToSlug(conversion.source, conversion.target)}`}
                className="text-sm font-medium hover:text-primary transition-colors"
                aria-label={`Convert ${conversion.source.toUpperCase()} to ${conversion.target.toUpperCase()}`}
              >
                {conversion.source.toUpperCase()} to {conversion.target.toUpperCase()}
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
