import Image from "next/image";
import { canonFeed } from "@/lib/canonFeed";

/**
 * Currently into — a snapshot of the Canon media catalog, exported at build
 * time (covers included, saved into /public/canon). Four covers sit on a
 * shared baseline like objects on a shelf, each at its natural aspect —
 * film and game portrait, book tall, record square — with the verb and the
 * work beneath. Static by design: no polling, no API, just taste with a date.
 */

const SHELF_H = 92; // display height of the tallest cover, px
const CAPTION_H = 58; // reserved caption height — equal figure heights keep the shelf baseline true

function monthOf(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-NZ", { month: "long", year: "numeric" });
}

export function CurrentlyInto() {
  const { now, regions, totalWorks, generatedAt } = canonFeed;
  if (!now.length) return null;

  return (
    <div className="group relative flex flex-col gap-3 overflow-hidden rounded-sm border border-[hsl(var(--border))]/70 bg-[hsl(var(--background))]/50 p-3 transition-colors duration-300 hover:border-[hsl(var(--accent))]/30 hover:bg-[hsl(var(--muted))]/25">
      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[hsl(var(--accent))]/60 transition-transform duration-500 ease-out group-hover:scale-x-100" />

      <div className="flex items-baseline justify-between gap-2">
        <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]/80" />
          Currently into
        </p>
        <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground/60">
          {monthOf(generatedAt)}
        </p>
      </div>

      {/* the shelf — covers share a true baseline (equal figure heights),
          each at its natural aspect */}
      <div className="flex items-end gap-2.5">
        {now.map((item) => {
          const coverW = item.art ? Math.round((SHELF_H * item.art.w) / item.art.h) : 62;
          const colW = Math.max(coverW, 66); // a little caption room under narrow posters
          return (
            <figure key={`${item.verb}-${item.title}`} className="min-w-0" style={{ width: colW }}>
              <div className="flex items-end" style={{ height: SHELF_H }}>
                {item.art ? (
                  <Image
                    src={item.art.src}
                    alt={`${item.title} cover`}
                    width={coverW}
                    height={SHELF_H}
                    className="rounded-[3px] border border-border/60 object-cover transition-transform duration-300 group-hover:-translate-y-0.5"
                    style={{ height: SHELF_H, width: coverW }}
                  />
                ) : (
                  <div
                    className="flex h-full items-center justify-center rounded-[3px] border border-border/60 bg-[hsl(var(--muted))] p-1 text-center text-[10px] leading-tight text-muted-foreground"
                    style={{ width: coverW }}
                  >
                    {item.title}
                  </div>
                )}
              </div>
              <figcaption className="mt-1.5 overflow-hidden" style={{ height: CAPTION_H }}>
                <p className="truncate text-[9px] uppercase tracking-[0.1em] text-muted-foreground/70">
                  {item.verb}
                </p>
                <p className="line-clamp-2 text-[11px] font-medium leading-snug text-foreground" title={item.title}>
                  {item.title}
                </p>
                {item.creator ? (
                  <p className="truncate text-[10px] text-muted-foreground">{item.creator}</p>
                ) : null}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {regions.length >= 2 ? (
        <p className="border-t border-border/50 pt-2 text-xs leading-relaxed text-muted-foreground">
          {totalWorks.toLocaleString()} works catalogued — somewhere between{" "}
          {regions[0].toLowerCase()} and {regions[1].toLowerCase()}
        </p>
      ) : null}
    </div>
  );
}
