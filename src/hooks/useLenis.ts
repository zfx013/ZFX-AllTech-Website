'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface UseLenisOptions {
  root?: HTMLElement;
  lerp?: number;
  duration?: number;
  smoothWheel?: boolean;
  touchMultiplier?: number;
  infinite?: boolean;
  autoResize?: boolean;
}

/**
 * Custom hook to initialize and manage Lenis smooth scroll
 * with premium configuration for ultra-smooth scrolling
 * @param options - Lenis configuration options
 * @returns Lenis instance
 */
export function useLenis(options?: UseLenisOptions) {
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Initialize Lenis with premium smooth scroll options
    const lenis = new Lenis({
      lerp: options?.lerp ?? 0.075, // Lower lerp for premium smoothness
      duration: options?.duration ?? 1.4,
      smoothWheel: options?.smoothWheel ?? true,
      touchMultiplier: options?.touchMultiplier ?? 1.8,
      infinite: options?.infinite ?? false,
      autoResize: options?.autoResize ?? true,
    });

    // Optimized request animation frame loop for Lenis
    function raf(time: number) {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(raf);
    }

    rafId.current = requestAnimationFrame(raf);

    // Expose lenis to window for external access (e.g., GSAP ScrollTrigger)
    if (typeof window !== 'undefined') {
      (window as any).lenis = lenis;
    }

    // Cleanup on unmount
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      lenis.destroy();
      if (typeof window !== 'undefined') {
        delete (window as any).lenis;
      }
    };
  // Use stable dependency - only reinitialize on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * Hook to control Lenis scroll state
 * Useful for stopping scroll during modals, menus, etc.
 */
export function useLenisControl() {
  const start = () => {
    if (typeof window !== 'undefined' && (window as any).lenis) {
      (window as any).lenis.start();
    }
  };

  const stop = () => {
    if (typeof window !== 'undefined' && (window as any).lenis) {
      (window as any).lenis.stop();
    }
  };

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      easing?: (t: number) => number;
      immediate?: boolean;
      lock?: boolean;
      onComplete?: () => void;
    }
  ) => {
    if (typeof window !== 'undefined' && (window as any).lenis) {
      (window as any).lenis.scrollTo(target, options);
    }
  };

  return { start, stop, scrollTo };
}
