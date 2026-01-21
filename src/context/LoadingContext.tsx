"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  progress: number;
  setProgress: (progress: number) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast progression for instant feel (150-400ms target)
    // Phase 1: 0-90% very fast (150ms)
    // Phase 2: 90-100% on hydration
    let frame: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Fast exponential progression to 90% in ~150ms
      const targetProgress = Math.min(90, (elapsed / 150) * 90);

      setProgress(Math.min(targetProgress, 90));

      if (targetProgress < 90) {
        frame = requestAnimationFrame(animate);
      } else {
        // Jump to 100% immediately after reaching 90%
        setProgress(100);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Minimal delay after reaching 100% (just for visual completion)
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <LoadingContext.Provider
      value={{ isLoading, setIsLoading, progress, setProgress }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
