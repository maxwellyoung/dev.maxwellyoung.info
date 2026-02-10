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
    <div className="mb-4">
      <div>
        <span className="resume-label">{title}</span>
      </div>
      <span className="block text-sm font-normal text-muted-foreground font-inter">
        {companyHref ? (
          <a
            href={companyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline focus-visible:underline focus-visible:outline-none"
          >
            {company}
          </a>
        ) : (
          company
        )}
      </span>
      <span className="block text-xs font-normal text-muted-foreground font-inter">
        {date}
      </span>
      {summary && (
        <p className="mt-1 text-sm font-normal text-muted-foreground font-inter">
          {summary}
        </p>
      )}
      {metric && (
        <span className="inline-block mt-1 text-xs font-normal text-foreground/80 font-inter">
          {metric}
        </span>
      )}
      <ul className="list-disc pl-5 mt-2 text-sm font-normal text-muted-foreground font-inter">
        {responsibilities.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
