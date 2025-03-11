import * as React from "react"
import { ChevronRight, Home } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { slugToFormat } from "@/utils/formatUtils"
import { useLanguage } from "../LanguageProvider"
import { useTranslation } from "@/hooks/useTranslation"

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  slug?: string | null;
}

export function Breadcrumb({ slug, className, ...props }: BreadcrumbProps) {
  const formats = slug ? slugToFormat(slug) : null;
  const { languagePath } = useLanguage();
  const { t } = useTranslation();
  
  if (!formats) return null;
  
  const { source, target } = formats;
  
  return (
    <div className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)} {...props}>
      <Link 
        to={languagePath("/")} 
        className="flex items-center hover:text-primary transition-colors"
      >
        <Home size={14} className="mr-1" />
        {t('common.home')}
      </Link>
      
      <ChevronRight size={14} className="mx-2" />
      <span className="font-medium text-foreground">
        {t('common.convert')} {source.toUpperCase()} {t('common.to')} {target.toUpperCase()}
      </span>
    </div>
  )
}
