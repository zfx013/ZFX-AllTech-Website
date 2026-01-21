'use client';

import React, { ReactNode } from 'react';
import { useHorizontalScroll } from '@/hooks/useGSAP';

interface HorizontalScrollProps {
  children: ReactNode;
  speed?: number;
  snap?: boolean;
  className?: string;
  enabled?: boolean;
}

/**
 * HorizontalScroll Component
 *
 * Creates a horizontal scrolling section that scrolls sideways on vertical scroll.
 * Perfect for portfolios, image galleries, and timeline sections.
 *
 * @example
 * ```tsx
 * <HorizontalScroll snap={true}>
 *   <div className="flex gap-8">
 *     <div className="min-w-screen">Section 1</div>
 *     <div className="min-w-screen">Section 2</div>
 *     <div className="min-w-screen">Section 3</div>
 *   </div>
 * </HorizontalScroll>
 * ```
 */
export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  speed = 1,
  snap = false,
  className = '',
  enabled = true,
}) => {
  const ref = useHorizontalScroll<HTMLDivElement>({
    speed,
    snap,
    enabled,
  });

  return (
    <div className="overflow-hidden">
      <div ref={ref} className={`flex ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default HorizontalScroll;
