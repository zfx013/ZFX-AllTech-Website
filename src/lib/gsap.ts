'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// Default GSAP configuration
gsap.config({
  force3D: true,
  nullTargetWarn: false,
});

// ScrollTrigger defaults
ScrollTrigger.config({
  limitCallbacks: true,
  ignoreMobileResize: true,
});

// Animation presets
export const animationPresets = {
  fadeInUp: {
    from: {
      opacity: 0,
      y: 60,
    },
    to: {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    },
  },
  fadeInDown: {
    from: {
      opacity: 0,
      y: -60,
    },
    to: {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    },
  },
  fadeInLeft: {
    from: {
      opacity: 0,
      x: -60,
    },
    to: {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
    },
  },
  fadeInRight: {
    from: {
      opacity: 0,
      x: 60,
    },
    to: {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
    },
  },
  scaleIn: {
    from: {
      opacity: 0,
      scale: 0.8,
    },
    to: {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power3.out',
    },
  },
  scaleInRotate: {
    from: {
      opacity: 0,
      scale: 0.8,
      rotation: -10,
    },
    to: {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1.2,
      ease: 'power3.out',
    },
  },
  fadeIn: {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    },
  },
  slideUp: {
    from: {
      y: 100,
      opacity: 0,
    },
    to: {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power4.out',
    },
  },
  slideDown: {
    from: {
      y: -100,
      opacity: 0,
    },
    to: {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power4.out',
    },
  },
  parallax: {
    from: {
      y: 0,
    },
    to: {
      y: -100,
      ease: 'none',
    },
  },
};

// Stagger configurations
export const staggerPresets = {
  default: {
    amount: 0.3,
    from: 'start' as const,
  },
  center: {
    amount: 0.5,
    from: 'center' as const,
  },
  end: {
    amount: 0.3,
    from: 'end' as const,
  },
  random: {
    amount: 0.5,
    from: 'random' as const,
  },
};

// ScrollTrigger configurations
export const scrollTriggerPresets = {
  default: {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none none',
  },
  scrub: {
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
  pin: {
    start: 'top top',
    end: 'bottom bottom',
    pin: true,
    scrub: true,
  },
  reveal: {
    start: 'top 85%',
    end: 'bottom 15%',
    toggleActions: 'play none none none',
  },
  parallax: {
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  },
};

// Utility function to create scroll-triggered animations
export const createScrollAnimation = (
  target: gsap.DOMTarget,
  animationPreset: keyof typeof animationPresets,
  options?: {
    delay?: number;
    duration?: number;
    stagger?: keyof typeof staggerPresets | number;
    scrollTrigger?: keyof typeof scrollTriggerPresets | ScrollTrigger.Vars;
    customAnimation?: Partial<gsap.TweenVars>;
  }
) => {
  const preset = animationPresets[animationPreset];
  const { delay = 0, duration, stagger, scrollTrigger, customAnimation } = options || {};

  // Build animation variables
  const animationVars: gsap.TweenVars = {
    ...preset.to,
    delay,
  };

  // Override duration if provided
  if (duration !== undefined) {
    animationVars.duration = duration;
  }

  // Add stagger if provided
  if (stagger !== undefined) {
    if (typeof stagger === 'string' && stagger in staggerPresets) {
      animationVars.stagger = staggerPresets[stagger as keyof typeof staggerPresets] as any;
    } else if (typeof stagger === 'number') {
      animationVars.stagger = stagger;
    }
  }

  // Add ScrollTrigger if provided
  if (scrollTrigger !== undefined) {
    if (typeof scrollTrigger === 'string' && scrollTrigger in scrollTriggerPresets) {
      animationVars.scrollTrigger = {
        trigger: target,
        ...scrollTriggerPresets[scrollTrigger as keyof typeof scrollTriggerPresets],
      };
    } else if (typeof scrollTrigger === 'object') {
      animationVars.scrollTrigger = {
        trigger: target,
        ...scrollTrigger,
      };
    }
  }

  // Merge custom animation properties
  if (customAnimation) {
    Object.assign(animationVars, customAnimation);
  }

  // Set initial state
  gsap.set(target, preset.from);

  // Create and return the animation
  return gsap.to(target, animationVars);
};

// Utility to integrate with Lenis smooth scroll
export const integrateLenis = (lenis: any) => {
  if (!lenis) return;

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
};

// Cleanup function for ScrollTrigger instances
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

// Refresh ScrollTrigger (useful after layout changes)
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};

export { gsap, ScrollTrigger, SplitText };
