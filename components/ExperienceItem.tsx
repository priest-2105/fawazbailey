interface ExperienceItemProps {
    company: string;
    role: string;
    duration: string;
    technologies: string[];
    bullets: string[];
}

export default function ExperienceItem({
    company,
    role,
    duration,
    technologies,
    bullets,
}: ExperienceItemProps) {
    return (
        <div className="mb-6 last:mb-0">
            <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-lg uppercase tracking-tight">{company}</h3>
                <span className="text-xs font-mono text-zinc-500">{duration}</span>
            </div>
            <div className="flex justify-between items-baseline text-sm mb-2 italic text-zinc-700">
                <span>{role}</span>
                <span className="text-xs font-mono not-italic text-zinc-400">{technologies.join(" / ")}</span>
            </div>
            <ul className="text-sm space-y-1 list-none border-l-2 border-zinc-100 pl-4 ml-1">
                {bullets.map((bullet, idx) => (
                    <li key={idx} className="relative before:content-['•'] before:absolute before:-left-3 before:text-zinc-400">
                        {bullet}
                    </li>
                ))}
            </ul>
        </div>
    );
}
