import Link from "next/link";
import ProjectFilter from "@/components/ProjectFilter";
import { ALL_PROJECTS } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <div style={{ minHeight: "100vh", color: "var(--ink)" }}>
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
        <div style={{ marginBottom: "48px" }}>
          <h1 className="display" style={{ fontSize: "clamp(44px, 8vw, 92px)", marginBottom: "20px" }}>
            The Work
          </h1>
          <p style={{ fontSize: "18px", color: "var(--ink-soft)", lineHeight: 1.65, maxWidth: "54ch" }}>
            Things I built because something was annoying me, and things I built because
            someone paid me to. Each page covers what was broken, the call I made, and
            what I gave up to make it.
          </p>
        </div>

        <ProjectFilter projects={ALL_PROJECTS} />
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
