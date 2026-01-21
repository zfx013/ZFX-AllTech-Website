'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export type TransitionType = 'fade' | 'slide' | 'clip';

interface PageTransitionProps {
  children: ReactNode;
  type?: TransitionType;
  duration?: number;
  className?: string;
}

const transitionVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
  clip: {
    initial: {
      clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
      opacity: 0,
    },
    animate: {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      opacity: 1,
    },
    exit: {
      clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
      opacity: 0,
    },
  },
};

const easingCurves: Record<TransitionType, [number, number, number, number]> = {
  fade: [0.22, 1, 0.36, 1], // Custom ease-out
  slide: [0.65, 0, 0.35, 1], // Cubic bezier for smooth slide
  clip: [0.76, 0, 0.24, 1], // Smooth clip animation
};

export default function PageTransition({
  children,
  type = 'fade',
  duration = 0.6,
  className = '',
}: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={transitionVariants[type].initial}
        animate={transitionVariants[type].animate}
        exit={transitionVariants[type].exit}
        transition={{
          duration,
          ease: easingCurves[type],
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
