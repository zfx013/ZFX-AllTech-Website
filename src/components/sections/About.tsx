"use client";

import { memo, useRef, useState, type JSX } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ANIMATION_CONFIG } from "@/lib/constants";

/* =================================================================
   CONSTANTS
   ================================================================= */

/** Manifesto sentences — each word is revealed individually on scroll */
const MANIFESTO_SENTENCES = [
  { text: "Nous sommes ZFX AllTech.", keyword: "ZFX AllTech" },
  {
    text: "Une équipe passionnée par le code, obsédée par la qualité.",
    keyword: "qualité",
  },
  {
    text: "Chaque projet est une mission. Chaque client est un partenaire.",
    keyword: "partenaire",
  },
  { text: "Du sur-mesure. Toujours.", keyword: "Toujours" },
] as const;

/** Flatten all words with their sentence index for scroll mapping */
interface ManifestoWord {
  word: string;
  sentenceIndex: number;
  isKeyword: boolean;
  /** Is this the last word in its sentence? (includes trailing punctuation) */
  isLast: boolean;
}

function buildManifestoWords(): ManifestoWord[] {
  const words: ManifestoWord[] = [];
  MANIFESTO_SENTENCES.forEach((sentence, si) => {
    const parts = sentence.text.split(/\s+/);
    parts.forEach((word, wi) => {
      // Check if this word (stripped of punctuation) matches the keyword
      const stripped = word.replace(/[.,!?;:]/g, "");
      // Also handle multi-word keywords like "ZFX AllTech"
      const isKeyword =
        sentence.keyword.split(/\s+/).includes(stripped) ||
        stripped === sentence.keyword.replace(/\s+/g, "");
      words.push({
        word,
        sentenceIndex: si,
        isKeyword,
        isLast: wi === parts.length - 1,
      });
    });
  });
  return words;
}

const MANIFESTO_WORDS = buildManifestoWords();

/** Key figures data */
interface KeyFigure {
  value: string;
  label: string;
  /** Progress ratio 0..1 for the SVG circle fill */
  progress: number;
}

const KEY_FIGURES: KeyFigure[] = [
  { value: "100%", label: "Sur mesure", progress: 1.0 },
  { value: "24h", label: "Temps de réponse", progress: 0.92 },
  { value: "5+", label: "Années d'expertise", progress: 0.5 },
  { value: "\u221E", label: "Engagement", progress: 1.0 },
];

/** Value words */
const VALUES = ["Précision.", "Innovation.", "Ambition."] as const;

/* =================================================================
   CIRCLE SVG CONSTANTS
   ================================================================= */

const CIRCLE_SIZE = 120;
const CIRCLE_STROKE = 3;
const CIRCLE_RADIUS = (CIRCLE_SIZE - CIRCLE_STROKE) / 2;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

/* =================================================================
   SUB-COMPONENTS
   ================================================================= */

/**
 * ManifestoText — scroll-driven word-by-word reveal.
 * Each word transitions from invisible/muted to visible/bright as the user scrolls.
 */
