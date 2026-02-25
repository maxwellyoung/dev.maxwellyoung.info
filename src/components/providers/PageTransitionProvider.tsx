"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { spring, duration, ease } from "@/lib/motion";

const pageVariants = {
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
    opacity: 1,
    y: -10,
    scale: 0.995,
    transition: {
      duration: duration.quick,
      ease: ease.out,
    },
  },
};

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={pathname}
        initial={false}
        animate="enter"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
