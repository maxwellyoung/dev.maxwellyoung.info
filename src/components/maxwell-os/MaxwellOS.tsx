"use client";
// The Maxwell OS shell: menu bar, desktop, windows, persistence.
// Rendered client-only (see MaxwellOSLoader) so the saved session can be read
// synchronously during the first render instead of after a hydration flash.
import { useCallback, useEffect, useReducer, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Maximize2, Minimize2, X } from "lucide-react";
import { MENU_BAR, initialOSState, topWindow, windowReducer, type AppId, type OSState, type OSWindow, type WindowPayload } from "@/lib/maxwellOS";
import { canonFeed } from "@/lib/canonFeed";
import { canonShelfItems } from "@/lib/canonShelf";
import { independentApps } from "@/lib/projects";
import styles from "./MaxwellOS.module.css";
import { AppsApp, ReadMe, Shelf, Terminal, WorkApp, appIconSrc, workProjects } from "./apps";

type AppMeta = { id: AppId; title: string; size: { width: number; height: number } };
const APPS: AppMeta[] = [
  { id: "readme", title: "Read me", size: { width: 560, height: 600 } },
  { id: "work", title: "Work", size: { width: 900, height: 620 } },
  { id: "apps", title: "Apps", size: { width: 860, height: 620 } },
  { id: "shelf", title: "Shelf", size: { width: 720, height: 600 } },
  { id: "terminal", title: "Terminal", size: { width: 640, height: 420 } },
];
const meta = (id: AppId) => APPS.find((a) => a.id === id)!;

export type OSApi = {
  open: (id: AppId, payload?: WindowPayload, opts?: { keyboard?: boolean }) => void;
  exit: () => void;
};

const STORAGE = "maxwell-os:v3";
function loadSession(): OSState | null {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) return windowReducer(initialOSState, { type: "hydrate", state: JSON.parse(raw) as OSState, viewport: { width: innerWidth, height: innerHeight } });
  } catch {}
  return null;
}
const viewport = () => ({ width: innerWidth, height: innerHeight });

function useAucklandClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-NZ", { hour: "numeric", minute: "2-digit", timeZone: "Pacific/Auckland" });
    const tick = () => setTime(format.format(new Date()).replace(/\s/g, " "));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function MaxwellOS() {
  // First visit on a wide screen opens the Read me; phones start on the home screen.
  const [os, dispatch] = useReducer(windowReducer, undefined, () => loadSession() ?? (innerWidth > 900 ? windowReducer(initialOSState, { type: "open", app: "readme", title: "Read me", size: meta("readme").size, viewport: viewport() }) : initialOSState));
  // Windows opened from the keyboard appear instantly; pointer opens get a short entrance.
  const [instant, setInstant] = useState<Set<string>>(() => new Set(os.windows.map((w) => w.id)));
  const clock = useAucklandClock();
  const top = topWindow(os);
  const rotation = canonShelfItems(canonFeed.now).find((item) => item.verb === "in rotation");

  const open = useCallback((id: AppId, payload?: WindowPayload, opts?: { keyboard?: boolean }) => {
    setInstant((s) => { const next = new Set(s); if (opts?.keyboard) next.add(id); else next.delete(id); return next; });
    dispatch({ type: "open", app: id, title: meta(id).title, payload, size: meta(id).size, viewport: viewport() });
  }, []);
  const close = useCallback((id: string) => {
    dispatch({ type: "close", id });
    // Return focus to the icon that opened it, so keyboard users don't land on <body>.
    requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-launch="${id}"]`)?.focus({ preventScroll: true }));
  }, []);
  const api: OSApi = { open, exit: () => location.assign("/") };

  useEffect(() => { try { localStorage.setItem(STORAGE, JSON.stringify(os)); } catch {} }, [os]);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key === "Tab" && event.ctrlKey) { event.preventDefault(); dispatch({ type: "cycle", direction: event.shiftKey ? -1 : 1 }); return; }
      if (event.key !== "Escape" || event.defaultPrevented) return;
      const current = topWindow(os);
      if (current) close(current.id);
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [os, close]);

  return (
    <main id="main-content" className={styles.os} aria-label="Maxwell OS">
      <header className={styles.menuBar}>
        <strong className={styles.wordmark}>Maxwell OS</strong>
        {rotation && (
          <button type="button" className={styles.nowPlaying} onClick={(e) => open("shelf", undefined, { keyboard: e.detail === 0 })} title="In rotation, from Canon">
            <span aria-hidden className={styles.eq}><i /><i /><i /></span>
            <span className={styles.nowText}>{rotation.creator ? `${rotation.creator} — ` : ""}{rotation.title}</span>
          </button>
        )}
        <span className={styles.clock} aria-label={`Auckland time ${clock}`}><span className={styles.clockPlace}>Auckland </span>{clock}</span>
        <Link href="/" className={styles.exit}>Exit</Link>
      </header>

      <nav className={styles.icons} aria-label="Desktop">
        {APPS.map((a) => (
          <button key={a.id} type="button" data-launch={a.id} className={styles.icon} aria-current={os.windows.some((w) => w.id === a.id) ? "true" : undefined} onClick={(e) => open(a.id, undefined, { keyboard: e.detail === 0 })}>
            <AppIcon id={a.id} />
            <span>{a.title}</span>
          </button>
        ))}
      </nav>

      {rotation && (
        <button type="button" className={styles.widget} onClick={(e) => open("shelf", undefined, { keyboard: e.detail === 0 })}>
          {rotation.art && <span className={styles.widgetArt}><Image src={`${rotation.art.src}?v=${encodeURIComponent(canonFeed.generatedAt)}`} alt="" fill sizes="64px" /></span>}
          <span className={styles.widgetText}><small>In rotation</small><b>{rotation.title}</b>{rotation.creator && <span>{rotation.creator}</span>}</span>
        </button>
      )}

      <p className={styles.colophon}>Ctrl Tab switches windows · Esc closes · drag a title bar to move</p>

      {os.windows.map((w) => (
        <WindowFrame key={w.id} w={w} active={top?.id === w.id} instant={instant.has(w.id)} dispatch={dispatch} close={close}>
          <App w={w} api={api} />
        </WindowFrame>
      ))}
    </main>
  );
}

/** Desktop icons are made from the real material each app contains. */
function AppIcon({ id }: { id: AppId }) {
  if (id === "readme") return <span aria-hidden className={`${styles.art} ${styles.artPage}`}><i /><i /><i /><i /></span>;
  if (id === "terminal") return <span aria-hidden className={`${styles.art} ${styles.artTerminal}`}>&gt;_</span>;
  const srcs =
    id === "work" ? workProjects.slice(0, 3).map((p) => p.cover?.src ?? p.thumb) :
    id === "apps" ? independentApps.slice(0, 4).map((p) => appIconSrc(p.slug) ?? p.thumb) :
    canonFeed.now.map((n) => n.art?.src).slice(0, 3);
  return (
    <span aria-hidden className={`${styles.art} ${styles.artImages}`} data-art={id}>
      {srcs.filter((s): s is string => Boolean(s)).map((src) => <span key={src}><Image src={src} alt="" fill sizes="40px" /></span>)}
    </span>
  );
}

type Drag = { mode: "move" | "resize"; startX: number; startY: number; x: number; y: number; width: number; height: number };

function WindowFrame({ w, active, instant, dispatch, close, children }: { w: OSWindow; active: boolean; instant: boolean; dispatch: React.Dispatch<Parameters<typeof windowReducer>[1]>; close: (id: string) => void; children: React.ReactNode }) {
  const drag = useRef<Drag | null>(null);
  const ref = useRef<HTMLElement>(null);
  // Move focus into a window when it comes to the front, unless the pointer is already inside it.
  useEffect(() => { if (active && !ref.current?.contains(document.activeElement)) ref.current?.focus({ preventScroll: true }); }, [active]);
  const begin = (mode: Drag["mode"], e: ReactPointerEvent<HTMLElement>) => {
    if (w.maximized || e.button !== 0 || (e.target as HTMLElement).closest("button") || matchMedia("(max-width: 640px)").matches) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { mode, startX: e.clientX, startY: e.clientY, x: w.x, y: w.y, width: w.width, height: w.height };
  };
  const track = (e: ReactPointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.startX, dy = e.clientY - d.startY;
    if (d.mode === "move") dispatch({ type: "move", id: w.id, x: Math.min(innerWidth - 120, d.x + dx), y: Math.min(innerHeight - 60, d.y + dy) });
    else dispatch({ type: "resize", id: w.id, width: Math.min(innerWidth - w.x - 8, d.width + dx), height: Math.min(innerHeight - w.y - 8, d.height + dy) });
  };
  const end = () => { drag.current = null; };
  const frame = w.maximized ? { zIndex: w.z, top: MENU_BAR } : { left: w.x, top: w.y, width: w.width, height: w.height, zIndex: w.z };
  return (
    <section
      ref={ref}
      tabIndex={-1}
      className={`${styles.window} ${w.maximized ? styles.max : ""} ${active ? styles.active : ""} ${instant ? "" : styles.enter}`}
      style={frame}
      onPointerDownCapture={() => !active && dispatch({ type: "focus", id: w.id })}
      aria-labelledby={`os-title-${w.id}`}
    >
      <header className={styles.titleBar} onPointerDown={(e) => begin("move", e)} onPointerMove={track} onPointerUp={end} onPointerCancel={end} onDoubleClick={(e) => !(e.target as HTMLElement).closest("button") && dispatch({ type: "maximize", id: w.id })}>
        <h2 id={`os-title-${w.id}`}>{w.title}</h2>
        <div className={styles.controls}>
          <button type="button" className={styles.zoom} aria-label={w.maximized ? "Restore window size" : "Fill the screen"} onClick={() => dispatch({ type: "maximize", id: w.id })}>{w.maximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}</button>
          <button type="button" aria-label={`Close ${w.title}`} onClick={() => close(w.id)}><X size={16} /><span className={styles.closeLabel}>Close</span></button>
        </div>
      </header>
      <div className={styles.content}>{children}</div>
      {!w.maximized && <i className={styles.resizer} aria-hidden onPointerDown={(e) => begin("resize", e)} onPointerMove={track} onPointerUp={end} onPointerCancel={end} />}
    </section>
  );
}

function App({ w, api }: { w: OSWindow; api: OSApi }) {
  switch (w.app) {
    case "readme": return <ReadMe api={api} />;
    case "work": return <WorkApp slug={w.payload?.slug} />;
    case "apps": return <AppsApp slug={w.payload?.slug} />;
    case "shelf": return <Shelf />;
    case "terminal": return <Terminal api={api} />;
  }
}
