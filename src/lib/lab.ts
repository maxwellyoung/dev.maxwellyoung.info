export const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"] as const;
export type LabMode = "minesweeper" | "desktop" | "gravity" | "crt" | "paint" | "ambient" | "typing" | "diagnostics";
export type LabEnding = "quiet-loop" | "impossible-window" | "green-door";
export type LabDestination = LabMode | `ending:${LabEnding}`;
export type LabChoice = { label: string; to: LabDestination };
export const LAB_BRANCHES: Record<LabMode, readonly [LabChoice, LabChoice]> = {
  minesweeper: [{ label: "Open the unmarked folder", to: "desktop" }, { label: "Trust the smiling counter", to: "ending:impossible-window" }],
  desktop: [{ label: "Follow the window behind the window", to: "crt" }, { label: "Let the desk lose its patience", to: "gravity" }],
  gravity: [{ label: "Draw a handrail", to: "paint" }, { label: "Fall very quietly", to: "ending:quiet-loop" }],
  crt: [{ label: "Tune past the last channel", to: "ambient" }, { label: "Run a signal check", to: "diagnostics" }],
  paint: [{ label: "Trace the green door", to: "ending:green-door" }, { label: "Type what you drew", to: "typing" }],
  ambient: [{ label: "Wake the diagnostics", to: "diagnostics" }, { label: "Disturb the desktop", to: "desktop" }],
  typing: [{ label: "File the phrase under games", to: "minesweeper" }, { label: "Ask the cursor to continue", to: "paint" }],
  diagnostics: [{ label: "Accept the suspiciously good result", to: "typing" }, { label: "Recalibrate reality", to: "crt" }],
};
export function followLabChoice(mode: LabMode, choice: 0 | 1): LabDestination { return LAB_BRANCHES[mode][choice].to; }
export function destinationMode(destination: LabDestination): LabMode | null { return destination.startsWith("ending:") ? null : destination as LabMode; }
export function appendLabHistory(history: LabMode[], mode: LabMode, limit = 8): LabMode[] { return [...history.filter((item, index) => index !== history.length - 1 || item !== mode), mode].slice(-limit); }
export const SAFE_RANDOM_MODES: LabMode[] = ["crt", "paint", "ambient", "diagnostics"];

export function advanceKonami(index: number, key: string): { index: number; unlocked: boolean } {
  const normalized = key.length === 1 ? key.toLowerCase() : key;
  if (normalized === KONAMI[index]) {
    const next = index + 1;
    return { index: next === KONAMI.length ? 0 : next, unlocked: next === KONAMI.length };
  }
  return { index: normalized === KONAMI[0] ? 1 : 0, unlocked: false };
}

export function randomLabMode(value: number): LabMode {
  const safe = Number.isFinite(value) ? Math.max(0, Math.min(0.999999, value)) : 0;
  return SAFE_RANDOM_MODES[Math.floor(safe * SAFE_RANDOM_MODES.length)];
}

export type Cell = { mine: boolean; open: boolean; flagged: boolean; adjacent: number };
export type Board = Cell[][];
export function makeBoard(width = 9, height = 9, mines = 10, random = Math.random): Board {
  const total = width * height; const mineCount = Math.min(Math.max(0, mines), total - 1);
  const positions = Array.from({ length: total }, (_, i) => i);
  for (let i = positions.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [positions[i], positions[j]] = [positions[j], positions[i]]; }
  const mineSet = new Set(positions.slice(0, mineCount));
  return Array.from({ length: height }, (_, y) => Array.from({ length: width }, (_, x) => ({ mine: mineSet.has(y * width + x), open: false, flagged: false, adjacent: 0 }))).map((row, y, board) => row.map((cell, x) => ({ ...cell, adjacent: cell.mine ? 0 : neighbours(board, x, y).filter(c => c.mine).length })));
}
function neighbours(board: Board, x: number, y: number) { const cells: Cell[] = []; for (let dy=-1;dy<=1;dy++) for(let dx=-1;dx<=1;dx++) if ((dx||dy) && board[y+dy]?.[x+dx]) cells.push(board[y+dy][x+dx]); return cells; }
export function reveal(board: Board, x: number, y: number): Board {
  const next = board.map(row => row.map(cell => ({ ...cell }))); const queue = [[x,y]]; const seen = new Set<string>();
  while(queue.length) { const [cx,cy] = queue.shift()!; const cell=next[cy]?.[cx]; const id=`${cx},${cy}`; if(!cell||cell.flagged||seen.has(id)) continue; seen.add(id); cell.open=true; if(!cell.mine&&!cell.adjacent) for(let dy=-1;dy<=1;dy++) for(let dx=-1;dx<=1;dx++) if(dx||dy) queue.push([cx+dx,cy+dy]); }
  return next;
}
export function toggleFlag(board: Board, x: number, y: number): Board { return board.map((row,cy)=>row.map((cell,cx)=>cx===x&&cy===y&&!cell.open?{...cell,flagged:!cell.flagged}:{...cell})); }
export function boardState(board: Board): "playing"|"won"|"lost" { if(board.some(r=>r.some(c=>c.mine&&c.open))) return "lost"; return board.every(r=>r.every(c=>c.mine||c.open))?"won":"playing"; }
export function scoreTyping(expected: string, typed: string, elapsedMs: number) { const correct=[...typed].filter((c,i)=>c===expected[i]).length; return { correct, accuracy: typed.length ? Math.round(correct/typed.length*100):100, wpm: elapsedMs>0?Math.round(correct/5/(elapsedMs/60000)):0 }; }
export type RestoreSnapshot = { title: string; scrollX: number; scrollY: number; activeMode: LabMode|null };
export function restoredSnapshot(snapshot: RestoreSnapshot): RestoreSnapshot { return { ...snapshot, activeMode: null }; }
