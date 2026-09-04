// The Maxwell OS file system. Built once from the same data the rest of the
// portfolio renders, so the pretend computer is actually full of the real work.
import { rankedProjects, type Project } from "./projects";
import { caseStudies } from "./caseStudies";
import { essays } from "./essays";
import { resumeData } from "./resumeData";
import { canonFeed } from "./canonFeed";
import { openSourceContributions } from "./openSource";
import type { AppId } from "./maxwellOS";

export type FileNode = {
  name: string;
  kind: "folder" | "file";
  content?: string;
  /** External or internal link the file points at (shown in Notepad and the Browser). */
  href?: string;
  /** Files that launch a program instead of opening in Notepad. */
  app?: AppId;
  children?: FileNode[];
};

// Notepad and the terminal both soft-wrap, so text is stored unwrapped.
const wrap = (text: string) => text;

const folderName = (s: string) => s.replace(/['`’]/g, "").replace(/[^a-z0-9-]/gi, "-").toLowerCase();

function projectFolder(p: Project): FileNode {
  const lines = [
    p.name.toUpperCase(),
    "=".repeat(p.name.length),
    "",
    `Status: ${p.status}${p.launchStage ? ` (${p.launchStage})` : ""}`,
    p.role ? `Role: ${p.role}` : null,
    p.startDate ? `Since: ${p.startDate.slice(0, 7)}` : null,
    p.stack?.length ? `Stack: ${p.stack.join(", ")}` : null,
    "",
    wrap(p.longDescription ?? p.description),
    "",
    ...(p.impact?.length ? ["Impact:", ...p.impact.map((i) => `  * ${i}`), ""] : []),
    p.links?.live ? `Live: ${p.links.live}` : null,
    p.links?.repo ? `Source: ${p.links.repo}` : null,
    p.caseStudySlug ? `Case study: /case-study/${p.caseStudySlug}` : null,
  ].filter((l): l is string => l !== null);
  const children: FileNode[] = [
    { name: "README.txt", kind: "file", content: lines.join("\n"), href: p.links?.live ?? p.link },
  ];
  if (p.caseStudySlug && caseStudies[p.caseStudySlug]) {
    const cs = caseStudies[p.caseStudySlug];
    children.push({
      name: "case-study.txt",
      kind: "file",
      href: `/case-study/${cs.slug}`,
      content: [
        cs.title.toUpperCase(),
        cs.subtitle,
        "",
        `Timeline: ${cs.timeline}`,
        `Role: ${cs.role}`,
        `Tools: ${cs.tools.join(", ")}`,
        "",
        "OVERVIEW",
        wrap(cs.overview),
        "",
        "CHALLENGE",
        wrap(cs.challenge),
        "",
        "OUTCOME",
        wrap(cs.outcome),
        "",
        `Full write-up: /case-study/${cs.slug}`,
      ].join("\n"),
    });
  }
  return { name: folderName(p.name), kind: "folder", children };
}

function essayFile(e: (typeof essays)[number]): FileNode {
  return {
    name: `${e.slug}.txt`,
    kind: "file",
    href: `/craft/essay/${e.slug}`,
    content: `${e.title.toUpperCase()}\n${e.date} · ${e.readTime}\n\n${wrap(e.content)}\n\nRead it properly: /craft/essay/${e.slug}`,
  };
}

function resumeFile(): FileNode {
  const r = resumeData;
  const lines = [
    r.name.toUpperCase(),
    r.title,
    `${r.contact.location} · ${r.contact.email}`,
    "",
    wrap(r.profile),
    "",
    "EXPERIENCE",
    ...r.experience.flatMap((x) => [`${x.date}  ${x.title}, ${x.company}`, ...(x.summary ? [`  ${x.summary}`] : []), ""]),
    "EDUCATION",
    ...r.education.map((e) => `${e.date}  ${e.degree}, ${e.institution}`),
    "",
    "SKILLS",
    ...r.skills.map((s) => `${s.category}: ${s.items.join(", ")}`),
    "",
    "Printable version: /resume",
  ];
  return { name: "RESUME.txt", kind: "file", content: lines.join("\n"), href: "/resume" };
}

function nowFolder(): FileNode {
  const files: FileNode[] = canonFeed.now.map((item) => ({
    name: `${item.verb.replace(/\s+/g, "-")}.txt`,
    kind: "file",
    href: item.href,
    content: `${item.verb.toUpperCase()}\n\n${item.title}\n${item.creator}\n\n${item.note}\n\nLink: ${item.href}`,
  }));
  files.push({
    name: "about-this-folder.txt",
    kind: "file",
    content: `Generated from Canon, a catalog of ${canonFeed.totalWorks} works I have read, watched, played and listened to.\nLast synced ${canonFeed.generatedAt}. Regions this month: ${canonFeed.regions.join(", ")}.`,
  });
  return { name: "Now", kind: "folder", children: files };
}

function openSourceFolder(): FileNode {
  return {
    name: "Open Source",
    kind: "folder",
    children: openSourceContributions.map((c) => ({
      name: `${folderName(c.project)}.txt`,
      kind: "file",
      href: c.href,
      content: `${c.project.toUpperCase()} — ${c.repository}\n${c.eyebrow} · ${c.date}\n\n${c.title}\n\n${wrap(c.summary)}\n\nProof:\n${c.proof.map((p) => `  * ${p}`).join("\n")}\n\nMerged change: ${c.href}`,
    })),
  };
}

export const FILESYSTEM: FileNode = {
  name: "Desktop",
  kind: "folder",
  children: [
    {
      name: "Projects",
      kind: "folder",
      children: [
        {
          name: "README.txt",
          kind: "file",
          content:
            "Small products, careful systems, and proof over promises.\n\nEach folder is a real project from the portfolio. Open README.txt for the summary, case-study.txt where one exists.",
        },
        ...rankedProjects.map(projectFolder),
        {
          name: "the-door",
          kind: "folder",
          children: [{ name: "knock-three-times.txt", kind: "file", content: "Try: knock knock knock in the terminal." }],
        },
      ],
    },
    {
      name: "Documents",
      kind: "folder",
      children: [
        resumeFile(),
        { name: "Essays", kind: "folder", children: essays.map(essayFile) },
        openSourceFolder(),
        { name: "meeting-that-could-be-a-note.txt", kind: "file", content: "Agenda: cancel the meeting." },
        { name: "Adventure-pass.txt", kind: "file", content: "The lighthouse keeper trusts people who carry a paper moon." },
      ],
    },
    nowFolder(),
    {
      name: "Games",
      kind: "folder",
      children: [
        { name: "mines.exe", kind: "file", app: "mines", content: "Minesweeper. 9 by 9, ten mines, no mercy." },
        { name: "snake.exe", kind: "file", app: "snake", content: "Snake. Arrow keys. The walls wrap." },
        { name: "elsewhere.exe", kind: "file", app: "adventure", content: "A short adventure about excellent paperwork." },
        { name: "office.exe", kind: "file", app: "office", content: "A story about a person named You." },
      ],
    },
    {
      name: "Recycle Bin",
      kind: "folder",
      children: [{ name: "final_final_v7_REAL.txt", kind: "file", content: "This was never final." }],
    },
  ],
};

export function traverse(path: string[], root: FileNode = FILESYSTEM): FileNode | null {
  let node: FileNode | undefined = root;
  for (const part of path) {
    if (node.kind !== "folder") return null;
    node = node.children?.find((x) => x.name.toLowerCase() === part.toLowerCase());
    if (!node) return null;
  }
  return node;
}

/** Resolve a DOS/Unix-ish path argument against a cwd, without escaping the tree. */
export function resolvePath(cwd: string[], arg: string | undefined): string[] {
  if (!arg || arg === ".") return cwd;
  const absolute = /^[\\/]/.test(arg) || /^c:/i.test(arg) || arg === "~";
  const parts = arg
    .replace(/^c:/i, "")
    .replace(/^~/, "")
    .split(/[\\/]+/)
    .filter((p) => p && p !== ".");
  const out = absolute ? [] : [...cwd];
  for (const p of parts) {
    if (p === "..") out.pop();
    else out.push(p);
  }
  const node = traverse(out);
  return node ? out.map((p, i) => traverse(out.slice(0, i + 1))?.name ?? p) : out;
}

export function formatTree(node: FileNode, prefix = ""): string {
  const kids = node.children ?? [];
  return kids
    .map((k, i) => {
      const last = i === kids.length - 1;
      const line = `${prefix}${last ? "└── " : "├── "}${k.name}${k.kind === "folder" ? "/" : ""}`;
      return k.kind === "folder" ? `${line}\n${formatTree(k, prefix + (last ? "    " : "│   "))}` : line;
    })
    .filter(Boolean)
    .join("\n");
}

export const displayPath = (path: string[]) => `C:\\MAXWELL${path.length ? "\\" + path.map((p) => p.toUpperCase().replace(/\s+/g, "_")).join("\\") : ""}`;
