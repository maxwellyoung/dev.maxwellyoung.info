#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const cwd = process.cwd();
const promptsPath = path.join(cwd, "scripts/project-image-prompts.json");
const outputDir = path.join(cwd, "public/projectImages/generated");

const args = process.argv.slice(2);
const hasFlag = (flag) => args.includes(flag);
const getArgValue = (flag, fallback) => {
  const idx = args.indexOf(flag);
  if (idx === -1 || idx === args.length - 1) return fallback;
  return args[idx + 1];
};

const shouldRun = hasFlag("--run");
const shouldPrint = hasFlag("--print") || !shouldRun;
const selectedSlugs = getArgValue("--slug", "")
  .split(",")
  .map((slug) => slug.trim())
  .filter(Boolean);

const model = getArgValue("--model", process.env.IMAGE_MODEL ?? "gpt-image-1");
const size = getArgValue("--size", process.env.IMAGE_SIZE ?? "1536x1024");
const quality = getArgValue("--quality", process.env.IMAGE_QUALITY ?? "high");

function die(msg) {
  console.error(`\n[project-images] ${msg}\n`);
  process.exit(1);
}

async function loadPrompts() {
  const raw = await fs.readFile(promptsPath, "utf8");
  const json = JSON.parse(raw);
  if (!Array.isArray(json.projects)) {
    die("Invalid prompt file: expected `projects` array.");
  }
  return json;
}

function filterProjects(projects) {
  if (selectedSlugs.length === 0) return projects;
  const wanted = new Set(selectedSlugs);
  return projects.filter((project) => wanted.has(project.slug));
}

function printPlan(styleGuide, projects) {
  console.log("\n# Project Image Generation Plan\n");
  console.log(`Model: ${model}`);
  console.log(`Size: ${size}`);
  console.log(`Quality: ${quality}`);
  console.log(`Output: ${path.relative(cwd, outputDir)}`);
  console.log(`Projects: ${projects.length}\n`);

  console.log("## Global Constraints");
  for (const rule of styleGuide.globalConstraints ?? []) {
    console.log(`- ${rule}`);
  }
  console.log("");

  console.log("## Prompts");
  for (const project of projects) {
    console.log(`- ${project.slug} -> ${project.filename}`);
    console.log(`  ${project.prompt}`);
  }
  console.log("");
}

async function generateImage({ prompt, filename }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    die("OPENAI_API_KEY is required for --run.");
  }

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt,
      size,
      quality,
      output_format: "png",
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Image generation failed (${response.status}): ${text}`);
  }

  const body = await response.json();
  const b64 = body?.data?.[0]?.b64_json;
  if (!b64) {
    throw new Error("Image response did not include data[0].b64_json");
  }

  const bytes = Buffer.from(b64, "base64");
  const outPath = path.join(outputDir, filename);
  await fs.writeFile(outPath, bytes);
  return outPath;
}

async function main() {
  const promptConfig = await loadPrompts();
  const projects = filterProjects(promptConfig.projects);

  if (projects.length === 0) {
    die("No matching projects found. Check --slug values.");
  }

  if (shouldPrint) {
    printPlan(promptConfig.styleGuide ?? {}, projects);
    if (!shouldRun) {
      console.log("Dry run complete. Re-run with --run to generate assets.\n");
      return;
    }
  }

  await fs.mkdir(outputDir, { recursive: true });

  console.log(`\n[project-images] Generating ${projects.length} image(s)...`);
  for (const project of projects) {
    const mergedPrompt = [
      project.prompt,
      ...(promptConfig.styleGuide?.globalConstraints ?? []),
    ].join(" ");
    const outPath = await generateImage({
      prompt: mergedPrompt,
      filename: project.filename,
    });
    console.log(`[project-images] Saved ${path.relative(cwd, outPath)}`);
  }
  console.log("[project-images] Done.\n");
}

main().catch((error) => {
  die(error instanceof Error ? error.message : String(error));
});
