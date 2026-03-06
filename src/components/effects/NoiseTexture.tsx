"use client";

import { memo } from "react";

interface NoiseTextureProps {
  /** Opacity of the noise overlay (default: 0.035) */
  opacity?: number;
}

const NoiseTexture = memo(function NoiseTexture({
  opacity = 0.035,
}: NoiseTextureProps) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-30"
      aria-hidden="true"
      style={{ opacity }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-full w-full"
      >
        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={3}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" />
      </svg>
    </div>
  );
});

NoiseTexture.displayName = "NoiseTexture";

export default NoiseTexture;
