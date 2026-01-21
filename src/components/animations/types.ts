/**
 * Page Transition Types
 *
 * Type definitions for page transition components
 */

import { ReactNode, MouseEvent } from 'react';
import { LinkProps } from 'next/link';

/**
 * Available transition animation types
 */
export type TransitionType = 'fade' | 'slide' | 'clip';

/**
 * Easing curve definition for transitions
 * Format: [x1, y1, x2, y2] for cubic-bezier
 */
export type EasingCurve = [number, number, number, number];

/**
 * Transition variant configuration
 */
export interface TransitionVariant {
  initial: Record<string, any>;
  animate: Record<string, any>;
  exit: Record<string, any>;
}

/**
 * Props for PageTransition component
 */
export interface PageTransitionProps {
  children: ReactNode;
  type?: TransitionType;
  duration?: number;
  className?: string;
}

/**
 * Props for PageTransitionWrapper component
 */
export interface PageTransitionWrapperProps {
  children: ReactNode;
  type?: TransitionType;
  duration?: number;
}

/**
 * Props for TransitionLink component
 */
export interface TransitionLinkProps extends Omit<LinkProps, 'href'> {
  children: ReactNode;
  href: string;
  className?: string;
  transitionType?: TransitionType;
  duration?: number;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Transition configuration object
 */
export interface TransitionConfig {
  type: TransitionType;
  duration: number;
  easing: EasingCurve;
}

/**
 * Route-specific transition settings
 */
export interface RouteTransitionSettings {
  [route: string]: TransitionConfig;
}
