export interface SectionConfig {
  id: string;
  label: string;
  primaryVar: string;
  secondaryVar: string;
}

export const SECTIONS = [
  { id: "hero", label: "Accueil", primaryVar: "--hero-primary", secondaryVar: "--hero-secondary" },
  { id: "services", label: "Services", primaryVar: "--services-primary", secondaryVar: "--services-secondary" },
  { id: "process", label: "Processus", primaryVar: "--process-primary", secondaryVar: "--process-secondary" },
  { id: "technologies", label: "Technologies", primaryVar: "--tech-primary", secondaryVar: "--tech-secondary" },
  { id: "portfolio", label: "Portfolio", primaryVar: "--portfolio-primary", secondaryVar: "--portfolio-secondary" },
  { id: "about", label: "\u00C0 propos", primaryVar: "--about-primary", secondaryVar: "--about-secondary" },
  { id: "contact", label: "Contact", primaryVar: "--contact-primary", secondaryVar: "--contact-secondary" },
] as const satisfies readonly SectionConfig[];

export type SectionId = (typeof SECTIONS)[number]["id"];

/** Hex color fallbacks for each section (mirror CSS custom properties) */
export const SECTION_COLORS: Record<SectionId, { primary: string; secondary: string }> = {
  hero: { primary: "#00FFE0", secondary: "#0066FF" },
  services: { primary: "#8B5CF6", secondary: "#D946EF" },
  process: { primary: "#10B981", secondary: "#14B8A6" },
  technologies: { primary: "#F59E0B", secondary: "#F97316" },
  portfolio: { primary: "#F43F5E", secondary: "#EC4899" },
  about: { primary: "#94A3B8", secondary: "#ffffff" },
  contact: { primary: "#6366F1", secondary: "#A855F7" },
};

export const SITE_CONFIG = {
  name: "ZFX AllTech",
  url: "https://zfx-alltech.fr",
  email: "ZFX.AllTech@outlook.fr",
  description:
    "Solutions digitales sur mesure - Développement web, applications mobiles, logiciels métier, IA et automatisations.",
  socials: {
    github: "https://github.com/zfx-alltech",
    linkedin: "https://linkedin.com/company/zfx-alltech",
    twitter: "https://twitter.com/zfxalltech",
  },
} as const;

export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.8,
    section: 1.2,
  },
  easing: {
    smooth: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
    bounce: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
    decelerate: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number],
    accelerate: [0.4, 0.0, 1.0, 1.0] as [number, number, number, number],
    sharp: [0.4, 0.0, 0.6, 1.0] as [number, number, number, number],
  },
  spring: {
    gentle: { stiffness: 120, damping: 14, mass: 1 },
    snappy: { stiffness: 300, damping: 30, mass: 1 },
    wobbly: { stiffness: 180, damping: 12, mass: 1 },
    cursor: { stiffness: 500, damping: 28, mass: 0.5 },
  },
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
} as const;

export const HEADER_HEIGHT = 0;
