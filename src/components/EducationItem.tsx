interface EducationItemProps {
  degree: string;
  institution: string;
  institutionHref?: string;
  date: string;
}

export function EducationItem({
  degree,
  institution,
  institutionHref,
  date,
}: EducationItemProps) {
  return (
    <article className="group border-t border-border/60 py-4 transition-colors duration-300 hover:border-accent/25">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <span className="resume-label transition-colors duration-300 group-hover:text-foreground">
          {degree}
        </span>
        <span className="text-xs font-normal text-muted-foreground font-inter">
          {date}
        </span>
      </div>
      <span className="mt-1 block text-sm font-normal text-muted-foreground font-inter">
        {institutionHref ? (
          <a
            href={institutionHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm transition-colors duration-200 hover:text-foreground focus-visible:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {institution}
          </a>
        ) : (
          institution
        )}
      </span>
    </article>
  );
}
