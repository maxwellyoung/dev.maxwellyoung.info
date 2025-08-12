"use client";

import Link from "next/link";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on design, development, and system thinking.",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: LayoutProps) {
  return (
    <div
      className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white p-4 md:p-8 flex flex-col text-[14px] md:text-[15px]"
      style={{ lineHeight: 1.6 }}
    >
      <header className="max-w-[640px] mx-auto w-full mb-8">
        <Link href="/" className="font-medium">
          Maxwell Young
        </Link>
      </header>

      <main className="max-w-[640px] mx-auto w-full flex-grow">{children}</main>
    </div>
  );
}
