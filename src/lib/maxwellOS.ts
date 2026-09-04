// Maxwell OS model: window manager, terminal, stories, ants, snake, display
// settings. Pure functions so the whole thing is unit-testable without a DOM.
import { FILESYSTEM, traverse, resolvePath, formatTree, displayPath, type FileNode } from "./maxwellOSFiles";
export { FILESYSTEM, traverse, resolvePath, formatTree, displayPath };
export type { FileNode };

export type AppId = "files" | "about" | "browser" | "terminal" | "notes" | "settings" | "help" | "trash" | "mines" | "snake" | "adventure" | "office";
export type WindowPayload = { path?: string[] };
export type OSWindow = { id: string; app: AppId; title: string; payload?: WindowPayload; x: number; y: number; width: number; height: number; z: number; minimized: boolean; maximized: boolean };
export type OSState = { windows: OSWindow[]; nextZ: number };
export type OSAction =
  | { type: "open"; app: AppId; title: string; payload?: WindowPayload; size?: { width: number; height: number } }
  | { type: "focus"; id: string }
  | { type: "move"; id: string; x: number; y: number }
  | { type: "resize"; id: string; width: number; height: number }
  | { type: "minimize" | "maximize" | "close"; id: string }
  | { type: "cycle"; direction?: 1 | -1 }
  | { type: "hydrate"; state: OSState; viewport?: { width: number; height: number } };
export const initialOSState: OSState = { windows: [], nextZ: 2 };
export const MIN_WINDOW = { width: 320, height: 220 };

/** Windows are keyed by app, except files opened in Notepad which are keyed by path. */
export const windowKey = (app: AppId, payload?: WindowPayload) => (app === "notes" && payload?.path ? `notes:${payload.path.join("/")}` : app);

const cascade = (n: number) => ({ x: 104 + (n % 8) * 28, y: 62 + (n % 8) * 22 });

export function windowReducer(state: OSState, action: OSAction): OSState {
  switch (action.type) {
    case "open": {
      const key = windowKey(action.app, action.payload);
      const old = state.windows.find((w) => w.id === key);
      if (old) {
        const focused = windowReducer(state, { type: "focus", id: old.id });
        if (!action.payload) return focused;
        return { ...focused, windows: focused.windows.map((w) => (w.id === old.id ? { ...w, payload: action.payload, title: action.title } : w)) };
      }
      const n = state.windows.length;
      const width = Math.min(action.size?.width ?? 900, innerSafeWidth());
      const height = Math.min(action.size?.height ?? 650, innerSafeHeight());
      return {
        windows: [...state.windows, { id: key, app: action.app, title: action.title, payload: action.payload, ...cascade(n), width, height, z: state.nextZ, minimized: false, maximized: false }],
        nextZ: state.nextZ + 1,
      };
    }
    case "close":
      return { ...state, windows: state.windows.filter((w) => w.id !== action.id) };
    case "cycle": {
      const ordered = [...state.windows].sort((a, b) => b.z - a.z);
      if (ordered.length < 1) return state;
      const dir = action.direction ?? 1;
      // Alt+Tab: next window behind the top one; Shift+Alt+Tab: bring the bottom one up.
      const next = dir === 1 ? ordered[1] ?? ordered[0] : ordered[ordered.length - 1];
      return windowReducer(state, { type: "focus", id: next.id });
    }
    case "hydrate": {
      const vw = action.viewport?.width ?? Infinity;
      const vh = action.viewport?.height ?? Infinity;
      const windows = action.state.windows.map((w) => ({
        ...w,
        x: Math.max(0, Math.min(w.x, vw - 80)),
        y: Math.max(0, Math.min(w.y, vh - 120)),
        width: Math.max(MIN_WINDOW.width, w.width),
        height: Math.max(MIN_WINDOW.height, w.height),
      }));
      return { windows, nextZ: Math.max(action.state.nextZ, ...windows.map((w) => w.z + 1), 2) };
    }
    default:
      return {
        windows: state.windows.map((w) => {
          if (w.id !== action.id) return w;
          if (action.type === "focus") return { ...w, z: state.nextZ, minimized: false };
          if (action.type === "move") return { ...w, x: Math.max(0, action.x), y: Math.max(0, action.y) };
          if (action.type === "resize") return { ...w, width: Math.max(MIN_WINDOW.width, action.width), height: Math.max(MIN_WINDOW.height, action.height) };
          if (action.type === "minimize") return { ...w, minimized: true };
          if (action.type === "maximize") return { ...w, maximized: !w.maximized, minimized: false };
          return w;
        }),
        nextZ: action.type === "focus" ? state.nextZ + 1 : state.nextZ,
      };
  }
}
export const topWindow = (state: OSState) => [...state.windows].filter((w) => !w.minimized).sort((a, b) => b.z - a.z)[0] ?? null;
function innerSafeWidth() { return typeof innerWidth === "number" ? innerWidth - 150 : 820; }
function innerSafeHeight() { return typeof innerHeight === "number" ? innerHeight - 145 : 600; }

