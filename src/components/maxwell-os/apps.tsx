"use client";
// Productivity apps: My Computer, Notepad, MS-DOS Prompt, Display Properties,
// Internet, About, Help, Recycle Bin.
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { FILESYSTEM, SCHEMES, WALLPAPERS, displayPath, runCommand, traverse, type FileNode, type OSPrefs } from "@/lib/maxwellOS";
import { resumeData } from "@/lib/resumeData";
import { flagshipProjects } from "@/lib/projects";
import { essays } from "@/lib/essays";
import styles from "./MaxwellOS.module.css";
import type { OSApi } from "./MaxwellOS";

const isTouch = () => matchMedia("(hover: none)").matches;

function openNode(api: OSApi, path: string[], node: FileNode, setCwd?: (p: string[]) => void) {
  if (node.kind === "folder") return setCwd ? setCwd(path) : api.open("files", { path });
  if (node.app) return api.open(node.app);
  api.open("notes", { path }, `${node.name} - Notepad`);
}

function FolderTree({ node, path, cwd, onPick, depth = 0 }: { node: FileNode; path: string[]; cwd: string[]; onPick: (p: string[]) => void; depth?: number }) {
  const folders = (node.children ?? []).filter((c) => c.kind === "folder");
  const here = cwd.join("/") === path.join("/");
  return (
    <>
      <button className={`${styles.treeItem} ${here ? styles.treeActive : ""}`} style={{ paddingLeft: 8 + depth * 14 }} onClick={() => onPick(path)} aria-current={here ? "location" : undefined}><i className={styles.folderIcon} />{node.name}</button>
      {depth < 2 && folders.map((f) => <FolderTree key={f.name} node={f} path={[...path, f.name]} cwd={cwd} onPick={onPick} depth={depth + 1} />)}
    </>
  );
}

export function Files({ api, path }: { api: OSApi; path?: string[] }) {
  const [cwd, setCwd] = useState<string[]>(() => (path && traverse(path)?.kind === "folder" ? path : []));
  const [selected, setSelected] = useState<string | null>(null);
  const node = traverse(cwd) ?? FILESYSTEM;
  const items = node.children ?? [];
  const up = () => { setCwd(cwd.slice(0, -1)); setSelected(null); };
  const go = (p: string[]) => { setCwd(p); setSelected(null); };
  const keys = (e: KeyboardEvent) => { if (e.key === "Backspace" && cwd.length) { e.preventDefault(); up(); } };
  return (
    <div className={styles.explorer} onKeyDown={keys}>
      <div className={styles.addressBar}><button onClick={up} disabled={!cwd.length} aria-label="Up one level">⬆ Up</button><span>Address</span><input readOnly value={displayPath(cwd)} aria-label="Address" /></div>
      <div className={styles.explorerBody}>
        <aside className={styles.tree}><FolderTree node={FILESYSTEM} path={[]} cwd={cwd} onPick={go} /></aside>
        <div className={styles.fileGrid} role="list">
          {items.length === 0 && <p className={styles.emptyFolder}>This folder is empty.</p>}
          {items.map((item) => {
            const p = [...cwd, item.name];
            const act = () => openNode(api, p, item, go);
            return <button key={item.name} role="listitem" className={selected === item.name ? styles.fileSelected : ""} onClick={(e) => { setSelected(item.name); if (isTouch() || e.detail >= 2) act(); }} onKeyDown={(e) => e.key === "Enter" && act()}><i className={item.kind === "folder" ? styles.folderIcon : item.app ? styles.exeIcon : styles.fileIcon} /><span>{item.name}</span></button>;
          })}
        </div>
      </div>
      <footer className={styles.statusBar}><span>{items.length} object{items.length === 1 ? "" : "s"}</span><span>{selected ? (traverse([...cwd, selected])?.content ?? "").split("\n")[0].slice(0, 60) : <><i className={styles.hintMouse}>Double-click to open. Backspace goes up.</i><i className={styles.hintTouch}>Tap to open.</i></>}</span></footer>
    </div>
  );
}

