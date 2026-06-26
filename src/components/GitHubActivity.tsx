"use client";

import { useState } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ChevronDown } from "lucide-react";

interface GitHubStats {
  publicRepos: number;
  followers: number;
  recentActivity: {
    type: string;
    repo: string;
    date: string;
  }[];
}

async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const userRes = await fetch(`https://api.github.com/users/${username}`);
  if (!userRes.ok) throw new Error("Failed to fetch user");
  const userData = await userRes.json();

  const eventsRes = await fetch(
    `https://api.github.com/users/${username}/events/public?per_page=5`
  );
  const eventsData = eventsRes.ok ? await eventsRes.json() : [];

  const recentActivity = eventsData.slice(0, 3).map((event: { type: string; repo?: { name?: string }; created_at: string }) => ({
    type: event.type.replace("Event", ""),
    repo: event.repo?.name?.split("/")[1] || "unknown",
    date: new Date(event.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  return {
    publicRepos: userData.public_repos,
    followers: userData.followers,
    recentActivity,
  };
}

export function GitHubActivity({ username = "maxwellyoung" }: { username?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Only fetch when expanded (SWR key is null when collapsed)
  const { data: stats, isLoading: loading, error } = useSWR(
    isExpanded ? `github-stats-${username}` : null,
    () => fetchGitHubStats(username),
    { revalidateOnFocus: false }
  );

  if (error) return null;

  return (
    <div className="group overflow-hidden rounded-sm border border-[hsl(var(--border))]/70 bg-[hsl(var(--background))]/50 transition-colors duration-300 hover:border-accent/25 hover:bg-[hsl(var(--muted))]/25">
      <div className="h-px w-full origin-left scale-x-0 bg-accent/70 transition-transform duration-500 ease-out group-hover:scale-x-100" />
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex min-h-11 w-full items-center justify-between gap-3 rounded-sm p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        aria-expanded={isExpanded}
        aria-controls={`github-activity-${username}`}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-border/70 bg-[hsl(var(--card))] transition-colors duration-300 group-hover:border-accent/25 group-hover:text-accent">
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              GitHub
            </span>
            <span className="block truncate text-xs text-muted-foreground/70">
              Public activity
            </span>
          </span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
        >
          <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            id={`github-activity-${username}`}
            className="overflow-hidden"
          >
            <div className="border-t border-border/60 px-3 pb-3 pt-3">
              {loading ? (
                <div className="space-y-2">
                  <div className="h-3 w-20 animate-pulse rounded-sm bg-[hsl(var(--muted))]" />
                  <div className="h-2.5 w-28 animate-pulse rounded-sm bg-[hsl(var(--muted))]" />
                </div>
              ) : stats ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 overflow-hidden rounded-sm border border-border/60 text-xs">
                    <span className="px-2 py-1.5 text-muted-foreground">
                      <span className="text-foreground">{stats.publicRepos}</span>{" "}
                      repos
                    </span>
                    <span className="border-l border-border/60 px-2 py-1.5 text-muted-foreground">
                      <span className="text-foreground">{stats.followers}</span>{" "}
                      followers
                    </span>
                  </div>
                  {stats.recentActivity.length > 0 && (
                    <div className="space-y-1">
                      {stats.recentActivity.slice(0, 2).map((activity, i) => (
                        <div
                          key={i}
                          className="flex min-w-0 items-center gap-1.5 text-[10px] text-muted-foreground"
                        >
                          <span className="h-1 w-1 shrink-0 rounded-full bg-accent/50" />
                          <span className="truncate">
                            {activity.type} · {activity.repo}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
