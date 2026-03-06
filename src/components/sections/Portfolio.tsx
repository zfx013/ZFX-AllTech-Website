"use client";

import { memo, useRef, useState, type JSX } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type Variants,
} from "framer-motion";
import { Code, ExternalLink, ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { ANIMATION_CONFIG } from "@/lib/constants";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

/* ================================================================
   DATA
   ================================================================ */

interface Project {
  number: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  /** URL réelle du projet — si fourni, le CTA pointe vers ce lien */
  url?: string;
  /** Chemin vers une capture d'écran du projet (dans /public) */
  image?: string;
}

const PROJECTS: Project[] = [
  {
    number: "01",
    category: "Site Web Corporate",
    title: "SocialSoft",
    description:
      "Site vitrine pour SocialSoft, partenaire IT proposant infog\u00e9rance, cybers\u00e9curit\u00e9 et d\u00e9veloppement sur mesure aux TPE/PME d\u2019\u00cele-de-France.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    gradient: "from-indigo-500/10 to-violet-500/10",
    gradientFrom: "#6366F1",
    gradientTo: "#8B5CF6",
    accentColor: "#6366F1",
    url: "https://www.socialsoft.fr/",
    image: "/projects/socialsoft.png",
  },
  {
    number: "02",
    category: "Outil de Devis",
    title: "Cuvée Privée",
    description:
      "Système de devis personnalisé pour un caviste haut de gamme : sélection de vins, composition de coffrets cadeaux, calcul de prix en temps réel et export PDF.",
    tags: ["JavaScript", "Responsive", "PDF Export", "UX"],
    gradient: "from-amber-500/10 to-red-900/10",
    gradientFrom: "#C4A265",
    gradientTo: "#722F37",
    accentColor: "#C4A265",
    url: "https://zfx013.github.io/cureepriveedevis/",
    image: "/projects/cuveeprivee.png",
  },
  {
    number: "03",
    category: "Logiciel Métier",
    title: "CloudSync CRM",
    description:
      "CRM sur mesure avec automatisation des workflows, reporting avancé et intégrations API.",
    tags: ["Next.js", "Python", "AWS"],
    gradient: "from-blue-500/10 to-cyan-500/10",
    gradientFrom: "#3B82F6",
    gradientTo: "#06B6D4",
    accentColor: "#3B82F6",
  },
];

/* ================================================================
   ANIMATION VARIANTS
   ================================================================ */

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
};

const tagVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
};

/* ================================================================
   PROJECT SCREENSHOT (fake browser mockup with 3D hover)
   ================================================================ */

interface ProjectScreenshotProps {
  project: Project;
}

