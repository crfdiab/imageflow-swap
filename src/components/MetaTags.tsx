import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  searchConsoleVerification?: string;
}

export function MetaTags({ 
  title = 'Convertify - Free Online Image Format Conversion',
  description = 'Convert between various image formats with our fast, free, and secure browser-based tools. No uploads required - all processing happens right in your browser.',
  canonicalUrl = 'https://convertify.click',
  searchConsoleVerification
}: MetaTagsProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Google Search Console Verification */}
      {searchConsoleVerification && (
        <meta name="google-site-verification" content={searchConsoleVerification} />
      )}
    </Helmet>
  );
} 