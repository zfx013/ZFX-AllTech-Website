import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zfx-alltech.fr"),
  title: {
    default: "ZFX AllTech | Solutions Digitales Sur Mesure",
    template: "%s | ZFX AllTech",
  },
  description:
    "ZFX AllTech - Votre partenaire pour le développement web, applications mobiles, logiciels métier et solutions digitales sur mesure. Expertise full-stack pour transformer vos idées en réalité.",
  keywords: [
    "développement web",
    "application mobile",
    "logiciel sur mesure",
    "full-stack",
    "digital",
    "France",
    "site internet",
    "e-commerce",
    "application web",
    "développeur",
    "agence web",
    "création site web",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "ZFX AllTech", url: "https://zfx-alltech.fr" }],
  creator: "ZFX AllTech",
  publisher: "ZFX AllTech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://zfx-alltech.fr",
    siteName: "ZFX AllTech",
    title: "ZFX AllTech | Solutions Digitales Sur Mesure",
    description:
      "Votre partenaire pour le développement web, applications mobiles et solutions digitales sur mesure. Expertise full-stack de A à Z.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ZFX AllTech - Solutions Digitales Sur Mesure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZFX AllTech | Solutions Digitales Sur Mesure",
    description:
      "Votre partenaire pour le développement web, applications mobiles et solutions digitales sur mesure.",
    images: ["/og-image.svg"],
    creator: "@zfxalltech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://zfx-alltech.fr",
  },
  other: {
    "geo.region": "FR",
    "geo.placename": "France",
  },
};

// Schema.org JSON-LD
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://zfx-alltech.fr/#organization",
      name: "ZFX AllTech",
      url: "https://zfx-alltech.fr",
      logo: {
        "@type": "ImageObject",
        url: "https://zfx-alltech.fr/logo.svg",
        width: 512,
        height: 512,
      },
      description:
        "Entreprise de développement informatique et solutions digitales sur mesure",
      email: "ZFX.AllTech@outlook.fr",
      foundingDate: "2024",
      areaServed: {
        "@type": "Country",
        name: "France",
      },
      sameAs: [
        "https://github.com/zfx-alltech",
        "https://linkedin.com/company/zfx-alltech",
        "https://twitter.com/zfxalltech",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://zfx-alltech.fr/#localbusiness",
      name: "ZFX AllTech",
      image: "https://zfx-alltech.fr/og-image.svg",
      url: "https://zfx-alltech.fr",
      telephone: "",
      email: "ZFX.AllTech@outlook.fr",
      address: {
        "@type": "PostalAddress",
        addressCountry: "FR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 46.603354,
        longitude: 1.888334,
      },
      priceRange: "$$",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://zfx-alltech.fr/#service",
      name: "ZFX AllTech - Services de développement",
      provider: {
        "@id": "https://zfx-alltech.fr/#organization",
      },
      areaServed: {
        "@type": "Country",
        name: "France",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services de développement",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Développement de sites web",
              description:
                "Création de sites vitrines, institutionnels et landing pages",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "E-Commerce",
              description:
                "Développement de boutiques en ligne performantes et sécurisées",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Applications mobiles",
              description:
                "Développement d'applications iOS et Android natives ou cross-platform",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Applications web",
              description:
                "Création de dashboards, portails et outils internes",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Logiciels métier",
              description:
                "Développement de solutions sur mesure pour automatiser vos processus",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "APIs et intégrations",
              description:
                "Développement d'APIs et intégration avec vos outils existants",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://zfx-alltech.fr/#website",
      url: "https://zfx-alltech.fr",
      name: "ZFX AllTech",
      description: "Solutions digitales sur mesure",
      publisher: {
        "@id": "https://zfx-alltech.fr/#organization",
      },
      inLanguage: "fr-FR",
    },
    {
      "@type": "FAQPage",
      "@id": "https://zfx-alltech.fr/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Quels services propose ZFX AllTech ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ZFX AllTech propose des services de développement web (sites vitrines, e-commerce), d'applications mobiles (iOS/Android), de logiciels métier sur mesure, d'APIs et intégrations, d'automatisation et de data/analytics.",
          },
        },
        {
          "@type": "Question",
          name: "Dans quelle zone géographique intervenez-vous ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ZFX AllTech intervient sur l'ensemble du territoire français. Nous travaillons également avec des clients à l'international en mode remote.",
          },
        },
        {
          "@type": "Question",
          name: "Quel est le délai de réponse pour une demande de devis ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nous nous engageons à répondre à toute demande de devis sous 24 heures ouvrées maximum.",
          },
        },
        {
          "@type": "Question",
          name: "Quelles technologies utilisez-vous ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nous utilisons les technologies les plus modernes : React, Next.js, Vue.js, TypeScript pour le frontend, Node.js, Python, PHP pour le backend, React Native et Flutter pour le mobile, PostgreSQL, MongoDB pour les bases de données, et Docker, AWS, Vercel pour le déploiement.",
          },
        },
        {
          "@type": "Question",
          name: "Proposez-vous un suivi après la livraison ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui, nous proposons des contrats de maintenance et d'évolution pour accompagner nos clients sur le long terme après la livraison de leur projet.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://zfx-alltech.fr/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: "https://zfx-alltech.fr",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
