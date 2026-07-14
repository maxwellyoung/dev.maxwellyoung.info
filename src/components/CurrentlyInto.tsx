"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { canonFeed } from "@/lib/canonFeed";
import { GitHubPulse } from "@/components/GitHubPulse";

/**
 * Currently into — the footer's single "now" band. A snapshot of the Canon
 * media catalog, exported at build time (covers included, in /public/canon).
 * Left: four covers on a shared baseline like objects on a shelf, each at
 * its natural aspect. Right rail: the taste line and a quiet GitHub pulse.
 * The shelf expands in place to reveal a little more of the catalog without
 * turning the footer into a second destination. The taste data remains a
 * build-time snapshot; only the quiet GitHub pulse is live.
 */

const SHELF_H = 104; // display height of the tallest cover, px
const CAPTION_H = 64; // reserved caption height — equal figure heights keep the shelf baseline true

const MEDIUM_BY_VERB: Record<string, string> = {
  playing: "Game",
  reading: "Book",
  watching: "Film",
  "in rotation": "Music",
};

function monthOf(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-NZ", { month: "long", year: "numeric" });
}

function destinationLabel(href: string) {
  const host = new URL(href).hostname;
  if (host.endsWith("steampowered.com")) return "Open on Steam";
  if (host.endsWith("themoviedb.org")) return "Open on TMDB";
  if (host.endsWith("openlibrary.org")) return "Find on Open Library";
  if (host.endsWith("music.apple.com")) return "Find on Apple Music";
  return "Open source";
}

function sourceName(href?: string) {
  if (!href) return "No public source";

  const host = new URL(href).hostname;
  if (host.endsWith("steampowered.com")) return "Steam";
  if (host.endsWith("themoviedb.org")) return "TMDB";
  if (host.endsWith("openlibrary.org")) return "Open Library";
  if (host.endsWith("music.apple.com")) return "Apple Music";
  return host.replace(/^www\./, "");
}

