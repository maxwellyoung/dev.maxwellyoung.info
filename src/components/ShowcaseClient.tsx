"use client";

import {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
  useDeferredValue,
} from "react";
import Image from "next/image";
import type { Project } from "@/lib/projects";
import { motion, AnimatePresence } from "framer-motion";

// ——————————————————————————————————————————————————————————————
// ShowcaseClient
// Minimal surface, calm motion, strong typography, a11y-first.
// - predictable selection logic
// - debounced/deferred search
// - filter chips with toggle state
// - keyboard nav (j/k, arrows, enter to open)
// - responsive, single-column fallback
// - accessible dialog for gallery
// - small utilities kept local for clarity
// ——————————————————————————————————————————————————————————————

type ShowcaseClientProps = { source: Project[] };

type SortKey = "newest" | "oldest" | "az";

const PILL_FILTERS = [
  "Featured",
  "Client",
  "Personal",
  "AI/Data",
  "Fashion",
  "Creative",
] as const;

type Pill = (typeof PILL_FILTERS)[number];

export default function ShowcaseClient({ source }: ShowcaseClientProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [activeFilters, setActiveFilters] = useState<Pill[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [selected, setSelected] = useState<Project | null>(null);
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const rightListRef = useRef<HTMLDivElement>(null);

  // ensure a stable default selection based on filtered list
  const ensureSelection = useCallback(
    (list: Project[]) => {
      if (!list.length) return setSelected(null);
      if (!selected || !list.find((p) => p.slug === selected.slug)) {
        setSelected(list[0]);
      }
    },
    [selected]
  );

  const filtered = useMemo(() => {
    let list = [...source];

    // text query across common fields
    const q = deferredQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.longDescription && p.longDescription.toLowerCase().includes(q)) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(q)) ||
          (p.stack || []).some((s) => s.toLowerCase().includes(q)) ||
          (p.client && p.client.toLowerCase().includes(q))
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
              return (p.tags || []).some((t) => /^(ai|ml|data|scrap)/i.test(t));
            case "Fashion":
              return (
                (p.tags || []).some((t) => /brand|fashion/i.test(t)) ||
                (p.client || "").toLowerCase().includes("fashion") ||
                ["TYTM8", "Goodness"].some((n) => p.name?.includes(n))
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
  }, [deferredQuery, activeFilters, sortBy, source]);

  useEffect(() => {
    ensureSelection(filtered);
  }, [filtered, ensureSelection]);
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
        scrollRowIntoView(next.slug);
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        const prev = filtered[(idx - 1 + filtered.length) % filtered.length];
        setSelected(prev);
        scrollRowIntoView(prev.slug);
      } else if (e.key === "Enter") {
        setGalleryOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [filtered, selected]);

  const scrollRowIntoView = (slug: string) => {
    const el = rightListRef.current?.querySelector<HTMLLIElement>(
      `[data-id="${slug}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  };

  const toggleFilter = (p: Pill) =>
    setActiveFilters((prev) =>
      prev.includes(p) ? prev.filter((f) => f !== p) : [...prev, p]
    );

  const openGallery = () => setGalleryOpen(true);

  return (
    <main className="min-h-screen py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1100px] px-4 md:px-6">
        <Header
          query={query}
          onQuery={setQuery}
          sortBy={sortBy}
          onSort={(v) => setSortBy(v)}
          pills={[...PILL_FILTERS] as Pill[]}
          active={activeFilters}
          onToggle={toggleFilter}
          total={filtered.length}
        />

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-16 text-center text-sm text-muted"
              role="status"
            >
              no matches. try clearing filters.
            </motion.div>
          ) : (
            <motion.section
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2">
                {selected && (
                  <Card>
                    <div className="relative aspect-[16/9] mb-4 overflow-hidden rounded-lg ring-1 ring-[var(--surface)]/50">
                      <button
                        onClick={openGallery}
                        className="absolute inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                        aria-label="open gallery"
                      />
                      <Image
                        src={(() => {
                          const images = selected.screenshots?.length
                            ? selected.screenshots
                            : selected.thumb
                            ? [selected.thumb]
                            : [];
                          const chosen = images[previewIndex] || images[0];
                          return (chosen || PLACEHOLDER) as string;
                        })()}
                        alt={selected.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        className="object-cover"
                        priority
                      />
                    </div>
                    <h2 className="text-[20px] font-medium leading-tight tracking-[0.02em]">
                      {selected.name}
                    </h2>
                    <p className="mt-2 text-[13px] text-muted leading-relaxed">
                      {selected.longDescription || selected.description}
                    </p>

                    <ThumbStrip
                      selected={selected}
                      previewIndex={previewIndex}
                      onChange={setPreviewIndex}
                    />

                    <MetaRow p={selected} />
                    <Links p={selected} onOpenVideo={openGallery} />
                  </Card>
                )}
              </div>

              <div className="lg:col-span-1">
                <div
                  ref={rightListRef}
                  className="max-h-[560px] overflow-y-auto pr-1"
                >
                  <ul
                    className="space-y-2"
                    role="listbox"
                    aria-label="projects"
                  >
                    {filtered.map((p) => (
                      <li
                        key={p.slug}
                        data-id={p.slug}
                        role="option"
                        aria-selected={selected?.slug === p.slug}
                      >
                        <button
                          onClick={() => setSelected(p)}
                          className={
                            "w-full text-left rounded-lg ring-1 px-3 py-[6px] text-[13px] transition ease-[var(--ease-brand)] duration-150 " +
                            (selected?.slug === p.slug
                              ? "ring-[var(--accent)]/60 bg-[var(--accent)]/10"
                              : "ring-[var(--surface)]/60 hover:bg-[var(--surface)]/20 focus-visible:ring-[var(--accent)]")
                          }
                        >
                          <div className="font-medium leading-tight truncate">
                            {p.name}
                          </div>
                          <div className="text-muted line-clamp-1">
                            {p.description}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <GalleryDialog
        open={isGalleryOpen}
        onClose={() => setGalleryOpen(false)}
        images={
          (selected?.screenshots?.length
            ? selected!.screenshots
            : selected?.thumb
            ? [selected.thumb]
            : []) as string[]
        }
        name={selected?.name || "gallery"}
      />
    </main>
  );
}

// ——————————————————————————————————————————————————————————————
// UI Pieces
// ——————————————————————————————————————————————————————————————

function Header({
  query,
  onQuery,
  sortBy,
  onSort,
  pills,
  active,
  onToggle,
  total,
}: {
  query: string;
  onQuery: (v: string) => void;
  sortBy: SortKey;
  onSort: (v: SortKey) => void;
  pills: Pill[];
  active: Pill[];
  onToggle: (p: Pill) => void;
  total: number;
}) {
  return (
    <header className="mb-8 space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] font-medium tracking-[0.02em]">
            showcase
          </h1>
          <p className="text-sm text-muted">
            explore shelves + deep project details in one view.
          </p>
        </div>
        <div className="hidden md:block text-xs text-muted">
          {total} result{total === 1 ? "" : "s"}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="sr-only" htmlFor="search">
          search projects
        </label>
        <input
          id="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="search projects"
          className="h-9 rounded-xl bg-transparent px-3 text-sm outline-none ring-1 ring-[var(--surface)] focus:ring-[var(--accent)] w-[min(420px,100%)]"
        />
        <div className="ml-auto flex items-center gap-2 text-sm">
          <label className="text-muted" htmlFor="sort">
            sort
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSort(e.target.value as SortKey)}
            className="h-9 rounded-xl bg-transparent px-2 text-sm outline-none ring-1 ring-[var(--surface)] focus:ring-[var(--accent)]"
          >
            <option value="newest">newest</option>
            <option value="oldest">oldest</option>
            <option value="az">a–z</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {pills.map((p) => (
          <FilterChip
            key={p}
            label={p}
            active={active.includes(p)}
            onClick={() => onToggle(p)}
          />
        ))}
      </div>
    </header>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "h-7 px-3 rounded-full text-xs tracking-[0.08em] transition shadow-[inset_0_0_0_1px_var(--surface)] text-text " +
        (active
          ? "bg-[var(--accent)]/12 shadow-[inset_0_0_0_1px_var(--accent)]"
          : "hover:shadow-[inset_0_0_0_1px_var(--accent)]")
      }
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      layout
      className="rounded-2xl p-5 ring-1 ring-[var(--surface)]/60 bg-[var(--bg)]/60 backdrop-blur-sm"
    >
      {children}
    </motion.div>
  );
}

function ThumbStrip({
  selected,
  previewIndex,
  onChange,
}: {
  selected: Project;
  previewIndex: number;
  onChange: (i: number) => void;
}) {
  const imgs = selected.screenshots?.length
    ? selected.screenshots
    : selected.thumb
    ? [selected.thumb]
    : [];
  if (imgs.length <= 1) return null;
  return (
    <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
      {imgs.map((src, i) => (
        <button
          key={src + i}
          onClick={() => onChange(i)}
          className={
            "relative h-14 w-24 flex-shrink-0 overflow-hidden rounded-md ring-1 transition " +
            (previewIndex === i
              ? "ring-[var(--accent)]"
              : "ring-[var(--surface)] hover:ring-[var(--accent)]")
          }
          aria-current={previewIndex === i}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="thumb" className="h-full w-full object-cover" />
        </button>
      ))}
    </div>
  );
}

function MetaRow({ p }: { p: Project }) {
  return (
    <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
      {p.role && <span>{p.role}</span>}
      {p.client && <span>· {p.client}</span>}
      {p.startDate && <span>· {new Date(p.startDate).getFullYear()}</span>}
    </div>
  );
}

function Links({ p, onOpenVideo }: { p: Project; onOpenVideo: () => void }) {
  const LinkA = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a
      className="underline underline-offset-2 decoration-[var(--accent)]/60 hover:decoration-[var(--accent)]"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
  return (
    <div className="mt-4 flex gap-4 text-sm">
      {p.links?.live && <LinkA href={p.links.live}>live</LinkA>}
      {p.links?.repo && <LinkA href={p.links.repo}>repo</LinkA>}
      {p.links?.video && (
        <button className="underline underline-offset-2" onClick={onOpenVideo}>
          video
        </button>
      )}
    </div>
  );
}

function GalleryDialog({
  open,
  onClose,
  images,
  name,
}: {
  open: boolean;
  onClose: () => void;
  images: string[];
  name: string;
}) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 grid place-items-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-modal
        role="dialog"
        aria-label={`${name} gallery`}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/70" />
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-[var(--bg)] ring-1 ring-[var(--surface)]"
        >
          <button
            onClick={onClose}
            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/50 text-white backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label="close"
          >
            ×
          </button>
          <div className="relative aspect-[16/9]">
            {/* very small, opinionated carousel without deps */}
            <Gallery images={images} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Gallery({ images }: { images: string[] }) {
  const [i, setI] = useState(0);
  const len = images.length;
  const next = () => setI((v) => (v + 1) % len);
  const prev = () => setI((v) => (v - 1 + len) % len);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  if (!len)
    return (
      <div className="grid h-full place-items-center text-sm text-muted">
        no images
      </div>
    );

  return (
    <div className="h-full w-full">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={images[i]}
          className="absolute inset-0"
          initial={{ opacity: 0.001, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.001, scale: 1.02 }}
          transition={{ duration: 0.18 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[i]}
            alt="slide"
            className="h-full w-full object-contain"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-2">
        <button
          onClick={prev}
          className="rounded-full bg-black/40 px-3 py-1 text-white backdrop-blur"
        >
          prev
        </button>
        <div className="rounded-full bg-black/40 px-2 py-1 text-xs text-white backdrop-blur">
          {i + 1} / {len}
        </div>
        <button
          onClick={next}
          className="rounded-full bg-black/40 px-3 py-1 text-white backdrop-blur"
        >
          next
        </button>
      </div>
    </div>
  );
}

const PLACEHOLDER =
  "data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'>\
  <rect width='100%' height='100%' fill='%230f0f0f'/>\
  <rect x='0.5' y='0.5' width='15' height='8' fill='none' stroke='%23222222' stroke-width='0.5'/>\
</svg>";
