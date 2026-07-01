import { canonFeed } from "@/lib/canonFeed";

/**
 * Currently into — a quiet read of the Canon media catalog (films, games,
 * books, music) exported at build time from the personal media OS.
 * Sibling to NowPlaying's card grammar: hairline border, top sweep on hover,
 * tiny tracked label. Static by design — no polling, no API, just taste.
 */
export function CurrentlyInto() {
  const { now, regions, totalWorks } = canonFeed;
  if (!now.length) return null;

  return (
    <div className="group relative flex flex-col gap-2.5 overflow-hidden rounded-sm border border-[hsl(var(--border))]/70 bg-[hsl(var(--background))]/50 p-3 transition-colors duration-300 hover:border-[hsl(var(--accent))]/30 hover:bg-[hsl(var(--muted))]/25">
      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[hsl(var(--accent))]/60 transition-transform duration-500 ease-out group-hover:scale-x-100" />

      <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]/80" />
        Currently into
      </p>

      <ul className="flex flex-col gap-1.5">
        {now.map((item) => (
          <li key={`${item.verb}-${item.title}`} className="flex items-baseline gap-2 text-sm">
            <span className="w-[5.9rem] flex-shrink-0 whitespace-nowrap text-[11px] uppercase tracking-[0.08em] text-muted-foreground/70">
              {item.verb}
            </span>
            <span className="min-w-0 truncate">
              <span className="font-medium text-foreground">{item.title}</span>
              {item.creator ? (
                <span className="text-muted-foreground"> — {item.creator}</span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>

      {regions.length >= 2 ? (
        <p className="border-t border-border/50 pt-2 text-xs text-muted-foreground">
          {totalWorks.toLocaleString()} works catalogued — somewhere between{" "}
          {regions[0].toLowerCase()} and {regions[1].toLowerCase()}
        </p>
      ) : null}
    </div>
  );
}
