"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Resume from "./resume/page";
import { ProjectsShowcase } from "./projects/page";
import { motion, AnimatePresence } from "framer-motion";
import FallingStars from "@/components/FallingStars";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { AnimatedLink, AccentLink } from "@/components/ui/animated-link";
import { ChevronUp } from "lucide-react";
import { GitHubActivity } from "@/components/GitHubActivity";
import { NowPlaying } from "@/components/NowPlaying";
import { ThemeToggle } from "@/components/ThemeToggle";
import { container, item, spring, duration, ease } from "@/lib/motion";


export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { setTheme } = useTheme();

  // Easter egg: Konami code triggers falling stars
  useKonamiCode(() => setShowStars(true));

  // Back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    // Set theme based on system preference
    // Use requestAnimationFrame to ensure component is mounted
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Defer initial theme set to avoid state update before mount
    requestAnimationFrame(() => {
      setTheme(mediaQuery.matches ? "dark" : "light");
    });

    const onChange = (e: MediaQueryListEvent) => setTheme(e.matches ? "dark" : "light");
    try {
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    } catch {
      // Safari <14 fallback
      // @ts-ignore
      mediaQuery.addListener(onChange);
      // @ts-ignore
      return () => mediaQuery.removeListener(onChange);
    }
  }, [setTheme]);

  // Subtitle crossfade variants with spring physics
  const crossfadeVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 12 },
  };

  return (
    <div className="min-h-screen text-foreground p-4 md:p-8 flex flex-col justify-between overflow-x-hidden">
      <main className="w-full max-w-full md:max-w-2xl mx-auto space-y-8 overflow-y-auto scroll-smooth overflow-x-hidden">
        <motion.section
          className="relative flex flex-col justify-center items-start min-h-screen space-y-8 p-4 md:p-8"
          variants={container.hero}
          initial="hidden"
          animate="visible"
        >
          <motion.header className="mb-12 w-full" variants={item.fadeUp}>
            <div className="flex items-center justify-between">
              <h1
                className="text-xl glint text-foreground font-medium cursor-pointer hover:text-accent transition-colors duration-200"
                onClick={() => setShowStars(true)}
              >
                Maxwell Young
              </h1>
              <ThemeToggle />
            </div>

            {/* Crossfading subtitle */}
            <div
              className="relative h-8 cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setIsHovered((prev) => !prev)}
            >
              <motion.p
                className="block text-xl font-light text-muted-foreground tracking-tight leading-tight absolute inset-0 whitespace-nowrap"
                variants={crossfadeVariants}
                initial="visible"
                animate={isHovered ? "hidden" : "visible"}
                transition={spring.gentle}
              >
                Design Engineer ·{" "}
                <AnimatedLink
                  href="https://www.ninetynine.digital"
                  external
                  className="relative z-10 pointer-events-auto text-muted-foreground"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                  ninetynine.digital
                </AnimatedLink>
              </motion.p>
              <motion.p
                className="block text-xl font-light text-muted-foreground absolute inset-0 whitespace-nowrap"
                variants={crossfadeVariants}
                initial="hidden"
                animate={isHovered ? "visible" : "hidden"}
                transition={spring.gentle}
              >
                Software that knows when to shut up.
              </motion.p>
            </div>
          </motion.header>

          <div className="leading-relaxed space-y-4">
            {/* What I do + Now */}
            <motion.p className="text-foreground" variants={item.fadeUp}>
              Design Engineer at{" "}
              <AnimatedLink href="https://www.silk.cx" external>Silk</AnimatedLink>
              . Building{" "}
              <AnimatedLink href="https://liner.ninetynine.digital" external>Liner</AnimatedLink>
              {" "}(spatial canvas for music) and{" "}
              <AnimatedLink href="https://whakapapa.vercel.app" external>Whakapapa</AnimatedLink>
              {" "}(AI-powered family knowledge base). Also shipping{" "}
              <AnimatedLink href="https://vapequitcoach.com" external>Vape Quit Coach</AnimatedLink>
              {" "}solo (iOS, 4.8★).
            </motion.p>

            {/* Principles - filters in/out */}
            <motion.ul className="text-muted-foreground text-sm space-y-1 border-l border-border pl-3" variants={item.fadeUp}>
              <li>No algorithmic feeds. No dark patterns. No engagement tricks.</li>
              <li>Fewer features, sharper tools.</li>
              <li>If the UI needs guilt to work, the design failed.</li>
            </motion.ul>

            {/* CTA */}
            <motion.div className="pt-2" variants={item.fadeUp}>
              <AccentLink
                href="mailto:maxwell@ninetynine.digital"
                external
              >
                Available for work
              </AccentLink>
            </motion.div>

            <motion.nav
              className="text-muted-foreground text-xs flex flex-wrap items-center gap-x-2 gap-y-1"
              variants={item.fadeUp}
              aria-label="Primary navigation"
            >
              <AnimatedLink href="#projects" className="text-muted-foreground hover:text-foreground">Work</AnimatedLink>
              <span className="text-border/40">·</span>
              <AnimatedLink href="#resume" className="text-muted-foreground hover:text-foreground">Resume</AnimatedLink>
              <span className="text-border/40">·</span>
              <AnimatedLink href="/about" className="text-muted-foreground hover:text-foreground">About</AnimatedLink>
              <span className="text-border/40">·</span>
              <AnimatedLink href="/craft" className="text-muted-foreground hover:text-foreground">Craft</AnimatedLink>
              <span className="text-border/40">·</span>
              <AnimatedLink href="https://github.com/maxwellyoung" external className="text-muted-foreground hover:text-foreground">GitHub</AnimatedLink>
              <span className="text-border/40">·</span>
              <AnimatedLink href="https://www.linkedin.com/in/maxwell-young-a55032125" external className="text-muted-foreground hover:text-foreground">LinkedIn</AnimatedLink>
            </motion.nav>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, ...spring.soft }}
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <motion.div
              className="w-px h-8 bg-current"
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.4, duration: duration.slow, ease: ease.out }}
            />
          </motion.div>
        </motion.section>

        <section id="projects">
          <ProjectsShowcase embedded />
        </section>

        <section id="resume">
          <Resume />
        </section>

        <footer className="mt-16 pt-8 border-t border-[hsl(var(--border))]">
          {/* Activity widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <GitHubActivity />
            <NowPlaying />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              <AnimatedLink href="https://www.ninetynine.digital" external>
                ninetynine.digital
              </AnimatedLink>
              {" "}— software that earns its place on your screen.
            </p>
            <div className="flex items-center gap-4">
              <AnimatedLink href="/contact" className="text-xs text-muted-foreground hover:text-foreground">
                Contact
              </AnimatedLink>
              <AnimatedLink href="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
                Privacy
              </AnimatedLink>
              <p className="text-xs text-muted-foreground hidden sm:block font-mono">
                ↑↑↓↓←→←→BA
              </p>
            </div>
          </div>
        </footer>
      </main>

      <AnimatePresence>
        {showStars && <FallingStars onComplete={() => setShowStars(false)} />}
      </AnimatePresence>

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={spring.default}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="fixed bottom-20 md:bottom-24 right-6 z-50 p-3 rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-muted-foreground hover:text-foreground hover:border-accent/50 shadow-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label="Back to top"
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
