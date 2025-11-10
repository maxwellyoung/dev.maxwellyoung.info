"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Resume from "./resume/page";
import ProjectsShowcase from "./projects/page";
import { motion, AnimatePresence } from "framer-motion";
import FallingStars from "@/components/FallingStars";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const { setTheme } = useTheme();

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

  return (
    <div className="min-h-screen text-zinc-900 dark:text-white p-4 md:p-8 flex flex-col justify-between overflow-x-hidden">
      <main className="w-full max-w-full md:max-w-2xl mx-auto space-y-8 overflow-y-auto scroll-smooth overflow-x-hidden">
        <section className="flex flex-col justify-center items-start min-h-screen space-y-8 p-4 md:p-8">
          <header className="mb-12">
            <Link
              href="/"
              className="text-xl glint text-zinc-800 dark:text-zinc-200 font-medium cursor-pointer"
              onClick={() => setShowStars(true)}
            >
              Maxwell Young
            </Link>

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
                className="block text-xl font-light text-zinc-500 dark:text-zinc-400 tracking-tight leading-tight absolute inset-0 whitespace-nowrap"
                variants={titleVariants}
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
                transition={{ duration: 0.3 }}
              >
                Design Engineer · Founder,{" "}
                <a
                  href="https://www.ninetynine.digital"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 hover:dark:text-zinc-300 relative z-10 pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  ninetynine.digital
                </a>
              </motion.p>
              <motion.p
                className="block text-xl font-light text-zinc-500 dark:text-zinc-400 absolute inset-0 whitespace-nowrap"
                variants={subtitleVariants}
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
                transition={{ duration: 0.3 }}
              >
                Designing and building digital tools
              </motion.p>
            </div>
          </header>

          <div className="leading-relaxed space-y-4">
            <p className="text-zinc-500 dark:text-zinc-400">
            Maxwell Young is a product-focused design engineer based in Auckland, New Zealand. He creates digital products for creative professionals, ecommerce, and everyday use, combining design sensitivity with technical depth.
            </p>

            <p className="text-zinc-500 dark:text-zinc-400">
              He also contributes to applied research at AUT, developing an AI-driven sleep monitoring app that merges deep learning, behavioural data, and intuitive mobile design, each designed to feel purposeful, unobtrusive, and built to endure.
            </p>

            <p className="text-zinc-500 dark:text-zinc-400">
              He is currently a Design Engineer at{" "}
              <a
                href="https://www.silk.cx"
                target="_blank"
                rel="noreferrer"
                className="underline text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 hover:dark:text-zinc-300"
              >
                Silk
              </a>
              , where he designs and builds the core product across web and mobile for a
              platform that archives and reimagines culture online.
            </p>

            <p className="text-zinc-500 dark:text-zinc-400">
              Educated in Computer Science at Auckland University of Technology
              (Software Development &amp; Data Science), he has worked as a UI Developer at
              Spark New Zealand and is a graduate of the Web Development Bootcamp at
              Dev Academy Aotearoa.
            </p>

            <p className="text-zinc-500 dark:text-zinc-400">
              <Link
                href="#projects"
                className="underline text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 hover:dark:text-zinc-300"
              >
                Work
              </Link>{" "}
              ·{" "}
              <Link
                href="#resume"
                className="underline text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 hover:dark:text-zinc-300"
              >
                Resume
              </Link>{" "}
              ·{" "}
              <a
                href="https://www.ninetynine.digital"
                target="_blank"
                rel="noreferrer"
                className="underline text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 hover:dark:text-zinc-300"
              >
                ninetynine.digital
              </a>{" "}
              ·{" "}
              <a
                href="https://github.com/maxwellyoung"
                target="_blank"
                rel="noreferrer"
                className="underline text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 hover:dark:text-zinc-300"
              >
                GitHub
              </a>
            </p>
          </div>
        </section>

        <section id="projects">
          <ProjectsShowcase />
        </section>

        {/* Blog temporarily hidden */}
        <section id="resume">
          <Resume />
        </section>

        <footer className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            <a
              href="https://www.ninetynine.digital"
              target="_blank"
              rel="noreferrer"
              className="underline text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 hover:dark:text-zinc-300"
            >
              ninetynine.digital
            </a>{" "}
            — independent studio crafting enduring digital products.
          </p>
        </footer>
      </main>

      <AnimatePresence>
        {showStars && <FallingStars onComplete={() => setShowStars(false)} />}
      </AnimatePresence>
    </div>
  );
}
