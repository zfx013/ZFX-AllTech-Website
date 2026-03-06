"use client";

import { useState, useCallback, useRef, type JSX } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  Globe,
  ShoppingCart,
  Smartphone,
  Server,
  Cog,
  Code2,
  Workflow,
  BarChart3,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { ANIMATION_CONFIG } from "@/lib/constants";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

/* =================================================================
   DATA — 8 services with constellation positions
   ================================================================= */

interface ServiceNode {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
  tags: string[];
  /** Position in the constellation as % of container */
  x: number;
  y: number;
  /** Detail panel placement relative to node */
  panelSide: "left" | "right";
}

const SERVICES: ServiceNode[] = [
  {
    id: "web",
    icon: Globe,
    label: "Sites Web",
    description: "Sites vitrines, corporate, landing pages et portails institutionnels. Optimisation SEO, performances Core Web Vitals et design responsive sur tous les supports.",
    tags: ["Responsive", "SEO", "Core Web Vitals", "Accessibilité"],
    x: 15,
    y: 18,
    panelSide: "right",
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    label: "E-Commerce",
    description: "Boutiques en ligne complètes avec catalogue produits, gestion de stock, paiement sécurisé Stripe, suivi de commandes et programme fidélité.",
    tags: ["Stripe", "Catalogue", "Checkout", "Gestion stock"],
    x: 48,
    y: 6,
    panelSide: "left",
  },
  {
    id: "mobile",
    icon: Smartphone,
    label: "Apps Mobiles",
    description: "Applications iOS et Android natives ou cross-platform. Notifications push, mode hors-ligne, géolocalisation et publication sur les stores.",
    tags: ["React Native", "Flutter", "PWA", "Stores"],
    x: 80,
    y: 14,
    panelSide: "left",
  },
  {
    id: "webapp",
    icon: Server,
    label: "Apps Web",
    description: "Plateformes SaaS, dashboards interactifs et portails clients. Authentification sécurisée, gestion des rôles et mises à jour en temps réel.",
    tags: ["Next.js", "Auth", "Temps réel", "Multi-tenant"],
    x: 8,
    y: 52,
    panelSide: "right",
  },
  {
    id: "software",
    icon: Cog,
    label: "Logiciels Métier",
    description: "Solutions sur mesure adaptées à vos processus : ERP, CRM, outils de gestion interne. Automatisation des tâches répétitives et intégration à votre SI existant.",
    tags: ["ERP", "CRM", "Sur mesure", "Intégration SI"],
    x: 38,
    y: 44,
    panelSide: "right",
  },
  {
    id: "api",
    icon: Code2,
    label: "APIs",
    description: "Conception et développement d\u2019APIs REST et GraphQL robustes. Documentation Swagger, webhooks, rate limiting et intégrations avec vos outils tiers.",
    tags: ["REST", "GraphQL", "Webhooks", "Swagger"],
    x: 72,
    y: 48,
    panelSide: "left",
  },
  {
    id: "automation",
    icon: Workflow,
    label: "Automatisation",
    description: "Automatisation de workflows métier, pipelines CI/CD, scripts de déploiement et chatbots intelligents pour gagner du temps au quotidien.",
    tags: ["CI/CD", "Scripts", "Chatbots", "Pipelines"],
    x: 22,
    y: 82,
    panelSide: "right",
  },
  {
    id: "data",
    icon: BarChart3,
    label: "Data",
    description: "Tableaux de bord analytiques, reporting automatisé et visualisation de KPIs. Collecte, traitement et exploitation de vos données métier.",
    tags: ["KPI", "Reporting", "Dataviz", "ETL"],
    x: 62,
    y: 80,
    panelSide: "left",
  },
];

/** Pairs of service indices that should be connected */
const CONNECTIONS: [number, number][] = [
  // Cluster top
  [0, 1],
  [1, 2],
  [0, 4],
  // Cross links
  [1, 4],
  [2, 5],
  [4, 5],
  // Left column
  [0, 3],
  [3, 4],
  [3, 6],
  // Bottom
  [4, 7],
  [5, 7],
  [6, 7],
  // Extra mesh
  [6, 4],
  [1, 5],
];

/* =================================================================
   ANIMATION VARIANTS
   ================================================================= */

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: ANIMATION_CONFIG.stagger.normal,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.slow,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
};

const nodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.6,
      ease: ANIMATION_CONFIG.easing.smooth,
      type: "spring",
      ...ANIMATION_CONFIG.spring.gentle,
    },
  }),
};

const lineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        delay: 0.8 + i * 0.06,
        duration: 1.0,
        ease: "easeInOut",
      },
      opacity: {
        delay: 0.8 + i * 0.06,
        duration: 0.3,
      },
    },
  }),
};

const panelVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.15 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 },
  },
};

const mobileCardVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.15 + i * 0.08,
      duration: 0.5,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  }),
};

/* =================================================================
   COMPONENT — Services
   ================================================================= */

