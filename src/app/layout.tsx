import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { CSPostHogProvider } from "./providers";
import Link from "next/link";

// fonts are loaded via globals.css

export const metadata: Metadata = {
  title: "Maxwell Young | Design Engineer",
  description: "Portfolio of Maxwell Young, a Design Engineer",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <CSPostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <header className="w-full sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/30">
              <div className="mx-auto w-full max-w-[960px] px-4 py-4 flex items-center justify-between">
                <Link
                  href="/"
                  className="text-sm tracking-[0.08em] text-muted hover:text-text"
                >
                  Maxwell Young
                </Link>
                <nav className="flex items-center gap-4 text-xs tracking-[0.08em] text-muted">
                  <Link href="/projects" className="hover:text-text underline">
                    Projects
                  </Link>
                  <Link href="/explore" className="hover:text-text underline">
                    Explore
                  </Link>
                  <Link href="/resume" className="hover:text-text underline">
                    Resume
                  </Link>
                </nav>
              </div>
            </header>
            {children}
            <Analytics />
          </ThemeProvider>
        </CSPostHogProvider>
      </body>
    </html>
  );
}
