/**
 * Unified Motion System
 *
 * A single source of truth for all animation timing, springs, and easings.
 * Inspired by Emil Kowalski's motion grammar approach.
 */

// Duration tokens (in seconds for Framer Motion)
export const duration = {
  instant: 0.1,
  quick: 0.2,
  normal: 0.3,
  slow: 0.5,
  glacial: 0.8,
} as const;

// Duration tokens (in ms for CSS)
export const durationMs = {
  instant: 100,
  quick: 200,
  normal: 300,
  slow: 500,
  glacial: 800,
} as const;

// Spring presets - named for their feel, not their math
export const spring = {
  // Snappy: quick, precise, no overshoot - for UI feedback
  snappy: { type: "spring" as const, stiffness: 400, damping: 30, mass: 1 },

  // Smooth: gentle, refined - for content reveals
  smooth: { type: "spring" as const, stiffness: 200, damping: 25, mass: 1 },

  // Bouncy: playful, energetic - for delightful moments
  bouncy: { type: "spring" as const, stiffness: 300, damping: 15, mass: 1 },

  // Soft: slow, elegant - for large movements
  soft: { type: "spring" as const, stiffness: 120, damping: 20, mass: 1 },
} as const;

// Easing curves
export const ease = {
  // Brand easing - used for signature transitions
  brand: [0.2, 0.8, 0.2, 1] as const,

  // Standard easings
  out: [0.0, 0.0, 0.2, 1] as const,
  in: [0.4, 0.0, 1, 1] as const,
  inOut: [0.4, 0.0, 0.2, 1] as const,
} as const;

// Common transition presets
export const transition = {
  // For hover states, button presses
  micro: { duration: duration.instant, ease: ease.out },

  // For content fades, reveals
  fade: { duration: duration.quick, ease: ease.out },

  // For expanding/collapsing content
  expand: { ...spring.smooth },

  // For page transitions
  page: { duration: duration.slow, ease: ease.brand },

  // For playful interactions
  playful: { ...spring.bouncy },
} as const;

// Animation variants for common patterns
export const variants = {
  // Fade in from below
  fadeUp: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  },

  // Fade in from above
  fadeDown: {
    initial: { opacity: 0, y: -12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 8 },
  },

  // Simple fade
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },

  // Scale in
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  },

  // Slide from right (for cards, list items)
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
} as const;

// Stagger children helper
export const stagger = {
  fast: { staggerChildren: 0.03 },
  normal: { staggerChildren: 0.05 },
  slow: { staggerChildren: 0.08 },
} as const;

// Reduced motion check
export const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

// Helper to disable animations for reduced motion
export function withReducedMotion<T extends object>(config: T): T | { duration: 0 } {
  if (prefersReducedMotion) {
    return { duration: 0 };
  }
  return config;
}
