
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const About = () => {
  // Set page metadata
  document.title = "About Us | Convertify";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About Convertify</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-4">
              Convertify is a free online tool that allows you to convert images between various formats directly in your browser.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
            <p>
              Our mission is to provide a simple, fast, and secure way to convert images between formats without compromising your privacy.
              We believe that image conversion should be accessible to everyone, without requiring software installation or uploading your files to third-party servers.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">How It Works</h2>
            <p>
              Convertify processes all conversions directly in your browser using modern web technologies like the Canvas API.
              Your images are never uploaded to our servers, ensuring complete privacy and security.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Why Choose Convertify</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Privacy-focused:</strong> All processing happens locally in your browser.</li>
              <li><strong>Fast and efficient:</strong> No waiting for uploads or server processing.</li>
              <li><strong>Free to use:</strong> All our conversion tools are completely free.</li>
              <li><strong>No registration required:</strong> Convert images instantly without creating an account.</li>
              <li><strong>High-quality conversions:</strong> Maintain the highest possible quality in your converted images.</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
