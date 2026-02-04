"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { essays, type Essay } from "@/lib/essays";

export function DesignEssays() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className="space-y-8"
    >
      <div>
        <h2 className="font-display text-3xl font-light mb-4">Design Essays</h2>
        <p className="text-muted leading-relaxed max-w-2xl">
          Thoughts on craft, motion, and the intersection of design and
          engineering. Documenting lessons learned and principles discovered
          while building interfaces that feel alive.
        </p>
      </div>

      <div className="space-y-8">
        {essays.map((essay, index) => (
          <EssayCard key={essay.title} essay={essay} index={index} />
        ))}
      </div>

      <div className="pt-8 border-t border-border/50">
        <p className="text-sm text-muted/70 text-center">
          More essays coming soon. Following in the footsteps of Rauno, Emil,
          and the design engineers who document their craft.
        </p>
      </div>
    </motion.section>
  );
}

function EssayCard({ essay, index }: { essay: Essay; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className={`group cursor-pointer ${essay.featured ? "col-span-full" : ""}`}
    >
      <Link href={`/craft/essay/${essay.slug}`}>
        <div
          className={`
          border border-border/50 rounded-xl p-6 md:p-8
          hover:border-accent/30 transition-all duration-500
          hover:shadow-lg group-hover:scale-[1.01]
          ${essay.featured ? "bg-accent/5" : "hover:bg-muted/30"}
        `}
        >
          {essay.featured && (
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
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

              <p className="text-muted/80 leading-relaxed mt-2">
                {essay.excerpt}
              </p>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted/60">
              <span className="bg-muted/30 px-3 py-1 rounded-full font-medium">
                {essay.category}
              </span>

              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>
                  {new Date(essay.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
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
                  <div className="text-muted/80 leading-relaxed">
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
              className="text-sm font-medium text-accent group-hover:text-accent-foreground transition-colors inline-flex items-center space-x-1"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <span>Read essay</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.span>
          </motion.div>
        </div>
      </Link>
    </motion.article>
  );
}
