'use client';

import { useEffect, useRef, useCallback, RefObject } from 'react';
import { gsap, ScrollTrigger, animationPresets, staggerPresets, scrollTriggerPresets, createScrollAnimation } from '@/lib/gsap';

// Hook for basic GSAP animations
export const useGSAP = (
  callback: (context: { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }) => void | (() => void),
  dependencies: React.DependencyList = []
) => {
  useEffect(() => {
    const cleanup = callback({ gsap, ScrollTrigger });
    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, dependencies);
};

// Hook for scroll-triggered animations
export const useScrollAnimation = <T extends HTMLElement>(
  animationPreset: keyof typeof animationPresets,
  options?: {
    delay?: number;
    duration?: number;
    stagger?: keyof typeof staggerPresets | number;
    scrollTrigger?: keyof typeof scrollTriggerPresets | ScrollTrigger.Vars;
    customAnimation?: Partial<gsap.TweenVars>;
    enabled?: boolean;
  }
): RefObject<T | null> => {
  const ref = useRef<T | null>(null);
  const { enabled = true, ...animOptions } = options || {};

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const animation = createScrollAnimation(ref.current, animationPreset, animOptions);

    return () => {
      animation.kill();
    };
  }, [animationPreset, enabled, JSON.stringify(animOptions)]);

  return ref;
};

// Hook for stagger animations on children
export const useStaggerAnimation = <T extends HTMLElement>(
  animationPreset: keyof typeof animationPresets,
  options?: {
    delay?: number;
    duration?: number;
    stagger?: keyof typeof staggerPresets | number;
    scrollTrigger?: keyof typeof scrollTriggerPresets | ScrollTrigger.Vars;
    childSelector?: string;
    enabled?: boolean;
  }
): RefObject<T | null> => {
  const ref = useRef<T | null>(null);
  const { enabled = true, childSelector = '> *', ...animOptions } = options || {};

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const children = ref.current.querySelectorAll(childSelector);
    if (children.length === 0) return;

    const animation = createScrollAnimation(children, animationPreset, {
      ...animOptions,
      stagger: animOptions.stagger || 'default',
    });

    return () => {
      animation.kill();
    };
  }, [animationPreset, enabled, childSelector, JSON.stringify(animOptions)]);

  return ref;
};

// Hook for parallax effects
export const useParallax = <T extends HTMLElement>(
  options?: {
    speed?: number;
    direction?: 'up' | 'down';
    start?: string;
    end?: string;
    enabled?: boolean;
  }
): RefObject<T | null> => {
  const ref = useRef<T | null>(null);
  const { enabled = true, speed = 100, direction = 'up', start = 'top bottom', end = 'bottom top' } = options || {};

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const yValue = direction === 'up' ? -speed : speed;

    const animation = gsap.to(ref.current, {
      y: yValue,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start,
        end,
        scrub: 1,
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [enabled, speed, direction, start, end]);

  return ref;
};

// Hook for horizontal scroll sections
export const useHorizontalScroll = <T extends HTMLElement>(
  options?: {
    speed?: number;
    snap?: boolean;
    enabled?: boolean;
  }
): RefObject<T | null> => {
  const ref = useRef<T | null>(null);
  const { enabled = true, speed = 1, snap = false } = options || {};

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const container = ref.current;
    const scrollWidth = container.scrollWidth;
    const containerWidth = container.offsetWidth;

    const animation = gsap.to(container, {
      x: -(scrollWidth - containerWidth) * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollWidth - containerWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        snap: snap ? 1 / (container.children.length - 1) : undefined,
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [enabled, speed, snap]);

  return ref;
};

// Hook for pinned sections
export const usePinSection = <T extends HTMLElement>(
  options?: {
    start?: string;
    end?: string;
    pinSpacing?: boolean;
    enabled?: boolean;
  }
): RefObject<T | null> => {
  const ref = useRef<T | null>(null);
  const { enabled = true, start = 'top top', end = 'bottom bottom', pinSpacing = true } = options || {};

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start,
      end,
      pin: true,
      pinSpacing,
    });

    return () => {
      trigger.kill();
    };
  }, [enabled, start, end, pinSpacing]);

  return ref;
};

