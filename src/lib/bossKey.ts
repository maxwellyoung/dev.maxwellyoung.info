export type BossKeyEvent = { key: string; ctrlKey?: boolean; shiftKey?: boolean; altKey?: boolean; metaKey?: boolean };

export const BOSS_KEY_OPEN_EVENT = "boss-key:open";

export function calculateForecast(actual: number, percentage: number): number {
  return Math.round(actual * (1 + percentage / 100));
}

export function getBossKeyAction(event: BossKeyEvent, active = false): "toggle" | "close" | null {
  if (event.key === "Escape") return active ? "close" : null;
  if (event.key.toLowerCase() === "x" && event.ctrlKey && event.shiftKey && !event.altKey && !event.metaKey) return "toggle";
  return null;
}

export function spreadsheetColumnName(index: number): string {
  let result = "";
  for (let value = index + 1; value > 0; value = Math.floor((value - 1) / 26)) {
    result = String.fromCharCode(65 + ((value - 1) % 26)) + result;
  }
  return result;
}
