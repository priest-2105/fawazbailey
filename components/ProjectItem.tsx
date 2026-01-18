interface ProjectItemProps {
    name: string;
    role: string;
    duration?: string;
    bullets: string[];
}

export default function ProjectItem({ name, role, duration, bullets }: ProjectItemProps) {
    return (
        <div className="mb-10 last:mb-0">
            <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="text-sm font-semibold tracking-tight text-ink-primary uppercase">{name}</h3>
                {duration && <span className="text-[10px] font-mono text-ink-muted uppercase">{duration}</span>}
            </div>
            <div className="text-xs mb-3 text-ink-secondary italic">{role}</div>
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
