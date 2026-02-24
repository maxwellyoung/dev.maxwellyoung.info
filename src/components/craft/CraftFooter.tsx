"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Twitter, Github } from "lucide-react";
import Link from "next/link";
import { duration, ease, tap } from "@/lib/motion";

export function CraftFooter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.footer
      ref={ref}
      initial={false}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 20 }}
      transition={{ duration: duration.glacial, ease: ease.brand }}
      className="pt-16 pb-8"
    >
      <div className="space-y-8">
        {/* Connect */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground text-sm">
            If you want this level of craft in your product, let's talk.
          </p>
          <div className="flex justify-center space-x-4">
            <motion.a
              href="https://twitter.com/internetmaxwell"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 border border-border rounded-lg text-sm hover:border-accent/30 hover:text-accent transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={tap.deep}
            >
              <Twitter className="w-4 h-4" />
              <span>Twitter</span>
            </motion.a>
            
            <motion.a
              href="https://github.com/maxwellyoung"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 border border-border rounded-lg text-sm hover:border-accent/30 hover:text-accent transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={tap.deep}
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </motion.a>
            
            <motion.a
              href="mailto:maxtheyoung@gmail.com"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg text-sm hover:bg-accent/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={tap.deep}
            >
              <span>Email</span>
            </motion.a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="text-xs text-muted-foreground">
            © 2026 Maxwell Young • Design Engineer • Auckland, NZ
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
