"use client";

import { useEffect, useRef, useCallback } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

const INITIAL_POSITION: MousePosition = {
  x: 0,
  y: 0,
  normalizedX: 0,
  normalizedY: 0,
};

function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

interface UseMousePositionOptions {
  smoothFactor?: number;
  enabled?: boolean;
}

/**
 * Ref-based mouse position hook.
 * Returns a ref that updates on every animation frame without causing React re-renders.
 * Ideal for driving Framer Motion values or canvas animations.
 */
export function useMousePosition(
  options: UseMousePositionOptions = {}
): React.RefObject<MousePosition> {
  const { smoothFactor = 0.15, enabled = true } = options;
  const positionRef = useRef<MousePosition>(INITIAL_POSITION);
  const targetRef = useRef<MousePosition>(INITIAL_POSITION);
  const currentRef = useRef<MousePosition>(INITIAL_POSITION);
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const target = targetRef.current;
    const current = currentRef.current;

    const nextX = lerp(current.x, target.x, smoothFactor);
    const nextY = lerp(current.y, target.y, smoothFactor);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const next: MousePosition = {
      x: nextX,
      y: nextY,
      normalizedX: width > 0 ? (nextX / width) * 2 - 1 : 0,
      normalizedY: height > 0 ? (nextY / height) * 2 - 1 : 0,
    };

    currentRef.current = next;
    positionRef.current = next;

    const dx = Math.abs(next.x - target.x);
    const dy = Math.abs(next.y - target.y);

    if (dx > 0.1 || dy > 0.1) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      positionRef.current = target;
      currentRef.current = target;
      rafRef.current = 0;
    }
  }, [smoothFactor]);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (event: MouseEvent) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      targetRef.current = {
        x: event.clientX,
        y: event.clientY,
        normalizedX: width > 0 ? (event.clientX / width) * 2 - 1 : 0,
        normalizedY: height > 0 ? (event.clientY / height) * 2 - 1 : 0,
      };

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };
  }, [enabled, animate]);

  return positionRef;
}
