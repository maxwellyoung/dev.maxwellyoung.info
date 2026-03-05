"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { essays, type Essay } from "@/lib/essays";
import { duration, ease } from "@/lib/motion";
import { CraftSection } from "@/components/craft/CraftSection";
import { SymbolEvidence, SymbolPrinciple, SymbolProgress } from "@/components/craft/CraftSymbols";

export function DesignEssays() {
  return (
    <CraftSection
      id="design-essays"
      title="Design Essays"
      intent="Short writing tied to shipped interfaces. Reflection is treated as a design artifact."
      constraint="Each essay must map one principle to one concrete build decision."
      evidence="Entries include date, read time, and direct link to source narrative."
    >
      <div className="space-y-8">
        {essays.map((essay, index) => (
          <EssayCard key={essay.title} essay={essay} index={index} />
        ))}
      </div>

      <div className="pt-8 border-t border-border/50">
        <p className="text-sm text-muted-foreground text-center">
          More essays coming soon. Each one is tied to a shipped interface or a concrete interaction problem.
        </p>
      </div>
    </CraftSection>
  );
}

function EssayCard({ essay, index }: { essay: Essay; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration.glacial,
        delay: index * 0.1,
        ease: ease.brand,
      }}
      className={`group ${essay.featured ? "col-span-full" : ""}`}
    >
      <Link href={`/craft/essay/${essay.slug}`} className="craft-focus block rounded-xl">
        <div
          className={`
          border border-border/70 rounded-xl p-6 md:p-8
          hover:border-accent/30 motion-safe-transform duration-300
          hover:shadow-lg group-hover:-translate-y-0.5
          ${essay.featured ? "bg-accent/5" : "hover:bg-muted/30"}
        `}
        >
          {essay.featured && (
            <div className="flex items-center space-x-2 mb-4">
              <SymbolPrinciple className="text-accent" />
              <span className="text-xs font-medium text-accent uppercase tracking-wide">
                Featured Essay
              </span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h3
                className={`font-display font-light group-hover:text-accent transition-colors ${
                  essay.featured ? "text-2xl md:text-3xl" : "text-xl"
                }`}
              >
                {essay.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed mt-2">
                {essay.excerpt}
              </p>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="bg-muted/30 px-3 py-1 rounded-full font-medium">
                <span className="inline-flex items-center gap-1">
                  <SymbolProgress className="text-accent" />
                  {essay.category}
                </span>
              </span>

              <div className="flex items-center space-x-1">
                <Calendar aria-hidden="true" className="w-3 h-3" />
                <span>
                  {new Date(essay.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center space-x-1">
                <Clock aria-hidden="true" className="w-3 h-3" />
                <span>{essay.readTime}</span>
              </div>
            </div>

            {essay.featured && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="pt-4 border-t border-border/30"
              >
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div className="text-muted-foreground leading-relaxed">
                    {essay.content.split("\n\n")[0]?.substring(0, 200)}...
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <motion.div
            className="flex items-center mt-6 pt-4 border-t border-border/30"
            initial={false}
            animate={{
              opacity: 1,
            }}
          >
            <motion.span
              className="text-sm font-medium text-accent group-hover:text-foreground transition-colors inline-flex items-center space-x-1"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <SymbolEvidence className="text-accent" />
              <span>Read essay</span>
              <ArrowUpRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.span>
          </motion.div>
        </div>
      </Link>
    </motion.article>
  );
}
