import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { slugToFormat } from '@/utils/formatUtils';

// Schema data for all conversion routes
const schemaData = [
  {
    url: "/png-jpeg",
    conversionName: "PNG to JPEG Converter",
    description: "Convert PNG images to JPEG format instantly and for free with Convertify's online tool."
  },
  {
    url: "/png-webp",
    conversionName: "PNG to WebP Converter",
    description: "Convert PNG images to WebP format with ease using Convertify's fast and efficient converter."
  },
  {
    url: "/png-avif",
    conversionName: "PNG to AVIF Converter",
    description: "Convert PNG images to AVIF format for better compression and quality using Convertify's tool."
  },
  {
    url: "/png-gif",
    conversionName: "PNG to GIF Converter",
    description: "Convert PNG images to GIF format seamlessly with Convertify's free image converter."
  },
  {
    url: "/png-svg",
    conversionName: "PNG to SVG Converter",
    description: "Convert PNG images to SVG vector graphics quickly with Convertify's powerful converter."
  },
  {
    url: "/png-bmp",
    conversionName: "PNG to BMP Converter",
    description: "Convert PNG images to BMP format effortlessly using Convertify's online image conversion tool."
  },
  {
    url: "/png-ico",
    conversionName: "PNG to ICO Converter",
    description: "Convert PNG images to ICO format for web and app icons with Convertify's fast converter."
  },
  {
    url: "/jpeg-png",
    conversionName: "JPEG to PNG Converter",
    description: "Convert JPEG images to PNG format easily and efficiently with Convertify."
  },
  {
    url: "/jpeg-webp",
    conversionName: "JPEG to WebP Converter",
    description: "Convert JPEG images to WebP format for improved compression and quality using Convertify."
  },
  {
    url: "/jpeg-avif",
    conversionName: "JPEG to AVIF Converter",
    description: "Convert JPEG images to AVIF format quickly with Convertify's free online tool."
  },
  {
    url: "/jpeg-gif",
    conversionName: "JPEG to GIF Converter",
    description: "Convert JPEG images to GIF format with Convertify's fast and accurate converter."
  },
  {
    url: "/jpeg-svg",
    conversionName: "JPEG to SVG Converter",
    description: "Convert JPEG images to SVG format for vector graphics using Convertify's efficient tool."
  },
  {
    url: "/jpeg-bmp",
    conversionName: "JPEG to BMP Converter",
    description: "Convert JPEG images to BMP format easily with Convertify."
  },
  {
    url: "/jpeg-ico",
    conversionName: "JPEG to ICO Converter",
    description: "Convert JPEG images to ICO format for web and app icons with Convertify."
  },
  // Add more conversion routes as needed
];

// Homepage schema
const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://convertify.click#website",
      "url": "https://convertify.click",
      "name": "Convertify",
      "description": "Free online image format conversion tools. Convert between PNG, JPEG, WebP, AVIF, GIF, SVG and more. No upload required - all processing happens right in your browser for complete privacy.",
      "inLanguage": "en",
      "publisher": {
        "@type": "Organization",
        "name": "Winning SERP",
        "url": "https://convertify.click"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://convertify.click/#webapp",
      "name": "Convertify - Image Format Converter",
      "url": "https://convertify.click",
      "applicationCategory": "MultimediaApplication",
      "applicationSubCategory": "Image Conversion Tool",
      "operatingSystem": "Windows, Chrome OS, Linux, MacOS, Android, iOS",
      "description": "Free online image format conversion tools. Convert between PNG, JPEG, WebP, AVIF, GIF, SVG and more. No upload required - all processing happens right in your browser for complete privacy.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://convertify.click"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "250"
      },
      "screenshot": "https://convertify.click/og-image.png",
      "creator": {
        "@type": "Organization",
        "name": "Winning SERP",
        "url": "https://convertify.click"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Winning SERP",
        "logo": {
          "@type": "ImageObject",
          "url": "https://winningserp.agency/wp-content/uploads/2025/02/cropped-Winning-SERP.png"
        }
      },
      "softwareVersion": "1.0.0",
      "datePublished": "2025-03-09",
      "inLanguage": "en"
    }
  ]
};

