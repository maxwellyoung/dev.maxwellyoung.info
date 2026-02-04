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
        <div>
          <h2 className="text-sm font-medium text-foreground mb-2">Email</h2>
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
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/maxwell-young-a55032125/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-medium text-foreground mb-2">Location</h2>
          <p>Auckland, New Zealand</p>
        </div>

        <p className="text-sm">
          Currently open to frontend, mobile, and full-stack roles in Auckland or remote.
        </p>
      </div>

      <SiteFooter />
    </main>
  );
}
