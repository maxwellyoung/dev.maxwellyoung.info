"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { flagshipProjects, rankedProjects } from "@/lib/projects";
import { buildReceiptEntry, filterCommands, isEditableTarget, projectDeliveryRows, type ReceiptEntry } from "@/lib/portfolioUtilities";
import styles from "./UtilityShell.module.css";
import { LAB_OPEN_EVENT, LAB_UNLOCK_EVENT } from "@/components/lab/LabShell";
import type { LabMode } from "@/lib/lab";

export const UTILITY_OPEN_EVENT = "portfolio-utility:open";
const PANIC_URL = "https://www.office.com/";
type Mode = "palette" | "meeting" | "source" | "receipt" | "status" | "changelog" | "leave" | null;
type Command = { id: string; label: string; group: "Navigate" | "Present" | "Inspect" | "Privacy" | "Safety" | "Lab"; keywords: string[]; mode?: Exclude<Mode, "palette" | null>; lab?: LabMode | "random"; href?: string };
const commands: Command[] = [
  { id: "home", label: "Home", group: "Navigate", href: "/", keywords: ["start"] },
  { id: "projects", label: "Projects", group: "Navigate", href: "/projects", keywords: ["work"] },
  { id: "about", label: "About", group: "Navigate", href: "/about", keywords: ["profile"] },
  { id: "dossier", label: "Print dossier", group: "Navigate", href: "/dossier", keywords: ["resume pdf"] },
  { id: "quiz", label: "Personnel verification quiz", group: "Navigate", href: "/quiz", keywords: ["maxwell music trivia contested archive"] },
  { id: "meeting", label: "Meeting mode", group: "Present", mode: "meeting", keywords: ["presentation slides"] },
  { id: "source", label: "Selected source", group: "Inspect", mode: "source", keywords: ["code vscode public"] },
  { id: "status", label: "Delivery status", group: "Inspect", mode: "status", keywords: ["projects shipping"] },
  { id: "changelog", label: "Site changelog", group: "Inspect", mode: "changelog", keywords: ["updates release"] },
  { id: "receipt", label: "Session receipt", group: "Privacy", mode: "receipt", keywords: ["local history disclosure"] },
  { id: "leave", label: "Leave site safely", group: "Safety", mode: "leave", keywords: ["panic office"] },
];
const labCommands: Command[] = [
  { id:"lab-mines",label:"Minesweeper 95",group:"Lab",lab:"minesweeper",keywords:["game windows"] },
  { id:"lab-desktop",label:"Desktop windows",group:"Lab",lab:"desktop",keywords:["drag cards reset layout"] },
  { id:"lab-gravity",label:"Gravity",group:"Lab",lab:"gravity",keywords:["fall drag restore"] },
  { id:"lab-crt",label:"Pixel / CRT",group:"Lab",lab:"crt",keywords:["scanlines dither"] },
  { id:"lab-paint",label:"Cursor paint",group:"Lab",lab:"paint",keywords:["trail touch clear"] },
  { id:"lab-ambient",label:"Ambient screensaver",group:"Lab",lab:"ambient",keywords:["canvas silent generative"] },
  { id:"lab-typing",label:"Typing sprint",group:"Lab",lab:"typing",keywords:["game score local"] },
  { id:"lab-diagnostics",label:"Whimsical diagnostics",group:"Lab",lab:"diagnostics",keywords:["fake system telemetry"] },
  { id:"lab-random",label:"Random safe experiment",group:"Lab",lab:"random",keywords:["visual surprise"] },
];
const sourceFiles = [
  { name: "project-ranking.ts", language: "TypeScript", code: `export const rankedProjects = projects\n  .filter(project => project.visibility === "public")\n  .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));` },
  { name: "interaction-principles.md", language: "Markdown", code: `# Interaction principles\n\n- Keyboard access is a first-class path.\n- Motion supports meaning, never blocks it.\n- Public proof is curated, not a repository mirror.` },
];
const changes = [
  ["20 July 2026", "Added a unified command palette, presentation tools, local receipt, dossier, and accessible workbook."],
  ["14 July 2026", "Refined project positioning, motion, and the currently-into feed."],
  ["23 June 2026", "Expanded flagship project proof and mobile delivery context."],
];

