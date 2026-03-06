"use client";

import { useEffect, useRef, useCallback, memo } from "react";

interface NeuralNetworkProps {
  /** Number of particles/nodes (default: 90) */
  particleCount?: number;
  /** Color of the nodes (default: "#00FFE0") */
  nodeColor?: string;
  /** Color of the connection lines (default: "#0066FF") */
  lineColor?: string;
  /** Maximum connection distance in px (default: 150) */
  connectionDistance?: number;
  /** Mouse repulsion radius in px (default: 100) */
  mouseRadius?: number;
  /** Additional CSS class names */
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  radius: number;
}

interface MousePosition {
  x: number;
  y: number;
  isActive: boolean;
}

/**
 * Parse a hex color string to its RGB components.
 * Supports both 3-char (#RGB) and 6-char (#RRGGBB) hex.
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleaned = hex.replace("#", "");
  const fullHex =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((c) => c + c)
          .join("")
      : cleaned;

  const num = parseInt(fullHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function createParticles(
  count: number,
  width: number,
  height: number
): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      baseX: x,
      baseY: y,
      radius: 2 + Math.random() * 1.5,
    });
  }
  return particles;
}

const NeuralNetwork = memo(function NeuralNetwork({
  particleCount = 90,
  nodeColor = "#00FFE0",
  lineColor = "#0066FF",
  connectionDistance = 150,
  mouseRadius = 100,
  className = "",
}: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0, isActive: false });
  const dimensionsRef = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const nodeRgb = hexToRgb(nodeColor);
  const lineRgb = hexToRgb(lineColor);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    dimensionsRef.current = { width, height };

    // Re-initialize particles if dimensions changed significantly
    if (
      particlesRef.current.length === 0 ||
      Math.abs(width - particlesRef.current[0].baseX * 2) > width * 0.5
    ) {
      particlesRef.current = createParticles(particleCount, width, height);
    }
  }, [particleCount]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = dimensionsRef.current;
    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    const connDist = connectionDistance;
    const connDistSq = connDist * connDist;
    const mouseRadSq = mouseRadius * mouseRadius;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Boundary wrapping with soft bounce
      if (p.x < 0) {
        p.x = 0;
        p.vx = Math.abs(p.vx);
      } else if (p.x > width) {
        p.x = width;
        p.vx = -Math.abs(p.vx);
      }
      if (p.y < 0) {
        p.y = 0;
        p.vy = Math.abs(p.vy);
      } else if (p.y > height) {
        p.y = height;
        p.vy = -Math.abs(p.vy);
      }

      // Mouse repulsion
      if (mouse.isActive) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < mouseRadSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (mouseRadius - dist) / mouseRadius;
          const forceX = (dx / dist) * force * 2;
          const forceY = (dy / dist) * force * 2;
          p.x += forceX;
          p.y += forceY;
        }
      }

      // Draw node with glow
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${nodeRgb.r}, ${nodeRgb.g}, ${nodeRgb.b}, 0.9)`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = `rgba(${nodeRgb.r}, ${nodeRgb.g}, ${nodeRgb.b}, 0.6)`;
      ctx.fill();
      ctx.restore();

      // Draw connections only for nearby particles (j > i to avoid duplicates)
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const cdx = p.x - p2.x;
        const cdy = p.y - p2.y;
        const cDistSq = cdx * cdx + cdy * cdy;

        if (cDistSq < connDistSq) {
          const cDist = Math.sqrt(cDistSq);
          // Opacity inversely proportional to distance
          const alpha = (1 - cDist / connDist) * 0.5;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${lineRgb.r}, ${lineRgb.g}, ${lineRgb.b}, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [connectionDistance, mouseRadius, nodeRgb, lineRgb]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Initialize
    handleResize();

    if (prefersReducedMotion) {
      // Draw a single static frame instead of animating
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const { width, height } = dimensionsRef.current;
        const particles = particlesRef.current;
        const connDist = connectionDistance;
        const connDistSq = connDist * connDist;
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${nodeRgb.r}, ${nodeRgb.g}, ${nodeRgb.b}, 0.9)`;
          ctx.fill();
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < connDistSq) {
              const dist = Math.sqrt(distSq);
              const alpha = (1 - dist / connDist) * 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${lineRgb.r}, ${lineRgb.g}, ${lineRgb.b}, ${alpha})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }
      return;
    }

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isActive: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { ...mouseRef.current, isActive: false };
    };

    // Event listeners
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleResize, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-auto absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
});

NeuralNetwork.displayName = "NeuralNetwork";

export default NeuralNetwork;
