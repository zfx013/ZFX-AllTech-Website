"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";

interface MeshGradientProps {
  /** Tuple of two colors for the gradient blobs */
  colors: [string, string];
  /** Overall opacity of the gradient layer (default: 0.15) */
  opacity?: number;
  /** Additional CSS class names */
  className?: string;
}

interface BlobConfig {
  id: number;
  size: number;
  initialX: string;
  initialY: string;
  color: string;
  blur: number;
  duration: number;
  xKeyframes: string[];
  yKeyframes: string[];
  scaleKeyframes: number[];
}

function generateBlobs(colors: [string, string]): BlobConfig[] {
  const blobs: BlobConfig[] = [
    {
      id: 0,
      size: 400,
      initialX: "10%",
      initialY: "10%",
      color: colors[0],
      blur: 100,
      duration: 25,
      xKeyframes: ["10%", "60%", "30%", "70%", "10%"],
      yKeyframes: ["10%", "40%", "70%", "20%", "10%"],
      scaleKeyframes: [1, 1.2, 0.9, 1.1, 1],
    },
    {
      id: 1,
      size: 350,
      initialX: "70%",
      initialY: "20%",
      color: colors[1],
      blur: 90,
      duration: 22,
      xKeyframes: ["70%", "20%", "50%", "30%", "70%"],
      yKeyframes: ["20%", "60%", "30%", "70%", "20%"],
      scaleKeyframes: [1, 0.85, 1.15, 0.95, 1],
    },
    {
      id: 2,
      size: 300,
      initialX: "40%",
      initialY: "60%",
      color: colors[0],
      blur: 110,
      duration: 28,
      xKeyframes: ["40%", "80%", "20%", "60%", "40%"],
      yKeyframes: ["60%", "20%", "40%", "80%", "60%"],
      scaleKeyframes: [1, 1.1, 1.25, 0.9, 1],
    },
    {
      id: 3,
      size: 280,
      initialX: "80%",
      initialY: "70%",
      color: colors[1],
      blur: 80,
      duration: 20,
      xKeyframes: ["80%", "30%", "60%", "10%", "80%"],
      yKeyframes: ["70%", "30%", "50%", "60%", "70%"],
      scaleKeyframes: [1, 1.15, 0.85, 1.05, 1],
    },
    {
      id: 4,
      size: 320,
      initialX: "25%",
      initialY: "40%",
      color: colors[0],
      blur: 120,
      duration: 30,
      xKeyframes: ["25%", "55%", "75%", "15%", "25%"],
      yKeyframes: ["40%", "70%", "15%", "55%", "40%"],
      scaleKeyframes: [1, 0.9, 1.2, 1.05, 1],
    },
  ];

  return blobs;
}

const MeshGradient = memo(function MeshGradient({
  colors,
  opacity = 0.15,
  className = "",
}: MeshGradientProps) {
  const blobs = useMemo(() => generateBlobs(colors), [colors]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle at center, ${blob.color}, transparent 70%)`,
            filter: `blur(${blob.blur}px)`,
            left: blob.initialX,
            top: blob.initialY,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            left: blob.xKeyframes,
            top: blob.yKeyframes,
            scale: blob.scaleKeyframes,
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
});

MeshGradient.displayName = "MeshGradient";

export default MeshGradient;
