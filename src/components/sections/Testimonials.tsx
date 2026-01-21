'use client';

import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, CheckCircle2, Clock, Award, Briefcase, Shield, Play, Pause, Building2, Sparkles, TrendingUp, Users, ThumbsUp } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sophie Mercier',
    role: 'CEO & Fondatrice',
    company: 'TechStart Solutions',
    image: null,
    rating: 5,
    text: "Un developpeur exceptionnel qui a transforme notre vision en une application web performante. Au-dela de ses competences techniques impressionnantes, c'est sa capacite a comprendre nos besoins business et a proposer des solutions innovantes qui fait la difference. Le projet a ete livre en avance et le resultat depasse nos attentes.",
    project: 'Application web SaaS',
    gradient: 'from-violet-500 to-purple-600',
    industry: 'Tech / SaaS',
    results: '+150% de productivite',
    verified: true,
  },
  {
    id: 2,
    name: 'Marc Dubois',
    role: 'Directeur Marketing',
    company: 'La Maison du Design',
    image: null,
    rating: 5,
    text: "Nous cherchions un expert pour refondre notre site e-commerce et nous avons ete bluffes par le resultat. L'interface est moderne et intuitive, nos conversions ont augmente de 45% en deux mois. La communication etait fluide et chaque etape du projet etait claire. Un professionnel fiable et reactif.",
    project: 'Site e-commerce Shopify',
    gradient: 'from-emerald-500 to-teal-600',
    industry: 'E-commerce',
    results: '+45% conversions',
    verified: true,
  },
  {
    id: 3,
    name: 'David Chen',
    role: 'CTO',
    company: 'FinanceHub',
    image: null,
    rating: 5,
    text: "J'ai rarement vu un developpeur avec une telle maitrise technique. L'API REST qu'il a developpee pour nous est robuste, bien documentee et parfaitement securisee. Son approche architecturale et ses choix technologiques etaient judicieux. Il a su gerer la complexite de notre systeme avec brio.",
    project: 'API REST & Microservices',
    gradient: 'from-blue-500 to-cyan-600',
    industry: 'FinTech',
    results: '99.9% uptime',
    verified: true,
  },
  {
    id: 4,
    name: 'Isabelle Fournier',
    role: 'Gerante',
    company: 'Atelier Fournier & Fils',
    image: null,
    rating: 5,
    text: "En tant que petite entreprise, nous avions besoin d'un logiciel de gestion sur mesure sans nous ruiner. Non seulement il a cree exactement ce dont nous avions besoin, mais il a pris le temps de nous former et reste disponible pour nous accompagner. Un vrai partenaire de confiance.",
    project: 'Logiciel de gestion metier',
    gradient: 'from-orange-500 to-amber-600',
    industry: 'Artisanat',
    results: '-30% temps admin',
    verified: true,
  },
  {
    id: 5,
    name: 'Alexandre Martin',
    role: 'Product Manager',
    company: 'HealthTech Pro',
    image: null,
    rating: 5,
    text: "Collaboration exceptionnelle sur notre plateforme de telemedicine. La comprehension des enjeux de securite et de confidentialite des donnees de sante a ete remarquable. L'application est intuitive pour nos medecins et nos patients l'adorent.",
    project: 'Application Telemedicine',
    gradient: 'from-rose-500 to-pink-600',
    industry: 'HealthTech',
    results: '+200% consultations',
    verified: true,
  },
];

const stats = [
  {
    icon: Briefcase,
    value: 50,
    suffix: '+',
    label: 'Projets livres',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: ThumbsUp,
    value: 100,
    suffix: '%',
    label: 'Clients satisfaits',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Award,
    value: 5,
    suffix: '+',
    label: "Annees d'experience",
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Clock,
    value: 24,
    suffix: 'h',
    label: 'Temps de reponse',
    gradient: 'from-orange-500 to-amber-600',
  },
];

