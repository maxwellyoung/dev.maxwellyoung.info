"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/awardsTypes";

type ShelfProps = {
  label: string;
  items: Project[];
};

function Shelf({ label, items }: ShelfProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? el.scrollLeft / max : 0;
      setProgress(p);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  if (!items.length) return null;
  return (
    <section className="py-8">
      <div className="mb-2 text-xs tracking-[0.12em] text-muted">{label}</div>
      <div className="relative">
        <div className="absolute left-0 right-0 -top-2 h-px bg-[var(--surface)]" aria-hidden />
        <div
          className="absolute left-0 -top-2 h-px bg-[var(--accent)] transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
          aria-hidden
        />
      </div>
      <div ref={scrollerRef} className="-mx-4 px-4 flex gap-6 overflow-x-auto snap-x scroll-px-4">
        {items.map((p) => (
          <a key={p.slug} href={`/projects/${p.slug}`} className="min-w-[320px] snap-start group">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-md border border-[var(--surface)]">
              {(p.thumb || p.screenshots?.[0]) && (
                <Image
                  src={(p.thumb || p.screenshots?.[0]) as string}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 80vw, 33vw"
                  className="object-cover transition-transform duration-150 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.02]"
                />
              )}
            </figure>
            <figcaption className="mt-3">
              <div className="font-medium leading-tight">
                <span className="project-link">{p.name}</span>
              </div>
              <div className="text-sm text-muted line-clamp-2">{p.description}</div>
              <div className="mt-2 flex gap-3 text-xs text-muted">
                {p.role && <span>{p.role}</span>}
                {p.startDate && <span>· {new Date(p.startDate).getFullYear()}</span>}
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
