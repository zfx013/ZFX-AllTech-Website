'use client';

import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode, MouseEvent } from 'react';

export type TransitionType = 'fade' | 'slide' | 'clip';

interface TransitionLinkProps extends Omit<LinkProps, 'href'> {
  children: ReactNode;
  href: string;
  className?: string;
  transitionType?: TransitionType;
  duration?: number;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * TransitionLink - A Link component that triggers page transitions
 *
 * This component wraps Next.js Link to provide smooth page transitions.
 * It delays navigation to allow exit animations to complete.
 *
 * @param {string} href - The destination URL
 * @param {TransitionType} transitionType - Type of transition (fade, slide, clip)
 * @param {number} duration - Duration in seconds (default: 0.6)
 *
 * Usage:
 * <TransitionLink href="/about" transitionType="slide">
 *   About Us
 * </TransitionLink>
 */
export default function TransitionLink({
  children,
  href,
  className = '',
  transitionType = 'fade',
  duration = 0.6,
  onClick,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();

  const handleTransition = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Call custom onClick if provided
    if (onClick) {
      onClick(e);
    }

    // Add a small delay for the exit animation
    // We use 90% of the duration to ensure smooth transition
    const delayMs = duration * 1000 * 0.9;

    // Start the navigation after the delay
    setTimeout(() => {
      router.push(href);
    }, delayMs);
  };

  return (
    <Link
      href={href}
      onClick={handleTransition}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
