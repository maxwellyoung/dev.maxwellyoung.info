import { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { TrackedActionLink } from "@/components/TrackedActionLink";

export const metadata: Metadata = {
  title: "Design Engineering Checklist | Maxwell Young",
  description:
    "A practical checklist for shipping better product flows with fewer UX and implementation regressions.",
};

export default function DesignEngineeringChecklistPage() {
  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
      >
        ← Back
      </Link>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Free Resource
        </p>
        <h1 className="text-3xl font-medium tracking-tight mb-4">
          Design Engineering Checklist
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          A practical pre-ship checklist to reduce broken flows, layout drift,
          and avoidable regressions in production.
        </p>
      </header>

      <section className="mb-10 rounded-xl border border-border bg-card/40 p-6">
        <p className="text-sm font-medium text-foreground mb-3">
          What is included
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• UX clarity and state coverage checks</li>
          <li>• Accessibility checks for keyboard and screen readers</li>
          <li>• Performance and rendering checks</li>
          <li>• Analytics and conversion tracking checks</li>
          <li>• Launch and rollback readiness checks</li>
        </ul>
      </section>

      <section className="mb-10 rounded-xl border border-border p-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Download
        </p>
        <h2 className="text-xl font-medium mb-3">Get the checklist</h2>
        <p className="text-muted-foreground mb-5">
          Download the markdown version and adapt it to your workflow.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <TrackedActionLink
            href="/resources/design-engineering-checklist.md"
            eventName="lead_magnet_download_clicked"
            eventProps={{ resource: "design_engineering_checklist" }}
            className="inline-flex items-center rounded-md bg-foreground text-background px-4 py-2 text-sm hover:opacity-90 transition-opacity"
          >
            Download Checklist
          </TrackedActionLink>
          <TrackedActionLink
            href="/work-with-me"
            eventName="lead_magnet_secondary_cta_clicked"
            eventProps={{ target: "work_with_me" }}
            className="text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            Need hands-on implementation help?
          </TrackedActionLink>
        </div>
      </section>

      <section className="mb-10">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Want help applying this?
        </p>
        <p className="text-muted-foreground leading-relaxed mb-3">
          I run focused 2-week design engineering sprints for teams shipping
          important product flows.
        </p>
        <TrackedActionLink
          href="/work-with-me"
          eventName="lead_magnet_bottom_cta_clicked"
          eventProps={{ target: "work_with_me" }}
          className="underline underline-offset-2 hover:text-foreground transition-colors"
        >
          View Sprint Offer
        </TrackedActionLink>
      </section>

      <SiteFooter />
    </main>
  );
}
