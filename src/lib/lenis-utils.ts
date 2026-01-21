/**
 * Lenis Smooth Scroll Utilities
 * Helper functions for programmatic scroll control
 */

/**
 * Scroll to a specific element or position
 * @param target - CSS selector, element, or scroll position (number)
 * @param options - Scroll configuration options
 */
export const scrollToSmooth = (
  target: string | number | HTMLElement,
  options?: {
    offset?: number;
    duration?: number;
    immediate?: boolean;
    onComplete?: () => void;
  }
) => {
  if (typeof window !== 'undefined' && (window as any).lenis) {
    (window as any).lenis.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.5,
      immediate: options?.immediate ?? false,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      onComplete: options?.onComplete,
    });
  }
};

/**
 * Scroll to top of the page
 * @param duration - Animation duration in seconds
 */
export const scrollToTop = (duration = 1.5) => {
  scrollToSmooth(0, { duration });
};

/**
 * Scroll to bottom of the page
 * @param duration - Animation duration in seconds
 */
export const scrollToBottom = (duration = 1.5) => {
  if (typeof window !== 'undefined') {
    scrollToSmooth(document.body.scrollHeight, { duration });
  }
};

/**
 * Stop smooth scrolling (useful for modals, menus, etc.)
 */
export const stopScroll = () => {
  if (typeof window !== 'undefined' && (window as any).lenis) {
    (window as any).lenis.stop();
  }
};

/**
 * Resume smooth scrolling
 */
export const startScroll = () => {
  if (typeof window !== 'undefined' && (window as any).lenis) {
    (window as any).lenis.start();
  }
};

/**
 * Get current scroll position
 * @returns Current scroll position
 */
export const getScrollPosition = (): number => {
  if (typeof window !== 'undefined' && (window as any).lenis) {
    return (window as any).lenis.scroll;
  }
  return 0;
};

/**
 * Check if currently scrolling
 * @returns True if scrolling
 */
export const isScrolling = (): boolean => {
  if (typeof window !== 'undefined' && (window as any).lenis) {
    return (window as any).lenis.isScrolling;
  }
  return false;
};

/**
 * Add scroll event listener
 * @param callback - Function to call on scroll
 * @returns Cleanup function
 */
export const onScroll = (callback: (data: any) => void) => {
  if (typeof window !== 'undefined' && (window as any).lenis) {
    const lenis = (window as any).lenis;
    lenis.on('scroll', callback);

    return () => {
      lenis.off('scroll', callback);
    };
  }

  return () => {};
};
