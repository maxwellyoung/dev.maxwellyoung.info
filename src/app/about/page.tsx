import { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { AnimatedLink } from "@/components/ui/animated-link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Design engineer based in Auckland, NZ. Currently at Silk, previously Spark New Zealand. B.Sc. Computer & Information Sciences at AUT.",
  openGraph: {
    title: "About | Maxwell Young",
    description:
      "Design engineer based in Auckland, NZ. Currently at Silk, previously Spark New Zealand.",
    images: [
      {
        url: "/meta.png",
        width: 1200,
        height: 630,
        alt: "Maxwell Young - Design Engineer",
      },
    ],
  },
  alternates: {
    canonical: "https://dev.maxwellyoung.info/about",
  },
};

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-6 py-16 space-y-12">
        <header>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            &larr; Back
          </Link>
          <h1 className="text-3xl font-medium mt-8 mb-4">About</h1>
        </header>

        <section className="space-y-4 leading-relaxed text-muted-foreground">
          <p>
            I&apos;m Maxwell Young, a design engineer based in Auckland, New
            Zealand. I work at{" "}
            <AnimatedLink href="https://www.silk.cx" external>Silk</AnimatedLink>
            , leading day-to-day mobile implementation and release hardening
            across iOS and Android.
          </p>

          <p>
            On the side I run{" "}
            <AnimatedLink href="https://www.ninetynine.digital" external>ninetynine.digital</AnimatedLink>
            , a one-person studio for independent apps and client work. I also
            release music as{" "}
            <AnimatedLink href="https://music.maxwellyoung.info" external>Maxwell Young</AnimatedLink>
            .
          </p>

          <p>
            I&apos;m most useful where interaction design and implementation
            need to stay close together: shaping the model, building the
            interface, and verifying the result on real devices. My public work
            spans mobile product leadership, shipped iOS products, production React Native systems,
            research tooling, developer tools, and image-led client sites.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">How I work</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            I prefer narrow, observable product loops over presentation-only
            prototypes. That means explicit interaction states, accessible
            defaults, performance checks, and enough instrumentation or
            regression coverage to know whether a change actually held up.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The strongest examples are in{" "}
            <AnimatedLink href="/#projects">selected work</AnimatedLink> and the{" "}
            <AnimatedLink href="/resume">resume</AnimatedLink>; experimental
            motion and interface studies live in the{" "}
            <AnimatedLink href="/craft">lab</AnimatedLink>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Experience</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">
                Mobile Design Engineer
              </span>{" "}
              at Silk (Sep 2025 &ndash; Present; mobile implementation lead)
            </li>
            <li>
              <span className="text-foreground font-medium">
                Software Research Assistant
              </span>{" "}
              at University of Auckland (Apr 2026 &ndash; Present, funded safer-medicines research)
            </li>
            <li>
              <span className="text-foreground font-medium">
                Software Research Assistant
              </span>{" "}
              at Auckland University of Technology (Nov 2025 &ndash; Jan 2026, funded sleep research)
            </li>
            <li>
              <span className="text-foreground font-medium">
                Design Engineer
              </span>{" "}
              at ninetynine.digital (Apr 2023 &ndash; Present)
            </li>
            <li>
              <span className="text-foreground font-medium">
                Data Intelligence UI Developer
              </span>{" "}
              at Spark New Zealand (Nov 2022 &ndash; Apr 2023)
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Education</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">
                B.Sc. Computer &amp; Information Sciences
              </span>{" "}
              &mdash; Auckland University of Technology (2024 &ndash; Expected 2026)
            </li>
            <li>
              <span className="text-foreground font-medium">
                Certificate in Web Development (Level 6)
              </span>{" "}
              &mdash; Dev Academy Aotearoa (2022)
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Contact</h2>
          <p className="text-sm">
            <AnimatedLink href="mailto:maxwell@ninetynine.digital" external className="inline-flex min-h-11 items-center">
              maxwell@ninetynine.digital
            </AnimatedLink>
          </p>
          <div className="flex gap-4 text-sm">
            <AnimatedLink href="https://github.com/maxwellyoung" external className="inline-flex min-h-11 items-center">
              GitHub
            </AnimatedLink>
            <AnimatedLink href="https://www.linkedin.com/in/maxwell-young-a55032125/" external className="inline-flex min-h-11 items-center">
              LinkedIn
            </AnimatedLink>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Explore</h2>
          <div className="flex flex-wrap gap-4 text-sm">
            <AnimatedLink href="/#projects" className="inline-flex min-h-11 items-center">Projects</AnimatedLink>
            <AnimatedLink href="/craft" className="inline-flex min-h-11 items-center">Craft</AnimatedLink>
            <AnimatedLink href="/resume" className="inline-flex min-h-11 items-center">Resume</AnimatedLink>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
