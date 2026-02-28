import test from "node:test";
import assert from "node:assert/strict";
import { formatDate } from "./utils";

test("formatDate formats YYYY-MM-DD inputs consistently", () => {
  assert.equal(formatDate("2024-01-02"), "January 2, 2024");
});

test("formatDate formats ISO datetime inputs", () => {
  assert.equal(formatDate("2024-01-02T12:00:00Z"), "January 2, 2024");
});

test("formatDate returns original input when parsing fails", () => {
  assert.equal(formatDate("not-a-date"), "not-a-date");
});
