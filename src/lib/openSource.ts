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
    href: "https://github.com/pingdotgg/t3code/pull/3930",
    issueHref: "https://github.com/pingdotgg/t3code/issues/2478",
    eyebrow: "T3 Code · pingdotgg/t3code · PR #3930",
    title: "Restored multiline input on mobile without changing desktop behavior.",
    summary:
      "Traced an Enter-key regression to the composer command handler, extracted the mobile and desktop decision into tested logic, and verified the interaction at a 390 × 844 viewport before maintainer approval.",
    resumeSummary:
      "Fixed a mobile composer regression in T3 Code while preserving desktop keyboard behavior; added focused unit coverage and validated the change with Playwright and the 1,283-test web suite.",
    proof: [
      "Merged",
      "Focused unit coverage",
      "Mobile Playwright verification",
    ],
    stack: ["TypeScript", "React", "Lexical", "Vitest", "Playwright"],
  },
];
