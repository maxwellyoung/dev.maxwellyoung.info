import { ExternalLink } from "lucide-react";

const references = [
  {
    title: "Building Glass for the Web",
    source: "Aave Design",
    href: "https://aave.com/design/building-glass-for-the-web",
    note: "A useful breakdown of turning a tactile glass material into a browser-tested component family.",
    takeaways: [
      "Material effects need browser proof before they become product language.",
      "The best polish is tied to component behavior, not decoration.",
      "Performance details are part of the design system.",
    ],
  },
];

export function CraftReferences() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-medium mb-2">References</h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
          External design engineering notes worth keeping close.
        </p>
      </div>

      <ul className="divide-y divide-[hsl(var(--border))]/50 border-t border-[hsl(var(--border))]/50">
        {references.map((reference) => (
          <li key={reference.href} className="py-5">
            <a
              href={reference.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {reference.source}
                  </p>
                  <h3 className="mt-2 text-base font-medium text-foreground transition-colors group-hover:text-accent">
                    {reference.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {reference.note}
                  </p>
                </div>
                <ExternalLink
                  className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent"
                  aria-hidden="true"
                />
              </div>

              <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                {reference.takeaways.map((takeaway) => (
                  <li
                    key={takeaway}
                    className="border-l border-[hsl(var(--border))] pl-3 leading-relaxed"
                  >
                    {takeaway}
                  </li>
                ))}
              </ul>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
