'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { scrollToTop, onScroll } from '@/lib/lenis-utils';

/**
 * ScrollToTopButton Component
 * Displays a floating button that appears when user scrolls down
 * Smoothly scrolls to top when clicked
 */
export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const cleanup = onScroll((data) => {
      // Show button after scrolling 500px
      setIsVisible(data.scroll > 500);

      // Calculate circular progress
      const progress = (data.scroll / data.limit) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    });

    return cleanup;
  }, []);

  const handleClick = () => {
    scrollToTop(1.5);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        fixed bottom-8 right-8 z-50
        w-14 h-14 rounded-full
        bg-dark-800/80 backdrop-blur-sm
        border border-violet-500/30
        text-violet-400
        hover:bg-violet-600 hover:text-white hover:border-violet-400
        hover:scale-110
        transition-all duration-300 ease-out
        shadow-lg hover:shadow-violet-500/50
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'}
      `}
      aria-label="Scroll to top"
    >
      {/* Circular progress ring */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-dark-700"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-violet-500"
          strokeDasharray={`${2 * Math.PI * 45}`}
          strokeDashoffset={`${2 * Math.PI * 45 * (1 - scrollProgress / 100)}`}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.15s ease-out',
          }}
        />
      </svg>

      {/* Arrow icon */}
      <ArrowUp className="relative w-5 h-5 mx-auto" />
    </button>
  );
}
