'use client';

import { ReactNode } from 'react';
import PageTransition, { TransitionType } from './PageTransition';

interface PageTransitionWrapperProps {
  children: ReactNode;
  type?: TransitionType;
  duration?: number;
}

/**
 * PageTransitionWrapper - Wraps page content with transitions
 *
 * This component should be used in the layout to wrap the main content area.
 * It provides smooth transitions between route changes.
 *
 * @param {TransitionType} type - Type of transition (fade, slide, clip) - default: 'fade'
 * @param {number} duration - Duration in seconds - default: 0.6
 *
 * Example usage in layout.tsx:
 * ```tsx
 * <PageTransitionWrapper type="fade" duration={0.6}>
 *   <main>{children}</main>
 * </PageTransitionWrapper>
 * ```
 */
export default function PageTransitionWrapper({
  children,
  type = 'fade',
  duration = 0.6,
}: PageTransitionWrapperProps) {
  return (
    <PageTransition type={type} duration={duration} className="min-h-screen">
      {children}
    </PageTransition>
  );
}
