import assert from "node:assert/strict";
import test from "node:test";
import { canonShelfItems, canonSourceName, canonSyncState } from "./canonShelf";
import { canonFeed, type CanonNowItem } from "./canonFeed";
import { aucklandZoneLabel } from "./aucklandTime";
const now = Date.parse("2026-10-06T12:00:00Z");
const item: CanonNowItem = { id: "jellyfin:film", title: "Film", verb: "watching", href: "https://www.themoviedb.org/movie/1", evidenceSource: "jellyfin", activityAt: "2026-10-05T12:00:00Z", syncedAt: "2026-10-06T11:00:00Z", syncStatus: "ok" };
test("activity source is independent from the public destination", () => {
  assert.equal(canonSourceName(item), "Jellyfin");
  assert.equal(canonSourceName({ ...item, evidenceSource: "letterboxd" }), "Letterboxd");
});
test("unsupported screen claims in a legacy feed are omitted", () => {
  assert.deepEqual(canonShelfItems([{ ...item, activityAt: undefined }], now), []);
  assert.ok(!canonShelfItems(canonFeed.now, now).some((row) => row.title === "IF"));
});
test("dated current activity needs a healthy source and bounded recency", () => {
  assert.equal(canonShelfItems([item], now).length, 1);
  for (const change of [{ syncStatus: "error" as const }, { syncedAt: "2026-09-01T12:00:00Z" }, { activityAt: "2026-09-01T12:00:00Z" }, { activityAt: "2026-10-07T12:00:00Z" }]) assert.equal(canonShelfItems([{ ...item, ...change }], now).length, 0);
});
test("stale library material stays useful without a current activity claim", () => {
  const [row] = canonShelfItems([{ ...item, verb: "playing", syncStatus: "error" }], now);
  assert.equal(row.verb, "catalogued"); assert.ok(!row.note?.includes("playing now"));
  assert.equal(canonSyncState(row, now), "Import failed");
});
test("static HTML stays neutral until the actual clock verifies current activity", () => {
  assert.equal(canonShelfItems([item], now, false).length, 0);
  assert.equal(canonShelfItems([{ ...item, verb: "playing" }], now, false)[0].verb, "catalogued");
  assert.equal(canonShelfItems([{ ...item, verb: "watched" }], now, false)[0].verb, "watched");
});
test("known dated history survives a failed import; unknown dates remain unknown", () => {
  assert.equal(canonShelfItems([{ ...item, verb: "watched", syncStatus: "error" }], now).length, 1);
  assert.equal(canonShelfItems([{ ...item, verb: "watched", activityAt: "1969-12-31T23:59:59Z" }], now).length, 0);
  assert.equal(canonSyncState({ ...item, syncedAt: undefined }, now), "Import date unknown");
});
test("Auckland offsets follow summer, winter, and the September transition", () => {
  assert.equal(aucklandZoneLabel(new Date("2026-01-01T00:00:00Z")), "NZDT (UTC+13)");
  assert.equal(aucklandZoneLabel(new Date("2026-07-01T00:00:00Z")), "NZST (UTC+12)");
  assert.equal(aucklandZoneLabel(new Date("2026-09-26T13:59:00Z")), "NZST (UTC+12)");
  assert.equal(aucklandZoneLabel(new Date("2026-09-26T14:00:00Z")), "NZDT (UTC+13)");
});
