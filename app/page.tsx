import NavBar from "@/components/NavBar";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-ink-primary">
      <NavBar />

      <main className="max-w-5xl mx-auto px-8 pt-36 pb-24">

        {/* ── Hero ── */}
        <section id="about" className="mb-24">
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight leading-tight mb-6">
            Hi, I&apos;m Fawaz Bailey.
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8">
            Frontend engineer based in Lagos, Nigeria. I build web apps that solve real problems —
            occasionally fast, always deliberate, and never with a component named{" "}
            <span className="font-mono text-sm bg-zinc-50 border border-zinc-100 px-1.5 py-0.5 rounded">
              FinalFinal2.tsx
            </span>
            .
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:fawzybailey782@gmail.com"
              className="px-5 py-2.5 bg-ink-primary text-white text-sm font-medium rounded-lg hover:bg-ink-secondary transition-colors"
            >
              Get in touch
            </a>
            <a
              href="https://github.com/priest-2105"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-zinc-200 text-ink-primary text-sm font-medium rounded-lg hover:border-zinc-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/fawazbailey/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-zinc-200 text-ink-primary text-sm font-medium rounded-lg hover:border-zinc-400 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="mb-24">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-ink-muted mb-8">
            Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ProjectCard
              title="Continuum"
              subtitle="Software Engineer · 2024 — Present"
              description="A centralized repository of original software postmortems from major tech companies — preserved exactly as published. Because hindsight is 20/20, but it helps to actually read the post-mortems."
              tags={["Python", "AI", "Vector Search", "GitHub"]}
              bgColor="bg-zinc-800"
            />
            <ProjectCard
              title="Sentra"
              subtitle="Software Engineer · 10/2024 — 03/2025"
              description="A web application that evaluates how production-ready a software project is by analyzing repository structure, deployment config, and engineering standards. 'It works on my machine' is not a deployment strategy."
              tags={["Next.js", "TypeScript", "GitHub API"]}
              bgColor="bg-blue-50"
            />
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="mb-24">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-ink-muted mb-8">
            Experience
          </h2>
          <div className="space-y-0 divide-y divide-zinc-100">

            <div className="py-7 first:pt-0 last:pb-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-3">
                <div>
                  <h3 className="text-base font-semibold tracking-tight">Alation</h3>
                  <p className="text-sm text-ink-muted italic">Frontend Engineer</p>
                </div>
                <span className="text-xs font-mono text-ink-muted">2026 — Current</span>
              </div>
              <p className="text-xs font-mono text-ink-muted mb-3">
                Next.js &bull; TypeScript &bull; React
              </p>
              <p className="text-sm text-ink-secondary leading-relaxed italic">[ Details to be added ]</p>
            </div>

            <div className="py-7 first:pt-0 last:pb-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-3">
                <div>
                  <h3 className="text-base font-semibold tracking-tight">Always49</h3>
                  <p className="text-sm text-ink-muted italic">Frontend Engineer</p>
                </div>
                <span className="text-xs font-mono text-ink-muted">10/2024 — 03/2025</span>
              </div>
              <p className="text-xs font-mono text-ink-muted mb-3">
                Next.js &bull; TypeScript &bull; NestJS &bull; PostgreSQL
              </p>
              <ul className="text-sm text-ink-secondary leading-relaxed space-y-2">
                <li>Built and maintained production-grade frontend applications using Next.js and TypeScript.</li>
                <li>Developed reusable component systems to ensure UI consistency across client projects.</li>
                <li>Translated Figma designs into responsive, accessible interfaces with strong attention to UX detail.</li>
                <li>Integrated REST APIs and collaborated closely with backend engineers to optimize data flow.</li>
                <li>Improved performance through code splitting, lazy loading, and targeted optimization strategies.</li>
              </ul>
            </div>

            <div className="py-7 first:pt-0 last:pb-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-3">
                <div>
                  <h3 className="text-base font-semibold tracking-tight">UniSkills</h3>
                  <p className="text-sm text-ink-muted italic">Software Engineer</p>
                </div>
                <span className="text-xs font-mono text-ink-muted">2022 — 09/2025</span>
              </div>
              <p className="text-xs font-mono text-ink-muted mb-3">
                Next.js &bull; TypeScript &bull; NestJS &bull; React &bull; WebSockets &bull; PostgreSQL
              </p>
              <ul className="text-sm text-ink-secondary leading-relaxed space-y-2">
                <li>Developed and maintained the front end of an education platform connecting students with local businesses.</li>
                <li>Built a real-time chat system from scratch with React.js, WebSockets, and Styled Components.</li>
                <li>Led the Laravel to Next.js migration, focusing on performance and UX improvements.</li>
                <li>Collaborated with backend developers to integrate APIs efficiently.</li>
              </ul>
            </div>

          </div>
        </section>

        {/* ── Skills ── */}
        <section className="mb-24">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-ink-muted mb-8">
            Skills & Tools
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-ink-muted mb-3">Stack</p>
              <ul className="space-y-1.5 text-ink-secondary">
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>React</li>
                <li>Next.js</li>
                <li>Golang</li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-ink-muted mb-3">Tools</p>
              <ul className="space-y-1.5 text-ink-secondary">
                <li>Git / GitHub</li>
                <li>Supabase</li>
                <li>Figma</li>
                <li>GraphQL</li>
                <li>REST API</li>
                <li>Redis</li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-ink-muted mb-3">Databases</p>
              <ul className="space-y-1.5 text-ink-secondary">
                <li>PostgreSQL</li>
                <li>MySQL</li>
                <li>MongoDB</li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-ink-muted mb-3">CMS</p>
              <ul className="space-y-1.5 text-ink-secondary">
                <li>Shopify</li>
                <li>WordPress</li>
                <li>Framer</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Education ── */}
        <section>
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-ink-muted mb-8">
            Education
          </h2>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-2">
            <div>
              <h3 className="text-base font-semibold tracking-tight">National Open University of Nigeria</h3>
              <p className="text-sm text-ink-muted italic">BSc Computer Science</p>
            </div>
            <span className="text-xs font-mono text-ink-muted">Expected 2026</span>
          </div>
          <p className="text-sm text-ink-secondary leading-relaxed mt-3">
            Software Engineering &bull; Web & Internet Technology &bull; Algorithms & Data Structures &bull; Systems Design & Security &bull; Data-Driven Computing &bull; Java
          </p>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="bg-zinc-950 text-zinc-400 px-8 py-12">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <p className="text-white font-medium mb-1">Fawaz Bailey</p>
            <p className="text-sm">Frontend Engineer · Lagos, Nigeria</p>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="https://github.com/priest-2105" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/fawazbailey/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://x.com/_priest_2105_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X / Twitter</a>
            <a href="mailto:fawzybailey782@gmail.com" className="hover:text-white transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
