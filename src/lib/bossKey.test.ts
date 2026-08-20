import test from "node:test";
import assert from "node:assert/strict";
import { BOSS_KEY_OPEN_EVENT, calculateForecast, getBossKeyAction, spreadsheetColumnName } from "./bossKey";

test("footer triggers and the global listener share a stable open event", () => {
  assert.equal(BOSS_KEY_OPEN_EVENT, "boss-key:open");
});

test("Ctrl+Shift+X toggles boss mode regardless of key casing", () => {
  assert.equal(getBossKeyAction({ key: "x", ctrlKey: true, shiftKey: true }), "toggle");
  assert.equal(getBossKeyAction({ key: "X", ctrlKey: true, shiftKey: true }), "toggle");
});

test("forecast formula applies the displayed percentage to the source value", () => {
  assert.equal(calculateForecast(428_100, 5), 449_505);
});

test("Escape only closes an active boss mode", () => {
  assert.equal(getBossKeyAction({ key: "Escape" }, true), "close");
  assert.equal(getBossKeyAction({ key: "Escape" }, false), null);
});

test("unrelated shortcuts do nothing", () => {
  assert.equal(getBossKeyAction({ key: "x", ctrlKey: true }), null);
  assert.equal(getBossKeyAction({ key: "x", shiftKey: true }), null);
  assert.equal(getBossKeyAction({ key: "x", ctrlKey: true, shiftKey: true, altKey: true }), null);
});

test("spreadsheet columns continue after Z", () => {
  assert.equal(spreadsheetColumnName(0), "A");
  assert.equal(spreadsheetColumnName(25), "Z");
  assert.equal(spreadsheetColumnName(26), "AA");
});
