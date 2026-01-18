"use client";

import { useEffect, useState } from "react";
import { AnimatedLink } from "./ui/animated-link";

/**
 * Subtle GitHub link with activity indicator
 * Shows a green dot if there's been a commit in the last 7 days
 */
export function GitHubStatus({ username = "maxwellyoung" }: { username?: string }) {
  const [isActive, setIsActive] = useState<boolean | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function checkActivity() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/events/public?per_page=1`,
          { signal: controller.signal }
        );
        if (!res.ok) return;

        const events = await res.json();
        if (events.length > 0) {
          const lastEventDate = new Date(events[0].created_at);
          const daysSince = (Date.now() - lastEventDate.getTime()) / (1000 * 60 * 60 * 24);
          setIsActive(daysSince <= 7);
        }
      } catch {
        // Silently fail - indicator just won't show
      }
    }

    checkActivity();
    return () => controller.abort();
  }, [username]);

  return (
    <span className="inline-flex items-center gap-1.5">
      <AnimatedLink href={`https://github.com/${username}`} external>
        GitHub
      </AnimatedLink>
      {isActive && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-green-500/70"
          title="Active this week"
        />
      )}
    </span>
  );
}
