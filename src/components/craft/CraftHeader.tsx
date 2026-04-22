import Link from "next/link";

export function CraftHeader() {
  return (
    <div>
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
