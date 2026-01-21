"use client";

import { useEffect, useRef, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  connections: number[];
  pulsePhase: number;
  type: "main" | "secondary" | "tertiary";
}

interface Pulse {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  const createNodes = useCallback((width: number, height: number) => {
    const nodes: Node[] = [];
    const nodeCount = Math.floor((width * height) / 25000);
    const clampedCount = Math.min(Math.max(nodeCount, 30), 80);

    for (let i = 0; i < clampedCount; i++) {
      const type =
        Math.random() < 0.2
          ? "main"
          : Math.random() < 0.5
          ? "secondary"
          : "tertiary";
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: type === "main" ? 4 : type === "secondary" ? 2.5 : 1.5,
        connections: [],
        pulsePhase: Math.random() * Math.PI * 2,
        type,
      });
    }

    // Create connections
    nodes.forEach((node, i) => {
      const distances: { index: number; dist: number }[] = [];
      nodes.forEach((other, j) => {
        if (i !== j) {
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          distances.push({ index: j, dist });
        }
      });
      distances.sort((a, b) => a.dist - b.dist);
      const connectionCount = node.type === "main" ? 4 : node.type === "secondary" ? 3 : 2;
      node.connections = distances
        .slice(0, connectionCount)
        .filter((d) => d.dist < 300)
        .map((d) => d.index);
    });

    return nodes;
  }, []);

  const createPulse = useCallback((nodes: Node[]) => {
    if (nodes.length === 0) return null;
    const fromIndex = Math.floor(Math.random() * nodes.length);
    const node = nodes[fromIndex];
    if (node.connections.length === 0) return null;
    const toIndex = node.connections[Math.floor(Math.random() * node.connections.length)];

    const colors = [
      "rgba(139, 92, 246, 0.8)",  // violet
      "rgba(16, 185, 129, 0.8)",  // emerald
      "rgba(99, 102, 241, 0.8)",  // indigo
    ];

    return {
      fromNode: fromIndex,
      toNode: toIndex,
      progress: 0,
      speed: 0.008 + Math.random() * 0.012,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      nodesRef.current = createNodes(rect.width, rect.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    let lastPulseTime = 0;
    const pulseInterval = 200;

    const animate = (time: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const pulses = pulsesRef.current;
      const mouse = mouseRef.current;

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Mouse interaction
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          node.vx -= (dx / dist) * force * 0.02;
          node.vy -= (dy / dist) * force * 0.02;
        }

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Boundary bounce
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Damping
        node.vx *= 0.99;
        node.vy *= 0.99;

        // Random movement
        node.vx += (Math.random() - 0.5) * 0.02;
        node.vy += (Math.random() - 0.5) * 0.02;

        // Update pulse phase
        node.pulsePhase += 0.02;

        // Draw connections
        node.connections.forEach((j) => {
          const other = nodes[j];
          const connectionDist = Math.hypot(node.x - other.x, node.y - other.y);
          if (connectionDist < 300) {
            const opacity = (1 - connectionDist / 300) * 0.15;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });

        // Draw node
        const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;
        const nodeColor =
          node.type === "main"
            ? `rgba(139, 92, 246, ${pulse})`
            : node.type === "secondary"
            ? `rgba(16, 185, 129, ${pulse * 0.8})`
            : `rgba(99, 102, 241, ${pulse * 0.6})`;

        // Glow effect for main nodes
        if (node.type === "main") {
          const gradient = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            node.radius * 4
          );
          gradient.addColorStop(0, `rgba(139, 92, 246, ${pulse * 0.3})`);
          gradient.addColorStop(1, "rgba(139, 92, 246, 0)");
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      });

      // Create new pulses
      if (time - lastPulseTime > pulseInterval) {
        const newPulse = createPulse(nodes);
        if (newPulse) {
          pulses.push(newPulse);
        }
        lastPulseTime = time;
      }

      // Update and draw pulses
      pulsesRef.current = pulses.filter((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) return false;

        const from = nodes[pulse.fromNode];
        const to = nodes[pulse.toNode];
        const x = from.x + (to.x - from.x) * pulse.progress;
        const y = from.y + (to.y - from.y) * pulse.progress;

        // Draw pulse trail
        const trailLength = 0.15;
        const trailStart = Math.max(0, pulse.progress - trailLength);
        const gradient = ctx.createLinearGradient(
          from.x + (to.x - from.x) * trailStart,
          from.y + (to.y - from.y) * trailStart,
          x,
          y
        );
        gradient.addColorStop(0, "rgba(139, 92, 246, 0)");
        gradient.addColorStop(1, pulse.color);

        ctx.beginPath();
        ctx.moveTo(
          from.x + (to.x - from.x) * trailStart,
          from.y + (to.y - from.y) * trailStart
        );
        ctx.lineTo(x, y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw pulse head
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.fill();

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [createNodes, createPulse]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}
