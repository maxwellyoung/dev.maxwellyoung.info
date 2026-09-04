"use client";
// Games and hazards: Minesweeper (shares the Lab's board engine), Snake,
// the two stories, and the ant infestation.
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { boardState, makeBoard, reveal, toggleFlag, type Board } from "@/lib/lab";
import { ADVENTURE_GRAPH, OFFICE_GRAPH, SNAKE_SIZE, antPosition, newSnake, snakeTick, turnSnake, type SnakeState } from "@/lib/maxwellOS";
import styles from "./MaxwellOS.module.css";

const MINES = 10;
export function Mines() {
  const [board, setBoard] = useState<Board>(() => makeBoard(9, 9, MINES));
  const [cursor, setCursor] = useState([0, 0]);
  const [seconds, setSeconds] = useState(0);
  const state = boardState(board);
  const started = board.some((row) => row.some((c) => c.open || c.flagged));
  const flags = board.flat().filter((c) => c.flagged).length;
  useEffect(() => { if (!started || state !== "playing") return; const id = setInterval(() => setSeconds((s) => Math.min(999, s + 1)), 1000); return () => clearInterval(id); }, [started, state]);
  const act = (x: number, y: number, flag = false) => { if (state !== "playing") return; setBoard((b) => (flag ? toggleFlag(b, x, y) : reveal(b, x, y))); };
  const reset = () => { setBoard(makeBoard(9, 9, MINES)); setSeconds(0); setCursor([0, 0]); };
  const keys = (e: KeyboardEvent) => {
    let [x, y] = cursor;
    if (e.key === "ArrowRight") x++; if (e.key === "ArrowLeft") x--; if (e.key === "ArrowDown") y++; if (e.key === "ArrowUp") y--;
    x = Math.max(0, Math.min(8, x)); y = Math.max(0, Math.min(8, y));
    if (e.key.startsWith("Arrow")) { e.preventDefault(); setCursor([x, y]); (e.currentTarget.querySelector(`[data-cell="${x}-${y}"]`) as HTMLElement | null)?.focus(); }
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); act(x, y, e.shiftKey); }
    if (e.key.toLowerCase() === "f") { e.preventDefault(); act(x, y, true); }
  };
  const pad = (n: number) => String(Math.max(0, n)).padStart(3, "0");
  return (
    <div className={styles.mines}>
      <div className={styles.counter}><span className={styles.led}>{pad(MINES - flags)}</span><button onClick={reset} aria-label="New game">{state === "playing" ? "🙂" : state === "won" ? "😎" : "😵"}</button><span className={styles.led}>{pad(seconds)}</span></div>
      <div className={styles.grid} role="grid" aria-label="Minesweeper board" onKeyDown={keys}>
        {board.map((row, y) => row.map((c, x) => <button key={`${x}-${y}`} data-cell={`${x}-${y}`} role="gridcell" tabIndex={cursor[0] === x && cursor[1] === y ? 0 : -1} aria-label={`${c.open ? (c.mine ? "mine" : c.adjacent || "empty") : c.flagged ? "flagged" : "covered"}, row ${y + 1}, column ${x + 1}`} onFocus={() => setCursor([x, y])} onClick={() => act(x, y)} onContextMenu={(e) => { e.preventDefault(); act(x, y, true); }} className={`${c.open ? styles.open : ""} ${c.open && c.mine ? styles.boom : ""}`} data-n={c.open && !c.mine && c.adjacent ? c.adjacent : undefined}>{c.open ? (c.mine ? "💣" : c.adjacent || "") : c.flagged ? "🚩" : ""}</button>))}
      </div>
      <p className={styles.gameHint}>{state === "won" ? "Cleared. Your paperwork is immaculate." : state === "lost" ? "Mine encountered. Your paperwork survives." : "Left click reveals. Right click, Shift+Enter or F flags."}</p>
    </div>
  );
}

