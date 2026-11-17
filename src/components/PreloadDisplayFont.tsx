import { fontPreloads } from "@/lib/fontFiles";

/**
 * Preloads Sentient, the display serif. Render it on routes that draw
 * `font-display` text at first paint, so the heading does not wait for the
 * stylesheet before its font starts downloading. React hoists the link into
 * <head>. Routes without it never download Sentient at all.
 */
export function PreloadDisplayFont() {
  return (
    <link
      rel="preload"
      href={fontPreloads.sentient}
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
  );
}
