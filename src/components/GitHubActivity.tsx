"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

interface GitHubStats {
  publicRepos: number;
  followers: number;
  recentActivity: {
    type: string;
    repo: string;
    date: string;
  }[];
}

export function GitHubActivity({ username = "maxwellyoung" }: { username?: string }) {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        // Fetch user data
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const userData = await userRes.json();

        // Fetch recent events
        const eventsRes = await fetch(
          `https://api.github.com/users/${username}/events/public?per_page=5`
        );
        const eventsData = eventsRes.ok ? await eventsRes.json() : [];

        const recentActivity = eventsData.slice(0, 3).map((event: any) => ({
          type: event.type.replace("Event", ""),
          repo: event.repo?.name?.split("/")[1] || "unknown",
          date: new Date(event.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        }));

        setStats({
          publicRepos: userData.public_repos,
          followers: userData.followers,
          recentActivity,
        });
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, [username]);

  if (error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 mb-3">
        <Github className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          GitHub Activity
        </span>
      </div>

      {loading ? (
        <div className="space-y-2">
          <div className="h-4 w-24 bg-[hsl(var(--muted))] rounded animate-pulse" />
          <div className="h-3 w-32 bg-[hsl(var(--muted))] rounded animate-pulse" />
        </div>
      ) : stats ? (
        <div className="space-y-3">
          {/* Stats row */}
          <div className="flex gap-4 text-sm">
            <div>
              <span className="font-semibold text-foreground">{stats.publicRepos}</span>
              <span className="text-muted-foreground ml-1">repos</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">{stats.followers}</span>
              <span className="text-muted-foreground ml-1">followers</span>
            </div>
          </div>

          {/* Recent activity */}
          {stats.recentActivity.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Recent
              </p>
              {stats.recentActivity.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" />
                  <span className="truncate">
                    {activity.type} on{" "}
                    <span className="text-foreground">{activity.repo}</span>
                  </span>
                  <span className="text-[10px] ml-auto flex-shrink-0">
                    {activity.date}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </motion.div>
  );
}