export function Notepad({ api, path }: { api: OSApi; path?: string[] }) {
  const node = path ? traverse(path) : null;
  const text = node?.content ?? "NOTES.TXT\n\nMake useful things.\nLeave one strange door unlocked.\n\nOpen any .txt from My Computer to read it here.";
  const [dirty, setDirty] = useState(false);
  const href = node?.href;
  return (
    <div className={styles.notepad}>
      <div className={styles.menuBar}>
        <button onClick={() => api.open("files", { path: path?.slice(0, -1) ?? [] })}>File</button>
        {href && (href.startsWith("/") ? <Link href={href}>Open in portfolio ↗</Link> : <a href={href} target="_blank" rel="noreferrer">Open link ↗</a>)}
        <span>{dirty ? "Edited (not saved: pretend disk)" : node ? "Read-only copy" : "Untitled"}</span>
      </div>
      <textarea key={path?.join("/") ?? "blank"} className={styles.notes} defaultValue={text} spellCheck={false} onChange={() => setDirty(true)} aria-label={node?.name ?? "Notepad"} />
    </div>
  );
}

export function Terminal({ api }: { api: OSApi }) {
  const [lines, setLines] = useState<string[]>(["Maxwell OS [Version 2.0]", "(C) Maxwell Systems. Type help to begin.", ""]);
  const [cwd, setCwd] = useState<string[]>([]);
  const [q, setQ] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const scroller = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { scroller.current?.scrollTo({ top: scroller.current.scrollHeight }); }, [lines]);
  const prompt = `${displayPath(cwd)}>`;
  function go(e: FormEvent) {
    e.preventDefault();
    const r = runCommand(q, { cwd, now: new Date().toString() });
    setLines((x) => (r.clear ? [] : [...x, `${prompt}${q}`, ...(r.output ? r.output.split("\n") : [])]));
    if (q.trim()) setHistory((h) => [q, ...h].slice(0, 50));
    setCursor(-1);
    if (r.cwd) setCwd(r.cwd);
    if (r.exit) api.exit();
    if (r.vacuum) api.release();
    if (r.open) api.open(r.open, r.openFile ? { path: r.openFile } : undefined, r.open === "notes" && r.openFile ? `${r.openFile.at(-1)} - Notepad` : undefined);
    setQ("");
  }
  const keys = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(-1, Math.min(history.length - 1, cursor + (e.key === "ArrowUp" ? 1 : -1)));
      setCursor(next);
      setQ(next === -1 ? "" : history[next]);
    }
  };
  return (
    <div ref={scroller} className={styles.terminal} onClick={() => input.current?.focus()}>
      {lines.map((l, i) => <div key={i}>{l || " "}</div>)}
      <form onSubmit={go}>{prompt}<input ref={input} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={keys} autoFocus spellCheck={false} autoCapitalize="off" autoComplete="off" aria-label="Command" /></form>
    </div>
  );
}

export function Settings({ api, windowId }: { api: OSApi; windowId: string }) {
  const original = useRef<OSPrefs>(api.prefs);
  const [tab, setTab] = useState<"background" | "appearance">("background");
  const update = (patch: Partial<OSPrefs>) => api.setPrefs({ ...api.prefs, ...patch });
  const done = () => api.close(windowId);
  const cancel = () => { api.setPrefs(original.current); done(); };
  return (
    <div className={styles.settings}>
      <div className={styles.tabs} role="tablist">
        <button role="tab" aria-selected={tab === "background"} className={tab === "background" ? styles.tabActive : ""} onClick={() => setTab("background")}>Background</button>
        <button role="tab" aria-selected={tab === "appearance"} className={tab === "appearance" ? styles.tabActive : ""} onClick={() => setTab("appearance")}>Appearance</button>
      </div>
      <div className={styles.tabPanel}>
        <div className={styles.monitor}><div className={styles.monitorScreen} style={{ background: `${WALLPAPERS.find((w) => w.id === api.prefs.wallpaper)?.css === "none" ? "" : WALLPAPERS.find((w) => w.id === api.prefs.wallpaper)?.css + ", "}${SCHEMES.find((s) => s.id === api.prefs.scheme)?.desktop}` }}><i style={{ background: `linear-gradient(90deg, ${SCHEMES.find((s) => s.id === api.prefs.scheme)?.titleA}, ${SCHEMES.find((s) => s.id === api.prefs.scheme)?.titleB})` }} /></div></div>
        {tab === "background" ? (
          <fieldset><legend>Wallpaper</legend>{WALLPAPERS.map((w) => <label key={w.id}><input type="radio" name="wallpaper" checked={api.prefs.wallpaper === w.id} onChange={() => update({ wallpaper: w.id })} />{w.name}</label>)}</fieldset>
        ) : (
          <fieldset><legend>Scheme</legend>{SCHEMES.map((s) => <label key={s.id}><input type="radio" name="scheme" checked={api.prefs.scheme === s.id} onChange={() => update({ scheme: s.id })} /><i style={{ background: s.desktop }} />{s.name}</label>)}</fieldset>
        )}
      </div>
      <footer className={styles.dialogButtons}><button onClick={done}>OK</button><button onClick={cancel}>Cancel</button><button onClick={() => (original.current = api.prefs)}>Apply</button></footer>
    </div>
  );
}

