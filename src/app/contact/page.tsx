import { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { TrackedActionLink } from "@/components/TrackedActionLink";

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
        className="mb-8 inline-flex min-h-11 items-center rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        ← Back
      </Link>

      <h1 className="text-2xl font-medium mb-6">Contact</h1>

      <div className="space-y-8 text-muted-foreground">
        <p className="leading-relaxed">
          For roles, projects, or collaborations, email is best.
        </p>

        <div>
          <h2 className="text-sm font-medium text-foreground mb-2">Email</h2>
          <TrackedActionLink
            href="mailto:maxwell@ninetynine.digital?subject=Project%20Inquiry"
            external
            eventName="contact_primary_cta_clicked"
            eventProps={{ target: "email" }}
            className="inline-flex min-h-11 items-center underline underline-offset-2 hover:text-foreground transition-colors"
          >
            maxwell@ninetynine.digital
          </TrackedActionLink>
        </div>

        <div>
          <h2 className="text-sm font-medium text-foreground mb-2">Elsewhere</h2>
          <ul className="space-y-1">
            <li>
              <a
                href="https://github.com/maxwellyoung"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center underline underline-offset-2 hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/maxwell-young-a55032125/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center underline underline-offset-2 hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-medium text-foreground mb-2">Location</h2>
          <p>Auckland, New Zealand &mdash; NZST (UTC+12)</p>
        </div>

        <p className="text-sm">
          More context on{" "}
          <Link
            href="/about"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            about
          </Link>
          {" "}or{" "}
          <Link
            href="/#projects"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            work
          </Link>
          .
        </p>
      </div>

      <SiteFooter />
    </main>
  );
}
