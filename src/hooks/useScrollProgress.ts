"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollProgressOptions {
  smoothFactor?: number;
}

export function useScrollProgress(
  options: UseScrollProgressOptions = {}
): number {
  const { smoothFactor = 0.1 } = options;
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const calculateProgress = (): number => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return 0;
      return Math.min(1, Math.max(0, scrollTop / docHeight));
    };

    const animate = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      const next = current + (target - current) * smoothFactor;
      const rounded = Math.round(next * 10000) / 10000;

      currentRef.current = rounded;

      if (Math.abs(rounded - target) > 0.0001) {
        setProgress(rounded);
        rafRef.current = requestAnimationFrame(animate);
      } else {
        currentRef.current = target;
        setProgress(target);
        rafRef.current = 0;
      }
    };

    const handleScroll = () => {
      targetRef.current = calculateProgress();
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    targetRef.current = calculateProgress();
    currentRef.current = targetRef.current;
    setProgress(targetRef.current);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };
  }, [smoothFactor]);

  return progress;
}
