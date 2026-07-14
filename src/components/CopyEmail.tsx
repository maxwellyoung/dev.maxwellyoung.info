"use client";

import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { duration, ease } from "@/lib/motion";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface CopyEmailProps {
  email: string;
  className?: string;
  showEmail?: boolean;
}

export function CopyEmail({ email, className = "", showEmail = true }: CopyEmailProps) {
  const { status, copy } = useCopyToClipboard();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const iconMotion = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: duration.instant, ease: ease.out },
      }
    : {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        transition: { duration: duration.quick, ease: ease.out },
      };

  return (
    <button
      type="button"
      onClick={() => copy(email)}
      className={`group inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${className}`}
      aria-label={status === "copied" ? "Email copied!" : `Copy email: ${email}`}
    >
      {showEmail && (
        <span className="text-sm">{email}</span>
      )}
      <span className="relative w-4 h-4 flex-shrink-0">
        <AnimatePresence mode="wait" initial={false}>
          {status === "copied" ? (
            <motion.span
              key="check"
              {...iconMotion}
              className="absolute inset-0 text-accent"
            >
              <Check className="w-4 h-4" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              {...iconMotion}
              className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity"
            >
              <Copy className="w-4 h-4" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}
