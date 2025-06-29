import { Metadata } from 'next';
import { TermsPage } from '@/components/pages/TermsPage';

export const metadata: Metadata = {
  title: 'Terms of Service - Convertify Usage Terms',
  description: 'Read our terms of service to understand the rules and guidelines for using Convertify\'s free image conversion tools.',
  alternates: {
    canonical: '/terms'
  }
};

export default function Page() {
  return <TermsPage />;
}