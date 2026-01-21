'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

interface CursorState {
  isHovering: boolean;
  isButton: boolean;
  isPortfolio: boolean;
  magneticElement: HTMLElement | null;
}

export const useCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    isButton: false,
    isPortfolio: false,
    magneticElement: null,
  });

  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);
  const isMobile = useRef(false);
  const isFirstMove = useRef(true);
  // Store magnetic element in a ref to avoid dependency in useEffect
  const magneticElementRef = useRef<HTMLElement | null>(null);

  // Update the ref when state changes
  magneticElementRef.current = cursorState.magneticElement;

  useEffect(() => {
    // Check if device is mobile or touch-enabled
    const checkMobile = () => {
      isMobile.current = window.matchMedia('(pointer: coarse)').matches ||
                        'ontouchstart' in window ||
                        navigator.maxTouchPoints > 0;
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Don't initialize cursor on mobile
    if (isMobile.current) {
      return () => window.removeEventListener('resize', checkMobile);
    }

    const cursor = cursorRef.current;
    const ring = cursorRingRef.current;
    if (!cursor || !ring) return;

    // Mouse move handler with velocity tracking
    const handleMouseMove = (e: MouseEvent) => {
      // Track velocity for dynamic effects
      velocity.current = {
        x: e.clientX - lastMousePos.current.x,
        y: e.clientY - lastMousePos.current.y,
      };
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Initialize cursor position on first move to prevent jump from origin
      if (isFirstMove.current) {
        cursorPos.current = { x: e.clientX, y: e.clientY };
        ringPos.current = { x: e.clientX, y: e.clientY };
        isFirstMove.current = false;
      }
    };

    // Smooth cursor animation with advanced lerp and velocity-based dynamics
    const animateCursor = () => {
      // Calculate velocity magnitude for dynamic lerp adjustment
      const velocityMagnitude = Math.sqrt(
        velocity.current.x * velocity.current.x +
        velocity.current.y * velocity.current.y
      );

      // Dynamic lerp values - faster movement = slightly faster lerp for responsiveness
      const baseCursorLerp = 0.12;
      const baseRingLerp = 0.065;
      const velocityBoost = Math.min(velocityMagnitude * 0.002, 0.08);

      const cursorLerp = baseCursorLerp + velocityBoost;
      const ringLerp = baseRingLerp + velocityBoost * 0.5;

      // Calculate magnetic effect if hovering over button
      let targetX = mousePos.current.x;
      let targetY = mousePos.current.y;

      if (magneticElementRef.current) {
        const rect = magneticElementRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from cursor to button center
        const dx = centerX - mousePos.current.x;
        const dy = centerY - mousePos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Enhanced magnetic effect with smooth falloff
        const magneticStrength = 0.35;
        const maxDistance = 120;

        if (distance < maxDistance) {
          // Smooth cubic falloff for more natural feel
          const falloff = Math.pow(1 - distance / maxDistance, 2);
          targetX += dx * magneticStrength * falloff;
          targetY += dy * magneticStrength * falloff;
        }
      }

      // Smooth cursor position (main dot) with sub-pixel precision
      cursorPos.current.x += (targetX - cursorPos.current.x) * cursorLerp;
      cursorPos.current.y += (targetY - cursorPos.current.y) * cursorLerp;

      // Smooth ring position (outer ring with more delay for trailing effect)
      ringPos.current.x += (targetX - ringPos.current.x) * ringLerp;
      ringPos.current.y += (targetY - ringPos.current.y) * ringLerp;

      // Calculate rotation based on velocity for subtle tilt effect on ring
      const rotationAngle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI);
      const stretchAmount = Math.min(velocityMagnitude * 0.01, 0.15);

      // Apply transforms with GPU acceleration
      gsap.set(cursor, {
        x: cursorPos.current.x,
        y: cursorPos.current.y,
        xPercent: -50,
        yPercent: -50,
        force3D: true,
      });

      gsap.set(ring, {
        x: ringPos.current.x,
        y: ringPos.current.y,
        xPercent: -50,
        yPercent: -50,
        scaleX: 1 + stretchAmount,
        scaleY: 1 - stretchAmount * 0.5,
        rotation: velocityMagnitude > 2 ? rotationAngle : 0,
        force3D: true,
      });

      // Decay velocity for smooth stop
      velocity.current.x *= 0.9;
      velocity.current.y *= 0.9;

      requestRef.current = requestAnimationFrame(animateCursor);
    };

    // Mouse enter handler for interactive elements
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const isButton = target.tagName === 'BUTTON' ||
                      target.closest('button') !== null ||
                      target.classList.contains('btn-primary') ||
                      target.classList.contains('btn-secondary');

      const isLink = target.tagName === 'A' || target.closest('a') !== null;
      const isPortfolio = target.closest('[data-portfolio-item]') !== null;

      setCursorState({
        isHovering: true,
        isButton,
        isPortfolio,
        magneticElement: isButton ? (target.closest('button') as HTMLElement || target as HTMLElement) : null,
      });
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      setCursorState({
        isHovering: false,
        isButton: false,
        isPortfolio: false,
        magneticElement: null,
      });
    };

    // Attach event listeners
    document.addEventListener('mousemove', handleMouseMove);

    // Find all interactive elements and attach hover listeners
    const updateInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-portfolio-item], .btn-primary, .btn-secondary, input, textarea, select'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter as EventListener);
        el.addEventListener('mouseleave', handleMouseLeave);
      });

      return () => {
        interactiveElements.forEach((el) => {
          el.removeEventListener('mouseenter', handleMouseEnter as EventListener);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    };

    // Initial setup
    let cleanup = updateInteractiveElements();

    // Re-attach listeners when DOM changes (for dynamic content)
    // Debounced to avoid excessive recalculation
    let mutationTimeout: NodeJS.Timeout;
    const observer = new MutationObserver(() => {
      clearTimeout(mutationTimeout);
      mutationTimeout = setTimeout(() => {
        cleanup();
        cleanup = updateInteractiveElements();
      }, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Start animation loop
    requestRef.current = requestAnimationFrame(animateCursor);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      clearTimeout(mutationTimeout);
      observer.disconnect();
      cleanup();
      window.removeEventListener('resize', checkMobile);
    };
  }, []); // Empty dependency array - effect runs once on mount

  return { cursorRef, cursorRingRef, cursorState };
};
