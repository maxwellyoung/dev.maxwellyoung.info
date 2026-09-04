"use client";
// The Maxwell OS shell: desktop, windows, taskbar, Start menu, persistence.
// Rendered client-only (see MaxwellOSLoader) so the saved session can be read
// synchronously during the first render instead of after a hydration flash.
import { useCallback, useEffect, useReducer, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { defaultPrefs, initialOSState, schemeById, topWindow, wallpaperById, windowReducer, type AppId, type OSPrefs, type OSState, type OSWindow, type WindowPayload } from "@/lib/maxwellOS";
import styles from "./MaxwellOS.module.css";
import { About, Browser, Files, Help, Notepad, Settings, Terminal, Trash } from "./apps";
import { Ants, Mines, Snake, Story } from "./games";

export type AppMeta = { id: AppId; title: string; icon: string; size?: { width: number; height: number } };
export const apps: AppMeta[] = [
  { id: "files", title: "My Computer", icon: "PC", size: { width: 760, height: 520 } },
  { id: "about", title: "About Maxwell", icon: "MY", size: { width: 560, height: 480 } },
  { id: "browser", title: "Internet", icon: "WWW", size: { width: 720, height: 560 } },
  { id: "notes", title: "Notepad", icon: "TXT", size: { width: 640, height: 520 } },
  { id: "terminal", title: "MS-DOS Prompt", icon: "C:", size: { width: 680, height: 440 } },
  { id: "mines", title: "Minesweeper", icon: "*", size: { width: 420, height: 500 } },
  { id: "snake", title: "Snake", icon: "S", size: { width: 460, height: 560 } },
  { id: "adventure", title: "Elsewhere", icon: "MOON", size: { width: 900, height: 620 } },
  { id: "office", title: "The Office", icon: "DOOR", size: { width: 820, height: 600 } },
  { id: "settings", title: "Display Properties", icon: "CFG", size: { width: 520, height: 540 } },
  { id: "help", title: "Help", icon: "?", size: { width: 560, height: 480 } },
  { id: "trash", title: "Recycle Bin", icon: "BIN", size: { width: 420, height: 380 } },
];
const DESKTOP_ICONS: AppId[] = ["files", "about", "browser", "terminal", "adventure", "office", "trash"];

export type OSApi = {
  open: (id: AppId, payload?: WindowPayload, title?: string) => void;
  close: (id: string) => void;
  release: () => void;
  exit: () => void;
  prefs: OSPrefs;
  setPrefs: (prefs: OSPrefs) => void;
};

export function PixelIcon({ name, small = false }: { name: string; small?: boolean }) {
  return <span aria-hidden className={`${styles.pixelIcon} ${small ? styles.pixelIconSmall : ""}`} data-icon={name}><i /></span>;
}

const STORAGE = "maxwell-os:v2";
type Session = { os: OSState; prefs: OSPrefs };
function loadSession(): Session {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) {
      const saved = JSON.parse(raw) as Partial<Session>;
      const os = saved.os ? windowReducer(initialOSState, { type: "hydrate", state: saved.os, viewport: { width: innerWidth, height: innerHeight } }) : initialOSState;
      return { os, prefs: { ...defaultPrefs, ...saved.prefs } };
    }
  } catch {}
  return { os: initialOSState, prefs: defaultPrefs };
}

