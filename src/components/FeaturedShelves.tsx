"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";

type ShelfProps = {
  label: string;
  items: Project[];
  onSelect?: (project: Project) => void;
};

function Shelf({ label, items, onSelect }: ShelfProps) {
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
        <div
          className="absolute left-0 right-0 -top-2 h-px bg-[var(--surface)]"
          aria-hidden
        />
        <div
          className="absolute left-0 -top-2 h-px bg-[var(--accent)] transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
          aria-hidden
        />
      </div>
      <div
        ref={scrollerRef}
        className="px-2 sm:px-0 flex gap-6 overflow-x-auto snap-x scroll-px-4"
      >
        {items.map((p) =>
          onSelect ? (
            <button
              type="button"
              key={p.slug}
              onClick={() => onSelect(p)}
              className="min-w-[420px] snap-start group text-left"
            >
              <figure className="relative aspect-[4/3] overflow-hidden rounded-sm border border-[var(--surface)] transition-transform duration-150 ease-brand group-hover:-translate-y-[2px] group-hover:scale-[1.01]">
                <ImageWithFallback
                  src={(p.thumb || p.screenshots?.[0]) as string | undefined}
                  alt={p.name}
                />
              </figure>
              <figcaption className="mt-3">
                <div className="font-medium leading-tight text-text">
                  <span className="project-link">{p.name}</span>
                </div>
                <div className="mt-1 text-[13px] text-muted line-clamp-2">
                  {p.description}
                </div>
                <div className="mt-2 flex gap-3 text-[11px] text-muted">
                  {p.role && <span>{p.role}</span>}
                  {p.startDate && (
                    <span>· {new Date(p.startDate).getFullYear()}</span>
                  )}
                </div>
              </figcaption>
            </button>
          ) : (
            <a
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="min-w-[420px] snap-start group"
            >
              <figure className="relative aspect-[4/3] overflow-hidden rounded-sm border border-[var(--surface)] transition-transform duration-150 ease-brand group-hover:-translate-y-[2px] group-hover:scale-[1.01]">
                <ImageWithFallback
                  src={(p.thumb || p.screenshots?.[0]) as string | undefined}
                  alt={p.name}
                />
              </figure>
              <figcaption className="mt-3">
                <div className="font-medium leading-tight text-text">
                  <span className="project-link">{p.name}</span>
                </div>
                <div className="mt-1 text-[13px] text-muted line-clamp-2">
                  {p.description}
                </div>
                <div className="mt-2 flex gap-3 text-[11px] text-muted">
                  {p.role && <span>{p.role}</span>}
                  {p.startDate && (
                    <span>· {new Date(p.startDate).getFullYear()}</span>
                  )}
                </div>
              </figcaption>
            </a>
          )
        )}
      </div>
    </section>
  );
}

type FeaturedShelvesProps = {
  source: Project[];
  onSelect?: (project: Project) => void;
  hideIfNoImage?: boolean;
};

export function FeaturedShelves({
  source,
  onSelect,
  hideIfNoImage = false,
}: FeaturedShelvesProps) {
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

  const seen = new Set<string>();

  const getGroupItems = (
    filterFn: (p: Project) => boolean | undefined
  ): Project[] => {
    const firstPass = source.filter((p) => Boolean(filterFn(p)));
    const secondPass: Project[] = [];
    for (const p of firstPass) {
      const hasImage = Boolean(p.thumb || p.screenshots?.[0]);
      if (hideIfNoImage && !hasImage) continue;
      if (seen.has(p.slug)) continue;
      seen.add(p.slug);
      secondPass.push(p);
    }
    return secondPass;
  };

  return (
    <div>
      {groups.map((g) => (
        <Shelf
          key={g.label}
          label={g.label}
          items={getGroupItems(g.filter)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function ImageWithFallback({ src, alt }: { src?: string; alt: string }) {
  const fallbackSvg =
    "data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'>\
  <rect width='100%' height='100%' fill='%230f0f0f'/>\
  <rect x='0.25' y='0.25' width='3.5' height='2.5' fill='none' stroke='%23222222' stroke-width='0.1'/>\
</svg>";
  const fallback = fallbackSvg;
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const resolvedSrc = currentSrc || fallback;
  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      fill
      sizes="(max-width: 768px) 80vw, 33vw"
      onError={() => setCurrentSrc(fallback)}
      className="object-cover"
    />
  );
}
