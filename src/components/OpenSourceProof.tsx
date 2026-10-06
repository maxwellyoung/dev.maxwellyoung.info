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
        className="px-2 sm:px-3"
      >
        <h2
          id="open-source-heading"
          className="text-sm font-medium text-muted-foreground"
        >
          Open source
        </h2>
      </motion.div>

      <ul className="divide-y divide-[hsl(var(--border))]/50">
        {openSourceContributions.map((contribution) => (
          <li key={contribution.repository} className="group">
            <a
              href={contribution.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-start gap-3 rounded-md px-2 py-3.5 transition-[background-color,transform] duration-150 ease-out hover:bg-[hsl(var(--muted))]/40 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:px-3"
            >
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-medium leading-tight text-foreground sm:text-lg">
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
