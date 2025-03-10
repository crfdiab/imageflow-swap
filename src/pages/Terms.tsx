import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Terms = () => {
  // Set page metadata
  useEffect(() => {
    document.title = "Terms of Service | Convertify";
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 
      "Read Convertify's Terms of Service. By using our free online image conversion tool, you agree to these terms and conditions."
    );
    
    // Set canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', "https://convertify.click/terms");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-4">
            Last updated: May 1, 2023
          </p>
          
          <p>
            Please read these Terms of Service ("Terms") carefully before using the Convertify website.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Convertify, you agree to be bound by these Terms. If you do not agree to all the terms and conditions, you should not use our service.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">2. Description of Service</h2>
          <p>
            Convertify provides free online image conversion tools that allow users to convert images between various formats. All processing happens in the user's browser, and no files are uploaded to our servers.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">3. User Responsibilities</h2>
          <p>
            When using Convertify, you agree to:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>Use the service only for lawful purposes and in accordance with these Terms</li>
            <li>Not use the service to process, create, or transmit illegal, harmful, or offensive content</li>
            <li>Not attempt to interfere with, compromise, or disrupt the service</li>
            <li>Not use automated systems or software to extract data from the website (scraping)</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">4. Intellectual Property</h2>
          <p>
            Convertify and its original content, features, and functionality are owned by Convertify and are protected by international copyright, trademark, and other intellectual property laws.
          </p>
          <p>
            We do not claim ownership of any images you convert using our service. You retain all rights to your content.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">5. Disclaimer of Warranties</h2>
          <p>
            Convertify is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, secure, or error-free.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">6. Limitation of Liability</h2>
          <p>
            In no event shall Convertify be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses, resulting from your use of or inability to use the service.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">7. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">8. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at <a href="mailto:terms@convertify.click" className="text-primary hover:underline">terms@convertify.click</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
