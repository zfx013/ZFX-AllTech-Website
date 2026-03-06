import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // Google
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      // Bing
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      // AI Crawlers - Allow with restrictions
      {
        userAgent: "GPTBot",
        allow: ["/", "/llms.txt"],
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/", "/llms.txt"],
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Claude-Web",
        allow: ["/", "/llms.txt"],
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Anthropic-AI",
        allow: ["/", "/llms.txt"],
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/llms.txt"],
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Bytespider",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        allow: ["/", "/llms.txt"],
      },
    ],
    sitemap: "https://zfx-alltech.fr/sitemap.xml",
  };
}