// Hook for text reveal animations
export const useTextReveal = <T extends HTMLElement>(
  options?: {
    type?: 'lines' | 'words' | 'chars';
    stagger?: number;
    delay?: number;
    duration?: number;
    scrollTrigger?: boolean;
    enabled?: boolean;
  }
): RefObject<T | null> => {
  const ref = useRef<T | null>(null);
  const { enabled = true, type = 'lines', stagger = 0.05, delay = 0, duration = 0.8, scrollTrigger = true } = options || {};

  useEffect(() => {
    if (!enabled || !ref.current) return;

    // Note: SplitText is a GSAP premium plugin
    // If not available, this will fallback to a simple fade in
    const text = ref.current;
    const animations: gsap.core.Tween[] = [];

    try {
      // Try to use SplitText if available
      if (typeof window !== 'undefined' && 'SplitText' in window) {
        const SplitText = (window as any).SplitText;
        const split = new SplitText(text, { type });

        const targets = type === 'lines' ? split.lines : type === 'words' ? split.words : split.chars;

        gsap.set(targets, { opacity: 0, y: 20 });

        const anim = gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: scrollTrigger
            ? {
                trigger: text,
                start: 'top 80%',
                toggleActions: 'play none none none',
              }
            : undefined,
        });

        animations.push(anim);
      } else {
        // Fallback animation
        gsap.set(text, { opacity: 0, y: 20 });
        const anim = gsap.to(text, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: scrollTrigger
            ? {
                trigger: text,
                start: 'top 80%',
                toggleActions: 'play none none none',
              }
            : undefined,
        });
        animations.push(anim);
      }
    } catch (error) {
      console.warn('SplitText plugin not available, using fallback animation');
      gsap.set(text, { opacity: 0, y: 20 });
      const anim = gsap.to(text, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: scrollTrigger
          ? {
              trigger: text,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          : undefined,
      });
      animations.push(anim);
    }

    return () => {
      animations.forEach((anim) => {
        anim.scrollTrigger?.kill();
        anim.kill();
      });
    };
  }, [enabled, type, stagger, delay, duration, scrollTrigger]);

  return ref;
};

// Hook for counter animations
export const useCountUp = <T extends HTMLElement>(
  endValue: number,
  options?: {
    startValue?: number;
    duration?: number;
    delay?: number;
    decimals?: number;
    scrollTrigger?: boolean;
    enabled?: boolean;
  }
): RefObject<T | null> => {
  const ref = useRef<T | null>(null);
  const { enabled = true, startValue = 0, duration = 2, delay = 0, decimals = 0, scrollTrigger = true } = options || {};

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const element = ref.current;
    const obj = { value: startValue };

    const animation = gsap.to(obj, {
      value: endValue,
      duration,
      delay,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = obj.value.toFixed(decimals);
      },
      scrollTrigger: scrollTrigger
        ? {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        : undefined,
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [enabled, endValue, startValue, duration, delay, decimals, scrollTrigger]);

  return ref;
};

// Hook for hover animations
export const useHoverAnimation = <T extends HTMLElement>(
  animationConfig: {
    scale?: number;
    rotation?: number;
    y?: number;
    x?: number;
    duration?: number;
  }
): RefObject<T | null> => {
  const ref = useRef<T | null>(null);
  const { scale = 1.05, rotation = 0, y = 0, x = 0, duration = 0.3 } = animationConfig;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale,
        rotation,
        y,
        x,
        duration,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        rotation: 0,
        y: 0,
        x: 0,
        duration,
        ease: 'power2.out',
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [scale, rotation, y, x, duration]);

  return ref;
};
