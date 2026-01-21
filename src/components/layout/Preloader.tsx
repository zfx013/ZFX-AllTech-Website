"use client";

import { useEffect, useRef } from "react";
import { useLoading } from "@/context/LoadingContext";
import { gsap } from "gsap";

export default function Preloader() {
  const { isLoading, progress } = useLoading();
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const glowOrbRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);

  // Initial entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = logoRef.current?.querySelectorAll(".letter");

      if (letters && letters.length > 0) {
        // Set initial states with more dramatic positioning
        gsap.set(letters, {
          opacity: 0,
          y: 120,
          rotationX: -90,
          rotationY: 15,
          scale: 0.8,
          transformOrigin: "center bottom",
          filter: "blur(10px)"
        });

        // Animate letters in sequence with premium easing
        gsap.to(letters, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: {
            each: 0.06,
            ease: "power2.in"
          },
          ease: "elastic.out(1, 0.5)",
          delay: 0.4,
        });

        // Add subtle breathing pulse to logo after entrance
        gsap.to(letters, {
          textShadow: "0 0 40px rgba(139, 92, 246, 0.8), 0 0 80px rgba(139, 92, 246, 0.5), 0 0 120px rgba(139, 92, 246, 0.3)",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5,
        });
      }

      // Animate accent line
      if (accentLineRef.current) {
        gsap.set(accentLineRef.current, { scaleX: 0, opacity: 0 });
        gsap.to(accentLineRef.current, {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
          delay: 1.2,
        });
      }

      // Animate glow orb pulsing
      if (glowOrbRef.current) {
        gsap.to(glowOrbRef.current, {
          scale: 1.2,
          opacity: 0.3,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      gsap.set(progressBarRef.current, { scaleX: 0 });
      gsap.set(progressTextRef.current, { opacity: 0, y: 20 });

      // Fade in progress elements with slide up
      gsap.to(progressTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 1.4,
      });
    }, preloaderRef);

    return () => ctx.revert();
  }, []);

  // Progress bar animation with smooth interpolation
  useEffect(() => {
    gsap.to(progressBarRef.current, {
      scaleX: progress / 100,
      duration: 0.5,
      ease: "power3.out",
    });
  }, [progress]);

  // Shimmer effect - only start once
  useEffect(() => {
    if (progressBarRef.current) {
      gsap.fromTo(progressBarRef.current,
        { backgroundPosition: "0% 50%" },
        {
          backgroundPosition: "200% 50%",
          duration: 1.5,
          ease: "none",
          repeat: -1,
        }
      );
    }
  }, []);

  // Exit animation with premium reveal
  useEffect(() => {
    if (!isLoading && preloaderRef.current) {
      const ctx = gsap.context(() => {
        const letters = logoRef.current?.querySelectorAll(".letter");
        const tl = gsap.timeline({
          onComplete: () => {
            if (preloaderRef.current) {
              preloaderRef.current.style.pointerEvents = "none";
              preloaderRef.current.style.visibility = "hidden";
            }
          },
        });

        // Kill any ongoing animations
        if (letters) gsap.killTweensOf(letters);
        if (glowOrbRef.current) gsap.killTweensOf(glowOrbRef.current);

        // First: flash the logo brighter momentarily
        if (letters && letters.length > 0) {
          tl.to(letters, {
            textShadow: "0 0 60px rgba(139, 92, 246, 1), 0 0 120px rgba(139, 92, 246, 0.8)",
            duration: 0.2,
            ease: "power2.in",
          });
        }

        tl

        // Fade out progress with scale
        .to([progressBarRef.current, progressTextRef.current], {
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          ease: "power2.in",
        }, "-=0.1")

        // Animate logo letters out with stagger
        if (letters && letters.length > 0) {
          tl.to(letters, {
            opacity: 0,
            y: -60,
            rotationX: 45,
            scale: 0.8,
            filter: "blur(10px)",
            duration: 0.5,
            stagger: 0.03,
            ease: "power3.in",
          }, "-=0.2");
        }

        tl

        // Expand glow orb before panel split
        .to(glowOrbRef.current, {
          scale: 2,
          opacity: 0.5,
          duration: 0.4,
          ease: "power2.out",
        }, "-=0.3")

        // Split the preloader panels with premium timing
        .to(topPanelRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "expo.inOut",
        }, "-=0.1")
        .to(bottomPanelRef.current, {
          yPercent: 100,
          duration: 0.9,
          ease: "expo.inOut",
        }, "-=0.9")

        // Fade glow orb
        .to(glowOrbRef.current, {
          opacity: 0,
          scale: 3,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.5")

        // Finally: fade out the entire preloader smoothly
        .to(preloaderRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        }, "-=0.3");
      }, preloaderRef);

      return () => ctx.revert();
    }
  }, [isLoading]);

  const logoText = "ZFX AllTech";
  const letters = logoText.split("");

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? "auto" : "none",
      }}
    >
      {/* Top Panel */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#09090b]"
        style={{
          borderBottom: "1px solid rgba(139, 92, 246, 0.1)",
        }}
      />

      {/* Bottom Panel */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#09090b]"
        style={{
          borderTop: "1px solid rgba(139, 92, 246, 0.1)",
        }}
      />

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Glowing orb background effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            ref={glowOrbRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, rgba(167, 139, 250, 0.3) 30%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          {/* Secondary smaller orb for depth */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(167, 139, 250, 0.6) 0%, transparent 60%)",
              filter: "blur(40px)",
              animation: "pulse 3s ease-in-out infinite alternate",
            }}
          />
        </div>

        {/* Logo Text */}
        <div
          ref={logoRef}
          className="relative mb-16 perspective-1000"
        >
          <div className="flex items-center gap-1 text-6xl md:text-7xl lg:text-8xl font-bold">
            {letters.map((letter, index) => (
              <span
                key={index}
                className="letter inline-block"
                style={{
                  color: letter === " " ? "transparent" : "#ffffff",
                  textShadow:
                    letter === " "
                      ? "none"
                      : "0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)",
                  marginRight: letter === " " ? "1rem" : "0",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>

          {/* Accent line under logo */}
          <div
            ref={accentLineRef}
            className="absolute -bottom-4 left-0 right-0 h-[2px] origin-center"
            style={{
              background: "linear-gradient(90deg, transparent 0%, #8b5cf6 20%, #a78bfa 50%, #8b5cf6 80%, transparent 100%)",
              boxShadow: "0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.3)",
            }}
          />
        </div>

        {/* Progress Section */}
        <div ref={progressTextRef} className="relative w-full max-w-md px-8">
          {/* Progress Text */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-mono text-gray-400">Loading</span>
            <span className="text-sm font-mono text-[#8b5cf6] font-bold">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Progress Bar Container */}
          <div className="relative h-1 bg-white/5 rounded-full overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8b5cf6]/20 to-transparent animate-pulse" />

            {/* Progress Bar with shimmer */}
            <div
              ref={progressBarRef}
              className="absolute inset-0 origin-left rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #8b5cf6 0%, #a78bfa 25%, #c4b5fd 50%, #a78bfa 75%, #8b5cf6 100%)",
                backgroundSize: "200% 100%",
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.2)",
              }}
            />
          </div>

          {/* Decorative corner brackets */}
          <div className="absolute -top-8 -left-4 w-8 h-8 border-l-2 border-t-2 border-[#8b5cf6]/30" />
          <div className="absolute -top-8 -right-4 w-8 h-8 border-r-2 border-t-2 border-[#8b5cf6]/30" />
          <div className="absolute -bottom-8 -left-4 w-8 h-8 border-l-2 border-b-2 border-[#8b5cf6]/30" />
          <div className="absolute -bottom-8 -right-4 w-8 h-8 border-r-2 border-b-2 border-[#8b5cf6]/30" />
        </div>

        {/* Animated particles with varying sizes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => {
            const size = 1 + Math.random() * 3;
            const isLarge = i < 5;
            return (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: isLarge ? `${size * 2}px` : `${size}px`,
                  height: isLarge ? `${size * 2}px` : `${size}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: isLarge
                    ? "radial-gradient(circle, rgba(167, 139, 250, 0.8) 0%, rgba(139, 92, 246, 0.4) 50%, transparent 100%)"
                    : "#8b5cf6",
                  opacity: 0.2 + Math.random() * 0.4,
                  animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 3}s`,
                  filter: isLarge ? "blur(1px)" : "none",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-15px) translateX(8px) scale(1.1);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-25px) translateX(-5px) scale(0.9);
            opacity: 0.6;
          }
          75% {
            transform: translateY(-10px) translateX(-10px) scale(1.05);
            opacity: 0.4;
          }
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0.15;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
