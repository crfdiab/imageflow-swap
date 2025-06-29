import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { slugToFormat, getAllFormatPermutations } from '@/utils/formatUtils';
import { ConverterPage } from '@/components/pages/ConverterPage';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllFormatPermutations();
  
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const formats = slugToFormat(params.slug);
  
  if (!formats) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.'
    };
  }

  const { source, target } = formats;
  const title = `Convert ${source.toUpperCase()} To ${target.toUpperCase()} Free Online 50 Images Bulk In-Time - Convertify`;
  const description = `Convert ${source.toUpperCase()} to ${target.toUpperCase()} format online for free. Process up to 50 images at once with no upload required - all conversion happens in your browser for complete privacy. Fast, secure, and high quality.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${params.slug}`
    },
    openGraph: {
      title,
      description,
      url: `https://convertify.click/${params.slug}`,
      type: 'website'
    },
    twitter: {
      title,
      description
    }
  };
}

export default function Page({ params }: PageProps) {
  const formats = slugToFormat(params.slug);
  
  if (!formats) {
    notFound();
  }

  return <ConverterPage slug={params.slug} />;
}