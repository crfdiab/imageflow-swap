import { getAllFormatPermutations } from '@/utils/formatUtils';

// Define all available routes for better organization
export const routes = {
  // Static routes
  static: {
    home: '/',
    about: '/about',
    contact: '/contact',
    privacy: '/privacy',
    dataProtection: '/data-protection',
    terms: '/terms',
  },
  
  // Dynamic conversion routes
  conversions: getAllFormatPermutations().reduce((acc, slug) => {
    acc[slug] = `/${slug}`;
    return acc;
  }, {} as Record<string, string>)
};

// Helper function to get all routes as an array
export const getAllRoutes = (): string[] => {
  return [
    ...Object.values(routes.static),
    ...Object.values(routes.conversions)
  ];
}; 