"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { spring, duration, ease } from "@/lib/motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 18,
    scale: 0.995,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...spring.gentle,
      opacity: { duration: duration.normal, ease: ease.out },
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    scale: 0.995,
    transition: {
      duration: duration.quick,
      ease: ease.out,
    },
  },
};

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  const variants = shouldReduceMotion
    ? {
        initial: { opacity: 1 },
        enter: { opacity: 1, transition: { duration: 0 } },
        exit: { opacity: 1, transition: { duration: 0 } },
      }
    : pageVariants;

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
