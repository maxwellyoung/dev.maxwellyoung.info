import assert from "node:assert/strict";
import test from "node:test";
import {
  formatCanonExportDate,
  formatCanonSyncDate,
} from "./canonFormatting";

test("formats Canon export dates independently of the runtime timezone", () => {
  assert.equal(formatCanonExportDate("2026-07-17"), "17 Jul 2026");
});

test("formats Canon sync timestamps in the portfolio timezone", () => {
  assert.equal(
    formatCanonSyncDate("2026-07-17T21:58:29.347Z"),
    "18 Jul, 9:58 am"
  );
});
