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
        <div className="mb-10 last:mb-0">
            <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="text-sm font-semibold tracking-tight text-ink-primary uppercase">{company}</h3>
                <span className="text-[10px] font-mono text-ink-muted uppercase">{duration}</span>
            </div>
            <div className="text-xs mb-4">
                <span className="text-ink-secondary italic block">{role}</span>
                <span className="text-[9px] font-mono text-ink-muted uppercase tracking-wider block mt-1.5 border-l-2 border-zinc-100 pl-2">
                    Tech Stack: {technologies.join(" • ")}
                </span>
            </div>
            <ul className="text-sm leading-relaxed text-ink-secondary space-y-3 list-none border-l border-zinc-100 pl-4 ml-0.5">
                {bullets.map((bullet, idx) => (
                    <li key={idx} className="relative before:content-['•'] before:absolute before:-left-3 before:text-zinc-300">
                        {bullet}
                    </li>
                ))}
            </ul>
        </div>
    );
}