const ProjectScreenshot = memo(function ProjectScreenshot({
  project,
}: ProjectScreenshotProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group/screen relative"
      style={{ perspective: 1000 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/[0.06] shadow-2xl"
        animate={{
          rotateY: isHovered ? 5 : 0,
          rotateX: isHovered ? -5 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.8,
        }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#0a0a0a]/80 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-3 flex-1 rounded-md bg-white/[0.04] px-3 py-1 text-center font-mono text-[10px] text-gray-500 sm:text-xs">
            {project.url
              ? project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
              : `${project.title.toLowerCase().replace(/\s+/g, "-")}.app`}
          </span>
        </div>

        {/* Screenshot area */}
        <div
          className="relative flex aspect-[16/10] items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.gradientFrom}15, ${project.gradientTo}15)`,
          }}
        >
          {project.image ? (
            <>
              {/* Real screenshot */}
              <img
                src={project.image}
                alt={`Aperçu de ${project.title}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/screen:opacity-100"
                style={{
                  background: `radial-gradient(circle at center, ${project.accentColor}30, ${project.accentColor}08 70%)`,
                }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full border sm:h-16 sm:w-16"
                  style={{
                    borderColor: `${project.accentColor}40`,
                    background: `${project.accentColor}15`,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <ExternalLink
                    size={24}
                    style={{ color: project.accentColor }}
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage: `
                    linear-gradient(${project.gradientFrom}40 1px, transparent 1px),
                    linear-gradient(90deg, ${project.gradientFrom}40 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
                aria-hidden="true"
              />

              {/* Decorative UI elements inside the screenshot */}
              <div className="relative z-10 flex w-full max-w-[80%] flex-col gap-3 px-4 py-6 sm:gap-4 sm:px-8">
                {/* Fake nav bar */}
                <div className="flex items-center justify-between">
                  <div
                    className="h-2 w-16 rounded-full sm:h-2.5 sm:w-20"
                    style={{ background: `${project.accentColor}30` }}
                  />
                  <div className="flex gap-2 sm:gap-3">
                    <div
                      className="h-2 w-8 rounded-full sm:h-2.5 sm:w-10"
                      style={{ background: `${project.accentColor}20` }}
                    />
                    <div
                      className="h-2 w-8 rounded-full sm:h-2.5 sm:w-10"
                      style={{ background: `${project.accentColor}20` }}
                    />
                    <div
                      className="h-2 w-8 rounded-full sm:h-2.5 sm:w-10"
                      style={{ background: `${project.accentColor}20` }}
                    />
                  </div>
                </div>

                {/* Fake content blocks */}
                <div className="mt-2 flex gap-3 sm:mt-4 sm:gap-4">
                  <div className="flex flex-1 flex-col gap-2 sm:gap-3">
                    <div
                      className="h-3 w-3/4 rounded sm:h-4"
                      style={{ background: `${project.accentColor}25` }}
                    />
                    <div
                      className="h-2 w-full rounded sm:h-3"
                      style={{ background: `${project.accentColor}12` }}
                    />
                    <div
                      className="h-2 w-5/6 rounded sm:h-3"
                      style={{ background: `${project.accentColor}12` }}
                    />
                    <div
                      className="mt-1 h-6 w-20 rounded-md sm:mt-2 sm:h-8 sm:w-24"
                      style={{ background: `${project.accentColor}20` }}
                    />
                  </div>
                  <div
                    className="hidden h-24 w-24 rounded-xl sm:block sm:h-28 sm:w-28 lg:h-32 lg:w-32"
                    style={{
                      background: `linear-gradient(135deg, ${project.gradientFrom}20, ${project.gradientTo}20)`,
                      border: `1px solid ${project.accentColor}15`,
                    }}
                  />
                </div>

                {/* Fake chart / data area */}
                <div className="mt-1 flex items-end gap-1 sm:mt-2 sm:gap-1.5">
                  {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm"
                        style={{
                          height: `${h * 0.4}px`,
                          background: `linear-gradient(180deg, ${project.gradientFrom}30, ${project.gradientTo}10)`,
                        }}
                      />
                    ),
                  )}
                </div>
              </div>

              {/* Center icon overlay */}
              <div
                className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/screen:opacity-100"
                style={{
                  background: `radial-gradient(circle at center, ${project.accentColor}10, transparent 70%)`,
                }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full border sm:h-16 sm:w-16"
                  style={{
                    borderColor: `${project.accentColor}40`,
                    background: `${project.accentColor}15`,
                  }}
                >
                  <Code
                    size={24}
                    style={{ color: project.accentColor }}
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Shadow glow */}
      <div
        className="absolute -inset-4 -z-10 rounded-3xl opacity-0 blur-2xl transition-opacity duration-500 group-hover/screen:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${project.gradientFrom}08, ${project.gradientTo}08)`,
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
});

ProjectScreenshot.displayName = "ProjectScreenshot";

/* ================================================================
   PROJECT SLIDE
   ================================================================ */

interface ProjectSlideProps {
  project: Project;
  index: number;
}

const ProjectSlide = memo(function ProjectSlide({
  project,
  index,
}: ProjectSlideProps): JSX.Element {
  const slideRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(slideRef, { once: true, margin: "-10%" });
  const isEven = index % 2 === 0;
  const { scrollToSection } = useSmoothScroll();

  /* Parallax for the giant number */
  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ["start end", "end start"],
  });

  const numberY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <div
      ref={slideRef}
      className="relative flex min-h-[80vh] items-center overflow-hidden"
    >
      {/* Slide background gradient */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
        />

        {/* Subtle radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background: isEven
              ? `radial-gradient(ellipse 60% 50% at 25% 50%, ${project.gradientFrom}06, transparent 70%)`
              : `radial-gradient(ellipse 60% 50% at 75% 50%, ${project.gradientFrom}06, transparent 70%)`,
          }}
        />
      </motion.div>

      {/* Giant number (background) */}
      <motion.span
        className="pointer-events-none absolute select-none font-black leading-none"
        style={{
          y: numberY,
          fontSize: "clamp(150px, 25vw, 320px)",
          color: `${project.accentColor}`,
          opacity: 0.05,
          ...(isEven
            ? { left: "5%", top: "50%", translateY: "-50%" }
            : { right: "5%", top: "50%", translateY: "-50%" }),
        }}
        aria-hidden="true"
      >
        {project.number}
      </motion.span>

      {/* Content wrapper */}
      <motion.div
        className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:gap-16 lg:px-8"
        style={{
          gridTemplateColumns: "1fr",
          y: contentY,
        }}
      >
        <div
          className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
            !isEven ? "lg:[direction:rtl]" : ""
          }`}
        >
          {/* Text content */}
          <motion.div
            className={`flex flex-col ${!isEven ? "lg:[direction:ltr]" : ""}`}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Category */}
            <motion.span
              variants={fadeUp}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] sm:mb-4 sm:text-sm"
              style={{ color: project.accentColor }}
            >
              {project.category}
            </motion.span>

            {/* Title */}
            <motion.h3
              variants={isEven ? fadeLeft : fadeRight}
              className="mb-4 text-4xl font-bold leading-tight tracking-tight text-[var(--fg)] sm:text-5xl lg:text-6xl"
            >
              {project.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mb-6 max-w-lg text-base leading-relaxed text-[var(--muted)] sm:mb-8 sm:text-lg"
            >
              {project.description}
            </motion.p>

            {/* Tech tags */}
            <motion.div
              className="mb-8 flex flex-wrap gap-2 sm:gap-3"
              variants={staggerContainer}
            >
              {project.tags.map((tag) => (
                <motion.span
                  key={tag}
                  variants={tagVariant}
                  className="rounded-full border px-3 py-1.5 text-xs font-medium sm:px-4 sm:text-sm"
                  style={{
                    borderColor: `${project.accentColor}25`,
                    color: project.accentColor,
                    background: `${project.accentColor}08`,
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Action buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 sm:px-6 sm:py-3 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
                    boxShadow: `0 0 20px ${project.accentColor}20`,
                  }}
                >
                  Voir le site
                  <ExternalLink
                    size={16}
                    className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
                  />
                </a>
              ) : (
                <a
                  href="#contact"
                  className="group/btn inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 sm:px-6 sm:py-3 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
                    boxShadow: `0 0 20px ${project.accentColor}20`,
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                  }}
                >
                  Discuter d&apos;un projet similaire
                  <ExternalLink
                    size={16}
                    className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
                  />
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Screenshot */}
          <motion.div
            className={`${!isEven ? "lg:[direction:ltr]" : ""}`}
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <ProjectScreenshot project={project} />
              </a>
            ) : (
              <ProjectScreenshot project={project} />
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom separator line */}
      <div
        className="absolute bottom-0 left-1/2 h-px w-[80%] -translate-x-1/2"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accentColor}15, transparent)`,
        }}
        aria-hidden="true"
      />
    </div>
  );
});

