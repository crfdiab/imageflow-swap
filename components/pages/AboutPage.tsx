'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';

export function AboutPage() {
  const { languagePath } = useLanguage();
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            {t('common.aboutUs')}
          </h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="lead">
              Convertify is a free online tool that allows you to convert images between different formats directly in your browser. No uploads required, ensuring complete privacy and security.
            </p>
            
            <h2>Our Mission</h2>
            <p>
              Our mission is to provide a simple, fast, and secure way to convert images between different formats without requiring any software installation or uploading files to external servers. We believe in making image conversion accessible to everyone, regardless of technical expertise.
            </p>
            
            <h2>How Convertify Works</h2>
            <p>
              Convertify uses modern web technologies to process your images directly in your browser. This means:
            </p>
            <ul>
              <li>Your files never leave your device</li>
              <li>Conversions happen instantly</li>
              <li>No registration or account required</li>
              <li>No software to install</li>
              <li>Works on any device with a modern browser</li>
            </ul>
            
            <h2>Privacy First</h2>
            <p>
              We take your privacy seriously. Since all processing happens locally in your browser, your images are never uploaded to our servers. This ensures complete privacy and security for your sensitive or personal images.
            </p>
            
            <h2>Supported Formats</h2>
            <p>
              Convertify supports conversion between all major image formats, including:
            </p>
            <ul>
              <li>PNG</li>
              <li>JPEG/JPG</li>
              <li>WebP</li>
              <li>AVIF</li>
              <li>GIF</li>
              <li>SVG</li>
              <li>BMP</li>
              <li>ICO</li>
            </ul>
            
            <h2>Contact Us</h2>
            <p>
              Have questions, feedback, or suggestions? We'd love to hear from you! Visit our{' '}
              <Link href={languagePath('/contact')} className="text-primary hover:underline">
                Contact page
              </Link>{' '}
              to get in touch.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}