// Simple JavaScript version of the sitemap generator for Next.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Hardcoded sitemap content
const generateSitemap = () => {
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
  
  // Common conversion formats
  const formats = ['png', 'jpeg', 'webp', 'avif', 'gif', 'svg', 'bmp', 'ico'];
  
  // Generate all format combinations
  const conversionRoutes = [];
  formats.forEach(source => {
    formats.forEach(target => {
      if (source !== target) {
        const slug = `${source}-${target}`;
        const priority = getPriorityForSlug(slug);
        conversionRoutes.push({
          url: `/${slug}`,
          priority,
          changefreq: 'monthly'
        });
      }
    });
  });
  
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
  
  // Write to public directory
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml);
  console.log('Sitemap generated successfully!');
};

// Helper function to determine priority based on format types
function getPriorityForSlug(slug) {
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

// Execute the function
generateSitemap();