ProjectSlide.displayName = "ProjectSlide";

/* ================================================================
   MAIN PORTFOLIO SECTION
   ================================================================ */

const Portfolio = memo(function Portfolio(): JSX.Element {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10%" });

  return (
    <section
      id="portfolio"
      className="section-portfolio noise-overlay relative overflow-hidden py-32"
      aria-labelledby="portfolio-heading"
    >
      {/* ---- Section header ---- */}
      <div
        ref={headerRef}
        className="relative z-10 mx-auto mb-16 max-w-7xl px-4 text-center sm:mb-24 sm:px-6 lg:px-8"
      >
        <motion.span
          className="mb-4 inline-block rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
          style={{
            borderColor: "rgba(244, 63, 94, 0.3)",
            color: "#F43F5E",
            background: "rgba(244, 63, 94, 0.08)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
        >
          Portfolio
        </motion.span>

        <motion.h2
          id="portfolio-heading"
          className="mb-4 text-4xl font-bold tracking-tight text-[var(--fg)] sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Nos{" "}
          <span
            className="inline-block"
            style={{
              background: "linear-gradient(135deg, #F43F5E, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            réalisations
          </span>
        </motion.h2>

        <motion.p
          className="mx-auto max-w-xl text-base text-[var(--muted)] md:text-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Des projets ambitieux, livrés avec précision. Découvrez comment nous
          transformons les idées en produits digitaux performants.
        </motion.p>
      </div>

      {/* ---- Project slides ---- */}
      <div className="flex flex-col">
        {PROJECTS.map((project, i) => (
          <ProjectSlide key={project.number} project={project} index={i} />
        ))}
      </div>

      {/* ---- Bottom CTA ---- */}
      <div className="relative z-10 mx-auto mt-20 max-w-7xl px-4 text-center sm:mt-32 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: ANIMATION_CONFIG.easing.smooth }}
        >
          <p className="mb-6 text-lg font-medium text-[var(--muted)] sm:mb-8 sm:text-xl">
            Votre projet pourrait être le prochain.
          </p>
          <MagneticButton href="#contact" variant="primary">
            <span className="flex items-center gap-2">
              Discutons de votre projet
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
});

Portfolio.displayName = "Portfolio";

export default Portfolio;
