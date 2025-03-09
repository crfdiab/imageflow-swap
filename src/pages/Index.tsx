
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { ConversionArea } from "@/components/ConversionArea";
import { FAQSection } from "@/components/FAQSection";
import { RelatedConverters } from "@/components/RelatedConverters";
import { Footer } from "@/components/Footer";
import { slugToFormat } from "@/utils/formatUtils";

const Index = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // If no format specified in URL, redirect to default PNG to JPEG conversion
  useEffect(() => {
    if (!slug) {
      navigate("/png-jpeg", { replace: true });
    } else if (slug && !slugToFormat(slug)) {
      // If invalid slug, redirect to default
      navigate("/png-jpeg", { replace: true });
    }
  }, [slug, navigate]);
  
  // Set page metadata based on current conversion formats
  useEffect(() => {
    if (slug) {
      const formats = slugToFormat(slug);
      if (formats) {
        document.title = `Convert ${formats.source.toUpperCase()} to ${formats.target.toUpperCase()} - Convertify`;
        
        // Set meta description for SEO
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.setAttribute('name', 'description');
          document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', 
          `Convert ${formats.source.toUpperCase()} images to ${formats.target.toUpperCase()} format quickly and easily. Free, secure, and entirely browser-based with no uploads required.`
        );
        
        // Set canonical link
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
          canonicalLink = document.createElement('link');
          canonicalLink.setAttribute('rel', 'canonical');
          document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', `https://convertify.click/${slug}`);
      }
    }
  }, [slug]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ConversionArea />
        <div id="faq">
          <FAQSection />
        </div>
        <RelatedConverters />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
