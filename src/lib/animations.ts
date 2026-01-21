import type { Variants, Transition } from 'framer-motion';

/**
 * Animation configuration and reusable variants for Framer Motion
 * Use these variants throughout the app for consistent animations
 */

// ============================================
// TRANSITIONS
// ============================================

export const transitions = {
  // Default spring animation
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  } as Transition,

  // Smooth spring
  smoothSpring: {
    type: 'spring',
    stiffness: 200,
    damping: 25,
  } as Transition,

  // Bouncy spring
  bouncySpring: {
    type: 'spring',
    stiffness: 400,
    damping: 20,
  } as Transition,

  // Tween animations
  ease: {
    duration: 0.4,
    ease: 'easeInOut',
  } as Transition,

  easeIn: {
    duration: 0.3,
    ease: 'easeIn',
  } as Transition,

  easeOut: {
    duration: 0.3,
    ease: 'easeOut',
  } as Transition,

  // Slow animations
  slow: {
    duration: 0.8,
    ease: 'easeInOut',
  } as Transition,

  // Fast animations
  fast: {
    duration: 0.2,
    ease: 'easeInOut',
  } as Transition,
};

// ============================================
// FADE ANIMATIONS
// ============================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.ease,
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.spring,
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.spring,
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.spring,
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.spring,
  },
};

// ============================================
// SCALE ANIMATIONS
// ============================================

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.spring,
  },
};

export const scaleUp: Variants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: transitions.bouncySpring,
  },
};

export const scaleOnHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: transitions.fast,
  },
};

export const scaleOnTap: Variants = {
  initial: { scale: 1 },
  tap: {
    scale: 0.95,
    transition: transitions.fast,
  },
};

// ============================================
// SLIDE ANIMATIONS
// ============================================

export const slideInUp: Variants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: transitions.spring,
  },
};

export const slideInDown: Variants = {
  hidden: { y: '-100%' },
  visible: {
    y: 0,
    transition: transitions.spring,
  },
};

export const slideInLeft: Variants = {
  hidden: { x: '-100%' },
  visible: {
    x: 0,
    transition: transitions.spring,
  },
};

export const slideInRight: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: transitions.spring,
  },
};

// ============================================
// ROTATE ANIMATIONS
// ============================================

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -180 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: transitions.spring,
  },
};

export const rotate360: Variants = {
  hidden: { rotate: 0 },
  visible: {
    rotate: 360,
    transition: {
      duration: 0.5,
      ease: 'linear',
    },
  },
};

// ============================================
// STAGGER ANIMATIONS
// ============================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerFastContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const staggerSlowContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// ============================================
// HOVER ANIMATIONS
// ============================================

export const hoverLift: Variants = {
  initial: { y: 0 },
  hover: {
    y: -8,
    transition: transitions.fast,
  },
};

export const hoverGlow: Variants = {
  initial: { boxShadow: '0 0 0 rgba(255, 255, 255, 0)' },
  hover: {
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
    transition: transitions.ease,
  },
};

export const hoverScale: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: transitions.fast,
  },
};

export const hoverRotate: Variants = {
  initial: { rotate: 0 },
  hover: {
    rotate: 5,
    transition: transitions.fast,
  },
};

// ============================================
// PAGE TRANSITIONS
// ============================================

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitions.ease,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: transitions.ease,
  },
};

export const pageSlideTransition: Variants = {
  initial: { opacity: 0, x: '-100%' },
  animate: {
    opacity: 1,
    x: 0,
    transition: transitions.spring,
  },
  exit: {
    opacity: 0,
    x: '100%',
    transition: transitions.spring,
  },
};

// ============================================
// CARD ANIMATIONS
// ============================================

export const cardHover: Variants = {
  initial: {
    y: 0,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  hover: {
    y: -8,
    boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
    transition: transitions.fast,
  },
};

export const cardReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: transitions.spring,
  },
};

// ============================================
// TEXT ANIMATIONS
// ============================================

export const textReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      ...transitions.spring,
    },
  }),
};

export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      ...transitions.spring,
    },
  }),
};

export const wordReveal: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: {
      delay: i * 0.1,
      ...transitions.ease,
    },
  }),
};

// ============================================
// BUTTON ANIMATIONS
// ============================================

export const buttonHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: transitions.fast,
  },
  tap: {
    scale: 0.95,
    transition: transitions.fast,
  },
};

export const buttonPulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const buttonSlide: Variants = {
  initial: { x: 0 },
  hover: {
    x: 5,
    transition: transitions.fast,
  },
};

// ============================================
// LOADER ANIMATIONS
// ============================================

export const spinLoader: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export const pulseLoader: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.7, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const dotLoader: Variants = {
  animate: (i = 0) => ({
    y: [0, -10, 0],
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
};

// ============================================
// SCROLL ANIMATIONS
// ============================================

export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 75,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const scrollScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// ============================================
// PARALLAX ANIMATIONS
// ============================================

export const parallaxSlow: Variants = {
  initial: { y: 0 },
  animate: (scrollY: number) => ({
    y: scrollY * 0.2,
  }),
};

export const parallaxMedium: Variants = {
  initial: { y: 0 },
  animate: (scrollY: number) => ({
    y: scrollY * 0.5,
  }),
};

export const parallaxFast: Variants = {
  initial: { y: 0 },
  animate: (scrollY: number) => ({
    y: scrollY * 0.8,
  }),
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Creates a stagger animation with custom timing
 *
 * @param staggerDelay - Delay between each child animation
 * @param delayChildren - Initial delay before children start
 * @returns Variants object
 */
export function createStagger(
  staggerDelay: number = 0.1,
  delayChildren: number = 0
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };
}

/**
 * Creates a custom fade in animation with direction
 *
 * @param direction - Direction of fade (up, down, left, right)
 * @param distance - Distance to move (default: 20)
 * @returns Variants object
 */
export function createFadeIn(
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 20
): Variants {
  const isHorizontal = direction === 'left' || direction === 'right';
  const value =
    direction === 'up' || direction === 'left' ? distance : -distance;

  if (isHorizontal) {
    return {
      hidden: { opacity: 0, x: value },
      visible: {
        opacity: 1,
        x: 0,
        transition: transitions.spring as any,
      },
    };
  }

  return {
    hidden: { opacity: 0, y: value },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitions.spring as any,
    },
  };
}

/**
 * Creates a custom delay animation
 *
 * @param delay - Delay in seconds
 * @returns Variants object
 */
export function createDelayedFadeIn(delay: number = 0): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ...transitions.ease,
        delay,
      },
    },
  };
}

/**
 * Creates viewport animation props for scroll-triggered animations
 *
 * @param once - Whether animation should only happen once
 * @param amount - Amount of element that needs to be visible (0-1)
 * @returns Viewport configuration object
 */
export function createViewport(once: boolean = true, amount: number = 0.3) {
  return {
    once,
    amount,
  };
}