// ---------------------------------------------------------------- Terminal
export type TerminalContext = { cwd: string[]; now?: string };
export type TerminalResult = { output: string; clear?: boolean; open?: AppId; openFile?: string[]; vacuum?: boolean; cwd?: string[]; exit?: boolean };
const COMMANDS = ["help", "about", "ls", "dir", "cd", "cat", "type", "pwd", "tree", "open", "start", "date", "clear", "cls", "whoami", "fortune", "knock", "vacuum", "echo", "ver", "exit"] as const;
const OPENABLE: AppId[] = ["files", "about", "browser", "notes", "help", "mines", "snake", "adventure", "office", "settings", "trash", "terminal"];
const FORTUNES = [
  "A clean interface is often just a well-hidden argument.",
  "Ship the small thing. The big thing is made of small things.",
  "Every animation is a promise about what just happened.",
  "If the release notes are boring, the release probably worked.",
  "The best abstraction is the one you can delete on Friday.",
];

export function runCommand(raw: string, ctx: TerminalContext): TerminalResult {
  const [cmdRaw, ...args] = raw.trim().split(/\s+/);
  const cmd = (cmdRaw ?? "").toLowerCase();
  if (!cmd) return { output: "" };
  if (!COMMANDS.includes(cmd as never)) return { output: `Command not found: ${cmd}. This is a tiny pretend computer, not your shell. Try help.` };
  const arg = args.join(" ");
  switch (cmd) {
    case "help":
      return { output: ["ls / dir            list the current folder", "cd <folder>         change folder (.. goes up)", "cat / type <file>   print a file", "tree                show everything", "open <app|file>     start a program or open a file", "date, whoami, ver, fortune, echo, clear", "knock knock knock   worth a try", "vacuum              ant containment protocol", "exit                back to the portfolio"].join("\n") };
    case "about":
    case "ver":
      return { output: "Maxwell OS 2.0. Local, fictional, and mildly overqualified. Window manager: one reducer, fully unit-tested." };
    case "ls":
    case "dir": {
      const node = traverse(resolvePath(ctx.cwd, arg || undefined));
      if (!node) return { output: `Folder not found: ${arg}` };
      if (node.kind === "file") return { output: node.name };
      const kids = node.children ?? [];
      return { output: kids.length ? kids.map((k) => (k.kind === "folder" ? `${k.name}/` : k.name)).join("\n") : "(empty)" };
    }
    case "cd": {
      if (!arg) return { output: displayPath(ctx.cwd) };
      const path = resolvePath(ctx.cwd, arg);
      const node = traverse(path);
      if (!node || node.kind !== "folder") return { output: `Not a folder: ${arg}` };
      return { output: "", cwd: path };
    }
    case "cat":
    case "type": {
      if (!arg) return { output: `Usage: ${cmd} <file>` };
      const path = resolvePath(ctx.cwd, arg);
      const node = traverse(path);
      if (!node) return { output: `File not found: ${arg}` };
      if (node.kind === "folder") return { output: `${node.name} is a folder. Try ls.` };
      return { output: node.content ?? "(binary, and shy)" };
    }
    case "pwd":
      return { output: displayPath(ctx.cwd) };
    case "tree":
      return { output: `${displayPath(ctx.cwd)}\n${formatTree(traverse(ctx.cwd) ?? FILESYSTEM)}` };
    case "date":
      return { output: ctx.now ?? "LOCAL TIME" };
    case "clear":
    case "cls":
      return { output: "", clear: true };
    case "whoami":
      return { output: "guest@portfolio. Excellent disguise." };
    case "fortune":
      return { output: FORTUNES[raw.length % FORTUNES.length] };
    case "echo":
      return { output: arg };
    case "knock":
      return { output: arg.toLowerCase() === "knock knock" ? "A tiny door opens in My Computer: Projects\\the-door." : "The terminal knocks back." };
    case "vacuum":
      return { output: "Ant containment protocol requested.", vacuum: true };
    case "exit":
      return { output: "Shutting down. Returning you to the portfolio.", exit: true };
    case "open":
    case "start": {
      if (!arg) return { output: "Usage: open <app|file>. Apps: " + OPENABLE.join(", ") };
      const app = arg.toLowerCase() as AppId;
      if (OPENABLE.includes(app)) return { output: `Opening ${app}.`, open: app };
      const path = resolvePath(ctx.cwd, arg);
      const node = traverse(path);
      if (!node) return { output: `Nothing called ${arg} here. Apps: ${OPENABLE.join(", ")}` };
      if (node.app) return { output: `Starting ${node.name}.`, open: node.app };
      if (node.kind === "folder") return { output: `Opening ${node.name} in My Computer.`, open: "files", openFile: path };
      return { output: `Opening ${node.name} in Notepad.`, open: "notes", openFile: path };
    }
  }
  return { output: "" };
}
/** Legacy single-arg parser kept for callers that only need the old behaviour. */
export const parseCommand = (raw: string, now = "LOCAL TIME") => runCommand(raw, { cwd: [], now });