const trustBadges = [
  { icon: Shield, text: 'Avis verifies', color: 'text-emerald-400' },
  { icon: TrendingUp, text: 'Resultats mesurables', color: 'text-violet-400' },
  { icon: Users, text: 'Clients fideles', color: 'text-blue-400' },
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

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, isPaused, handleNext]);

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    setIsPaused(!isPaused);
  };

  const currentTestimonial = testimonials[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section id="testimonials" className="relative py-28 lg:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-emerald-500/5" />

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-10 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            Temoignages clients
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8"
          >
            Ce que disent mes{' '}
            <span className="gradient-text">clients</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-dark-300 mb-8"
          >
            La satisfaction client est au coeur de mon approche.
            Decouvrez les retours de ceux qui m&apos;ont fait confiance.
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {trustBadges.map((badge, index) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-900/50 border border-dark-800"
              >
                <badge.icon className={`w-4 h-4 ${badge.color}`} />
                <span className="text-sm text-dark-300">{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="relative">
            {/* Decorative Quote Marks */}
            <div className="absolute -top-8 -left-4 lg:-left-8 text-violet-500/20 pointer-events-none">
              <Quote className="w-24 h-24 lg:w-32 lg:h-32" fill="currentColor" />
            </div>
            <div className="absolute -bottom-8 -right-4 lg:-right-8 text-emerald-500/20 pointer-events-none rotate-180">
              <Quote className="w-24 h-24 lg:w-32 lg:h-32" fill="currentColor" />
            </div>

            {/* Carousel Container */}
            <div
              className="relative overflow-hidden rounded-3xl"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                  }}
                  className="relative"
                >
                  <div className="p-8 lg:p-12 rounded-3xl bg-dark-900/60 border border-dark-800 backdrop-blur-xl">
                    {/* Top Row: Rating + Verified Badge */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                      {/* Rating Stars */}
                      <div className="flex gap-1">
                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star
                              className="w-5 h-5 text-yellow-500 fill-yellow-500"
                            />
                          </motion.div>
                        ))}
                      </div>
                      {currentTestimonial.verified && (
                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                          <Shield className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-xs text-emerald-400 font-medium">Verifie</span>
                        </div>
                      )}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-lg lg:text-xl text-dark-200 text-center mb-8 leading-relaxed max-w-3xl mx-auto">
                      &ldquo;{currentTestimonial.text}&rdquo;
                    </blockquote>

                    {/* Project & Results Badges */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${currentTestimonial.gradient} bg-opacity-10 border border-current/20 text-sm font-medium`}>
                        <CheckCircle2 className="w-4 h-4" />
                        {currentTestimonial.project}
                      </span>
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                        <TrendingUp className="w-4 h-4" />
                        {currentTestimonial.results}
                      </span>
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800/50 border border-dark-700 text-dark-300 text-sm">
                        <Building2 className="w-4 h-4" />
                        {currentTestimonial.industry}
                      </span>
                    </div>

                    {/* Author Info */}
                    <div className="flex flex-col items-center">
                      {/* Avatar with animated border */}
                      <motion.div
                        className={`w-20 h-20 rounded-full bg-gradient-to-br ${currentTestimonial.gradient} p-0.5 mb-4 relative`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center relative overflow-hidden">
                          <span className="text-2xl font-bold text-white">
                            {currentTestimonial.name.charAt(0)}
                          </span>
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 shimmer opacity-30" />
                        </div>
                        {/* Animated ring */}
                        <motion.div
                          className={`absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r ${currentTestimonial.gradient} opacity-50`}
                          style={{ backgroundClip: 'border-box' }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        />
                      </motion.div>

                      <h4 className="text-lg font-semibold text-white mb-1">
                        {currentTestimonial.name}
                      </h4>
                      <p className="text-dark-400 text-sm">
                        {currentTestimonial.role}
                      </p>
                      <p className="text-violet-400 text-sm font-medium">
                        {currentTestimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none">
              <div className="container-custom flex justify-between pointer-events-auto">
                <motion.button
                  onClick={handlePrev}
                  onMouseEnter={() => setIsPaused(true)}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 -ml-6 lg:-ml-16 rounded-full bg-dark-900/90 border border-dark-800 hover:border-violet-500/50 flex items-center justify-center transition-colors group backdrop-blur-sm"
                  aria-label="Temoignage precedent"
                >
                  <ChevronLeft className="w-6 h-6 text-dark-400 group-hover:text-violet-400 transition-colors" />
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  onMouseEnter={() => setIsPaused(true)}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 -mr-6 lg:-mr-16 rounded-full bg-dark-900/90 border border-dark-800 hover:border-violet-500/50 flex items-center justify-center transition-colors group backdrop-blur-sm"
                  aria-label="Temoignage suivant"
                >
                  <ChevronRight className="w-6 h-6 text-dark-400 group-hover:text-violet-400 transition-colors" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Navigation Dots & Auto-play Control */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Auto-play toggle */}
            <motion.button
              onClick={toggleAutoPlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isAutoPlaying
                  ? 'bg-violet-500/20 border border-violet-500/50 text-violet-400'
                  : 'bg-dark-800 border border-dark-700 text-dark-400'
              }`}
              aria-label={isAutoPlaying ? 'Pause' : 'Play'}
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-10 bg-gradient-to-r from-violet-500 to-emerald-500'
                      : 'w-2.5 bg-dark-700 hover:bg-dark-600'
                  }`}
                  aria-label={`Aller au temoignage ${index + 1}`}
                />
              ))}
            </div>

            {/* Testimonial counter */}
            <div className="text-sm text-dark-400 tabular-nums">
              {currentIndex + 1} / {testimonials.length}
            </div>
          </div>
        </div>

        {/* Stats Section with Animated Counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 max-w-6xl mx-auto mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className="relative h-full p-6 lg:p-8 rounded-2xl bg-dark-900/50 border border-dark-800 hover:border-violet-500/30 transition-all duration-300 text-center overflow-hidden">
                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                {/* Icon */}
                <div className="flex justify-center mb-4 relative">
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} p-0.5`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full h-full rounded-xl bg-dark-900 flex items-center justify-center group-hover:bg-dark-900/80 transition-colors">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                </div>

                {/* Animated Value */}
                <div className={`text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.5} />
                </div>

                {/* Label */}
                <div className="text-sm text-dark-400 group-hover:text-dark-300 transition-colors">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Proof Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="p-6 rounded-2xl bg-dark-900/30 border border-dark-800">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center sm:text-left">
              <div className="flex -space-x-3">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`w-10 h-10 rounded-full border-2 border-dark-900 flex items-center justify-center text-sm font-bold text-white ${
                      ['bg-violet-500', 'bg-emerald-500', 'bg-blue-500', 'bg-orange-500', 'bg-rose-500'][i]
                    }`}
                  >
                    {['S', 'M', 'D', 'I', 'A'][i]}
                  </motion.div>
                ))}
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                  <span className="ml-2 text-white font-semibold">5.0</span>
                </div>
                <p className="text-dark-400 text-sm">
                  Note moyenne basee sur <span className="text-white font-medium">50+ projets</span> realises
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-dark-300 mb-6 text-lg">
            Pret a rejoindre ces clients satisfaits ?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-shadow"
          >
            <Sparkles className="w-5 h-5" />
            Demarrer un projet
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
