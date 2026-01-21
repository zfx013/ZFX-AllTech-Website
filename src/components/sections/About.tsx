'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Code2, Rocket, Users, Zap, Award, TrendingUp, CheckCircle2, Briefcase, Heart, Shield, Target, Lightbulb, GraduationCap, Building, Globe2, Calendar, ArrowRight, Coffee, Laptop, MessageSquare, Clock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import FloatingCode from '../effects/FloatingCode';

const values = [
  {
    icon: Code2,
    title: 'Code Propre',
    description: 'Maintenable, documenté et testé',
    color: 'from-violet-500 to-purple-600',
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Applications rapides et optimisées',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Users,
    title: 'Communication',
    description: 'Contact direct et transparent',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Zap,
    title: 'Réactivité',
    description: 'Délais respectés, suivi constant',
    color: 'from-orange-500 to-amber-600',
  },
];

const stats = [
  { value: 5, suffix: '+', label: "Années d'expertise", icon: Calendar },
  { value: 50, suffix: '+', label: 'Projets livrés', icon: Briefcase },
  { value: 100, suffix: '%', label: 'Clients satisfaits', icon: Heart },
  { value: 24, suffix: '/7', label: 'Support disponible', icon: Clock },
];

const milestones = [
  {
    year: '2019',
    title: 'Premiers projets',
    description: 'Développement web et mobile pour des startups innovantes',
    icon: GraduationCap,
    achievements: ['10+ projets', 'React & Node.js'],
    color: 'from-violet-500 to-purple-600',
  },
  {
    year: '2021',
    title: 'Spécialisation SaaS',
    description: 'Focus sur les applications métier et plateformes complexes',
    icon: Building,
    achievements: ['20+ SaaS', 'Architecture cloud'],
    color: 'from-emerald-500 to-teal-600',
  },
  {
    year: '2024',
    title: 'Création de ZFX AllTech',
    description: 'Fondation de la SASU pour accompagner les entreprises',
    icon: Rocket,
    achievements: ['Structure SASU', 'Expertise reconnue'],
    color: 'from-blue-500 to-cyan-600',
  },
  {
    year: '2025',
    title: 'Croissance',
    description: 'Développement de solutions sur mesure pour PME et startups',
    icon: Globe2,
    achievements: ['50+ projets', 'Clients satisfaits'],
    color: 'from-orange-500 to-amber-600',
  },
];

const whyWorkWithUs = [
  {
    icon: Award,
    text: 'Expertise technique solide et polyvalente',
    description: 'Frontend, backend, cloud, mobile - maîtrise complète de la stack moderne',
  },
  {
    icon: TrendingUp,
    text: 'Veille technologique constante',
    description: 'Toujours à jour avec les dernières tendances et best practices',
  },
  {
    icon: CheckCircle2,
    text: 'Livraison dans les délais',
    description: 'Respect des engagements et communication proactive',
  },
  {
    icon: Target,
    text: 'Approche business-oriented',
    description: 'Nous comprenons vos enjeux business, pas juste le code',
  },
];

const techStack = [
  { name: 'React/Next.js', level: 95, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Languages' },
  { name: 'Node.js', level: 88, category: 'Backend' },
  { name: 'Python', level: 85, category: 'Backend' },
  { name: 'PostgreSQL', level: 87, category: 'Database' },
  { name: 'AWS/GCP', level: 82, category: 'Cloud' },
];

const workStyle = [
  { icon: Coffee, label: 'Remote First', description: 'Travail flexible depuis partout' },
  { icon: MessageSquare, label: 'Communication', description: 'Updates reguliers et transparents' },
  { icon: Laptop, label: 'Agile', description: 'Iterations rapides et feedback' },
  { icon: Shield, label: 'Securite', description: 'Best practices de securite' },
];

// Animated counter component
function AnimatedCounter({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString();
      }
    });
    return () => unsubscribe();
  }, [springValue]);

  return (
    <span className="inline-flex items-baseline">
      <span ref={ref} className="tabular-nums">0</span>
      <span>{suffix}</span>
    </span>
  );
}

// Skill bar component
function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-dark-300 group-hover:text-white transition-colors">{name}</span>
        <span className="text-xs text-violet-400 font-mono">{level}%</span>
      </div>
      <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-violet-500 to-emerald-500 rounded-full"
        />
      </div>
    </div>
  );
}