// ---------------------------------------------------------------- Stories
export type StoryNode = { text: string; choices: { label: string; to: string }[]; ending?: string };
export const OFFICE_GRAPH: Record<string, StoryNode> = { lobby: { text: "At 9:03, the office assigns you one task: choose a door. Facilities insists the stairs are legally a door. Nobody challenges Facilities.", choices: [{ label: "Enter the blue door", to: "meeting" }, { label: "Accept the stairs as a door", to: "roof" }] }, meeting: { text: "The meeting room contains one chair and a slide titled Alignment.", choices: [{ label: "Sit in the only chair", to: "aligned" }, { label: "Turn off the projector", to: "dark" }] }, roof: { text: "The stairs, still classified as a door, lead to a rooftop vegetable garden maintained by Accounting.", choices: [{ label: "Water the basil", to: "basil" }, { label: "Return to the lobby", to: "lobby" }] }, aligned: { text: "You align perfectly with the chair. Nobody can find you. Promotion achieved.", choices: [], ending: "The Alignment Ending" }, dark: { text: "With the projector off, everyone remembers the meeting was fictional.", choices: [], ending: "The Power Saving Ending" }, basil: { text: "The basil approves your quarterly instincts. You resign to become weather.", choices: [], ending: "The Basil Ending" } };
export const ADVENTURE_GRAPH: Record<string, StoryNode> = { dock: { text: "Low tide at the town of Elsewhere. A lighthouse blinks in an anxious rhythm.", choices: [{ label: "Walk to lighthouse", to: "light" }, { label: "Inspect vending oracle", to: "oracle" }] }, oracle: { text: "The machine accepts compliments instead of coins and dispenses a paper moon.", choices: [{ label: "Compliment its typography", to: "moon" }, { label: "Return to dock", to: "dock" }] }, moon: { text: "You pocket the paper moon. It smells faintly of toner.", choices: [{ label: "Take moon to lighthouse", to: "keeper" }] }, light: { text: "The keeper asks for proof that night has been properly filed.", choices: [{ label: "Return to oracle", to: "oracle" }] }, keeper: { text: "The paper moon completes the beam. Ships now navigate by excellent paperwork.", choices: [], ending: "Harbour Saved, Mostly" } };
export function followStory(graph: Record<string, StoryNode>, node: string, choice: number) { const next = graph[node]?.choices[choice]?.to; return next && graph[next] ? next : null; }

// ---------------------------------------------------------------- Ants
export type AntState = { active: boolean; count: number; generation: number };
export function antReducer(s: AntState, a: { type: "release" | "clear"; amount?: number }): AntState { return a.type === "clear" ? { active: false, count: 0, generation: s.generation + 1 } : { active: true, count: Math.min(80, s.count + (a.amount ?? 18)), generation: s.generation }; }
export function antEscalation(count: number, waves = 1) { return Math.min(80, count + Math.max(0, waves) * 12); }
export function antPosition(index: number, total: number) { const clustered = index < Math.ceil(total * 0.7); if (clustered) { const origin = index % 2 ? "file" : "bin"; const base = origin === "file" ? { x: 62, y: 48 } : { x: 8, y: 72 }; return { x: base.x + ((index * 7) % 18) - 9, y: base.y + ((index * 11) % 16) - 8, origin } as const; } return { x: (index * 47) % 96, y: (index * 83) % 88, origin: "roaming" as const }; }

