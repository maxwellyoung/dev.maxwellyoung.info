"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function CraftHeader() {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.2, 0.8, 0.2, 1],
      }}
    >
      <Link
        href="/"
        className="inline-flex items-center text-muted hover:text-foreground transition-colors mb-12 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
        Back to portfolio
      </Link>
      
      <div className="space-y-6">
        <h1 className="font-display text-6xl md:text-8xl font-light tracking-tight">
          Interaction Lab
        </h1>
        
        <p className="text-lg text-muted max-w-2xl leading-relaxed">
          Practical studies on motion, feedback, and UI behavior.
          Each piece documents what was tried, what worked, and what changed in production work.
        </p>
      </div>
    </motion.div>
  );
}
