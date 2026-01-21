'use client';

import React, { ReactNode } from 'react';
import { usePinSection } from '@/hooks/useGSAP';

interface PinSectionProps {
  children: ReactNode;
  start?: string;
  end?: string;
  pinSpacing?: boolean;
  className?: string;
  enabled?: boolean;
}

/**
 * PinSection Component
 *
 * Pins an element in place while the user scrolls.
 * Great for creating sticky sections with scroll-based content changes.
 *
 * @example
 * ```tsx
 * <PinSection start="top top" end="+=500">
 *   <div>This content will be pinned while scrolling</div>
 * </PinSection>
 * ```
 */
export const PinSection: React.FC<PinSectionProps> = ({
  children,
  start = 'top top',
  end = 'bottom bottom',
  pinSpacing = true,
  className = '',
  enabled = true,
}) => {
  const ref = usePinSection<HTMLDivElement>({
    start,
    end,
    pinSpacing,
    enabled,
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default PinSection;
