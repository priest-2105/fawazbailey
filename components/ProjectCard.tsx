import Link from "next/link";
import { KIND_LABEL, type Project } from "@/lib/projects";

/** Grid-shaped alternative to ProjectRow. Takes the project itself rather than
 *  loose props, so it can't drift out of step with the data model. */
export default function ProjectCard({ project }: { project: Project }) {
  const cover = project.images[0];

  return (
    <article className="panel pop" style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          aspectRatio: "16 / 10",
          backgroundColor: project.bgColor,
          borderBottom: "var(--border-w) solid var(--ink)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover.src}
            alt={cover.caption ?? `${project.title} screenshot`}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div
            className="halftone"
            aria-hidden
            style={{ width: "100%", height: "100%", opacity: 0.6 }}
          />
        )}
      </div>

      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 12px",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--ink-mute)",
            marginBottom: "12px",
          }}
        >
          <span style={{ color: project.status === "Archived" ? "var(--ink-mute)" : "var(--accent)" }}>
            {project.status}
          </span>
          <span aria-hidden>·</span>
          <span>{KIND_LABEL[project.kind]}</span>
          <span aria-hidden>·</span>
          <span>{project.year}</span>
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="display"
          style={{ fontSize: "22px", color: "var(--ink)", textDecoration: "none", marginBottom: "10px" }}
        >
          {project.title}
        </Link>

        <p
          style={{
            fontSize: "15px",
            color: "var(--ink-soft)",
            lineHeight: 1.6,
            marginBottom: "16px",
            flex: 1,
          }}
        >
          {project.tagline}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "18px" }}>
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: "18px",
            fontSize: "13px",
            fontWeight: 700,
            paddingTop: "14px",
            borderTop: "1.5px solid var(--ink-faint)",
          }}
        >
          <Link href={`/projects/${project.slug}`} className="ink-link">
            Read →
          </Link>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="ink-link">
              Live ↗
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="ink-link">
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
