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
    // Simulate progressive loading with slower, more visible progression
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Slower increment for more visible loading animation
        const increment = Math.random() * 4 + 2;
        return Math.min(prevProgress + increment, 100);
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Keep preloader visible for a brief moment after reaching 100%
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 500);
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
