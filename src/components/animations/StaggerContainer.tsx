'use client';

import React, { ReactNode, ElementType } from 'react';
import { useStaggerAnimation } from '@/hooks/useGSAP';
import { animationPresets, staggerPresets, scrollTriggerPresets } from '@/lib/gsap';

interface StaggerContainerProps {
  children: ReactNode;
  animation?: keyof typeof animationPresets;
  delay?: number;
  duration?: number;
  stagger?: keyof typeof staggerPresets | number;
  scrollTrigger?: keyof typeof scrollTriggerPresets | ScrollTrigger.Vars;
  childSelector?: string;
  className?: string;
  as?: ElementType;
  enabled?: boolean;
}

/**
 * StaggerContainer Component
 *
 * Applies staggered animations to child elements.
 * Perfect for animating lists, grids, or any collection of elements.
 *
 * @example
 * ```tsx
 * <StaggerContainer animation="fadeInUp" stagger="default">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </StaggerContainer>
 * ```
 *
 * @example
 * ```tsx
 * <StaggerContainer
 *   animation="scaleIn"
 *   stagger={0.1}
 *   childSelector=".card"
 * >
 *   <div className="card">Card 1</div>
 *   <div className="card">Card 2</div>
 *   <div className="card">Card 3</div>
 * </StaggerContainer>
 * ```
 */
export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration,
  stagger = 'default',
  scrollTrigger = 'default',
  childSelector = '> *',
  className = '',
  as: Component = 'div',
  enabled = true,
}) => {
  const ref = useStaggerAnimation<HTMLElement>(animation, {
    delay,
    duration,
    stagger,
    scrollTrigger,
    childSelector,
    enabled,
  });

  const Tag = Component as any;

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

export default StaggerContainer;
