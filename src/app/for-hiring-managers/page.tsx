import { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { TrackedActionLink } from "@/components/TrackedActionLink";

export const metadata: Metadata = {
  title: "For Hiring Managers | Maxwell Young",
  description:
    "Quick evaluation page for hiring managers: role fit, engineering strengths, and high-signal project evidence.",
};

const roleFit = [
  "Senior Frontend Engineer",
  "Design Engineer",
  "Product Engineer (Frontend/Mobile)",
  "Founding Engineer (Product-heavy)",
];

const strengths = [
  "Translates product intent to production-quality UI with clear interaction grammar.",
  "Strong React/React Native/TypeScript delivery under real constraints.",
  "Balances craft with speed: measurable outcomes, not just visual polish.",
  "Owns implementation detail: accessibility, performance, edge-state behavior.",
];

const evidence = [
  {
    title: "Spark Dashboard",
    metric: "Load times improved from 8-12s to under 2s",
    link: "/case-study/spark",
  },
  {
    title: "Vape Quit Coach",
    metric: "Shipped and maintained solo iOS product with 4.8 rating",
    link: "/case-study/vape-quit-coach",
  },
  {
    title: "Whakapapa",
    metric: "Built AI-assisted knowledge workflow with human-review trust model",
    link: "/case-study/whakapapa",
  },
  {
    title: "Liner",
    metric: "Implemented complex canvas interactions and real-time collaboration stack",
    link: "/case-study/liner",
  },
];

export default function HiringManagersPage() {
  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
      >
        ← Back
      </Link>

      <header className="mb-10 space-y-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          For Hiring Managers
        </p>
        <h1 className="text-3xl font-medium tracking-tight">
          Quick Evaluation Snapshot
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          This page is for fast recruiter and hiring-manager review: where I fit,
          how I work, and proof of execution quality.
        </p>
      </header>

      <section className="mb-10 rounded-xl border border-border bg-card/40 p-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
          Best Role Fit
        </p>
        <ul className="space-y-2 text-sm text-foreground">
          {roleFit.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-10 rounded-xl border border-border p-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
          Engineering Strengths
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {strengths.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-10 rounded-xl border border-border p-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
          High-Signal Evidence
        </p>
        <ul className="space-y-3">
          {evidence.map((item) => (
            <li key={item.title} className="text-sm">
              <TrackedActionLink
                href={item.link}
                eventName="hiring_manager_case_clicked"
                eventProps={{ case_study: item.title }}
                className="text-foreground underline underline-offset-2 hover:text-accent transition-colors"
              >
                {item.title}
              </TrackedActionLink>
              <p className="text-muted-foreground mt-1">{item.metric}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10 rounded-xl border border-border bg-card/40 p-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
          Contact For Hiring
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <TrackedActionLink
            href="mailto:maxwell@ninetynine.digital?subject=Hiring%20Conversation"
            external
            eventName="hiring_manager_cta_clicked"
            eventProps={{ target: "email" }}
            className="inline-flex items-center rounded-md bg-foreground text-background px-4 py-2 hover:opacity-90 transition-opacity"
          >
            Email Maxwell
          </TrackedActionLink>
          <TrackedActionLink
            href="/resume"
            eventName="hiring_manager_cta_clicked"
            eventProps={{ target: "resume" }}
            className="underline underline-offset-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            View resume
          </TrackedActionLink>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