export function SchemaMarkup() {
  const location = useLocation();
  const { pathname } = location;
  
  useEffect(() => {
    // Remove any existing schema script
    const existingScript = document.getElementById('schema-markup');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Create new schema script
    const script = document.createElement('script');
    script.id = 'schema-markup';
    script.type = 'application/ld+json';
    
    // Check if we're on the homepage
    if (pathname === '/') {
      script.textContent = JSON.stringify(homepageSchema);
    } else {
      // Find the matching schema for the current URL
      const matchingSchema = schemaData.find(schema => schema.url === pathname);
      
      if (matchingSchema) {
        // Create page-specific schema
        const pageSchema = {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://convertify.click#website",
              "url": "https://convertify.click",
              "name": "Convertify",
              "description": "Free online image format conversion tools. Convert between PNG, JPEG, WebP, AVIF, GIF, SVG and more. No upload required - all processing happens right in your browser for complete privacy.",
              "inLanguage": "en",
              "publisher": {
                "@type": "Organization",
                "name": "Winning SERP",
                "url": "https://convertify.click"
              }
            },
            {
              "@type": "WebApplication",
              "@id": `https://convertify.click${matchingSchema.url}`,
              "name": `Convertify - ${matchingSchema.conversionName}`,
              "url": `https://convertify.click${matchingSchema.url}`,
              "applicationCategory": "MultimediaApplication",
              "applicationSubCategory": "Image Conversion",
              "operatingSystem": "Windows, Chrome OS, Linux, MacOS, Android, iOS",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "category": "Free"
              },
              "description": matchingSchema.description,
              "mainEntityOfPage": `https://convertify.click${matchingSchema.url}`
            }
          ]
        };
        
        script.textContent = JSON.stringify(pageSchema);
      } else {
        // For unknown pages, use a generic schema
        const formats = slugToFormat(pathname.substring(1));
        
        if (formats) {
          // Generate schema for dynamic conversion pages
          const { source, target } = formats;
          const dynamicSchema = {
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://convertify.click#website",
                "url": "https://convertify.click",
                "name": "Convertify",
                "description": "Free online image format conversion tools. Convert between PNG, JPEG, WebP, AVIF, GIF, SVG and more. No upload required - all processing happens right in your browser for complete privacy.",
                "inLanguage": "en",
                "publisher": {
                  "@type": "Organization",
                  "name": "Winning SERP",
                  "url": "https://convertify.click"
                }
              },
              {
                "@type": "WebApplication",
                "@id": `https://convertify.click${pathname}`,
                "name": `Convertify - ${source.toUpperCase()} to ${target.toUpperCase()} Converter`,
                "url": `https://convertify.click${pathname}`,
                "applicationCategory": "MultimediaApplication",
                "applicationSubCategory": "Image Conversion",
                "operatingSystem": "Windows, Chrome OS, Linux, MacOS, Android, iOS",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD",
                  "category": "Free"
                },
                "description": `Convert ${source.toUpperCase()} images to ${target.toUpperCase()} format online for free with Convertify. Fast, secure, and privacy-focused.`,
                "mainEntityOfPage": `https://convertify.click${pathname}`
              }
            ]
          };
          
          script.textContent = JSON.stringify(dynamicSchema);
        } else {
          // Fallback to homepage schema for other pages
          script.textContent = JSON.stringify(homepageSchema);
        }
      }
    }
    
    // Add the script to the document head
    document.head.appendChild(script);
    
    // Cleanup function
    return () => {
      const script = document.getElementById('schema-markup');
      if (script) {
        script.remove();
      }
    };
  }, [pathname]);
  
  return null;
} 