// Maxwell OS model: window manager and terminal. Pure functions so the whole
// thing is unit-testable without a DOM.
import { independentApps } from "./projects";
import { FILESYSTEM, traverse, resolvePath, formatTree, displayPath, type FileNode } from "./maxwellOSFiles";
export { FILESYSTEM, traverse, resolvePath, formatTree, displayPath };
export type { FileNode };

export const APP_IDS = ["readme", "work", "apps", "shelf", "terminal"] as const;
export type AppId = (typeof APP_IDS)[number];
export const isAppId = (value: unknown): value is AppId => APP_IDS.includes(value as AppId);

/** `slug` selects a project inside Work or Apps. */
export type WindowPayload = { slug?: string };
export type OSWindow = { id: string; app: AppId; title: string; payload?: WindowPayload; x: number; y: number; width: number; height: number; z: number; maximized: boolean };
export type OSState = { windows: OSWindow[]; nextZ: number };
export type OSAction =
  | { type: "open"; app: AppId; title: string; payload?: WindowPayload; size?: { width: number; height: number }; viewport?: { width: number; height: number } }
  | { type: "focus"; id: string }
  | { type: "move"; id: string; x: number; y: number }
  | { type: "resize"; id: string; width: number; height: number }
  | { type: "maximize" | "close"; id: string }
  | { type: "cycle"; direction?: 1 | -1 }
  | { type: "hydrate"; state: OSState; viewport?: { width: number; height: number } };
export const initialOSState: OSState = { windows: [], nextZ: 2 };
export const MIN_WINDOW = { width: 340, height: 240 };
/** Height of the menu bar; windows never tuck underneath it. */
export const MENU_BAR = 36;

// New windows cascade from just right of the desktop icons.
const cascade = (n: number) => ({ x: 132 + (n % 6) * 28, y: MENU_BAR + 24 + (n % 6) * 24 });

export function windowReducer(state: OSState, action: OSAction): OSState {
  switch (action.type) {
    case "open": {
      const old = state.windows.find((w) => w.id === action.app);
      if (old) {
        const focused = windowReducer(state, { type: "focus", id: old.id });
        if (!action.payload) return focused;
        return { ...focused, windows: focused.windows.map((w) => (w.id === old.id ? { ...w, payload: action.payload } : w)) };
      }
      const vw = action.viewport?.width ?? 1280;
      const vh = action.viewport?.height ?? 800;
      const { x, y } = cascade(state.windows.length);
      const width = Math.max(MIN_WINDOW.width, Math.min(action.size?.width ?? 760, vw - x - 24));
      const height = Math.max(MIN_WINDOW.height, Math.min(action.size?.height ?? 560, vh - y - 24));
      return {
        windows: [...state.windows, { id: action.app, app: action.app, title: action.title, payload: action.payload, x, y, width, height, z: state.nextZ, maximized: false }],
        nextZ: state.nextZ + 1,
      };
    }
    case "close":
      return { ...state, windows: state.windows.filter((w) => w.id !== action.id) };
    case "cycle": {
      const ordered = [...state.windows].sort((a, b) => b.z - a.z);
      if (ordered.length < 1) return state;
      // Ctrl+Tab: next window behind the top one; Shift: bring the bottom one up.
      const next = (action.direction ?? 1) === 1 ? ordered[1] ?? ordered[0] : ordered[ordered.length - 1];
      return windowReducer(state, { type: "focus", id: next.id });
    }
    case "hydrate": {
      const vw = action.viewport?.width ?? Infinity;
      const vh = action.viewport?.height ?? Infinity;
      // Sessions saved by older versions can name apps that no longer exist.
      const windows = action.state.windows.filter((w) => isAppId(w.app)).map((w) => ({
        ...w,
        id: w.app,
        maximized: Boolean(w.maximized),
        x: Math.max(0, Math.min(w.x, vw - 120)),
        y: Math.max(MENU_BAR, Math.min(w.y, vh - 120)),
        width: Math.max(MIN_WINDOW.width, w.width),
        height: Math.max(MIN_WINDOW.height, w.height),
      }));
      return { windows, nextZ: Math.max(action.state.nextZ || 0, ...windows.map((w) => w.z + 1), 2) };
    }
    default:
      return {
        windows: state.windows.map((w) => {
          if (w.id !== action.id) return w;
          if (action.type === "focus") return { ...w, z: state.nextZ };
          if (action.type === "move") return { ...w, x: Math.max(0, action.x), y: Math.max(MENU_BAR, action.y) };
          if (action.type === "resize") return { ...w, width: Math.max(MIN_WINDOW.width, action.width), height: Math.max(MIN_WINDOW.height, action.height) };
          if (action.type === "maximize") return { ...w, maximized: !w.maximized };
          return w;
        }),
        nextZ: action.type === "focus" ? state.nextZ + 1 : state.nextZ,
      };
  }
}
export const topWindow = (state: OSState) => [...state.windows].sort((a, b) => b.z - a.z)[0] ?? null;

