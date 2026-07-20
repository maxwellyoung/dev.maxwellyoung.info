export type UtilityCommand = { id: string; label: string; group: string; keywords?: string[] };

export function isEditableTarget(target: { tagName?: string; isContentEditable?: boolean } | null): boolean {
  if (!target) return false;
  return Boolean(target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName?.toUpperCase() ?? ""));
}

export function filterCommands<T extends UtilityCommand>(commands: T[], query: string): T[] {
  const needle = query.trim().toLocaleLowerCase();
  if (!needle) return commands;
  return commands.filter(({ label, group, keywords = [] }) => [label, group, ...keywords].join(" ").toLocaleLowerCase().includes(needle));
}

export type ReceiptEntry = { path: string; visitedAt: string };
export function buildReceiptEntry(url: string, now = new Date()): ReceiptEntry {
  const parsed = new URL(url, "https://dev.maxwellyoung.info");
  return { path: parsed.pathname, visitedAt: now.toISOString() };
}

type DeliveryProject = { name: string; visibility?: string; status: string; launchStage?: string; priority?: number };
export function projectDeliveryRows(projects: DeliveryProject[]) {
  return projects.filter((project) => project.visibility === "public").sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999)).map(({ name, launchStage, status }) => ({ name, status: launchStage ?? status }));
}

function safeLocale(locale?: string) {
  try { return Intl.getCanonicalLocales(locale || "en-NZ")[0] || "en-NZ"; } catch { return "en-NZ"; }
}
export function formatCurrency(value: number, locale?: string): string {
  return new Intl.NumberFormat(safeLocale(locale), { style: "currency", currency: "NZD", maximumFractionDigits: 0 }).format(value);
}
export function getWorkbookMeta(date = new Date(), locale?: string) {
  const quarter = `Q${Math.floor(date.getUTCMonth() / 3) + 1}`;
  const iso = date.toISOString().slice(0, 10);
  return { quarter, filename: `${quarter} Operating Forecast ${iso}.xlsx`, date: new Intl.DateTimeFormat(safeLocale(locale), { dateStyle: "medium", timeZone: "Pacific/Auckland" }).format(date) };
}

export function closeClickAction(clickCount: number): "close" | "panic" { return clickCount > 1 ? "panic" : "close"; }

export type WorkbookInputs = { growth: number; headcount: number; costPerHire: number; baseline: number };
export function updateWorkbook(current: WorkbookInputs, patch: Partial<WorkbookInputs>) {
  const values = { ...current, ...patch };
  return { ...values, forecast: Math.round(values.baseline * (1 + values.growth / 100) + Math.max(0, values.headcount - 4) * values.costPerHire) };
}
