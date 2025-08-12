"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useDeferredValue,
} from "react";
import {
  motion,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Carousel from "@/components/Carousel";
import { Project, projects } from "@/lib/projectsData";
import { ProjectDetails } from "@/components/ProjectDetails";
import { ProjectList } from "@/components/ProjectList";

type SortKey = "newest" | "oldest" | "az";
const PILL_FILTERS = [
  "Completed",
  "WIP",
  "AI/Data",
  "Fashion",
  "Creative",
] as const;
type Pill = (typeof PILL_FILTERS)[number];

export default function ProjectsShowcase() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [activeFilters, setActiveFilters] = useState<Pill[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

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
          const status = (p.status || "").toLowerCase();
          const tags = (p.tags || []).map((t) => t.toLowerCase());
          const name = (p.name || "").toLowerCase();
          const desc = (p.description || "").toLowerCase();
          switch (f) {
            case "Completed":
              return status === "completed";
            case "WIP":
              return status !== "completed";
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
      const at = a.startDate ? new Date(a.startDate).getTime() : 0;
      const bt = b.startDate ? new Date(b.startDate).getTime() : 0;
      return sortBy === "newest" ? bt - at : at - bt;
    });
    return list;
  }, [deferredQuery, activeFilters, sortBy]);

  useEffect(() => {
    if (!filtered.length) {
      setCurrentIndex(0);
      return;
    }
    if (currentIndex >= filtered.length) setCurrentIndex(0);
  }, [filtered, currentIndex]);

  const selectedProject: Project | null = filtered[currentIndex] ?? null;

  const spinner = useSpring(0, { stiffness: 100, damping: 30 });
  const rotation = useTransform(spinner, [0, 1], [0, 360]);
  const conic = useMotionTemplate`conic-gradient(from ${rotation}deg at 50% 50%, transparent, transparent)`;

  useEffect(() => {
    let raf: number;
    const tick = () => {
      spinner.set(Math.random());
      raf = window.setTimeout(tick, 15000) as unknown as number;
    };
    tick();
    return () => window.clearTimeout(raf);
  }, [spinner]);

  return (
    <div
      className="min-h-screen text-gray-800 dark:text-gray-200 font-sans relative overflow-hidden"
      tabIndex={0}
    >
      <motion.div className="absolute inset-0" style={{ background: conic }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search projects"
            className="h-9 rounded-xl bg-transparent px-3 text-sm outline-none ring-1 ring-[var(--surface)] focus:ring-[var(--accent)] w-[min(420px,100%)] placeholder-gray-400"
          />
          <div className="ml-auto flex items-center gap-2 text-sm">
            <label className="text-gray-600 dark:text-gray-300">sort</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="h-9 rounded-xl bg-transparent px-2 text-sm outline-none ring-1 ring-[var(--surface)] focus:ring-[var(--accent)] text-gray-700 dark:text-gray-200"
            >
              <option value="newest">newest</option>
              <option value="oldest">oldest</option>
              <option value="az">a–z</option>
            </select>
          </div>
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
                    "h-7 px-3 rounded-full text-xs tracking-[0.08em] transition " +
                    (active
                      ? "bg-[var(--accent)] text-white ring-2 ring-[var(--accent)]"
                      : "ring-1 ring-[var(--surface)] hover:ring-[var(--accent)]")
                  }
                  aria-pressed={active}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-6 lg:h-[75vh]">
          <div className="lg:w-2/3" ref={containerRef}>
            {selectedProject && (
              <ProjectDetails
                project={selectedProject}
                onCarouselOpen={() => setIsCarouselOpen(true)}
              />
            )}
          </div>
          <div className="lg:w-1/3 mt-6 lg:mt-0 flex-grow pb-16">
            <ProjectList
              projects={filtered}
              selectedProject={selectedProject || undefined}
              onSelectProject={(project, _index) => {
                const idx = filtered.findIndex((p) => p.name === project.name);
                setCurrentIndex(idx >= 0 ? idx : 0);
              }}
              scrollAreaRef={scrollAreaRef}
            />
          </div>
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
