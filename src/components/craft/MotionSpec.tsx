const springRows = [
  { name: "snappy", use: "buttons, toggles, immediate feedback", value: "stiffness 500 / damping 35" },
  { name: "default", use: "general UI state transitions", value: "stiffness 300 / damping 30" },
  { name: "gentle", use: "content reveal, structural transitions", value: "stiffness 170 / damping 26" },
  { name: "soft", use: "large movement, modal context shifts", value: "stiffness 120 / damping 20" },
];

const timingRows = [
  { tier: "Feedback", range: "100-180ms", examples: "press states, icon state changes" },
  { tier: "State change", range: "220-320ms", examples: "panel expand/collapse, route transitions" },
  { tier: "Context shift", range: "350-500ms", examples: "modal enters, large layout shifts" },
];

export function MotionSpec() {
  return (
    <section className="space-y-10">
      <div>
        <h2 className="text-xl font-medium mb-2">Motion Spec</h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
          The motion grammar used across production surfaces. Design constraints,
          not flourishes.
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Spring presets</p>
        <ul className="divide-y divide-[hsl(var(--border))]/50">
          {springRows.map((row) => (
            <li key={row.name} className="py-3 flex items-baseline justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">{row.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{row.use}</p>
              </div>
              <p className="text-xs text-muted-foreground font-mono shrink-0">{row.value}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Timing tiers</p>
        <ul className="divide-y divide-[hsl(var(--border))]/50">
          {timingRows.map((row) => (
            <li key={row.tier} className="py-3 flex items-baseline justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">{row.tier}</p>
                <p className="text-sm text-muted-foreground mt-1">{row.examples}</p>
              </div>
              <p className="text-xs text-muted-foreground font-mono shrink-0">{row.range}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Reduced motion</p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
          If reduced motion is enabled, transitions become opacity-first with duration collapse.
          No drag-dependent interactions are required to complete core flows.
        </p>
      </div>
    </section>
  );
}
