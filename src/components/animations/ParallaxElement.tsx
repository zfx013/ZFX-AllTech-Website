'use client';

import React, { ReactNode, ElementType } from 'react';
import { useParallax } from '@/hooks/useGSAP';

interface ParallaxElementProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  start?: string;
  end?: string;
  className?: string;
  as?: ElementType;
  enabled?: boolean;
}

/**
 * ParallaxElement Component
 *
 * Creates a parallax scrolling effect on the wrapped element.
 *
 * @example
 * ```tsx
 * <ParallaxElement speed={50} direction="up">
 *   <img src="/background.jpg" alt="Parallax background" />
 * </ParallaxElement>
 * ```
 *
 * @example
 * ```tsx
 * <ParallaxElement speed={100} direction="down">
 *   <div className="hero-content">
 *     <h1>Parallax Hero</h1>
 *   </div>
 * </ParallaxElement>
 * ```
 */
export const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  speed = 100,
  direction = 'up',
  start = 'top bottom',
  end = 'bottom top',
  className = '',
  as: Component = 'div',
  enabled = true,
}) => {
  const ref = useParallax<HTMLElement>({
    speed,
    direction,
    start,
    end,
    enabled,
  });

  const Tag = Component as any;

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

export default ParallaxElement;