export function UtilityShell() {
  const router = useRouter(); const pathname = usePathname();
  const [mode, setMode] = useState<Mode>(null); const [query, setQuery] = useState(""); const [slide, setSlide] = useState(0); const [source, setSource] = useState(0); const [receipt, setReceipt] = useState<ReceiptEntry[]>([]); const [labUnlocked, setLabUnlocked] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null); const previousFocus = useRef<HTMLElement | null>(null);
  const open = useCallback((next: Mode) => { previousFocus.current = document.activeElement as HTMLElement; setQuery(""); setMode(next); }, []);
  const close = useCallback(() => setMode(null), []);
  useEffect(() => { requestAnimationFrame(() => { try { setReceipt(JSON.parse(sessionStorage.getItem("portfolio-receipt") || "[]")); } catch {} }); }, []);
  useEffect(() => { const frame = requestAnimationFrame(() => { const entry = buildReceiptEntry(location.href); setReceipt(old => { if (old.at(-1)?.path === entry.path) return old; const next = [...old, entry]; sessionStorage.setItem("portfolio-receipt", JSON.stringify(next)); return next; }); }); return () => cancelAnimationFrame(frame); }, [pathname]);
  useEffect(() => { const onOpen = (event: Event) => open(((event as CustomEvent<Mode>).detail || "palette")); addEventListener(UTILITY_OPEN_EVENT, onOpen); return () => removeEventListener(UTILITY_OPEN_EVENT, onOpen); }, [open]);
  useEffect(() => { setLabUnlocked(sessionStorage.getItem("portfolio-lab-unlocked") === "1"); const unlock=()=>setLabUnlocked(true); addEventListener(LAB_UNLOCK_EVENT,unlock); return()=>removeEventListener(LAB_UNLOCK_EVENT,unlock); }, []);
  useEffect(() => { const onBossOpen = () => close(); addEventListener("boss-key:open", onBossOpen); return () => removeEventListener("boss-key:open", onBossOpen); }, [close]);
  useEffect(() => { const key = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === ".") { event.preventDefault(); location.replace(PANIC_URL); return; } if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k" && !isEditableTarget(event.target as HTMLElement)) { event.preventDefault(); open("palette"); } if (event.key === "Escape" && mode) { event.preventDefault(); close(); } if (mode === "meeting" && ["ArrowRight", "ArrowLeft"].includes(event.key)) setSlide(value => Math.max(0, Math.min(flagshipProjects.length, value + (event.key === "ArrowRight" ? 1 : -1)))); if (event.key === "Tab" && mode && dialogRef.current) { const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>("button:not(:disabled),a,input")]; const first = focusable[0], last = focusable.at(-1); if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); } } }; addEventListener("keydown", key); return () => removeEventListener("keydown", key); }, [mode, open, close]);
  useEffect(() => { const site = document.getElementById("site-content"); if (!mode) { document.body.style.overflow = ""; site?.removeAttribute("inert"); requestAnimationFrame(() => previousFocus.current?.focus()); return; } document.body.style.overflow = "hidden"; site?.setAttribute("inert", ""); requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>("input,button,a")?.focus()); return () => { document.body.style.overflow = ""; site?.removeAttribute("inert"); }; }, [mode]);
  const run = (command: Command) => { if(command.lab){close();dispatchEvent(new CustomEvent(LAB_OPEN_EVENT,{detail:command.lab}));} else if (command.href) { close(); router.push(command.href); } else setMode(command.mode || null); };
  const visible = useMemo(() => filterCommands(labUnlocked?[...commands,...labCommands]:commands, query), [query,labUnlocked]);
  const clearReceipt = () => { sessionStorage.removeItem("portfolio-receipt"); setReceipt([]); };
  const receiptText = `Portfolio session receipt\nStored only in this browser tab.\n\n${receipt.map(item => `${item.visitedAt}  ${item.path}`).join("\n")}`;
  const download = () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([receiptText], { type: "text/plain" })); a.download = "portfolio-session-receipt.txt"; a.click(); URL.revokeObjectURL(a.href); };
  if (!mode) return null;
  return <div className={styles.backdrop} onMouseDown={e => e.target === e.currentTarget && close()}><div ref={dialogRef} className={`${styles.dialog} ${mode === "meeting" ? styles.presentation : ""}`} role="dialog" aria-modal="true" aria-labelledby="utility-title">
    <header><span id="utility-title">{mode === "palette" ? "Commands" : commands.find(c => c.mode === mode)?.label}</span><button onClick={close} aria-label="Close">Esc</button></header>
    {mode === "palette" && <><input aria-label="Search commands" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && visible[0]) run(visible[0]); }} placeholder="Search pages and utilities…" /><div className={styles.commandList}>{["Navigate","Present","Inspect","Privacy","Safety","Lab"].map(group => { const items = visible.filter(item => item.group === group); return items.length ? <section key={group}><h3>{group}</h3>{items.map(item => <button key={item.id} onClick={() => run(item)}>{item.label}<span>↵</span></button>)}</section> : null; })}{!visible.length && <p>No matching commands.</p>}</div></>}
    {mode === "meeting" && <Meeting slide={slide} setSlide={setSlide} />}
    {mode === "source" && <div className={styles.source}><nav aria-label="Curated source files">{sourceFiles.map((file, i) => <button aria-pressed={source === i} onClick={() => setSource(i)} key={file.name}>{file.name}</button>)}</nav><article><small>SELECTED PUBLIC SOURCE · {sourceFiles[source].language}</small><pre><code>{sourceFiles[source].code}</code></pre><p>This is an authored excerpt. It is not connected to a filesystem or repository browser.</p></article></div>}
    {mode === "status" && <div className={styles.body}><p>Delivery labels below come only from the authored public project list. This is not uptime monitoring.</p><ul className={styles.rows}>{projectDeliveryRows(rankedProjects).map(row => <li key={row.name}><b>{row.name}</b><span>{row.status}</span></li>)}</ul></div>}
    {mode === "changelog" && <div className={styles.body}><p>A curated record of public site changes. No raw git history or private roadmap.</p>{changes.map(([date, text]) => <article className={styles.change} key={date}><time>{date}</time><p>{text}</p></article>)}</div>}
    {mode === "receipt" && <div className={styles.body}><p>This optional receipt records only page paths and visit times in this browser tab using sessionStorage. It does not include query strings, referrers, IP addresses, fingerprinting, or new analytics calls. The site&apos;s separately disclosed analytics still apply.</p><pre className={styles.receipt}>{receiptText}</pre><div className={styles.actions}><button onClick={() => navigator.clipboard.writeText(receiptText)}>Copy</button><button onClick={download}>Download</button><button onClick={clearReceipt}>Clear</button></div></div>}
    {mode === "leave" && <div className={styles.body}><h2>Leave this site?</h2><p>This will replace the current page with Microsoft Office. Your current page will not remain in this tab&apos;s back history.</p><div className={styles.actions}><button onClick={close}>Stay</button><button onClick={() => location.replace(PANIC_URL)}>Leave site</button></div></div>}
  </div></div>;
}
function Meeting({ slide, setSlide }: { slide: number; setSlide: (value: number) => void }) {
  const project = flagshipProjects[slide - 1]; const total = flagshipProjects.length + 1;
  return <div className={styles.meeting}>{slide === 0 ? <><small>MAXWELL YOUNG · DESIGN ENGINEER</small><h1>Products shaped from interface through delivery.</h1><p>Production mobile work, independent products, and research tooling built for real constraints.</p></> : <><small>FLAGSHIP {slide} OF {flagshipProjects.length}</small><h1>{project.name}</h1><p>{project.longDescription || project.description}</p><ul>{project.impact?.slice(0, 3).map(item => <li key={item}>{item}</li>)}</ul></>}<footer><button disabled={slide === 0} onClick={() => setSlide(slide - 1)}>← Previous</button><span>{slide + 1} / {total}</span><button disabled={slide === total - 1} onClick={() => setSlide(slide + 1)}>Next →</button></footer></div>;
}