export default function About() {
  const [activeTimeline, setActiveTimeline] = useState(3);

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[128px]" />
      <div className="absolute top-3/4 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[128px]" />

      <div className="container-custom relative z-10">
        {/* Main heading with text reveal */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6"
          >
            <Lightbulb className="w-4 h-4" />
            À propos de ZFX AllTech
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Transformer vos idées en{' '}
            <span className="gradient-text">solutions digitales</span>
            <br />
            qui font la différence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-dark-300 max-w-3xl mx-auto"
          >
            ZFX AllTech est une SASU spécialisée dans le développement web et logiciels.
            Nous créons des applications sur mesure pour les entreprises ambitieuses.
          </motion.p>
        </div>

        {/* Quick Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative p-6 rounded-2xl bg-dark-900/50 border border-dark-800 hover:border-violet-500/30 transition-all text-center group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <stat.icon className="w-6 h-6 text-violet-400 mx-auto mb-3" />
              <div className="text-3xl font-bold gradient-text mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs text-dark-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Split layout: Content left, Visual right */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left: Story and values */}
          <div className="space-y-12">
            {/* Personal story with better structure */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </span>
                Notre expertise
              </h3>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p className="relative pl-6 border-l-2 border-violet-500/30">
                  <span className="text-white font-medium">ZFX AllTech</span> est née de la passion pour la technologie
                  et de l&apos;envie de créer des solutions qui font vraiment la différence.
                  Notre mission ? Concevoir des outils numériques qui simplifient la vie des utilisateurs
                  et boostent la productivité des entreprises.
                </p>
                <p className="relative pl-6 border-l-2 border-emerald-500/30">
                  Avec plus de 5 ans d&apos;expérience sur des <span className="text-white font-medium">projets variés</span>,
                  nous accompagnons les startups qui lancent leur MVP, les PME qui modernisent leurs processus,
                  et les grandes entreprises qui optimisent leurs systèmes existants.
                </p>
                <p className="relative pl-6 border-l-2 border-blue-500/30">
                  Notre philosophie est simple : <strong className="text-white">comprendre vos besoins réels</strong> avant
                  de coder la moindre ligne. Pas de solutions génériques ni de sur-ingénierie.
                  Juste le bon outil, au bon moment, avec le bon niveau de qualité.
                </p>
              </div>
            </motion.div>

            {/* Values grid with enhanced design */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </span>
                Nos valeurs
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group p-5 rounded-xl bg-dark-900/50 border border-dark-800 hover:border-violet-500/50 transition-all cursor-default relative overflow-hidden"
                  >
                    {/* Hover gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

                    <div className="flex items-start gap-4 relative">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} p-0.5 flex-shrink-0`}>
                        <div className="w-full h-full rounded-xl bg-dark-900 flex items-center justify-center group-hover:bg-dark-900/50 transition-colors">
                          <value.icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1 group-hover:text-violet-300 transition-colors">{value.title}</h4>
                        <p className="text-sm text-dark-400">{value.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tech Stack with animated bars */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-white" />
                </span>
                Stack technique
              </h3>
              <div className="space-y-4 p-6 rounded-xl bg-dark-900/50 border border-dark-800">
                {techStack.map((tech, index) => (
                  <SkillBar
                    key={tech.name}
                    name={tech.name}
                    level={tech.level}
                    delay={0.1 + index * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Visual element with floating code */}
          <div className="relative lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative h-[500px] rounded-2xl bg-gradient-to-br from-violet-500/10 via-transparent to-emerald-500/10 border border-dark-800 overflow-hidden"
            >
              <FloatingCode />

              {/* Geometric overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="w-56 h-56 border border-violet-500/30 rounded-full"
                  />
                  <motion.div
                    animate={{
                      rotate: -360,
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 w-56 h-56 border border-emerald-500/30 rounded-full"
                    style={{ borderStyle: 'dashed' }}
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-4 bg-gradient-to-br from-violet-500/20 to-emerald-500/20 rounded-full blur-xl"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8 rounded-xl bg-dark-950/90 backdrop-blur-sm border border-dark-800">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Code2 className="w-14 h-14 text-violet-400 mx-auto mb-3" />
                      </motion.div>
                      <p className="text-white font-bold text-lg">ZFX AllTech</p>
                      <p className="text-dark-400 text-sm">Développement sur mesure</p>
                      <div className="flex gap-1 mt-3 justify-center">
                        {['React', 'Node', 'Cloud'].map((tech, i) => (
                          <span key={tech} className="px-2 py-0.5 text-xs rounded bg-dark-800 text-violet-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Work style badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-3 mt-6"
            >
              {workStyle.map((item, index) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="p-4 rounded-xl bg-dark-900/50 border border-dark-800 hover:border-violet-500/30 transition-all"
                >
                  <item.icon className="w-5 h-5 text-violet-400 mb-2" />
                  <p className="text-white font-medium text-sm">{item.label}</p>
                  <p className="text-xs text-dark-400">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Experience timeline - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-4">Parcours professionnel</h3>
          <p className="text-dark-400 text-center mb-12 max-w-2xl mx-auto">
            Une evolution constante vers l&apos;excellence technique et la satisfaction client
          </p>

          {/* Timeline with connecting line */}
          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-violet-500/20 via-emerald-500/20 to-blue-500/20 -translate-y-1/2" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.15 }}
                  className="relative"
                  onMouseEnter={() => setActiveTimeline(index)}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className={`hidden lg:flex absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br ${milestone.color} items-center justify-center z-10`}
                    animate={{
                      scale: activeTimeline === index ? 1.3 : 1,
                      boxShadow: activeTimeline === index
                        ? '0 0 20px rgba(139, 92, 246, 0.5)'
                        : '0 0 0px rgba(139, 92, 246, 0)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </motion.div>

                  <motion.div
                    className={`p-6 rounded-xl bg-dark-900/50 border transition-all h-full ${
                      activeTimeline === index
                        ? 'border-violet-500/50 shadow-lg shadow-violet-500/10'
                        : 'border-dark-800 hover:border-violet-500/30'
                    }`}
                    whileHover={{ y: -5 }}
                  >
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${milestone.color} p-0.5 mb-4`}>
                      <div className="w-full h-full rounded-xl bg-dark-900 flex items-center justify-center">
                        <milestone.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Year */}
                    <div className={`text-3xl font-bold bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent mb-2`}>
                      {milestone.year}
                    </div>

                    {/* Title */}
                    <h4 className="text-white font-semibold mb-2">{milestone.title}</h4>

                    {/* Description */}
                    <p className="text-sm text-dark-400 mb-4">{milestone.description}</p>

                    {/* Achievements */}
                    <div className="flex flex-wrap gap-2">
                      {milestone.achievements.map((achievement) => (
                        <span
                          key={achievement}
                          className="px-2 py-1 text-xs rounded-full bg-dark-800 text-dark-300 border border-dark-700"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Arrow for desktop */}
                  {index < milestones.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 text-dark-600">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Why work with me section - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-4">Pourquoi choisir ZFX AllTech ?</h3>
          <p className="text-dark-400 text-center mb-12 max-w-2xl mx-auto">
            Plus qu&apos;un prestataire, un partenaire technique pour votre réussite
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {whyWorkWithUs.map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -3 }}
                className="group flex items-start gap-4 p-6 rounded-xl bg-dark-900/30 border border-dark-800 hover:border-violet-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-emerald-500 p-0.5 flex-shrink-0">
                  <div className="w-full h-full rounded-xl bg-dark-900 flex items-center justify-center group-hover:bg-dark-900/50 transition-colors">
                    <item.icon className="w-5 h-5 text-violet-400" />
                  </div>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1 group-hover:text-violet-300 transition-colors">{item.text}</p>
                  <p className="text-sm text-dark-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-violet-500/10 to-emerald-500/10 border border-violet-500/20 text-center relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />

            <div className="relative">
              <h4 className="text-xl font-bold text-white mb-4">Prêt à donner vie à votre projet ?</h4>
              <p className="text-dark-300 mb-6 leading-relaxed max-w-2xl mx-auto">
                <strong className="text-white">Collaboration flexible :</strong> Disponible en <strong className="text-white">full remote</strong>,
                nous nous adaptons à votre organisation. Que vous soyez une startup en pleine croissance ou une entreprise établie,
                nous fournissons un accompagnement personnalisé du brief initial jusqu&apos;au déploiement final.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <span>Travaillons ensemble</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="#portfolio"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <span>Voir nos réalisations</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
