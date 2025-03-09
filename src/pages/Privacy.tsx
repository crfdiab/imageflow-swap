
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  // Set page metadata
  document.title = "Privacy Policy | Convertify";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Introduction</h2>
            <p>
              At Convertify, we take your privacy seriously. This Privacy Policy explains how we handle your data when you use our website and services.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Information We Don't Collect</h2>
            <p>
              We believe in privacy by design. Our image conversion tools operate entirely in your browser:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your images are never uploaded to our servers</li>
              <li>We don't store your converted images</li>
              <li>We don't require user accounts or personal information</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Information We Do Collect</h2>
            <p>
              We collect limited anonymous usage data to improve our service:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Anonymous analytics data (page views, conversion types used)</li>
              <li>Browser and device information (for debugging and compatibility)</li>
              <li>Error reports (to identify and fix issues)</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Cookies</h2>
            <p>
              We use essential cookies to remember your preferences (like theme choice). 
              We do not use third-party tracking cookies for advertising purposes.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Contact</h2>
            <p>
              If you have any questions about our privacy practices, please contact us at privacy@convertify.click.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
