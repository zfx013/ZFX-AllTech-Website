'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ArrowUpRight,
  ArrowUp,
  Send,
  ExternalLink,
  Phone,
  CheckCircle
} from 'lucide-react';

const company = {
  name: 'ZFX AllTech',
  tagline: 'Innovons ensemble, Réalisons l\'impossible',
  description: 'Développement web et logiciels sur mesure. Sites, applications, APIs - Je transforme vos idées en solutions digitales performantes.',
  email: 'contact@zfx-alltech.fr',
  phone: '07 82 25 10 99',
  location: 'Île-de-France, France',
  socials: {
    github: 'https://github.com/zfx013',
    linkedin: 'https://linkedin.com/in/zfx-alltech',
  }
};

const navigation = [
  { name: 'Accueil', href: '#hero' },
  { name: 'Services', href: '#services' },
  { name: 'Technologies', href: '#technologies' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'À propos', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const services = [
  { name: 'Développement Web', href: '#services' },
  { name: 'Applications Mobiles', href: '#services' },
  { name: 'APIs & Backend', href: '#services' },
  { name: 'Consulting Tech', href: '#services' },
  { name: 'Maintenance & Support', href: '#services' },
];

const legal = [
  { name: 'Mentions légales', href: '/mentions-legales' },
  { name: 'Politique de confidentialité', href: '/politique-confidentialite' },
  { name: 'CGV', href: '/cgv' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate newsletter signup with visual feedback
      setNewsletterStatus('success');
      setEmail('');
      // Reset status after 3 seconds
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="relative bg-dark-950 overflow-hidden" role="contentinfo" aria-label="Pied de page">
      {/* Gradient Line at Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" aria-hidden="true" />

      {/* Subtle Grid Pattern Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Gradient Orbs for Visual Interest */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />

      <div className="relative container-custom py-12 sm:py-16 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8"
        >
          {/* Column 1: Logo, Tagline, Description */}
          <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 hexagon bg-gradient-to-br from-violet-600 to-emerald-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-[2px] hexagon bg-dark-950" />
                <Code2 className="relative z-10 w-6 h-6 text-violet-400" />
              </div>
              <span className="text-2xl font-bold">
                <span className="text-violet-400">ZFX</span>
                <span className="text-emerald-400"> AllTech</span>
              </span>
            </div>

            <p className="text-sm font-semibold gradient-text mb-4">
              {company.tagline}
            </p>

            <p className="text-dark-400 text-sm leading-relaxed mb-6">
              {company.description}
            </p>

            {/* Social Media Links with Hover Effects */}
            <div className="flex items-center gap-3" role="group" aria-label="Reseaux sociaux">
              <motion.a
                href={company.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group relative w-11 h-11 rounded-full bg-dark-800/50 backdrop-blur-sm border border-dark-700 flex items-center justify-center text-dark-400 transition-all overflow-hidden focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-dark-950"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-violet-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Github className="relative z-10 w-5 h-5 group-hover:text-white transition-colors" aria-hidden="true" />
              </motion.a>

              <motion.a
                href={company.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group relative w-11 h-11 rounded-full bg-dark-800/50 backdrop-blur-sm border border-dark-700 flex items-center justify-center text-dark-400 transition-all overflow-hidden focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-dark-950"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Linkedin className="relative z-10 w-5 h-5 group-hover:text-white transition-colors" aria-hidden="true" />
              </motion.a>

              <motion.a
                href={`mailto:${company.email}`}
                aria-label="Envoyer un email"
                className="group relative w-11 h-11 rounded-full bg-dark-800/50 backdrop-blur-sm border border-dark-700 flex items-center justify-center text-dark-400 transition-all overflow-hidden focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-dark-950"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Mail className="relative z-10 w-5 h-5 group-hover:text-white transition-colors" aria-hidden="true" />
              </motion.a>
            </div>
          </motion.div>

          {/* Column 2: Navigation Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-violet-500 to-emerald-500 rounded-full" />
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-dark-400 hover:text-white transition-colors inline-flex items-center gap-2 group text-sm"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-violet-500 rounded-full" />
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-dark-400 hover:text-white transition-colors inline-flex items-center gap-2 group text-sm"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact Info & Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-violet-500 to-emerald-500 rounded-full" />
              Contact
            </h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 group">
                <Mail className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                <a
                  href={`mailto:${company.email}`}
                  className="text-dark-400 hover:text-white transition-colors text-sm break-all"
                >
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <Phone className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                <a
                  href={`tel:${company.phone.replace(/\s/g, '')}`}
                  className="text-dark-400 hover:text-white transition-colors text-sm"
                >
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-dark-400 text-sm">{company.location}</span>
              </li>
              <li className="flex items-start gap-3 group">
                <Github className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                <a
                  href={company.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-400 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  github.com/zfx013
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <Linkedin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <a
                  href={company.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-400 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  linkedin.com/in/zfx-alltech
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>

            {/* Newsletter Signup */}
            <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-lg p-4">
              <h4 className="text-white font-semibold text-sm mb-2">Newsletter</h4>
              <p className="text-dark-400 text-xs mb-3">Restez informe des dernieres actualites tech</p>
              {newsletterStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-emerald-400 text-sm py-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Merci pour votre inscription !</span>
                </motion.div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="flex-1 bg-dark-800/50 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-dark-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-colors"
                    required
                    aria-label="Adresse email pour la newsletter"
                  />
                  <motion.button
                    type="submit"
                    className="bg-gradient-to-br from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white p-2 rounded-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="S'inscrire a la newsletter"
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-dark-800/50"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-dark-500">
              <p>&copy; {currentYear} {company.name}. Tous droits réservés.</p>
              <div className="hidden sm:block w-1 h-1 bg-dark-700 rounded-full" />
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-4">
                {legal.map((item, index) => (
                  <span key={item.name} className="flex items-center gap-2 sm:gap-4">
                    <a
                      href={item.href}
                      className="hover:text-white transition-colors text-xs sm:text-sm"
                    >
                      {item.name}
                    </a>
                    {index < legal.length - 1 && (
                      <span className="text-dark-700 hidden sm:inline">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Made with love */}
            <p className="text-sm text-dark-500">
              Conçu et développé avec <span className="text-red-400">❤️</span> par{' '}
              <span className="gradient-text font-semibold">{company.name}</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="group fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-violet-600 to-emerald-600 hover:from-violet-500 hover:to-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-violet-500/25 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0,
          pointerEvents: showBackToTop ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Retour en haut de la page"
      >
        <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-dark-800 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Retour en haut
          <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-dark-800 rotate-45" />
        </span>
      </motion.button>
    </footer>
  );
}
