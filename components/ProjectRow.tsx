import Link from "next/link";
import { KIND_LABEL, type Project } from "@/lib/projects";

export default function ProjectRow({ project }: { project: Project }) {
  return (
    <li className="proj-row">
      <div className="proj-row-meta">
        <span style={{ fontWeight: 700, color: "var(--ink)" }}>{project.year}</span>
        <span style={{ color: project.status === "Archived" ? "var(--ink-mute)" : "var(--accent)" }}>
          {project.status}
        </span>
        <span style={{ color: "var(--ink-mute)" }}>{KIND_LABEL[project.kind]}</span>
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
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="ink-link">
            GitHub ↗
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="ink-link">
            Live ↗
          </a>
        )}
      </div>
    </li>
  );
}
