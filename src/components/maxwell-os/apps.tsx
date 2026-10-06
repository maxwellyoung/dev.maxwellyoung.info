"use client";
// The five Maxwell OS apps. Each one reads the same data as the portfolio:
// Read me, Work (projects), Apps (shipped iPhone apps), Shelf (Canon), Terminal.
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { displayPath, runCommand } from "@/lib/maxwellOS";
import { independentApps, rankedProjects, type Project } from "@/lib/projects";
import { resumeData } from "@/lib/resumeData";
import { canonFeed } from "@/lib/canonFeed";
import { canonMediumName, canonShelfItems, canonSourceName } from "@/lib/canonShelf";
import { formatCanonExportDate } from "@/lib/canonFormatting";
import styles from "./MaxwellOS.module.css";
import type { OSApi } from "./MaxwellOS";

const appSlugs = new Set(independentApps.map((p) => p.slug));
/** Everything in the portfolio that isn't one of the shipped iPhone apps. */
export const workProjects = rankedProjects.filter((p) => !appSlugs.has(p.slug));

/** App Store icons exist for some apps; the rest use their first screenshot. */
export function appIconSrc(slug: string): string | undefined {
  return ({ "vape-quit-coach": "/projectImages/vqc-icon.png", afterlight: "/projectImages/afterlight-icon.png" } as Record<string, string>)[slug];
}

// ---------------------------------------------------------------- Read me
export function ReadMe({ api }: { api: OSApi }) {
  const r = resumeData;
  const go = (id: "work" | "apps" | "shelf" | "terminal") => (e: React.MouseEvent) => api.open(id, undefined, { keyboard: e.detail === 0 });
  const rows = [
    { id: "work" as const, name: "Work", text: "Silk, research software, Liner, T3 Craft, and the rest." },
    { id: "apps" as const, name: "Apps", text: `The ${independentApps.length} iPhone apps I've designed, built and shipped myself.` },
    { id: "shelf" as const, name: "Shelf", text: "What I'm watching, playing and listening to, from Canon." },
    { id: "terminal" as const, name: "Terminal", text: "For people who would rather type." },
  ];
  return (
    <article className={styles.readme}>
      <h1>Hi, I&apos;m Maxwell.</h1>
      <p>This is my portfolio laid out like the computer I work on. Nothing here is filler: the projects, apps and shelf are read from the same data as the main site.</p>
      <p>I&apos;m a product engineer in Auckland. I lead React Native at Silk, design and build research applications at the University of Auckland, and ship my own iPhone apps through ninetynine digital. I make music too, so some of what I build is for that: Liner for songs and releases, Playback for performance takes.</p>
      <ul className={styles.launchList}>
        {rows.map((row) => (
          <li key={row.id}>
            <button type="button" onClick={go(row.id)}><b>{row.name}</b><span>{row.text}</span></button>
          </li>
        ))}
      </ul>
      <p className={styles.readmeLinks}>
        <Link href="/resume">Resume</Link>
        <a href={`https://${r.contact.github}`} target="_blank" rel="noreferrer">GitHub</a>
        <a href={`mailto:${r.contact.email}`}>{r.contact.email}</a>
      </p>
    </article>
  );
}

// ---------------------------------------------------------------- Work and Apps
function projectMeta(p: Project) {
  // The homepage's metadata grammar: role only when it isn't Solo, then stage, then main tool.
  return [p.role === "Solo" ? undefined : p.role, p.launchStage, p.stack?.[0] ?? p.tags?.[0]].filter(Boolean).join(" · ");
}

function linkLabel(href: string) {
  const host = new URL(href, "https://dev.maxwellyoung.info").hostname;
  if (host === "apps.apple.com") return "App Store";
  if (host === "play.google.com") return "Google Play";
  if (host === "github.com") return "GitHub";
  if (host.endsWith("youtube.com")) return "Watch";
  return "Visit";
}

function projectLinks(p: Project) {
  const links: { label: string; href: string; internal?: boolean }[] = [];
  if (p.caseStudySlug) links.push({ label: "Case study", href: `/case-study/${p.caseStudySlug}`, internal: true });
  const live = p.links?.live ?? p.link;
  const source = p.codeLink ?? p.links?.repo;
  if (live && live !== source) links.push({ label: linkLabel(live), href: live });
  if (source) links.push({ label: "Source", href: source });
  if (p.links?.video) links.push({ label: "Watch demo", href: p.links.video });
  return links;
}

