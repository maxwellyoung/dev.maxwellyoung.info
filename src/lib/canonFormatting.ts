const CANON_TIME_ZONE = "Pacific/Auckland";

export function formatCanonExportDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-NZ", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

export function formatCanonSyncDate(isoDateTime: string) {
  return new Intl.DateTimeFormat("en-NZ", {
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    month: "short",
    timeZone: CANON_TIME_ZONE,
  }).format(new Date(isoDateTime));
}
