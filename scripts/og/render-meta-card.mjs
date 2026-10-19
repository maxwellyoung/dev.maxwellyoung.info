// Renders scripts/og/meta-card.html to public/meta.png with local headless Chrome,
// so the share card is regenerated from source rather than hand-edited.
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const chrome =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const out = path.resolve(here, "../../public/meta.png");

execFileSync(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--allow-file-access-from-files",
  "--window-size=1200,630",
  `--screenshot=${out}`,
  `file://${path.join(here, "meta-card.html")}`,
]);
console.log(`wrote ${out}`);