function Catalog({ projects, slug, kind }: { projects: Project[]; slug?: string; kind: "work" | "apps" }) {
  const [selected, setSelected] = useState(() => (projects.some((p) => p.slug === slug) ? slug! : projects[0].slug));
  // On phones the list and the detail are separate screens.
  const [showDetail, setShowDetail] = useState(Boolean(slug));
  const [prevSlug, setPrevSlug] = useState(slug);
  if (slug !== prevSlug) {
    setPrevSlug(slug);
    if (slug && projects.some((p) => p.slug === slug)) { setSelected(slug); setShowDetail(true); }
  }
  const detail = useRef<HTMLDivElement>(null);
  useEffect(() => { detail.current?.scrollTo({ top: 0 }); }, [selected]);
  const p = projects.find((x) => x.slug === selected) ?? projects[0];
  const keys = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const i = projects.findIndex((x) => x.slug === selected);
    const next = projects[(i + (e.key === "ArrowDown" ? 1 : -1) + projects.length) % projects.length];
    setSelected(next.slug);
    e.currentTarget.querySelector<HTMLElement>(`[data-slug="${next.slug}"]`)?.focus();
  };
  return (
    <div className={`${styles.catalog} ${showDetail ? styles.catalogDetail : ""}`}>
      <ul className={styles.catalogList} onKeyDown={keys} aria-label={kind === "work" ? "Projects" : "Apps"}>
        {projects.map((x) => (
          <li key={x.slug}>
            <button type="button" data-slug={x.slug} aria-current={x.slug === p.slug ? "true" : undefined} tabIndex={x.slug === p.slug ? 0 : -1} onClick={() => { setSelected(x.slug); setShowDetail(true); }}>
              {kind === "apps" && <span className={styles.appIcon}><Image src={appIconSrc(x.slug) ?? x.thumb ?? ""} alt="" fill sizes="40px" /></span>}
              <span className={styles.rowText}><b>{x.name}</b><small>{kind === "apps" ? x.launchStage : projectMeta(x)}</small></span>
            </button>
          </li>
        ))}
      </ul>
      <div ref={detail} className={styles.catalogBody}>
        <button type="button" className={styles.back} onClick={() => setShowDetail(false)}><ChevronLeft size={16} aria-hidden />{kind === "work" ? "Work" : "Apps"}</button>
        {kind === "work" ? <WorkDetail p={p} /> : <AppDetail p={p} />}
      </div>
    </div>
  );
}

function Links({ p }: { p: Project }) {
  const links = projectLinks(p);
  if (!links.length) return null;
  return (
    <p className={styles.links}>
      {links.map((l) => l.internal ? <Link key={l.href} href={l.href}>{l.label}</Link> : <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label}<ArrowUpRight size={13} aria-hidden /></a>)}
    </p>
  );
}

function WorkDetail({ p }: { p: Project }) {
  const src = p.cover?.src ?? p.thumb;
  const contain = p.cover?.fit === "contain" || p.cover?.variant === "device";
  return (
    <article className={styles.detail}>
      {src && (
        <figure className={`${styles.cover} ${contain ? styles.coverContain : ""}`}>
          <Image key={src} src={src} alt={p.cover?.alt ?? p.name} fill sizes="(max-width: 640px) 100vw, 600px" style={{ objectFit: contain ? "contain" : "cover", objectPosition: p.cover?.objectPosition }} />
        </figure>
      )}
      <h2>{p.name}</h2>
      <p className={styles.meta}>{projectMeta(p)}</p>
      <p>{p.longDescription ?? p.description}</p>
      {p.impact?.length ? <ul className={styles.impact}>{p.impact.map((i) => <li key={i}>{i}</li>)}</ul> : null}
      <Links p={p} />
    </article>
  );
}

function AppDetail({ p }: { p: Project }) {
  const shots = p.screenshots?.length ? p.screenshots : p.thumb ? [p.thumb] : [];
  return (
    <article className={styles.detail}>
      <header className={styles.appHeader}>
        <span className={`${styles.appIcon} ${styles.appIconLarge}`}><Image src={appIconSrc(p.slug) ?? p.thumb ?? ""} alt="" fill sizes="72px" /></span>
        <div><h2>{p.name}</h2><p className={styles.meta}>{[p.launchStage, p.stack?.[0]].filter(Boolean).join(" · ")}</p></div>
      </header>
      <p>{p.description}</p>
      <div className={styles.shots} tabIndex={0} aria-label={`${p.name} screenshots`}>
        {shots.map((src, i) => <span key={src} className={styles.shot}><Image src={src} alt={`${p.name} screenshot ${i + 1}`} fill sizes="180px" /></span>)}
      </div>
      {p.longDescription && <p>{p.longDescription}</p>}
      <Links p={p} />
    </article>
  );
}

