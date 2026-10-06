const DAY = 86_400_000;

export function feedFreshnessProblems(feed, now, maxAgeDays) {
  if (!feed.now?.length) return ["No item-level source freshness is available."];
  return feed.now.flatMap((item) => {
    if (item.evidenceSource === "manual") return [];
    if (item.syncStatus === "error") return [`${item.title}: source import failed.`];
    const timestamp = Date.parse(item.syncedAt ?? "");
    if (item.syncStatus === "unknown" || !item.syncStatus || !Number.isFinite(timestamp)) return [`${item.title}: source import date is unknown.`];
    if (timestamp > now) return [`${item.title}: source import date is in the future.`];
    if (item.syncStatus === "stale" || now - timestamp > maxAgeDays * DAY) return [`${item.title}: source import is stale (${item.syncedAt}).`];
    return [];
  });
}
