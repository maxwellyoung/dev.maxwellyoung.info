"use client";

import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { motion, AnimatePresence } from "framer-motion";

interface CopyEmailProps {
  email: string;
  className?: string;
  showEmail?: boolean;
}

export function CopyEmail({ email, className = "", showEmail = true }: CopyEmailProps) {
  const { status, copy } = useCopyToClipboard();

  return (
    <button
      onClick={() => copy(email)}
      className={`group inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm ${className}`}
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
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 text-accent"
            >
              <Check className="w-4 h-4" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity"
            >
              <Copy className="w-4 h-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}
