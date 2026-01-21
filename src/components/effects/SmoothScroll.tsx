'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: ReactNode;
  className?: string;
}

/**
 * SmoothScroll Component
 * Wraps the application with Lenis smooth scrolling
 * Integrates with GSAP ScrollTrigger for advanced scroll animations
 */
export default function SmoothScroll({ children, className }: SmoothScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis with premium optimized settings
  useLenis({
    lerp: 0.075, // Lower lerp for ultra-smooth, premium feel (0.075 = buttery smooth)
    duration: 1.4, // Slightly longer duration for elegance
    smoothWheel: true, // Enable smooth wheel scrolling
    touchMultiplier: 1.8, // Slightly reduced for more controlled touch scroll
    infinite: false, // Disable infinite scroll
    autoResize: true, // Auto-resize on window resize
  });

  useEffect(() => {
    // Integrate Lenis with GSAP ScrollTrigger
    if (typeof window !== 'undefined' && (window as any).lenis) {
      const lenis = (window as any).lenis;

      // Update ScrollTrigger on Lenis scroll
      lenis.on('scroll', ScrollTrigger.update);

      // Synchronize ScrollTrigger with Lenis
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      // Handle anchor links (hash navigation)
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a[href^="#"]');

        if (link) {
          e.preventDefault();
          const href = link.getAttribute('href');

          if (href && href !== '#') {
            const targetElement = document.querySelector(href);

            if (targetElement) {
              lenis.scrollTo(targetElement, {
                offset: -100, // Offset for fixed header (adjust as needed)
                duration: 1.8,
                // Premium easing: custom cubic bezier approximation for smooth deceleration
                easing: (t: number) => {
                  // Custom easing combining exponential and sine for premium feel
                  const easeOutExpo = 1 - Math.pow(2, -10 * t);
                  const easeOutSine = Math.sin((t * Math.PI) / 2);
                  return easeOutExpo * 0.7 + easeOutSine * 0.3;
                },
              });
            }
          }
        }
      };

      // Handle programmatic scrollTo with Lenis and premium easing
      const handleScrollTo = (target: string | HTMLElement, offset = 0) => {
        lenis.scrollTo(target, {
          offset,
          duration: 1.8,
          easing: (t: number) => {
            // Custom premium easing
            const easeOutExpo = 1 - Math.pow(2, -10 * t);
            const easeOutSine = Math.sin((t * Math.PI) / 2);
            return easeOutExpo * 0.7 + easeOutSine * 0.3;
          },
        });
      };

      // Expose scrollTo function globally
      (window as any).scrollToSmooth = handleScrollTo;

      // Add event listener for anchor links
      document.addEventListener('click', handleAnchorClick);

      // Handle browser back/forward with hash
      const handleHashChange = () => {
        const hash = window.location.hash;
        if (hash) {
          const targetElement = document.querySelector(hash);
          if (targetElement) {
            setTimeout(() => {
              lenis.scrollTo(targetElement, {
                offset: -100,
                duration: 1.8,
                easing: (t: number) => {
                  const easeOutExpo = 1 - Math.pow(2, -10 * t);
                  const easeOutSine = Math.sin((t * Math.PI) / 2);
                  return easeOutExpo * 0.7 + easeOutSine * 0.3;
                },
              });
            }, 100);
          }
        }
      };

      window.addEventListener('hashchange', handleHashChange);

      // Initial hash scroll on page load
      if (window.location.hash) {
        handleHashChange();
      }

      // Cleanup
      return () => {
        document.removeEventListener('click', handleAnchorClick);
        window.removeEventListener('hashchange', handleHashChange);
        gsap.ticker.remove((time) => {
          lenis.raf(time * 1000);
        });
        delete (window as any).scrollToSmooth;
      };
    }
  }, []);

  return (
    <div ref={scrollRef} className={className}>
      {children}
    </div>
  );
}
