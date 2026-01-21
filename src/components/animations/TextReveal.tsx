'use client';

import React, { ReactNode, ElementType } from 'react';
import { useTextReveal } from '@/hooks/useGSAP';

interface TextRevealProps {
  children: ReactNode;
  type?: 'lines' | 'words' | 'chars';
  stagger?: number;
  delay?: number;
  duration?: number;
  scrollTrigger?: boolean;
  className?: string;
  as?: ElementType;
  enabled?: boolean;
}

/**
 * TextReveal Component
 *
 * Animates text by revealing it line by line, word by word, or character by character.
 * Requires GSAP's SplitText plugin for advanced splitting. Falls back to simple fade animation.
 *
 * @example
 * ```tsx
 * <TextReveal type="lines">
 *   Your text here that reveals line by line
 * </TextReveal>
 * ```
 *
 * @example
 * ```tsx
 * <TextReveal type="words" stagger={0.1} delay={0.5}>
 *   Every word appears with a stagger effect
 * </TextReveal>
 * ```
 *
 * @example
 * ```tsx
 * <TextReveal type="chars" stagger={0.03}>
 *   Character by character animation
 * </TextReveal>
 * ```
 */
export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  type = 'lines',
  stagger = 0.05,
  delay = 0,
  duration = 0.8,
  scrollTrigger = true,
  className = '',
  as: Component = 'div',
  enabled = true,
}) => {
  const ref = useTextReveal<HTMLElement>({
    type,
    stagger,
    delay,
    duration,
    scrollTrigger,
    enabled,
  });

  const Tag = Component as any;

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

export default TextReveal;
