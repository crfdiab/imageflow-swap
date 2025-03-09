
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Terms = () => {
  // Set page metadata
  document.title = "Terms of Service | Convertify";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Acceptance of Terms</h2>
            <p>
              By using Convertify, you agree to these Terms of Service. If you do not agree to these terms, please do not use our service.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Description of Service</h2>
            <p>
              Convertify provides free online image format conversion tools that operate directly in your web browser. We support conversion between various image formats including PNG, JPEG, WebP, AVIF, GIF, SVG, and more.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">User Conduct</h2>
            <p>
              When using Convertify, you agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use our service for any illegal purposes</li>
              <li>Attempt to bypass, disable, or interfere with our service's security features</li>
              <li>Use automated means to access or use our service</li>
              <li>Overload or flood our service with requests</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Intellectual Property</h2>
            <p>
              Convertify and its original content, features, and functionality are owned by Convertify and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Disclaimer of Warranties</h2>
            <p>
              Convertify is provided "as is" without warranties of any kind, either express or implied. We do not guarantee that our service will be uninterrupted, secure, or error-free.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Limitation of Liability</h2>
            <p>
              Convertify shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our service.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any changes by updating the "Last updated" date of these terms.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Contact</h2>
            <p>
              If you have any questions about these Terms, please contact us at terms@convertify.click.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
