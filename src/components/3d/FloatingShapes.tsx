'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

type ShapeType = 'icosahedron' | 'torus' | 'box' | 'octahedron' | 'dodecahedron';

interface ShapeProps {
  position: [number, number, number];
  scale?: number;
  color: string;
  type: ShapeType;
  /** Animation speed multiplier */
  speedFactor?: number;
  /** Distortion intensity */
  distortIntensity?: number;
  /** Emissive glow intensity */
  glowIntensity?: number;
}

interface GlassShapeProps {
  position: [number, number, number];
  scale?: number;
  color?: string;
}

// Memoized shape configurations
const SHAPE_CONFIGS: Array<Omit<ShapeProps, 'children'>> = [
  { position: [-4, 2, -5], scale: 1.3, color: '#8b5cf6', type: 'icosahedron', speedFactor: 0.8 },
  { position: [4.5, -0.5, -4], scale: 1.1, color: '#10b981', type: 'torus', speedFactor: 0.6 },
  { position: [-2.5, -2.5, -3], scale: 0.7, color: '#a78bfa', type: 'octahedron', speedFactor: 0.9 },
  { position: [3, 3.5, -6], scale: 0.9, color: '#34d399', type: 'box', speedFactor: 0.7 },
  { position: [0.5, 1.5, -7], scale: 1.1, color: '#6366f1', type: 'dodecahedron', speedFactor: 0.5 },
  { position: [-5, -0.5, -4.5], scale: 0.85, color: '#059669', type: 'torus', speedFactor: 0.65 },
  { position: [2.5, -3.5, -5], scale: 0.95, color: '#7c3aed', type: 'octahedron', speedFactor: 0.75 },
];

const GLASS_CONFIGS: GlassShapeProps[] = [
  { position: [0, 0, -9], scale: 1.0, color: '#8b5cf6' },
  { position: [-3.5, 2.5, -7], scale: 0.7, color: '#10b981' },
];

function FloatingShape({
  position,
  scale = 1,
  color,
  type,
  speedFactor = 1,
  distortIntensity = 0.3,
  glowIntensity = 0.4,
}: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Memoize animation parameters for consistent behavior
  const animParams = useMemo(
    () => ({
      floatSpeed: (0.3 + Math.random() * 0.3) * speedFactor,
      rotationSpeed: (0.008 + Math.random() * 0.012) * speedFactor,
      floatAmplitude: 0.4 + Math.random() * 0.3,
      phaseOffset: Math.random() * Math.PI * 2,
    }),
    [speedFactor]
  );

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Smooth floating with eased sine wave
    const floatOffset = Math.sin(time * animParams.floatSpeed + animParams.phaseOffset);
    const easedFloat = floatOffset * (1 - Math.abs(floatOffset) * 0.2); // Soft easing

    meshRef.current.position.y = position[1] + easedFloat * animParams.floatAmplitude;
    meshRef.current.position.x =
      position[0] + Math.cos(time * animParams.floatSpeed * 0.5 + animParams.phaseOffset) * 0.25;

    // Frame-rate independent rotation with damping
    const rotationDelta = animParams.rotationSpeed * delta * 60;
    meshRef.current.rotation.x += rotationDelta;
    meshRef.current.rotation.y += rotationDelta * 0.7;
    meshRef.current.rotation.z += rotationDelta * 0.3;
  });

  // Render optimized geometry based on type
  const GeometryComponent = useMemo(() => {
    switch (type) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 1]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.35, 24, 64]} />;
      case 'box':
        return <boxGeometry args={[1.3, 1.3, 1.3, 2, 2, 2]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1, 1]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, 0]} />;
      default:
        return <icosahedronGeometry args={[1, 1]} />;
    }
  }, [type]);

  return (
    <mesh ref={meshRef} position={position} scale={scale} frustumCulled>
      {GeometryComponent}
      <MeshDistortMaterial
        color={color}
        transparent
        opacity={0.75}
        distort={distortIntensity}
        speed={1.5}
        roughness={0.15}
        metalness={0.85}
        emissive={color}
        emissiveIntensity={glowIntensity}
      />
    </mesh>
  );
}

function GlassShape({ position, scale = 1, color = '#8b5cf6' }: GlassShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const animParams = useMemo(
    () => ({
      floatSpeed: 0.3 + Math.random() * 0.2,
      rotationX: 0.15 + Math.random() * 0.1,
      rotationY: 0.12 + Math.random() * 0.08,
      phaseOffset: Math.random() * Math.PI * 2,
    }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    meshRef.current.position.y =
      position[1] + Math.sin(time * animParams.floatSpeed + animParams.phaseOffset) * 0.25;
    meshRef.current.rotation.x = time * animParams.rotationX;
    meshRef.current.rotation.y = time * animParams.rotationY;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} frustumCulled>
      <torusKnotGeometry args={[0.7, 0.25, 100, 24]} />
      <MeshTransmissionMaterial
        backside
        samples={8}
        resolution={256}
        transmission={0.95}
        roughness={0.15}
        thickness={0.8}
        chromaticAberration={0.4}
        anisotropy={0.8}
        distortion={0.25}
        distortionScale={0.4}
        temporalDistortion={0.08}
        color={color}
      />
    </mesh>
  );
}

export default function FloatingShapes() {
  return (
    <group>
      {/* Main floating shapes with optimized rendering */}
      {SHAPE_CONFIGS.map((config, index) => (
        <FloatingShape key={`shape-${index}`} {...config} />
      ))}

      {/* Glass/transparent shapes for depth - reduced samples for performance */}
      {GLASS_CONFIGS.map((config, index) => (
        <GlassShape key={`glass-${index}`} {...config} />
      ))}
    </group>
  );
}
