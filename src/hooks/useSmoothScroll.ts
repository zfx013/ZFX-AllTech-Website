"use client";

import { useCallback, useRef } from "react";
import { HEADER_HEIGHT } from "@/lib/constants";

interface UseSmoothScrollOptions {
  offset?: number;
  duration?: number;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
  const { offset = HEADER_HEIGHT, duration = 1000 } = options;
  const rafRef = useRef<number>(0);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      const targetPosition =
        element.getBoundingClientRect().top + window.scrollY - offset;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const rawProgress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutCubic(rawProgress);

        window.scrollTo(0, startPosition + distance * easedProgress);

        if (rawProgress < 1) {
          rafRef.current = requestAnimationFrame(animateScroll);
        } else {
          rafRef.current = 0;
        }
      };

      rafRef.current = requestAnimationFrame(animateScroll);
    },
    [offset, duration]
  );

  const scrollToTop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    const startPosition = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(rawProgress);

      window.scrollTo(0, startPosition * (1 - easedProgress));

      if (rawProgress < 1) {
        rafRef.current = requestAnimationFrame(animateScroll);
      } else {
        rafRef.current = 0;
      }
    };

    rafRef.current = requestAnimationFrame(animateScroll);
  }, [duration]);

  return { scrollToSection, scrollToTop };
}
