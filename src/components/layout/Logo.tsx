"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { SECTIONS, SECTION_COLORS, type SectionId } from "@/lib/constants";
import { useSectionInView } from "@/hooks/useSectionInView";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const sectionIds: string[] = SECTIONS.map((s) => s.id);
const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export default function Logo() {
  const { activeSection } = useSectionInView({ sectionIds });
  const { scrollToTop } = useSmoothScroll();

  const activeSectionId = (activeSection || "hero") as SectionId;
  const colors = useMemo(
    () => SECTION_COLORS[activeSectionId] ?? SECTION_COLORS.hero,
    [activeSectionId],
  );

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed left-6 top-5 z-50 flex cursor-pointer items-baseline gap-0 focus-visible:outline-2 focus-visible:outline-offset-4"
      style={{ outlineColor: colors.primary }}
      aria-label="Retour en haut de page"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease }}
    >
      {/* "ZFX" in bold white */}
      <span className="text-xl font-bold tracking-tight text-fg sm:text-2xl">
        ZFX
      </span>

      {/* "AllTech" with section-aware gradient */}
      <motion.span
        className="bg-clip-text text-xl font-bold tracking-tight sm:text-2xl"
        style={{
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        animate={{
          backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        }}
        transition={{ duration: 0.6, ease }}
      >
        AllTech
      </motion.span>
    </motion.button>
  );
}
