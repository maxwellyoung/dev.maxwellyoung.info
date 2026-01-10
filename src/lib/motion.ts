/**
 * Unified Motion System
 *
 * A single source of truth for all animation timing, springs, and easings.
 * Influenced by Emil Kowalski's motion grammar and Dieter Rams' restraint.
 *
 * Principles:
 * - Springs feel alive, easings feel mechanical
 * - Exit animations are as important as entrances
 * - Stagger creates rhythm, not chaos
 * - Reduced motion is respected, not ignored
 */

// Duration tokens (in seconds for Framer Motion)
export const duration = {
  instant: 0.1,
  quick: 0.15,
  normal: 0.25,
  slow: 0.4,
  glacial: 0.6,
} as const;

// Spring presets - named for their feel, not their math
// Tuned for organic, alive-feeling motion
export const spring = {
  // Snappy: immediate response, minimal overshoot - for buttons, toggles
  snappy: { type: "spring" as const, stiffness: 500, damping: 35, mass: 1 },

  // Default: the workhorse - for most UI transitions
  default: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },

  // Gentle: smooth, refined - for content reveals, page transitions
  gentle: { type: "spring" as const, stiffness: 170, damping: 26, mass: 1 },

  // Soft: slow, elegant - for large movements, modals
  soft: { type: "spring" as const, stiffness: 120, damping: 20, mass: 1 },

  // Bouncy: playful overshoot - use sparingly
  bouncy: { type: "spring" as const, stiffness: 400, damping: 17, mass: 1 },

  // Molasses: very slow, heavy - for dramatic reveals
  molasses: { type: "spring" as const, stiffness: 80, damping: 20, mass: 1.5 },
} as const;

// Easing curves (for when springs aren't appropriate)
export const ease = {
  // Brand easing - signature feel
  brand: [0.22, 0.68, 0.0, 1.0] as const,

  // Smooth out - content appearing
  out: [0.0, 0.0, 0.2, 1] as const,

  // Quick out - UI feedback
  outQuick: [0.0, 0.0, 0.4, 1] as const,

  // Smooth in-out - for looping, continuous
  inOut: [0.4, 0.0, 0.2, 1] as const,
} as const;

// Transition presets
export const transition = {
  // Micro interactions: button presses, toggles
  micro: { ...spring.snappy },

  // Default: most UI transitions
  default: { ...spring.default },

  // Fade: opacity-only changes
  fade: { duration: duration.quick, ease: ease.out },

  // Reveal: content appearing
  reveal: { ...spring.gentle },

  // Page: route transitions
  page: { ...spring.gentle },

  // Layout: for layout animations
  layout: { ...spring.default },

  // Slow: dramatic moments
  slow: { ...spring.soft },
} as const;

// Stagger configurations
export const stagger = {
  // Fast: for many small items (icons, dots)
  fast: 0.025,

  // Default: for list items, cards
  default: 0.05,

  // Slow: for hero content, important sequences
  slow: 0.1,

  // Dramatic: for page-level reveals
  dramatic: 0.15,
} as const;

// Container variants for orchestrated animations
export const container = {
  // Standard staggered reveal
  stagger: (delayChildren = 0, staggerAmount = stagger.default) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren,
        staggerChildren: staggerAmount,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: staggerAmount / 2,
        staggerDirection: -1,
      },
    },
  }),

  // For hero sections - slower, more dramatic
  hero: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: stagger.slow,
      },
    },
  },

  // For lists - quick succession
  list: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0,
        staggerChildren: stagger.default,
      },
    },
  },
} as const;

// Item variants (children of containers)
export const item = {
  // Fade up - the default reveal
  fadeUp: {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: spring.gentle,
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: { duration: duration.quick, ease: ease.out },
    },
  },

  // Fade in - for text, subtle elements
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: duration.normal, ease: ease.out },
    },
    exit: {
      opacity: 0,
      transition: { duration: duration.quick },
    },
  },

  // Scale - for cards, images
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: spring.default,
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: duration.quick },
    },
  },

  // Slide - for list items
  slide: {
    hidden: { opacity: 0, x: -12 },
    visible: {
      opacity: 1,
      x: 0,
      transition: spring.default,
    },
    exit: {
      opacity: 0,
      x: 12,
      transition: { duration: duration.quick },
    },
  },
} as const;

// Hover/tap animations
export const hover = {
  // Subtle lift - for cards
  lift: {
    scale: 1.02,
    y: -2,
    transition: spring.snappy,
  },

  // Subtle scale - for buttons
  scale: {
    scale: 1.02,
    transition: spring.snappy,
  },

  // Glow - opacity boost
  glow: {
    opacity: 1,
    transition: { duration: duration.instant },
  },
} as const;

export const tap = {
  // Press down - for buttons
  press: {
    scale: 0.98,
    transition: spring.snappy,
  },

  // Deep press - for important actions
  deep: {
    scale: 0.95,
    transition: spring.snappy,
  },
} as const;

// Reduced motion utilities
export const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

export function withReducedMotion<T extends object>(
  config: T
): T | { duration: 0 } {
  if (prefersReducedMotion) {
    return { duration: 0 };
  }
  return config;
}

// Reduced motion variants - instant transitions
export const reducedMotion = {
  fadeUp: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  },
} as const;

// Helper to get appropriate variants
export function getVariants(variant: keyof typeof item) {
  return prefersReducedMotion ? reducedMotion.fade : item[variant];
}

// Layout animation helpers
export const layoutTransition = {
  // For shared element transitions
  shared: {
    type: "spring" as const,
    stiffness: 350,
    damping: 30,
  },

  // For container resizing
  resize: {
    type: "spring" as const,
    stiffness: 200,
    damping: 25,
  },
} as const;
