"use client";

import { memo, useState, useRef, useCallback, useEffect, type JSX } from "react";
import { motion, useInView } from "framer-motion";
import { ANIMATION_CONFIG } from "@/lib/constants";

/* =================================================================
   CONSTANTS & TYPES
   ================================================================= */

/** Base size the orbital system is authored at (px). */
const BASE_SIZE = 600;

interface OrbitCategory {
  name: string;
  techs: string[];
  /** Orbit radius in px (relative to BASE_SIZE center). */
  radius: number;
  /** CSS animation duration. */
  duration: string;
  /** true  = counter-clockwise (animation uses negative rotation). */
  reverse: boolean;
  color: string;
  colorRgb: string;
}

const ORBITS: OrbitCategory[] = [
  {
    name: "Frontend",
    techs: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind"],
    radius: 80,
    duration: "30s",
    reverse: false,
    color: "#F59E0B",
    colorRgb: "245, 158, 11",
  },
  {
    name: "Backend",
    techs: ["Node.js", "Python", "PHP", "PostgreSQL", "MongoDB"],
    radius: 140,
    duration: "40s",
    reverse: true,
    color: "#F5A623",
    colorRgb: "245, 166, 35",
  },
  {
    name: "Mobile",
    techs: ["React Native", "Flutter", "Swift", "Kotlin"],
    radius: 200,
    duration: "50s",
    reverse: false,
    color: "#EF8A17",
    colorRgb: "239, 138, 23",
  },
  {
    name: "DevOps",
    techs: ["Docker", "AWS", "Vercel", "GitHub Actions"],
    radius: 260,
    duration: "60s",
    reverse: true,
    color: "#F97316",
    colorRgb: "249, 115, 22",
  },
];

/* =================================================================
   FRAMER MOTION VARIANTS
   ================================================================= */

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ANIMATION_CONFIG.easing.smooth },
  },
};

const orbitContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const orbitRingVariants = {
  hidden: { opacity: 0, scale: 0.2 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: ANIMATION_CONFIG.easing.smooth },
  },
};

const legendVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ANIMATION_CONFIG.easing.smooth },
  },
};

/* =================================================================
   HELPER — evenly space nodes around a circle
   ================================================================= */

function nodePosition(index: number, total: number, radius: number) {
  const angle = (2 * Math.PI * index) / total - Math.PI / 2; // start at top
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
}

/* =================================================================
   SUB-COMPONENTS
   ================================================================= */

/**
 * TechNode -- a technology label sitting on an orbit ring.
 *
 * Layout trick:
 *   The whole orbit <div> is CSS-rotated.  Each node is absolutely
 *   positioned at its start-angle.  Because the parent rotates,
 *   the node revolves around the center.  To keep the text upright
 *   we counter-rotate the inner label with the opposite animation.
 */
interface TechNodeProps {
  name: string;
  x: number;
  y: number;
  category: string;
  color: string;
  colorRgb: string;
  reverse: boolean;
  duration: string;
  isHovered: boolean;
  isPaused: boolean;
  onEnter: () => void;
  onLeave: () => void;
}