export default function Services(): JSX.Element {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const constellationRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });
  const { scrollToSection } = useSmoothScroll();

  const handleNodeEnter = useCallback((id: string) => {
    setHoveredNode(id);
  }, []);

  const handleNodeLeave = useCallback(() => {
    setHoveredNode(null);
  }, []);

  /** Check if a connection is linked to the hovered node */
  const isConnectionActive = useCallback(
    (conn: [number, number]) => {
      if (!hoveredNode) return false;
      const hoveredIndex = SERVICES.findIndex((s) => s.id === hoveredNode);
      return conn[0] === hoveredIndex || conn[1] === hoveredIndex;
    },
    [hoveredNode],
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-services relative py-16 overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* ---------- Ambient glow ---------- */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, var(--services-primary) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle, var(--services-secondary) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* ======================= HEADER ========================= */}
        <motion.div
          className="text-center mb-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {/* Badge */}
          <motion.span
            variants={headerVariants}
            className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border"
            style={{
              color: "var(--services-primary)",
              borderColor: "color-mix(in srgb, var(--services-primary) 30%, transparent)",
              background:
                "color-mix(in srgb, var(--services-primary) 8%, transparent)",
            }}
          >
            Services
          </motion.span>

          {/* Heading */}
          <motion.h2
            id="services-heading"
            variants={headerVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3"
          >
            Nos{" "}
            <span className="gradient-text">Services</span>
          </motion.h2>

          {/* Sub-heading */}
          <motion.p
            variants={headerVariants}
            className="text-[var(--muted)] max-w-xl mx-auto text-base md:text-lg leading-relaxed"
          >
            Un écosystème complet de solutions interconnectées, conçu pour
            propulser votre activité.
          </motion.p>
        </motion.div>

        {/* ================== CONSTELLATION (md+) ================= */}
        <div
          ref={constellationRef}
          className="hidden md:block relative mx-auto"
          style={{ height: "clamp(500px, 50vw, 650px)" }}
          role="list"
          aria-label="Constellation de services"
        >
          {/* ------- SVG connections ------- */}
          <svg
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient
                id="conn-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="var(--services-primary)" />
                <stop offset="100%" stopColor="var(--services-secondary)" />
              </linearGradient>
              <linearGradient
                id="conn-gradient-active"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="var(--services-primary)"
                  stopOpacity="0.9"
                />
                <stop
                  offset="100%"
                  stopColor="var(--services-secondary)"
                  stopOpacity="0.9"
                />
              </linearGradient>
            </defs>

            {CONNECTIONS.map(([a, b], i) => {
              const from = SERVICES[a];
              const to = SERVICES[b];
              const active = isConnectionActive([a, b]);

              return (
                <motion.line
                  key={`conn-${a}-${b}`}
                  x1={`${from.x + 4.5}%`}
                  y1={`${from.y + 8.5}%`}
                  x2={`${to.x + 4.5}%`}
                  y2={`${to.y + 8.5}%`}
                  stroke={active ? "url(#conn-gradient-active)" : "url(#conn-gradient)"}
                  strokeWidth={active ? 1.5 : 0.8}
                  strokeLinecap="round"
                  style={{
                    opacity: active ? 0.7 : 0.3,
                    transition: "opacity 0.3s ease, stroke-width 0.3s ease",
                  }}
                  variants={lineVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={i}
                />
              );
            })}
          </svg>

          {/* ------- Nodes ------- */}
          {SERVICES.map((service, index) => (
            <ConstellationNode
              key={service.id}
              service={service}
              index={index}
              isHovered={hoveredNode === service.id}
              isAnyHovered={hoveredNode !== null}
              isInView={isInView}
              onEnter={handleNodeEnter}
              onLeave={handleNodeLeave}
            />
          ))}
        </div>

        {/* ================ MOBILE FALLBACK (<md) ================ */}
        <motion.div
          className="md:hidden flex flex-col gap-4"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          role="list"
          aria-label="Liste des services"
        >
          {SERVICES.map((service, i) => (
            <MobileServiceCard key={service.id} service={service} index={i} />
          ))}
        </motion.div>

        {/* ====================== CTA ============================ */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.5,
            duration: 0.6,
            ease: ANIMATION_CONFIG.easing.smooth,
          }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, var(--services-primary), var(--services-secondary))",
              boxShadow:
                "0 0 24px color-mix(in srgb, var(--services-primary) 25%, transparent)",
            }}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 40px color-mix(in srgb, var(--services-primary) 45%, transparent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 24px color-mix(in srgb, var(--services-primary) 25%, transparent)";
            }}
          >
            Un projet spécifique ? Parlons-en
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* =================================================================
   SUB-COMPONENT — ConstellationNode (desktop)
   ================================================================= */

interface ConstellationNodeProps {
  service: ServiceNode;
  index: number;
  isHovered: boolean;
  isAnyHovered: boolean;
  isInView: boolean;
  onEnter: (id: string) => void;
  onLeave: () => void;
}

