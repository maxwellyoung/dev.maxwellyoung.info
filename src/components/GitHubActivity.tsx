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
    <div className="rounded-lg border border-[hsl(var(--border))]/50 bg-[hsl(var(--background))]/30">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-2 p-3 text-left hover:bg-[hsl(var(--muted))]/30 transition-colors rounded-lg"
      >
        <div className="flex items-center gap-2">
          <Github className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-[11px] text-muted-foreground">
            GitHub
          </span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3">
              {loading ? (
                <div className="space-y-2">
                  <div className="h-3 w-20 bg-[hsl(var(--muted))] rounded animate-pulse" />
                  <div className="h-2.5 w-28 bg-[hsl(var(--muted))] rounded animate-pulse" />
                </div>
              ) : stats ? (
                <div className="space-y-2">
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span>{stats.publicRepos} repos</span>
                    <span>{stats.followers} followers</span>
                  </div>
                  {stats.recentActivity.length > 0 && (
                    <div className="space-y-1">
                      {stats.recentActivity.slice(0, 2).map((activity, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 text-[10px] text-muted-foreground"
                        >
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
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
