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
    <div className="mb-4">
      <div>
        <span className="resume-label">{degree}</span>
      </div>
      <span className="block text-sm font-normal text-muted-foreground font-inter">
        {institutionHref ? (
          <a
            href={institutionHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline focus-visible:underline focus-visible:outline-none"
          >
            {institution}
          </a>
        ) : (
          institution
        )}
      </span>
      <span className="block text-xs font-normal text-muted-foreground/70 font-inter">
        {date}
      </span>
    </div>
  );
}
