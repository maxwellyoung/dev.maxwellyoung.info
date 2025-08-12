import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-white">
      <main className="flex-grow flex items-center justify-center">
        <p className="italic text-sm text-destructive fade-pulse">
          This page held nothing. You found it anyway.
        </p>
      </main>
      <footer className="p-4">
        <Link href="/" className="text-sm">
          ↩︎ back
        </Link>
      </footer>
    </div>
  );
}
