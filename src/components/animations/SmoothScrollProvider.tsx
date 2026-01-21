'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';
import { integrateLenis } from '@/lib/gsap';

interface SmoothScrollProviderProps {
  children: ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    touchMultiplier?: number;
  };
}

/**
 * SmoothScrollProvider Component
 *
 * Wraps your application with Lenis smooth scrolling and integrates it with GSAP ScrollTrigger.
 * Should be placed high in your component tree, ideally in the root layout.
 *
 * @example
 * ```tsx
 * // In your root layout or page
 * <SmoothScrollProvider>
 *   <YourContent />
 * </SmoothScrollProvider>
 * ```
 *
 * @example
 * ```tsx
 * <SmoothScrollProvider
 *   options={{
 *     duration: 1.2,
 *     touchMultiplier: 2,
 *   }}
 * >
 *   <YourContent />
 * </SmoothScrollProvider>
 * ```
 */
export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({
  children,
  options = {},
}) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: options.duration || 1.2,
      easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      touchMultiplier: options.touchMultiplier || 2,
    });

    lenisRef.current = lenis;

    // Integrate with GSAP ScrollTrigger
    integrateLenis(lenis);

    // Cleanup
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [options.duration, options.easing, options.touchMultiplier]);

  return <>{children}</>;
};

export default SmoothScrollProvider;
