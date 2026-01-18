import { LucideIcon } from "lucide-react";

interface FormSectionProps {
    title: string;
    icon: LucideIcon;
    children: React.ReactNode;
}

export default function FormSection({ title, icon: Icon, children }: FormSectionProps) {
    return (
        <section className="mb-8 last:mb-0">
            <div className="flex items-center gap-2 mb-3 border-b pb-1">
                <Icon size={18} strokeWidth={1.5} className="text-zinc-500" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-600">
                    {title}
                </h2>
            </div>
            <div>{children}</div>
        </section>
    );
}
