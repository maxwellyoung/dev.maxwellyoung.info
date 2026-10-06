import test from "node:test";
import assert from "node:assert/strict";
import { initialOSState, windowReducer, runCommand, traverse, resolvePath, formatTree, FILESYSTEM, topWindow, MENU_BAR, MIN_WINDOW } from "./maxwellOS";
import { rankedProjects } from "./projects";
import { essays } from "./essays";

const open = (app: "readme" | "work" | "apps" | "shelf" | "terminal", payload?: { slug?: string }) => ({ type: "open" as const, app, title: app, payload });

test("window manager opens, moves, resizes, maximizes and closes", () => {
  let s = windowReducer(initialOSState, open("work"));
  assert.equal(s.windows.length, 1);
  s = windowReducer(s, { type: "move", id: "work", x: -4, y: 0 });
  assert.equal(s.windows[0].x, 0);
  assert.equal(s.windows[0].y, MENU_BAR, "windows never slide under the menu bar");
  s = windowReducer(s, { type: "resize", id: "work", width: 10, height: 10 });
  assert.equal(s.windows[0].width, MIN_WINDOW.width);
  s = windowReducer(s, { type: "maximize", id: "work" });
  assert.equal(s.windows[0].maximized, true);
  s = windowReducer(s, { type: "close", id: "work" });
  assert.equal(s.windows.length, 0);
});

test("new windows fit inside a small viewport", () => {
  const s = windowReducer(initialOSState, { ...open("work"), size: { width: 900, height: 700 }, viewport: { width: 1000, height: 600 } });
  const w = s.windows[0];
  assert.ok(w.x + w.width <= 1000);
  assert.ok(w.y + w.height <= 600);
});

test("opening an existing app focuses it and retargets its selection", () => {
  let s = windowReducer(initialOSState, open("work", { slug: "silk" }));
  s = windowReducer(s, open("terminal"));
  s = windowReducer(s, open("work", { slug: "liner" }));
  assert.equal(s.windows.length, 2);
  assert.equal(topWindow(s)?.app, "work");
  assert.equal(topWindow(s)?.payload?.slug, "liner");
});

test("cycle brings the next window forward, shift-cycle the last", () => {
  let s = initialOSState;
  for (const app of ["readme", "work", "terminal"] as const) s = windowReducer(s, open(app));
  s = windowReducer(s, { type: "cycle" });
  assert.equal(topWindow(s)?.app, "work");
  s = windowReducer(s, { type: "cycle", direction: -1 });
  assert.equal(topWindow(s)?.app, "readme");
});

test("hydrate clamps saved windows and drops apps that no longer exist", () => {
  const saved = {
    windows: [
      { id: "work", app: "work" as const, title: "x", x: 5000, y: 5000, width: 100, height: 100, z: 9, maximized: false },
      { id: "snake", app: "snake", title: "Snake", x: 0, y: 0, width: 400, height: 400, z: 4, maximized: false },
    ],
    nextZ: 3,
  } as unknown as Parameters<typeof windowReducer>[0];
  const s = windowReducer(initialOSState, { type: "hydrate", state: saved, viewport: { width: 1000, height: 700 } });
  assert.equal(s.windows.length, 1);
  assert.equal(s.windows[0].x, 880);
  assert.equal(s.windows[0].y, 580);
  assert.equal(s.windows[0].width, MIN_WINDOW.width);
  assert.equal(s.nextZ, 10);
});

test("filesystem is built from the real portfolio and nothing else", () => {
  const projects = traverse(["Projects"]);
  assert.equal(projects?.children?.length, rankedProjects.length);
  for (const p of rankedProjects) assert.ok(projects!.children!.some((f) => f.slug === p.slug), `missing folder for ${p.name}`);
  assert.ok(traverse(["Documents", "RESUME.txt"])?.content?.includes("EXPERIENCE"));
  assert.equal(traverse(["Documents", "Essays"])?.children?.length, essays.length);
  assert.ok(traverse(["Now", "about-this-folder.txt"])?.content?.includes("Canon"));
  assert.equal(traverse(["Games"]), null);
});

test("filesystem traverses case-insensitively without escaping the tree", () => {
  assert.equal(traverse(["documents"])?.kind, "folder");
  assert.equal(traverse(["nope"]), null);
  assert.equal(traverse(["Documents", "RESUME.txt", "deeper"]), null);
});

test("resolvePath handles relative, absolute and parent segments", () => {
  assert.deepEqual(resolvePath(["Documents"], ".."), []);
  assert.deepEqual(resolvePath(["Documents"], "../Projects"), ["Projects"]);
  assert.deepEqual(resolvePath(["Documents"], "/Now"), ["Now"]);
  assert.deepEqual(resolvePath(["Documents", "Essays"], "../../.."), []);
  assert.deepEqual(resolvePath([], "documents/essays"), ["Documents", "Essays"]);
});

test("tree renders nested folders", () => {
  const out = formatTree(FILESYSTEM);
  assert.match(out, /Projects\//);
  assert.match(out, /RESUME\.txt/);
});

test("terminal navigates and reads the file system", () => {
  assert.deepEqual(runCommand("cd Documents", { cwd: [] }).cwd, ["Documents"]);
  assert.match(runCommand("ls", { cwd: ["Documents"] }).output, /RESUME\.txt/);
  assert.match(runCommand("cat RESUME.txt", { cwd: ["Documents"] }).output, /EXPERIENCE/);
  assert.match(runCommand("cd nowhere", { cwd: [] }).output, /not a folder/);
  assert.equal(runCommand("pwd", { cwd: ["Projects", "liner"] }).output, "~/Projects/liner");
});

test("terminal opens apps and jumps to projects in the right app", () => {
  assert.equal(runCommand("open shelf", { cwd: [] }).open, "shelf");
  const work = runCommand("open liner", { cwd: [] });
  assert.equal(work.open, "work");
  assert.equal(work.payload?.slug, "liner");
  const app = runCommand("open Projects/vape-quit-coach", { cwd: [] });
  assert.equal(app.open, "apps");
  assert.equal(app.payload?.slug, "vape-quit-coach");
  assert.match(runCommand("open nothing-here", { cwd: [] }).output, /not found/);
});

test("terminal allowlists commands and handles utilities", () => {
  assert.equal(runCommand("date", { cwd: [], now: "NOW" }).output, "NOW");
  assert.equal(runCommand("clear", { cwd: [] }).clear, true);
  assert.match(runCommand("rm -rf /", { cwd: [] }).output, /command not found/);
  assert.equal(runCommand("echo hi there", { cwd: [] }).output, "hi there");
  assert.match(runCommand("now", { cwd: [] }).output, /Canon/);
  assert.equal(runCommand("exit", { cwd: [] }).exit, true);
});
