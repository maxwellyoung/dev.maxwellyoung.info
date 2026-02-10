import { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About | Maxwell Young",
  description:
    "Design engineer based in Auckland, NZ. Currently at Silk, previously Spark New Zealand. B.Sc. Computer & Information Sciences at AUT. Building software that earns its place on your screen.",
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
            <a
              href="https://www.silk.cx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
            >
              Silk
            </a>{" "}
            as a mobile design engineer, building React Native interfaces for a
            blogging platform that rejects engagement metrics.
          </p>

          <p>
            I also run{" "}
            <a
              href="https://www.ninetynine.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
            >
              ninetynine.digital
            </a>
            , an independent studio where I design and build products for
            clients in fashion, food, and tech. Projects include portfolios for
            artists and stylists, consumer iOS apps, and creative web
            experiences.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Experience</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
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
          <h2 className="text-lg font-medium">Principles</h2>
          <ul className="space-y-1 text-sm text-muted-foreground border-l border-border pl-3">
            <li>No algorithmic feeds. No dark patterns. No engagement tricks.</li>
            <li>Fewer features, sharper tools.</li>
            <li>If the UI needs guilt to work, the design failed.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Contact</h2>
          <p className="text-sm text-muted-foreground">
            <a
              href="mailto:maxwell@ninetynine.digital"
              className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
            >
              maxwell@ninetynine.digital
            </a>
          </p>
          <div className="flex gap-4 text-sm">
            <a
              href="https://github.com/maxwellyoung"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/maxwell-young-a55032125/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Explore</h2>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href="/projects"
              className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border hover:decoration-foreground"
            >
              View projects
            </Link>
            <Link
              href="/craft"
              className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border hover:decoration-foreground"
            >
              Design craft & essays
            </Link>
            <Link
              href="/resume"
              className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border hover:decoration-foreground"
            >
              Resume
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
