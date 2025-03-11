import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import { useTranslation } from "@/hooks/useTranslation";

const Terms = () => {
  const { languagePath } = useLanguage();
  const { t } = useTranslation();
  
  // Set page metadata
  useEffect(() => {
    document.title = t('pages.terms.title');
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', t('pages.terms.description'));
    
    // Set canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', `https://convertify.click${languagePath('/terms')}`);
  }, [languagePath, t]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            {t('common.termsOfService')}
          </h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="lead">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <p>
              Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Convertify website (the "Service") operated by Convertify ("us", "we", or "our").
            </p>
            
            <p>
              Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
            
            <p>
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>
            
            <h2>Use of Service</h2>
            <p>
              Convertify provides a free online image conversion service. You may use our Service to convert images between different formats for personal or commercial use, subject to the following conditions:
            </p>
            <ul>
              <li>You will not use the Service for any illegal purposes</li>
              <li>You will not attempt to circumvent, disable, or interfere with security-related features of the Service</li>
              <li>You will not use the Service in a way that could damage, disable, overburden, or impair it</li>
              <li>You are solely responsible for the content you convert using our Service</li>
            </ul>
            
            <h2>Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of Convertify and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>
            
            <p>
              Our Service allows you to convert your own images. You retain all rights to your original content. We do not claim ownership of any images you convert using our Service.
            </p>
            
            <h2>Limitation of Liability</h2>
            <p>
              In no event shall Convertify, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul>
              <li>Your access to or use of or inability to access or use the Service</li>
              <li>Any conduct or content of any third party on the Service</li>
              <li>Any content obtained from the Service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
            
            <h2>Disclaimer</h2>
            <p>
              Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
            </p>
            
            <h2>Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms, please <a href={languagePath('/contact')} className="text-primary hover:underline">contact us</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
