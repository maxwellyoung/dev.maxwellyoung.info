"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function CraftHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
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
          Craft
        </h1>
        
        <p className="text-lg text-muted max-w-2xl leading-relaxed">
          Interaction studies, design essays, and explorations in interface craft. 
          Building things that feel alive through thoughtful motion and attention to detail.
        </p>
        
        <div className="flex items-center text-sm text-muted/70 space-x-4">
          <span>Inspired by Emil Kowalski, Jordan Singer, Rauno Felber</span>
          <span>•</span>
          <span>Motion grammar for humane interfaces</span>
        </div>
      </div>
    </motion.div>
  );
}