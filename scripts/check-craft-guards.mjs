#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { globSync } from "node:fs";

const files = [
  ...globSync("src/components/craft/**/*.tsx"),
  ...globSync("src/app/craft/**/*.tsx"),
];

const failures = [];

for (const file of files) {
  const source = readFileSync(file, "utf8");

  const hasClassTransitionAll =
    /className\s*=\s*["'`][^"'`]*transition-all/.test(source) ||
    /className\s*=\s*{[^}]*transition-all/.test(source);

  if (hasClassTransitionAll) {
    failures.push(`${file}: contains transition-all`);
  }

  if (source.includes("exit={") && !source.includes("AnimatePresence")) {
    failures.push(`${file}: has exit animations without AnimatePresence`);
  }
}

if (failures.length > 0) {
  console.error("Craft guard checks failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Craft guard checks passed.");
