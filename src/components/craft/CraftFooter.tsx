"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Twitter, Github } from "lucide-react";
import Link from "next/link";

export function CraftFooter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className="pt-16 pb-8"
    >
      <div className="space-y-8">
        {/* Inspiration */}
        <div className="text-center space-y-4">
          <h3 className="font-display text-xl font-light">
            Inspired by the craft of
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted/70">
            <motion.a
              href="https://rauno.me"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors inline-flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
            >
              <span>Rauno Felber</span>
              <ArrowUpRight className="w-3 h-3" />
            </motion.a>
            
            <span>•</span>
            
            <motion.a
              href="https://emilkowal.ski"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors inline-flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
            >
              <span>Emil Kowalski</span>
              <ArrowUpRight className="w-3 h-3" />
            </motion.a>
            
            <span>•</span>
            
            <motion.a
              href="https://ibuildmyideas.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors inline-flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
            >
              <span>Jordan Singer</span>
              <ArrowUpRight className="w-3 h-3" />
            </motion.a>
          </div>
        </div>

        {/* Quote */}
        <div className="text-center max-w-2xl mx-auto">
          <blockquote className="font-display text-lg font-light text-muted italic leading-relaxed">
            "The design engineer's job is to implement intuition in code. 
            Not to simulate physics perfectly, but to capture the feeling of physics. 
            The essence, not the equations."
          </blockquote>
          <cite className="text-sm text-muted/60 mt-2 block">
            — From "The Invisible Details of Interaction Design"
          </cite>
        </div>

        {/* Connect */}
        <div className="text-center space-y-4">
          <p className="text-muted/70 text-sm">
            Interested in design engineering or building interfaces that feel alive?
          </p>
          <div className="flex justify-center space-x-4">
            <motion.a
              href="https://twitter.com/internetmaxwell"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 border border-border rounded-lg text-sm hover:border-accent/30 hover:text-accent transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </motion.a>
            
            <motion.a
              href="mailto:maxtheyoung@gmail.com"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg text-sm hover:bg-accent/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Email</span>
            </motion.a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="text-xs text-muted/60">
            © 2026 Maxwell Young • Design Engineer • Auckland, NZ
          </div>

          <div className="flex items-center gap-4 text-xs text-muted/40">
            <Link href="/" className="hover:text-muted/60 transition-colors">Home</Link>
            <Link href="/contact" className="hover:text-muted/60 transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-muted/60 transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}