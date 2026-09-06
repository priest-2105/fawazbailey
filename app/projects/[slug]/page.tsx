import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ALL_PROJECTS, KIND_LABEL, type Project } from "@/lib/projects";

export function generateStaticParams() {
  return ALL_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = ALL_PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Fawaz Bailey`,
    description: project.tagline,
  };
}

function narrative(project: Project) {
  return [
    { num: "01", label: "The problem", body: project.problem, accent: false },
    { num: "02", label: "The decision", body: project.decision, accent: false },
    { num: "03", label: "The tradeoff", body: project.tradeoff, accent: true },
    { num: "04", label: "What shipped", body: project.outcome, accent: false },
  ];
}

export default async function ProjectDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = ALL_PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const [hero, ...rest] = project.images;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--paper)", color: "var(--ink)" }}>

      <header
        className="page-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "var(--border-w) solid var(--ink)",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <Link href="/projects" className="ink-link" style={{ fontSize: "14px", fontWeight: 600 }}>
          ← All projects
        </Link>

        <div style={{ display: "flex", gap: "12px" }}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
              Live ↗
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              GitHub ↗
            </a>
          )}
        </div>
      </header>

      <main className="projects-main">

        {/* ── Title block ── */}
        <div style={{ marginBottom: "48px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px 16px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--ink-mute)",
              marginBottom: "20px",
            }}
          >
            <span style={{ color: "var(--accent)" }}>{project.status}</span>
            <span aria-hidden>·</span>
            <span>{KIND_LABEL[project.kind]}</span>
            <span aria-hidden>·</span>
            <span>{project.year}</span>
            <span aria-hidden>·</span>
            <span>{project.role}</span>
          </div>

          <h1
            className="display"
            style={{
              fontSize: "clamp(40px, 7vw, 84px)",
              marginBottom: "20px",
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontSize: "clamp(18px, 2.4vw, 22px)",
              color: "var(--ink-soft)",
              lineHeight: 1.55,
              maxWidth: "620px",
            }}
          >
            {project.tagline}
          </p>
        </div>

        {/* ── Hero image ── */}
        {hero && (
          <figure className="panel" style={{ marginBottom: "72px", padding: "10px" }}>
            <div style={{ aspectRatio: "16 / 9", backgroundColor: project.bgColor, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hero.src}
                alt={`${project.title} screenshot`}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            {hero.caption && (
              <figcaption
                style={{
                  fontSize: "13px",
                  color: "var(--ink-mute)",
                  padding: "12px 4px 2px",
                  lineHeight: 1.55,
                }}
              >
                {hero.caption}
              </figcaption>
            )}
          </figure>
        )}

        {/* ── Narrative panels ── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "72px" }}>
          {narrative(project).map(({ num, label, body, accent }) => (
            <article
              key={num}
              className={`panel${accent ? " panel-accent" : ""}`}
              style={{ padding: "clamp(24px, 4vw, 40px)" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "14px",
                  marginBottom: "18px",
                }}
              >
                <span
                  className="display"
                  style={{ fontSize: "15px", color: accent ? "var(--accent)" : "var(--ink-faint)" }}
                >
                  {num}
                </span>
                <h2
                  className="display"
                  style={{ fontSize: "clamp(19px, 2.6vw, 26px)" }}
                >
                  {label}
                </h2>
              </div>

              <p
                style={{
                  fontSize: "17px",
                  lineHeight: 1.75,
                  color: "var(--ink-soft)",
                  maxWidth: "62ch",
                }}
              >
                {body}
              </p>
            </article>
          ))}
        </section>

        {/* ── Stack ── */}
        <section style={{ marginBottom: "72px" }}>
          <p className="kicker">
            <span className="kicker-num">05</span> Built with
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {project.stack.map((item) => (
              <span key={item} className="tag">{item}</span>
            ))}
          </div>
        </section>

        {/* ── Gallery ── */}
        {rest.length > 0 && (
          <section style={{ marginBottom: "72px" }}>
            <p className="kicker">
              <span className="kicker-num">06</span> Screens
            </p>

            <div className="grid-2col" style={{ gap: "24px" }}>
              {rest.map((image, i) => (
                <figure key={image.src} className="panel pop" style={{ padding: "8px" }}>
                  <div style={{ aspectRatio: "16 / 10", backgroundColor: project.bgColor, overflow: "hidden" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.src}
                      alt={image.caption ?? `${project.title} screenshot ${i + 2}`}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                  {image.caption && (
                    <figcaption
                      style={{
                        fontSize: "13px",
                        color: "var(--ink-mute)",
                        padding: "10px 4px 2px",
                        lineHeight: 1.55,
                      }}
                    >
                      {image.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            paddingTop: "40px",
            borderTop: "var(--border-w) solid var(--ink)",
          }}
        >
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
              Live site ↗
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              View on GitHub ↗
            </a>
          )}
          <Link href="/projects" className="btn btn-ghost">
            ← All projects
          </Link>
        </div>

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
