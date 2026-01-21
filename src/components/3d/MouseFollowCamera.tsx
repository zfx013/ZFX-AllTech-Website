'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface MouseFollowCameraProps {
  /** Camera movement intensity (default: 2) */
  intensity?: number;
  /** Smoothing factor - lower is smoother (default: 0.03) */
  smoothing?: number;
  /** Enable/disable the effect */
  enabled?: boolean;
}

export default function MouseFollowCamera({
  intensity = 2,
  smoothing = 0.03,
  enabled = true,
}: MouseFollowCameraProps) {
  const mouse = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  // Memoized mouse move handler
  const handleMouseMove = useCallback((event: MouseEvent) => {
    mouse.current = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    };
  }, []);

  // Handle touch for mobile devices
  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      mouse.current = {
        x: (touch.clientX / window.innerWidth) * 2 - 1,
        y: -(touch.clientY / window.innerHeight) * 2 + 1,
      };
    }
  }, []);

  // Properly setup and cleanup event listeners
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [enabled, handleMouseMove, handleTouchMove]);

  useFrame((_, delta) => {
    if (!enabled) return;

    // Calculate target position with intensity
    targetPosition.current.x = mouse.current.x * intensity;
    targetPosition.current.y = mouse.current.y * intensity;

    // Use delta time for frame-rate independent smoothing
    const lerpFactor = 1 - Math.pow(1 - smoothing, delta * 60);

    // Smooth camera movement following mouse
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      targetPosition.current.x,
      lerpFactor
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      targetPosition.current.y,
      lerpFactor
    );

    // Always look at center
    camera.lookAt(0, 0, 0);
  });

  return null;
}
