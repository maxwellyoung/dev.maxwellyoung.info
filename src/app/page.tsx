"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { ProjectsShowcase } from "./projects/page";
import { motion } from "framer-motion";
import { AnimatedLink } from "@/components/ui/animated-link";
import { GitHubActivity } from "@/components/GitHubActivity";
import { NowPlaying } from "@/components/NowPlaying";
import { container, item } from "@/lib/motion";
import { TrackedActionLink } from "@/components/TrackedActionLink";

export default function Home() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    requestAnimationFrame(() => {
      setTheme(mediaQuery.matches ? "dark" : "light");
    });
    const onChange = (e: MediaQueryListEvent) => setTheme(e.matches ? "dark" : "light");
    try {
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    } catch {
      // @ts-ignore Safari <14 fallback
      mediaQuery.addListener(onChange);
      // @ts-ignore
      return () => mediaQuery.removeListener(onChange);
    }
  }, [setTheme]);

  return (
    <div className="min-h-screen text-foreground p-4 md:p-8 overflow-x-hidden">
      <main className="w-full max-w-2xl mx-auto overflow-x-hidden">
        <motion.section
          className="flex flex-col justify-center items-start min-h-[70vh] space-y-8 p-4 md:p-8"
          variants={container.hero}
          initial="hidden"
          animate="visible"
        >
          <motion.header className="w-full" variants={item.fadeUp}>
            <h1 className="text-xl text-foreground font-medium">Maxwell Young</h1>
            <p className="text-xl font-light text-muted-foreground tracking-tight leading-tight">
              Design Engineer
            </p>
          </motion.header>

          <div className="leading-relaxed space-y-4">
            <motion.p className="text-foreground" variants={item.fadeUp}>
              Design Engineer at{" "}
              <AnimatedLink href="https://www.silk.cx" external>Silk</AnimatedLink>
              . I run{" "}
              <TrackedActionLink
                href="https://www.ninetynine.digital?utm_source=dev.maxwellyoung.info&utm_medium=referral&utm_campaign=ecosystem_body"
                external
                eventName="ninetynine_outbound_clicked"
                eventProps={{ placement: "bio", source: "devfolio" }}
                className="relative inline-block text-muted-foreground transition-colors duration-150 underline decoration-muted-foreground/30 underline-offset-2 hover:text-foreground hover:decoration-accent/60"
              >
                ninetynine digital
              </TrackedActionLink>
              , where I&rsquo;m building{" "}
              <AnimatedLink href="https://liner.ninetynine.digital" external>Liner</AnimatedLink>
              . Music as{" "}
              <AnimatedLink href="https://music.maxwellyoung.info" external>Maxwell Young</AnimatedLink>
              .
            </motion.p>

            <motion.nav
              className="text-muted-foreground text-xs flex flex-wrap items-center gap-x-2 gap-y-1"
              variants={item.fadeUp}
              aria-label="Primary navigation"
            >
              <AnimatedLink href="#projects" className="text-muted-foreground hover:text-foreground">Work</AnimatedLink>
              <span className="text-border/40">·</span>
              <AnimatedLink href="/resume" className="text-muted-foreground hover:text-foreground">Resume</AnimatedLink>
              <span className="text-border/40">·</span>
              <AnimatedLink href="/contact" className="text-muted-foreground hover:text-foreground">Contact</AnimatedLink>
              <span className="text-border/40">·</span>
              <AnimatedLink href="https://github.com/maxwellyoung" external className="text-muted-foreground hover:text-foreground">GitHub</AnimatedLink>
            </motion.nav>
          </div>
        </motion.section>

        <section id="projects">
          <ProjectsShowcase embedded />
        </section>

        <footer className="mt-16 pt-8 border-t border-[hsl(var(--border))]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <GitHubActivity />
            <NowPlaying />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              <TrackedActionLink
                href="https://www.ninetynine.digital?utm_source=dev.maxwellyoung.info&utm_medium=referral&utm_campaign=ecosystem_footer"
                external
                eventName="ninetynine_outbound_clicked"
                eventProps={{ placement: "home_footer", source: "devfolio" }}
                className="relative inline-block text-muted-foreground transition-colors duration-150 underline decoration-muted-foreground/30 underline-offset-2 hover:text-foreground hover:decoration-accent/60"
              >
                ninetynine.digital
              </TrackedActionLink>
              {" "}&mdash; independent studio
            </p>
            <div className="flex items-center gap-4">
              <AnimatedLink href="/contact" className="text-xs text-muted-foreground hover:text-foreground">
                Contact
              </AnimatedLink>
              <AnimatedLink href="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
                Privacy
              </AnimatedLink>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
