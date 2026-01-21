'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Code, Clock, Shield, Star, CheckCircle } from 'lucide-react';

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
}

export default function CTABanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [shapes, setShapes] = useState<FloatingShape[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Generate floating shapes on mount
  useEffect(() => {
    const generatedShapes: FloatingShape[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 20 + Math.random() * 60,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 5,
      rotate: Math.random() * 360,
    }));
    setShapes(generatedShapes);
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-violet-600/90 via-violet-800/90 to-emerald-600/90"
          animate={{
            background: [
              'linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(124, 58, 237, 0.9) 50%, rgba(16, 185, 129, 0.9) 100%)',
              'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(124, 58, 237, 0.9) 50%, rgba(139, 92, 246, 0.9) 100%)',
              'linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(124, 58, 237, 0.9) 50%, rgba(16, 185, 129, 0.9) 100%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        {/* Animated grid overlay */}
        <div className="absolute inset-0 animated-grid opacity-20" />

        {/* Glow orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Floating decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {shapes.map((shape) => (
          <motion.div
            key={shape.id}
            className="absolute opacity-10"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: shape.size,
              height: shape.size,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [shape.rotate, shape.rotate + 180, shape.rotate + 360],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              delay: shape.delay,
              ease: 'easeInOut',
            }}
          >
            {shape.id % 3 === 0 ? (
              <div className="w-full h-full border-2 border-white rounded-lg rotate-45" />
            ) : shape.id % 3 === 1 ? (
              <div className="w-full h-full border-2 border-white rounded-full" />
            ) : (
              <div className="w-full h-full border-2 border-white hexagon" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Particle effects */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container-custom"
      >
        {/* Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Glowing border effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-400 via-emerald-400 to-violet-400 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse" />

          {/* Card content */}
          <div className="relative glass rounded-3xl p-8 md:p-12 lg:p-16 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
            {/* Animated border shimmer */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '200% 200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            <div className="relative z-10 text-center">
              {/* Urgency Badge with pulse */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-violet-500/20 border border-emerald-400/40 mb-6 backdrop-blur-sm"
              >
                {/* Pulsing dot */}
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
                </span>
                <span className="text-sm font-semibold text-white">
                  Disponible pour nouveaux projets
                </span>
                <Zap className="w-4 h-4 text-yellow-400" />
              </motion.div>

              {/* Headline with text reveal */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
              >
                Transformez votre idee en{' '}
                <motion.span
                  className="inline-block relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="relative z-10 bg-gradient-to-r from-emerald-300 via-yellow-200 to-emerald-300 bg-clip-text text-transparent">
                    succes digital
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-emerald-400/30 blur-xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.9, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.span>
              </motion.h2>

              {/* Subtext with stronger value proposition */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed"
              >
                Des solutions web sur mesure qui generent des resultats concrets.
                <span className="block mt-2 text-emerald-300 font-semibold">
                  Premier appel decouverte gratuit et sans engagement.
                </span>
              </motion.p>

              {/* Micro-benefits */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="flex flex-wrap justify-center gap-4 mb-8"
              >
                {[
                  { icon: Clock, text: 'Livraison rapide' },
                  { icon: Shield, text: 'Code de qualite' },
                  { icon: Star, text: 'Support premium' }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20"
                  >
                    <item.icon className="w-4 h-4 text-emerald-300" />
                    <span className="text-sm text-white/90">{item.text}</span>
                  </div>
                ))}
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                {/* Primary CTA - Enhanced with shine and urgency */}
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 text-dark-900 rounded-full font-bold text-lg shadow-2xl shadow-emerald-500/40 overflow-hidden"
                >
                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                    initial={{ x: '-200%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                  />

                  {/* Pulsing border glow */}
                  <motion.div
                    className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300 blur-md opacity-60"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  <span className="relative z-10 flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Demarrer mon projet
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </span>
                </motion.a>

                {/* Secondary CTA */}
                <motion.a
                  href="#portfolio"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-flex items-center gap-2 px-8 py-5 bg-white/10 text-white rounded-full font-semibold text-lg border-2 border-white/30 backdrop-blur-sm hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5" />
                  Voir mes realisations
                  <motion.span
                    animate={{ rotate: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </motion.a>
              </motion.div>

              {/* Trust indicators - Enhanced with icons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-white/20"
              >
                {[
                  { Icon: Clock, label: 'Reponse', value: '< 24h', color: 'text-emerald-400' },
                  { Icon: CheckCircle, label: 'Satisfaction', value: '100%', color: 'text-violet-400' },
                  { Icon: Shield, label: 'Garantie', value: 'Incluse', color: 'text-yellow-400' },
                  { Icon: Star, label: 'Projets', value: '50+', color: 'text-pink-400' },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="flex flex-col items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 min-w-[100px]"
                  >
                    <item.Icon className={`w-6 h-6 ${item.color}`} />
                    <div className="text-xs text-white/60 uppercase tracking-wider">{item.label}</div>
                    <div className="text-white font-bold text-lg">{item.value}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Social proof */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mt-6 text-sm text-white/50"
              >
                Rejoignez les entreprises qui font confiance a ZFX AllTech
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="h-1 w-full max-w-3xl mx-auto mt-8 rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
        />
      </motion.div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />
    </section>
  );
}
