import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const SELF = "scripts/privacy-scan.mjs";
const files = execFileSync(
  "git",
  ["ls-files", "--cached", "--others", "--exclude-standard"],
  { encoding: "utf8" },
)
  .split("\n")
  .filter(Boolean)
  .filter((file) => existsSync(file))
  .filter((file) => file !== SELF);

const forbiddenPaths = [
  /MOBILE_APP_FINAL_PREP/i,
  /INTEGRATION_SUMMARY/i,
  /(?:^|\/)STATUS\.md$/i,
  /(?:^|\/)(?:playwright-report|test-results|screenshots?)(?:\/|$)/i,
];

const forbiddenContent = [
  { label: "absolute local path", pattern: /\/Users\/[A-Za-z0-9._-]+\// },
  { label: "private Notion URL", pattern: /https?:\/\/(?:www\.)?notion\.so\//i },
  { label: "raw team-chat marker", pattern: /Discord thread|team comms|Owner Breakdown/i },
  { label: "release-prep detail", pattern: /TestFlight ready for users|Private-media isolation/i },
  { label: "credential-like token", pattern: /(?:sk-(?:proj-)?|ghp_|xox[baprs]-)[A-Za-z0-9_-]{16,}/ },
  { label: "private key", pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
];

const findings = [];

for (const file of files) {
  for (const pattern of forbiddenPaths) {
    if (pattern.test(file)) findings.push(`${file}: private artifact path`);
  }

  const buffer = readFileSync(file);
  if (buffer.includes(0) || buffer.byteLength > 2_000_000) continue;

  const content = buffer.toString("utf8");
  for (const rule of forbiddenContent) {
    if (rule.pattern.test(content)) findings.push(`${file}: ${rule.label}`);
  }
}

if (findings.length > 0) {
  console.error("Privacy scan failed:\n");
  for (const finding of findings) console.error(`- ${finding}`);
  process.exit(1);
}

process.stdout.write(
  `Privacy scan passed (${files.length} public worktree files checked).\n`,
);
