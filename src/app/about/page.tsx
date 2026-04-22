import { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { AnimatedLink } from "@/components/ui/animated-link";

export const metadata: Metadata = {
  title: "About | Maxwell Young",
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
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-6 py-16 space-y-12">
        <header>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
            , contributing to their iOS and Android apps in React Native.
          </p>

          <p>
            On the side I run{" "}
            <AnimatedLink href="https://www.ninetynine.digital" external>ninetynine.digital</AnimatedLink>
            , a one-person studio for independent apps and client work. I also
            release music as{" "}
            <AnimatedLink href="https://music.maxwellyoung.info" external>Maxwell Young</AnimatedLink>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Experience</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">
                Research Assistant
              </span>{" "}
              at University of Auckland (2026)
            </li>
            <li>
              <span className="text-foreground font-medium">
                Mobile Design Engineer
              </span>{" "}
              at Silk (Jun 2024 &ndash; Present)
            </li>
            <li>
              <span className="text-foreground font-medium">
                Research Assistant
              </span>{" "}
              at Auckland University of Technology (Jan &ndash; Mar 2025)
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
              &mdash; Auckland University of Technology (2024 &ndash; 2026)
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
            <AnimatedLink href="mailto:maxwell@ninetynine.digital" external>
              maxwell@ninetynine.digital
            </AnimatedLink>
          </p>
          <div className="flex gap-4 text-sm">
            <AnimatedLink href="https://github.com/maxwellyoung" external>
              GitHub
            </AnimatedLink>
            <AnimatedLink href="https://www.linkedin.com/in/maxwell-young-a55032125/" external>
              LinkedIn
            </AnimatedLink>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Explore</h2>
          <div className="flex flex-wrap gap-4 text-sm">
            <AnimatedLink href="/#projects">Projects</AnimatedLink>
            <AnimatedLink href="/craft">Craft</AnimatedLink>
            <AnimatedLink href="/resume">Resume</AnimatedLink>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
