/**
 * Robots.txt Configuration for ZFX AllTech
 * Optimized for SEO - controls search engine crawling behavior
 */

import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Rules for all search engines
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // Disallow API routes
          '/_next/',         // Disallow Next.js internal files
          '/admin/',         // Disallow admin paths
          '/private/',       // Disallow private paths
          '/*.json$',        // Disallow JSON files
          '/404',            // Disallow 404 page
        ],
        crawlDelay: 0,
      },
      // Specific rules for Google
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/private/'],
      },
      // Specific rules for Bing
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/private/'],
      },
      // Block bad bots
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'DotBot',
          'MJ12bot',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${SEO_CONFIG.siteUrl}/sitemap.xml`,
    host: SEO_CONFIG.siteUrl,
  };
}
