interface EducationItemProps {
  degree: string;
  institution: string;
  date: string;
}

export function EducationItem({
  degree,
  institution,
  date,
}: EducationItemProps) {
  return (
    <div className="mb-4">
      <div>
        <span className="resume-label">{degree}</span>
      </div>
      <span className="block text-sm font-normal text-muted-foreground font-inter">
        {institution}
      </span>
      <span className="block text-xs font-normal text-muted-foreground/70 font-inter">
        {date}
      </span>
    </div>
  );
}
