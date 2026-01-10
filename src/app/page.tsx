"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Resume from "./resume/page";
import ProjectsShowcase from "./projects/page";
import { motion, AnimatePresence } from "framer-motion";
import FallingStars from "@/components/FallingStars";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { AnimatedLink, AccentLink } from "@/components/ui/animated-link";
import { ChevronUp } from "lucide-react";
import { GitHubActivity } from "@/components/GitHubActivity";
import { NowPlaying } from "@/components/NowPlaying";
import { ContactForm } from "@/components/ContactForm";
import dynamic from "next/dynamic";
import { ThemeToggle } from "@/components/ThemeToggle";

const Hero3D = dynamic(() => import("@/components/Hero3D").then(mod => ({ default: mod.Hero3D })), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { setTheme } = useTheme();

  // Easter egg: Konami code triggers falling stars (Evan Bacon delight)
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
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(mediaQuery.matches ? "dark" : "light");

    // Listen for changes in system preference
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

  const titleVariants = {
    initial: { opacity: 1, y: 0 },
    hover: { opacity: 0, y: -20 },
  };

  const subtitleVariants = {
    initial: { opacity: 0, y: 20 },
    hover: { opacity: 1, y: 0 },
  };

  // Hero entrance animation
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
    },
  };

  return (
    <div className="min-h-screen text-foreground p-4 md:p-8 flex flex-col justify-between overflow-x-hidden">
      <main className="w-full max-w-full md:max-w-2xl mx-auto space-y-8 overflow-y-auto scroll-smooth overflow-x-hidden">
        <motion.section
          className="relative flex flex-col justify-center items-start min-h-screen space-y-8 p-4 md:p-8"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 3D floating element */}
          <Hero3D />

          {/* Subtle scanlines - Saville's technical aesthetic */}
          <div className="scanlines opacity-30" />

          {/* FAC-style color bar - Saville's Movement encoding */}
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-1"
            variants={heroItemVariants}
          >
            <div className="w-1 h-12 bg-accent" />
            <div className="w-1 h-8 bg-[hsl(210_80%_55%)]" />
            <div className="w-1 h-6 bg-foreground/20" />
          </motion.div>

          <motion.header className="mb-12 w-full" variants={heroItemVariants}>
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="text-xl glint text-foreground font-medium cursor-pointer hover:text-accent transition-colors duration-200"
                onClick={() => setShowStars(true)}
              >
                Maxwell Young
              </Link>
              <ThemeToggle />
            </div>

            {/* Mobile: stacked role/subtitle; Desktop: hover crossfade */}
            <div
              className="relative h-8"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setIsHovered((prev) => !prev)}
              onTouchStart={(e) => {
                e.preventDefault();
                setIsHovered((prev) => !prev);
              }}
            >
              <motion.p
                className="block text-xl font-light text-muted-foreground tracking-tight leading-tight absolute inset-0 whitespace-nowrap"
                variants={titleVariants}
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
                transition={{ duration: 0.3 }}
              >
                Design Engineer · Founder,{" "}
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
                variants={subtitleVariants}
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
                transition={{ duration: 0.3 }}
              >
                Software that knows when to shut up
              </motion.p>
            </div>
          </motion.header>

          <div className="leading-relaxed space-y-4">
            {/* Thesis - a stake in the ground */}
            <motion.p className="text-foreground text-lg" variants={heroItemVariants}>
              Most software is noise. I build the other kind—tools that reduce psychic load, interfaces that disappear into use, things that feel inevitable in hindsight. If you think dashboards should have more features, we probably shouldn&apos;t work together.
            </motion.p>

            {/* What I&apos;m doing now */}
            <motion.p className="text-muted-foreground" variants={heroItemVariants}>
              <span className="text-foreground font-medium">Now:</span>{" "}
              Frontend at{" "}
              <AnimatedLink href="https://www.silk.cx" external>Silk</AnimatedLink>
              {" "}(blogs, archives, moodboards for people who miss the handmade web). Solo building{" "}
              <AnimatedLink href="https://vapequitcoach.com" external>Vape Quit Coach</AnimatedLink>
              {" "}(quitting through architecture, not willpower).
            </motion.p>

            {/* The weird stuff - foregrounded */}
            <motion.p className="text-muted-foreground" variants={heroItemVariants}>
              I also make{" "}
              <AnimatedLink href="https://music.maxwellyoung.info" external>music</AnimatedLink>
              {" "}and{" "}
              <AnimatedLink href="https://jeremy-blake.vercel.app/" external>WebGL art</AnimatedLink>
              . Code is a medium. Performance is a creative constraint. The smoothness of an interaction is inseparable from its emotional effect.
            </motion.p>

            {/* Trajectory - where I&apos;m going */}
            <motion.p className="text-muted-foreground text-sm border-l-2 border-accent/30 pl-3" variants={heroItemVariants}>
              <span className="text-foreground/70">Drawn to:</span> research contexts, health interfaces, tools for memory.{" "}
              <span className="text-foreground/70">Less interested in:</span> dashboards that mistake features for value.
            </motion.p>

            {/* CTA with edge */}
            <motion.div className="pt-4 pb-2" variants={heroItemVariants}>
              <AccentLink
                href="mailto:maxwell@ninetynine.digital"
                external
                className="text-lg"
              >
                If any of this resonates, let&apos;s talk
              </AccentLink>
            </motion.div>

            <motion.p
              className="text-muted-foreground text-sm flex flex-wrap items-center gap-x-2 gap-y-1"
              variants={heroItemVariants}
            >
              <AnimatedLink href="#projects">Work</AnimatedLink>
              <span className="text-border">·</span>
              <AnimatedLink href="#resume">Resume</AnimatedLink>
              <span className="text-border">·</span>
              <AnimatedLink href="https://github.com/maxwellyoung" external>GitHub</AnimatedLink>
              <span className="text-border">·</span>
              <AnimatedLink href="https://linkedin.com/in/maxwell-young-a55032125" external>LinkedIn</AnimatedLink>
            </motion.p>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <motion.div
              className="w-px h-8 bg-current"
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.8, duration: 0.6, ease: "easeOut" }}
            />
          </motion.div>
        </motion.section>

        <section id="projects">
          <ProjectsShowcase />
        </section>

        {/* Blog temporarily hidden */}
        <section id="resume">
          <Resume />
        </section>

        <footer className="mt-16 pt-8 border-t border-[hsl(var(--border))]">
          {/* Contact Form */}
          <div className="mb-12">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Get in touch
            </h2>
            <ContactForm />
          </div>

          {/* Activity widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <GitHubActivity />
            <NowPlaying />
          </div>

          {/* FAC-style catalog footer */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                <div className="w-1 h-4 bg-accent" />
                <div className="w-1 h-4 bg-[hsl(210_80%_55%)]" />
                <div className="w-1 h-4 bg-foreground/30" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/60 uppercase">
                MY·25
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                <AnimatedLink href="https://www.ninetynine.digital" external>
                  ninetynine.digital
                </AnimatedLink>
                {" "}— software that earns its place on your screen.
              </p>
              <p className="text-xs text-muted-foreground/40 hidden sm:block font-mono">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-20 md:bottom-24 right-6 z-50 p-3 rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-muted-foreground hover:text-foreground hover:border-accent/50 shadow-lg transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label="Back to top"
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
