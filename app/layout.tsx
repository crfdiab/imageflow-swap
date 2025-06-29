import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { GoogleTagManager } from '@/components/GoogleTagManager';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Convertify - Free Online Image Format Conversion Tools | Bulk Convert 50 Images',
    template: '%s | Convertify'
  },
  description: 'Convert images between PNG, JPEG, WebP, AVIF, GIF, SVG and more. Process up to 50 images at once with no upload needed - all processing happens right in your browser for privacy.',
  keywords: ['image converter', 'format conversion', 'PNG to JPEG', 'WebP converter', 'AVIF converter', 'bulk image conversion'],
  authors: [{ name: 'Convertify' }],
  creator: 'Convertify',
  publisher: 'Convertify',
  metadataBase: new URL('https://convertify.click'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'es': '/es',
      'fr': '/fr',
      'de': '/de',
      'it': '/it',
      'pt': '/pt',
      'ru': '/ru',
      'zh': '/zh',
      'ja': '/ja',
      'ar': '/ar'
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://convertify.click',
    siteName: 'Convertify',
    title: 'Convertify - Free Online Image Format Conversion Tools',
    description: 'Convert images between various formats with our fast, free, and secure browser-based tools. Process up to 50 images at once with no upload required.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Convertify - Image Format Converter'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convertify - Free Online Image Format Conversion Tools',
    description: 'Convert images between various formats with our fast, free, and secure browser-based tools.',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: '8-rQ4_lnC31bCaMY4LvanL05kMfaL7uI6gmpmFqEpEo'
  }
};

const GTM_ID = 'GTM-PFH5MKLB';
const GA_MEASUREMENT_ID = 'G-N2MZSTTKB4';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleTagManager gtmId={GTM_ID} />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Providers>
          {children}
        </Providers>
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}