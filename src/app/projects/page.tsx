"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useDeferredValue,
} from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Carousel from "@/components/Carousel";
import { Project, projects } from "@/lib/projects";
import { ProjectDetails } from "@/components/ProjectDetails";
import { ChevronDown, Star } from "lucide-react";
import { container, item, spring } from "@/lib/motion";
import { ProjectHoverPreview } from "@/components/ProjectHoverPreview";

type SortKey = "newest" | "oldest" | "az";
const PILL_FILTERS = ["Research", "AI/Data", "Fashion", "Creative"] as const;
type Pill = (typeof PILL_FILTERS)[number];

const STORAGE_KEY = "projects-filter-state";

export default function ProjectsShowcase() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [activeFilters, setActiveFilters] = useState<Pill[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  // Restore filter state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { filters, sort } = JSON.parse(saved);
        if (Array.isArray(filters)) setActiveFilters(filters);
        if (sort && ["newest", "oldest", "az"].includes(sort)) setSortBy(sort);
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Persist filter state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ filters: activeFilters, sort: sortBy })
      );
    } catch {
      // Ignore storage errors
    }
  }, [activeFilters, sortBy]);

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
            case "Research":
              return p.category === "research" || tags.some((t) => /research|ml|health/i.test(t));
            case "AI/Data":
              return tags.some((t) =>
                /\b(ai|ml|data|scrap|crawl|nlp|embeddings)\b/.test(t)
              );
            case "Fashion":
              return (
                /fashion|brand|stylist/.test(name) || /fashion|brand/.test(desc)
              );
            case "Creative":
              return (
                tags.some((t) => /webgl|three|creative|shader|art/i.test(t)) ||
                /metrosexual|jeremy|music/i.test(name)
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
      return sortBy === "newest" ? ai - bi : bi - ai;
    });
    return list;
  }, [deferredQuery, activeFilters, sortBy, orderIndex]);

  useEffect(() => {
    if (!filtered.length) {
      setExpandedProject(null);
      return;
    }
    if (expandedProject && !filtered.find((p) => p.name === expandedProject)) {
      setExpandedProject(null);
    }
  }, [filtered, expandedProject]);

  const selectedProject: Project | null =
    expandedProject
      ? filtered.find((p) => p.name === expandedProject) || null
      : null;

  // Hero projects: the spine - always visible, never sorted/filtered
  const heroSlugs = ["silk", "vape-quit-coach"];
  const heroProjects = useMemo(
    () => projects.filter((p) => heroSlugs.includes(p.slug)),
    []
  );

  // Everything else is filterable/sortable
  const filterableProjects = useMemo(
    () => filtered.filter((p) => !heroSlugs.includes(p.slug)),
    [filtered]
  );

  // Client/studio work: evidence of taste + execution
  const studioProjects = useMemo(
    () => filterableProjects.filter((p) => p.category === "studio"),
    [filterableProjects]
  );

  // Experiments: playgrounds, not co-equals
  const experimentProjects = useMemo(
    () => filterableProjects.filter((p) => p.category === "personal"),
    [filterableProjects]
  );

  // Only show "no results" if filterable projects are empty (hero always shows)
  const isFilterableEmpty = filterableProjects.length === 0 && (query || activeFilters.length > 0);

  const resetFilters = () => {
    setQuery("");
    setActiveFilters([]);
    setSortBy("newest");
    setExpandedProject(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const getStatusLabel = (status?: Project["status"]) => {
    if (!status) return null;
    return status === "WIP" ? "In Progress" : status;
  };

  const getStatusClassName = (status?: Project["status"]) => {
    if (status === "Active" || status === "WIP") {
      return "bg-accent/10 text-accent border border-accent/20";
    }
    return "bg-[hsl(var(--muted))] text-muted-foreground";
  };

  // Hero project card: larger, more dominant, text-led
  const HeroProjectCard = ({ p }: { p: Project }) => {
    const isExpanded = expandedProject === p.name;

    return (
      <motion.article
        layout
        variants={item.fadeUp}
        className="group"
      >
        <button
          onClick={(e) => {
            setExpandedProject(isExpanded ? null : p.name);
            e.currentTarget.parentElement?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          className={`
            w-full text-left p-6 rounded-lg
            transition-all duration-200 ease-out
            hover:bg-[hsl(var(--muted))]/50
            active:scale-[0.995]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
            border
            ${isExpanded
              ? "border-[hsl(var(--accent))]/50 bg-[hsl(var(--muted))]/30"
              : "border-[hsl(var(--border))]"
            }
          `}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-medium text-foreground">
                  {p.name}
                </h3>
                {p.status === "Active" && (
                  <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-accent/10 text-accent border border-accent/20">
                    Active
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {p.description}
              </p>
              {p.stack && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] rounded-full bg-[hsl(var(--muted))] text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={spring.snappy}
              className="flex-shrink-0 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors mt-1"
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={spring.gentle}
              className="px-1 pb-4 overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring.gentle, delay: 0.05 }}
              >
                <ProjectDetails
                  project={p}
                  onCarouselOpen={() => setIsCarouselOpen(true)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    );
  };

  // Compact project row for client work and experiments
  const ProjectRow = ({ p }: { p: Project }) => {
    const isExpanded = expandedProject === p.name;
    const statusLabel = getStatusLabel(p.status);

    return (
      <motion.li
        layout
        variants={item.slide}
        className="w-full max-w-full group"
      >
        <button
          onClick={(e) => {
            setExpandedProject(isExpanded ? null : p.name);
            e.currentTarget.parentElement?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }}
          className={`
            w-full max-w-full text-left px-2 sm:px-3 py-3
            transition-all duration-200 ease-out
            hover:bg-[hsl(var(--muted))]/50
            active:scale-[0.995]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset
            border-l-2
            ${isExpanded
              ? "border-l-[hsl(var(--accent))] bg-[hsl(var(--muted))]/30"
              : "border-l-transparent"
            }
          `}
        >
          <div className="flex items-center gap-3 sm:gap-4 w-full overflow-hidden">
            {/* Thumbnail with hover glow */}
            <div className="relative h-16 w-20 sm:w-28 flex-shrink-0 overflow-hidden rounded-md ring-1 ring-inset ring-[hsl(var(--border))] bg-muted transition-all duration-200 group-hover:ring-[hsl(var(--accent))]/40 group-hover:shadow-md">
              {p.screenshots?.[0] ? (
                <Image
                  src={p.screenshots[0]}
                  alt={p.name}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-105"
                  loading="lazy"
                  sizes="(max-width: 640px) 80px, 112px"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[hsl(var(--muted))] to-[hsl(var(--accent))]/10">
                  <span className="text-xs font-medium text-muted-foreground/50 tracking-wider">
                    {statusLabel ?? "—"}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1 overflow-hidden">
              <div className="flex items-center gap-2">
                <ProjectHoverPreview screenshots={p.screenshots} projectName={p.name}>
                  <h4 className="truncate break-words text-sm font-medium leading-tight text-foreground cursor-pointer">
                    {p.name}
                  </h4>
                </ProjectHoverPreview>
                {p.featured && (
                  <Star className="h-3 w-3 flex-shrink-0 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
                )}
                {statusLabel && (
                  <span
                    className={`shrink-0 px-1.5 py-0.5 text-[10px] rounded-full ${getStatusClassName(
                      p.status
                    )}`}
                  >
                    {statusLabel}
                  </span>
                )}
              </div>
              <p className="mt-1 truncate break-words text-xs text-muted-foreground">
                {p.description}
              </p>
            </div>

            {/* Expand indicator - rotates on expand */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={spring.snappy}
              className="flex-shrink-0 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors"
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </div>
        </button>

        {/* Expanded details */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={spring.gentle}
              className="px-1 pb-4 overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring.gentle, delay: 0.05 }}
              >
                <ProjectDetails
                  project={p}
                  onCarouselOpen={() => setIsCarouselOpen(true)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.li>
    );
  };

  return (
    <div className="min-h-screen text-foreground font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 mb-8">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search projects"
            className="
              h-10 rounded-xl bg-transparent px-4 text-sm outline-none
              ring-1 ring-[hsl(var(--border))]
              hover:ring-[hsl(var(--border))]/80
              focus:ring-2 focus:ring-[hsl(var(--accent))]
              transition-all duration-200
              w-[min(420px,100%)] placeholder:text-muted-foreground/50
            "
          />
          <div className="w-full sm:w-auto sm:ml-auto flex items-center gap-2 text-sm">
            <label className="text-muted-foreground">sort</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="
                h-10 rounded-xl bg-transparent px-3 text-sm outline-none
                ring-1 ring-[hsl(var(--border))]
                hover:ring-[hsl(var(--border))]/80
                focus:ring-2 focus:ring-[hsl(var(--accent))]
                transition-all duration-200
                text-foreground
              "
            >
              <option value="newest">newest</option>
              <option value="oldest">oldest</option>
              <option value="az">a–z</option>
            </select>
          </div>

          {/* Filter pills with press feedback */}
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
                  className={`
                    h-8 px-3 rounded-full text-xs font-medium tracking-wide
                    transition-all duration-200 ease-out
                    ring-1
                    active:scale-95
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
                    ${active
                      ? "bg-[hsl(var(--accent))] text-white ring-[hsl(var(--accent))] shadow-sm"
                      : "text-muted-foreground ring-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] hover:text-foreground hover:ring-[hsl(var(--accent))]/40"
                    }
                  `}
                  aria-pressed={active}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Act I & II: The Spine - Always visible, never filtered */}
        {heroProjects.length > 0 && (
          <section aria-label="featured work" className="overflow-x-hidden w-full max-w-full mb-12">
            <motion.div
              variants={container.list}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {heroProjects.map((p) => (
                <HeroProjectCard key={p.name} p={p} />
              ))}
            </motion.div>
          </section>
        )}

        {/* Screen reader announcement for filter results */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {isFilterableEmpty
            ? "No projects match your filters"
            : `Showing ${filterableProjects.length} additional project${filterableProjects.length === 1 ? "" : "s"}`}
        </div>

        {/* Filterable project lists */}
        <div className="space-y-12">
          {isFilterableEmpty ? (
            <motion.section
              className="mt-10 grid place-items-center"
              variants={item.fade}
              initial="hidden"
              animate="visible"
            >
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  No additional projects match your filters.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <button
                    onClick={resetFilters}
                    className="
                      h-9 rounded-full px-4 text-sm font-medium
                      ring-1 ring-[hsl(var(--border))]
                      hover:ring-[hsl(var(--accent))] hover:text-accent
                      active:scale-95
                      transition-all duration-200
                    "
                  >
                    reset filters
                  </button>
                </div>
              </div>
            </motion.section>
          ) : (
            <>
              {/* Act III: Applied Craft - Client work */}
              {studioProjects.length > 0 && (
                <section aria-label="client work" className="overflow-x-hidden w-full max-w-full">
                  <h2 className="mb-4 flex items-center gap-3">
                    <div className="w-1 h-3 bg-border" />
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50 uppercase">
                      client work
                    </span>
                    <span className="h-px flex-1 bg-border/30" />
                  </h2>
                  <motion.ul
                    variants={container.list}
                    initial="hidden"
                    animate="visible"
                    className="divide-y divide-[hsl(var(--border))]/50 overflow-x-hidden w-full max-w-full"
                  >
                    {studioProjects.map((p) => (
                      <ProjectRow key={p.name} p={p} />
                    ))}
                  </motion.ul>
                </section>
              )}

              {/* Act IV: Playgrounds */}
              {experimentProjects.length > 0 && (
                <section aria-label="experiments" className="overflow-x-hidden w-full max-w-full">
                  <h2 className="mb-4 flex items-center gap-3">
                    <div className="w-1 h-3 bg-border/50" />
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/40 uppercase">
                      experiments
                    </span>
                    <span className="h-px flex-1 bg-border/20" />
                  </h2>
                  <motion.ul
                    variants={container.list}
                    initial="hidden"
                    animate="visible"
                    className="divide-y divide-[hsl(var(--border))]/30 overflow-x-hidden w-full max-w-full opacity-80"
                  >
                    {experimentProjects.map((p) => (
                      <ProjectRow key={p.name} p={p} />
                    ))}
                  </motion.ul>
                </section>
              )}
            </>
          )}
        </div>
      </div>

      {/* Carousel dialog */}
      <Dialog open={isCarouselOpen} onOpenChange={setIsCarouselOpen}>
        <DialogContent className="max-w-none w-screen h-screen p-0">
          <VisuallyHidden.Root>
            <DialogTitle>
              {selectedProject?.name ?? "Project"} Screenshots
            </DialogTitle>
          </VisuallyHidden.Root>
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
