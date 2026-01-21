'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * ScrollToTop - Automatically scrolls to top on route change
 *
 * This component ensures smooth user experience by resetting scroll position
 * when navigating between pages. Works seamlessly with page transitions.
 *
 * Usage in layout.tsx:
 * ```tsx
 * import ScrollToTop from '@/components/animations/ScrollToTop';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <ScrollToTop />
 *         <PageTransitionWrapper>
 *           {children}
 *         </PageTransitionWrapper>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // Use 'instant' to avoid conflicts with page transitions
    });

    // If you're using Lenis smooth scroll, uncomment this:
    // if (window.lenis) {
    //   window.lenis.scrollTo(0, { immediate: true });
    // }
  }, [pathname]);

  return null;
}
