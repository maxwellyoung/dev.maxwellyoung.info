import test from "node:test";
import assert from "node:assert/strict";
import { rankedProjects, selectedWorkProjects, supportingProjects, independentApps } from "./projects";
import { getCaseStudy } from "./caseStudies";

test("each public project appears in exactly one homepage list", () => {
  const placed = [...selectedWorkProjects, ...independentApps, ...supportingProjects].map(project => project.slug);
  assert.equal(new Set(placed).size, placed.length);
  assert.deepEqual([...placed].sort(), rankedProjects.map(project => project.slug).sort());
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
