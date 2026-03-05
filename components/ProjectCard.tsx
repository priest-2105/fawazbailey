import Link from "next/link";

interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  bgColor?: string;
  href?: string;
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  tags,
  bgColor = "bg-zinc-100",
  href,
}: ProjectCardProps) {
  const Wrapper = href ? Link : "div";

  return (
    <Wrapper
      href={href ?? "#"}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className="group block rounded-2xl overflow-hidden border border-zinc-100 hover:border-zinc-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
    >
      {/* Image / preview area */}
      <div className={`${bgColor} aspect-[4/3] w-full relative flex items-center justify-center overflow-hidden`}>
        <span className="text-xs font-mono text-zinc-400 select-none">[ screenshot ]</span>
      </div>

      {/* Card body */}
      <div className="p-5 bg-white">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono uppercase tracking-wider text-ink-muted bg-zinc-50 border border-zinc-100 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-base font-semibold tracking-tight text-ink-primary mb-0.5">{title}</h3>
        <p className="text-xs text-ink-muted mb-2 italic">{subtitle}</p>
        <p className="text-sm text-ink-secondary leading-relaxed">{description}</p>
      </div>
    </Wrapper>
  );
}
