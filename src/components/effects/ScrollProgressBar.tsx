'use client';

import { useEffect, useState, useRef } from 'react';
import { onScroll } from '@/lib/lenis-utils';

/**
 * ScrollProgressBar Component
 * Displays a premium gradient progress bar at the top of the page
 * with animated shimmer effect and smooth transitions
 */
export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const cleanup = onScroll((data) => {
      // Calculate scroll progress as percentage with smooth clamping
      const progress = (data.scroll / data.limit) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Track scrolling state for enhanced effects
      setIsScrolling(true);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    });

    return () => {
      cleanup();
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  // Calculate dynamic glow intensity based on scroll position
  const glowIntensity = Math.min(scrollProgress / 50, 1);
  const isNearEnd = scrollProgress > 95;
  const isAtStart = scrollProgress < 5;

  return (
    <div
      className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-[9998] overflow-hidden"
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      {/* Background track with subtle visibility */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        style={{
          opacity: scrollProgress > 0 ? 0.5 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Main progress bar */}
      <div
        ref={progressRef}
        className="h-full relative"
        style={{
          width: `${scrollProgress}%`,
          background: `linear-gradient(90deg,
            rgba(139, 92, 246, 0.9) 0%,
            rgba(167, 139, 250, 1) 25%,
            rgba(139, 92, 246, 1) 50%,
            rgba(196, 181, 253, 1) 75%,
            rgba(139, 92, 246, 0.9) 100%)`,
          backgroundSize: '200% 100%',
          animation: isScrolling ? 'shimmerFast 1s linear infinite' : 'shimmerSlow 3s linear infinite',
          transition: 'width 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          boxShadow: `
            0 0 ${10 + glowIntensity * 15}px rgba(139, 92, 246, ${0.4 + glowIntensity * 0.3}),
            0 0 ${20 + glowIntensity * 30}px rgba(139, 92, 246, ${0.2 + glowIntensity * 0.2}),
            0 ${isScrolling ? 2 : 1}px ${isScrolling ? 8 : 4}px rgba(139, 92, 246, 0.3)
          `,
          transform: isNearEnd ? 'scaleY(1.2)' : 'scaleY(1)',
          transformOrigin: 'top',
          willChange: 'width, transform',
        }}
      >
        {/* Leading edge glow effect */}
        <div
          className="absolute right-0 top-0 h-full w-8"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.8) 100%)',
            opacity: isScrolling ? 1 : 0.5,
            transition: 'opacity 0.2s ease',
            filter: 'blur(1px)',
          }}
        />

        {/* Particle trail effect when scrolling */}
        {isScrolling && (
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(139, 92, 246, 0.6)',
              animation: 'pulse 0.5s ease-in-out infinite',
            }}
          />
        )}
      </div>

      {/* End marker glow when reaching bottom */}
      {isNearEnd && (
        <div
          className="absolute right-0 top-0 h-full w-4"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.8) 100%)',
            animation: 'pulseGlow 1s ease-in-out infinite',
          }}
        />
      )}

      {/* Styles for animations */}
      <style jsx>{`
        @keyframes shimmerFast {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        @keyframes shimmerSlow {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: translateY(-50%) scale(1);
          }
          50% {
            opacity: 0.7;
            transform: translateY(-50%) scale(1.3);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
