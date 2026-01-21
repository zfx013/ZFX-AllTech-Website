'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useCursor } from '@/hooks/useCursor';
import gsap from 'gsap';

export default function CustomCursor() {
  const { cursorRef, cursorRingRef, cursorState } = useCursor();
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trailPositions = useRef<{ x: number; y: number }[]>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const animationFrameRef = useRef<number>(0);

  // Animate cursor trails following the main cursor with delay
  const animateTrails = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Get current cursor position from transform
    const cursorTransform = cursor.style.transform;
    const match = cursorTransform.match(/translate\(([^,]+)px,\s*([^)]+)px\)/);

    if (match) {
      const cursorX = parseFloat(match[1]);
      const cursorY = parseFloat(match[2]);

      // Update trail positions with smooth lerp (each trail follows the previous)
      trailRefs.current.forEach((trail, i) => {
        if (!trail) return;

        const target = i === 0
          ? { x: cursorX, y: cursorY }
          : trailPositions.current[i - 1];

        // Different lerp factors for each trail for staggered effect
        const lerp = 0.15 - i * 0.03;

        trailPositions.current[i].x += (target.x - trailPositions.current[i].x) * lerp;
        trailPositions.current[i].y += (target.y - trailPositions.current[i].y) * lerp;

        gsap.set(trail, {
          x: trailPositions.current[i].x,
          y: trailPositions.current[i].y,
          xPercent: -50,
          yPercent: -50,
          force3D: true,
        });
      });
    }

    animationFrameRef.current = requestAnimationFrame(animateTrails);
  }, [cursorRef]);

  // Start trail animation
  useEffect(() => {
    // Check if device supports hover (not touch)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    animationFrameRef.current = requestAnimationFrame(animateTrails);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animateTrails]);

  // Animate cursor appearance changes based on state
  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = cursorRingRef.current;
    if (!cursor || !ring) return;

    const timeline = gsap.timeline();

    if (cursorState.isButton) {
      // Magnetic button effect - scale up both cursor and ring with elastic feel
      timeline
        .to(cursor, {
          scale: 0.4,
          backgroundColor: '#a78bfa',
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
        }, 0)
        .to(ring, {
          scale: 1.8,
          borderColor: '#8b5cf6',
          borderWidth: 2,
          opacity: 0.8,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
        }, 0);
    } else if (cursorState.isPortfolio) {
      // Portfolio item hover - show "VIEW" text with dramatic scale
      timeline
        .to(cursor, {
          scale: 3,
          backgroundColor: 'rgba(139, 92, 246, 0.15)',
          backdropFilter: 'blur(4px)',
          duration: 0.4,
          ease: 'back.out(1.7)',
        }, 0)
        .to(ring, {
          scale: 2.2,
          borderColor: '#8b5cf6',
          borderWidth: 2,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
        }, 0);
    } else if (cursorState.isHovering) {
      // Regular link hover - scale up with smooth spring
      timeline
        .to(cursor, {
          scale: 0.7,
          backgroundColor: '#a78bfa',
          duration: 0.35,
          ease: 'back.out(2)',
        }, 0)
        .to(ring, {
          scale: 1.4,
          borderColor: '#a78bfa',
          borderWidth: 1.5,
          opacity: 0.9,
          duration: 0.35,
          ease: 'back.out(2)',
        }, 0);
    } else {
      // Default state with subtle pulse animation
      timeline
        .to(cursor, {
          scale: 1,
          backgroundColor: '#8b5cf6',
          duration: 0.4,
          ease: 'elastic.out(1, 0.6)',
        }, 0)
        .to(ring, {
          scale: 1,
          borderColor: 'rgba(255, 255, 255, 0.25)',
          borderWidth: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'elastic.out(1, 0.6)',
        }, 0);
    }

    return () => {
      timeline.kill();
    };
  }, [cursorState, cursorRef, cursorRingRef]);

  return (
    <>
      {/* Cursor trail elements for premium feel */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="custom-cursor-trail pointer-events-none fixed top-0 left-0 z-[9997]"
          style={{
            width: `${6 - i * 1.5}px`,
            height: `${6 - i * 1.5}px`,
            borderRadius: '50%',
            backgroundColor: '#8b5cf6',
            opacity: 0.08 - i * 0.02,
            willChange: 'transform',
            filter: `blur(${i}px)`,
          }}
        />
      ))}

      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[10000] mix-blend-difference"
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#8b5cf6',
          willChange: 'transform',
          transition: 'background-color 0.15s ease',
        }}
      >
        {/* "VIEW" text for portfolio items */}
        {cursorState.isPortfolio && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-[10px] font-bold tracking-widest text-white uppercase"
              style={{
                mixBlendMode: 'normal',
                textShadow: '0 0 10px rgba(139, 92, 246, 0.8)',
                animation: 'fadeInScale 0.3s ease-out',
              }}
            >
              VIEW
            </span>
          </div>
        )}
      </div>

      {/* Outer ring with gradient border effect */}
      <div
        ref={cursorRingRef}
        className="custom-cursor-ring pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          willChange: 'transform',
          transition: 'border-color 0.2s ease, border-width 0.2s ease, opacity 0.2s ease',
          opacity: 0.6,
        }}
      />

      {/* Inner glow ring */}
      <div
        className="custom-cursor-glow pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
          opacity: cursorState.isHovering || cursorState.isButton ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Global styles to hide default cursor */}
      <style jsx global>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes cursorPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(139, 92, 246, 0);
          }
        }

        @media (pointer: fine) {
          * {
            cursor: none !important;
          }

          /* Ensure cursor is hidden on all elements */
          body,
          a,
          button,
          input,
          textarea,
          select {
            cursor: none !important;
          }
        }

        /* Show default cursor on mobile/touch devices */
        @media (pointer: coarse) {
          .custom-cursor,
          .custom-cursor-ring,
          .custom-cursor-trail,
          .custom-cursor-glow {
            display: none !important;
          }
        }

        /* Smooth cursor transitions */
        .custom-cursor,
        .custom-cursor-ring,
        .custom-cursor-trail {
          transition: opacity 0.3s ease;
        }

        /* Premium glow effect for cursor */
        .custom-cursor {
          filter: drop-shadow(0 0 6px rgba(139, 92, 246, 0.7))
                  drop-shadow(0 0 12px rgba(139, 92, 246, 0.4));
        }

        .custom-cursor-ring {
          filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.15));
          backdrop-filter: blur(0.5px);
        }

        /* Subtle pulse animation when idle */
        .custom-cursor::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          animation: cursorPulse 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
