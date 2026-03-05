import test from "node:test";
import assert from "node:assert/strict";
import { projects } from "./projects";

const bySlug = new Map(projects.map((p) => [p.slug, p]));

test("projects have unique slugs", () => {
  assert.equal(bySlug.size, projects.length);
});

test("legacy link aliases are derived from links", () => {
  for (const project of projects) {
    assert.equal(project.link, project.links?.live);
    assert.equal(project.codeLink, project.links?.repo);
  }
});

test("launch truth for key projects is locked", () => {
  assert.equal(bySlug.get("gambit")?.link, "https://gambit.ninetynine.digital");

  assert.equal(bySlug.get("afterlight")?.releaseStage, "in-progress");
  assert.equal(bySlug.get("afterlight")?.link, undefined);

  assert.equal(bySlug.get("dry-club")?.releaseStage, "in-progress");
  assert.equal(bySlug.get("dry-club")?.link, undefined);

  assert.equal(bySlug.get("doomscroll")?.releaseStage, "released");
  assert.equal(bySlug.get("gnbn")?.releaseStage, "released");
  assert.equal(bySlug.get("holdspace")?.releaseStage, "released");

  assert.equal(bySlug.get("whakapapa")?.releaseStage, "in-progress");
  assert.equal(bySlug.get("liner")?.releaseStage, "in-progress");
});

test("in-progress projects do not expose live links unless preview is allowed", () => {
  for (const project of projects) {
    if (project.releaseStage === "in-progress" && !project.allowPreviewLink) {
      assert.equal(project.link, undefined, `${project.slug} should not expose link`);
    }
  }
});
