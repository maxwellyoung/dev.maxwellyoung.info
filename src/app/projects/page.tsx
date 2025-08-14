"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useDeferredValue,
} from "react";
// removed background motion imports to reduce visual noise
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import Carousel from "@/components/Carousel";
import { Project, projects } from "@/lib/projectsData";
import { ProjectDetails } from "@/components/ProjectDetails";
import { ProjectCard } from "@/components/ProjectCard";

type SortKey = "newest" | "oldest" | "az";
const PILL_FILTERS = ["AI/Data", "Fashion", "Creative"] as const;
type Pill = (typeof PILL_FILTERS)[number];

export default function ProjectsShowcase() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [activeFilters, setActiveFilters] = useState<Pill[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  // featured view removed per request; list is the only mode now
  // -1 means no row expanded (all closed)
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  // Preserve the original order from projectsData.ts (append = newer)
  const orderIndex = useMemo(() => {
    const map = new Map<string, number>();
    projects.forEach((p, i) => map.set(p.name, i));
    return map;
  }, []);

  const filtered: Project[] = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    let list = projects.slice();
    if (q) {
      list = list.filter((p) => {
        const haystack = [
          p.name,
          p.description || "",
          p.longDescription || "",
          ...(p.tags || []),
        ]
          .join("\n")
          .toLowerCase();
        return haystack.includes(q);
      });
    }
    if (activeFilters.length) {
      list = list.filter((p) =>
        activeFilters.every((f) => {
          const tags = (p.tags || []).map((t) => t.toLowerCase());
          const name = (p.name || "").toLowerCase();
          const desc = (p.description || "").toLowerCase();
          switch (f) {
            case "AI/Data":
              return tags.some((t) =>
                /\b(ai|ml|data|scrap|crawl|nlp)\b/.test(t)
              );
            case "Fashion":
              return (
                /fashion|brand|stylist/.test(name) || /fashion|brand/.test(desc)
              );
            case "Creative":
              return (
                tags.some((t) => /webgl|three|creative|shader/.test(t)) ||
                /metrosexual|jeremy/.test(name)
              );
            default:
              return true;
          }
        })
      );
    }
    list.sort((a, b) => {
      if (sortBy === "az") return a.name.localeCompare(b.name);
      const ai = orderIndex.get(a.name) ?? 0;
      const bi = orderIndex.get(b.name) ?? 0;
      // reversed per request: newest = lower index first; oldest = higher index first
      return sortBy === "newest" ? ai - bi : bi - ai;
    });
    return list;
  }, [deferredQuery, activeFilters, sortBy, orderIndex]);

  useEffect(() => {
    if (!filtered.length) {
      setCurrentIndex(-1);
      return;
    }
    if (currentIndex >= filtered.length) setCurrentIndex(-1);
  }, [filtered, currentIndex]);

  const selectedProject: Project | null =
    currentIndex >= 0 ? filtered[currentIndex] : null;
  const featured = useMemo(
    () => filtered.slice(0, Math.min(3, filtered.length)),
    [filtered]
  );
  const isEmpty = filtered.length === 0;

  const resetFilters = () => {
    setQuery("");
    setActiveFilters([]);
    setSortBy("newest");
    setCurrentIndex(0);
  };

  // removed featured sync logic

  return (
    <div
      className="min-h-screen text-gray-800 dark:text-gray-200 font-sans"
      tabIndex={0}
    >
      <div className="container-grid py-8 overflow-x-hidden">
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search projects"
            className="h-9 rounded-xl bg-transparent px-3 text-sm outline-none ring-1 ring-[hsl(var(--border))] focus:ring-[hsl(var(--accent))] w-[min(420px,100%)] placeholder-gray-400"
          />
          <div className="w-full sm:w-auto sm:ml-auto flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
            <label className="text-gray-600 dark:text-gray-300">sort</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="h-9 rounded-xl bg-transparent px-2 text-sm outline-none ring-1 ring-[hsl(var(--border))] focus:ring-[hsl(var(--accent))] text-gray-700 dark:text-gray-200"
            >
              <option value="newest">newest</option>
              <option value="oldest">oldest</option>
              <option value="az">a–z</option>
            </select>
          </div>
          {/* removed featured/list toggle */}
          <div className="w-full flex flex-wrap gap-2">
            {PILL_FILTERS.map((p) => {
              const active = activeFilters.includes(p);
              return (
                <button
                  key={p}
                  onClick={() =>
                    setActiveFilters((prev) =>
                      prev.includes(p)
                        ? prev.filter((f) => f !== p)
                        : [...prev, p]
                    )
                  }
                  className={
                    "h-8 px-3 rounded-full text-xs tracking-[0.08em] transition-colors duration-150 ease-[var(--ease-brand)] ring-1 " +
                    (active
                      ? "bg-[hsl(var(--accent))]/10 text-[hsl(var(--foreground))] ring-[hsl(var(--accent))]/60"
                      : "text-[hsl(var(--foreground)/0.75)] ring-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/40 hover:ring-[hsl(var(--accent))]/40")
                  }
                  aria-pressed={active}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>
        <div className="space-y-8">
          {isEmpty ? (
            <section className="mt-10 grid place-items-center">
              <div className="text-center">
                <p className="text-sm text-muted">
                  No projects match your filters.
                </p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <button
                    onClick={resetFilters}
                    className="h-8 rounded-full px-3 ring-1 ring-[hsl(var(--border))] hover:ring-[hsl(var(--accent))]/60 transition"
                  >
                    reset
                  </button>
                </div>
              </div>
            </section>
          ) : (
            <section
              aria-label="all projects"
              className="mt-2 overflow-x-hidden w-full max-w-full"
            >
              <div className="overflow-x-hidden w-full max-w-full">
                <motion.ul
                  layout
                  className="divide-y divide-[hsl(var(--border))] overflow-x-hidden w-full max-w-full"
                >
                  {filtered.map((p, idx) => (
                    <motion.li
                      layout
                      key={p.name}
                      className="w-full max-w-full"
                    >
                      <button
                        onClick={(e) => {
                          setCurrentIndex((prev) => (prev === idx ? -1 : idx));
                          e.currentTarget.parentElement?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                        }}
                        className="w-full max-w-full text-left px-0 py-3 hover:bg-[hsl(var(--muted))]/50 transition"
                      >
                        <div className="grid-12 items-center w-full overflow-hidden gap-4">
                          <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-2">
                            <div className="relative h-16 w-full overflow-hidden rounded-md ring-1 ring-[hsl(var(--border))]">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={
                                  p.screenshots?.[0] ||
                                  "/projectImages/StudentView.jpeg"
                                }
                                alt={p.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="col-span-9 sm:col-span-9 md:col-span-9 lg:col-span-9 xl:col-span-10 min-w-0 overflow-hidden">
                            <h4 className="truncate break-words text-sm font-medium leading-tight">
                              {p.name}
                            </h4>
                            <p className="mt-1 truncate break-words text-xs text-zinc-600 dark:text-zinc-400">
                              {p.description}
                            </p>
                          </div>
                        </div>
                      </button>
                      <AnimatePresence initial={false}>
                        {currentIndex === idx && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="px-1 pb-4"
                          >
                            <ProjectDetails
                              project={p}
                              onCarouselOpen={() => setIsCarouselOpen(true)}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </section>
          )}
        </div>
      </div>
      <Dialog open={isCarouselOpen} onOpenChange={setIsCarouselOpen}>
        <DialogContent className="max-w-none w-screen h-screen p-0">
          {selectedProject?.screenshots && (
            <Carousel
              images={selectedProject.screenshots}
              onClose={() => setIsCarouselOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
