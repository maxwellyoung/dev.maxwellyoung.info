"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Calendar, Search } from "lucide-react";
import { useState } from "react";

import { SiteFooter } from "@/components/SiteFooter";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { container, item } from "@/lib/motion";
import { formatDate } from "@/lib/utils";

export function BlogLayoutComponent() {
  const { blogPosts, loading, error } = useBlogPosts();
  const [searchQuery, setSearchQuery] = useState("");
  const shouldReduceMotion = useReducedMotion() ?? false;
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredPosts = blogPosts.filter((post) =>
    [post.title, post.excerpt, ...(post.tags ?? [])]
      .filter((value): value is string => Boolean(value))
      .some((value) => value.toLowerCase().includes(normalizedQuery)),
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
        <motion.header
          variants={container.hero}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
        >
          <motion.div variants={item.fadeUp}>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              &larr; Back
            </Link>
          </motion.div>
          <motion.div className="mt-8" variants={item.fadeUp}>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Notes
            </p>
            <h1 className="mt-2 text-3xl font-medium tracking-tight">Writing</h1>
            <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">
              Essays on interaction design, software systems, and the details
              that make products hold together.
            </p>
          </motion.div>
        </motion.header>

        {!loading && !error && blogPosts.length > 0 && (
          <div className="relative mt-10">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              aria-label="Search writing"
              placeholder="Search writing"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="min-h-11 w-full rounded-sm border border-border/70 bg-transparent pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
            />
          </div>
        )}

        <section className="mt-10" aria-labelledby="writing-index-heading">
          <h2
            id="writing-index-heading"
            className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground"
          >
            Index
          </h2>

          {loading ? (
            <div className="mt-4 divide-y divide-border/60 border-y border-border/60" aria-label="Loading writing">
              {[0, 1, 2].map((row) => (
                <div key={row} className="space-y-2 py-5">
                  <div className="h-4 w-2/3 animate-pulse rounded-sm bg-muted" />
                  <div className="h-3 w-1/3 animate-pulse rounded-sm bg-muted/70" />
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="mt-4 border-y border-border/60 py-6 text-sm leading-relaxed text-muted-foreground">
              Writing is temporarily unavailable. The rest of the portfolio is
              still here.
            </p>
          ) : filteredPosts.length === 0 ? (
            <p className="mt-4 border-y border-border/60 py-6 text-sm leading-relaxed text-muted-foreground">
              {normalizedQuery
                ? `No notes match “${searchQuery.trim()}”.`
                : "No published notes yet."}
            </p>
          ) : (
            <motion.ul
              variants={container.list}
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              className="mt-4 divide-y divide-border/60 border-y border-border/60"
            >
              {filteredPosts.map((post) => (
                <motion.li key={post._id} variants={item.slide}>
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="group grid min-h-24 gap-2 rounded-sm py-5 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-6"
                  >
                    <span>
                      <span className="block font-medium leading-snug text-foreground transition-colors group-hover:text-accent">
                        {post.title}
                      </span>
                      {post.excerpt && (
                        <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-muted-foreground">
                          {post.excerpt}
                        </span>
                      )}
                    </span>
                    <span className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