export default function MaxwellOS() {
  const session = useRef<Session | null>(null);
  const boot = () => (session.current ??= loadSession());
  const [os, dispatch] = useReducer(windowReducer, undefined, () => boot().os);
  const [prefs, setPrefs] = useState<OSPrefs>(() => boot().prefs);
  const [start, setStart] = useState(false);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const [ants, setAnts] = useState({ active: false, count: 0, generation: 0 });
  const [clock, setClock] = useState("");
  const top = topWindow(os);

  const open = useCallback((id: AppId, payload?: WindowPayload, title?: string) => {
    const meta = apps.find((a) => a.id === id)!;
    dispatch({ type: "open", app: id, title: title ?? meta.title, payload, size: meta.size });
    setStart(false);
    setMenu(null);
  }, []);
  const api: OSApi = {
    open,
    close: (id) => dispatch({ type: "close", id }),
    release: () => setAnts((s) => ({ active: true, count: Math.max(s.count, 18), generation: s.generation })),
    exit: () => location.assign("/"),
    prefs,
    setPrefs,
  };

  useEffect(() => { try { localStorage.setItem(STORAGE, JSON.stringify({ os, prefs })); } catch {} }, [os, prefs]);
  useEffect(() => { const tick = () => setClock(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })); tick(); const id = setInterval(tick, 1000); return () => clearInterval(id); }, []);
  useEffect(() => { if (!ants.active) return; const id = setInterval(() => setAnts((s) => ({ ...s, count: Math.min(80, s.count + 12) })), 3500); return () => clearInterval(id); }, [ants.active]);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      const editing = /INPUT|TEXTAREA/.test((event.target as HTMLElement)?.tagName ?? "");
      if (event.key === "Tab" && (event.altKey || event.ctrlKey)) { event.preventDefault(); dispatch({ type: "cycle", direction: event.shiftKey ? -1 : 1 }); return; }
      if (event.key !== "Escape") return;
      if (start || menu) { setStart(false); setMenu(null); return; }
      if (editing) { (event.target as HTMLElement).blur(); return; }
      const current = topWindow(os);
      if (current) dispatch({ type: "close", id: current.id }); else location.assign("/");
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [os, start, menu]);

  const scheme = schemeById(prefs.scheme);
  const wallpaper = wallpaperById(prefs.wallpaper);
  const rootStyle = { "--os-desktop": scheme.desktop, "--os-face": scheme.face, "--os-title-a": scheme.titleA, "--os-title-b": scheme.titleB, "--os-text": scheme.text, "--os-link": scheme.link, backgroundImage: wallpaper.css } as React.CSSProperties;
  const openIcon = (id: AppId) => (event: React.MouseEvent) => { if (matchMedia("(hover: none)").matches || event.detail >= 2) open(id); };

  return (
    <main className={styles.os} style={rootStyle} onClick={() => { if (menu) setMenu(null); if (start) setStart(false); }} onContextMenu={(e) => { if ((e.target as HTMLElement).closest(`.${styles.window}`)) return; e.preventDefault(); setMenu({ x: e.clientX, y: e.clientY }); }}>
      <div className={styles.wallmark}>MAXWELL<br /><span>PROFESSIONAL</span></div>
      <div className={styles.icons}>
        {DESKTOP_ICONS.map((id) => { const a = apps.find((x) => x.id === id)!; return <button key={id} onClick={openIcon(id)} onKeyDown={(e) => e.key === "Enter" && open(id)}><PixelIcon name={a.icon} /><span>{a.title}</span></button>; })}
      </div>
      {os.windows.map((w) => !w.minimized && (
        <WindowFrame key={w.id} w={w} active={top?.id === w.id} dispatch={dispatch} icon={apps.find((a) => a.id === w.app)?.icon ?? "?"}>
          <App w={w} api={api} />
        </WindowFrame>
      ))}
      {ants.active && <Ants count={ants.count} generation={ants.generation} clear={() => setAnts((s) => ({ active: false, count: 0, generation: s.generation + 1 }))} />}
      {menu && <div className={styles.context} style={{ left: Math.min(menu.x, innerWidth - 160), top: Math.min(menu.y, innerHeight - 160) }}><button onClick={() => open("files")}>Open</button><button onClick={() => open("terminal")}>Command Prompt</button><hr /><button onClick={() => open("settings")}>Properties</button><button onClick={() => setMenu(null)}>Refresh</button></div>}
      <div className={styles.taskbar}>
        <button className={`${styles.start} ${start ? styles.startOpen : ""}`} aria-expanded={start} onClick={(e) => { e.stopPropagation(); setStart(!start); }}><i>▦</i> Start</button>
        {os.windows.map((w) => <button key={w.id} className={`${styles.task} ${top?.id === w.id && !w.minimized ? styles.taskActive : ""}`} onClick={() => dispatch(top?.id === w.id && !w.minimized ? { type: "minimize", id: w.id } : { type: "focus", id: w.id })}><PixelIcon name={apps.find((a) => a.id === w.app)?.icon ?? "?"} small />{w.title}</button>)}
        <div className={`${styles.tray} ${ants.active ? styles.trayAlert : ""}`}>{ants.active ? `⚠ ANTS ${ants.count}` : "VOL"}　{clock}</div>
      </div>
      {start && (
        <div className={styles.startMenu} onClick={(e) => e.stopPropagation()}>
          <aside>MAXWELL <b>OS</b></aside>
          <div>
            {apps.filter((a) => !["settings", "help"].includes(a.id)).map((a) => <button key={a.id} onClick={() => open(a.id)}><PixelIcon name={a.icon} small />{a.title}<span>›</span></button>)}
            <hr />
            <button onClick={() => open("settings")}><PixelIcon name="CFG" small />Settings<span>›</span></button>
            <button onClick={() => open("help")}><PixelIcon name="?" small />Help<span>›</span></button>
            <hr />
            <Link href="/"><PixelIcon name="OFF" small />Shut Down...</Link>
          </div>
        </div>
      )}
    </main>
  );
}

