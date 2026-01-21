import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import { LoadingProvider } from "@/context/LoadingContext";
import CustomCursor from "@/components/effects/CustomCursor";
import SmoothScroll from "@/components/effects/SmoothScroll";
import StructuredData from "./schema";
import { generateSEOMetadata, SEO_CONFIG, getAllKeywords } from "@/lib/seo";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Advanced SEO Metadata optimized for French market - "développeur freelance Île-de-France"
export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    keywords: getAllKeywords(),
    canonical: SEO_CONFIG.siteUrl,
  }),
  title: {
    default: SEO_CONFIG.defaultTitle,
    template: SEO_CONFIG.titleTemplate,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Structured Data for SEO */}
        <StructuredData />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-dark-950 text-dark-50 font-sans`}
      >
        {/* Skip link for keyboard navigation - accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-violet-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-dark-950"
        >
          Aller au contenu principal
        </a>
        <LoadingProvider>
          <Preloader />
          <CustomCursor />
          <SmoothScroll>
            <div className="noise-overlay">
              <Header />
              <main id="main-content" role="main" tabIndex={-1}>{children}</main>
              <Footer />
            </div>
          </SmoothScroll>
        </LoadingProvider>
      </body>
    </html>
  );
}
