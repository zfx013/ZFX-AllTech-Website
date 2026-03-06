"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { SECTIONS, SECTION_COLORS, type SectionId } from "@/lib/constants";
import { useSectionInView } from "@/hooks/useSectionInView";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const sectionIds: string[] = SECTIONS.map((s) => s.id);
const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export default function SideNav() {
  const { activeSection } = useSectionInView({ sectionIds });
  const scrollProgress = useScrollProgress();
  const { scrollToSection } = useSmoothScroll({ offset: 0 });

  const handleDotClick = useCallback(
    (sectionId: string) => {
      scrollToSection(sectionId);
    },
    [scrollToSection],
  );

  const activeIndex = sectionIds.indexOf(activeSection);
  const activeSectionId = (activeSection || "hero") as SectionId;
  const activeColors = SECTION_COLORS[activeSectionId] ?? SECTION_COLORS.hero;

  return (
    <nav
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 md:flex"
      aria-label="Navigation par sections"
      role="navigation"
    >
      <div className="relative flex flex-col items-center gap-5">
        {/* Progress bar track */}
        <div
          className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2"
          aria-hidden="true"
        >
          {/* Track background */}
          <div className="h-full w-full rounded-full bg-white/[0.06]" />
          {/* Progress fill */}
          <motion.div
            className="absolute left-0 top-0 w-full origin-top rounded-full"
            style={{
              backgroundColor: activeColors.primary,
              scaleY: scrollProgress,
              height: "100%",
              opacity: 0.5,
            }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>

        {/* Dots */}
        {SECTIONS.map((section, index) => {
          const isActive = section.id === activeSection;
          const colors = SECTION_COLORS[section.id as SectionId];

          return (
            <SideNavDot
              key={section.id}
              sectionId={section.id}
              label={section.label}
              isActive={isActive}
              primaryColor={colors.primary}
              onClick={handleDotClick}
              index={index}
              activeIndex={activeIndex}
            />
          );
        })}
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */

interface SideNavDotProps {
  sectionId: string;
  label: string;
  isActive: boolean;
  primaryColor: string;
  onClick: (id: string) => void;
  index: number;
  activeIndex: number;
}

function SideNavDot({
  sectionId,
  label,
  isActive,
  primaryColor,
  onClick,
}: SideNavDotProps) {
  return (
    <div className="group relative flex items-center">
      {/* Label -- appears on hover, slides in from right */}
      <span
        className="pointer-events-none absolute right-full mr-3 flex items-center whitespace-nowrap text-xs font-medium tracking-wide opacity-0 transition-all duration-200 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
        style={{ color: primaryColor }}
        aria-hidden="true"
      >
        {label}
      </span>

      {/* Dot button */}
      <button
        onClick={() => onClick(sectionId)}
        className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4"
        style={{
          outlineColor: isActive ? primaryColor : undefined,
        }}
        aria-label={`Naviguer vers ${label}`}
        aria-current={isActive ? "true" : undefined}
      >
        {/* Outer glow ring when active */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: primaryColor }}
          initial={false}
          animate={{
            scale: isActive ? 1.8 : 0,
            opacity: isActive ? 0.15 : 0,
          }}
          transition={{ duration: 0.35, ease }}
          aria-hidden="true"
        />

        {/* The dot itself */}
        <motion.span
          className="relative block rounded-full"
          initial={false}
          animate={{
            width: isActive ? 12 : 8,
            height: isActive ? 12 : 8,
            backgroundColor: isActive ? primaryColor : "var(--muted)",
          }}
          transition={{ duration: 0.3, ease }}
          whileHover={{
            scale: 1.3,
            backgroundColor: primaryColor,
          }}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
