import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const About = () => {
  // Set page metadata
  useEffect(() => {
    document.title = "About Us | Convertify";
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 
      "Learn about Convertify, the free online image conversion tool that lets you convert up to 50 images at once with complete privacy and security."
    );
    
    // Set canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', "https://convertify.click/about");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        
        {/* About content */}
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-4">
            Convertify is a free online tool that allows you to convert images between various formats without uploading your files to any server. All processing happens right in your browser, ensuring complete privacy and security.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
          <p>
            Our mission is to provide a simple, fast, and secure way to convert images between different formats. We believe that essential tools like image conversion should be accessible to everyone without compromising privacy or requiring expensive software.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">How It Works</h2>
          <p>
            Convertify uses modern web technologies to process your images directly in your browser. When you upload an image, it never leaves your device - all conversion happens locally using your computer's resources. This approach offers several benefits:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>Complete privacy - your files never leave your device</li>
            <li>Fast processing - no waiting for uploads or downloads</li>
            <li>Batch processing - convert up to 50 images at once</li>
            <li>No registration required - just visit and start converting</li>
            <li>Works offline - once loaded, you can use it without internet</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Supported Formats</h2>
          <p>
            Convertify supports conversion between all major image formats, including:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>PNG - Portable Network Graphics (lossless)</li>
            <li>JPEG - Joint Photographic Experts Group (lossy)</li>
            <li>WebP - Modern format with superior compression</li>
            <li>AVIF - AV1 Image File Format (excellent compression)</li>
            <li>GIF - Graphics Interchange Format</li>
            <li>SVG - Scalable Vector Graphics</li>
            <li>BMP - Bitmap image file</li>
            <li>ICO - Icon file format</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            Have questions, suggestions, or feedback? We'd love to hear from you! Visit our <a href="/contact" className="text-primary hover:underline">Contact page</a> to get in touch.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
