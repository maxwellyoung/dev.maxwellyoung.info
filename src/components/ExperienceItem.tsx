interface ExperienceItemProps {
  title: string;
  company: string;
  companyHref?: string;
  date: string;
  responsibilities: string[];
  metric?: string; // optional, render only if provided
  summary?: string; // optional one-line role summary
}

export function ExperienceItem({
  title,
  company,
  companyHref,
  date,
  responsibilities,
  metric,
  summary,
}: ExperienceItemProps) {
  return (
    <article className="group border-t border-border/60 py-4 transition-colors duration-300 hover:border-accent/25">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <span className="resume-label transition-colors duration-300 group-hover:text-foreground">
          {title}
        </span>
        <span className="text-xs font-normal text-muted-foreground font-inter">
          {date}
        </span>
      </div>
      <span className="mt-1 block text-sm font-normal text-muted-foreground font-inter">
        {companyHref ? (
          <a
            href={companyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm transition-colors duration-200 hover:text-foreground focus-visible:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {company}
          </a>
        ) : (
          company
        )}
      </span>
      {summary && (
        <p className="mt-1 text-sm font-normal text-muted-foreground font-inter">
          {summary}
        </p>
      )}
      {metric && (
        <span className="mt-2 inline-block rounded-sm border border-border/60 bg-muted/30 px-2 py-1 text-xs font-normal text-foreground/80 font-inter">
          {metric}
        </span>
      )}
      <ul className="mt-3 list-disc pl-5 text-sm font-normal text-muted-foreground font-inter">
        {responsibilities.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