// ---------------------------------------------------------------- Terminal
export type TerminalContext = { cwd: string[]; now?: string };
export type TerminalResult = { output: string; clear?: boolean; open?: AppId; payload?: WindowPayload; cwd?: string[]; exit?: boolean };
const COMMANDS = ["help", "ls", "dir", "cd", "cat", "pwd", "tree", "open", "date", "clear", "whoami", "now", "echo", "exit"] as const;

export function runCommand(raw: string, ctx: TerminalContext): TerminalResult {
  const [cmdRaw, ...args] = raw.trim().split(/\s+/);
  const cmd = (cmdRaw ?? "").toLowerCase();
  if (!cmd) return { output: "" };
  if (!COMMANDS.includes(cmd as never)) return { output: `${cmd}: command not found. Try help.` };
  const arg = args.join(" ");
  switch (cmd) {
    case "help":
      return {
        output: [
          "ls [folder]        list a folder",
          "cd <folder>        change folder (.. goes up)",
          "cat <file>         print a file",
          "tree               everything, at once",
          "open <app|path>    open readme, work, apps, shelf, or a project",
          "now                what I'm watching, playing and listening to",
          "whoami, date, pwd, echo, clear",
          "exit               back to the portfolio",
        ].join("\n"),
      };
    case "ls":
    case "dir": {
      const node = traverse(resolvePath(ctx.cwd, arg || undefined));
      if (!node) return { output: `ls: ${arg}: no such folder` };
      if (node.kind === "file") return { output: node.name };
      const kids = node.children ?? [];
      return { output: kids.length ? kids.map((k) => (k.kind === "folder" ? `${k.name}/` : k.name)).join("\n") : "(empty)" };
    }
    case "cd": {
      if (!arg) return { output: "", cwd: [] };
      const path = resolvePath(ctx.cwd, arg);
      const node = traverse(path);
      if (!node || node.kind !== "folder") return { output: `cd: ${arg}: not a folder` };
      return { output: "", cwd: path };
    }
    case "cat": {
      if (!arg) return { output: "usage: cat <file>" };
      const node = traverse(resolvePath(ctx.cwd, arg));
      if (!node) return { output: `cat: ${arg}: no such file` };
      if (node.kind === "folder") return { output: `cat: ${node.name}: is a folder` };
      return { output: node.content ?? "" };
    }
    case "pwd":
      return { output: displayPath(ctx.cwd) };
    case "tree":
      return { output: `${displayPath(ctx.cwd)}\n${formatTree(traverse(ctx.cwd) ?? FILESYSTEM)}` };
    case "date":
      return { output: ctx.now ?? "" };
    case "clear":
      return { output: "", clear: true };
    case "whoami":
      return { output: "guest. This is Maxwell's machine; he left it unlocked on purpose." };
    case "now":
      return { output: runCommand("cat /Now/about-this-folder.txt", ctx).output + "\n\n" + (traverse(["Now"])?.children ?? []).filter((f) => f.name !== "about-this-folder.txt").map((f) => (f.content ?? "").split("\n").filter(Boolean).slice(0, 3).join(" — ")).join("\n") };
    case "echo":
      return { output: arg };
    case "exit":
      return { output: "Back to the portfolio.", exit: true };
    case "open": {
      if (!arg) return { output: `usage: open <app|path>. Apps: ${APP_IDS.join(", ")}` };
      const app = arg.toLowerCase();
      if (isAppId(app)) return { output: `Opening ${app}.`, open: app };
      const node = traverse(resolvePath(ctx.cwd, arg)) ?? traverse(["Projects", arg]);
      if (!node) return { output: `open: ${arg}: not found. Apps: ${APP_IDS.join(", ")}` };
      if (node.app) return { output: `Opening ${node.app}.`, open: node.app };
      if (node.slug) {
        const target = independentApps.some((p) => p.slug === node.slug) ? "apps" : "work";
        return { output: `Opening ${node.name} in ${target === "apps" ? "Apps" : "Work"}.`, open: target, payload: { slug: node.slug } };
      }
      if (node.kind === "folder") return { output: `${node.name} is a folder. Try cd ${node.name}.` };
      return { output: node.content ?? "" };
    }
  }
  return { output: "" };
}
