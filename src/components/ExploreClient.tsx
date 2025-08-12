"use client";

import { useMemo, useState } from "react";
import { FeaturedShelves } from "@/components/FeaturedShelves";
import type { Project } from "@/lib/projects";

type ExploreClientProps = {
  source: Project[];
};

export function ExploreClient({ source }: ExploreClientProps) {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "az">("newest");

  const toggleFilter = (key: string) => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  const filtered = useMemo(() => {
    let list = [...source];

    // search (simple includes over name/description/tags/stack)
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(q)) ||
          (p.stack || []).some((s) => s.toLowerCase().includes(q))
        );
      });
    }

    // filters
    if (activeFilters.length) {
      list = list.filter((p) => {
        return activeFilters.every((f) => {
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
        });
      });
    }

    // sort
    list.sort((a, b) => {
      if (sortBy === "az") return a.name.localeCompare(b.name);
      const at = a.startDate ? new Date(a.startDate).getTime() : 0;
      const bt = b.startDate ? new Date(b.startDate).getTime() : 0;
      return sortBy === "newest" ? bt - at : at - bt;
    });

    return list;
  }, [query, activeFilters, sortBy, source]);

  const pills = [
    "Featured",
    "Client",
    "Personal",
    "AI/Data",
    "Fashion",
    "Creative",
  ];

  return (
    <main className="min-h-screen py-16 md:py-24">
      <div className="mx-auto w-full max-w-[960px] px-4">
        <header className="mb-8 space-y-3">
          <h1 className="font-display text-[28px] font-medium tracking-[0.02em]">
            Explore
          </h1>
          <p className="text-sm text-muted">
            Sparse, editorial cases with tiny, tasteful motion.
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
                onClick={() => toggleFilter(p)}
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
        <FeaturedShelves source={filtered} />
      </div>
    </main>
  );
}
