import test from "node:test";
import assert from "node:assert/strict";
import { canonFeed } from "./canonFeed";

const PUBLIC_DESTINATIONS = new Set([
  "music.apple.com",
  "openlibrary.org",
  "store.steampowered.com",
  "www.themoviedb.org",
]);

test("currently-into spotlights have public, allowlisted destinations", () => {
  assert.ok(canonFeed.now.length > 0);
  assert.ok(canonFeed.sourceSyncedAt, "feed is missing the Canon source sync timestamp");
  assert.ok(!Number.isNaN(new Date(canonFeed.sourceSyncedAt).getTime()), "sourceSyncedAt is not parseable");

  for (const item of canonFeed.now) {
    assert.ok(item.id.length > 0, `${item.title} is missing a stable Canon id`);
    assert.ok(item.note?.trim(), `${item.title} is missing a public note`);
    assert.ok(item.href, `${item.title} is missing a public destination`);

    const destination = new URL(item.href);
    assert.equal(destination.protocol, "https:");
    assert.ok(PUBLIC_DESTINATIONS.has(destination.hostname), `${item.title} links to ${destination.hostname}`);
    assert.equal(destination.username, "");
    assert.equal(destination.password, "");
  }
});
