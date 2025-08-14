interface SkillCategoryProps {
  category: string;
  items: string[];
}

export function SkillCategory({ category, items }: SkillCategoryProps) {
  return (
    <div className="mt-8">
      <div>
        <span className="resume-label">{category}</span>
      </div>
      <span className="block text-sm font-normal dark:text-zinc-400 text-zinc-600 font-inter mt-2">
        {items.map((item, index) => (
          <span key={index}>
            {item}
            <br />
          </span>
        ))}
      </span>
    </div>
  );
}
