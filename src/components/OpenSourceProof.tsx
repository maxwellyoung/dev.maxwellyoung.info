"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { openSourceContributions } from "@/lib/openSource";
import { item, spring } from "@/lib/motion";

export function OpenSourceProof() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const contribution = openSourceContributions[0];

  return (
    <section
      id="open-source"
      aria-labelledby="open-source-heading"
      className="mb-14 px-4 md:px-8"
    >
      <motion.div
        variants={item.fadeUp}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2
            id="open-source-heading"
            className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground"
          >
            External contributions
          </h2>
          <p className="text-xs text-muted-foreground">
            Reviewed and merged outside my own repositories
          </p>
        </div>

        <motion.a
          href={contribution.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block border-y border-border/70 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
          whileHover={shouldReduceMotion ? undefined : { x: 3 }}
          transition={spring.snappy}
        >
          <p className="text-[0.62rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {contribution.eyebrow}
          </p>

          <div className="mt-3 grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div className="max-w-xl">
              <h3 className="text-lg font-medium leading-snug text-foreground transition-colors duration-200 group-hover:text-accent">
                {contribution.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {contribution.summary}
              </p>
            </div>

            <span className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-accent">
              Read merged PR
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            {contribution.proof.join(" · ")}
          </p>
        </motion.a>
      </motion.div>
    </section>
  );
}
