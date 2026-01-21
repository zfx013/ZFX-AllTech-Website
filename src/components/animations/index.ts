// GSAP Animation Components
export { ScrollReveal } from './ScrollReveal';
export { TextReveal } from './TextReveal';
export { ParallaxElement } from './ParallaxElement';
export { StaggerContainer } from './StaggerContainer';
export { CountUp } from './CountUp';
export { MagneticButton } from './MagneticButton';
export { HorizontalScroll } from './HorizontalScroll';
export { PinSection } from './PinSection';
export { SmoothScrollProvider } from './SmoothScrollProvider';

// Page Transition Components (Framer Motion)
export { default as PageTransition } from './PageTransition';
export { default as TransitionLink } from './TransitionLink';
export { default as PageTransitionWrapper } from './PageTransitionWrapper';
export { default as ScrollToTop } from './ScrollToTop';

// Types
export type { TransitionType } from './PageTransition';

// Re-export animation presets and utilities for convenience
export { animationPresets, staggerPresets, scrollTriggerPresets } from '@/lib/gsap';