const HIGH = "maxwell-os:snake-high";
export function Snake() {
  const [s, setS] = useState<SnakeState>(() => newSnake());
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [high, setHigh] = useState(() => { try { return Number(localStorage.getItem(HIGH) ?? 0); } catch { return 0; } });
  // Best score is derived while dead so the effect only persists; setHigh happens on restart.
  const best = s.dead ? Math.max(high, s.score) : high;
  const board = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!running || s.dead) return; const id = setInterval(() => setS((cur) => snakeTick(cur)), Math.max(70, 140 - s.score)); return () => clearInterval(id); }, [running, s.dead, s.score]);
  useEffect(() => { if (s.dead && best > high) { try { localStorage.setItem(HIGH, String(best)); } catch {} } }, [s.dead, best, high]);
  const dirs: Record<string, { x: number; y: number }> = { ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 }, ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 }, w: { x: 0, y: -1 }, s: { x: 0, y: 1 }, a: { x: -1, y: 0 }, d: { x: 1, y: 0 } };
  const keys = (e: KeyboardEvent) => {
    const d = dirs[e.key] ?? dirs[e.key.toLowerCase()];
    if (d) { e.preventDefault(); setS((cur) => turnSnake(cur, d)); if (!running && !s.dead) { setRunning(true); setStarted(true); } }
    if (e.key === " ") { e.preventDefault(); if (s.dead) restart(); else setRunning((r) => !r); }
  };
  const restart = () => { setHigh(best); setS(newSnake()); setRunning(true); setStarted(true); board.current?.focus(); };
  const cells = Array.from({ length: SNAKE_SIZE * SNAKE_SIZE }, (_, i) => ({ x: i % SNAKE_SIZE, y: Math.floor(i / SNAKE_SIZE) }));
  const head = s.body[0];
  return (
    <div className={styles.snake}>
      <div className={styles.counter}><span className={styles.led}>{String(s.score).padStart(4, "0")}</span><span>SNAKE.EXE</span><span className={styles.led} title="High score">{String(best).padStart(4, "0")}</span></div>
      <div ref={board} className={styles.snakeBoard} tabIndex={0} role="application" aria-label={`Snake, score ${s.score}${s.dead ? ", game over" : running ? "" : ", paused"}`} onKeyDown={keys} onBlur={() => setRunning(false)} onClick={() => { board.current?.focus(); if (!s.dead) { setRunning(true); setStarted(true); } }}>
        {cells.map((c) => { const isHead = head.x === c.x && head.y === c.y; const isBody = !isHead && s.body.some((p) => p.x === c.x && p.y === c.y); const isFood = s.food.x === c.x && s.food.y === c.y; return <i key={`${c.x}-${c.y}`} className={isHead ? styles.snakeHead : isBody ? styles.snakeBody : isFood ? styles.snakeFood : undefined} />; })}
        {(s.dead || !running) && <div className={styles.snakeOverlay}>{s.dead ? <><b>GAME OVER</b><span>{s.score} points{s.score >= high && s.score > 0 ? " · new high score" : ""}</span><button onClick={restart}>New game</button></> : <><b>{started ? "PAUSED" : "SNAKE"}</b><span>Arrow keys or WASD. Space pauses. The walls wrap.</span><button onClick={() => { setRunning(true); setStarted(true); board.current?.focus(); }}>{started ? "Resume" : "Start"}</button></>}</div>}
      </div>
      <div className={styles.dpad} aria-hidden>{(["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"] as const).map((k) => <button key={k} onClick={() => { setS((cur) => turnSnake(cur, dirs[k])); if (!s.dead) setRunning(true); }}>{k === "ArrowUp" ? "▲" : k === "ArrowDown" ? "▼" : k === "ArrowLeft" ? "◀" : "▶"}</button>)}</div>
    </div>
  );
}

export function Story({ kind }: { kind: "adventure" | "office" }) {
  const graph = kind === "adventure" ? ADVENTURE_GRAPH : OFFICE_GRAPH;
  const [node, setNode] = useState(kind === "adventure" ? "dock" : "lobby");
  const [selected, setSelected] = useState(0);
  const n = graph[node];
  const choose = (to: string) => { setNode(to); setSelected(0); };
  if (kind === "office") return <div className={styles.office}><div className={styles.officeNo}>ROOM {Object.keys(graph).indexOf(node) + 301}</div><h1>{n.ending || "This is a story about a person named You."}</h1><p>{n.text}</p><div className={styles.officeChoices}>{n.choices.map((c, i) => <button key={c.to} onClick={() => choose(c.to)}><u>{i + 1}</u> {c.label}<span>CONTINUE ›</span></button>)}{n.ending && <button onClick={() => choose("lobby")}><u>↻</u> Clock in again<span>RESTART</span></button>}</div><small>NARRATOR STATUS: OBSERVING</small></div>;
  return <div className={styles.adventure}><div className={styles.scene}><div className={styles.skyPixels} /><div className={styles.moon}>☾</div><div className={styles.beam} /><div className={styles.cliffs} /><div className={styles.sea} /><div className={styles.lighthouse}><i /><b /></div><div className={styles.oracle}><em>ORACLE</em><i /><b>TYPE<br />KINDLY</b></div><div className={styles.dock} /><p>{n.text}</p></div><section className={styles.commandArea}><strong>ACTIONS</strong><div className={styles.verbs}>{["LOOK AT", "WALK TO", "TALK TO", "USE"].map((v, i) => <button className={selected === i ? styles.selected : ""} onClick={() => setSelected(i)} key={v}>{v}</button>)}</div><strong>SCENE TARGETS / INVENTORY</strong><div className={styles.choices}>{n.choices.map((c) => <button key={c.to} onClick={() => choose(c.to)}>{c.label}<span>›</span></button>)}{n.ending && <button onClick={() => choose("dock")}>Play again <span>↻</span></button>}</div></section></div>;
}

export function Ants({ count, generation, clear }: { count: number; generation: number; clear: () => void }) {
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  return (
    <div key={generation} className={styles.infestation} onPointerMove={(e) => setPointer({ x: (e.clientX / innerWidth) * 100, y: (e.clientY / innerHeight) * 100 })}>
      {Array.from({ length: count }, (_, i) => { const p = antPosition(i, count); const flee = Math.hypot(p.x - pointer.x, p.y - pointer.y) < 12; return <i className={`${styles.ant} ${styles[p.origin]} ${flee ? styles.flee : ""}`} key={i} style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `-${i % 7}s`, "--turn": `${i * 47}deg` } as React.CSSProperties}><b /><span /><em /></i>; })}
      <section className={styles.antDialog} role="alertdialog" aria-label="Ant infestation detected"><header>System Protection</header><div><strong>⚠</strong><p><b>Ant infestation detected</b><br />Activity: {count < 45 ? "local cluster" : count < 70 ? "spreading across chrome" : "system-wide"}<br /><small>Source: final_final_v7_REAL.txt</small></p></div><footer><button onClick={clear}>Vacuum and clean up</button></footer></section>
    </div>
  );
}