// ---------------------------------------------------------------- Snake
export type SnakePoint = { x: number; y: number };
export const SNAKE_SIZE = 16;
export type SnakeState = { body: SnakePoint[]; dir: SnakePoint; food: SnakePoint; score: number; dead: boolean };
export function snakeStep(body: SnakePoint[], dir: SnakePoint, size = 12) { const h = body[0], next = { x: (h.x + dir.x + size) % size, y: (h.y + dir.y + size) % size }; return { body: [next, ...body.slice(0, -1)], hit: body.some((p) => p.x === next.x && p.y === next.y) }; }
export function placeFood(body: SnakePoint[], size = SNAKE_SIZE, random = Math.random): SnakePoint {
  const free: SnakePoint[] = [];
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!body.some((p) => p.x === x && p.y === y)) free.push({ x, y });
  return free[Math.floor(random() * free.length)] ?? { x: 0, y: 0 };
}
export function newSnake(random = Math.random): SnakeState { const body = [{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 8 }]; return { body, dir: { x: 1, y: 0 }, food: placeFood(body, SNAKE_SIZE, random), score: 0, dead: false }; }
export function snakeTick(s: SnakeState, random = Math.random): SnakeState {
  if (s.dead) return s;
  const h = s.body[0];
  const next = { x: (h.x + s.dir.x + SNAKE_SIZE) % SNAKE_SIZE, y: (h.y + s.dir.y + SNAKE_SIZE) % SNAKE_SIZE };
  const ate = next.x === s.food.x && next.y === s.food.y;
  const trail = ate ? s.body : s.body.slice(0, -1);
  if (trail.some((p) => p.x === next.x && p.y === next.y)) return { ...s, dead: true };
  const body = [next, ...trail];
  return { ...s, body, score: ate ? s.score + 10 : s.score, food: ate ? placeFood(body, SNAKE_SIZE, random) : s.food };
}
/** Reject reversing into yourself; everything else is allowed. */
export function turnSnake(s: SnakeState, dir: SnakePoint): SnakeState { return dir.x === -s.dir.x && dir.y === -s.dir.y ? s : { ...s, dir }; }

// ---------------------------------------------------------------- Display
export type Scheme = { id: string; name: string; desktop: string; face: string; titleA: string; titleB: string; text: string; link: string };
export const SCHEMES: Scheme[] = [
  { id: "standard", name: "Maxwell Standard", desktop: "#087f80", face: "#c0c0c0", titleA: "#000080", titleB: "#1084d0", text: "#000000", link: "#000080" },
  { id: "rose", name: "Rose Quartz", desktop: "#7c3f58", face: "#e8d5d8", titleA: "#5b1f3a", titleB: "#c06c84", text: "#2a1520", link: "#7a2246" },
  { id: "slate", name: "Slate", desktop: "#3b4252", face: "#d8dee9", titleA: "#2e3440", titleB: "#5e81ac", text: "#1b1f27", link: "#2e5c8a" },
  { id: "contrast", name: "High Contrast", desktop: "#000000", face: "#ffffff", titleA: "#000000", titleB: "#000000", text: "#000000", link: "#0000ee" },
  { id: "hotdog", name: "Hot Dog Stand", desktop: "#ff0000", face: "#ffff00", titleA: "#ff0000", titleB: "#ff0000", text: "#000000", link: "#000000" },
];
export type Wallpaper = { id: string; name: string; css: string };
export const WALLPAPERS: Wallpaper[] = [
  { id: "none", name: "(None)", css: "none" },
  { id: "clouds", name: "Clouds", css: "radial-gradient(ellipse 40% 30% at 20% 30%, #ffffff55, transparent), radial-gradient(ellipse 50% 35% at 70% 60%, #ffffff44, transparent), radial-gradient(ellipse 35% 25% at 45% 80%, #ffffff33, transparent), linear-gradient(#1b6fb8, #6fb3e0)" },
  { id: "hills", name: "Hills", css: "linear-gradient(#2f7fd4 0 52%, #3f9a3a 52% 70%, #2f7a2c 70%)" },
  { id: "midnight", name: "Midnight", css: "radial-gradient(circle at 20% 20%, #ffffff 0 1px, transparent 2px), radial-gradient(circle at 70% 60%, #ffffff 0 1px, transparent 2px), radial-gradient(circle at 40% 85%, #ffffff 0 1px, transparent 2px), #05071a" },
  { id: "weave", name: "Weave", css: "repeating-linear-gradient(45deg, #0000 0 6px, #0002 6px 8px), repeating-linear-gradient(-45deg, #0000 0 6px, #0002 6px 8px)" },
];
export type OSPrefs = { scheme: string; wallpaper: string };
export const defaultPrefs: OSPrefs = { scheme: "standard", wallpaper: "none" };
export const schemeById = (id: string) => SCHEMES.find((s) => s.id === id) ?? SCHEMES[0];
export const wallpaperById = (id: string) => WALLPAPERS.find((w) => w.id === id) ?? WALLPAPERS[0];

export function safeRestore(s: { title: string; scrollX: number; scrollY: number }) { return { ...s, active: false, ants: 0, timers: 0 }; }
