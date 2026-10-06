import type { CanonNowItem } from "./canonFeed";

const DAY = 86_400_000;
const CURRENT_VERBS = new Set(["watching", "playing", "reading", "in rotation"]);
const SOURCES: Record<string, string> = { jellyfin: "Jellyfin", letterboxd: "Letterboxd", abs: "Audiobookshelf", steam: "Steam", applemusic: "Apple Music", applebooks: "Apple Books", manual: "Manual entry", spotify: "Spotify", lastfm: "Last.fm" };

export function canonSourceName(item?: CanonNowItem) {
  if (!item) return "Unknown";
  // The outbound destination describes the work; it did not observe activity.
  return SOURCES[item.evidenceSource ?? item.id.split(":")[0]] ?? "Unknown";
}

export function canonSyncState(item: CanonNowItem, now = Date.now()) {
  if (item.syncStatus === "error") return "Import failed";
  if (item.evidenceSource === "manual") return "Manual entry";
  const date = Date.parse(item.syncedAt ?? "");
  if (!Number.isFinite(date) || date > now || !item.syncStatus || item.syncStatus === "unknown") return "Import date unknown";
  return item.syncStatus === "stale" || now - date > 2 * DAY ? "Import stale" : "Import checked";
}

/** Old snapshots remain useful catalog material, but carry no current claim.
 * Screen activity needs dated evidence; a legacy percentage is insufficient. */
export function canonShelfItems(items: readonly CanonNowItem[], now = Date.now(), allowCurrent = true): CanonNowItem[] {
  return items.flatMap((item) => {
    const activity = Date.parse(item.activityAt ?? "");
    const dated = Number.isFinite(activity) && activity > 0 && activity <= now;
    if (item.verb === "watched") return dated ? [item] : [];
    if (!CURRENT_VERBS.has(item.verb)) return [item];
    const recent = allowCurrent && dated && now - activity <= 14 * DAY;
    const healthy = canonSyncState(item, now) === "Import checked" || item.evidenceSource === "manual";
    if (recent && healthy) return [item];
    if (item.verb === "watching") return [];
    return [{ ...item, medium: item.medium ?? item.verb, verb: "catalogued", note: "From the Canon catalog. Current activity is not verified." }];
  });
}

export function canonMediumName(item?: CanonNowItem) {
  const labels: Record<string, string> = { movie: "Film", show: "TV", game: "Game", book: "Book", audiobook: "Audiobook", music: "Music", playing: "Game", reading: "Book / audio", watching: "Film / TV", watched: "Film / TV", "in rotation": "Music" };
  return labels[item?.medium ?? item?.verb ?? ""] ?? "Work";
}