export function CurrentlyInto() {
  const { now, regions, totalWorks, generatedAt } = canonFeed;
  const [expanded, setExpanded] = useState(false);
  const [instant, setInstant] = useState(false);
  const [selectedNowIndex, setSelectedNowIndex] = useState(0);
  const detailsId = useId();
  const cardRef = useRef<HTMLDivElement>(null);
  const selectedItem = now[selectedNowIndex] ?? now[0];
  const selectedSource = sourceName(selectedItem?.href);
  const selectedMedium = MEDIUM_BY_VERB[selectedItem?.verb] ?? "Work";
  const selectedPosition = `${String(selectedNowIndex + 1).padStart(2, "0")} / ${String(now.length).padStart(2, "0")}`;

  const selectRelativeItem = (direction: -1 | 1, keyboard = false) => {
    setInstant(keyboard);
    setSelectedNowIndex((current) => (current + direction + now.length) % now.length);
    setExpanded(true);
  };

  useEffect(() => {
    if (!expanded) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !cardRef.current?.contains(document.activeElement)) return;
      setInstant(true);
      setExpanded(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [expanded]);

  if (!now.length) return null;

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-sm border border-[hsl(var(--border))]/70 bg-[hsl(var(--background))]/50 p-4 transition-colors duration-300 hover:border-[hsl(var(--accent))]/30 hover:bg-[hsl(var(--muted))]/25"
    >
      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[hsl(var(--accent))]/60 transition-transform duration-500 ease-out group-hover:scale-x-100" />

      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={expanded ? detailsId : undefined}
        onClick={(event) => {
          setInstant(event.detail === 0);
          setExpanded((current) => !current);
        }}
        className="-m-2 flex min-h-11 w-[calc(100%+1rem)] items-center justify-between gap-3 rounded-sm p-2 text-left outline-none transition-transform active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] motion-reduce:transition-none"
        style={{
          transitionDuration: instant ? "0ms" : "150ms",
          transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]/80" />
          Currently into
        </span>
        <span className="flex min-w-0 items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="truncate">{monthOf(generatedAt)}</span>
          <span className="hidden text-muted-foreground sm:inline">
            {expanded ? "Close shelf" : "Open shelf"}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform motion-reduce:transition-none ${expanded ? "rotate-180" : "rotate-0"}`}
            style={{
              transitionDuration: instant ? "0ms" : "250ms",
              transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />
        </span>
      </button>

      <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-stretch">
        {/* the shelf — covers share a true baseline, each at natural aspect */}
        <div className="flex items-end gap-3" aria-label="Current media shelf">
          {now.map((item, index) => {
            const coverW = item.art ? Math.round((SHELF_H * item.art.w) / item.art.h) : 88;
            const colW = Math.max(coverW, 76);
            const selected = expanded && selectedNowIndex === index;
            return (
              <figure key={`${item.verb}-${item.title}`} className="min-w-0" style={{ width: colW }}>
                <div className="flex items-end" style={{ height: SHELF_H }}>
                  <button
                    type="button"
                    aria-label={`Show details for ${item.title}`}
                    aria-pressed={selected}
                    aria-controls={expanded ? detailsId : undefined}
                    onClick={(event) => {
                      setInstant(event.detail === 0);
                      setSelectedNowIndex(index);
                      setExpanded(true);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowRight") {
                        event.preventDefault();
                        selectRelativeItem(1, true);
                      } else if (event.key === "ArrowLeft") {
                        event.preventDefault();
                        selectRelativeItem(-1, true);
                      } else if (event.key === "Home") {
                        event.preventDefault();
                        setInstant(true);
                        setSelectedNowIndex(0);
                        setExpanded(true);
                      } else if (event.key === "End") {
                        event.preventDefault();
                        setInstant(true);
                        setSelectedNowIndex(now.length - 1);
                        setExpanded(true);
                      }
                    }}
                    className={`relative rounded-[4px] outline-none transition-transform active:scale-[0.975] focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] motion-reduce:transform-none motion-reduce:transition-none motion-reduce:active:scale-100 ${
                      selected ? "-translate-y-1 shadow-[0_7px_18px_-9px_hsl(var(--foreground)/0.5)] ring-1 ring-[hsl(var(--accent))]/60 motion-reduce:translate-y-0" : ""
                    }`}
                    style={{
                      height: SHELF_H,
                      width: coverW,
                      transitionDuration: instant ? "0ms" : "150ms",
                      transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                    }}
                  >
                    {item.art ? (
                      <Image
                        src={item.art.src}
                        alt=""
                        fill
                        sizes={`${coverW}px`}
                        className="rounded-[3px] border border-border/60 object-cover"
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center rounded-[3px] border border-border/60 bg-[hsl(var(--muted))] p-1 text-center text-[10px] leading-tight text-muted-foreground">
                        {item.title}
                      </span>
                    )}
                    {selected ? (
                      <span className="absolute inset-x-2 -bottom-2 h-0.5 rounded-full bg-[hsl(var(--accent))]" />
                    ) : null}
                  </button>
                </div>
                <figcaption className="mt-2 overflow-hidden" style={{ height: CAPTION_H }}>
                  <p className="truncate text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                    {item.verb}
                  </p>
                  <p className="line-clamp-2 text-xs font-medium leading-snug text-foreground" title={item.title}>
                    {item.title}
                  </p>
                  {item.creator ? (
                    <p className="truncate text-[11px] text-muted-foreground">{item.creator}</p>
                  ) : null}
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* right rail — the taste line up top, the code pulse at the bottom */}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 sm:min-w-[200px] sm:border-l sm:border-border/50 sm:pl-6">
          {regions.length >= 2 ? (
            <p className="max-w-[26rem] text-[13px] leading-relaxed text-muted-foreground">
              <span className="text-foreground">{totalWorks.toLocaleString()} works catalogued</span>{" "}
              across film, games, books and music — somewhere between{" "}
              {regions[0].toLowerCase()} and {regions[1].toLowerCase()}.
            </p>
          ) : null}
          <GitHubPulse />
        </div>
      </div>

      {expanded ? (
        <div
          id={detailsId}
          className="mt-5 grid gap-5 border-t border-border/50 pt-5 sm:grid-cols-[minmax(0,1.35fr)_minmax(12rem,0.65fr)]"
        >
          <section
            aria-labelledby={`${detailsId}-spotlight-title`}
            className="grid min-w-0 grid-cols-1 gap-4 rounded-sm border border-border/50 bg-[hsl(var(--muted))]/20 p-4 sm:grid-cols-[auto_minmax(0,1fr)]"
          >
            {selectedItem.art ? (
              <div
                className="relative self-start overflow-hidden rounded-[3px] border border-border/60 bg-[hsl(var(--muted))] shadow-[0_10px_24px_-16px_hsl(var(--foreground)/0.55)]"
                style={{
                  height: 148,
                  width: Math.max(96, Math.round((148 * selectedItem.art.w) / selectedItem.art.h)),
                }}
              >
                <Image
                  src={selectedItem.art.src}
                  alt={`${selectedItem.title} cover`}
                  fill
                  sizes="148px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-[148px] w-24 items-center justify-center rounded-[3px] border border-border/60 bg-[hsl(var(--muted))] p-2 text-center text-xs text-muted-foreground">
                {selectedItem.title}
              </div>
            )}

            <div className="flex min-w-0 flex-col justify-between gap-5">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[hsl(var(--accent))]">
                    {selectedItem.verb}
                  </p>
                  <p className="font-mono text-[10px] tabular-nums text-muted-foreground">
                    {selectedPosition}
                  </p>
                </div>
                <h3
                  id={`${detailsId}-spotlight-title`}
                  className="mt-2 text-balance text-lg font-medium leading-tight tracking-[-0.015em] text-foreground"
                >
                  {selectedItem.title}
                </h3>
                {selectedItem.creator ? (
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {selectedItem.creator}
                    {selectedItem.year ? `, ${selectedItem.year}` : ""}
                  </p>
                ) : selectedItem.year ? (
                  <p className="mt-1 text-xs text-muted-foreground">{selectedItem.year}</p>
                ) : null}

                {selectedItem.note ? (
                  <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-foreground/80">
                    {selectedItem.note}
                  </p>
                ) : null}

                <dl className="mt-4 grid max-w-sm grid-cols-3 gap-2 border-t border-border/40 pt-3">
                  <div className="min-w-0">
                    <dt className="text-[9px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      Medium
                    </dt>
                    <dd className="mt-1 truncate text-xs text-foreground">{selectedMedium}</dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-[9px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      Source
                    </dt>
                    <dd className="mt-1 truncate text-xs text-foreground">{selectedSource}</dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-[9px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      Snapshot
                    </dt>
                    <dd className="mt-1 truncate text-xs text-foreground">{monthOf(generatedAt)}</dd>
                  </div>
                </dl>

                {selectedItem.href ? (
                  <a
                    href={selectedItem.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-sm text-xs font-medium text-[hsl(var(--accent))] outline-none transition-[color,transform] duration-150 ease-out hover:text-foreground active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] motion-reduce:transition-none"
                  >
                    {destinationLabel(selectedItem.href)}
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>

              <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                Public Canon snapshot · {selectedPosition}
              </p>
            </div>
          </section>

          <section aria-labelledby={`${detailsId}-shelf-list`} className="min-w-0 sm:py-1">
            <p
              id={`${detailsId}-shelf-list`}
              className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
            >
              Current shelf
            </p>
            <div className="mt-2 space-y-1.5">
              {now.map((item, index) => {
                const selected = selectedNowIndex === index;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-current={selected ? "true" : undefined}
                    onClick={(event) => {
                      setInstant(event.detail === 0);
                      setSelectedNowIndex(index);
                    }}
                    className={`grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-sm px-2 py-1.5 text-left outline-none transition-[background-color,transform] active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] motion-reduce:transition-none ${
                      selected
                        ? "bg-[hsl(var(--accent))]/10 text-foreground"
                        : "text-muted-foreground hover:bg-[hsl(var(--muted))]/35 hover:text-foreground"
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-medium">{item.title}</span>
                      <span className="block truncate text-[10px] uppercase tracking-[0.1em]">
                        {MEDIUM_BY_VERB[item.verb] ?? item.verb}
                      </span>
                    </span>
                    <span className="font-mono text-[10px] tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Recent favourites
            </p>
            <ol className="mt-2 space-y-2.5">
              {canonFeed.loves.map((love) => (
                <li
                  key={`${love.title}-${love.creator ?? "unknown"}`}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 text-xs"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-foreground">{love.title}</span>
                    {love.creator ? (
                      <span className="block truncate text-[11px] text-muted-foreground">{love.creator}</span>
                    ) : null}
                  </span>
                  <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                    {love.rating}/10
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section
            aria-labelledby={`${detailsId}-taste-map`}
            className="border-t border-border/40 pt-4 sm:col-span-2 sm:grid sm:grid-cols-[minmax(12rem,0.8fr)_minmax(0,1.2fr)] sm:items-start sm:gap-6"
          >
            <div>
              <p
                id={`${detailsId}-taste-map`}
                className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
              >
                The wider canon
              </p>
              <p className="mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground">
                A living index of {totalWorks.toLocaleString()} works across the things I watch,
                play, read and keep in rotation.
              </p>
            </div>
            <ul className="mt-3 flex flex-wrap gap-1.5 sm:mt-0" aria-label="Taste regions">
              {regions.map((region) => (
                <li
                  key={region}
                  className="rounded-full border border-border/60 bg-[hsl(var(--muted))]/30 px-2.5 py-1 text-[10px] leading-tight text-muted-foreground"
                >
                  {region}
                </li>
              ))}
            </ul>
          </section>
        </div>
      ) : null}
    </div>
  );
}
