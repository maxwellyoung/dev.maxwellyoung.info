"use client";

// Lazy PostHog loader: keeps posthog-js out of the critical bundle.
// The library is dynamically imported on first use (or idle preload),
// and capture calls made before it resolves are delivered once ready.

type PostHogClient = typeof import("posthog-js").default;

let posthogPromise: Promise<PostHogClient> | null = null;

function loadPostHog(): Promise<PostHogClient> | null {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return null;
  if (!posthogPromise) {
    posthogPromise = import("posthog-js").then(({ default: posthog }) => {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: "identified_only",
        capture_pageview: false,
      });
      return posthog;
    });
  }
  return posthogPromise;
}

export function preloadAnalytics() {
  const idle =
    typeof window.requestIdleCallback === "function"
      ? window.requestIdleCallback
      : (cb: () => void) => window.setTimeout(cb, 1500);
  idle(() => void loadPostHog());
}

export function capture(
  eventName: string,
  properties?: Record<string, string | number | boolean>,
) {
  void loadPostHog()?.then((posthog) => posthog.capture(eventName, properties));
}
