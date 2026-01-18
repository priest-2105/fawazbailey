import { LucideIcon } from "lucide-react";

interface FormSectionProps {
    title: string;
    icon: LucideIcon;
    children: React.ReactNode;
}

export default function FormSection({ title, icon: Icon, children }: FormSectionProps) {
    return (
        <section className="mb-12 last:mb-0">
            <div className="flex items-baseline gap-2 mb-4 border-b border-zinc-100 pb-1.5">
                <Icon size={14} strokeWidth={1.5} className="text-ink-muted translate-y-0.5" />
                <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                    {title}
                </h2>
            </div>
            <div className="pl-0 sm:pl-1">{children}</div>
        </section>
    );
}
