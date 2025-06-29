import { Metadata } from 'next';
import { PrivacyPage } from '@/components/pages/PrivacyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy - How Convertify Protects Your Data',
  description: 'Read our privacy policy to understand how Convertify protects your data. All image processing happens locally in your browser for complete privacy.',
  alternates: {
    canonical: '/privacy'
  }
};

export default function Page() {
  return <PrivacyPage />;
}