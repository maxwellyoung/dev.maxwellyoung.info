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
    eyebrow: "T3 Code · pingdotgg/t3code · 2 merged PRs",
    title: "Prevented persisted assistant replies from colliding after runtime restarts.",
    summary:
      "After fixing a mobile composer regression, traced a runtime-integrity bug to reused ACP assistant IDs. Scoped IDs per runtime, threaded the new dependency through two provider stacks, and added a cross-restart regression test.",
    resumeSummary:
      "Landed two upstream T3 Code fixes: restored mobile multiline input and prevented persisted assistant replies from colliding across ACP runtime restarts; verified the latter against 1,400 tests.",
    proof: [
      "2 merged upstream PRs",
      "Cross-runtime regression coverage",
      "1,400-test verification",
    ],
    stack: ["TypeScript", "Effect", "React", "Vitest", "Playwright"],
  },
];
