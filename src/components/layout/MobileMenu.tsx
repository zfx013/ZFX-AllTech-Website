"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { SECTIONS, SECTION_COLORS, type SectionId } from "@/lib/constants";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const overlayVariants: Variants = {
  closed: {
    clipPath: "circle(0% at calc(100% - 40px) 40px)",
    opacity: 0,
    transition: { duration: 0.5, ease },
  },
  open: {
    clipPath: "circle(150% at calc(100% - 40px) 40px)",
    opacity: 1,
    transition: { duration: 0.6, ease },
  },
};

const listVariants: Variants = {
  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  open: {
    transition: { staggerChildren: 0.08, delayChildren: 0.25 },
  },
};

const itemVariants: Variants = {
  closed: { y: 30, opacity: 0, filter: "blur(4px)" },
  open: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease },
  },
};

/* ------------------------------------------------------------------ */
/*  Burger / X animated icon                                           */
/* ------------------------------------------------------------------ */

function BurgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span className="relative flex h-5 w-6 flex-col items-center justify-center" aria-hidden="true">
      <motion.span
        className="absolute h-[2px] w-full rounded-full bg-fg"
        initial={false}
        animate={
          isOpen
            ? { rotate: 45, y: 0 }
            : { rotate: 0, y: -6 }
        }
        transition={{ duration: 0.3, ease }}
      />
      <motion.span
        className="absolute h-[2px] w-full rounded-full bg-fg"
        initial={false}
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute h-[2px] w-full rounded-full bg-fg"
        initial={false}
        animate={
          isOpen
            ? { rotate: -45, y: 0 }
            : { rotate: 0, y: 6 }
        }
        transition={{ duration: 0.3, ease }}
      />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Focus trap hook                                                    */
/* ------------------------------------------------------------------ */

function useFocusTrap(isActive: boolean, containerRef: React.RefObject<HTMLElement | null>) {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    // Save the currently focused element to restore later
    previousFocusRef.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    if (!container) return;

    // Focus the first focusable element after a short delay (wait for animation)
    const focusTimer = setTimeout(() => {
      const focusable = container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }, 300);

    const getFocusable = () =>
      container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    // Prevent focus from escaping via mouse click outside
    const handleFocusIn = (e: FocusEvent) => {
      if (container && !container.contains(e.target as Node)) {
        const focusable = getFocusable();
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);

      // Restore focus to the previously focused element
      if (previousFocusRef.current && previousFocusRef.current.focus) {
        previousFocusRef.current.focus();
      }
    };
  }, [isActive, containerRef]);
}

/* ------------------------------------------------------------------ */
/*  MobileMenu                                                         */
/* ------------------------------------------------------------------ */

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollToSection } = useSmoothScroll({ offset: 0 });
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus trap
  useFocusTrap(isOpen, dialogRef);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleNavigate = useCallback(
    (sectionId: string) => {
      setIsOpen(false);
      // Small delay so the close animation starts before scroll
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    },
    [scrollToSection],
  );

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  return (
    <>
      {/* Burger button -- visible only on mobile */}
      <button
        onClick={toggle}
        className="fixed right-5 top-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-card/80 backdrop-blur-md md:hidden"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-overlay"
      >
        <BurgerIcon isOpen={isOpen} />
      </button>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-overlay"
            ref={dialogRef}
            className="fixed inset-0 z-40 flex items-center justify-center md:hidden"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation mobile"
          >
            {/* Background with glass effect */}
            <div
              className="absolute inset-0 bg-bg/80 backdrop-blur-2xl backdrop-saturate-150"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Link list */}
            <motion.nav
              className="relative z-10"
              variants={listVariants}
              initial="closed"
              animate="open"
              exit="closed"
              aria-label="Menu principal"
            >
              <ul className="flex flex-col items-center gap-6">
                {SECTIONS.map((section) => {
                  const colors = SECTION_COLORS[section.id as SectionId];
                  return (
                    <motion.li key={section.id} variants={itemVariants}>
                      <button
                        onClick={() => handleNavigate(section.id)}
                        className="group relative text-2xl font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 sm:text-3xl"
                        style={{
                          color: colors.primary,
                          outlineColor: colors.primary,
                        }}
                        aria-label={`Naviguer vers ${section.label}`}
                      >
                        {/* Gradient underline on hover */}
                        <span className="relative">
                          {section.label}
                          <span
                            className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full transition-all duration-300 group-hover:w-full"
                            style={{
                              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                            }}
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
