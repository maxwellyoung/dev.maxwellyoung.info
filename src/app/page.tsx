"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Resume from "./resume/page";
import ProjectsShowcase from "./projects/page";
import { motion, AnimatePresence } from "framer-motion";
import FallingStars from "@/components/FallingStars";
// import { BlogLayoutComponent } from "@/components/blog-layout";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Set theme based on system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(mediaQuery.matches ? "dark" : "light");

    // Listen for changes in system preference
    const listener = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };
    mediaQuery.addListener(listener);

    return () => mediaQuery.removeListener(listener);
  }, [setTheme]);

  const titleVariants = {
    initial: { opacity: 1, y: 0 },
    hover: { opacity: 0, y: -20 },
  };

  const subtitleVariants = {
    initial: { opacity: 0, y: 20 },
    hover: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen text-zinc-900 dark:text-white p-4 md:p-8 flex flex-col justify-between">
      <main className="max-w-2xl mx-auto space-y-8 overflow-y-auto scroll-smooth">
        <section className="flex flex-col justify-center items-start min-h-screen space-y-8 p-4 md:p-8">
          <header className="mb-12">
            <a
              href="/"
              className="text-xl glint text-zinc-800 dark:text-zinc-200 font-medium cursor-pointer"
              onClick={() => setShowStars(true)}
            >
              Maxwell Young
            </a>
            <div
              className="relative h-8"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.p
                className="text-xl font-light text-zinc-500 dark:text-zinc-400 absolute whitespace-nowrap"
                variants={titleVariants}
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
                transition={{ duration: 0.3 }}
              >
                Design Engineer
              </motion.p>
              <motion.p
                className="text-xl font-light text-zinc-500 dark:text-zinc-400 absolute whitespace-nowrap"
                variants={subtitleVariants}
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
                transition={{ duration: 0.3 }}
              >
                Ideation to Implementation
              </motion.p>
            </div>
          </header>

          <div className="leading-relaxed space-y-4">
            <p className="text-zinc-500 dark:text-zinc-400">
              Maxwell Young is a product-focused design engineer based in
              Auckland, New Zealand. He creates digital products for creative
              professionals, ecommerce, and everyday use, combining design
              sensitivity with technical depth. Each is shaped to feel
              purposeful, unobtrusive, and built to endure.
            </p>
            <p className="text-zinc-500 dark:text-zinc-400">
              Educated in Computer Science at Auckland University of Technology,
              majoring in Software Development and Data Science, he has worked
              as a UI Developer at Spark New Zealand and is a graduate of the
              Web Development Bootcamp at Dev Academy Aotearoa.
            </p>
            <p className="text-zinc-500 dark:text-zinc-400">
              <Link
                href="#projects"
                className="underline hover:text-zinc-800 hover:dark:text-zinc-300"
              >
                Work
              </Link>{" "}
              ·{" "}
              <Link
                href="#resume"
                className="underline hover:text-zinc-800 hover:dark:text-zinc-300"
              >
                Resume
              </Link>{" "}
              ·{" "}
              <Link
                href="https://github.com/maxwellyoung"
                target="_blank"
                className="underline hover:text-zinc-800 hover:dark:text-zinc-300"
              >
                GitHub
              </Link>
            </p>
          </div>
        </section>
        <section id="projects">
          <ProjectsShowcase />
        </section>
        {/** Blog temporarily hidden */}
        <section id="resume">
          <Resume />
        </section>
      </main>
      <AnimatePresence>
        {showStars && <FallingStars onComplete={() => setShowStars(false)} />}
      </AnimatePresence>
    </div>
  );
}