const TechNode = memo(function TechNode({
  name,
  x,
  y,
  category,
  color,
  colorRgb,
  reverse,
  duration,
  isHovered,
  isPaused,
  onEnter,
  onLeave,
}: TechNodeProps): JSX.Element {
  /*
   * Counter-rotation: if the orbit spins clockwise (orbit-cw, 0 -> 360)
   * we need to spin the label counter-clockwise (orbit-ccw, 0 -> -360)
   * and vice-versa.
   */
  const counterAnim = reverse ? "orbit-cw" : "orbit-ccw";

  return (
    <div
      className="absolute"
      style={{
        left: BASE_SIZE / 2 + x,
        top: BASE_SIZE / 2 + y,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Counter-rotation wrapper -- keeps text upright */}
      <div
        style={{
          animation: `${counterAnim} ${duration} linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        <div
          className="relative cursor-pointer pointer-events-auto"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          {/* Circle */}
          <div
            className="flex items-center justify-center rounded-full transition-all duration-300"
            style={{
              width: 44,
              height: 44,
              background: "rgba(10, 10, 10, 0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1.5px solid ${isHovered ? color : `rgba(${colorRgb}, 0.35)`}`,
              boxShadow: isHovered
                ? `0 0 16px rgba(${colorRgb}, 0.5), 0 0 40px rgba(${colorRgb}, 0.2)`
                : `0 0 6px rgba(${colorRgb}, 0.08)`,
              transform: isHovered ? "scale(1.3)" : "scale(1)",
            }}
          >
            <span
              className="whitespace-nowrap text-center font-semibold leading-none select-none"
              style={{
                fontSize: name.length > 8 ? "7px" : "8px",
                color: isHovered ? color : "rgba(240, 240, 240, 0.85)",
                letterSpacing: "0.02em",
              }}
            >
              {name}
            </span>
          </div>

          {/* Tooltip (category name) */}
          <div
            className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-200"
            style={{
              background: "rgba(5, 5, 5, 0.92)",
              border: `1px solid rgba(${colorRgb}, 0.35)`,
              color,
              backdropFilter: "blur(8px)",
              opacity: isHovered ? 1 : 0,
              transform: isHovered
                ? "translate(-50%, 0)"
                : "translate(-50%, 6px)",
            }}
          >
            {category}
            <span
              className="absolute top-full left-1/2 -translate-x-1/2"
              style={{
                width: 0,
                height: 0,
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: `5px solid rgba(${colorRgb}, 0.35)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

/**
 * OrbitRing -- one concentric orbit: the dashed track + all tech nodes.
 */
interface OrbitRingProps {
  orbit: OrbitCategory;
  hoveredTech: string | null;
  isHighlighted: boolean;
  onTechHover: (name: string | null, category?: string) => void;
}

const OrbitRing = memo(function OrbitRing({
  orbit,
  hoveredTech,
  isHighlighted,
  onTechHover,
}: OrbitRingProps): JSX.Element {
  const { radius, reverse, duration, techs, color, colorRgb, name } = orbit;
  const diameter = radius * 2;
  const orbitHasHover = techs.includes(hoveredTech ?? "");
  const isPaused = orbitHasHover;

  // Orbit rotation animation name
  const orbitAnim = reverse ? "orbit-ccw" : "orbit-cw";

  return (
    <motion.div
      variants={orbitRingVariants}
      className="absolute inset-0 pointer-events-none"
      style={{ width: BASE_SIZE, height: BASE_SIZE }}
    >
      {/* Dashed orbit track */}
      <div
        className="absolute rounded-full transition-all duration-500 pointer-events-none"
        style={{
          width: diameter,
          height: diameter,
          left: BASE_SIZE / 2 - radius,
          top: BASE_SIZE / 2 - radius,
          border: `1px dashed rgba(${colorRgb}, ${isHighlighted ? 0.5 : 0.2})`,
          boxShadow: isHighlighted
            ? `0 0 30px rgba(${colorRgb}, 0.12), inset 0 0 30px rgba(${colorRgb}, 0.06)`
            : "none",
        }}
      />

      {/* Rotating wrapper -- spins the node positions around the center */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: BASE_SIZE,
          height: BASE_SIZE,
          left: 0,
          top: 0,
          animation: `${orbitAnim} ${duration} linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {techs.map((tech, i) => {
          const pos = nodePosition(i, techs.length, radius);
          return (
            <TechNode
              key={tech}
              name={tech}
              x={pos.x}
              y={pos.y}
              category={name}
              color={color}
              colorRgb={colorRgb}
              reverse={reverse}
              duration={duration}
              isHovered={hoveredTech === tech}
              isPaused={isPaused}
              onEnter={() => onTechHover(tech, name)}
              onLeave={() => onTechHover(null)}
            />
          );
        })}
      </div>
    </motion.div>
  );
});

/**
 * MobileFallback -- pill-based categorised list for screens < 640px.
 */
function MobileFallback(): JSX.Element {
  return (
    <div className="flex flex-col gap-5 sm:hidden">
      {ORBITS.map((orbit) => (
        <motion.div
          key={orbit.name}
          variants={legendVariants}
          className="rounded-xl p-5"
          style={{
            background: "rgba(10, 10, 10, 0.6)",
            border: `1px solid rgba(${orbit.colorRgb}, 0.15)`,
          }}
        >
          <h3
            className="mb-3 text-xs font-bold tracking-widest uppercase"
            style={{ color: orbit.color }}
          >
            {orbit.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {orbit.techs.map((tech) => (
              <span
                key={tech}
                className="rounded-full px-3 py-1.5 text-xs font-medium text-gray-300"
                style={{
                  background: `rgba(${orbit.colorRgb}, 0.08)`,
                  border: `1px solid rgba(${orbit.colorRgb}, 0.2)`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* =================================================================
   MAIN COMPONENT
   ================================================================= */

const Technologies = memo(function Technologies(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });

  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [highlightedCategory, setHighlightedCategory] = useState<string | null>(null);
  const [lockedCategory, setLockedCategory] = useState<string | null>(null);
  const userInteractingRef = useRef(false);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleTechHover = useCallback((name: string | null, category?: string) => {
    setHoveredTech(name);
    if (name && category) {
      userInteractingRef.current = true;
      if (!lockedCategory) setHighlightedCategory(category);
    } else {
      userInteractingRef.current = false;
      if (!lockedCategory) setHighlightedCategory(null);
    }
  }, [lockedCategory]);

  // Auto-rotation: cycle through categories when no user interaction
  useEffect(() => {
    if (!isInView) return;

    function startAutoRotation() {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      let index = 0;
      autoTimerRef.current = setInterval(() => {
        if (userInteractingRef.current || lockedCategory) return;
        setHighlightedCategory(ORBITS[index % ORBITS.length].name);
        index++;
      }, 3000);
    }

    // Start auto-rotation after a short delay
    const delay = setTimeout(startAutoRotation, 2000);

    return () => {
      clearTimeout(delay);
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [isInView, lockedCategory]);

  const handleLegendClick = useCallback((name: string) => {
    setLockedCategory((prev) => (prev === name ? null : name));
    setHighlightedCategory(name);
  }, []);

  const handleLegendEnter = useCallback((name: string) => {
    userInteractingRef.current = true;
    if (!lockedCategory) setHighlightedCategory(name);
  }, [lockedCategory]);

  const handleLegendLeave = useCallback(() => {
    userInteractingRef.current = false;
    if (!lockedCategory) setHighlightedCategory(null);
  }, [lockedCategory]);

  // Effective highlighted: locked takes priority
  const effectiveHighlight = lockedCategory || highlightedCategory;

  return (
    <section
      id="technologies"
      ref={sectionRef}
      className="section-tech noise-overlay relative py-16"
      aria-labelledby="technologies-heading"
    >
      {/* ── Ambient background glow ── */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06] blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, #F59E0B 0%, #F97316 50%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* ─── HEADER ─── */}
        <motion.div
          className="mb-8 text-center"
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Title */}
          <motion.h2
            id="technologies-heading"
            variants={headerVariants}
            className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
          >
            <span className="text-white">Notre </span>
            <span className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
              {"\u00e9cosyst\u00e8me"}
            </span>
            <span className="text-white"> technique</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={headerVariants}
            className="mx-auto max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg"
          >
            Les technologies les plus modernes pour des solutions performantes.
          </motion.p>
        </motion.div>

        {/* ─── ORBITAL SYSTEM (tablet / desktop) ─── */}
        <motion.div
          className="hidden sm:block"
          variants={orbitContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/*
            Responsive strategy:
            Everything is authored at BASE_SIZE (600px).
            A responsive outer wrapper sets the visual size;
            CSS scale() on the inner brings it down to fit.
          */}
          <div className="relative mx-auto w-[350px] md:w-[500px] lg:w-[600px] overflow-hidden">
            {/* Maintain aspect-ratio for the wrapper */}
            <div className="pb-[100%]" />

            {/* Scaled inner — always 600x600, transforms to fit */}
            <div
              className="absolute inset-0 origin-top-left"
              style={{
                width: BASE_SIZE,
                height: BASE_SIZE,
                /* scale factor is set via CSS custom property */
              }}
            >
              <div
                className="orbit-scaler relative"
                style={{ width: BASE_SIZE, height: BASE_SIZE }}
              >
                {/* Center glow dot */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: 100,
                    height: 100,
                    background:
                      "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                {/* Center label */}
                <motion.div
                  variants={orbitRingVariants}
                  className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 select-none"
                >
                  <span
                    className="text-3xl font-extrabold tracking-[0.2em] md:text-4xl"
                    style={{
                      color: "#F59E0B",
                      textShadow:
                        "0 0 20px rgba(245,158,11,0.6), 0 0 50px rgba(245,158,11,0.3), 0 0 100px rgba(245,158,11,0.12)",
                    }}
                  >
                    ZFX
                  </span>
                </motion.div>

                {/* Orbit rings */}
                {ORBITS.map((orbit) => (
                  <OrbitRing
                    key={orbit.name}
                    orbit={orbit}
                    hoveredTech={hoveredTech}
                    isHighlighted={effectiveHighlight === orbit.name}
                    onTechHover={handleTechHover}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── MOBILE FALLBACK (< 640px) ─── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <MobileFallback />
        </motion.div>

        {/* ─── LEGEND ─── */}
        <motion.div
          className="mt-8 hidden flex-wrap justify-center gap-6 sm:flex sm:gap-8"
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {ORBITS.map((orbit) => {
            const isActive = effectiveHighlight === orbit.name;
            const isDimmed = effectiveHighlight && effectiveHighlight !== orbit.name;
            const isLocked = lockedCategory === orbit.name;

            return (
              <motion.button
                key={orbit.name}
                variants={legendVariants}
                type="button"
                className="flex cursor-pointer items-center gap-3 rounded-full border px-6 py-3 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  opacity: isDimmed ? 0.55 : 1,
                  borderColor: isActive
                    ? `rgba(${orbit.colorRgb}, 0.5)`
                    : "rgba(255,255,255,0.06)",
                  background: isActive
                    ? `rgba(${orbit.colorRgb}, 0.08)`
                    : "rgba(255,255,255,0.03)",
                  boxShadow: isActive
                    ? `0 0 20px rgba(${orbit.colorRgb}, 0.2)`
                    : "none",
                  outlineColor: orbit.color,
                }}
                onClick={() => handleLegendClick(orbit.name)}
                onMouseEnter={() => handleLegendEnter(orbit.name)}
                onMouseLeave={handleLegendLeave}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: isLocked ? "transparent" : orbit.color,
                    border: isLocked ? `2px solid ${orbit.color}` : "2px solid transparent",
                    boxShadow: `0 0 8px rgba(${orbit.colorRgb}, 0.5)`,
                    transform: isActive ? "scale(1.3)" : "scale(1)",
                  }}
                />
                <span
                  className="text-sm font-medium transition-colors duration-300"
                  style={{ color: isActive ? orbit.color : "rgb(209, 213, 219)" }}
                >
                  {orbit.name}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
});

Technologies.displayName = "Technologies";

export default Technologies;
