"use client";

import { memo, useRef, useState, useEffect, type JSX } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  type Variants,
  type MotionValue,
} from "framer-motion";
import {
  Search,
  Palette,
  Code2,
  TestTube,
  Rocket,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import MeshGradient from "@/components/effects/MeshGradient";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

interface ProcessStep {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  iconAnimation: "pulse" | "rotate" | "bounce" | "wiggle" | "float" | "ping";
}

const STEPS: ProcessStep[] = [
  {
    number: "01",
    icon: Search,
    title: "Découverte",
    description:
      "Nous analysons vos besoins, votre marché et vos objectifs pour définir la meilleure stratégie.",
    iconAnimation: "pulse",
  },
  {
    number: "02",
    icon: Palette,
    title: "Design",
    description:
      "Maquettes et prototypes interactifs. Vous validez chaque écran avant le développement.",
    iconAnimation: "rotate",
  },
  {
    number: "03",
    icon: Code2,
    title: "Développement",
    description:
      "Code propre, testé, documenté. Méthodologie agile avec livraisons régulières.",
    iconAnimation: "bounce",
  },
  {
    number: "04",
    icon: TestTube,
    title: "Tests",
    description:
      "Tests unitaires, d'intégration et de charge. Votre projet est solide avant la mise en ligne.",
    iconAnimation: "wiggle",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Déploiement",
    description:
      "Mise en production, configuration serveur, monitoring. Lancement en douceur.",
    iconAnimation: "float",
  },
  {
    number: "06",
    icon: HeartHandshake,
    title: "Support",
    description:
      "Maintenance, évolutions, support réactif. Nous restons à vos côtés.",
    iconAnimation: "ping",
  },
];

/* ------------------------------------------------------------------ */
/*  Icon micro-animation variants                                     */
/* ------------------------------------------------------------------ */

const iconAnimations: Record<ProcessStep["iconAnimation"], Variants> = {
  pulse: {
    idle: { scale: 1 },
    active: {
      scale: [1, 1.2, 1],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  },
  rotate: {
    idle: { rotate: 0 },
    active: {
      rotate: [0, 15, -15, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  },
  bounce: {
    idle: { y: 0 },
    active: {
      y: [0, -4, 0],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
    },
  },
  wiggle: {
    idle: { rotate: 0 },
    active: {
      rotate: [0, -8, 8, -8, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  },
  float: {
    idle: { y: 0 },
    active: {
      y: [0, -6, 0],
      transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
    },
  },
  ping: {
    idle: { scale: 1, opacity: 1 },
    active: {
      scale: [1, 1.15, 1],
      opacity: [1, 0.7, 1],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Card slide-in variants                                            */
/* ------------------------------------------------------------------ */

function buildSlideVariants(side: "left" | "right"): Variants {
  const x = side === "left" ? -60 : 60;
  return {
    hidden: { opacity: 0, x },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };
}

const nodeVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Single timeline step                                              */
/* ------------------------------------------------------------------ */

interface TimelineStepProps {
  step: ProcessStep;
  index: number;
  isReached: boolean;
}

const TimelineStep = memo(function TimelineStep({
  step,
  index,
  isReached,
}: TimelineStepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const cardOnRight = index % 2 === 1;
  const side: "left" | "right" = cardOnRight ? "right" : "left";

  const Icon = step.icon;

  return (
    <div
      ref={ref}
      className="relative grid items-center gap-4 grid-cols-[40px_1fr] md:grid-cols-[1fr_40px_1fr]"
    >
      {/* ---- Content panel ---- */}
      <motion.div
        className={`order-2 ${cardOnRight ? "md:order-3" : "md:order-1"}`}
        variants={buildSlideVariants(side)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="glass relative overflow-hidden rounded-2xl p-6 md:p-8">
          {/* Background step number */}
          <span
            className="pointer-events-none absolute -top-4 right-4 select-none text-[7rem] font-black leading-none"
            style={{ color: "rgba(16, 185, 129, 0.05)" }}
            aria-hidden="true"
          >
            {step.number}
          </span>

          <div className="relative z-10">
            <h3 className="mb-2 text-xl font-bold text-[var(--fg)] md:text-2xl">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--muted)] md:text-base">
              {step.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ---- Node on the line (always order-2 = center column) ---- */}
      <motion.div
        className="order-1 md:order-2 z-10 flex items-center justify-center"
        variants={nodeVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div
          className="relative flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500"
          style={{
            borderColor: isReached ? "#10B981" : "var(--border)",
            background: isReached ? "#071f16" : "var(--bg)",
            boxShadow: `0 0 0 6px var(--bg)`,
          }}
        >
          <motion.span
            variants={iconAnimations[step.iconAnimation]}
            initial="idle"
            animate={isReached ? "active" : "idle"}
            className="relative z-10"
          >
            <Icon
              size={18}
              strokeWidth={2}
              style={{
                color: isReached ? "#10B981" : "var(--muted)",
                transition: "color 0.5s ease",
              }}
            />
          </motion.span>
        </div>
      </motion.div>

      {/* ---- Spacer for the opposite side (desktop only) ---- */}
      <div
        className={`hidden md:block ${cardOnRight ? "md:order-1" : "md:order-3"}`}
        aria-hidden="true"
      />
    </div>
  );
});

TimelineStep.displayName = "TimelineStep";

/* ------------------------------------------------------------------ */
/*  Main Process section                                              */
/* ------------------------------------------------------------------ */

const Process = memo(function Process(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  /* Scroll-linked timeline progress */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Map scroll progress to a 0-100% scaleY for the fill line */
  const lineScaleY = useTransform(scrollYProgress, [0.08, 0.72], prefersReducedMotion ? [1, 1] : [0, 1]);

  /* Derive which steps are "reached" based on scroll progress */
  /* Each step is reached when progress > (index + 1) / (total + 1) */
  const stepThresholds = STEPS.map((_, i) => (i + 1) / (STEPS.length + 1));

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section-process noise-overlay relative overflow-hidden py-32"
      aria-labelledby="process-heading"
    >
      {/* Background mesh gradient */}
      <MeshGradient
        colors={["#10B981", "#14B8A6"]}
        opacity={0.08}
        className="z-0"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ---- Header ---- */}
        <div className="mb-20 text-center md:mb-28">
          <motion.span
            className="mb-4 inline-block rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{
              borderColor: "rgba(16, 185, 129, 0.3)",
              color: "#10B981",
              background: "rgba(16, 185, 129, 0.08)",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Notre Processus
          </motion.span>

          <motion.h2
            id="process-heading"
            className="mb-4 text-4xl font-bold tracking-tight text-[var(--fg)] sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {"De l'idée au "}
            <span
              className="inline-block"
              style={{
                background: "linear-gradient(135deg, #10B981, #14B8A6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              lancement
            </span>
          </motion.h2>

          <motion.p
            className="mx-auto max-w-xl text-base text-[var(--muted)] md:text-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Six étapes claires pour transformer votre vision en un produit
            digital performant, sans mauvaise surprise.
          </motion.p>
        </div>

        {/* ---- Timeline ---- */}
        <div className="relative">
          {/* Vertical base line (grey track) */}
          <div
            className="absolute hidden md:block"
            style={{
              left: "50%",
              top: 0,
              bottom: 0,
              width: 2,
              transform: "translateX(-50%)",
              background: "var(--border)",
            }}
            aria-hidden="true"
          />

          {/* Mobile vertical base line (left-aligned) */}
          <div
            className="absolute block md:hidden"
            style={{
              left: 19,
              top: 0,
              bottom: 0,
              width: 2,
              background: "var(--border)",
            }}
            aria-hidden="true"
          />

          {/* Vertical progress fill line (desktop center) */}
          <motion.div
            className="absolute hidden md:block"
            style={{
              left: "50%",
              top: 0,
              bottom: 0,
              width: 2,
              transform: "translateX(-50%)",
              transformOrigin: "top",
              scaleY: lineScaleY,
              background: "linear-gradient(180deg, #10B981, #14B8A6)",
            }}
            aria-hidden="true"
          />

          {/* Vertical progress fill line (mobile left) */}
          <motion.div
            className="absolute block md:hidden"
            style={{
              left: 19,
              top: 0,
              bottom: 0,
              width: 2,
              transformOrigin: "top",
              scaleY: lineScaleY,
              background: "linear-gradient(180deg, #10B981, #14B8A6)",
            }}
            aria-hidden="true"
          />

          {/* Steps */}
          <div className="relative flex flex-col gap-16 md:gap-24">
            {STEPS.map((step, i) => (
              <TimelineStepWithProgress
                key={step.number}
                step={step}
                index={i}
                scrollYProgress={scrollYProgress}
                threshold={stepThresholds[i]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Process.displayName = "Process";

/* ------------------------------------------------------------------ */
/*  Wrapper that observes scroll progress for "reached" state         */
/* ------------------------------------------------------------------ */

interface TimelineStepWithProgressProps {
  step: ProcessStep;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  threshold: number;
}

function TimelineStepWithProgress({
  step,
  index,
  scrollYProgress,
  threshold,
}: TimelineStepWithProgressProps) {
  const reached = useTransform(scrollYProgress, (v) => v >= threshold);

  /* We need a state boolean to pass down. useMotionValueEvent is fine,
     but to keep it simple we use useTransform + a state trick. */
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div ref={ref}>
      <TimelineStepReached
        step={step}
        index={index}
        reachedMV={reached}
        isInView={isInView}
      />
    </div>
  );
}

/* Tiny wrapper to subscribe to the motion value and convert to boolean state */

function TimelineStepReached({
  step,
  index,
  reachedMV,
  isInView,
}: {
  step: ProcessStep;
  index: number;
  reachedMV: MotionValue<boolean>;
  isInView: boolean;
}) {
  const [isReached, setIsReached] = useState(false);

  useEffect(() => {
    const unsub = reachedMV.on("change", (v) => {
      if (v) setIsReached(true);
    });
    // Check initial value
    if (reachedMV.get()) setIsReached(true);
    return unsub;
  }, [reachedMV]);

  return (
    <TimelineStep
      step={step}
      index={index}
      isReached={isReached || isInView}
    />
  );
}

export default Process;
