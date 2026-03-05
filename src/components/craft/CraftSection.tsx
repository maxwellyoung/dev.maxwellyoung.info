"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";
import { duration, ease } from "@/lib/motion";
import { SymbolPrinciple } from "@/components/craft/CraftSymbols";

interface CraftSectionProps {
  id: string;
  title: string;
  intent: string;
  constraint: string;
  evidence?: string;
  children: ReactNode;
}

export function CraftSection({
  id,
  title,
  intent,
  constraint,
  evidence,
  children,
}: CraftSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={false}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 14 }}
      transition={{ duration: duration.structural, ease: ease.brand }}
      className="relative space-y-8 scroll-mt-24"
    >
      <header className="space-y-4">
        <h2 className="font-display text-3xl font-light text-balance">{title}</h2>
        <p className="max-w-2xl text-muted leading-relaxed">{intent}</p>

        <div className="rounded-xl border border-border/70 bg-card/60 p-4 md:p-5">
          <div className="flex items-start gap-3 text-sm">
            <SymbolPrinciple className="mt-0.5 text-accent" />
            <div className="grid gap-2 md:grid-cols-2 md:gap-6 w-full">
              <p className="text-muted-foreground">
                <span className="text-foreground font-medium">Constraint:</span>{" "}
                {constraint}
              </p>
              {evidence ? (
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">Evidence:</span>{" "}
                  {evidence}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      {children}
    </motion.section>
  );
}
