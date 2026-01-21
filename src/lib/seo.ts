/**
 * SEO Configuration and Utilities for ZFX AllTech
 * Optimized for French market - "développeur freelance Île-de-France"
 */

import { Metadata } from 'next';

// ===========================
// SEO Constants
// ===========================

export const SEO_CONFIG = {
  siteName: 'ZFX AllTech',
  siteUrl: 'https://zfx-alltech.fr',
  defaultTitle: 'ZFX AllTech | Développeur Fullstack Freelance Île-de-France',
  titleTemplate: '%s | ZFX AllTech',
  defaultDescription:
    'Développeur web freelance spécialisé en React, Next.js et Node.js. Solutions fullstack sur mesure pour startups et PME en Île-de-France. Sites web, applications, APIs et logiciels métier.',
  locale: 'fr_FR',
  language: 'fr',
  author: {
    name: 'ZFX',
    url: 'https://zfx-alltech.fr',
    email: 'contact@zfx-alltech.fr',
  },
  social: {
    github: 'https://github.com/zfx013',
    linkedin: 'https://linkedin.com/in/zfx-alltech',
  },
  location: {
    city: 'Île-de-France',
    country: 'France',
    postalCode: '75000',
    serviceArea: 'Île-de-France',
  },
} as const;

// ===========================
// SEO Keywords
// ===========================

export const SEO_KEYWORDS = {
  primary: [
    'développeur fullstack freelance',
    'développeur web freelance',
    'développeur freelance Île-de-France',
    'freelance React Next.js',
    'développeur Node.js freelance',
  ],
  secondary: [
    'développement web sur mesure',
    'création site web React',
    'application web Next.js',
    'développeur TypeScript',
    'freelance JavaScript',
    'développement API REST',
    'développeur fullstack France',
    'solutions web PME',
    'développement logiciel métier',
    'consultant technique web',
  ],
  technologies: [
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
    'JavaScript',
    'Tailwind CSS',
    'PostgreSQL',
    'MongoDB',
    'GraphQL',
    'REST API',
    'Docker',
    'AWS',
    'Vercel',
  ],
  services: [
    'développement site web',
    'application mobile React Native',
    'création API',
    'développement ERP',
    'développement CRM',
    'intégration système',
    'audit code',
    'conseil technique',
    'architecture logicielle',
  ],
} as const;

// ===========================
// Open Graph Configuration
// ===========================

export const OG_CONFIG = {
  type: 'website' as const,
  locale: SEO_CONFIG.locale,
  siteName: SEO_CONFIG.siteName,
  image: {
    url: '/og-image.png',
    width: 1200,
    height: 630,
    alt: 'ZFX AllTech - Développeur Fullstack Freelance',
    type: 'image/png',
  },
} as const;

// ===========================
// Twitter Card Configuration
// ===========================

export const TWITTER_CONFIG = {
  card: 'summary_large_image' as const,
  site: '@zfxalltech',
  creator: '@zfxalltech',
} as const;

// ===========================
// Robots Configuration
// ===========================

export const ROBOTS_CONFIG = {
  index: true,
  follow: true,
  nocache: false,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large' as const,
    'max-snippet': -1,
  },
} as const;

// ===========================
// Structured Data Templates
// ===========================

