
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare } from "lucide-react";

const Contact = () => {
  // Set page metadata
  document.title = "Contact Us | Convertify";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          
          <p className="text-lg mb-8">
            We'd love to hear from you! Whether you have a question, feedback, or need assistance, 
            please don't hesitate to reach out.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Us
                </CardTitle>
                <CardDescription>Send us a message anytime</CardDescription>
              </CardHeader>
              <CardContent>
                <a 
                  href="mailto:support@convertify.click" 
                  className="text-primary hover:underline"
                >
                  support@convertify.click
                </a>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Feedback
                </CardTitle>
                <CardDescription>We value your input</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  We're constantly improving our tools. Your feedback helps us make Convertify better for everyone.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mt-8 mb-4">Response Time</h2>
            <p>
              We aim to respond to all inquiries within 48 hours during business days. For urgent matters, 
              please indicate so in your message subject.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
