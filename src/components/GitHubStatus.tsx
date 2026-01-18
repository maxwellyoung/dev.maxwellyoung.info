"use client";

import { useEffect, useState } from "react";
import { AnimatedLink } from "./ui/animated-link";

/**
 * GitHub link with commit count for the current year
 * Shows something like "GitHub · 847" to signal shipping velocity
 */
export function GitHubStatus({ username = "maxwellyoung" }: { username?: string }) {
  const [commitCount, setCommitCount] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchContributions() {
      try {
        // Fetch user's public events (last 100)
        // This is a rough proxy - actual contribution graph requires auth
        const res = await fetch(
          `https://api.github.com/users/${username}/events/public?per_page=100`,
          { signal: controller.signal }
        );
        if (!res.ok) return;

        const events = await res.json();

        // Count push events this year
        const yearStart = new Date(new Date().getFullYear(), 0, 1);
        const pushEvents = events.filter((e: { type: string; created_at: string }) => {
          const eventDate = new Date(e.created_at);
          return e.type === "PushEvent" && eventDate >= yearStart;
        });

        // Each push can have multiple commits
        let total = 0;
        for (const event of pushEvents) {
          total += event.payload?.commits?.length || 1;
        }

        // Only show if meaningful (API only returns last 90 days of events)
        // So we extrapolate roughly: if 100 commits in ~90 days, ~400/year
        if (total > 0) {
          setCommitCount(total);
        }
      } catch {
        // Silently fail
      }
    }

    fetchContributions();
    return () => controller.abort();
  }, [username]);

  return (
    <span title={commitCount ? `${commitCount} commits in the last 90 days` : undefined}>
      <AnimatedLink href={`https://github.com/${username}`} external>
        GitHub{commitCount && commitCount > 20 ? ` · ${commitCount}` : ""}
      </AnimatedLink>
    </span>
  );
}
