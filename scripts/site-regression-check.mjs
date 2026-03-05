#!/usr/bin/env node

import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const args = new Set(process.argv.slice(2));
const getArgValue = (flag, fallback) => {
  const idx = process.argv.indexOf(flag);
  if (idx === -1 || idx + 1 >= process.argv.length) return fallback;
  return process.argv[idx + 1];
};

const BASE_URL = getArgValue("--base", process.env.BASE_URL || "http://localhost:3000");
const UPDATE_BASELINE = args.has("--update-baseline");
const TAKE_SCREENSHOTS = args.has("--screenshots");
const OUT_DIR = path.resolve("artifacts/site-regression");
const BASELINE_FILE = path.resolve("scripts/site-regression-baseline.json");

const ROUTES = ["/projects", "/for-hiring-managers", "/work-with-me"];
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

function keyFor(route, viewportName) {
  return `${route}|${viewportName}`;
}

function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function loadBaseline() {
  try {
    const raw = await fs.readFile(BASELINE_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : { hashes: {} };
  } catch {
    return { hashes: {} };
  }
}

async function saveBaseline(data) {
  await fs.writeFile(BASELINE_FILE, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

async function runStatusChecks() {
  const results = [];
  for (const route of ROUTES) {
    const url = `${BASE_URL}${route}`;
    try {
      const res = await fetch(url, { redirect: "follow" });
      results.push({
        route,
        url,
        status: res.status,
        ok: res.status >= 200 && res.status < 400,
      });
    } catch (error) {
      results.push({
        route,
        url,
        status: 0,
        ok: false,
        error: String(error),
      });
    }
  }
  return results;
}

async function runScreenshotChecks(baseline) {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ headless: true });
  const screenshotHashes = {};
  const mismatches = [];
  const captureDir = path.join(OUT_DIR, new Date().toISOString().replace(/[:.]/g, "-"));
  await ensureDir(captureDir);

  try {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();

      for (const route of ROUTES) {
        const url = `${BASE_URL}${route}`;
        await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
        const fileName = `${route.replace(/\//g, "_").replace(/^_/, "") || "home"}-${viewport.name}.png`;
        const filePath = path.join(captureDir, fileName);
        await page.screenshot({ path: filePath, fullPage: true });
        const image = await fs.readFile(filePath);
        const hash = sha256(image);
        const key = keyFor(route, viewport.name);
        screenshotHashes[key] = hash;

        const baselineHash = baseline.hashes?.[key];
        if (baselineHash && baselineHash !== hash) {
          mismatches.push({
            key,
            route,
            viewport: viewport.name,
            baselineHash,
            currentHash: hash,
            filePath,
          });
        }
      }

      await context.close();
    }
  } finally {
    await browser.close();
  }

  return { screenshotHashes, mismatches, captureDir };
}

function printStatus(results) {
  console.log("\nSite status checks");
  for (const r of results) {
    if (r.ok) {
      console.log(`  OK    ${r.status} ${r.route}`);
    } else {
      console.log(`  FAIL  ${r.status} ${r.route}${r.error ? ` (${r.error})` : ""}`);
    }
  }
}

function printMismatches(mismatches) {
  if (!mismatches.length) {
    console.log("\nScreenshot diff");
    console.log("  OK    no screenshot hash regressions");
    return;
  }
  console.log("\nScreenshot diff");
  for (const m of mismatches) {
    console.log(`  FAIL  ${m.route} (${m.viewport})`);
    console.log(`        baseline: ${m.baselineHash}`);
    console.log(`        current : ${m.currentHash}`);
  }
}

async function main() {
  console.log(`Running site regression checks against ${BASE_URL}`);
  const statusResults = await runStatusChecks();
  printStatus(statusResults);

  const baseline = await loadBaseline();
  let screenshotResult = { screenshotHashes: {}, mismatches: [], captureDir: null };

  if (TAKE_SCREENSHOTS) {
    screenshotResult = await runScreenshotChecks(baseline);
    printMismatches(screenshotResult.mismatches);
    if (screenshotResult.captureDir) {
      console.log(`\nScreenshots saved: ${screenshotResult.captureDir}`);
    }
  } else {
    console.log("\nScreenshot diff");
    console.log("  SKIP  run with --screenshots to capture and compare");
  }

  if (UPDATE_BASELINE && TAKE_SCREENSHOTS) {
    await saveBaseline({ hashes: screenshotResult.screenshotHashes });
    console.log(`\nBaseline updated: ${BASELINE_FILE}`);
  }

  const statusOk = statusResults.every((r) => r.ok);
  const screenshotsOk = !TAKE_SCREENSHOTS || screenshotResult.mismatches.length === 0;
  process.exit(statusOk && screenshotsOk ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
