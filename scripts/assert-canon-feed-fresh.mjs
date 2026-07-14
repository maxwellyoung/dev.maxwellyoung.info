#!/usr/bin/env node

import { readFileSync } from "node:fs";

const FEED_PATH = "src/lib/canonFeed.ts";
const DAY_MS = 24 * 60 * 60 * 1000;
const maxAgeDays = Number.parseInt(process.env.CANON_FEED_MAX_AGE_DAYS ?? "2", 10);

function fail(message) {
  console.error(`[canon:fresh] ${message}`);
  process.exit(1);
}

if (!Number.isFinite(maxAgeDays) || maxAgeDays < 0) {
  fail("CANON_FEED_MAX_AGE_DAYS must be a non-negative integer.");
}

const source = readFileSync(FEED_PATH, "utf8");
const sourceSyncedAt = source.match(/"sourceSyncedAt":\s*"([^"]+)"/)?.[1];
const generatedAt = source.match(/"generatedAt":\s*"(\d{4}-\d{2}-\d{2})"/)?.[1];
const freshnessDate = sourceSyncedAt ?? (generatedAt ? `${generatedAt}T12:00:00Z` : null);

if (!freshnessDate) {
  fail(`Could not find sourceSyncedAt or generatedAt in ${FEED_PATH}.`);
}

const syncedDate = new Date(freshnessDate);
if (Number.isNaN(syncedDate.getTime())) {
  fail(`Invalid Canon freshness date: ${freshnessDate}.`);
}

const now = process.env.CANON_FEED_NOW ? new Date(process.env.CANON_FEED_NOW) : new Date();
if (Number.isNaN(now.getTime())) {
  fail(`Invalid CANON_FEED_NOW date: ${process.env.CANON_FEED_NOW}.`);
}

const ageDays = Math.max(0, Math.floor((now.getTime() - syncedDate.getTime()) / DAY_MS));

if (ageDays > maxAgeDays) {
  fail(
    `${FEED_PATH} source data is ${ageDays} days old (synced ${freshnessDate}). ` +
      "Regenerate it with `bun run scripts/export-folio-feed.ts` from the Canon repo.",
  );
}

process.stdout.write(`[canon:fresh] ${FEED_PATH} source synced ${freshnessDate}; age ${ageDays}d <= ${maxAgeDays}d.\n`);
