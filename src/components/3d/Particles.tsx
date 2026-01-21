'use client';

import { useRef, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  /** Number of particles (default: 3000) */
  count?: number;
  /** Particle size (default: 0.06) */
  size?: number;
  /** Spread radius (default: 40) */
  spread?: number;
  /** Animation speed multiplier (default: 1) */
  speedFactor?: number;
  /** Particle opacity (default: 0.7) */
  opacity?: number;
}

// Violet color in RGB (normalized)
const VIOLET = { r: 0.545, g: 0.361, b: 0.965 };
// Emerald color in RGB (normalized)
const EMERALD = { r: 0.063, g: 0.725, b: 0.506 };
// Indigo color for variety
const INDIGO = { r: 0.388, g: 0.4, b: 0.945 };

export default function Particles({
  count = 3000,
  size = 0.06,
  spread = 40,
  speedFactor = 1,
  opacity = 0.7,
}: ParticlesProps) {
  const points = useRef<THREE.Points>(null);
  const frameCount = useRef(0);

  // Generate particle data with optimized distribution
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Use spherical distribution for more natural look
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = Math.pow(Math.random(), 0.5) * spread; // Square root for uniform volume distribution

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Three-color gradient for richer visuals
      const mixFactor = Math.random();
      let targetColor;

      if (mixFactor < 0.4) {
        // Violet to Indigo
        const t = mixFactor / 0.4;
        targetColor = {
          r: THREE.MathUtils.lerp(VIOLET.r, INDIGO.r, t),
          g: THREE.MathUtils.lerp(VIOLET.g, INDIGO.g, t),
          b: THREE.MathUtils.lerp(VIOLET.b, INDIGO.b, t),
        };
      } else {
        // Indigo to Emerald
        const t = (mixFactor - 0.4) / 0.6;
        targetColor = {
          r: THREE.MathUtils.lerp(INDIGO.r, EMERALD.r, t),
          g: THREE.MathUtils.lerp(INDIGO.g, EMERALD.g, t),
          b: THREE.MathUtils.lerp(INDIGO.b, EMERALD.b, t),
        };
      }

      colors[i3] = targetColor.r;
      colors[i3 + 1] = targetColor.g;
      colors[i3 + 2] = targetColor.b;

      // Vary particle sizes for depth perception
      sizes[i] = size * (0.5 + Math.random() * 1);
    }

    return { positions, colors, sizes };
  }, [count, spread, size]);

  // Optimized animation with frame skipping for performance
  useFrame((state) => {
    if (!points.current) return;

    frameCount.current++;

    const time = state.clock.getElapsedTime() * speedFactor;

    // Smooth rotation
    points.current.rotation.y = time * 0.03;
    points.current.rotation.x = Math.sin(time * 0.02) * 0.1;

    // Only update positions every 2nd frame for performance
    if (frameCount.current % 2 === 0) {
      const positions = points.current.geometry.attributes.position
        .array as Float32Array;

      // Update only a subset of particles each frame for better performance
      const updateCount = Math.min(count, 500);
      const offset = (frameCount.current * updateCount) % count;

      for (let i = 0; i < updateCount; i++) {
        const idx = ((offset + i) % count) * 3;
        const x = positions[idx];

        // Subtle wave motion
        positions[idx + 1] += Math.sin(time * 0.3 + x * 0.1) * 0.002;
      }

      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={points} frustumCulled={true}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          usage={THREE.DynamicDrawUsage}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
