'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/components/LanguageProvider';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';

export function ContactPage() {
  const { languagePath } = useLanguage();
  const { t } = useTranslation();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here
    alert("This form is not functional in the demo. In a real application, this would send your message to our team.");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            {t('common.contactUs')}
          </h1>
          
          <div className="prose dark:prose-invert max-w-none mb-8">
            <p className="lead">
              We'd love to hear from you! Whether you have a question about our services, need help with a conversion, or just want to say hello, please don't hesitate to reach out.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="your.email@example.com" required />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <Input id="subject" placeholder="What is your message about?" required />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Please provide as much detail as possible..." 
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Other Ways to Connect</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Email</h3>
                  <p className="text-muted-foreground">
                    For general inquiries: <a href="mailto:info@convertify.click" className="text-primary hover:underline">info@convertify.click</a>
                  </p>
                  <p className="text-muted-foreground">
                    For technical support: <a href="mailto:support@convertify.click" className="text-primary hover:underline">support@convertify.click</a>
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Social Media</h3>
                  <p className="text-muted-foreground mb-2">
                    Follow us on social media for updates, tips, and more:
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-primary hover:underline">Twitter</a>
                    <a href="#" className="text-primary hover:underline">Facebook</a>
                    <a href="#" className="text-primary hover:underline">LinkedIn</a>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">FAQ</h3>
                  <p className="text-muted-foreground">
                    Before reaching out, you might find your answer in our{' '}
                    <Link href={languagePath('/#faq')} className="text-primary hover:underline">
                      Frequently Asked Questions
                    </Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}