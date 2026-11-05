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
    href: "https://github.com/pingdotgg/t3code/pulls?q=is%3Apr+is%3Amerged+author%3Amaxwellyoung",
    issueHref: "https://github.com/pingdotgg/t3code/issues/3983",
    eyebrow: "T3 Code · coding-agent interface · upstream contributor",
    title: "Merged fixes across agent permissions, secret handling, and client and server reliability.",
    summary:
      "T3 Code is a web and desktop interface for running Codex, Claude, Cursor, and other coding agents. My merged fixes make Plan mode ask before writes in Auto and Full access, disable executable capabilities in Claude metadata generation, preserve inline provider secrets on redacted saves, and keep PR links through reconnects. Earlier fixes covered mobile input and message ordering. Each change ships with regression tests.",
    resumeSummary:
      "Contributed upstream fixes across agent permissions, provider secret handling, and client and server reliability, including Plan mode write approvals and redacted secret saves.",
    proof: [
      "Merged upstream",
      "Regression coverage",
      "Server, web, and mobile fixes",
    ],
    stack: ["TypeScript", "Effect", "React", "Vitest", "Playwright"],
  },
];
