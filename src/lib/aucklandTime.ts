export function aucklandZoneLabel(date: Date) {
  const offset = new Intl.DateTimeFormat("en", { timeZone: "Pacific/Auckland", timeZoneName: "longOffset" }).formatToParts(date).find((part) => part.type === "timeZoneName")?.value;
  return offset === "GMT+13:00" ? "NZDT (UTC+13)" : "NZST (UTC+12)";
}
