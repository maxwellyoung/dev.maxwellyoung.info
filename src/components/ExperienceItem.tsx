interface ExperienceItemProps {
  title: string;
  company: string;
  date: string;
  responsibilities: string[];
  metric?: string; // optional, render only if provided
}

export function ExperienceItem({
  title,
  company,
  date,
  responsibilities,
  metric,
}: ExperienceItemProps) {
  return (
    <div className="mb-4">
      <div>
        <span className="resume-label">{title}</span>
      </div>
      <span className="block text-sm font-normal dark:text-zinc-400 text-zinc-600 font-inter">
        {company}
      </span>
      <span className="block text-xs font-normal dark:text-zinc-500 text-zinc-400 font-inter">
        {date}
      </span>
      {metric && (
        <span className="inline-block mt-1 text-xs font-normal text-zinc-600 dark:text-zinc-300 font-inter">
          {metric}
        </span>
      )}
      <ul className="list-disc pl-5 mt-2 text-sm font-normal dark:text-zinc-400 text-zinc-600 font-inter">
        {responsibilities.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
