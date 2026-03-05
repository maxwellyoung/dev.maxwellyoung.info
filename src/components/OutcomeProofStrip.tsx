"use client";

import { caseStudies } from "@/lib/caseStudies";
import { TrackedActionLink } from "@/components/TrackedActionLink";

const featuredSlugs = ["spark", "vape-quit-coach", "whakapapa"];

export function OutcomeProofStrip() {
  const studies = featuredSlugs
    .map((slug) => caseStudies[slug])
    .filter((study) => study?.metrics && study.metrics.length > 0);

  if (studies.length === 0) return null;

  return (
    <section aria-label="Selected outcomes" className="pt-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
        Selected Outcomes
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {studies.map((study) => (
          <TrackedActionLink
            key={study.slug}
            href={`/case-study/${study.slug}`}
            eventName="home_proof_card_clicked"
            eventProps={{ slug: study.slug }}
            className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/40 p-3 hover:border-accent/40 transition-colors"
          >
            <p className="text-xs text-muted-foreground mb-1">{study.title}</p>
            <p className="text-sm font-medium text-foreground">
              {study.metrics?.[0]?.value}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {study.metrics?.[0]?.label}
            </p>
          </TrackedActionLink>
        ))}
      </div>
    </section>
  );
}
