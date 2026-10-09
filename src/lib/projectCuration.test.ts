import test from "node:test";
import assert from "node:assert/strict";
import { rankedProjects, selectedWorkProjects, supportingProjects, independentApps } from "./projects";
import { getCaseStudy } from "./caseStudies";

test("each public project appears in exactly one homepage list", () => {
  const placed = [...selectedWorkProjects, ...independentApps, ...supportingProjects].map(project => project.slug);
  assert.equal(new Set(placed).size, placed.length);
  assert.deepEqual([...placed].sort(), rankedProjects.map(project => project.slug).sort());
});

test("the first view features mobile leadership, client delivery, and research ownership", () => {
  assert.deepEqual(selectedWorkProjects.map(project => project.slug), ["silk", "chlita", "medicines-safety"]);
  assert.equal(selectedWorkProjects[0].role, "Mobile lead");
  assert.equal(selectedWorkProjects[1].role, "Solo Designer & Developer");
  assert.equal(selectedWorkProjects[2].role, "Designer & Developer");
  for (const slug of ["liner", "t3craft"]) {
    assert.ok(supportingProjects.some(project => project.slug === slug));
  }
});

test("Ch'lita's concise case study retains solo ownership and client publishing", () => {
  const study = getCaseStudy("chlita")!;
  assert.equal(study.role, "Solo Designer & Developer");
  assert.equal(study.presentation, "concise");
  assert.equal(study.liveUrl, "https://chlita.com");
  assert.match(study.approach[0].description, /Sanity/);
  assert.ok(study.decisionLog?.every(decision => decision.tradeoff));
});

test("only Second Brain remains listed from the personal tools, inside Other work", () => {
  const listedTools = rankedProjects.filter(project => project.collection === "personal-tools");
  assert.deepEqual(listedTools.map(project => project.slug), ["second-brain"]);
  assert.ok(supportingProjects.some(project => project.slug === "second-brain"));
});

test("listed private tools expose proof and boundaries without private source links", () => {
  for (const project of rankedProjects.filter(project => project.collection === "personal-tools")) {
    assert.ok(project.screenshots?.length);
    assert.ok(project.mediaCaption);
    assert.notEqual(project.launchStage, "Live");
    assert.equal(project.codeLink, undefined);
    assert.equal(project.link, undefined);
    const copy = JSON.stringify(project);
    assert.doesNotMatch(copy, /github\.com\/maxwellyoung\/(?:uni-brain|autobahn|epub-compressor)|tailnet|100\.\d+\.\d+\.\d+|\/Users\//i);
  }
});

test("Autobahn case study retains original-author attribution without implying a joint team", () => {
  const study = getCaseStudy("autobahn-extensions")!;
  assert.ok(study.credits);
  assert.match(study.credits.text, /Eli Rousso \/ Rams/);
  assert.equal(study.team, undefined);
  assert.equal(study.githubUrl, undefined);
});