export function Browser({ api }: { api: OSApi }) {
  return (
    <div className={styles.browser}>
      <div className={styles.addressBar}><button disabled>◀</button><button disabled>▶</button><span>Address</span><input value="https://world.wide.web/maxwell/" readOnly aria-label="Address" /><button>Go</button></div>
      <article>
        <h1>Welcome to the Internet</h1>
        <p>This copy is cached locally. The modem is resting. These links leave the computer:</p>
        <ul>
          <li><Link href="/">dev.maxwellyoung.info</Link> — the portfolio this computer lives inside</li>
          <li><Link href="/resume">Resume</Link> · <Link href="/craft">Craft</Link> · <Link href="/contact">Contact</Link></li>
          {flagshipProjects.map((p) => <li key={p.slug}>{p.caseStudySlug ? <Link href={`/case-study/${p.caseStudySlug}`}>{p.name} case study</Link> : <a href={p.links?.live ?? p.link ?? "/"} target="_blank" rel="noreferrer">{p.name}</a>} — {p.description}</li>)}
          {essays.map((e) => <li key={e.slug}><Link href={`/craft/essay/${e.slug}`}>{e.title}</Link></li>)}
          <li><Link href="/quiz">Run personnel verification quiz</Link></li>
        </ul>
        <p><a onClick={() => api.open("about")}>About the author</a></p>
      </article>
    </div>
  );
}

export function About() {
  const r = resumeData;
  return (
    <div className={styles.about}>
      <b>MY</b>
      <h1>{r.name}</h1>
      <p className={styles.aboutTitle}>{r.title} · {r.contact.location}</p>
      <p>{r.profile}</p>
      <p><a href={`https://${r.contact.github}`} target="_blank" rel="noreferrer">{r.contact.github}</a><br /><a href={`https://${r.contact.linkedin}`} target="_blank" rel="noreferrer">{r.contact.linkedin}</a><br /><a href={`mailto:${r.contact.email}`}>{r.contact.email}</a></p>
      <hr />
      <p><small>Maxwell OS Professional · Version 2.0<br />One reducer, one file system, twenty-two unit tests, no cloud.</small></p>
    </div>
  );
}

export function Help() {
  return (
    <div className={styles.panel}>
      <h2>Maxwell OS Help</h2>
      <p>Double-click desktop icons (tap on touch screens). Drag title bars to move windows, drag the bottom-right corner to resize, double-click a title bar to maximize.</p>
      <dl className={styles.shortcuts}>
        <dt>Alt+Tab / Ctrl+Tab</dt><dd>Switch windows</dd>
        <dt>Escape</dt><dd>Close the front window, or return to the portfolio when none are open</dd>
        <dt>Backspace</dt><dd>Up one folder in My Computer</dd>
        <dt>↑ / ↓ in MS-DOS Prompt</dt><dd>Command history</dd>
        <dt>Right-click</dt><dd>Desktop menu; flags in Minesweeper</dd>
      </dl>
      <p>Your windows and Display Properties are remembered on this device only. If ants appear, use the vacuum.</p>
    </div>
  );
}

export function Trash({ api }: { api: OSApi }) {
  return <div className={styles.empty}><b>🗑️</b><p>1 object</p><button onClick={api.release}>DO NOT CLICK</button><small>final_final_v7_REAL.txt</small></div>;
}
