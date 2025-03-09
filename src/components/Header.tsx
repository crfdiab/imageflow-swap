
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn("w-full border-b border-border/40 backdrop-blur-sm sticky top-0 z-50", className)}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-pulse-slow">
            Convertify
          </span>
        </Link>
        <nav className="flex items-center space-x-6">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
