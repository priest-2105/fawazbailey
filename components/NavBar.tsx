import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-sm">
      <span className="text-sm font-medium tracking-tight text-ink-primary">
        Fawaz Bailey
      </span>
      <div className="flex items-center gap-8 text-sm text-ink-muted">
        <a href="#about" className="hover:text-ink-primary transition-colors">About</a>
        <a href="#projects" className="hover:text-ink-primary transition-colors">Projects</a>
        <a href="#experience" className="hover:text-ink-primary transition-colors">Experience</a>
        <a href="mailto:fawzybailey782@gmail.com" className="hover:text-ink-primary transition-colors">Contact</a>
      </div>
    </nav>
  );
}
