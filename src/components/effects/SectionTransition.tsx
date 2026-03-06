"use client";

import { memo } from "react";
import { motion } from "framer-motion";

interface SectionTransitionProps {
  /** CSS color value for the top (previous section) */
  fromColor: string;
  /** CSS color value for the bottom (next section) */
  toColor: string;
  /** Height of the transition zone in px (default: 180) */
  height?: number;
  /** Whether to show an animated horizontal line in the middle (default: false) */
  showLine?: boolean;
  /** Color of the animated line (default: "rgba(255,255,255,0.08)") */
  lineColor?: string;
  /** Additional CSS class names */
  className?: string;
}

const SectionTransition = memo(function SectionTransition({
  fromColor,
  toColor,
  height = 180,
  showLine = false,
  lineColor = "rgba(255,255,255,0.08)",
  className = "",
}: SectionTransitionProps) {
  return (
    <div
      className={`relative w-full ${className}`}
      style={{
        height: `${height}px`,
        background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
      }}
      aria-hidden="true"
    >
      {showLine && (
        <div className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 items-center justify-center">
          <motion.div
            className="h-px"
            style={{ backgroundColor: lineColor }}
            initial={{ width: "0%" }}
            whileInView={{ width: "60%" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        </div>
      )}
    </div>
  );
});

SectionTransition.displayName = "SectionTransition";

export default SectionTransition;
