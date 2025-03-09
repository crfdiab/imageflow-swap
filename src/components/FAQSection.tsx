
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { slugToFormat } from "@/utils/formatUtils";

export function FAQSection() {
  const { slug } = useParams<{ slug: string }>();
  const formats = slug ? slugToFormat(slug) : null;
  
  // Format-specific FAQs based on current conversion
  const formatFAQs = formats ? [
    {
      question: `How do I convert ${formats.source.toUpperCase()} to ${formats.target.toUpperCase()}?`,
      answer: `Converting your ${formats.source.toUpperCase()} image to ${formats.target.toUpperCase()} is simple: just drag and drop your ${formats.source.toUpperCase()} file into the upload area or click to browse your files. The conversion happens automatically in your browser, and you can download the converted ${formats.target.toUpperCase()} image instantly.`,
    },
    {
      question: `Why convert from ${formats.source.toUpperCase()} to ${formats.target.toUpperCase()}?`,
      answer: getFormatSpecificReason(formats.source, formats.target),
    },
    {
      question: `Is there any loss of quality when converting ${formats.source.toUpperCase()} to ${formats.target.toUpperCase()}?`,
      answer: getQualityInfo(formats.source, formats.target),
    },
  ] : [];
  
  // General FAQs
  const generalFAQs = [
    {
      question: "Is my data safe with Convertify?",
      answer: "Yes, your data is 100% safe. All image processing happens directly in your browser - your files are never uploaded to our servers, ensuring complete privacy and security. We don't store, share, or have access to your images at any point during the conversion process.",
    },
    {
      question: "Are there any file size limitations?",
      answer: "While our converter works with most image sizes, very large files (over 100MB) might cause performance issues depending on your device's capabilities. For optimal performance, we recommend files under 50MB.",
    },
    {
      question: "How does browser-based conversion work?",
      answer: "Convertify uses the Canvas API built into modern browsers to process and convert images directly on your device. This technology allows for fast, secure conversions without requiring server uploads or specialized software installations.",
    },
    {
      question: "Which browsers are supported?",
      answer: "Convertify works best with the latest versions of Chrome, Firefox, Safari, and Edge. Some advanced conversion features might have limited support in older browsers.",
    },
    {
      question: "Can I convert multiple images at once?",
      answer: "Currently, Convertify processes one image at a time to ensure the highest quality conversion. We're working on batch conversion functionality for a future update.",
    },
    {
      question: "What if my image format isn't detected correctly?",
      answer: "Our format detection is highly accurate, but if your image format is incorrectly identified, we'll automatically redirect you to the correct converter. You can also manually select the appropriate converter from our navigation.",
    },
  ];
  
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      
      <Accordion type="single" collapsible className="w-full">
        {/* Format specific FAQs */}
        {formatFAQs.map((faq, index) => (
          <AccordionItem key={`format-${index}`} value={`format-${index}`}>
            <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
        
        {/* General FAQs */}
        {generalFAQs.map((faq, index) => (
          <AccordionItem key={`general-${index}`} value={`general-${index}`}>
            <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

// Helper functions for format-specific FAQ content
function getFormatSpecificReason(source: string, target: string): string {
  const formatPairs: Record<string, Record<string, string>> = {
    png: {
      jpeg: "Converting PNG to JPEG can significantly reduce file size, which is beneficial for web images where transparency isn't needed. JPEG files are typically 60-80% smaller than PNG files, improving page load times and reducing bandwidth usage.",
      webp: "WebP offers superior compression compared to PNG while maintaining excellent quality. Converting to WebP can reduce file sizes by up to 30% compared to PNG, making your images load faster on websites that support WebP format.",
      avif: "AVIF provides exceptional compression efficiency with better quality than PNG. Converting to AVIF can reduce file sizes by up to 50% compared to PNG while maintaining visual quality, perfect for modern web applications.",
    },
    jpeg: {
      png: "Converting JPEG to PNG is useful when you need a lossless format or transparency. While PNG files are larger, they preserve all image details without compression artifacts that may be present in JPEG images.",
      webp: "WebP offers better compression than JPEG while maintaining similar or better visual quality. Converting to WebP can reduce file sizes by 25-35% compared to JPEG, improving website performance significantly.",
      avif: "AVIF provides superior compression with better quality preservation than JPEG. Converting to AVIF can reduce file sizes by 30-50% compared to JPEG while maintaining or even improving visual quality.",
    },
    webp: {
      png: "Converting WebP to PNG is useful when you need a more widely compatible lossless format or when editing the image in software that doesn't support WebP. PNG preserves all image details including transparency.",
      jpeg: "Converting WebP to JPEG is beneficial when you need broader compatibility with older systems and software that don't support WebP, though you'll lose any transparency in the original WebP image.",
      avif: "AVIF is the next generation of image formats with even better compression than WebP. Converting from WebP to AVIF can further reduce file sizes while maintaining excellent visual quality.",
    },
    avif: {
      png: "Converting AVIF to PNG is useful when you need maximum compatibility or a lossless format for editing. While PNG files are larger, they're supported by virtually all image editing software.",
      jpeg: "Converting AVIF to JPEG provides broader compatibility with older systems and software that don't yet support AVIF format, though at the cost of some quality and larger file sizes.",
      webp: "Converting AVIF to WebP offers a good middle ground between compression efficiency and compatibility. WebP is more widely supported than AVIF while still providing good compression.",
    },
  };

  // Normalize source/target for lookup
  const normalizedSource = source === 'jpg' ? 'jpeg' : source;
  const normalizedTarget = target === 'jpg' ? 'jpeg' : target;
  
  // Return the specific reason if available
  return formatPairs[normalizedSource]?.[normalizedTarget] || 
    `Converting from ${source.toUpperCase()} to ${target.toUpperCase()} can be useful depending on your specific needs, whether for file size optimization, quality preservation, or compatibility with different systems and software.`;
}

function getQualityInfo(source: string, target: string): string {
  // Lossless to lossy
  if (['png', 'bmp', 'gif', 'svg'].includes(source) && ['jpeg', 'jpg', 'webp', 'avif'].includes(target)) {
    return `When converting from ${source.toUpperCase()} (a lossless format) to ${target.toUpperCase()} (a lossy format), there may be some quality reduction. However, our converter uses optimal settings to minimize visible quality loss while maximizing compression efficiency. For most images, especially photographs, the difference is usually imperceptible to the human eye.`;
  }
  
  // Lossy to lossless
  if (['jpeg', 'jpg', 'webp', 'avif'].includes(source) && ['png', 'bmp'].includes(target)) {
    return `Converting from ${source.toUpperCase()} (a lossy format) to ${target.toUpperCase()} (a lossless format) will preserve the current quality of your image without introducing additional loss. However, it won't recover details already lost in the original ${source.toUpperCase()} compression. The resulting file will be larger in size but won't lose any additional quality.`;
  }
  
  // Lossy to lossy
  if (['jpeg', 'jpg', 'webp', 'avif'].includes(source) && ['jpeg', 'jpg', 'webp', 'avif'].includes(target)) {
    return `Since both ${source.toUpperCase()} and ${target.toUpperCase()} are lossy formats, there may be some additional quality reduction during conversion. Our converter is optimized to minimize this effect, but for critical work, we recommend starting with the highest quality original image possible.`;
  }
  
  // Lossless to lossless
  if (['png', 'bmp', 'gif', 'svg'].includes(source) && ['png', 'bmp'].includes(target)) {
    return `Converting between ${source.toUpperCase()} and ${target.toUpperCase()} formats should not result in any quality loss, as both are lossless formats. The visual appearance should remain identical, though file sizes may differ due to different compression algorithms.`;
  }
  
  // Default response
  return `The quality impact when converting from ${source.toUpperCase()} to ${target.toUpperCase()} depends on the specific characteristics of these formats. Our converter uses optimal settings to balance quality and file size. For best results, we recommend starting with the highest quality original image.`;
}
