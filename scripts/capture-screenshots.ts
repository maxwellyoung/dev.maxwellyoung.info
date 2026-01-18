/**
 * Capture screenshots for portfolio projects using Playwright
 * Run: npx playwright install chromium && npx tsx scripts/capture-screenshots.ts
 */

import { chromium } from "playwright";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";

const OUTPUT_DIR = join(process.cwd(), "public/projectImages");

// Ensure output directory exists
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

interface ScreenshotConfig {
  name: string;
  url: string;
  filename: string;
  viewport?: { width: number; height: number };
  waitFor?: string; // CSS selector to wait for
  delay?: number; // Extra delay in ms after page load
  scrollTo?: number; // Scroll position
}

const screenshots: ScreenshotConfig[] = [
  // Music site
  {
    name: "Music Site - Home",
    url: "https://music.maxwellyoung.info",
    filename: "music-1.webp",
    viewport: { width: 1280, height: 800 },
    delay: 2000, // Wait for animations
  },
  {
    name: "Music Site - Scroll",
    url: "https://music.maxwellyoung.info",
    filename: "music-2.webp",
    viewport: { width: 1280, height: 800 },
    delay: 1500,
    scrollTo: 600,
  },
  {
    name: "Music Site - Mobile",
    url: "https://music.maxwellyoung.info",
    filename: "music-3.webp",
    viewport: { width: 390, height: 844 }, // iPhone 14 Pro
    delay: 1500,
  },
  // Silk (public pages only)
  {
    name: "Silk - Landing",
    url: "https://silk.cx",
    filename: "silk-1.webp",
    viewport: { width: 1280, height: 800 },
    delay: 2000,
  },
  {
    name: "Silk - Mobile",
    url: "https://silk.cx",
    filename: "silk-2.webp",
    viewport: { width: 390, height: 844 },
    delay: 1500,
  },
];

async function captureScreenshots() {
  console.log("Starting screenshot capture...\n");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    deviceScaleFactor: 2, // Retina quality
  });

  for (const config of screenshots) {
    try {
      console.log(`Capturing: ${config.name}`);

      const page = await context.newPage();

      if (config.viewport) {
        await page.setViewportSize(config.viewport);
      }

      await page.goto(config.url, {
        waitUntil: "networkidle",
        timeout: 30000,
      });

      if (config.waitFor) {
        await page.waitForSelector(config.waitFor, { timeout: 10000 });
      }

      if (config.delay) {
        await page.waitForTimeout(config.delay);
      }

      if (config.scrollTo) {
        await page.evaluate((y) => window.scrollTo(0, y), config.scrollTo);
        await page.waitForTimeout(500); // Wait for scroll animations
      }

      // Save as PNG first, then we'll convert to webp
      const pngPath = join(OUTPUT_DIR, config.filename.replace(".webp", ".png"));
      await page.screenshot({
        path: pngPath,
        type: "png",
      });

      console.log(`  ✓ Saved: ${config.filename}`);
      await page.close();
    } catch (error) {
      console.error(`  ✗ Failed: ${config.name}`, error);
    }
  }

  await browser.close();
  console.log("\nDone! PNGs saved to public/projectImages/");
  console.log("\nConverting to webp...");

  // Convert to webp using cwebp
  const { execSync } = await import("child_process");
  try {
    execSync(
      `cd ${OUTPUT_DIR} && for f in music-*.png silk-*.png; do [ -f "$f" ] && cwebp -q 85 "$f" -o "\${f%.png}.webp" && rm "$f"; done`,
      { shell: "/bin/bash", stdio: "inherit" }
    );
    console.log("✓ Converted to webp and cleaned up PNGs");
  } catch (e) {
    console.log("\nManual conversion needed. Run:");
    console.log(
      `  cd public/projectImages && for f in music-*.png silk-*.png; do cwebp -q 85 "$f" -o "\${f%.png}.webp" && rm "$f"; done`
    );
  }
}

captureScreenshots().catch(console.error);
