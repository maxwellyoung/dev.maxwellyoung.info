import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CSPostHogProvider } from "./providers";
import Link from "next/link";
import { Nav } from "@/components/Nav";

// Fonts are loaded via @font-face in globals.css and exposed as CSS vars

export const metadata: Metadata = {
  title: "Maxwell Young",
  description: "Durable systems. Friction by design.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans`}>
        <CSPostHogProvider>
          <Nav />
          {children}
          <Analytics />
          <SpeedInsights />
        </CSPostHogProvider>
        <footer className="w-full py-16 px-4 md:px-0 text-center">
          <div className="mx-auto w-full max-w-[var(--content-width)] text-xs uppercase font-semibold tracking-widest text-muted">
            <a
              href="/MaxwellYoung_CV.pdf"
              target="_blank"
              className="hover:text-text"
            >
              Resume
            </a>
            <span className="mx-2">–</span>
            <a
              href="https://github.com/maxwellyoung"
              target="_blank"
              className="hover:text-text"
            >
              GitHub
            </a>
            <span className="mx-2">–</span>
            <a
              href="mailto:maxwell@ninetynine.digital"
              className="hover:text-text"
            >
              Email
            </a>
            <span className="mx-2">–</span>
            <Link href="/principles" className="hover:text-text">
              Principles
            </Link>
            <span className="mx-2">–</span>
            <Link href="/now" className="hover:text-text">
              Now
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
