"use client";

import { motion } from "framer-motion";

type MarqueeProps = {
  items: string[];
  speed?: number; // pixels per second
  className?: string;
};

export function Marquee({ items, speed = 60, className }: MarqueeProps) {
  const content = items.join("  ·  ");
  const duration = 1000 / speed; // seconds to move 1000px

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className ?? ""}`}>
      <motion.div
        className="inline-block will-change-transform"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration, ease: "linear" }}
      >
        <span className="text-xs tracking-[0.08em] text-muted pr-8">
          {content}
        </span>
        <span className="text-xs tracking-[0.08em] text-muted pr-8">
          {content}
        </span>
        <span className="text-xs tracking-[0.08em] text-muted pr-8">
          {content}
        </span>
      </motion.div>
    </div>
  );
}
