"use client";

import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { motion } from "framer-motion";
import { AnimatedLink } from "@/components/ui/animated-link";
import { CurrentlyInto } from "@/components/CurrentlyInto";
import { container, item } from "@/lib/motion";
import { TrackedActionLink } from "@/components/TrackedActionLink";
import { CompanyLogoStudy } from "@/components/CompanyLogoStudy";
import { OpenSourceProof } from "@/components/OpenSourceProof";
import { BossKeyTrigger } from "@/components/boss-key/BossKeyTrigger";
import { InteractionStudies } from "@/components/craft/InteractionStudies";

export default function Home() {
  return (
    <div className="min-h-screen text-foreground p-4 md:p-8 overflow-x-hidden">
      <main id="main-content" className="w-full max-w-2xl mx-auto overflow-x-hidden">
        <motion.section
          className="flex flex-col items-start space-y-6 px-4 py-12 md:space-y-8 md:px-8 md:py-16"
          variants={container.hero}
          initial={false}
          animate="visible"
        >
          <motion.header className="w-full" variants={item.fadeUp}>
            <h1 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              Maxwell Young
            </h1>
            <p className="mt-1 max-w-xl text-lg font-light leading-snug tracking-tight text-muted-foreground md:text-xl">
              Product engineer and designer.
            </p>
          </motion.header>

          <div className="leading-relaxed space-y-3">
            <motion.p
              className="max-w-xl text-foreground"
              variants={item.fadeUp}
            >
              I design and build web, mobile, and backend software. At{" "}
              <AnimatedLink href="https://www.silk.cx" external>Silk</AnimatedLink>{" "}
              I lead the React Native app across iOS and Android, from the
              first build through launch and ongoing releases. I design and build
              research applications end to end at the University of Auckland,
              alongside independent apps and client work through{" "}
              <TrackedActionLink
                href="https://www.ninetynine.digital?utm_source=dev.maxwellyoung.info&utm_medium=referral&utm_campaign=ecosystem_body"
                external
                eventName="ninetynine_outbound_clicked"
                eventProps={{ placement: "bio", source: "devfolio" }}
                className="relative inline-block text-muted-foreground transition-colors duration-150 underline decoration-muted-foreground/30 underline-offset-2 hover:text-foreground hover:decoration-accent/60"
              >
                ninetynine digital
              </TrackedActionLink>
              .
            </motion.p>


            <motion.nav
              className="flex flex-wrap items-center gap-x-5 gap-y-0 text-sm text-muted-foreground"
              variants={item.fadeUp}
              aria-label="Primary navigation"
            >
              <AnimatedLink href="#projects" className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground">Work</AnimatedLink>
              <AnimatedLink href="/craft" className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground">Craft</AnimatedLink>
              <AnimatedLink href="/resume" className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground">Resume</AnimatedLink>
              <AnimatedLink href="/contact" className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground">Contact</AnimatedLink>
            </motion.nav>
            <motion.nav
              className="flex flex-wrap items-center gap-x-5 text-xs text-muted-foreground"
              variants={item.fadeUp}
              aria-label="More links"
            >
              <AnimatedLink href="/apps" className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground">Apps</AnimatedLink>
              <AnimatedLink href="https://github.com/maxwellyoung" external className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground">GitHub</AnimatedLink>
              <AnimatedLink href="/os" className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground">Maxwell OS</AnimatedLink>
            </motion.nav>
          </div>
        </motion.section>

        <div className="px-4 pb-8 md:px-8">
          <InteractionStudies compact />
        </div>

        <section id="projects">
          <ProjectsShowcase
            embedded
            afterSelectedWork={<CompanyLogoStudy />}
          />
        </section>

        <OpenSourceProof />

        <footer className="mt-16 border-t border-[hsl(var(--border))] pt-8">
          <div className="mb-8">
            <CurrentlyInto />
          </div>

          <div className="flex flex-col gap-4 border-t border-border/50 pt-5 sm:flex-row sm:items-center sm:justify-between">
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
            <div className="flex items-center gap-2">
              <BossKeyTrigger />
              <AnimatedLink href="/contact" className="inline-flex min-h-11 items-center rounded-sm px-2 text-sm text-muted-foreground hover:bg-muted/30 hover:text-foreground">
                Contact
              </AnimatedLink>
              <AnimatedLink href="/privacy" className="inline-flex min-h-11 items-center rounded-sm px-2 text-sm text-muted-foreground hover:bg-muted/30 hover:text-foreground">
                Privacy
              </AnimatedLink>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
