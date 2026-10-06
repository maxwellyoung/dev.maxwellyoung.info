"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { openSourceContributions } from "@/lib/openSource";
import { item } from "@/lib/motion";

// Mirrors the ProjectsShowcase section and row rhythm so upstream work reads
// as part of the same list rather than a separate card.
export function OpenSourceProof() {
  return (
    <section
      id="open-source"
      aria-labelledby="open-source-heading"
      className="mx-auto mb-14 max-w-2xl space-y-3 px-4 sm:px-6"
    >
      <motion.div
        variants={item.fadeUp}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="flex flex-col gap-1 px-2 sm:px-3"
      >
        <h2
          id="open-source-heading"
          className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground"
        >
          Open source
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          Merged contributions to other people&apos;s projects.
        </p>
      </motion.div>

      <ul className="divide-y divide-[hsl(var(--border))]/50">
        {openSourceContributions.map((contribution) => (
          <li key={contribution.repository} className="group">
            <a
              href={contribution.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-start gap-3 rounded-sm border border-transparent px-2 py-3.5 transition-[background-color,border-color] duration-300 ease-out hover:border-border/70 hover:bg-[hsl(var(--muted))]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:px-3"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-2 left-0 w-px origin-top scale-y-0 bg-accent/70 transition-transform duration-300 ease-out group-hover:scale-y-100"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-medium leading-tight text-foreground transition-colors duration-300 group-hover:text-accent sm:text-lg">
                  {contribution.project}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {contribution.title}
                </p>
                <p className="mt-2 truncate text-xs text-muted-foreground">
                  {[contribution.proof[0], contribution.stack[0]].join(" · ")}
                </p>
              </div>
              <ArrowUpRight
                aria-hidden="true"
                className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground/50 transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-muted-foreground"
              />
              <span className="sr-only">View merged contributions (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
