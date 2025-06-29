import { Metadata } from 'next';
import { NotFoundPage } from '@/components/pages/NotFoundPage';

export const metadata: Metadata = {
  title: 'Page Not Found - 404 Error',
  description: 'The page you are looking for could not be found. Return to Convertify to continue converting your images.',
};

export default function NotFound() {
  return <NotFoundPage />;
}