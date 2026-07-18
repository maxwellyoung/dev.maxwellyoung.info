export interface OpenSourceContribution {
  project: string;
  repository: string;
  role: string;
  date: string;
  href: string;
  issueHref: string;
  eyebrow: string;
  title: string;
  summary: string;
  resumeSummary: string;
  proof: string[];
  stack: string[];
}

export const openSourceContributions: OpenSourceContribution[] = [
  {
    project: "T3 Code",
    repository: "pingdotgg/t3code",
    role: "Contributor",
    date: "Jul 2026",
    href: "https://github.com/pingdotgg/t3code/pull/3932",
    issueHref: "https://github.com/pingdotgg/t3code/issues/3791",
    eyebrow: "T3 Code · coding-agent interface · 2 merged PRs",
    title: "Stopped new coding-agent replies from being attached to old messages after a restart.",
    summary:
      "T3 Code is a web and desktop interface for running Codex, Claude, Cursor, and other coding agents. I traced disappearing replies to reused internal IDs, fixed the runtime boundary across two providers, and added a cross-restart regression test.",
    resumeSummary:
      "Contributed to T3 Code, an interface for running multiple coding agents. Landed two upstream fixes: restored mobile multiline input and stopped new replies attaching to old messages after runtime restarts; verified the latter against 1,400 tests.",
    proof: [
      "2 merged upstream PRs",
      "Cross-runtime regression coverage",
      "1,400-test verification",
    ],
    stack: ["TypeScript", "Effect", "React", "Vitest", "Playwright"],
  },
];
