import test from "node:test";
import assert from "node:assert/strict";
import { personalToolProjects, selectedWorkProjects, supportingProjects, independentApps } from "./projects";
import { getCaseStudy } from "./caseStudies";

test("personal tools are a curated collection without duplicate placement", () => {
  assert.deepEqual(personalToolProjects.map(project => project.slug), ["second-brain", "autobahn-extensions", "epub-compressor"]);
  const otherSlugs = new Set([...selectedWorkProjects, ...supportingProjects, ...independentApps].map(project => project.slug));
  assert.ok(personalToolProjects.every(project => !otherSlugs.has(project.slug)));
});

test("private tool entries expose proof and boundaries without private source links", () => {
  for (const project of personalToolProjects) {
    assert.ok(project.screenshots?.length);
    assert.ok(project.mediaCaption);
    assert.notEqual(project.launchStage, "Live");
    assert.equal(project.codeLink, undefined);
    assert.equal(project.link, undefined);
    const copy = JSON.stringify(project);
    assert.doesNotMatch(copy, /github\.com\/maxwellyoung\/(?:uni-brain|autobahn|epub-compressor)|tailnet|100\.\d+\.\d+\.\d+|\/Users\//i);
  }
});

test("Autobahn retains original-author attribution without implying a joint team", () => {
  const project = personalToolProjects.find(project => project.slug === "autobahn-extensions")!;
  assert.match(project.description, /originally created by Eli Rousso \/ Rams/);
  assert.equal(project.role, "Fork & extensions");
  assert.equal(project.attribution?.links[1].href, "https://github.com/rams-design/autobahn");
  const study = getCaseStudy("autobahn-extensions")!;
  assert.ok(study.credits);
  assert.equal(study.team, undefined);
  assert.equal(study.githubUrl, undefined);
});
