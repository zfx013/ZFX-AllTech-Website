"use client";

import {
  memo,
  useEffect,
  useRef,
  useCallback,
  type JSX,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import NeuralNetwork from "../effects/NeuralNetwork";
import MagneticButton from "../ui/MagneticButton";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { ANIMATION_CONFIG } from "@/lib/constants";

/* =================================================================
   CONSTANTS
   ================================================================= */

const STATS: { value: string; label: string }[] = [
  { value: "100%", label: "Sur mesure" },
  { value: "Full", label: "Stack" },
  { value: "24h", label: "R\u00e9ponse" },
];

/* =================================================================
   MAIN COMPONENT
   ================================================================= */

const Hero = memo(function Hero(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseRef = useMousePosition({ smoothFactor: 0.08 });
  const prefersReducedMotion = useReducedMotion();
  const { scrollToSection } = useSmoothScroll();

  /* ---- scroll parallax ---- */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -120]);
  const bgY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 60]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, prefersReducedMotion ? 1 : 0.3]);

  /* ---- mouse parallax for terminal ---- */
  const orbRotateX = useSpring(
    useMotionValue(5),
    ANIMATION_CONFIG.spring.gentle,
  );
  const orbRotateY = useSpring(
    useMotionValue(-5),
    ANIMATION_CONFIG.spring.gentle,
  );

  useEffect(() => {
    let rafId = 0;

    function updateFromMouse() {
      const mouse = mouseRef.current;
      orbRotateX.set(5 + mouse.normalizedY * 3);
      orbRotateY.set(-5 + mouse.normalizedX * 3);
      rafId = requestAnimationFrame(updateFromMouse);
    }

    rafId = requestAnimationFrame(updateFromMouse);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [mouseRef, orbRotateX, orbRotateY]);

  /* ---- sequential entrance orchestration ---- */
  const fadeSlideUp = useCallback(
    (delay: number) => ({
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: 0.7,
        delay,
        ease: ANIMATION_CONFIG.easing.smooth,
      },
    }),
    [],
  );

  /* ---- scroll indicator bounce ---- */
  const scrollIndicatorY = useSpring(
    useMotionValue(0),
    ANIMATION_CONFIG.spring.gentle,
  );

  useEffect(() => {
    let direction = 1;
    const interval = setInterval(() => {
      scrollIndicatorY.set(direction * 8);
      direction *= -1;
    }, 900);
    return () => clearInterval(interval);
  }, [scrollIndicatorY]);

  /* ================================================================
     RENDER
     ================================================================ */
  return (
    <section
      id="hero"
      ref={sectionRef}
      className="section-hero noise-overlay relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* ─── BACKGROUND LAYER ─── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY, opacity: bgOpacity }}
      >
        {/* Neural network canvas */}
        <NeuralNetwork className="opacity-40" />

        {/* Radial gradient overlay for readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 20%, rgba(5,5,5,0.7) 70%, rgba(5,5,5,0.95) 100%)",
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* ─── HOLOGRAPHIC ORB (background decoration) ─── */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
        style={{
          perspective: 1200,
          y: bgY,
        }}
        aria-hidden="true"
      >
        <motion.div
          className="relative"
          style={{
            rotateX: orbRotateX,
            rotateY: orbRotateY,
            width: "clamp(280px, 40vw, 520px)",
            height: "clamp(280px, 40vw, 520px)",
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: ANIMATION_CONFIG.easing.smooth }}
        >
          {/* Central orb glow */}
          <div
            className="absolute inset-[15%] rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 35%, rgba(0, 255, 224, 0.15), rgba(0, 102, 255, 0.08) 50%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          {/* Inner core sphere */}
          <div
            className="absolute inset-[25%] rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(0, 255, 224, 0.12), rgba(0, 102, 255, 0.06) 60%, transparent 80%)",
              border: "1px solid rgba(0, 255, 224, 0.08)",
              boxShadow: "0 0 60px rgba(0, 255, 224, 0.06), inset 0 0 40px rgba(0, 102, 255, 0.04)",
            }}
          />

          {/* Orbital ring 1 — horizontal, slow */}
          <div
            className="absolute inset-0 animate-rotate-slow rounded-full"
            style={{
              border: "1px solid rgba(0, 255, 224, 0.12)",
              animationDuration: "20s",
            }}
          >
            {/* Dot on ring */}
            <div
              className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
              style={{ background: "#00FFE0", boxShadow: "0 0 8px #00FFE0" }}
            />
          </div>

          {/* Orbital ring 2 — tilted, medium speed */}
          <div
            className="absolute inset-[5%] animate-rotate-slow rounded-full"
            style={{
              border: "1px solid rgba(0, 102, 255, 0.15)",
              transform: "rotateX(60deg) rotateZ(20deg)",
              animationDuration: "14s",
              animationDirection: "reverse",
            }}
          >
            <div
              className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
              style={{ background: "#0066FF", boxShadow: "0 0 8px #0066FF" }}
            />
          </div>

          {/* Orbital ring 3 — perpendicular, fast */}
          <div
            className="absolute inset-[10%] animate-rotate-slow rounded-full"
            style={{
              border: "1px solid rgba(0, 255, 224, 0.08)",
              transform: "rotateY(70deg) rotateZ(-30deg)",
              animationDuration: "18s",
            }}
          >
            <div
              className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
              style={{ background: "#00FFE0", boxShadow: "0 0 6px #00FFE0", opacity: 0.7 }}
            />
          </div>

          {/* Outer halo pulse */}
          <div
            className="absolute -inset-[10%] animate-pulse-glow rounded-full"
            style={{
              border: "1px solid rgba(0, 255, 224, 0.04)",
              animationDuration: "4s",
            }}
          />

          {/* Floating particles */}
          {[
            { x: "10%", y: "20%", size: 3, delay: "0s", dur: "7s" },
            { x: "80%", y: "15%", size: 2, delay: "2s", dur: "9s" },
            { x: "85%", y: "75%", size: 2.5, delay: "1s", dur: "8s" },
            { x: "15%", y: "80%", size: 2, delay: "3s", dur: "6s" },
            { x: "50%", y: "5%", size: 1.5, delay: "4s", dur: "10s" },
            { x: "45%", y: "90%", size: 2, delay: "2.5s", dur: "7s" },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute animate-float rounded-full"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                background: i % 2 === 0 ? "#00FFE0" : "#0066FF",
                boxShadow: `0 0 ${p.size * 3}px ${i % 2 === 0 ? "#00FFE0" : "#0066FF"}`,
                opacity: 0.6,
                animationDelay: p.delay,
                animationDuration: p.dur,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* ─── MAIN CONTENT (foreground) ─── */}
      <motion.div
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
        style={{ y: contentY }}
      >
        {/* Badge */}
        <motion.div
          {...fadeSlideUp(0.3)}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2 backdrop-blur-md"
        >
          {/* Pulsing icon */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00FFE0] opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00FFE0]" />
          </span>
          <span className="text-sm font-medium tracking-wide text-gray-300">
            Solutions Digitales Sur Mesure
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          id="hero-heading"
          className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          {...fadeSlideUp(0.5)}
        >
          <span className="block text-white">Nous construisons</span>
          <span
            className="block bg-gradient-to-r from-[#00FFE0] to-[#0066FF] bg-clip-text text-transparent"
          >
            votre futur digital
          </span>
        </motion.h1>

        {/* Glow effect behind heading (separate element so glow is visible) */}
        <motion.div
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-64 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[100px]"
          style={{
            background: "linear-gradient(135deg, #00FFE0 0%, #0066FF 100%)",
          }}
          {...fadeSlideUp(0.5)}
          aria-hidden="true"
        />

        {/* Subtitle */}
        <motion.p
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl"
          {...fadeSlideUp(0.7)}
        >
          ZFX AllTech con&ccedil;oit et d&eacute;veloppe vos projets num&eacute;riques de A &agrave; Z.
          Sites web, applications, logiciels m&eacute;tier, IA et automatisations &mdash; avec la rigueur et la passion du code.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mb-14 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
          {...fadeSlideUp(0.9)}
        >
          <MagneticButton href="#contact" variant="primary">
            <span className="flex items-center gap-2">
              Lancer votre projet
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </MagneticButton>

          <MagneticButton href="#services" variant="secondary">
            D&eacute;couvrir nos services
          </MagneticButton>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="flex items-center gap-4 sm:gap-8"
          {...fadeSlideUp(1.1)}
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-4 sm:gap-8">
              {i > 0 && (
                <span
                  className="h-8 w-px bg-white/10"
                  aria-hidden="true"
                />
              )}
              <div className="text-center">
                <span className="block text-lg font-bold text-white sm:text-xl">
                  {stat.value}
                </span>
                <span className="text-xs tracking-wider text-gray-400 uppercase">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ─── SCROLL INDICATOR ─── */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <a
          href="#services"
          aria-label="Défiler vers le bas"
          className="flex flex-col items-center gap-2 text-gray-400 transition-colors hover:text-[#00FFE0]"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("services");
          }}
        >
          <span className="text-xs font-medium tracking-widest uppercase">
            Scroll
          </span>
          <motion.div style={{ y: scrollIndicatorY }}>
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
