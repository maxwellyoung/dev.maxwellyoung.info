import Link from "next/link";
import { essays } from "@/lib/essays";

export function DesignEssays() {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-medium">Essays</h2>
      <ul className="divide-y divide-[hsl(var(--border))]/50">
        {essays.map((essay) => (
          <li key={essay.slug}>
            <Link
              href={`/craft/essay/${essay.slug}`}
              className="block py-4 group"
            >
              <h3 className="text-base font-medium text-foreground group-hover:text-accent transition-colors">
                {essay.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {essay.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                <span>
                  {new Date(essay.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span>{essay.readTime}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
