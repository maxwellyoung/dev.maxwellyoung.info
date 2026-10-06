// The Maxwell OS file system, read by the terminal. Built once from the same
// data the rest of the portfolio renders, so every file is real material.
import { rankedProjects, type Project } from "./projects";
import { caseStudies } from "./caseStudies";
import { essays } from "./essays";
import { resumeData } from "./resumeData";
import { canonFeed } from "./canonFeed";
import { canonShelfItems } from "./canonShelf";
import { openSourceContributions } from "./openSource";
import type { AppId } from "./maxwellOS";

export type FileNode = {
  name: string;
  kind: "folder" | "file";
  content?: string;
  /** External or internal link the file points at (shown in Notepad and the Browser). */
  href?: string;
  /** Files that launch a program instead of printing. */
  app?: AppId;
  /** Project folders remember their slug so `open` can jump straight to them. */
  slug?: string;
  children?: FileNode[];
};

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
    p.longDescription ?? p.description,
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
        cs.overview,
        "",
        "CHALLENGE",
        cs.challenge,
        "",
        "OUTCOME",
        cs.outcome,
        "",
        `Full write-up: /case-study/${cs.slug}`,
      ].join("\n"),
    });
  }
  return { name: folderName(p.name), kind: "folder", slug: p.slug, children };
}

function essayFile(e: (typeof essays)[number]): FileNode {
  return {
    name: `${e.slug}.txt`,
    kind: "file",
    href: `/craft/essay/${e.slug}`,
    content: `${e.title.toUpperCase()}\n${e.date} · ${e.readTime}\n\n${e.content}\n\nRead it properly: /craft/essay/${e.slug}`,
  };
}

function resumeFile(): FileNode {
  const r = resumeData;
  const lines = [
    r.name.toUpperCase(),
    r.title,
    `${r.contact.location} · ${r.contact.email}`,
    "",
    r.profile,
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
  // Same honesty rules as the homepage shelf: stale "current" claims are downgraded.
  const files: FileNode[] = canonShelfItems(canonFeed.now).map((item) => ({
    name: `${item.verb.replace(/\s+/g, "-")}.txt`,
    kind: "file",
    href: item.href,
    content: [item.verb.toUpperCase(), "", item.title, item.creator, "", item.note, item.href ? `\nLink: ${item.href}` : undefined].filter((l) => l !== undefined).join("\n"),
  }));
  files.push({
    name: "about-this-folder.txt",
    kind: "file",
    content: `Generated from Canon, my catalog of ${canonFeed.totalWorks.toLocaleString("en-NZ")} things I have read, watched, played and listened to.\nSnapshot ${canonFeed.generatedAt}. Leaning toward: ${canonFeed.regions.join(", ")}.`,
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
      content: `${c.project.toUpperCase()} — ${c.repository}\n${c.eyebrow} · ${c.date}\n\n${c.title}\n\n${c.summary}\n\nProof:\n${c.proof.map((p) => `  * ${p}`).join("\n")}\n\nMerged change: ${c.href}`,
    })),
  };
}

export const FILESYSTEM: FileNode = {
  name: "Desktop",
  kind: "folder",
  children: [
    { name: "README.txt", kind: "file", app: "readme", content: "Start here. Type open readme, or just open work." },
    { name: "Projects", kind: "folder", children: rankedProjects.map(projectFolder) },
    {
      name: "Documents",
      kind: "folder",
      children: [resumeFile(), { name: "Essays", kind: "folder", children: essays.map(essayFile) }, openSourceFolder()],
    },
    nowFolder(),
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

export const displayPath = (path: string[]) => `~${path.length ? "/" + path.join("/") : ""}`;
