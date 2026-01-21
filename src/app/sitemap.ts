/**
 * Sitemap Configuration for ZFX AllTech
 * Optimized for SEO - helps search engines discover and index pages
 */

import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);

  return [
    // Homepage - Highest Priority
    {
      url: SEO_CONFIG.siteUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // Main Sections - High Priority
    {
      url: `${SEO_CONFIG.siteUrl}/#services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${SEO_CONFIG.siteUrl}/#technologies`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SEO_CONFIG.siteUrl}/#portfolio`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SEO_CONFIG.siteUrl}/#about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SEO_CONFIG.siteUrl}/#contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.95,
    },

    // Legal Pages - Low Priority
    {
      url: `${SEO_CONFIG.siteUrl}/mentions-legales`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SEO_CONFIG.siteUrl}/politique-confidentialite`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SEO_CONFIG.siteUrl}/cgv`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },

    // Service-specific URLs (if you have individual service pages in the future)
    // Uncomment and add more as needed
    /*
    {
      url: `${SEO_CONFIG.siteUrl}/services/developpement-web`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SEO_CONFIG.siteUrl}/services/applications-mobiles`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SEO_CONFIG.siteUrl}/services/logiciels-metier`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    */
  ];
}
