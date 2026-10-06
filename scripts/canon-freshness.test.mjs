import assert from "node:assert/strict";
import test from "node:test";
import { feedFreshnessProblems } from "./canon-freshness.mjs";
const now = Date.parse("2026-10-06T12:00:00Z");
const item = { title: "Film", evidenceSource: "jellyfin", syncedAt: "2026-10-06T11:00:00Z", syncStatus: "ok" };
test("export generation and global successful sync cannot stand in for missing per-item freshness", () => {
  assert.equal(feedFreshnessProblems({ generatedAt: "2026-10-06", sourceSyncedAt: item.syncedAt, now: [{ title: "Legacy" }] }, now, 2).length, 1);
});
test("freshness includes failed, stale, future, and unknown sources", () => {
  assert.deepEqual(feedFreshnessProblems({ now: [item] }, now, 2), []);
  for (const change of [{ syncStatus: "error" }, { syncedAt: "2026-09-01T00:00:00Z" }, { syncedAt: "2026-10-07T00:00:00Z" }, { syncedAt: null }]) assert.equal(feedFreshnessProblems({ now: [{ ...item, ...change }] }, now, 2).length, 1);
});