export const SCHEMA_ORG = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SEO_CONFIG.siteUrl}/#organization`,
    name: SEO_CONFIG.siteName,
    legalName: 'ZFX AllTech SASU',
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/logo.png`,
    foundingDate: '2019',
    founders: [
      {
        '@type': 'Person',
        name: 'ZFX',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: SEO_CONFIG.location.city,
      addressCountry: SEO_CONFIG.location.country,
      postalCode: SEO_CONFIG.location.postalCode,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Service client',
      email: SEO_CONFIG.author.email,
      availableLanguage: ['French'],
    },
    sameAs: [
      SEO_CONFIG.social.github,
      SEO_CONFIG.social.linkedin,
    ],
  },

  professionalService: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SEO_CONFIG.siteUrl}/#service`,
    name: SEO_CONFIG.siteName,
    image: `${SEO_CONFIG.siteUrl}/og-image.png`,
    url: SEO_CONFIG.siteUrl,
    telephone: '0782251099',
    email: SEO_CONFIG.author.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SEO_CONFIG.location.city,
      addressCountry: SEO_CONFIG.location.country,
    },
    geo: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 48.8566,
        longitude: 2.3522,
      },
      geoRadius: '50000', // 50km radius
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 48.8566,
        longitude: 2.3522,
      },
      geoRadius: '50000',
    },
    priceRange: '€€',
    serviceType: [
      'Développement Web',
      'Développement Logiciel',
      'Développement API',
      'Conseil Technique',
    ],
  },

  person: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SEO_CONFIG.siteUrl}/#person`,
    name: 'ZFX',
    jobTitle: 'Développeur Fullstack Freelance',
    url: SEO_CONFIG.siteUrl,
    image: `${SEO_CONFIG.siteUrl}/profile.jpg`,
    email: SEO_CONFIG.author.email,
    telephone: '0782251099',
    address: {
      '@type': 'PostalAddress',
      addressLocality: SEO_CONFIG.location.city,
      addressCountry: SEO_CONFIG.location.country,
    },
    knowsAbout: [
      'Développement Web',
      'React',
      'Next.js',
      'Node.js',
      'TypeScript',
      'Architecture Logicielle',
      'API REST',
      'GraphQL',
    ],
    worksFor: {
      '@id': `${SEO_CONFIG.siteUrl}/#organization`,
    },
    sameAs: [
      SEO_CONFIG.social.github,
      SEO_CONFIG.social.linkedin,
    ],
  },

  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SEO_CONFIG.siteUrl}/#localbusiness`,
    name: SEO_CONFIG.siteName,
    description: SEO_CONFIG.defaultDescription,
    url: SEO_CONFIG.siteUrl,
    telephone: '0782251099',
    email: SEO_CONFIG.author.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SEO_CONFIG.location.city,
      addressRegion: 'Île-de-France',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.8566,
      longitude: 2.3522,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Paris',
      },
      {
        '@type': 'State',
        name: 'Île-de-France',
      },
    ],
    priceRange: '€€',
    openingHours: 'Mo-Fr 09:00-18:00',
  },

  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SEO_CONFIG.siteUrl}/#website`,
    url: SEO_CONFIG.siteUrl,
    name: SEO_CONFIG.siteName,
    description: SEO_CONFIG.defaultDescription,
    publisher: {
      '@id': `${SEO_CONFIG.siteUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO_CONFIG.siteUrl}/?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'fr-FR',
  },

  breadcrumbList: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SEO_CONFIG.siteUrl}/#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: SEO_CONFIG.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${SEO_CONFIG.siteUrl}/#services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Technologies',
        item: `${SEO_CONFIG.siteUrl}/#technologies`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'À propos',
        item: `${SEO_CONFIG.siteUrl}/#about`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Contact',
        item: `${SEO_CONFIG.siteUrl}/#contact`,
      },
    ],
  },
} as const;

// ===========================
// Utility Functions
// ===========================

/**
 * Generate page metadata with SEO optimization
 */
export function generateSEOMetadata({
  title,
  description,
  keywords,
  canonical,
  noindex = false,
  ogImage,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  noindex?: boolean;
  ogImage?: string;
}): Metadata {
  const pageTitle = title || SEO_CONFIG.defaultTitle;
  const pageDescription = description || SEO_CONFIG.defaultDescription;
  const allKeywords = [
    ...SEO_KEYWORDS.primary,
    ...SEO_KEYWORDS.secondary,
    ...(keywords || []),
  ];
  const imageUrl = ogImage || OG_CONFIG.image.url;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: allKeywords,
    authors: [{ name: SEO_CONFIG.author.name, url: SEO_CONFIG.author.url }],
    creator: SEO_CONFIG.author.name,
    publisher: SEO_CONFIG.siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    alternates: {
      canonical: canonical || SEO_CONFIG.siteUrl,
      languages: {
        'fr-FR': SEO_CONFIG.siteUrl,
      },
    },
    robots: noindex ? {
      index: false,
      follow: false,
    } : ROBOTS_CONFIG,
    openGraph: {
      type: OG_CONFIG.type,
      locale: OG_CONFIG.locale,
      url: canonical || SEO_CONFIG.siteUrl,
      siteName: OG_CONFIG.siteName,
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: imageUrl,
          width: OG_CONFIG.image.width,
          height: OG_CONFIG.image.height,
          alt: OG_CONFIG.image.alt,
          type: OG_CONFIG.image.type,
        },
      ],
    },
    twitter: {
      card: TWITTER_CONFIG.card,
      site: TWITTER_CONFIG.site,
      creator: TWITTER_CONFIG.creator,
      title: pageTitle,
      description: pageDescription,
      images: [imageUrl],
    },
    verification: {
      google: 'your-google-site-verification',
      // Add other verification codes here
    },
  };
}

/**
 * Generate all keywords as comma-separated string
 */
export function getAllKeywords(): string[] {
  return [
    ...SEO_KEYWORDS.primary,
    ...SEO_KEYWORDS.secondary,
    ...SEO_KEYWORDS.technologies,
    ...SEO_KEYWORDS.services,
  ];
}

/**
 * Get structured data for a specific type
 */
export function getStructuredData(type: keyof typeof SCHEMA_ORG) {
  return SCHEMA_ORG[type];
}

/**
 * Combine multiple structured data schemas
 */
export function combineStructuredData(...types: (keyof typeof SCHEMA_ORG)[]) {
  return types.map(type => SCHEMA_ORG[type]);
}
