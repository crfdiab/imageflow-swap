import * as React from "react"
import { ChevronRight, Home } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { slugToFormat } from "@/utils/formatUtils"

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  slug?: string | null;
}

export function Breadcrumb({ slug, className, ...props }: BreadcrumbProps) {
  const formats = slug ? slugToFormat(slug) : null;
  
  return (
    <div className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)} {...props}>
      <Link to="/" className="overflow-hidden text-ellipsis whitespace-nowrap hover:text-primary transition-colors flex items-center">
        <Home className="h-4 w-4 mr-1" />
        <span>Home</span>
      </Link>
      
      {formats && (
        <>
          <ChevronRight className="h-4 w-4" />
          <Link 
            to={`/${slug}`}
            className="font-medium text-foreground overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {formats.source.toUpperCase()} to {formats.target.toUpperCase()}
          </Link>
        </>
      )}
    </div>
  )
}
