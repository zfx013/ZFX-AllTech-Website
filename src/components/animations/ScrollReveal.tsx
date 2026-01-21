'use client';

import React, { ReactNode, ElementType } from 'react';
import { useScrollAnimation } from '@/hooks/useGSAP';
import { animationPresets, staggerPresets, scrollTriggerPresets } from '@/lib/gsap';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: keyof typeof animationPresets;
  delay?: number;
  duration?: number;
  stagger?: keyof typeof staggerPresets | number;
  scrollTrigger?: keyof typeof scrollTriggerPresets | ScrollTrigger.Vars;
  className?: string;
  as?: ElementType;
  enabled?: boolean;
  customAnimation?: Partial<gsap.TweenVars>;
}

/**
 * ScrollReveal Component
 *
 * A versatile wrapper component that applies scroll-triggered animations to its children.
 *
 * @example
 * ```tsx
 * <ScrollReveal animation="fadeInUp" delay={0.2}>
 *   <div>Your content here</div>
 * </ScrollReveal>
 * ```
 *
 * @example
 * ```tsx
 * <ScrollReveal
 *   animation="scaleIn"
 *   duration={1.5}
 *   scrollTrigger={{ start: "top 90%", end: "bottom 10%" }}
 * >
 *   <img src="/image.jpg" alt="Animated image" />
 * </ScrollReveal>
 * ```
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration,
  stagger,
  scrollTrigger = 'default',
  className = '',
  as: Component = 'div',
  enabled = true,
  customAnimation,
}) => {
  const ref = useScrollAnimation<HTMLElement>(animation, {
    delay,
    duration,
    stagger,
    scrollTrigger,
    enabled,
    customAnimation,
  });

  const Tag = Component as any;

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

export default ScrollReveal;
