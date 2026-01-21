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

  // Fast entrance animation - optimized for instant feel
  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = logoRef.current?.querySelectorAll(".letter");

      if (letters && letters.length > 0) {
        // Set initial states
        gsap.set(letters, {
          opacity: 0,
          y: 30,
          scale: 0.9,
        });

        // Fast animation - all letters appear quickly
        gsap.to(letters, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          stagger: 0.02,
          ease: "power2.out",
        });
      }

      // Fast accent line
      if (accentLineRef.current) {
        gsap.set(accentLineRef.current, { scaleX: 0, opacity: 0 });
        gsap.to(accentLineRef.current, {
          scaleX: 1,
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
          delay: 0.1,
        });
      }

      // Glow orb - simple pulse
      if (glowOrbRef.current) {
        gsap.to(glowOrbRef.current, {
          scale: 1.1,
          opacity: 0.25,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      gsap.set(progressBarRef.current, { scaleX: 0 });
      gsap.set(progressTextRef.current, { opacity: 1 });
    }, preloaderRef);

    return () => ctx.revert();
  }, []);

  // Progress bar animation
  useEffect(() => {
    gsap.to(progressBarRef.current, {
      scaleX: progress / 100,
      duration: 0.15,
      ease: "power2.out",
    });
  }, [progress]);

  // Fast exit animation
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

        tl
        // Quick fade of content
        .to([progressBarRef.current, progressTextRef.current, logoRef.current], {
          opacity: 0,
          duration: 0.15,
          ease: "power2.in",
        })

        // Fast panel split
        .to(topPanelRef.current, {
          yPercent: -100,
          duration: 0.4,
          ease: "power3.inOut",
        }, "-=0.05")
        .to(bottomPanelRef.current, {
          yPercent: 100,
          duration: 0.4,
          ease: "power3.inOut",
        }, "-=0.4")

        // Fade glow
        .to(glowOrbRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        }, "-=0.3")

        // Final fade
        .to(preloaderRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        }, "-=0.1");
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
        className="absolute top-0 left-0 right-0 h-1/2 bg-dark-950"
        style={{
          borderBottom: "1px solid rgba(139, 92, 246, 0.1)",
        }}
      />

      {/* Bottom Panel */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-dark-950"
        style={{
          borderTop: "1px solid rgba(139, 92, 246, 0.1)",
        }}
      />

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Glowing orb background effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            ref={glowOrbRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(167, 139, 250, 0.2) 30%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        {/* Logo Text */}
        <div
          ref={logoRef}
          className="relative mb-12"
        >
          <div className="flex items-center gap-0.5 text-5xl sm:text-6xl md:text-7xl font-bold">
            {letters.map((letter, index) => (
              <span
                key={index}
                className="letter inline-block"
                style={{
                  color: letter === " " ? "transparent" : "#ffffff",
                  textShadow:
                    letter === " "
                      ? "none"
                      : "0 0 20px rgba(139, 92, 246, 0.4)",
                  marginRight: letter === " " ? "0.75rem" : "0",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>

          {/* Accent line under logo */}
          <div
            ref={accentLineRef}
            className="absolute -bottom-3 left-0 right-0 h-[2px] origin-center"
            style={{
              background: "linear-gradient(90deg, transparent 0%, #8b5cf6 20%, #a78bfa 50%, #8b5cf6 80%, transparent 100%)",
              boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
            }}
          />
        </div>

        {/* Progress Section */}
        <div ref={progressTextRef} className="relative w-full max-w-xs sm:max-w-sm px-6">
          {/* Progress Text */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-mono text-dark-400">Loading</span>
            <span className="text-xs font-mono text-violet-400 font-bold tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Progress Bar Container */}
          <div className="relative h-1 bg-dark-800 rounded-full overflow-hidden">
            {/* Progress Bar */}
            <div
              ref={progressBarRef}
              className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-violet-600 via-violet-500 to-violet-400"
              style={{
                boxShadow: "0 0 10px rgba(139, 92, 246, 0.5)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