function ManifestoText(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.2"],
  });

  return (
    <div ref={containerRef} className="relative py-16 sm:py-24">
      <p className="mx-auto max-w-4xl text-3xl font-light leading-relaxed sm:text-4xl lg:text-5xl lg:leading-relaxed">
        {MANIFESTO_WORDS.map((item, i) => (
          <ManifestoWordSpan
            key={i}
            item={item}
            index={i}
            total={MANIFESTO_WORDS.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </p>
    </div>
  );
}

/**
 * A single word in the manifesto that reacts to scroll position.
 */
interface ManifestoWordSpanProps {
  item: ManifestoWord;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function ManifestoWordSpan({
  item,
  index,
  total,
  scrollYProgress,
}: ManifestoWordSpanProps): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  // Each word maps to a narrow band of scroll progress
  const wordStart = index / total;
  const wordEnd = (index + 1) / total;

  // Opacity: 0.15 -> 1.0 as scroll passes through this word's range
  // When reduced motion is preferred, show all words at full opacity
  const opacity = useTransform(
    scrollYProgress,
    [wordStart, wordEnd],
    prefersReducedMotion ? [1, 1] : [0.15, 1]
  );

  // If keyword, we set up a gradient reveal. Otherwise just color transition.
  if (item.isKeyword) {
    return (
      <>
        <motion.span
          className="inline-block will-change-[opacity]"
          style={{
            opacity,
            background: "linear-gradient(135deg, #94A3B8, #ffffff)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 600,
          }}
        >
          {item.word}
        </motion.span>
        {!item.isLast && <span>&nbsp;</span>}
        {item.isLast && <br className="hidden lg:block" />}
      </>
    );
  }

  return (
    <>
      <motion.span
        className="inline-block text-[var(--fg)] will-change-[opacity]"
        style={{ opacity }}
      >
        {item.word}
      </motion.span>
      {!item.isLast && <span>&nbsp;</span>}
      {item.isLast && <br className="hidden lg:block" />}
    </>
  );
}

/**
 * ProgressCircle — an SVG ring that draws itself when visible.
 */
interface ProgressCircleProps {
  figure: KeyFigure;
  index: number;
}

function ProgressCircle({ figure, index }: ProgressCircleProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const dashOffset = CIRCLE_CIRCUMFERENCE * (1 - figure.progress);

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}>
        <svg
          width={CIRCLE_SIZE}
          height={CIRCLE_SIZE}
          viewBox={`0 0 ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}
          className="block -rotate-90"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id={`circle-gradient-${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>

          {/* Background track */}
          <circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={CIRCLE_RADIUS}
            fill="none"
            stroke="rgba(148,163,184,0.1)"
            strokeWidth={CIRCLE_STROKE}
          />

          {/* Animated progress arc */}
          <motion.circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={CIRCLE_RADIUS}
            fill="none"
            stroke={`url(#circle-gradient-${index})`}
            strokeWidth={CIRCLE_STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCLE_CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCLE_CIRCUMFERENCE }}
            animate={
              isInView
                ? { strokeDashoffset: dashOffset }
                : { strokeDashoffset: CIRCLE_CIRCUMFERENCE }
            }
            transition={{
              duration: 2,
              delay: index * 0.2,
              ease: [0.25, 0.1, 0.25, 1.0],
            }}
          />
        </svg>

        {/* Centered value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-xl font-bold text-[var(--fg)] sm:text-2xl"
            style={
              figure.value === "\u221E"
                ? { fontSize: "2rem", lineHeight: 1 }
                : undefined
            }
          >
            {figure.value}
          </span>
        </div>
      </div>

      {/* Label */}
      <span className="text-sm tracking-wide text-[var(--muted)]">
        {figure.label}
      </span>
    </div>
  );
}

/**
 * ValueWord — a massive word that scales in and gains an expanding underline on scroll.
 */
interface ValueWordProps {
  word: string;
  index: number;
}

function ValueWord({ word, index }: ValueWordProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Scroll-driven underline width
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.55"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["100%", "100%"] : ["0%", "100%"]);

  return (
    <div
      ref={ref}
      className="relative py-6 sm:py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.h3
        className="cursor-default text-6xl font-[800] tracking-tight transition-colors duration-500 sm:text-7xl lg:text-8xl"
        style={{
          color: isHovered ? "var(--fg)" : "var(--muted)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          isInView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.8 }
        }
        transition={{
          duration: 0.8,
          delay: index * 0.15,
          ease: ANIMATION_CONFIG.easing.smooth,
        }}
      >
        {word}
      </motion.h3>

      {/* Expanding underline */}
      <motion.div
        className="mt-3 h-px origin-left sm:mt-4"
        style={{
          width: lineWidth,
          background: "linear-gradient(90deg, #94A3B8, #ffffff)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

/* =================================================================
   MAIN COMPONENT
   ================================================================= */

const About = memo(function About(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-about noise-overlay relative overflow-hidden py-40"
      aria-labelledby="about-heading"
    >
      {/* ─── Ambient glow ─── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, #94A3B8 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        {/* ─── Screen-reader heading ─── */}
        <h2 id="about-heading" className="sr-only">
          &Agrave; propos de ZFX AllTech
        </h2>

        {/* ========================================
            PART 1 — MANIFESTO (scroll-driven reveal)
            ======================================== */}
        <ManifestoText />

        {/* ========================================
            PART 2 — KEY FIGURES (SVG progress circles)
            ======================================== */}
        <motion.div
          className="py-20 sm:py-28"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: ANIMATION_CONFIG.duration.slow,
            ease: ANIMATION_CONFIG.easing.smooth,
          }}
        >
          <div className="grid grid-cols-2 place-items-center gap-12 sm:gap-16 lg:grid-cols-4">
            {KEY_FIGURES.map((figure, i) => (
              <ProgressCircle key={figure.label} figure={figure} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ========================================
            PART 3 — VALUES (massive words)
            ======================================== */}
        <div className="flex flex-col items-start gap-2 py-20 sm:py-28">
          {VALUES.map((word, i) => (
            <ValueWord key={word} word={word} index={i} />
          ))}
        </div>

        {/* ========================================
            PART 4 — CLOSING STATEMENT
            ======================================== */}
        <motion.div
          className="pt-16 pb-8 text-center sm:pt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: ANIMATION_CONFIG.easing.smooth,
          }}
        >
          <p className="text-xl italic leading-relaxed text-[var(--muted)]">
            &ldquo;Le code est notre art. Votre succ&egrave;s est notre
            signature.&rdquo;
          </p>
          <p className="mt-4 text-sm tracking-wide text-[var(--muted)]">
            Luis Filipe PINTO SECA &mdash; Fondateur &amp; Pr&eacute;sident
          </p>
        </motion.div>
      </div>
    </section>
  );
});

About.displayName = "About";

export default About;
