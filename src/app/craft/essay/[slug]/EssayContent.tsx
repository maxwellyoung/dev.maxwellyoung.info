"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { type Essay } from "@/lib/essays";
import { SiteFooter } from "@/components/SiteFooter";

interface EssayContentProps {
  essay: Essay;
}

export function EssayContent({ essay }: EssayContentProps) {
  return (
    <main className="min-h-screen bg-background">
      <article className="max-w-3xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <Link
            href="/craft"
            className="inline-flex items-center space-x-2 text-muted hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Craft</span>
          </Link>

          <header className="mb-12">
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                {essay.category}
              </span>
              {essay.featured && (
                <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-light mb-6 leading-tight">
              {essay.title}
            </h1>

            <p className="text-xl text-muted leading-relaxed mb-6">
              {essay.excerpt}
            </p>

            <div className="flex items-center space-x-6 text-sm text-muted/70 border-t border-b border-border/50 py-4">
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
            {essay.content.split("\n\n").map((paragraph, index) => {
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
                          <li key={itemIndex} className="text-muted/90">
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
                  <p key={index} className="text-muted/90 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                );
              }

              return null;
            })}
          </div>

          <footer className="mt-16 pt-8 border-t border-border/50">
            <Link
              href="/craft"
              className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to all essays</span>
            </Link>
          </footer>

          <SiteFooter />
        </motion.div>
      </article>
    </main>
  );
}
