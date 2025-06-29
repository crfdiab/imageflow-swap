'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';

export function PrivacyPage() {
  const { languagePath } = useLanguage();
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            {t('common.privacyPolicy')}
          </h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="lead">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <p>
              At Convertify, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.
            </p>
            
            <h2>Information We Don't Collect</h2>
            <p>
              <strong>We do not collect or store your images.</strong> All image processing happens directly in your browser using client-side technologies. Your files never leave your device or get uploaded to our servers.
            </p>
            
            <h2>Information We Collect</h2>
            <p>
              We collect limited information to improve our service and provide a better user experience:
            </p>
            <ul>
              <li><strong>Usage Data:</strong> We collect anonymous usage statistics such as page views, conversion types, and browser information. This data cannot be used to identify you personally.</li>
              <li><strong>Cookies:</strong> We use cookies to remember your preferences (such as dark/light mode) and to analyze site traffic patterns.</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>
              The limited information we collect is used for:
            </p>
            <ul>
              <li>Improving our website and services</li>
              <li>Analyzing usage patterns to optimize user experience</li>
              <li>Troubleshooting technical issues</li>
              <li>Preventing abuse of our services</li>
            </ul>
            
            <h2>Third-Party Services</h2>
            <p>
              We use the following third-party services:
            </p>
            <ul>
              <li><strong>Google Analytics:</strong> To analyze website traffic and user behavior. Google Analytics may use cookies to collect anonymous data.</li>
              <li><strong>Hosting Providers:</strong> Our website is hosted on secure servers provided by reputable hosting companies.</li>
            </ul>
            
            <h2>Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Request restriction of processing</li>
              <li>Request transfer of your information</li>
              <li>Withdraw consent at any time</li>
            </ul>
            
            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your information. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
            
            <h2>Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>
            
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last updated" date.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please{' '}
              <Link href={languagePath('/contact')} className="text-primary hover:underline">
                contact us
              </Link>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}