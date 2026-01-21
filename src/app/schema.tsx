/**
 * JSON-LD Structured Data Component for ZFX AllTech
 * Implements Schema.org markup for enhanced SEO
 */

import { combineStructuredData, SCHEMA_ORG } from '@/lib/seo';

/**
 * Main Schema Component - Renders all structured data as JSON-LD
 * This should be included in the root layout
 */
export default function StructuredData() {
  // Combine all relevant schemas for the homepage
  const allSchemas = combineStructuredData(
    'organization',
    'professionalService',
    'person',
    'localBusiness',
    'website',
    'breadcrumbList'
  );

  return (
    <>
      {allSchemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}

/**
 * Organization Schema Component
 * For use on about/company pages
 */
export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(SCHEMA_ORG.organization),
      }}
    />
  );
}

/**
 * Professional Service Schema Component
 * For use on services pages
 */
export function ProfessionalServiceSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(SCHEMA_ORG.professionalService),
      }}
    />
  );
}

/**
 * Person Schema Component
 * For use on personal/portfolio pages
 */
export function PersonSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(SCHEMA_ORG.person),
      }}
    />
  );
}

/**
 * Local Business Schema Component
 * For use on contact/location pages
 */
export function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(SCHEMA_ORG.localBusiness),
      }}
    />
  );
}

/**
 * Website Schema Component
 * For use on the homepage
 */
export function WebSiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(SCHEMA_ORG.website),
      }}
    />
  );
}

/**
 * Breadcrumb Schema Component
 * For use on navigation pages
 */
export function BreadcrumbSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(SCHEMA_ORG.breadcrumbList),
      }}
    />
  );
}

/**
 * FAQ Schema Generator
 * Use this to create FAQ structured data for specific pages
 */
export function FAQSchema({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema),
      }}
    />
  );
}

/**
 * Service Schema Generator
 * Use this to create service structured data for individual services
 */
export function ServiceSchema({
  name,
  description,
  url,
  image,
  provider,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
  provider?: string;
}) {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    image: image || 'https://zfx-alltech.fr/og-image.png',
    provider: {
      '@type': 'Organization',
      name: provider || 'ZFX AllTech',
    },
    areaServed: {
      '@type': 'Country',
      name: 'France',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceSchema),
      }}
    />
  );
}

/**
 * Article Schema Generator
 * Use this for blog posts or articles
 */
export function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
}: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author || 'ZFX',
      url: 'https://zfx-alltech.fr',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ZFX AllTech',
      logo: {
        '@type': 'ImageObject',
        url: 'https://zfx-alltech.fr/logo.png',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(articleSchema),
      }}
    />
  );
}

/**
 * Product Schema Generator
 * Use this for software/product pages
 */
export function ProductSchema({
  name,
  description,
  image,
  offers,
}: {
  name: string;
  description: string;
  image: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
  };
}) {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    brand: {
      '@type': 'Organization',
      name: 'ZFX AllTech',
    },
    ...(offers && {
      offers: {
        '@type': 'Offer',
        price: offers.price,
        priceCurrency: offers.priceCurrency,
        availability: `https://schema.org/${offers.availability}`,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(productSchema),
      }}
    />
  );
}

/**
 * HowTo Schema Generator
 * Use this for tutorial/guide pages
 */
export function HowToSchema({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string; url?: string; image?: string }>;
}) {
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url,
      image: step.image,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(howToSchema),
      }}
    />
  );
}

/**
 * Review Schema Generator
 * Use this for testimonials/reviews pages
 */
export function ReviewSchema({
  itemReviewed,
  reviews,
}: {
  itemReviewed: {
    name: string;
    type: string;
  };
  reviews: Array<{
    author: string;
    datePublished: string;
    reviewBody: string;
    reviewRating: number;
  }>;
}) {
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': itemReviewed.type,
    name: itemReviewed.name,
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      datePublished: review.datePublished,
      reviewBody: review.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.reviewRating,
        bestRating: 5,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(reviewSchema),
      }}
    />
  );
}
