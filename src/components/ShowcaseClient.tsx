"use client";

import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import type { Project } from "@/lib/projects";
import Carousel from "@/components/Carousel";
import { FeaturedShelves } from "@/components/FeaturedShelves";

type ShowcaseClientProps = {
  source: Project[];
};

export function ShowcaseClient({ source }: ShowcaseClientProps) {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "az">("newest");
  const [selected, setSelected] = useState<Project | null>(null);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const rightListRef = useRef<HTMLDivElement>(null);

  // ensure a stable default selection based on filtered list
  const ensureSelection = useCallback(
    (list: Project[]) => {
      if (!selected || !list.find((p) => p.slug === selected.slug)) {
        setSelected(list[0] ?? null);
      }
    },
    [selected]
  );

  const filtered = useMemo(() => {
    let list = [...source];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(q)) ||
          (p.stack || []).some((s) => s.toLowerCase().includes(q))
      );
    }

    if (activeFilters.length) {
      list = list.filter((p) =>
        activeFilters.every((f) => {
          switch (f) {
            case "Featured":
              return !!p.featured;
            case "Client":
              return p.category === "Client";
            case "Personal":
              return p.category === "Personal";
            case "AI/Data":
              return (
                (p.tags || []).includes("AI") ||
                (p.tags || []).includes("Scraping")
              );
            case "Fashion":
              return (
                (p.tags || []).includes("Brand") ||
                (p.client || "").toLowerCase().includes("fashion") ||
                ["TYTM8", "Goodness"].some((n) => p.name.includes(n))
              );
            case "Creative":
              return p.category === "Experiment";
            default:
              return true;
          }
        })
      );
    }

    list.sort((a, b) => {
      if (sortBy === "az") return a.name.localeCompare(b.name);
      const at = a.startDate ? new Date(a.startDate).getTime() : 0;
      const bt = b.startDate ? new Date(b.startDate).getTime() : 0;
      return sortBy === "newest" ? bt - at : at - bt;
    });

    return list;
  }, [query, activeFilters, sortBy, source]);

  useEffect(() => {
    ensureSelection(filtered);
  }, [filtered, ensureSelection]);

  // reset preview index whenever selection changes
  useEffect(() => {
    setPreviewIndex(0);
  }, [selected?.slug]);

  // keyboard navigation: j/k or ArrowDown/ArrowUp, Enter opens gallery
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!filtered.length) return;
      const idx = selected
        ? filtered.findIndex((p) => p.slug === selected.slug)
        : -1;
      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        const next = filtered[(idx + 1 + filtered.length) % filtered.length];
        setSelected(next);
        const el = rightListRef.current?.querySelector<HTMLLIElement>(
          `[data-id="${next.slug}"]`
        );
        el?.scrollIntoView({ block: "nearest" });
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        const prev = filtered[(idx - 1 + filtered.length) % filtered.length];
        setSelected(prev);
        const el = rightListRef.current?.querySelector<HTMLLIElement>(
          `[data-id="${prev.slug}"]`
        );
        el?.scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter") {
        setIsCarouselOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [filtered, selected]);

  const pills = [
    "Featured",
    "Client",
    "Personal",
    "AI/Data",
    "Fashion",
    "Creative",
  ];

  const openGallery = () => setIsCarouselOpen(true);

  return (
    <main className="min-h-screen py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1100px] px-4">
        <header className="mb-8 space-y-3">
          <h1 className="font-display text-[28px] font-medium tracking-[0.02em]">
            Showcase
          </h1>
          <p className="text-sm text-muted">
            Explore shelves + deep project details in one view.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects"
              className="h-8 rounded-sm bg-transparent px-3 text-sm outline-none border border-[var(--surface)] focus:border-[var(--accent)]"
            />
            <div className="ml-auto flex items-center gap-2 text-sm">
              <label className="text-muted">Sort</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="h-8 rounded-sm bg-transparent px-2 text-sm outline-none border border-[var(--surface)] focus:border-[var(--accent)]"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="az">A–Z</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {pills.map((p) => (
              <button
                key={p}
                onClick={() =>
                  setActiveFilters((prev) =>
                    prev.includes(p)
                      ? prev.filter((f) => f !== p)
                      : [...prev, p]
                  )
                }
                className={`h-7 px-3 rounded-full border text-xs tracking-[0.08em] transition-colors ${
                  activeFilters.includes(p)
                    ? "border-[var(--accent)] bg-[var(--accent)]/10"
                    : "border-[var(--surface)] hover:border-[var(--accent)]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </header>

        {/* Shelves from Explore */}
        <FeaturedShelves
          source={filtered}
          onSelect={(p) => setSelected(p)}
          hideIfNoImage
        />

        {/* Details + List from Projects */}
        <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {selected && (
              <div className="rounded-md border border-[var(--surface)] p-4">
                <div
                  className="aspect-[16/9] relative mb-4 cursor-pointer"
                  onClick={openGallery}
                >
                  <Image
                    src={(() => {
                      const images =
                        selected.screenshots && selected.screenshots.length > 0
                          ? selected.screenshots
                          : selected.thumb
                          ? [selected.thumb]
                          : [];
                      const chosen = images[previewIndex] || images[0];
                      const placeholder =
                        "data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'>\
  <rect width='100%' height='100%' fill='%230f0f0f'/>\
  <rect x='0.5' y='0.5' width='15' height='8' fill='none' stroke='%23222222' stroke-width='0.5'/>\
</svg>";
                      return (chosen || placeholder) as string;
                    })()}
                    alt={selected.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover rounded-sm"
                  />
                </div>
                <h2 className="text-xl font-medium leading-tight">
                  {selected.name}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {selected.longDescription || selected.description}
                </p>
                {/* thumbnail strip */}
                {((selected.screenshots && selected.screenshots.length > 1) ||
                  (selected.screenshots &&
                    selected.screenshots.length === 1 &&
                    selected.thumb)) && (
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                    {(() => {
                      const imgs =
                        selected.screenshots && selected.screenshots.length > 0
                          ? selected.screenshots
                          : selected.thumb
                          ? [selected.thumb]
                          : [];
                      return imgs.map((src, i) => (
                        <button
                          key={src + i}
                          onClick={() => setPreviewIndex(i)}
                          className={`relative h-14 w-24 flex-shrink-0 rounded-sm border ${
                            previewIndex === i
                              ? "border-[var(--accent)]"
                              : "border-[var(--surface)] hover:border-[var(--accent)]"
                          }`}
                        >
                          <Image
                            src={src}
                            alt="thumb"
                            fill
                            sizes="96px"
                            className="object-cover rounded-sm"
                          />
                        </button>
                      ));
                    })()}
                  </div>
                )}
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
                  {selected.role && <span>{selected.role}</span>}
                  {selected.client && <span>· {selected.client}</span>}
                  {selected.startDate && (
                    <span>· {new Date(selected.startDate).getFullYear()}</span>
                  )}
                </div>
                {(selected.links?.live ||
                  selected.links?.repo ||
                  selected.links?.video) && (
                  <div className="mt-4 flex gap-4 text-sm">
                    {selected.links?.live && (
                      <a
                        className="underline"
                        href={selected.links.live}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live
                      </a>
                    )}
                    {selected.links?.repo && (
                      <a
                        className="underline"
                        href={selected.links.repo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Repo
                      </a>
                    )}
                    {selected.links?.video && (
                      <button className="underline" onClick={openGallery}>
                        Video
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <div
              ref={rightListRef}
              className="max-h-[520px] overflow-y-auto pr-1"
            >
              <ul className="space-y-2">
                {filtered.map((p) => (
                  <li key={p.slug} data-id={p.slug}>
                    <button
                      onClick={() => setSelected(p)}
                      className={`w-full text-left rounded-sm border px-2 py-1.5 text-[13px] transition-colors ${
                        selected?.slug === p.slug
                          ? "border-[var(--accent)] bg-[var(--accent)]/10"
                          : "border-[var(--surface)] hover:border-[var(--surface)]/80 hover:bg-[var(--surface)]/20"
                      }`}
                    >
                      <div className="font-medium leading-tight truncate">
                        {p.name}
                      </div>
                      <div className="text-muted line-clamp-2">
                        {p.description}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      {isCarouselOpen && (
        <div className="fixed inset-0 z-50">
          <Carousel
            images={
              (selected?.screenshots && selected.screenshots.length > 0
                ? selected.screenshots
                : selected?.thumb
                ? [selected.thumb]
                : []) as string[]
            }
            onClose={() => setIsCarouselOpen(false)}
          />
        </div>
      )}
    </main>
  );
}
