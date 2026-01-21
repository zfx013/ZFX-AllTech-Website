'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Terminal, Sparkles } from 'lucide-react';

const codeLines = [
  { text: 'const developer = {', color: 'text-violet-400' },
  { text: '  name: "ZFX AllTech",', color: 'text-emerald-400' },
  { text: '  role: "Fullstack Developer",', color: 'text-emerald-400' },
  { text: '  skills: ["React", "Node.js", "Python"],', color: 'text-emerald-400' },
  { text: '  passion: "Building amazing things",', color: 'text-emerald-400' },
  { text: '};', color: 'text-violet-400' },
  { text: '', color: '' },
  { text: 'async function createProject(idea) {', color: 'text-violet-400' },
  { text: '  const solution = await developer.transform(idea);', color: 'text-dark-300' },
  { text: '  return solution.deploy(); // 🚀', color: 'text-dark-300' },
  { text: '}', color: 'text-violet-400' },
];

export default function Hero() {
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [currentChar, setCurrentChar] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-dark-950">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 container-custom py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-violet-300">Développeur Fullstack</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Je transforme vos{' '}
              <span className="gradient-text">idées</span>
              <br />
              en{' '}
              <span className="gradient-text-animated">solutions digitales</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-dark-300 max-w-xl mb-8"
            >
              Sites web, applications mobiles, logiciels métier, APIs - 
              Du concept au déploiement, je conçois des solutions sur mesure 
              qui font la différence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#contact" className="btn-primary group">
                <span>Démarrer un projet</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#services" className="btn-secondary">
                Voir mes services
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-8 mt-12 pt-8 border-t border-dark-800"
            >
              {[
                { value: '5+', label: 'Années exp.' },
                { value: '50+', label: 'Projets' },
                { value: '100%', label: 'Sur mesure' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-dark-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Code terminal animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 to-emerald-600/20 rounded-3xl blur-2xl" />
            <div className="relative bg-dark-900 rounded-2xl border border-dark-700 overflow-hidden shadow-2xl">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-dark-800 border-b border-dark-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex items-center gap-2 ml-4 text-dark-400 text-sm">
                  <Terminal className="w-4 h-4" />
                  <span>developer.ts</span>
                </div>
              </div>
              
              {/* Code content */}
              <div className="p-6 font-mono text-sm min-h-[320px]">
                {codeLines.map((line, lineIndex) => (
                  <div key={lineIndex} className="flex">
                    <span className="w-8 text-dark-600 select-none">{lineIndex + 1}</span>
                    <span className={line.color}>
                      {lineIndex < displayedLines
                        ? line.text
                        : lineIndex === displayedLines
                        ? line.text.slice(0, currentChar)
                        : ''}
                      {lineIndex === displayedLines && (
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-dark-600 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
