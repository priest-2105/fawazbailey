interface ProjectItemProps {
    name: string;
    role: string;
    duration?: string;
    bullets: string[];
}

export default function ProjectItem({ name, role, duration, bullets }: ProjectItemProps) {
    return (
        <div className="mb-6 last:mb-0">
            <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-lg uppercase tracking-tight">{name}</h3>
                {duration && <span className="text-xs font-mono text-zinc-500">{duration}</span>}
            </div>
            <div className="text-sm mb-2 italic text-zinc-700">{role}</div>
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
