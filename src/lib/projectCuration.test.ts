import test from "node:test";
import assert from "node:assert/strict";
import { rankedProjects, selectedWorkProjects, supportingProjects, homepageApps, independentApps } from "./projects";
import { getCaseStudy } from "./caseStudies";

test("the homepage shows a curated selection of work and apps", () => {
  assert.deepEqual(selectedWorkProjects.map((project) => project.slug), [
    "silk", "medicines-safety", "liner", "chlita", "margin", "skillscan",
  ]);
  assert.deepEqual(homepageApps.map((project) => project.slug), ["afterlight", "holdspace"]);
  assert.deepEqual(supportingProjects.map((project) => project.slug), ["default-index"]);
});

test("the catalogs retain projects omitted from the homepage", () => {
  assert.deepEqual(independentApps.map((project) => project.slug), [
    "vape-quit-coach", "afterlight", "holdspace", "good-news-bad-news", "doomscroll",
  ]);
  for (const slug of ["t3craft", "second-brain", "playback", "whakapapa", "dayle"]) {
    assert.ok(rankedProjects.some((project) => project.slug === slug), slug);
  }
});

test("personal tools expose proof without private source links", () => {
  for (const project of rankedProjects.filter(project => project.collection === "personal-tools")) {
    assert.ok(project.screenshots?.length);
    assert.ok(project.mediaCaption);
    assert.equal(project.codeLink, undefined);
    if (project.slug === "margin") {
      assert.equal(project.launchStage, "Live");
      assert.equal(project.link, "https://margin.maxwellyoung.info");
      assert.equal(getCaseStudy("margin")?.liveUrl, project.link);
    } else {
      assert.notEqual(project.launchStage, "Live");
      assert.equal(project.link, undefined);
    }
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
