"use client";

import { memo, useRef, useCallback, type ReactNode, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from "framer-motion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export type MagneticButtonVariant = "primary" | "secondary" | "ghost";

export interface MagneticButtonProps {
  children: ReactNode;
  /** If provided, renders as a Next.js Link; otherwise renders a <button> */
  href?: string;
  variant?: MagneticButtonVariant;
  className?: string;
  /** Required when the button only contains an icon (no visible text) */
  "aria-label"?: string;
  /** Native button type (ignored when href is provided) */
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

/** Distance (in px) at which the magnetic pull activates */
const MAGNETIC_RADIUS = 50;
/** Maximum displacement toward cursor (in px) */
const MAX_DISPLACEMENT = 10;

const springConfig: SpringOptions = {
  stiffness: 300,
  damping: 20,
  mass: 0.5,
};

const variantStyles: Record<MagneticButtonVariant, string> = {
  primary: [
    "relative px-8 py-3 rounded-xl font-semibold text-white",
    "bg-gradient-to-r from-[var(--section-primary)] to-[var(--section-secondary)]",
    "shadow-[0_0_24px_color-mix(in_srgb,var(--section-primary)_30%,transparent)]",
    "hover:shadow-[0_0_40px_color-mix(in_srgb,var(--section-primary)_45%,transparent)]",
    "transition-shadow duration-300",
  ].join(" "),

  secondary: [
    "relative px-8 py-3 rounded-xl font-medium",
    "border border-[var(--border)] bg-transparent text-[var(--fg)]",
    "hover:bg-white/[0.04] hover:backdrop-blur-md hover:border-white/10",
    "transition-all duration-300",
  ].join(" "),

  ghost: [
    "relative inline-flex items-center gap-1 bg-transparent text-[var(--fg)]",
    "font-medium group",
  ].join(" "),
};

const MagneticButton = memo(function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  disabled = false,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollToSection } = useSmoothScroll();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleLinkClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (href?.startsWith("#")) {
        e.preventDefault();
        const sectionId = href.slice(1);
        scrollToSection(sectionId);
        // Update URL without triggering navigation
        window.history.pushState(null, "", href);
      }
      onClick?.();
    },
    [href, scrollToSection, onClick]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < MAGNETIC_RADIUS) {
        const factor = 1 - distance / MAGNETIC_RADIUS;
        x.set(distX * factor * (MAX_DISPLACEMENT / MAGNETIC_RADIUS));
        y.set(distY * factor * (MAX_DISPLACEMENT / MAGNETIC_RADIUS));
      } else {
        x.set(0);
        y.set(0);
      }
    },
    [x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const ariaLabel = rest["aria-label"];

  const sharedMotionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  };

  const inner = (
    <>
      {children}
      {/* Ghost variant: animated underline */}
      {variant === "ghost" && (
        <span
          className="absolute bottom-0 left-0 h-px w-0 bg-[var(--section-primary)] transition-all duration-300 group-hover:w-full"
          aria-hidden="true"
        />
      )}
    </>
  );

  const classes = `${variantStyles[variant]} ${className}`.trim();

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, display: "inline-block" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {href ? (
        <motion.div {...sharedMotionProps}>
          <a
            href={href}
            className={`inline-flex items-center justify-center ${classes}`}
            aria-label={ariaLabel}
            onClick={handleLinkClick}
          >
            {inner}
          </a>
        </motion.div>
      ) : (
        <motion.button
          type={type}
          className={`inline-flex items-center justify-center cursor-pointer ${classes}`}
          onClick={onClick}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-disabled={disabled || undefined}
          {...sharedMotionProps}
        >
          {inner}
        </motion.button>
      )}
    </motion.div>
  );
});

MagneticButton.displayName = "MagneticButton";

export default MagneticButton;
