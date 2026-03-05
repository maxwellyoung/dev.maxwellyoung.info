import { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { TrackedActionLink } from "@/components/TrackedActionLink";

export const metadata: Metadata = {
  title: "Work With Me | Maxwell Young",
  description:
    "Product-focused design engineering sprints for teams that need measurable UX and performance outcomes.",
};

export default function WorkWithMePage() {
  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
      >
        ← Back
      </Link>

      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-medium tracking-tight">Work With Me</h1>
        <p className="text-muted-foreground leading-relaxed">
          I help teams ship high-quality product interfaces faster, with less
          design/engineering drift and clearer business outcomes.
        </p>
      </header>

      <section className="mb-10 rounded-xl border border-border bg-card/40 p-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Offer
        </p>
        <h2 className="text-xl font-medium mb-3">Design Engineering Sprint</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A focused 2-week sprint to improve one core user flow from UX,
          implementation, and performance angles.
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground mb-5">
          <li>• One high-impact flow audited and rebuilt end-to-end</li>
          <li>• Shippable UI with interaction polish and accessibility pass</li>
          <li>• Performance and conversion instrumentation included</li>
          <li>• Clear before/after summary with measurable changes</li>
        </ul>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full border border-border px-3 py-1">
            Timeline: 2 weeks
          </span>
          <span className="rounded-full border border-border px-3 py-1">
            Scope: One flow
          </span>
          <span className="rounded-full border border-border px-3 py-1">
            Price Floor: NZD $4,500
          </span>
        </div>
      </section>

      <section className="mb-10">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Good Fit
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li>• You already have users, but a key flow underperforms.</li>
          <li>• You need speed without sacrificing craft and quality.</li>
          <li>• You want measurable outcomes, not just visual refreshes.</li>
        </ul>
      </section>

      <section className="mb-10 rounded-xl border border-border p-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Call To Action
        </p>
        <h2 className="text-xl font-medium mb-3">Start with a project brief</h2>
        <p className="text-muted-foreground mb-5">
          Send your current flow, problem, and timeline. If it is a fit, I will
          reply with scope and next steps within 24 hours.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <TrackedActionLink
            href="mailto:maxwell@ninetynine.digital?subject=Design%20Engineering%20Sprint%20Inquiry"
            external
            eventName="work_with_me_primary_cta_clicked"
            eventProps={{ placement: "work_with_me_page", action: "email_brief" }}
            className="inline-flex items-center rounded-md bg-foreground text-background px-4 py-2 text-sm hover:opacity-90 transition-opacity"
          >
            Email Project Brief
          </TrackedActionLink>
          <TrackedActionLink
            href="/contact"
            eventName="work_with_me_secondary_cta_clicked"
            eventProps={{ placement: "work_with_me_page", action: "view_contact" }}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
          >
            Or use contact page
          </TrackedActionLink>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
