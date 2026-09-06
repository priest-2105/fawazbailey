import Link from "next/link";
import { ALL_PROJECTS, PINNED, OTHERS, type Project } from "@/lib/projects";

function ProjectRows({ projects }: { projects: Project[] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "var(--border-w) solid var(--ink)" }}>
      {projects.map((project) => (
        <li key={project.slug} className="proj-row">
          <div className="proj-row-meta">
            <span style={{ fontWeight: 700, color: "var(--ink)" }}>{project.year}</span>
            <span style={{ color: project.status === "Archived" ? "var(--ink-mute)" : "var(--accent)" }}>
              {project.status}
            </span>
          </div>

          <div style={{ minWidth: 0 }}>
            <Link
              href={`/projects/${project.slug}`}
              className="display proj-row-title"
              style={{ fontSize: "clamp(22px, 3vw, 30px)", textDecoration: "none", color: "var(--ink)" }}
            >
              {project.title}
            </Link>

            <p
              style={{
                fontSize: "16px",
                color: "var(--ink-soft)",
                lineHeight: 1.65,
                margin: "10px 0 16px",
                maxWidth: "58ch",
              }}
            >
              {project.tagline}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
              {project.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="proj-row-links">
            <Link href={`/projects/${project.slug}`} className="ink-link" style={{ fontWeight: 700 }}>
              Read →
            </Link>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="ink-link">
              GitHub ↗
            </a>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="ink-link">
                Live ↗
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function ProjectsPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--paper)", color: "var(--ink)" }}>
      <header
        className="page-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "var(--border-w) solid var(--ink)",
        }}
      >
        <Link href="/" className="ink-link" style={{ fontSize: "14px", fontWeight: 600 }}>
          ← Home
        </Link>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-mute)",
          }}
        >
          {ALL_PROJECTS.length} projects
        </span>
      </header>

      <main className="projects-main">
        <div style={{ marginBottom: "56px" }}>
          <h1 className="display" style={{ fontSize: "clamp(44px, 8vw, 92px)", marginBottom: "20px" }}>
            The Work
          </h1>
          <p style={{ fontSize: "18px", color: "var(--ink-soft)", lineHeight: 1.65, maxWidth: "54ch" }}>
            Every one of these started because something was annoying me. Each page covers what
            was broken, the call I made, and what I gave up to make it.
          </p>
        </div>

        <section style={{ marginBottom: "80px" }}>
          <p className="kicker">
            <span className="kicker-num">01</span> Pinned
          </p>
          <ProjectRows projects={PINNED} />
        </section>

        {OTHERS.length > 0 && (
          <section>
            <p className="kicker">
              <span className="kicker-num">02</span> Also built
            </p>
            <ProjectRows projects={OTHERS} />
          </section>
        )}
      </main>

      <footer
        style={{
          borderTop: "var(--border-w) solid var(--ink)",
          padding: "28px 56px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
          fontSize: "13px",
          color: "var(--ink-mute)",
        }}
      >
        <p>© 2026 Fawaz Bailey</p>
        <Link href="/" className="ink-link" style={{ fontWeight: 600 }}>
          ← Home
        </Link>
      </footer>
    </div>
  );
}
