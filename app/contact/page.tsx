import { Metadata } from 'next';
import { ContactPage } from '@/components/pages/ContactPage';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch with Convertify',
  description: 'Have questions about our image conversion tools? Need support? Contact the Convertify team - we\'d love to hear from you.',
  alternates: {
    canonical: '/contact'
  }
};

export default function Page() {
  return <ContactPage />;
}