import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

const Contact = () => {
  // Set page metadata
  useEffect(() => {
    document.title = "Contact Us | Convertify";
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 
      "Get in touch with the Convertify team. We welcome your feedback, questions, and suggestions about our free online image conversion tool."
    );
    
    // Set canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', "https://convertify.click/contact");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-4">
              We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us.
            </p>
            
            <Card className="p-6 mt-6">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-2">
                <p><strong>Email:</strong> <a href="mailto:support@convertify.click" className="text-primary hover:underline">support@convertify.click</a></p>
                <p><strong>Response Time:</strong> We aim to respond to all inquiries within 24-48 hours.</p>
              </div>
            </Card>
            
            <Card className="p-6 mt-6">
              <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Is Convertify really free?</h3>
                  <p className="text-muted-foreground">Yes, Convertify is completely free to use with no hidden fees or subscriptions.</p>
                </div>
                <div>
                  <h3 className="font-medium">Are my images uploaded to your servers?</h3>
                  <p className="text-muted-foreground">No, all image processing happens directly in your browser. Your files never leave your device.</p>
                </div>
                <div>
                  <h3 className="font-medium">How many images can I convert at once?</h3>
                  <p className="text-muted-foreground">You can convert up to 50 images simultaneously with our batch processing feature.</p>
                </div>
              </div>
            </Card>
          </div>
          
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Send Us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <Input id="email" type="email" placeholder="Your email address" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                  <Input id="subject" placeholder="Subject of your message" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <Textarea id="message" placeholder="Your message" rows={6} />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
