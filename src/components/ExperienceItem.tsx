interface ExperienceItemProps {
  title: string;
  company: string;
  date: string;
  responsibilities: string[];
}

export function ExperienceItem({
  title,
  company,
  date,
  responsibilities,
}: ExperienceItemProps) {
  return (
    <div className="mb-4">
      <div>
        <span className="block text-sm font-bold dark:text-zinc-100 text-zinc-800 font-inter">
          {title}
        </span>
      </div>
      <span className="block text-sm font-normal dark:text-zinc-400 text-zinc-600 font-inter">
        {company}
      </span>
      <span className="block text-xs font-normal dark:text-zinc-500 text-zinc-400 font-inter">
        {date}
      </span>
      <ul className="list-disc pl-5 mt-2 text-sm font-normal dark:text-zinc-400 text-zinc-600 font-inter">
        {responsibilities.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
