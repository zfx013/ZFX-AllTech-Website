"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
  type MotionStyle,
} from "framer-motion";
import { useCursor } from "@/contexts/CursorContext";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CursorVariant = "default" | "hover" | "click" | "text" | "hidden";

interface VariantStyle {
  size: number;
  borderColor: string;
  backgroundColor: string;
  opacity: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Spring config for the outer ring — nearly instant, minimal lag */
const RING_SPRING: SpringOptions = {
  stiffness: 1200,
  damping: 80,
  mass: 0.2,
};

/** Duration (in seconds) for variant transitions */
const VARIANT_TRANSITION_DURATION = 0.2;

/** Interactive selectors used for automatic detection via event delegation */
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [data-cursor="hover"]';
const TEXT_SELECTOR = '[data-cursor="text"]';
const HIDDEN_SELECTOR = '[data-cursor="hidden"]';

// ---------------------------------------------------------------------------
// Per-variant visual config
// ---------------------------------------------------------------------------

const VARIANT_STYLES: Record<CursorVariant, VariantStyle> = {
  default: {
    size: 20,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    opacity: 1,
  },
  hover: {
    size: 50,
    borderColor: "var(--section-primary)",
    backgroundColor: "color-mix(in srgb, var(--section-primary) 10%, transparent)",
    opacity: 1,
  },
  click: {
    size: 16,
    borderColor: "var(--section-primary)",
    backgroundColor: "color-mix(in srgb, var(--section-primary) 20%, transparent)",
    opacity: 1,
  },
  text: {
    size: 2,
    borderColor: "rgba(255, 255, 255, 0)",
    backgroundColor: "rgba(255, 255, 255, 0)",
    opacity: 1,
  },
  hidden: {
    size: 0,
    borderColor: "rgba(255, 255, 255, 0)",
    backgroundColor: "rgba(255, 255, 255, 0)",
    opacity: 0,
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** The id of the <style> element injected to hide the native cursor. */
const STYLE_ID = "custom-cursor-hide-native";

function injectCursorHideStyle(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    @media (pointer: fine) {
      *,
      *::before,
      *::after {
        cursor: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}

function removeCursorHideStyle(): void {
  if (typeof document === "undefined") return;
  const el = document.getElementById(STYLE_ID);
  if (el) el.remove();
}

/**
 * Determine the cursor variant to apply by walking up from the event target
 * to the document root, checking for interactive / data-cursor elements.
 */
function resolveVariantFromTarget(target: EventTarget | null): CursorVariant | null {
  if (!(target instanceof HTMLElement)) return null;

  let el: HTMLElement | null = target;
  while (el) {
    if (el.matches(HIDDEN_SELECTOR)) return "hidden";
    if (el.matches(TEXT_SELECTOR)) return "text";
    if (el.matches(INTERACTIVE_SELECTOR)) return "hover";
    el = el.parentElement;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CustomCursor() {
  // Ref to track whether the pointer capability was detected
  const isPointerFine = useRef(false);

  // ---- Context for programmatic variant overrides -------------------------
  const { cursor, setVariant } = useCursor();

  // Track whether the current variant was set by automatic detection so that
  // we can restore it properly on mouseout.
  const autoVariantRef = useRef<CursorVariant | null>(null);

  // ---- Raw motion values (no React state, no re-renders) ------------------
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smoothed position for the outer ring
  const ringX = useSpring(mouseX, RING_SPRING);
  const ringY = useSpring(mouseY, RING_SPRING);

  // ---- Mouse movement handler (RAF-free, Framer handles scheduling) -------
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY],
  );

  // ---- Automatic interactive-element detection ----------------------------
  const handleMouseOver = useCallback(
    (e: MouseEvent) => {
      const resolved = resolveVariantFromTarget(e.target);
      if (resolved !== null) {
        autoVariantRef.current = resolved;
        setVariant(resolved);
      }
    },
    [setVariant],
  );

  const handleMouseOut = useCallback(
    (e: MouseEvent) => {
      // Only reset if the relatedTarget is NOT still inside an interactive el
      const nextResolved = resolveVariantFromTarget(e.relatedTarget);
      if (nextResolved === null && autoVariantRef.current !== null) {
        autoVariantRef.current = null;
        setVariant("default");
      }
    },
    [setVariant],
  );

  // ---- Lifecycle ----------------------------------------------------------
  useEffect(() => {
    // Bail on devices without a fine pointer (touch-only)
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    isPointerFine.current = true;

    // Inject the native-cursor-hiding style
    injectCursorHideStyle();

    // Attach listeners (passive for perf, delegation on document)
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      removeCursorHideStyle();
    };
  }, [handleMouseMove, handleMouseOver, handleMouseOut]);

  // ---- Derive current variant style ---------------------------------------
  const variant = cursor.variant as CursorVariant;
  const vs = VARIANT_STYLES[variant];

  // ---- Shared motion styles (no extra React state) ------------------------
  const ringStyle: MotionStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    x: ringX,
    y: ringY,
    translateX: "-50%",
    translateY: "-50%",
    pointerEvents: "none",
    zIndex: 9999,
    mixBlendMode: "difference",
    borderStyle: "solid",
  };

  const dotStyle: MotionStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    x: mouseX,
    y: mouseY,
    translateX: "-50%",
    translateY: "-50%",
    pointerEvents: "none",
    zIndex: 9999,
    width: 4,
    height: 4,
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  };

  // ---- Render (media query already handled in the effect) -----------------
  return (
    <>
      {/* Outer ring */}
      <motion.div
        aria-hidden="true"
        style={ringStyle}
        animate={{
          width: vs.size,
          height: vs.size,
          borderRadius: vs.size / 2,
          borderWidth: 1.5,
          borderColor: vs.borderColor,
          backgroundColor: vs.backgroundColor,
          opacity: vs.opacity,
        }}
        transition={{
          duration: VARIANT_TRANSITION_DURATION,
          ease: "easeOut",
        }}
        className="hidden pointer-fine:block"
      />

      {/* Center dot */}
      <motion.div
        aria-hidden="true"
        style={dotStyle}
        animate={{
          opacity: variant === "hidden" ? 0 : 0.8,
        }}
        transition={{
          duration: VARIANT_TRANSITION_DURATION,
          ease: "easeOut",
        }}
        className="hidden pointer-fine:block"
      />
    </>
  );
}