function ConstellationNode({
  service,
  index,
  isHovered,
  isAnyHovered,
  isInView,
  onEnter,
  onLeave,
}: ConstellationNodeProps) {
  const Icon = service.icon;
  const dimmed = isAnyHovered && !isHovered;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${service.x}%`,
        top: `${service.y}%`,
        zIndex: isHovered ? 50 : 1,
      }}
      variants={nodeVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      role="listitem"
    >
      <div
        className="relative"
        onMouseEnter={() => onEnter(service.id)}
        onMouseLeave={onLeave}
      >
        {/* Node circle */}
        <motion.div
          className="relative flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 rounded-full"
          style={{
            width: 110,
            height: 110,
            outlineColor: "var(--services-primary)",
          }}
          animate={{
            scale: isHovered ? 1.3 : dimmed ? 0.92 : 1,
            opacity: dimmed ? 0.45 : 1,
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          tabIndex={0}
          role="button"
          aria-label={`${service.label} : ${service.description}`}
          onFocus={() => onEnter(service.id)}
          onBlur={onLeave}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onEnter(service.id);
            }
          }}
        >
          {/* Gradient border ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              padding: "1.5px",
              background:
                "linear-gradient(135deg, var(--services-primary), var(--services-secondary))",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
            }}
            aria-hidden="true"
          />

          {/* Background fill */}
          <div
            className="absolute inset-[1.5px] rounded-full"
            style={{
              background: isHovered
                ? "color-mix(in srgb, var(--services-primary) 12%, var(--card))"
                : "var(--card)",
              transition: "background 0.3s ease",
            }}
            aria-hidden="true"
          />

          {/* Outer glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{
              boxShadow: isHovered
                ? "0 0 40px color-mix(in srgb, var(--services-primary) 35%, transparent), 0 0 80px color-mix(in srgb, var(--services-secondary) 15%, transparent)"
                : "0 0 0px transparent",
            }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          />

          {/* Pulse ring on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{
                border: "1px solid var(--services-primary)",
              }}
              aria-hidden="true"
            />
          )}

          {/* Icon */}
          <Icon
            size={26}
            className="relative z-10"
            style={{
              color: isHovered
                ? "var(--services-secondary)"
                : "var(--services-primary)",
              transition: "color 0.3s ease",
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Label below node */}
        <motion.span
          className="block text-center text-sm font-medium mt-2 whitespace-nowrap select-none pointer-events-none"
          style={{
            color: isHovered ? "var(--fg)" : "var(--muted)",
            transition: "color 0.3s ease",
            width: 110,
          }}
        >
          {service.label}
        </motion.span>

        {/* ---- Detail panel on hover ---- */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute z-10 w-64 rounded-xl p-5 pointer-events-none"
              style={{
                background: "#080808",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                ...(service.y > 60
                  ? {
                      bottom: "calc(100% + 16px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }
                  : {
                      top: "50%",
                      transform: "translateY(-50%)",
                      ...(service.panelSide === "right"
                        ? { left: "calc(100% + 20px)" }
                        : { right: "calc(100% + 20px)" }),
                    }),
              }}
            >
              {/* Gradient accent bar */}
              <div
                className="absolute top-0 rounded-t-xl h-[2px] w-full left-0"
                style={{
                  background:
                    "linear-gradient(90deg, var(--services-primary), var(--services-secondary))",
                }}
                aria-hidden="true"
              />

              <h3 className="text-base font-semibold text-[var(--fg)] mb-1.5">
                {service.label}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-3">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide"
                    style={{
                      color: "var(--services-primary)",
                      background:
                        "color-mix(in srgb, var(--services-primary) 12%, transparent)",
                      border:
                        "1px solid color-mix(in srgb, var(--services-primary) 20%, transparent)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* =================================================================
   SUB-COMPONENT — MobileServiceCard (vertical fallback)
   ================================================================= */

interface MobileServiceCardProps {
  service: ServiceNode;
  index: number;
}

function MobileServiceCard({ service, index }: MobileServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.div
      className="glass rounded-xl p-5 flex items-start gap-4"
      variants={mobileCardVariants}
      custom={index}
      role="listitem"
    >
      {/* Circle icon */}
      <div
        className="relative flex-shrink-0 flex items-center justify-center"
        style={{
          width: 56,
          height: 56,
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            padding: "1px",
            background:
              "linear-gradient(135deg, var(--services-primary), var(--services-secondary))",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-[1px] rounded-full bg-[var(--card)]"
          aria-hidden="true"
        />
        <Icon
          size={22}
          className="relative z-10"
          style={{ color: "var(--services-primary)" }}
          aria-hidden="true"
        />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-[var(--fg)] mb-1">
          {service.label}
        </h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-2.5">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide"
              style={{
                color: "var(--services-primary)",
                background:
                  "color-mix(in srgb, var(--services-primary) 10%, transparent)",
                border:
                  "1px solid color-mix(in srgb, var(--services-primary) 18%, transparent)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
