'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { Home, ArrowLeft, Terminal } from 'lucide-react';

// Floating particle component
function FloatingParticle({ delay }: { delay: number }) {
  const randomX = Math.random() * 100;
  const randomDuration = 15 + Math.random() * 10;

  return (
    <motion.div
      className="absolute w-1 h-1 bg-violet-500/30 rounded-full"
      style={{ left: `${randomX}%`, top: '-10px' }}
      animate={{
        y: ['0vh', '110vh'],
        opacity: [0, 1, 1, 0],
        scale: [0, 1.5, 1, 0],
      }}
      transition={{
        duration: randomDuration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

// Glitch effect component
function GlitchText({ children }: { children: string }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block">
      <h1
        className="text-8xl sm:text-[12rem] md:text-[16rem] font-bold gradient-text mb-4 select-none"
        style={{
          textShadow: isGlitching
            ? '0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(16, 185, 129, 0.6)'
            : 'none',
        }}
      >
        {children}
      </h1>
      {isGlitching && (
        <>
          <h1
            className="absolute top-0 left-0 text-8xl sm:text-[12rem] md:text-[16rem] font-bold text-violet-500 mb-4 select-none opacity-70"
            style={{
              transform: 'translate(-3px, -3px)',
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
            }}
          >
            {children}
          </h1>
          <h1
            className="absolute top-0 left-0 text-8xl sm:text-[12rem] md:text-[16rem] font-bold text-emerald-500 mb-4 select-none opacity-70"
            style={{
              transform: 'translate(3px, 3px)',
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
            }}
          >
            {children}
          </h1>
        </>
      )}
    </div>
  );
}

// Typing animation for code
function TypedCode() {
  const [displayedCode, setDisplayedCode] = useState('');
  const fullCode = `const error = 404;\nif (page === undefined) {\n  return <NotFound />;\n}`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullCode.length) {
        setDisplayedCode(fullCode.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-block bg-dark-900/80 backdrop-blur-sm border border-dark-800 rounded-xl px-6 py-4 font-mono text-sm text-left max-w-sm sm:max-w-md">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-dark-800">
        <Terminal className="w-4 h-4 text-emerald-400" />
        <span className="text-dark-400 text-xs">error.tsx</span>
      </div>
      <pre className="text-left whitespace-pre-wrap">
        <code>
          <span className="text-violet-400">const</span>
          <span className="text-white"> error </span>
          <span className="text-dark-400">=</span>
          <span className="text-emerald-400"> 404</span>
          <span className="text-dark-400">;</span>
          {displayedCode.includes('\n') && (
            <>
              {'\n'}
              <span className="text-violet-400">if</span>
              <span className="text-white"> (page </span>
              <span className="text-violet-400">===</span>
              <span className="text-white"> undefined) {'{'}</span>
            </>
          )}
          {displayedCode.includes('return') && (
            <>
              {'\n  '}
              <span className="text-violet-400">return</span>
              <span className="text-white"> {'<'}</span>
              <span className="text-emerald-400">NotFound</span>
              <span className="text-white"> {'/>'}</span>
              <span className="text-dark-400">;</span>
            </>
          )}
          {displayedCode.includes('}') && (
            <>
              {'\n'}
              <span className="text-white">{'}'}</span>
            </>
          )}
          <motion.span
            className="inline-block w-2 h-4 bg-emerald-400 ml-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </code>
      </pre>
    </div>
  );
}

// Floating geometric shapes
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        >
          <div
            className={`w-20 h-20 border-2 ${
              i % 2 === 0 ? 'border-violet-500/20' : 'border-emerald-500/20'
            } ${i % 3 === 0 ? 'rounded-full' : i % 3 === 1 ? 'rotate-45' : 'hexagon'}`}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function NotFound() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: [0.3, 0.5, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    });
  }, [controls]);

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-dark-950">
        {/* Animated grid */}
        <motion.div
          className="absolute inset-0 animated-grid opacity-40"
          animate={controls}
        />

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[128px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} />
        ))}

        {/* Floating shapes */}
        <FloatingShapes />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* 404 with glitch effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            type: 'spring',
            stiffness: 100,
          }}
        >
          <GlitchText>404</GlitchText>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gradient-text-animated">
              Cette page s&apos;est perdue dans le code
            </span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-dark-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
            <br />
            <span className="text-dark-500 text-sm mt-2 inline-block">
              Erreur 404 : Ressource introuvable dans l&apos;espace numérique
            </span>
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-emerald-500 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/50 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Retour à l&apos;accueil
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-dark-700 text-dark-300 font-semibold rounded-full hover:border-violet-500 hover:text-white hover:bg-violet-500/10 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Page précédente
          </button>
        </motion.div>

        {/* Code snippet with typing animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center"
        >
          <TypedCode />
        </motion.div>

        {/* Fun message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12"
        >
          <p className="text-dark-500 text-sm italic">
            &quot;La seule erreur est de ne pas chercher le bon chemin&quot; - Dev proverbe
          </p>
        </motion.div>
      </div>
    </main>
  );
}
