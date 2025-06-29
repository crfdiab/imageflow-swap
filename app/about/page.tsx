import { Metadata } from 'next';
import { AboutPage } from '@/components/pages/AboutPage';

export const metadata: Metadata = {
  title: 'About Us - Learn More About Convertify',
  description: 'Learn about Convertify, our mission to provide free, secure, and privacy-focused image conversion tools that work directly in your browser.',
  alternates: {
    canonical: '/about'
  }
};

export default function Page() {
  return <AboutPage />;
}