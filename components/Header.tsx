import DateTime from "./DateTime";

export default function Header() {
    return (
        <header className="mb-12 border-b-2 pb-6 border-zinc-900">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold tracking-tighter uppercase mb-1">Fawaz Bailey</h1>
                    <p className="text-zinc-600 font-medium">Frontend Engineer</p>
                </div>
                <div className="text-right text-xs font-mono text-zinc-500 uppercase leading-relaxed">
                    <div className="flex flex-col">
                        <span>Form: P-2026/V1</span>
                        <DateTime />
                        <span>Lagos, Nigeria</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono uppercase tracking-tight">
                <a href="https://linkedin.com" target="_blank" className="hover:underline">LinkedIn</a>
                <a href="https://github.com" target="_blank" className="hover:underline">GitHub</a>
                <a href="mailto:hello@example.com" className="hover:underline">Email</a>
                <span>+234 000 000 0000</span>
            </div>
        </header>
    );
}
