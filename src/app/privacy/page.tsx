import { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | Maxwell Young Portfolio",
  description:
    "Privacy policy for dev.maxwellyoung.info. Learn about what anonymous data is collected and how it is used on this portfolio site.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <Link
        href="/"
        className="mb-8 inline-flex min-h-11 items-center rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        ← Back
      </Link>

      <h1 className="text-2xl font-medium mb-6">Privacy Policy</h1>

      <div className="prose prose-sm prose-invert max-w-none space-y-4 text-muted-foreground">
        <p>
          This site collects anonymous analytics via{" "}
          <a
            href="https://posthog.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-2"
          >
            PostHog
          </a>{" "}
          to understand how visitors use the site. No personal data is
          collected, stored, or shared.
        </p>

        <h2 className="text-lg font-medium text-foreground mt-6 mb-2">
          What data is collected
        </h2>
        <ul className="list-disc pl-4 space-y-1">
          <li>Page views and navigation patterns</li>
          <li>Device type and browser (anonymized)</li>
          <li>Approximate location (country level)</li>
        </ul>

        <h2 className="text-lg font-medium text-foreground mt-6 mb-2">
          What data is not collected
        </h2>
        <ul className="list-disc pl-4 space-y-1">
          <li>Personal information</li>
          <li>Email addresses</li>
          <li>IP addresses (anonymized)</li>
          <li>Cookies for tracking</li>
        </ul>

        <h2 className="text-lg font-medium text-foreground mt-6 mb-2">
          Contact
        </h2>
        <p>
          Questions about this policy? Email{" "}
          <a
            href="mailto:maxwell@ninetynine.digital"
            className="text-foreground underline underline-offset-2"
          >
            maxwell@ninetynine.digital
          </a>
        </p>

        <p className="text-xs text-muted-foreground mt-8">
          Last updated: February 2026
        </p>
      </div>

      <SiteFooter />
    </main>
  );
}
