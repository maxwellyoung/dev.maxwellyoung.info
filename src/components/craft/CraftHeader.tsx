import Link from "next/link";

export function CraftHeader() {
  return (
    <div>
      <Link
        href="/"
        className="inline-flex min-h-11 items-center rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        &larr; Back
      </Link>
      <h1 className="text-3xl font-medium mt-8 mb-4">Craft</h1>
      <p className="text-muted-foreground leading-relaxed max-w-prose">
        Interaction studies, motion spec, and essays on UI behavior.
      </p>
    </div>
  );
}
