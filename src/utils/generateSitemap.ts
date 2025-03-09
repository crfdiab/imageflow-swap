import fs from 'fs';
import { getAllFormatPermutations } from './formatUtils';

export function generateSitemap() {
  const baseUrl = 'https://convertify.click';
  
  // Static routes
  const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'monthly' },
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.5', changefreq: 'monthly' },
    { url: '/data-protection', priority: '0.5', changefreq: 'monthly' },
    { url: '/terms', priority: '0.5', changefreq: 'monthly' },
  ];
  
  // Dynamic conversion routes
  const conversionRoutes = getAllFormatPermutations().map(slug => ({
    url: `/${slug}`,
    priority: getPriorityForSlug(slug),
    changefreq: 'monthly'
  }));
  
  // Combine all routes
  const allRoutes = [...staticRoutes, ...conversionRoutes];
  
  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  // Write to file
  fs.writeFileSync('./public/sitemap.xml', xml);
  console.log('Sitemap generated successfully!');
}

// Helper function to determine priority based on format types
function getPriorityForSlug(slug: string): string {
  // Implement logic to assign priorities based on format popularity
  // This is a simplified example
  if (slug.includes('png') || slug.includes('jpeg') || slug.includes('webp')) {
    return '0.9';
  } else if (slug.includes('avif')) {
    return '0.8';
  } else if (slug.includes('gif') || slug.includes('bmp')) {
    return '0.7';
  } else {
    return '0.6';
  }
} 