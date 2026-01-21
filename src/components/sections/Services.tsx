'use client';

import { motion } from 'framer-motion';
import { Globe, Smartphone, Layers, Server, Database, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const services = [
  {
    id: 'web',
    title: 'Sites Web Sur Mesure',
    description: 'Transformez votre presence en ligne avec des sites modernes, rapides et optimises SEO. De la vitrine elegante au e-commerce performant, chaque pixel est concu pour convertir vos visiteurs en clients.',
    icon: Globe,
    features: ['Sites vitrines haute conversion', 'E-commerce & paiement securise', 'Applications web interactives', 'PWA ultra-rapides'],
    gradient: 'from-violet-500 to-purple-600',
    featured: true,
    stats: '+300% de conversions en moyenne',
    cta: 'Creer mon site',
  },
  {
    id: 'mobile',
    title: 'Applications Mobiles',
    description: 'Placez votre entreprise dans la poche de vos clients. Applications natives iOS/Android ou cross-platform alliant performance, design intuitif et experience utilisateur exceptionnelle.',
    icon: Smartphone,
    features: ['iOS & Android natif', 'React Native / Flutter', 'UI/UX mobile-first', 'Notifications push'],
    gradient: 'from-emerald-500 to-teal-600',
    stats: '4.8/5 note moyenne apps',
    cta: 'Lancer mon app',
  },
  {
    id: 'software',
    title: 'Logiciels Metier',
    description: 'Automatisez vos processus et gagnez en productivite avec des outils sur mesure. ERP, CRM, tableaux de bord - vos workflows optimises pour votre metier specifique.',
    icon: Layers,
    features: ['ERP personnalise', 'CRM intelligent', 'Workflows automatises', 'Analytics temps reel'],
    gradient: 'from-blue-500 to-cyan-600',
    featured: true,
    stats: '-40% temps administratif',
    cta: 'Optimiser mes processus',
  },
  {
    id: 'api',
    title: 'APIs & Backend',
    description: 'Infrastructure backend robuste et scalable. APIs REST/GraphQL securisees, microservices, integration tierces - la fondation technique de votre succes digital.',
    icon: Server,
    features: ['REST & GraphQL', 'Architecture microservices', 'Integrations tierces', 'Temps reel & WebSockets'],
    gradient: 'from-orange-500 to-amber-600',
    stats: '99.9% uptime garanti',
    cta: 'Architecturer mon backend',
  },
  {
    id: 'database',
    title: 'Architecture Data',
    description: 'Vos donnees sont votre tresor. Conception de bases optimisees, migrations securisees et strategies de cache pour des performances exceptionnelles a grande echelle.',
    icon: Database,
    features: ['PostgreSQL / MongoDB', 'Redis & caching avance', 'Migration zero downtime', 'Backup & securite'],
    gradient: 'from-pink-500 to-rose-600',
    stats: '10x plus rapide apres optimisation',
    cta: 'Optimiser mes donnees',
  },
  {
    id: 'consulting',
    title: 'Conseil & Audit',
    description: 'Beneficiez d\'un regard expert sur votre stack technique. Audit de code, revue d\'architecture, formation equipe - accelerez votre montee en competences.',
    icon: Cpu,
    features: ['Audit code approfondi', 'Revue architecture', 'Formation sur mesure', 'Accompagnement agile'],
    gradient: 'from-indigo-500 to-violet-600',
    stats: '+60% productivite equipe',
    cta: 'Planifier un audit',
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`group relative ${service.featured ? 'sm:col-span-2 md:col-span-2 lg:col-span-1 lg:row-span-2' : ''}`}
    >
      <div
        className={`relative h-full ${service.featured ? 'p-6 sm:p-8 md:p-10 lg:p-12' : 'p-5 sm:p-6 md:p-8'} rounded-3xl bg-dark-900 border border-dark-800 group-hover:border-violet-500/50 transition-all duration-300`}
      >
        {/* Icon */}
        <div
          className={`${service.featured ? 'w-16 h-16 mb-8' : 'w-14 h-14 mb-6'} rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}
        >
          <service.icon className={`${service.featured ? 'w-8 h-8' : 'w-6 h-6'} text-white`} />
        </div>

        {/* Stats Badge */}
        {service.stats && (
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 ${service.featured ? 'mb-6' : 'mb-4'}`}
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400">{service.stats}</span>
          </div>
        )}

        {/* Content */}
        <h3
          className={`${service.featured ? 'text-2xl lg:text-3xl' : 'text-xl'} font-bold text-white mb-3 group-hover:text-violet-300 transition-colors duration-300`}
        >
          {service.title}
        </h3>
        <p className={`text-dark-400 leading-relaxed ${service.featured ? 'text-base mb-8' : 'text-sm mb-6'}`}>
          {service.description}
        </p>

        {/* Features */}
        <div className={`space-y-3 ${service.featured ? 'mb-8' : 'mb-6'}`}>
          {service.features.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <CheckCircle2 className={`${service.featured ? 'w-5 h-5' : 'w-4 h-4'} text-emerald-400 flex-shrink-0`} />
              <span className={`${service.featured ? 'text-base' : 'text-sm'} text-dark-300`}>
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          className={`inline-flex items-center gap-2 ${service.featured ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'} font-semibold rounded-xl bg-violet-500/10 border border-violet-500/30 text-white hover:bg-violet-500/20 hover:border-violet-500/50 transition-all duration-300`}
        >
          <span>{service.cta || 'En savoir plus'}</span>
          <ArrowUpRight className={`${service.featured ? 'w-5 h-5' : 'w-4 h-4'} text-violet-400`} />
        </a>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4"
          >
            Expertise & Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            Des solutions{' '}
            <span className="gradient-text">sur mesure</span>
            <br />qui propulsent votre business
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-dark-300 leading-relaxed"
          >
            Du site vitrine performant à l&apos;application métier complexe,
            nous transformons vos idées en solutions digitales qui font la différence.
            <span className="text-white font-medium"> Code propre, design moderne, resultats mesurables.</span>
          </motion.p>
        </div>

        {/* Bento Grid - Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-flow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
}
