import DateTime from "./DateTime";

export default function Header() {
    return (
        <header className="mb-12 border-b border-zinc-900 pb-8">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-ink-primary mb-1">Fawaz Bailey</h1>
                    <p className="text-sm font-medium uppercase tracking-wide text-ink-secondary">Frontend Engineer</p>
                </div>
                <div className="text-right text-xs font-mono text-ink-muted uppercase leading-loose">
                    <div className="flex flex-col">
                        <span>Form: P-2026/V1</span>
                        <DateTime />
                        <span>Lagos, Nigeria</span>
                    </div>
                </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium tracking-tight text-ink-secondary">
                <a href="https://www.linkedin.com/in/fawazbailey/" target="_blank" className="hover:text-ink-primary transition-colors">LinkedIn</a>
                <a href="https://github.com/priest-2105" target="_blank" className="hover:text-ink-primary transition-colors">GitHub</a>
                <a href="https://x.com/_priest_2105_" target="_blank" className="hover:text-ink-primary transition-colors">X / Twitter</a>
                <a href="mailto:fawzybailey782@gmail.com" className="hover:text-ink-primary transition-colors">Email</a>
                <span className="text-ink-muted leading-relaxed">+234 901 291 4046</span>
            </div>
        </header>
    );
}
