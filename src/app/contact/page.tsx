import { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Contact Maxwell Young | Design Engineer",
  description:
    "Get in touch with Maxwell Young - Design Engineer based in Auckland, New Zealand. Available for frontend, mobile, and full-stack roles.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
      >
        ← Back
      </Link>

      <h1 className="text-2xl font-medium mb-6">Contact</h1>

      <div className="space-y-6 text-muted-foreground">
        <p className="leading-relaxed">
          I build interfaces that feel considered, not clever. If you have a project that
          needs a design engineer who cares about the details people feel but can&apos;t
          name, I&apos;d like to hear about it.
        </p>

        <div>
          <h2 className="text-sm font-medium text-foreground mb-2">Email</h2>
          <p className="mb-2">
            The fastest way to reach me. I respond to genuine inquiries within a day.
          </p>
          <a
            href="mailto:maxwell@ninetynine.digital"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            maxwell@ninetynine.digital
          </a>
        </div>

        <div>
          <h2 className="text-sm font-medium text-foreground mb-2">Social</h2>
          <ul className="space-y-1">
            <li>
              <a
                href="https://github.com/maxwellyoung"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                GitHub — open source work and side projects
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/maxwell-young-a55032125/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                LinkedIn — professional background
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-medium text-foreground mb-2">Location</h2>
          <p>Auckland, New Zealand (NZST, UTC+12)</p>
        </div>

        <div>
          <h2 className="text-sm font-medium text-foreground mb-2">What I work on</h2>
          <p className="leading-relaxed mb-3">
            Currently a mobile design engineer at{" "}
            <a
              href="https://www.silk.cx"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Silk
            </a>
            , building React Native interfaces for a social platform. I also run{" "}
            <a
              href="https://www.ninetynine.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              ninetynine.digital
            </a>
            , where I design and build products for clients in fashion, art, and tech.
          </p>
          <p className="leading-relaxed">
            Open to frontend, mobile, and full-stack roles in Auckland or remote.
            Strongest with React, React Native, TypeScript, and Next.js. I care about
            performance, accessibility, and motion design. View my{" "}
            <Link
              href="/projects"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              project portfolio
            </Link>{" "}
            or read my{" "}
            <Link
              href="/about"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              full background
            </Link>.
          </p>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
