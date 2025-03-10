import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const DataProtection = () => {
  // Set page metadata
  useEffect(() => {
    document.title = "Data Protection | Convertify";
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 
      "Learn how Convertify protects your data. Our browser-based image conversion tool processes all files locally, ensuring your images never leave your device."
    );
    
    // Set canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', "https://convertify.click/data-protection");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Data Protection</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-4">
            Last updated: May 1, 2023
          </p>
          
          <p>
            At Convertify, we prioritize the protection of your data and privacy. This Data Protection Policy explains our approach to safeguarding your information.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Commitment to Data Protection</h2>
          <p>
            Convertify is designed with a "privacy-by-design" approach:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>All image processing happens directly in your browser</li>
            <li>Your files are never uploaded to our servers</li>
            <li>We don't store any of your images or conversion results</li>
            <li>No account creation or personal information is required to use our service</li>
            <li>We support processing up to 50 images at once, all with the same privacy protections</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">How We Process Your Data</h2>
          <p>
            When you use Convertify to convert images:
          </p>
          <ol className="list-decimal pl-6 my-4">
            <li>You select or drag and drop images into your browser</li>
            <li>Our JavaScript code runs entirely within your browser to process the conversion</li>
            <li>The converted images are generated locally on your device</li>
            <li>You can download the results directly to your device</li>
            <li>When you leave the page or close your browser, all processed data is automatically cleared</li>
          </ol>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Technical Safeguards</h2>
          <p>
            We implement several technical measures to protect your data:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>HTTPS encryption for all website traffic</li>
            <li>Regular security audits and updates</li>
            <li>Content Security Policy (CSP) to prevent cross-site scripting attacks</li>
            <li>Minimal use of third-party services to reduce data exposure</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Your Rights</h2>
          <p>
            Under various data protection regulations, you have certain rights regarding your personal data. Since we don't collect or store personal data through our image conversion service, many of these rights don't directly apply. However, we respect and support:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>Your right to privacy</li>
            <li>Your right to be informed about how your data is processed</li>
            <li>Your right to access any data we might hold about you</li>
            <li>Your right to object to processing of your data</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Policy</h2>
          <p>
            We may update our Data Protection Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Data Protection Policy, please contact us at <a href="mailto:privacy@convertify.click" className="text-primary hover:underline">privacy@convertify.click</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DataProtection;
