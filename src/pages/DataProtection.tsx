
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const DataProtection = () => {
  // Set page metadata
  document.title = "Data Protection | Convertify";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Data Protection Statement</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Our Data Protection Commitment</h2>
            <p>
              Convertify is designed with data protection as a fundamental principle. We process all image conversions directly in your browser, ensuring your files never leave your device.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Client-Side Processing</h2>
            <p>
              Our technology uses the Canvas API and other browser capabilities to perform all image conversions locally on your device. This approach ensures:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your images are never transmitted to our servers</li>
              <li>No temporary or permanent copies of your images are stored</li>
              <li>Complete privacy throughout the conversion process</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Data Minimization</h2>
            <p>
              We follow data minimization principles by:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Only collecting anonymous usage statistics</li>
              <li>Not requiring user registration or login</li>
              <li>Not tracking individual user behavior or creating user profiles</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">International Data Transfers</h2>
            <p>
              Since we don't collect or store your images or personal data, there are no international data transfers of your content.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Contact</h2>
            <p>
              For any data protection questions or concerns, please contact our data protection team at privacy@convertify.click.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DataProtection;
