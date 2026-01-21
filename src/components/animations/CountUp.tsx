'use client';

import React, { ElementType } from 'react';
import { useCountUp } from '@/hooks/useGSAP';

interface CountUpProps {
  endValue: number;
  startValue?: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  scrollTrigger?: boolean;
  className?: string;
  as?: ElementType;
  enabled?: boolean;
  prefix?: string;
  suffix?: string;
}

/**
 * CountUp Component
 *
 * Animates a number counting up from a start value to an end value.
 * Perfect for statistics, metrics, and achievement displays.
 *
 * @example
 * ```tsx
 * <CountUp endValue={1000} suffix="+" />
 * ```
 *
 * @example
 * ```tsx
 * <CountUp
 *   endValue={99.9}
 *   decimals={1}
 *   duration={2.5}
 *   suffix="%"
 * />
 * ```
 *
 * @example
 * ```tsx
 * <CountUp
 *   startValue={0}
 *   endValue={5000}
 *   prefix="$"
 *   scrollTrigger={true}
 * />
 * ```
 */
export const CountUp: React.FC<CountUpProps> = ({
  endValue,
  startValue = 0,
  duration = 2,
  delay = 0,
  decimals = 0,
  scrollTrigger = true,
  className = '',
  as: Component = 'span',
  enabled = true,
  prefix = '',
  suffix = '',
}) => {
  const ref = useCountUp<HTMLElement>(endValue, {
    startValue,
    duration,
    delay,
    decimals,
    scrollTrigger,
    enabled,
  });

  const Tag = Component as any;

  return (
    <Tag ref={ref} className={className}>
      {prefix}
      {startValue}
      {suffix}
    </Tag>
  );
};

export default CountUp;
