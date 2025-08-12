import type { Project } from "@/lib/awardsTypes";

type ShelfProps = {
  label: string;
  items: Project[];
};

function Shelf({ label, items }: ShelfProps) {
  if (!items.length) return null;
  return (
    <section className="py-8">
      <div className="mb-3 text-sm tracking-[0.08em] text-muted">{label}</div>
      <div className="flex gap-6 overflow-x-auto snap-x">
        {items.map((p) => (
          <a
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="min-w-[320px] snap-start group"
          >
            <figure className="relative aspect-[4/3] overflow-hidden rounded-md">
              {p.thumb || p.screenshots?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={(p.thumb || p.screenshots?.[0]) as string}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-150 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.02]"
                />
              ) : null}
            </figure>
            <figcaption className="mt-3">
              <div className="font-medium">
                <span className="project-link">{p.name}</span>
              </div>
              <div className="text-sm text-muted line-clamp-2">
                {p.description}
              </div>
              <div className="mt-2 flex gap-3 text-xs text-muted">
                {p.role && <span>{p.role}</span>}
                {p.startDate && (
                  <span>· {new Date(p.startDate).getFullYear()}</span>
                )}
              </div>
            </figcaption>
          </a>
        ))}
      </div>
    </section>
  );
}

type FeaturedShelvesProps = {
  source: Project[];
};

export function FeaturedShelves({ source }: FeaturedShelvesProps) {
  const groups = [
    { label: "Flagships", filter: (p: Project) => !!p.featured },
    {
      label: "AI / Data",
      filter: (p: Project) =>
        p.tags?.includes("AI") || p.tags?.includes("Scraping"),
    },
    {
      label: "Fashion / Brand",
      filter: (p: Project) =>
        p.tags?.includes("Brand") ||
        (p.client || "").includes("Fashion") ||
        ["TYTM8", "Goodness"].some((n) => p.name.includes(n)),
    },
    {
      label: "Art & Experiments",
      filter: (p: Project) =>
        p.category === "Experiment" ||
        p.name.includes("Jeremy") ||
        p.name.includes("Metrosexual"),
    },
    {
      label: "Platform / CMS",
      filter: (p: Project) =>
        p.tags?.includes("CMS") ||
        ["Strawhouse", "Dayle", "Ivan"].some((n) => p.name.includes(n)),
    },
  ];

  return (
    <div>
      {groups.map((g) => (
        <Shelf key={g.label} label={g.label} items={source.filter(g.filter)} />
      ))}
    </div>
  );
}
