"use client";

import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { type Essay, essays, splitEssayBlocks } from "@/lib/essays";
import { SiteFooter } from "@/components/SiteFooter";

interface EssayContentProps {
  essay: Essay;
}

export function EssayContent({ essay }: EssayContentProps) {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* A CSS entrance, so the essay is visible without JS and honours reduced motion. */}
        <div className="animate-in fade-in slide-in-from-bottom-5 duration-500 ease-brand">
          <Link
            href="/craft"
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Interaction Lab</span>
          </Link>

          <header className="mb-12">
            <div className="flex items-center space-x-3 mb-4">
              <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-sm font-medium text-foreground">
                {essay.category}
              </span>
              {essay.featured && (
                <span className="rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-sm font-medium text-foreground">
                  Featured
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-light mb-6 leading-tight">
              {essay.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              {essay.excerpt}
            </p>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground border-t border-b border-border/50 py-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(essay.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{essay.readTime} read</span>
              </div>
            </div>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {splitEssayBlocks(essay.content).map((paragraph, index) => {
              // Handle markdown headers
              if (paragraph.startsWith("## ")) {
                return (
                  <h2
                    key={index}
                    className="font-display text-2xl font-light mt-12 mb-6"
                  >
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }

              // Handle code blocks
              if (paragraph.startsWith("```")) {
                const lines = paragraph.split("\n");
                const language = lines[0].replace("```", "");
                const code = lines.slice(1, -1).join("\n");
                return (
                  <pre
                    key={index}
                    className="bg-muted/30 border border-border/50 rounded-lg p-4 overflow-x-auto my-6"
                  >
                    <code className="text-sm font-mono">{code}</code>
                  </pre>
                );
              }

              // Handle numbered lists
              if (paragraph.match(/^\d+\.\s\*\*/)) {
                const items = paragraph.split("\n").filter((line) => line.trim());
                return (
                  <ol key={index} className="list-decimal list-inside space-y-2 my-6">
                    {items.map((item, itemIndex) => {
                      const match = item.match(/^\d+\.\s\*\*(.+?)\*\*:\s*(.+)/);
                      if (match) {
                        return (
                          <li key={itemIndex} className="text-muted-foreground">
                            <strong className="text-foreground">{match[1]}</strong>: {match[2]}
                          </li>
                        );
                      }
                      return <li key={itemIndex}>{item}</li>;
                    })}
                  </ol>
                );
              }

              // Regular paragraphs
              if (paragraph.trim()) {
                return (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                    {paragraph}
                  </p>
                );
              }

              return null;
            })}
          </div>

          {/* Other essays */}
          {essays.filter((e) => e.slug !== essay.slug).length > 0 && (
            <div className="mt-16 pt-8 border-t border-border/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
                More essays
              </p>
              <ul className="space-y-2">
                {essays
                  .filter((e) => e.slug !== essay.slug)
                  .map((e) => (
                    <li key={e.slug}>
                      <Link
                        href={`/craft/essay/${e.slug}`}
                        className="group flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <span>{e.title}</span>
                        <span className="text-xs text-muted-foreground">{e.readTime}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          <footer className="mt-8 pt-8 border-t border-border/50">
            <Link
              href="/craft"
              className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to all essays</span>
            </Link>
          </footer>

          <SiteFooter />
        </div>
      </article>
    </main>
  );
}
