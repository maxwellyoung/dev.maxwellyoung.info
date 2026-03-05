"use client";

import { CraftSection } from "@/components/craft/CraftSection";
import { SymbolCaution, SymbolEvidence, SymbolFeedback, SymbolPrinciple } from "@/components/craft/CraftSymbols";

const springRows = [
  {
    lane: "Micro",
    use: "Press states, icon toggles, inline affordances",
    value: "100–180ms",
  },
  {
    lane: "Interaction",
    use: "Tabs, menus, and in-card state transitions",
    value: "180–260ms",
  },
  {
    lane: "Structural",
    use: "Section reveals and panel-level context shifts",
    value: "260–380ms",
  },
];

const principles = [
  "Animate transform and opacity first; color and border only for feedback.",
  "Transitions are explicit per property. No transition-all in craft surfaces.",
  "Keyboard-triggered actions avoid decorative animation.",
  "Reduced motion collapses transform-heavy moments to opacity.",
];

export function MotionSpec() {
  return (
    <CraftSection
      id="motion-spec"
      title="Motion Spec"
      intent="A practical motion grammar for product interfaces. Motion explains state, not personality theater."
      constraint="Every interaction maps to one frequency lane."
      evidence="This section defines the lane policy now used across the page."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-xl border border-border/70 bg-card/60 p-5 space-y-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Live Study
          </p>
          <div className="grid gap-3">
            {springRows.map((row) => (
              <div
                key={row.lane}
                className="rounded-lg border border-border/70 bg-background/70 px-4 py-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-foreground inline-flex items-center gap-2">
                    <SymbolFeedback className="text-accent" />
                    {row.lane}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">{row.value}</p>
                </div>
                <p className="text-sm text-muted-foreground mt-1.5">{row.use}</p>
              </div>
            ))}
          </div>
        </article>

        <div className="space-y-4">
          <article className="rounded-xl border border-border/70 bg-card/60 p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Evidence Block
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed inline-flex gap-2">
              <SymbolEvidence className="text-accent mt-0.5" />
              The previous implementation mixed cinematic and utility timing.
              Lane boundaries now separate feedback from structural movement.
            </p>
          </article>

          <article className="rounded-xl border border-border/70 bg-card/60 p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Reflection Block
            </p>
            <ul className="space-y-2">
              {principles.map((rule) => (
                <li key={rule} className="text-sm text-muted-foreground inline-flex gap-2">
                  <SymbolPrinciple className="text-accent mt-0.5 shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground inline-flex items-center gap-2">
              <SymbolCaution className="text-accent" />
              Reduced motion is mandatory and verified for all interaction studies.
            </p>
          </article>
        </div>
      </div>
    </CraftSection>
  );
}
