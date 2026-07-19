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
    href: "https://github.com/pingdotgg/t3code/pull/4112",
    issueHref: "https://github.com/pingdotgg/t3code/issues/3983",
    eyebrow: "T3 Code · coding-agent interface · 3 merged PRs",
    title: "Prevented incorrect client clocks from corrupting conversation order across machines.",
    summary:
      "T3 Code is a web and desktop interface for running Codex, Claude, Cursor, and other coding agents. Across three merged PRs, I fixed mobile multiline input, runtime message ID collisions, and client clock skew at the server persistence boundary.",
    resumeSummary:
      "Contributed three upstream fixes to T3 Code across mobile input and server data integrity: multiline composition, runtime-safe message IDs, and canonical timestamps for correct cross-device ordering; verified the latest against 4,756 tests.",
    proof: [
      "3 merged upstream PRs",
      "Server-boundary regression coverage",
      "4,756-test verification",
    ],
    stack: ["TypeScript", "Effect", "React", "Vitest", "Playwright"],
  },
];
