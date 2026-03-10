import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: 'https://docs.docutracker.com',
    sitemap: 'https://docs.docutracker.com/sitemap.xml',
  };
}