export const WorkApp = ({ slug }: { slug?: string }) => <Catalog projects={workProjects} slug={slug} kind="work" />;
export const AppsApp = ({ slug }: { slug?: string }) => <Catalog projects={independentApps} slug={slug} kind="apps" />;

// ---------------------------------------------------------------- Shelf
const VERB: Record<string, string> = { watched: "Watched", watching: "Watching", playing: "Playing", reading: "Reading", "in rotation": "In rotation", catalogued: "From the catalog" };

export function Shelf() {
  const items = canonShelfItems(canonFeed.now);
  const sources = [...new Set(items.map((i) => canonSourceName(i)))].join(", ");
  return (
    <div className={styles.shelf}>
      <p className={styles.shelfIntro}>
        Pulled from Canon, my catalog of {canonFeed.totalWorks.toLocaleString("en-NZ")} films, shows, games, books and albums.
        Lately I lean toward {listify(canonFeed.regions.map((r) => r.toLowerCase()))}.
      </p>
      <ul className={styles.covers}>
        {items.map((item) => {
          const body = (
            <>
              <span className={styles.coverArt} style={{ aspectRatio: item.art ? `${item.art.w} / ${item.art.h}` : "2 / 3" }}>
                {item.art ? <Image src={`${item.art.src}?v=${encodeURIComponent(canonFeed.generatedAt)}`} alt={`${item.title} cover`} fill sizes="160px" /> : <span>{item.title}</span>}
              </span>
              <small>{VERB[item.verb] ?? item.verb} · {canonMediumName(item)}</small>
              <b>{item.title}</b>
              {item.creator && <span>{item.creator}</span>}
            </>
          );
          return <li key={item.id}>{item.href ? <a href={item.href} target="_blank" rel="noreferrer">{body}</a> : body}</li>;
        })}
      </ul>
      {canonFeed.loves.length > 0 && (
        <section className={styles.loves}>
          <h3>Rated 10 out of 10, recently</h3>
          <ul>{canonFeed.loves.map((l) => <li key={l.title}><b>{l.title}</b>{l.creator && <span>{l.creator}</span>}</li>)}</ul>
        </section>
      )}
      <p className={styles.footnote}>Snapshot {formatCanonExportDate(canonFeed.generatedAt)}{sources ? ` · via ${sources}` : ""}</p>
    </div>
  );
}

function listify(words: string[]) {
  if (words.length < 2) return words.join("");
  return `${words.slice(0, -1).join(", ")} and ${words.at(-1)}`;
}

// ---------------------------------------------------------------- Terminal
export function Terminal({ api }: { api: OSApi }) {
  const [lines, setLines] = useState<string[]>(["Maxwell OS. The files here are the portfolio.", "Type help, or try: open liner", ""]);
  const [cwd, setCwd] = useState<string[]>([]);
  const [q, setQ] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const scroller = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { scroller.current?.scrollTo({ top: scroller.current.scrollHeight }); }, [lines]);
  const prompt = `guest@maxwell ${displayPath(cwd)} %`;
  function go(e: FormEvent) {
    e.preventDefault();
    const r = runCommand(q, { cwd, now: new Date().toLocaleString("en-NZ", { timeZone: "Pacific/Auckland", dateStyle: "full", timeStyle: "short" }) + " in Auckland" });
    setLines((x) => (r.clear ? [] : [...x, `${prompt} ${q}`, ...(r.output ? r.output.split("\n") : [])]));
    if (q.trim()) setHistory((h) => [q, ...h].slice(0, 50));
    setCursor(-1);
    if (r.cwd) setCwd(r.cwd);
    if (r.exit) api.exit();
    if (r.open) api.open(r.open, r.payload, { keyboard: true });
    setQ("");
  }
  const keys = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    const next = Math.max(-1, Math.min(history.length - 1, cursor + (e.key === "ArrowUp" ? 1 : -1)));
    setCursor(next);
    setQ(next === -1 ? "" : history[next]);
  };
  return (
    <div ref={scroller} className={styles.terminal} onClick={() => { if (!getSelection()?.toString()) input.current?.focus(); }}>
      {lines.map((l, i) => <div key={i}>{l || " "}</div>)}
      <form onSubmit={go}>
        <label htmlFor="os-terminal-input">{prompt}</label>
        <input id="os-terminal-input" ref={input} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={keys} autoFocus spellCheck={false} autoCapitalize="off" autoComplete="off" autoCorrect="off" enterKeyHint="go" />
      </form>
    </div>
  );
}
