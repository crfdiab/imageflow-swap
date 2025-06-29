import { Metadata } from 'next';
import { HomePage } from '@/components/pages/HomePage';

export const metadata: Metadata = {
  title: 'Free Online Image Format Conversion Tools | Bulk Convert 50 Images',
  description: 'Convert images between PNG, JPEG, WebP, AVIF, GIF, SVG and more. Process up to 50 images at once with no upload needed - all processing happens right in your browser for privacy.',
  alternates: {
    canonical: '/'
  }
};

export default function Page() {
  return <HomePage />;
}