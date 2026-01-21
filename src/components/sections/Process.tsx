'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Search,
  Palette,
  Code2,
  Rocket,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  Shield
} from 'lucide-react';

const processSteps = [
  {
    number: '01',
    title: 'Decouverte',
    description: 'Analyse des besoins et objectifs',
    details: 'Echange approfondi pour comprendre votre vision, vos besoins et vos contraintes. Definition claire des objectifs et du perimetre du projet.',
    icon: Search,
    gradient: 'from-violet-500 to-purple-600',
    color: 'violet',
    duration: '1-2 jours',
  },
  {
    number: '02',
    title: 'Conception',
    description: 'Architecture et design du projet',
    details: 'Creation de l\'architecture technique, des maquettes et du parcours utilisateur. Validation des choix technologiques adaptes a vos besoins.',
    icon: Palette,
    gradient: 'from-purple-500 to-fuchsia-600',
    color: 'purple',
    duration: '3-5 jours',
  },
  {
    number: '03',
    title: 'Developpement',
    description: 'Codage et tests iteratifs',
    details: 'Developpement en cycles courts avec demonstrations regulieres. Tests automatises et optimisation des performances a chaque etape.',
    icon: Code2,
    gradient: 'from-fuchsia-500 to-pink-600',
    color: 'fuchsia',
    duration: '2-6 semaines',
  },
  {
    number: '04',
    title: 'Livraison',
    description: 'Deploiement et formation',
    details: 'Migration en production avec accompagnement. Formation de vos equipes et documentation complete pour une prise en main optimale.',
    icon: Rocket,
    gradient: 'from-pink-500 to-emerald-600',
    color: 'pink',
    duration: '2-3 jours',
  },
  {
    number: '05',
    title: 'Support',
    description: 'Maintenance et evolutions',
    details: 'Suivi post-lancement, corrections rapides et evolutions continues. Garantie de la perennite et de l\'amelioration de votre solution.',
    icon: Headphones,
    gradient: 'from-emerald-500 to-teal-600',
    color: 'emerald',
    duration: 'Continu',
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="process" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[128px]" />

      <div ref={containerRef} className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4"
          >
            Processus
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            Une méthode{' '}
            <span className="gradient-text">éprouvée</span>
            <br />
            pour votre succès
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-dark-300"
          >
            De l&apos;idée à la réalisation, chaque étape est pensée pour
            garantir la qualité et votre satisfaction.
          </motion.p>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting Line */}
          <div className="absolute top-[72px] left-0 right-0 h-0.5 bg-dark-800">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-emerald-500 origin-left"
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: 'easeOut'
                }}
                className="relative"
              >
                {/* Icon Circle */}
                <div className="flex justify-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.15 + 0.3,
                      type: 'spring',
                      stiffness: 200
                    }}
                    className="relative"
                  >
                    {/* Outer glow ring */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} blur-xl opacity-60 animate-pulse`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    />

                    {/* Icon container */}
                    <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} p-0.5`}>
                      <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center">
                        <step.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    {/* Checkmark indicator */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.15 + 0.8
                      }}
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.15 + 0.4
                  }}
                  className="relative group"
                >
                  {/* Number Badge */}
                  <div className="absolute -top-3 left-4 px-3 py-1 rounded-full bg-dark-900 border border-dark-700">
                    <span className={`text-sm font-bold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                      {step.number}
                    </span>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                    <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {step.duration}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="h-full p-6 pt-8 rounded-2xl bg-dark-900/50 border border-dark-800 hover:border-violet-500/30 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-violet-500/10">
                    {/* Hover glow effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-emerald-400 transition-all duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm text-violet-400 mb-3 font-medium">
                      {step.description}
                    </p>
                    <p className="text-sm text-dark-400 leading-relaxed">
                      {step.details}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet: Vertical Timeline */}
        <div className="lg:hidden space-y-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex gap-6"
            >
              {/* Left: Icon and Line */}
              <div className="relative flex flex-col items-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1 + 0.2,
                    type: 'spring'
                  }}
                  className="relative z-10"
                >
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} blur-lg opacity-60`} />
                  <div className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${step.gradient} p-0.5`}>
                    <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Number badge */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-dark-900 border border-dark-700 flex items-center justify-center">
                    <span className={`text-xs font-bold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                      {step.number.replace('0', '')}
                    </span>
                  </div>
                </motion.div>

                {/* Connecting line */}
                {index < processSteps.length - 1 && (
                  <div className="w-0.5 flex-1 mt-4 bg-dark-800 relative overflow-hidden">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                      className={`w-full h-full bg-gradient-to-b ${step.gradient} origin-top`}
                    />
                  </div>
                )}
              </div>

              {/* Right: Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                className="flex-1 pb-8"
              >
                <div className="p-6 rounded-2xl bg-dark-900/50 border border-dark-800 hover:border-violet-500/30 transition-all duration-300 h-full relative overflow-hidden group">
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-emerald-400 transition-all duration-300">
                      {step.title}
                    </h3>
                    {/* Duration Badge for mobile */}
                    <span className="text-xs font-medium text-emerald-400 flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                      <Clock className="w-3 h-3" />
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-sm text-violet-400 mb-3 font-medium">
                    {step.description}
                  </p>
                  <p className="text-sm text-dark-400 leading-relaxed">
                    {step.details}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Outer glow */}
            <motion.div
              className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-violet-500/20 via-emerald-500/20 to-violet-500/20 blur-xl"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-dark-900/90 via-violet-900/20 to-dark-900/90 border border-violet-500/30 backdrop-blur-xl overflow-hidden">
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.3) 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }}
                animate={{ backgroundPosition: ['0px 0px', '24px 24px'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />

              <div className="relative flex flex-col lg:flex-row items-center gap-8">
                {/* Left content */}
                <div className="flex-1 text-center lg:text-left">
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-4"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400">Appel decouverte gratuit</span>
                  </motion.div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                    Pret a demarrer votre projet ?
                  </h3>
                  <p className="text-dark-300 mb-4 lg:mb-0">
                    Discutons de vos besoins et trouvons ensemble la meilleure solution.
                    <span className="block mt-2 text-sm text-dark-400">Premier rendez-vous de 30 minutes offert.</span>
                  </p>
                </div>

                {/* Right CTA */}
                <div className="flex flex-col items-center gap-4">
                  <motion.a
                    href="#contact"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 via-violet-500 to-emerald-500 text-white rounded-full font-bold text-lg shadow-xl shadow-violet-500/30 overflow-hidden"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                      initial={{ x: '-200%' }}
                      animate={{ x: '200%' }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    <span className="relative">Commencer maintenant</span>
                    <motion.span
                      className="relative"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </motion.a>

                  {/* Trust badges */}
                  <div className="flex items-center gap-4 text-sm text-dark-400">
                    <span className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      Sans engagement
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-violet-400" />
                      Reponse 24h
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
