'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Globe, Smartphone, Layers, Server, Database, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useState, useRef, MouseEvent } from 'react';

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
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Reduced rotation angle for subtler, more premium effect
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseXPos = (e.clientX - centerX) / (rect.width / 2);
    const mouseYPos = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
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
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative ${service.featured ? 'sm:col-span-2 md:col-span-2 lg:col-span-1 lg:row-span-2' : ''}`}
    >
      {/* Animated gradient border */}
      <div className="absolute -inset-[2px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-violet-500 via-emerald-500 to-violet-500 bg-[length:200%_200%] animate-[gradient-flow_4s_linear_infinite]" />

      {/* Glow effect */}
      <div className="absolute -inset-[20px] rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl bg-gradient-to-r from-violet-500/50 to-emerald-500/50" />

      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        className={`relative h-full ${service.featured ? 'p-6 sm:p-8 md:p-10 lg:p-12' : 'p-5 sm:p-6 md:p-8'} rounded-3xl bg-dark-900/80 backdrop-blur-xl border border-dark-800 group-hover:border-violet-500/30 transition-all duration-500 overflow-hidden`}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(139, 92, 246) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          {/* Icon with animated background */}
          <motion.div
            className={`relative ${service.featured ? 'w-20 h-20 mb-8' : 'w-16 h-16 mb-6'} rounded-2xl bg-gradient-to-br ${service.gradient} p-[2px] overflow-hidden`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <div className="w-full h-full rounded-2xl bg-dark-900 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                animate={isHovered ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                } : {}}
                transition={{ duration: 0.5 }}
              >
                <service.icon className={`${service.featured ? 'w-9 h-9' : 'w-7 h-7'} text-white relative z-10`} />
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Badge */}
          {'stats' in service && service.stats && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 ${service.featured ? 'mb-6' : 'mb-4'}`}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-400">{service.stats}</span>
            </motion.div>
          )}

          {/* Content */}
          <motion.h3
            className={`${service.featured ? 'text-3xl lg:text-4xl' : 'text-xl'} font-bold text-white mb-3 group-hover:text-violet-300 transition-colors duration-300`}
          >
            {service.title}
          </motion.h3>
          <p className={`text-dark-400 leading-relaxed ${service.featured ? 'text-lg mb-8' : 'text-sm mb-6'}`}>
            {service.description}
          </p>

          {/* Features with animated checkmarks */}
          <div className={`space-y-3 ${service.featured ? 'mb-8' : 'mb-6'}`}>
            {service.features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle2 className={`${service.featured ? 'w-5 h-5' : 'w-4 h-4'} text-emerald-400`} />
                </motion.div>
                <span className={`${service.featured ? 'text-base' : 'text-sm'} text-dark-300 font-medium`}>
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="#contact"
            className={`inline-flex items-center gap-2 ${service.featured ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'} font-semibold rounded-xl bg-gradient-to-r from-violet-500/10 to-emerald-500/10 border border-violet-500/30 text-white hover:from-violet-500/20 hover:to-emerald-500/20 hover:border-violet-500/50 transition-all duration-300 group/link`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{'cta' in service && service.cta ? service.cta : 'En savoir plus'}</span>
            <motion.div
              animate={isHovered ? {
                x: [0, 4, 0],
                y: [0, -4, 0],
              } : {}}
              transition={{
                repeat: isHovered ? Infinity : 0,
                duration: 1,
                ease: 'easeInOut'
              }}
            >
              <ArrowUpRight className={`${service.featured ? 'w-5 h-5' : 'w-4 h-4'} text-violet-400`} />
            </motion.div>
          </motion.a>
        </div>
      </motion.div>
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
            Du site vitrine performant a l&apos;application metier complexe,
            je transforme vos idees en solutions digitales qui font la difference.
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