type Drag = { mode: "move" | "resize"; startX: number; startY: number; x: number; y: number; width: number; height: number };

function WindowFrame({ w, active, dispatch, icon, children }: { w: OSWindow; active: boolean; dispatch: React.Dispatch<Parameters<typeof windowReducer>[1]>; icon: string; children: React.ReactNode }) {
  const drag = useRef<Drag | null>(null);
  const begin = (mode: Drag["mode"], e: ReactPointerEvent<HTMLElement>) => {
    if (w.maximized || (e.target as HTMLElement).closest("button")) return;
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { mode, startX: e.clientX, startY: e.clientY, x: w.x, y: w.y, width: w.width, height: w.height };
  };
  const track = (e: ReactPointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.startX, dy = e.clientY - d.startY;
    if (d.mode === "move") dispatch({ type: "move", id: w.id, x: Math.min(innerWidth - 80, d.x + dx), y: Math.min(innerHeight - 90, d.y + dy) });
    else dispatch({ type: "resize", id: w.id, width: d.width + dx, height: d.height + dy });
  };
  const end = () => { drag.current = null; };
  const frame = w.maximized ? { zIndex: w.z } : { left: w.x, top: w.y, width: w.width, height: w.height, zIndex: w.z };
  return (
    <section className={`${styles.window} ${w.maximized ? styles.max : ""} ${active ? "" : styles.inactive}`} style={frame} onPointerDownCapture={() => !active && dispatch({ type: "focus", id: w.id })} aria-label={w.title}>
      <header onPointerDown={(e) => begin("move", e)} onPointerMove={track} onPointerUp={end} onPointerCancel={end} onDoubleClick={() => dispatch({ type: "maximize", id: w.id })}>
        <PixelIcon name={icon} small /><strong>{w.title}</strong>
        <div><button aria-label="Minimize" onClick={() => dispatch({ type: "minimize", id: w.id })}>_</button><button aria-label={w.maximized ? "Restore" : "Maximize"} onClick={() => dispatch({ type: "maximize", id: w.id })}>{w.maximized ? "❐" : "□"}</button><button aria-label="Close" onClick={() => dispatch({ type: "close", id: w.id })}>×</button></div>
      </header>
      <div className={styles.content}>{children}</div>
      {!w.maximized && <i className={styles.resizer} aria-hidden onPointerDown={(e) => begin("resize", e)} onPointerMove={track} onPointerUp={end} onPointerCancel={end} />}
    </section>
  );
}

function App({ w, api }: { w: OSWindow; api: OSApi }) {
  const path = w.payload?.path;
  switch (w.app) {
    case "files": return <Files key={path?.join("/") ?? ""} api={api} path={path} />;
    case "notes": return <Notepad api={api} path={path} />;
    case "terminal": return <Terminal api={api} />;
    case "settings": return <Settings api={api} windowId={w.id} />;
    case "browser": return <Browser api={api} />;
    case "about": return <About />;
    case "help": return <Help />;
    case "trash": return <Trash api={api} />;
    case "mines": return <Mines />;
    case "snake": return <Snake />;
    case "adventure": return <Story kind="adventure" />;
    case "office": return <Story kind="office" />;
  }
}
