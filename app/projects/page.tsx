import Link from "next/link";
import { ALL_PROJECTS } from "@/lib/projects";

const F = "var(--font-inter), 'Inter', system-ui, -apple-system, sans-serif";

const pinned = ALL_PROJECTS.filter((project) => project.pinned);
const others = ALL_PROJECTS.filter((project) => !project.pinned);

function ProjectList({
  title,
  projects,
}: {
  title: string;
  projects: typeof ALL_PROJECTS;
}) {
  return (
    <section style={{ marginBottom: title === "Pinned" ? "72px" : 0 }}>
      <p
        style={{
          fontSize: "12px",
          fontWeight: 500,
          color: "#999999",
          letterSpacing: "0.13em",
          textTransform: "uppercase",
          marginBottom: "24px",
          fontFamily: F,
        }}
      >
        {title}
      </p>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {projects.map((project, index) => {
          const isLast = index === projects.length - 1;
          return (
            <li
              key={project.slug}
              style={{
                padding: "22px 0",
                borderTop: "1px solid #eeeeee",
                borderBottom: isLast ? "1px solid #eeeeee" : "none",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) auto",
                  gap: "24px",
                  alignItems: "start",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "12px",
                      flexWrap: "wrap",
                      marginBottom: "8px",
                    }}
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#111111",
                        letterSpacing: "-0.02em",
                        textDecoration: "none",
                        fontFamily: F,
                      }}
                    >
                      {project.title}
                    </Link>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "#999999",
                        fontFamily: F,
                      }}
                    >
                      {project.company}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: "16px",
                      color: "#555555",
                      lineHeight: 1.7,
                      marginBottom: "14px",
                      fontFamily: F,
                    }}
                  >
                    {project.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#555555",
                          backgroundColor: "#f5f5f5",
                          padding: "5px 10px",
                          borderRadius: "999px",
                          fontFamily: F,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "10px",
                    flexShrink: 0,
                  }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    style={{
                      fontSize: "14px",
                      color: "#111111",
                      textDecoration: "none",
                      padding: "8px 0",
                      fontFamily: F,
                    }}
                  >
                    Open
                  </Link>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "14px",
                      color: "#999999",
                      textDecoration: "none",
                      fontFamily: F,
                    }}
                  >
                    GitHub
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "14px",
                        color: "#999999",
                        textDecoration: "none",
                        fontFamily: F,
                      }}
                    >
                      Live
                    </a>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function ProjectsPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", fontFamily: F, color: "#111111" }}>
      <header
        className="page-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Link href="/" style={{ fontSize: "15px", fontWeight: 500, color: "#999999", textDecoration: "none", fontFamily: F }}>
          Back
        </Link>
        <Link
          href="/"
          style={{
            fontSize: "15px",
            fontWeight: 500,
            color: "#999999",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: F,
          }}
        >
          Home
        </Link>
      </header>

      <main className="projects-main">
        <div style={{ marginBottom: "64px" }}>
          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 800,
              color: "#111111",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: "16px",
              fontFamily: F,
            }}
          >
            All Projects
          </h1>
          <p style={{ fontSize: "18px", color: "#666666", lineHeight: 1.6, fontFamily: F }}>
            {ALL_PROJECTS.length} projects
          </p>
        </div>

        <ProjectList title="Pinned" projects={pinned} />
        <ProjectList title="More" projects={others} />
      </main>

      <footer
        style={{
          borderTop: "1px solid #f0f0f0",
          padding: "32px 56px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: F,
        }}
      >
        <p style={{ fontSize: "14px", color: "#999999" }}>Copyright 2026 Fawaz Bailey</p>
        <Link href="/" style={{ fontSize: "14px", color: "#999999", textDecoration: "none", fontFamily: F }}>
          Back to home
        </Link>
      </footer>
    </div>
  );
}
