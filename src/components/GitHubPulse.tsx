"use client";

import useSWR from "swr";
import { Github } from "lucide-react";

interface Pulse {
  events: { type: string; repo: string; fullName: string; date: string; refType?: string; action?: string }[];
}

const VERB: Record<string, string> = {
  Push: "pushed to",
  Create: "created",
  PullRequest: "opened a PR on",
  Watch: "starred",
  Fork: "forked",
  Release: "released",
  Issues: "touched issues on",
};

// GitHub reports a new branch or tag as a CreateEvent too; only a repository is "created".
const CREATE_VERB: Record<string, string> = {
  branch: "created a branch on",
  tag: "tagged",
};

// A PullRequestEvent is also sent when a PR closes or merges; say which.
const PR_VERB: Record<string, string> = {
  merged: "merged a PR on",
  closed: "closed a PR on",
  reopened: "reopened a PR on",
};

function verbFor(e: Pulse["events"][number]): string {
  if (e.type === "Create" && e.refType && CREATE_VERB[e.refType]) return CREATE_VERB[e.refType];
  if (e.type === "PullRequest" && e.action && PR_VERB[e.action]) return PR_VERB[e.action];
  return VERB[e.type];
}

async function fetchPulse(username: string): Promise<Pulse> {
  const res = await fetch(`https://api.github.com/users/${username}/events/public?per_page=10`);
  if (!res.ok) throw new Error("github unavailable");
  const events = (await res.json()) as {
    type: string;
    repo?: { name?: string };
    payload?: { ref_type?: string; action?: string };
    created_at: string;
  }[];
  const seen = new Set<string>();
  const distinct: Pulse["events"] = [];
  // The API doesn't promise order; newest first. Event types without a plain verb (deletes, comments) are skipped.
  const newestFirst = [...events].sort((a, b) => b.created_at.localeCompare(a.created_at));
  for (const e of newestFirst) {
    const fullName = e.repo?.name || "";
    const repo = fullName.split("/")[1] || "";
    const key = `${e.type}:${repo}`;
    if (!repo || !VERB[e.type.replace("Event", "")] || seen.has(key)) continue;
    seen.add(key);
    distinct.push({
      type: e.type.replace("Event", ""),
      repo,
      fullName,
      refType: e.payload?.ref_type,
      action: e.payload?.action,
      date: new Date(e.created_at).toLocaleDateString("en-NZ", { day: "numeric", month: "short" }),
    });
    if (distinct.length >= 2) break;
  }
  return { events: distinct };
}

/** Two quiet lines of recent public GitHub activity — no accordion, no box. */
export function GitHubPulse({ username = "maxwellyoung" }: { username?: string }) {
  const { data, error } = useSWR(`github-pulse-${username}`, () => fetchPulse(username), {
    revalidateOnFocus: false,
  });

  if (error || (data && data.events.length === 0)) return null;

  return (
    <div className="min-w-0">
      <p className="flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-muted-foreground">
        <Github className="h-3 w-3 shrink-0" aria-hidden="true" />
        Meanwhile, on GitHub
      </p>
      <ul className="mt-1.5 space-y-1">
        {(data?.events ?? [{ type: "", repo: "", fullName: "", date: "" }, { type: "", repo: "", fullName: "", date: "" }]).map(
          (e, i) =>
            e.repo ? (
              <li key={`${e.type}-${e.repo}`} className="flex min-w-0 items-baseline gap-2 text-xs text-muted-foreground">
                <span className="truncate">
                  {verbFor(e)}{" "}
                  <a
                    href={`https://github.com/${e.fullName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground underline decoration-muted-foreground/30 underline-offset-2 transition-colors hover:decoration-[hsl(var(--accent))]/60"
                  >
                    {e.repo}
                  </a>
                </span>
                <span className="shrink-0 text-[10px] text-muted-foreground">{e.date}</span>
              </li>
            ) : (
              <li key={i} className="h-3.5 w-36 animate-pulse rounded-sm bg-[hsl(var(--muted))]" />
            ),
        )}
      </ul>
    </div>
  );
}
