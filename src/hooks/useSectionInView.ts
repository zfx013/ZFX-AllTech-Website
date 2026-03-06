"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface SectionInViewState {
  activeSection: string;
  progress: number;
}

interface UseSectionInViewOptions {
  threshold?: number;
  rootMargin?: string;
  sectionIds?: string[];
}

export function useSectionInView(
  options: UseSectionInViewOptions = {}
): SectionInViewState {
  const {
    threshold = 0.3,
    rootMargin = "0px",
    sectionIds,
  } = options;

  const [state, setState] = useState<SectionInViewState>({
    activeSection: "",
    progress: 0,
  });

  const rafRef = useRef<number>(0);
  const activeSectionRef = useRef<string>("");

  const updateProgress = useCallback(() => {
    const sectionId = activeSectionRef.current;
    if (!sectionId) return;

    const element = document.getElementById(sectionId);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const sectionHeight = rect.height;

    const visibleTop = Math.max(0, -rect.top);
    const visibleBottom = Math.min(sectionHeight, viewportHeight - rect.top);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

    let progress: number;
    if (sectionHeight <= viewportHeight) {
      progress = visibleHeight / sectionHeight;
    } else {
      progress = Math.min(1, Math.max(0, -rect.top / (sectionHeight - viewportHeight)));
    }

    progress = Math.round(progress * 1000) / 1000;

    setState((prev) => {
      if (prev.activeSection === sectionId && prev.progress === progress) {
        return prev;
      }
      return { activeSection: sectionId, progress };
    });
  }, []);

  useEffect(() => {
    const ids =
      sectionIds ??
      Array.from(document.querySelectorAll("section[id]")).map(
        (el) => el.id
      );

    if (ids.length === 0) return;

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let maxEntry: IntersectionObserverEntry | null = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            maxEntry = entry;
          }
        });

        if (maxEntry) {
          activeSectionRef.current = (maxEntry as IntersectionObserverEntry).target.id;
          updateProgress();
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin,
      }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [sectionIds, threshold, rootMargin, updateProgress]);

  return state;
}
