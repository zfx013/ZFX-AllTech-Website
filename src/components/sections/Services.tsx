'use client';

import { motion } from 'framer-motion';
import { Globe, Smartphone, Layers, Server, Database, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useState, useRef, MouseEvent } from 'react';

const services = [
  {
    id: 'web',
    title: 'Sites Web Sur Mesure',
    description: 'Transformez votre présence en ligne avec des sites modernes, rapides et optimisés SEO. De la vitrine élégante au e-commerce performant.',
    icon: Globe,
    features: ['Sites vitrines haute conversion', 'E-commerce & paiement sécurisé', 'Applications web interactives', 'PWA ultra-rapides'],
    gradient: 'from-violet-500 to-purple-600',
    stats: '+300% de conversions en moyenne',
    cta: 'Créer mon site',
  },
  {
    id: 'mobile',
    title: 'Applications Mobiles',
    description: 'Placez votre entreprise dans la poche de vos clients. Applications natives iOS/Android ou cross-platform.',
    icon: Smartphone,
    features: ['iOS & Android natif', 'React Native / Flutter', 'UI/UX mobile-first', 'Notifications push'],
    gradient: 'from-emerald-500 to-teal-600',
    stats: '4.8/5 note moyenne apps',
    cta: 'Lancer mon app',
  },
  {
    id: 'software',
    title: 'Logiciels Métier',
    description: 'Automatisez vos processus et gagnez en productivité avec des outils sur mesure. ERP, CRM, tableaux de bord.',
    icon: Layers,
    features: ['ERP personnalisé', 'CRM intelligent', 'Workflows automatisés', 'Analytics temps réel'],
    gradient: 'from-blue-500 to-cyan-600',
    stats: '-40% temps administratif',
    cta: 'Optimiser mes processus',
  },
  {
    id: 'api',
    title: 'APIs & Backend',
    description: 'Infrastructure backend robuste et scalable. APIs REST/GraphQL sécurisées, microservices, intégrations tierces.',
    icon: Server,
    features: ['REST & GraphQL', 'Architecture microservices', 'Intégrations tierces', 'Temps réel & WebSockets'],
    gradient: 'from-orange-500 to-amber-600',
    stats: '99.9% uptime garanti',
    cta: 'Architecturer mon backend',
  },
  {
    id: 'database',
    title: 'Architecture Data',
    description: 'Vos données sont votre trésor. Conception de bases optimisées, migrations sécurisées et stratégies de cache.',
    icon: Database,
    features: ['PostgreSQL / MongoDB', 'Redis & caching avancé', 'Migration zero downtime', 'Backup & sécurité'],
    gradient: 'from-pink-500 to-rose-600',
    stats: '10x plus rapide après optimisation',
    cta: 'Optimiser mes données',
  },
  {
    id: 'consulting',
    title: 'Conseil & Audit',
    description: 'Bénéficiez d\'un regard expert sur votre stack technique. Audit de code, revue d\'architecture, formation équipe.',
    icon: Cpu,
    features: ['Audit code approfondi', 'Revue architecture', 'Formation sur mesure', 'Accompagnement agile'],
    gradient: 'from-indigo-500 to-violet-600',
    stats: '+60% productivité équipe',
    cta: 'Planifier un audit',
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = (e.clientX - centerX) / (rect.width / 2);
    const mouseY = (e.clientY - centerY) / (rect.height / 2);
    setRotateX(-mouseY * 6);
    setRotateY(mouseX * 6);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative"
      style={{ perspective: 1000 }}
    >
      <motion.div
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative h-full p-8 lg:p-10 rounded-3xl bg-dark-900 border border-dark-800 group-hover:border-violet-500/50 transition-colors duration-300"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Icon */}
        <motion.div
          className={`w-16 h-16 mb-8 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <service.icon className="w-8 h-8 text-white" />
        </motion.div>

        {/* Stats Badge */}
        {service.stats && (
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400">{service.stats}</span>
          </div>
        )}

        {/* Content */}
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-violet-300 transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-base text-dark-400 leading-relaxed mb-8">
          {service.description}
        </p>

        {/* Features */}
        <div className="space-y-3.5 mb-8">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-center gap-3.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-sm text-dark-300">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href="#contact"
          className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold rounded-xl bg-violet-500/10 border border-violet-500/30 text-white hover:bg-violet-500/20 hover:border-violet-500/50 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{service.cta}</span>
          <ArrowUpRight className="w-4 h-4 text-violet-400" />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-28 lg:py-36 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header - Properly centered */}
        <div className="text-center mb-20 lg:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-8"
          >
            Expertise & Services
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8"
          >
            Des solutions <span className="gradient-text">sur mesure</span>
            <br className="hidden sm:block" />
            <span className="text-dark-100">qui propulsent votre business</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg lg:text-xl text-dark-300 leading-relaxed max-w-3xl mx-auto"
          >
            Du site vitrine performant à l&apos;application métier complexe,
            nous transformons vos idées en solutions digitales qui font la différence.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg lg:text-xl text-white font-medium mt-4"
          >
            Code propre, design moderne, résultats mesurables.
          </motion.p>
        </div>

        {/* Services Grid - with proper gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
