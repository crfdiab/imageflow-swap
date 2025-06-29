import { Metadata } from 'next';
import { DataProtectionPage } from '@/components/pages/DataProtectionPage';

export const metadata: Metadata = {
  title: 'Data Protection - How We Safeguard Your Information',
  description: 'Learn about our data protection measures and how Convertify ensures your images and personal information remain secure and private.',
  alternates: {
    canonical: '/data-protection'
  }
};

export default function Page() {
  return <DataProtectionPage />;
}