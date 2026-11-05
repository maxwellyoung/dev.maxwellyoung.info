import { test } from "node:test";
import assert from "node:assert/strict";
import { essays, readTimeFor, splitEssayBlocks } from "./essays";

test("a fenced code block with a blank line stays one block", () => {
  const blocks = splitEssayBlocks("Intro.\n\n```ts\nconst a = 1\n\nconst b = 2\n```\n\nOutro.");
  assert.deepEqual(blocks, ["Intro.", "```ts\nconst a = 1\n\nconst b = 2\n```", "Outro."]);
});

test("every essay's code fences are kept whole", () => {
  for (const essay of essays) {
    for (const block of splitEssayBlocks(essay.content)) {
      const fences = block.split("\n").filter((l) => l.trimStart().startsWith("```")).length;
      assert.ok(
        fences === 0 || (fences === 2 && block.startsWith("```")),
        `${essay.slug}: ${block.slice(0, 40)}`,
      );
    }
  }
});

test("read time follows word count", () => {
  assert.equal(readTimeFor("word ".repeat(100)), "1 min");
  assert.equal(readTimeFor("word ".repeat(660)), "3 min");
});
