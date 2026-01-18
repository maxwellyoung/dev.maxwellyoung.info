"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

interface AnimatedNumberProps {
  /** The target value to animate to */
  value: number;
  /** Format function for display (default: toLocaleString) */
  format?: (value: number) => string;
  /** Spring configuration */
  springConfig?: { mass?: number; stiffness?: number; damping?: number };
  /** Optional className for styling */
  className?: string;
}

/**
 * AnimatedNumber - Smoothly animates numeric values using springs
 *
 * Perfect for:
 * - Project metrics in case studies
 * - Performance statistics
 * - Counting animations on scroll
 *
 * @example
 * <AnimatedNumber value={98} format={(n) => `${n}%`} />
 */
export function AnimatedNumber({
  value,
  format = (n) => Math.round(n).toLocaleString(),
  springConfig = { mass: 0.8, stiffness: 75, damping: 15 },
  className,
}: AnimatedNumberProps) {
  const spring = useSpring(0, springConfig);
  const display = useTransform(spring, (current) => format(current));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span className={className}>{display}</motion.span>;
}

/**
 * AnimatedPercentage - Animated number with % suffix
 */
export function AnimatedPercentage({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <AnimatedNumber
      value={value}
      format={(n) => `${Math.round(n)}%`}
      className={className}
    />
  );
}

/**
 * AnimatedStat - Animated number with suffix support
 */
export function AnimatedStat({
  value,
  suffix = "",
  prefix = "",
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  return (
    <AnimatedNumber
      value={value}
      format={(n) => `${prefix}${Math.round(n).toLocaleString()}${suffix}`}
      className={className}
    />
  );
}
