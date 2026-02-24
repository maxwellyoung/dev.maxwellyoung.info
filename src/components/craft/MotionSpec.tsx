"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { spring, duration, ease } from "@/lib/motion";

const springRows = [
  { name: "snappy", use: "buttons, toggles, immediate feedback", value: "stiffness 500 / damping 35 / mass 1" },
  { name: "default", use: "general UI state transitions", value: "stiffness 300 / damping 30 / mass 1" },
  { name: "gentle", use: "content reveal, structural transitions", value: "stiffness 170 / damping 26 / mass 1" },
  { name: "soft", use: "large movement, modal context shifts", value: "stiffness 120 / damping 20 / mass 1" },
];

const timingRows = [
  { tier: "Feedback", range: "100-180ms", examples: "press states, icon state changes" },
  { tier: "State change", range: "220-320ms", examples: "panel expand/collapse, route transitions" },
  { tier: "Context shift", range: "350-500ms", examples: "modal enters, large layout shifts" },
];

export function MotionSpec() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      initial={false}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 16 }}
      transition={{ duration: duration.glacial, ease: ease.brand }}
      className="space-y-8"
    >
      <div>
        <h2 className="font-display text-3xl font-light mb-4">Motion Spec</h2>
        <p className="text-muted leading-relaxed max-w-2xl">
          A practical motion grammar used across production surfaces. These values are
          design constraints, not one-off animation flourishes.
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Spring presets</p>
        <div className="grid gap-3">
          {springRows.map((row) => (
            <div key={row.name} className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/40 p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-foreground">{row.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{row.value}</p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{row.use}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Timing tiers</p>
        <div className="grid gap-3">
          {timingRows.map((row) => (
            <div key={row.tier} className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/40 p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-foreground">{row.tier}</p>
                <p className="text-xs text-muted-foreground font-mono">{row.range}</p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{row.examples}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/40 p-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Reduced motion rule</p>
        <p className="text-sm text-muted-foreground">
          If reduced motion is enabled, transitions become opacity-first with duration collapse.
          No drag-dependent interactions are required to complete core flows.
        </p>
      </div>
    </motion.section>
  );
}
