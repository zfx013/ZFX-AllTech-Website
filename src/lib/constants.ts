import { Code, Smartphone, Server, Database, Globe, Cpu, Layers, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ============================================
// SITE CONFIGURATION
// ============================================

export const siteConfig = {
  name: 'ZFX AllTech',
  description: 'Développeur Fullstack Freelance - Sites web, applications, APIs sur mesure',
  url: 'https://zfx-alltech.fr',
  ogImage: '/og-image.png',
  links: {
    github: 'https://github.com/zfx013',
    linkedin: 'https://linkedin.com/in/zfx-alltech',
  },
  contact: {
    email: 'contact@zfx-alltech.fr',
    phone: '07 82 25 10 99',
    location: 'Île-de-France, France',
  },
  creator: 'ZFX AllTech',
} as const;

export const company = {
  name: 'ZFX AllTech',
  legalName: 'ZFX AllTech SASU',
  tagline: 'Développeur Fullstack & Architecte Solutions',
  description: 'Développement web et logiciels sur mesure. Sites, applications, APIs - Je transforme vos idées en solutions digitales performantes.',
  founder: 'ZFX',
  email: 'contact@zfx-alltech.fr',
  phone: '07 82 25 10 99',
  location: 'Île-de-France, France',
  socials: {
    github: 'https://github.com/zfx013',
    linkedin: 'https://linkedin.com/in/zfx-alltech',
  }
} as const;

// ============================================
// TYPES
// ============================================

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export interface Tech {
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'database' | 'devops' | 'tools';
  level: number; // 1-5
}

export interface NavigationItem {
  name: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// ============================================
// NAVIGATION
// ============================================

export const navigation: NavigationItem[] = [
  { name: 'Services', href: '#services' },
  { name: 'Technologies', href: '#technologies' },
  { name: 'À propos', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

// ============================================
// SERVICES
// ============================================

export const services: Service[] = [
  {
    id: 'web',
    title: 'Sites Web Sur Mesure',
    description: 'Sites vitrines, e-commerce, applications web - des solutions performantes et modernes.',
    icon: Globe,
    features: ['Sites vitrines & landing pages', 'E-commerce & marketplaces', 'Applications web complexes', 'PWA & sites responsives'],
  },
  {
    id: 'mobile',
    title: 'Applications Mobiles',
    description: 'Apps iOS et Android natives ou cross-platform avec React Native et Flutter.',
    icon: Smartphone,
    features: ['Apps iOS natives', 'Apps Android natives', 'React Native cross-platform', 'Flutter & Dart'],
  },
  {
    id: 'software',
    title: 'Logiciels Métier',
    description: 'ERP, CRM, outils de gestion - des logiciels adaptés à vos processus.',
    icon: Layers,
    features: ['ERP sur mesure', 'CRM personnalisés', 'Outils de gestion', 'Automatisation workflows'],
  },
  {
    id: 'api',
    title: 'APIs & Intégrations',
    description: 'APIs REST/GraphQL robustes et intégrations tierces pour connecter vos systèmes.',
    icon: Server,
    features: ['APIs REST & GraphQL', 'Microservices', 'Intégrations tierces', 'Webhooks & temps réel'],
  },
  {
    id: 'database',
    title: 'Architecture Data',
    description: 'Conception de bases de données performantes et migration de systèmes legacy.',
    icon: Database,
    features: ['PostgreSQL & MySQL', 'MongoDB & NoSQL', 'Redis & caching', 'Migrations & optimisation'],
  },
  {
    id: 'consulting',
    title: 'Conseil Technique',
    description: 'Audit de code, choix technologiques et accompagnement de vos équipes.',
    icon: Cpu,
    features: ['Audit de code', 'Architecture solutions', 'Choix technologiques', 'Formation équipes'],
  },
];

// ============================================
// TECHNOLOGIES
// ============================================

export const technologies: Tech[] = [
  // Frontend
  { name: 'React', category: 'frontend', level: 5 },
  { name: 'Next.js', category: 'frontend', level: 5 },
  { name: 'TypeScript', category: 'frontend', level: 5 },
  { name: 'Vue.js', category: 'frontend', level: 4 },
  { name: 'Tailwind CSS', category: 'frontend', level: 5 },
  { name: 'Framer Motion', category: 'frontend', level: 4 },

  // Backend
  { name: 'Node.js', category: 'backend', level: 5 },
  { name: 'Python', category: 'backend', level: 4 },
  { name: 'Express', category: 'backend', level: 5 },
  { name: 'NestJS', category: 'backend', level: 4 },
  { name: 'FastAPI', category: 'backend', level: 4 },
  { name: 'GraphQL', category: 'backend', level: 4 },

  // Mobile
  { name: 'React Native', category: 'mobile', level: 4 },
  { name: 'Flutter', category: 'mobile', level: 3 },

  // Database
  { name: 'PostgreSQL', category: 'database', level: 5 },
  { name: 'MongoDB', category: 'database', level: 4 },
  { name: 'Redis', category: 'database', level: 4 },
  { name: 'Prisma', category: 'database', level: 5 },

  // DevOps
  { name: 'Docker', category: 'devops', level: 4 },
  { name: 'AWS', category: 'devops', level: 4 },
  { name: 'Vercel', category: 'devops', level: 5 },
  { name: 'CI/CD', category: 'devops', level: 4 },

  // Tools
  { name: 'Git', category: 'tools', level: 5 },
  { name: 'Figma', category: 'tools', level: 4 },
];

// ============================================
// STATISTICS
// ============================================

export const stats: Stat[] = [
  { value: '5+', label: 'Années d\'expérience' },
  { value: '50+', label: 'Projets livrés' },
  { value: '100%', label: 'Code sur mesure' },
  { value: '24/7', label: 'Support disponible' },
];

// ============================================
// TESTIMONIALS
// ============================================

export const testimonials = [
  {
    id: 1,
    name: 'Marie Dubois',
    role: 'CEO, TechStart',
    content: 'Excellent travail sur notre application web. ZFX a su comprendre nos besoins et livrer une solution performante dans les délais.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Pierre Martin',
    role: 'Fondateur, E-Shop Plus',
    content: 'Très professionnel et réactif. Notre site e-commerce a dépassé nos attentes en termes de performance et d\'UX.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sophie Bernard',
    role: 'CTO, DataFlow',
    content: 'Expertise technique solide et conseil pertinent. L\'architecture proposée a permis de scaler notre application sans problème.',
    rating: 5,
  },
];

// ============================================
// FAQ
// ============================================

export const faqs: FAQ[] = [
  {
    question: 'Quels sont vos délais de livraison ?',
    answer: 'Les délais varient selon la complexité du projet. Un site vitrine prend généralement 2-4 semaines, une application web 1-3 mois. Je fournis toujours un planning détaillé après analyse de vos besoins.',
  },
  {
    question: 'Proposez-vous de la maintenance ?',
    answer: 'Oui, je propose des contrats de maintenance et support adaptés à vos besoins : corrections de bugs, mises à jour de sécurité, évolutions fonctionnelles.',
  },
  {
    question: 'Travaillez-vous avec des frameworks spécifiques ?',
    answer: 'Je maîtrise plusieurs stacks technologiques (React/Next.js, Vue, Node.js, Python...) et je choisis les outils les plus adaptés à chaque projet selon vos contraintes et objectifs.',
  },
  {
    question: 'Quel est votre processus de développement ?',
    answer: 'Je suis une méthodologie agile : définition des besoins, maquettes/wireframes, développement itératif avec démos régulières, tests, déploiement et formation.',
  },
  {
    question: 'Fournissez-vous le code source ?',
    answer: 'Absolument. Vous êtes propriétaire de 100% du code source développé. Je livre également la documentation technique complète.',
  },
  {
    question: 'Acceptez-vous les projets à budget fixe ?',
    answer: 'Oui, je travaille en forfait (budget fixe) ou en régie (facturation au temps passé) selon la nature du projet et vos préférences.',
  },
];

// ============================================
// PROCESS STEPS
// ============================================

export const processSteps = [
  {
    number: 1,
    title: 'Analyse',
    description: 'Compréhension de vos besoins, objectifs et contraintes techniques.',
  },
  {
    number: 2,
    title: 'Conception',
    description: 'Design UX/UI, architecture technique et choix des technologies.',
  },
  {
    number: 3,
    title: 'Développement',
    description: 'Développement itératif avec démos régulières et feedback continu.',
  },
  {
    number: 4,
    title: 'Tests',
    description: 'Tests unitaires, d\'intégration et UAT pour garantir la qualité.',
  },
  {
    number: 5,
    title: 'Déploiement',
    description: 'Mise en production, formation et transfert de connaissances.',
  },
  {
    number: 6,
    title: 'Support',
    description: 'Maintenance, support technique et évolutions futures.',
  },
];

// ============================================
// TECH CATEGORIES
// ============================================

export const techCategories = [
  { id: 'all', label: 'Toutes' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'database', label: 'Database' },
  { id: 'devops', label: 'DevOps' },
  { id: 'tools', label: 'Outils' },
] as const;

// ============================================
// FOOTER LINKS
// ============================================

export const footerLinks = {
  services: [
    { name: 'Développement Web', href: '#services' },
    { name: 'Applications Mobiles', href: '#services' },
    { name: 'APIs & Backend', href: '#services' },
    { name: 'Conseil Technique', href: '#services' },
  ],
  company: [
    { name: 'À propos', href: '#about' },
    { name: 'Technologies', href: '#technologies' },
    { name: 'Contact', href: '#contact' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'Politique de confidentialité', href: '/politique-confidentialite' },
    { name: 'CGV', href: '/cgv' },
  ],
};
