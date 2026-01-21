'use client';

import React, { useRef, useEffect, ReactNode, ElementType } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  as?: ElementType;
}

/**
 * MagneticButton Component
 *
 * Creates a magnetic effect where the button follows the mouse cursor.
 * Great for interactive CTAs and navigation elements.
 *
 * @example
 * ```tsx
 * <MagneticButton strength={0.5}>
 *   <button>Hover Me</button>
 * </MagneticButton>
 * ```
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.3,
  className = '',
  as: Component = 'div',
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  const Tag = Component as any;

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

export default MagneticButton;
