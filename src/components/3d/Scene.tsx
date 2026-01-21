'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Suspense, ReactNode, useMemo } from 'react';
import * as THREE from 'three';

interface SceneProps {
  children: ReactNode;
  mouseFollow?: boolean;
  /** Enable high quality mode (more expensive effects) */
  highQuality?: boolean;
}

export default function Scene({ children, mouseFollow = true, highQuality = false }: SceneProps) {
  // Memoize GL config for performance
  const glConfig = useMemo(
    () => ({
      alpha: true,
      antialias: true,
      toneMapping: THREE.ACESFilmicToneMapping,
      toneMappingExposure: 1.15,
      powerPreference: 'high-performance' as const,
      stencil: false,
      depth: true,
    }),
    []
  );

  return (
    <Canvas
      className="absolute inset-0"
      gl={glConfig}
      dpr={[1, highQuality ? 2 : 1.5]}
      performance={{ min: 0.5 }}
      frameloop="demand"
      style={{ touchAction: 'none' }}
    >
      {/* Adaptive performance helpers */}
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      {/* Camera with slightly wider FOV for more immersive feel */}
      <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} near={0.1} far={100} />

      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.4} color="#ffffff" />

      {/* Main violet accent light */}
      <pointLight
        position={[8, 8, 8]}
        intensity={1.2}
        color="#8b5cf6"
        distance={30}
        decay={2}
      />

      {/* Emerald accent light for contrast */}
      <pointLight
        position={[-8, -6, -8]}
        intensity={0.9}
        color="#10b981"
        distance={25}
        decay={2}
      />

      {/* Soft fill light from front */}
      <pointLight
        position={[0, 0, 15]}
        intensity={0.3}
        color="#6366f1"
        distance={20}
        decay={2}
      />

      {/* Top spotlight for dramatic lighting */}
      <spotLight
        position={[0, 12, 5]}
        angle={0.4}
        penumbra={0.8}
        intensity={1.2}
        color="#8b5cf6"
        distance={40}
        decay={2}
      />

      {/* Rim light from back */}
      <directionalLight
        position={[-5, 5, -10]}
        intensity={0.4}
        color="#34d399"
      />

      {/* Content with suspense boundary */}
      <Suspense fallback={null}>
        {children}
        <Preload all />
      </Suspense>

      {/* Post-processing effects - optimized for performance */}
      <EffectComposer multisampling={0} enableNormalPass={false}>
        <Bloom
          intensity={highQuality ? 1.8 : 1.4}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.85}
          mipmapBlur
          radius={0.8}
        />
        <Vignette
          eskil={false}
          offset={0.15}
          darkness={0.35}
        />
      </EffectComposer>

      {/* Controls for subtle mouse movement - disabled when using custom camera follow */}
      {mouseFollow && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          enableDamping
          dampingFactor={0.05}
          makeDefault
        />
      )}

      {/* Fog for depth */}
      <fog attach="fog" args={['#09090b', 20, 60]} />
    </Canvas>
  );
}
