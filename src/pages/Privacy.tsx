import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  // Set page metadata
  useEffect(() => {
    document.title = "Privacy Policy | Convertify";
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 
      "Convertify's Privacy Policy explains how we handle your data. We process all images locally in your browser, ensuring complete privacy and security."
    );
    
    // Set canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', "https://convertify.click/privacy");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-4">
            Last updated: May 1, 2023
          </p>
          
          <p>
            At Convertify, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our website.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Information We Don't Collect</h2>
          <p>
            Convertify is designed with privacy in mind. When you use our image conversion tools:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>Your images are processed entirely in your browser and are never uploaded to our servers</li>
            <li>We do not store any of your images or conversion results</li>
            <li>We do not require you to create an account or provide personal information to use our services</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Information We Do Collect</h2>
          <p>
            We collect limited anonymous usage data to help us improve our service:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>Anonymous analytics data about how users interact with our website</li>
            <li>Technical information such as browser type, device type, and operating system</li>
            <li>Aggregated statistics about which conversion tools are most popular</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Cookies</h2>
          <p>
            We use cookies to enhance your experience on our website:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>Essential cookies that enable basic functionality</li>
            <li>Analytics cookies that help us understand how visitors use our site</li>
            <li>Preference cookies that remember your settings and choices</li>
          </ul>
          <p>
            You can control cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features of our website.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Third-Party Services</h2>
          <p>
            We use the following third-party services:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>Google Analytics to analyze website traffic and usage patterns</li>
            <li>Google Tag Manager to manage various scripts and tracking codes</li>
          </ul>
          <p>
            These services may collect information as described in their respective privacy policies.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@convertify.click" className="text-primary hover:underline">privacy@convertify.click</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
