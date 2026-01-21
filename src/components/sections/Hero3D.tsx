'use client';

import { lazy, Suspense, useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal, ChevronDown } from 'lucide-react';

// Lazy load 3D components for better performance
const Scene = lazy(() => import('../3d/Scene'));
const Particles = lazy(() => import('../3d/Particles'));
const MouseFollowCamera = lazy(() => import('../3d/MouseFollowCamera'));

// Code lines for the terminal animation
const codeLines = [
  { text: 'const ZFXAllTech = {', color: 'text-violet-400' },
  { text: '  type: "SASU",', color: 'text-emerald-400' },
  { text: '  expertise: "Développement Web & Logiciels",', color: 'text-emerald-400' },
  { text: '  stack: ["React", "Node.js", "Python", "Cloud"],', color: 'text-emerald-400' },
  { text: '  mission: "Transformer vos idées en réalité",', color: 'text-emerald-400' },
  { text: '};', color: 'text-violet-400' },
  { text: '', color: '' },
  { text: 'async function buildYourProject(vision) {', color: 'text-violet-400' },
  { text: '  const solution = await ZFXAllTech.create(vision);', color: 'text-dark-300' },
  { text: '  return solution.deploy(); // 🚀', color: 'text-dark-300' },
  { text: '}', color: 'text-violet-400' },
];

// Animation variants for staggered entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

// Stats data
const STATS_DATA = [
  { value: '5+', label: "Années d'expertise", ariaLabel: 'Plus de 5 ans d\'expertise' },
  { value: '50+', label: 'Projets livrés', ariaLabel: 'Plus de 50 projets livrés' },
  { value: '100%', label: 'Sur mesure', ariaLabel: 'Solutions 100% sur mesure' },
] as const;

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [currentChar, setCurrentChar] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Code typing animation
  useEffect(() => {
    if (displayedLines < codeLines.length) {
      const lineLength = codeLines[displayedLines].text.length;
      if (currentChar < lineLength) {
        const timer = setTimeout(() => setCurrentChar(c => c + 1), 30);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setDisplayedLines(l => l + 1);
          setCurrentChar(0);
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [displayedLines, currentChar]);

  // Loading fallback component
  const LoadingFallback = useMemo(
    () => (
      <div className="absolute inset-0 bg-dark-950" aria-hidden="true">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div
          className="absolute top-1/4 left-1/4 w-80 h-80 md:w-96 md:h-96 bg-violet-600/20 rounded-full blur-[100px] md:blur-[128px] animate-pulse"
          style={{ animationDuration: '3s' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 md:w-96 md:h-96 bg-emerald-600/20 rounded-full blur-[100px] md:blur-[128px] animate-pulse"
          style={{ animationDuration: '3s', animationDelay: '1.5s' }}
        />
      </div>
    ),
    []
  );

  // Scroll to section handler
  const handleScrollTo = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      role="banner"
      aria-label="Section principale - Developpeur Fullstack"
      className="relative min-h-screen min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* 3D Background Scene */}
      <div className="absolute inset-0 bg-dark-950" aria-hidden="true">
        <Suspense fallback={LoadingFallback}>
          <Scene mouseFollow={true}>
            <Particles count={3000} />
            <MouseFollowCamera intensity={1.8} smoothing={0.025} />
          </Scene>
        </Suspense>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/90 via-dark-950/20 to-dark-950/90 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/60 via-transparent to-dark-950/60 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(9,9,11,0.4) 100%)'
          }}
        />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 container-custom py-20 sm:py-24 lg:py-28"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-28 items-center">
          {/* Left: Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-violet-500/10 border border-violet-500/25 mb-10 backdrop-blur-md shadow-lg shadow-violet-500/5"
            >
              <Sparkles className="w-4 h-4 text-violet-400" aria-hidden="true" />
              <span className="text-sm font-medium text-violet-300 tracking-wide">
                Développement Web & Logiciels
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight"
            >
              <span className="text-dark-100">Nous transformons vos</span>{' '}
              <span className="gradient-text">idées</span>
              <br className="hidden sm:block" />
              <span className="text-dark-100"> en </span>
              <span className="gradient-text-animated">solutions digitales</span>
            </motion.h1>

            {/* Description - with proper spacing */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-dark-300 max-w-xl mx-auto lg:mx-0 leading-relaxed mt-8 lg:mt-10"
            >
              Sites web, applications mobiles, logiciels métier, APIs -
              Du concept au déploiement, nous concevons des solutions sur mesure
              qui font la différence.
            </motion.p>

            {/* CTA Buttons - with proper spacing */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-10 lg:mt-12"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo('contact');
                }}
                className="btn-primary group inline-flex items-center justify-center gap-2.5 text-base px-8 py-4"
                aria-label="Demarrer un projet - Aller a la section contact"
              >
                <span>Demarrer un projet</span>
                <ArrowRight
                  className="w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo('services');
                }}
                className="btn-secondary inline-flex items-center justify-center text-base px-8 py-4"
                aria-label="Voir mes services - Aller a la section services"
              >
                Voir mes services
              </a>
            </motion.div>

            {/* Stats - with proper spacing */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-8 sm:gap-10 lg:gap-12 mt-14 lg:mt-16 pt-10 lg:pt-12 border-t border-dark-800/50 justify-center lg:justify-start"
              role="list"
              aria-label="Statistiques"
            >
              {STATS_DATA.map((stat) => (
                <div
                  key={stat.label}
                  role="listitem"
                  aria-label={stat.ariaLabel}
                  className="text-center lg:text-left"
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-dark-400 font-medium tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Code terminal animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-6 bg-gradient-to-r from-violet-600/20 to-emerald-600/20 rounded-3xl blur-2xl" />
            <div className="relative bg-dark-900/90 backdrop-blur-sm rounded-2xl border border-dark-700 overflow-hidden shadow-2xl">
              {/* Terminal header - fixed pastille positioning */}
              <div className="flex items-center gap-2 px-5 py-4 bg-dark-800 border-b border-dark-700">
                <div className="flex gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500" />
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-500" />
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
                </div>
                <div className="flex items-center gap-2 ml-4 text-dark-400 text-sm">
                  <Terminal className="w-4 h-4" />
                  <span>zfx-alltech.ts</span>
                </div>
              </div>

              {/* Code content - with proper padding */}
              <div className="p-8 font-mono text-sm min-h-[340px]">
                {codeLines.map((line, lineIndex) => (
                  <div key={lineIndex} className="flex leading-relaxed">
                    <span className="w-8 text-dark-600 select-none">{lineIndex + 1}</span>
                    <span className={line.color}>
                      {lineIndex < displayedLines
                        ? line.text
                        : lineIndex === displayedLines
                        ? line.text.slice(0, currentChar)
                        : ''}
                      {lineIndex === displayedLines && displayedLines < codeLines.length && (
                        <span className="inline-block w-2 h-5 bg-violet-400 animate-pulse ml-0.5" />
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-20"
        role="presentation"
        aria-hidden="true"
      >
        <motion.button
          onClick={() => handleScrollTo('services')}
          className="flex flex-col items-center gap-2 cursor-pointer focus:outline-none group"
          aria-label="Faire défiler vers le bas pour voir le contenu"
        >
          <span className="text-xs text-dark-400 group-hover:text-violet-400 transition-colors uppercase tracking-widest">
            Découvrir
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ChevronDown className="w-6 h-6 text-violet-400 group-hover:text-violet-300 transition-colors" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Skip to content link for accessibility */}
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-violet-600 focus:text-white focus:rounded-lg"
      >
        Passer au contenu principal
      </a>
    </section>
  );
}
