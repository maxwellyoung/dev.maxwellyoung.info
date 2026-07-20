import test from "node:test";
import assert from "node:assert/strict";
import {
  buildReceiptEntry,
  filterCommands,
  formatCurrency,
  getWorkbookMeta,
  isEditableTarget,
  projectDeliveryRows,
  updateWorkbook,
  closeClickAction,
} from "./portfolioUtilities";

test("editable targets exclude palette shortcuts", () => {
  assert.equal(isEditableTarget({ tagName: "INPUT" }), true);
  assert.equal(isEditableTarget({ tagName: "DIV", isContentEditable: true }), true);
  assert.equal(isEditableTarget({ tagName: "BUTTON" }), false);
});

test("commands search labels, keywords and preserve groups", () => {
  const result = filterCommands([
    { id: "projects", label: "View projects", group: "Navigate", keywords: ["work"] },
    { id: "receipt", label: "Session receipt", group: "Utilities", keywords: ["privacy"] },
  ], "privacy");
  assert.deepEqual(result.map((item) => item.id), ["receipt"]);
});

test("receipt stores only authored path without query or fragment", () => {
  assert.deepEqual(buildReceiptEntry("https://dev.maxwellyoung.info/projects?token=no#x", new Date("2026-07-20T02:00:00Z")), {
    path: "/projects",
    visitedAt: "2026-07-20T02:00:00.000Z",
  });
});

test("delivery rows only expose ranked public authored status", () => {
  const rows = projectDeliveryRows([
    { name: "Public", visibility: "public", status: "Active", launchStage: "Live", priority: 2 },
    { name: "Private", visibility: "private", status: "WIP", priority: 1 },
  ]);
  assert.deepEqual(rows, [{ name: "Public", status: "Live" }]);
});

test("workbook metadata is locale aware with en-NZ fallback", () => {
  const meta = getWorkbookMeta(new Date("2026-07-20T12:00:00Z"), "not-a-locale");
  assert.equal(meta.quarter, "Q3");
  assert.match(meta.filename, /^Q3 Operating Forecast 2026-07-20\.xlsx$/);
  assert.match(formatCurrency(1234, "en-NZ"), /1,234/);
});

test("session assumptions and headcount drive forecast", () => {
  const next = updateWorkbook({ growth: 5, headcount: 4, costPerHire: 100_000, baseline: 400_000 }, { growth: 10, headcount: 5 });
  assert.equal(next.forecast, 540_000);
});

test("Excel close discriminates single close from double-click panic", () => {
  assert.equal(closeClickAction(1), "close");
  assert.equal(closeClickAction(2), "panic");
});
