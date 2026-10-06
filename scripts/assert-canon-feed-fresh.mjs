#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { feedFreshnessProblems } from "./canon-freshness.mjs";

const FEED_PATH = "src/lib/canonFeed.ts";
const maxAgeDays = Number(process.env.CANON_FEED_MAX_AGE_DAYS ?? "2");
const strict = process.env.CANON_FEED_STRICT === "1";
function fail(message) { console.error(`[canon:fresh] ${message}`); process.exit(1); }
if (!Number.isInteger(maxAgeDays) || maxAgeDays < 0) fail("CANON_FEED_MAX_AGE_DAYS must be a non-negative integer.");
const source = readFileSync(FEED_PATH, "utf8");
const payload = source.match(/export const canonFeed:\s*CanonFeed\s*=\s*([\s\S]*);\s*$/)?.[1];
if (!payload) fail(`Could not read the exported snapshot in ${FEED_PATH}.`);
let feed;
try { feed = JSON.parse(payload); } catch { fail(`Invalid exported snapshot in ${FEED_PATH}.`); }
const now = process.env.CANON_FEED_NOW ? Date.parse(process.env.CANON_FEED_NOW) : Date.now();
if (!Number.isFinite(now)) fail("Invalid CANON_FEED_NOW date.");
const problems = feedFreshnessProblems(feed, now, maxAgeDays);
if (problems.length) {
  const message = problems.join(" ") + " Regenerate with bun run scripts/export-folio-feed.ts from Canon.";
  if (strict) fail(message);
  console.warn(`[canon:fresh] WARNING: ${message}`);
} else {
  process.stdout.write(`[canon:fresh] Snapshot provenance passed the freshness check (maximum import age ${maxAgeDays}d).\n`);
}
