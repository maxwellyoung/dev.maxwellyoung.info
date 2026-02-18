"use client";

import { useState } from "react";
import useSWR from "swr";
import { cn } from "@/lib/utils";

async function fetchCommitCount(username: string): Promise<number | null> {
  const res = await fetch(
    `https://api.github.com/users/${username}/events/public?per_page=100`
  );
  if (!res.ok) return null;

  const events = await res.json();
  const yearStart = new Date(new Date().getFullYear(), 0, 1);
  const pushEvents = events.filter((e: { type: string; created_at: string }) => {
    const eventDate = new Date(e.created_at);
    return e.type === "PushEvent" && eventDate >= yearStart;
  });

  let total = 0;
  for (const event of pushEvents) {
    total += event.payload?.commits?.length || 1;
  }

  return total > 0 ? total : null;
}

/**
 * GitHub link that reveals commit count on hover
 */
export function GitHubStatus({ username = "maxwellyoung" }: { username?: string }) {
  const { data: commitCount } = useSWR(
    `github-commits-${username}`,
    () => fetchCommitCount(username),
    { revalidateOnFocus: false }
  );
  const [isHovered, setIsHovered] = useState(false);

  const hasStats = commitCount && commitCount > 10;

  return (
    <a
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "relative inline-flex items-center gap-1.5 text-muted-foreground transition-colors duration-150",
        "hover:text-foreground"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative">
        GitHub
        <span
          className={cn(
            "absolute bottom-0 left-0 h-px w-full origin-left bg-accent/60 transition-transform duration-200",
            "[transition-timing-function:cubic-bezier(0.22,0.68,0,1)]",
            isHovered ? "scale-x-100" : "scale-x-0"
          )}
        />
      </span>
      {hasStats && (
        <span
          className={cn(
            "text-[10px] text-muted-foreground transition-all duration-200",
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
          )}
        >
          {commitCount} commits
        </span>
      )}
    </a>
  );
}
