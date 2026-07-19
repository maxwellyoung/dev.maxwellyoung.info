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
    date: "Ongoing",
    href: "https://github.com/pingdotgg/t3code/pull/4112",
    issueHref: "https://github.com/pingdotgg/t3code/issues/3983",
    eyebrow: "T3 Code · coding-agent interface · upstream contributor",
    title: "Improved mobile input and cross-device conversation reliability.",
    summary:
      "T3 Code is a web and desktop interface for running Codex, Claude, Cursor, and other coding agents. I contribute focused fixes across the mobile composer and server data-integrity boundaries, with regression coverage for message identity, ordering, and client clock skew.",
    resumeSummary:
      "Contributed upstream fixes across mobile input and server data integrity, including multiline composition, runtime-safe message IDs, and reliable cross-device conversation ordering.",
    proof: [
      "Merged upstream",
      "Regression coverage",
      "Mobile and server fixes",
    ],
    stack: ["TypeScript", "Effect", "React", "Vitest", "Playwright"],
  },
];
