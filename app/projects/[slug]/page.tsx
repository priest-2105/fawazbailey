import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ALL_PROJECTS } from "@/lib/projects";

const F = "var(--font-inter), 'Inter', system-ui, -apple-system, sans-serif";

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
    description: project.description,
  };
}

export default async function ProjectDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = ALL_PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", fontFamily: F, color: "#111111" }}>

      {/* header */}
      <header
        className="page-header"
        style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          borderBottom:   "1px solid #f0f0f0",
        }}
      >
        <Link
          href="/projects"
          style={{ fontSize: "15px", fontWeight: 500, color: "#999999", textDecoration: "none", fontFamily: F }}
        >
          ← Projects
        </Link>

        <div style={{ display: "flex", gap: "12px" }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:         "inline-flex",
                alignItems:      "center",
                backgroundColor: "#111111",
                color:           "#ffffff",
                fontSize:        "14px",
                fontWeight:      500,
                padding:         "9px 20px",
                borderRadius:    "999px",
                textDecoration:  "none",
                fontFamily:      F,
              }}
            >
              Live ↗
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              border:         "1px solid #dddddd",
              color:          "#111111",
              fontSize:       "14px",
              fontWeight:     500,
              padding:        "9px 20px",
              borderRadius:   "999px",
              textDecoration: "none",
              fontFamily:     F,
            }}
          >
            GitHub ↗
          </a>
        </div>
      </header>

      <main className="projects-main">

        {/* title block */}
        <div style={{ marginBottom: "56px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize:        "12px",
                  fontWeight:      500,
                  backgroundColor: "#f5f5f5",
                  color:           "#555555",
                  padding:         "5px 12px",
                  borderRadius:    "999px",
                  fontFamily:      F,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1
            style={{
              fontSize:      "clamp(36px, 5.5vw, 64px)",
              fontWeight:    800,
              color:         "#111111",
              letterSpacing: "-0.03em",
              lineHeight:    1.05,
              marginBottom:  "16px",
              fontFamily:    F,
            }}
          >
            {project.title}
          </h1>

          <p style={{ fontSize: "18px", color: "#555555", lineHeight: 1.7, maxWidth: "640px", fontFamily: F }}>
            {project.description}
          </p>

          <p style={{ fontSize: "14px", color: "#aaaaaa", marginTop: "12px", fontFamily: F }}>
            {project.company}
          </p>
        </div>

        {/* image gallery */}
        {project.images.length > 0 && (
          <div style={{ marginBottom: "64px" }}>
            {/* hero image */}
            <div
              style={{
                borderRadius: "16px",
                overflow:     "hidden",
                aspectRatio:  "16 / 9",
                marginBottom: "12px",
                backgroundColor: project.bgColor,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.images[0]}
                alt={`${project.title} screenshot`}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* secondary images */}
            {project.images.length > 1 && (
              <div className="grid-2col" style={{ gap: "12px" }}>
                {project.images.slice(1).map((img, i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: "12px",
                      overflow:     "hidden",
                      aspectRatio:  "16 / 10",
                      backgroundColor: project.bgColor,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`${project.title} screenshot ${i + 2}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* bottom CTA */}
        <div
          style={{
            display:      "flex",
            gap:          "12px",
            flexWrap:     "wrap",
            paddingTop:   "32px",
            borderTop:    "1px solid #f0f0f0",
          }}
        >
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:         "inline-flex",
              alignItems:      "center",
              backgroundColor: "#111111",
              color:           "#ffffff",
              fontSize:        "15px",
              fontWeight:      500,
              padding:         "12px 26px",
              borderRadius:    "999px",
              textDecoration:  "none",
              fontFamily:      F,
            }}
          >
            View on GitHub ↗
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                border:         "1px solid #dddddd",
                color:          "#111111",
                fontSize:       "15px",
                fontWeight:     500,
                padding:        "12px 26px",
                borderRadius:   "999px",
                textDecoration: "none",
                fontFamily:     F,
              }}
            >
              Live site ↗
            </a>
          )}
          <Link
            href="/projects"
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              border:         "1px solid #dddddd",
              color:          "#111111",
              fontSize:       "15px",
              fontWeight:     500,
              padding:        "12px 26px",
              borderRadius:   "999px",
              textDecoration: "none",
              fontFamily:     F,
            }}
          >
            ← All projects
          </Link>
        </div>

      </main>

      <footer
        style={{
          borderTop:      "1px solid #f0f0f0",
          padding:        "32px 56px",
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          fontFamily:     F,
        }}
      >
        <p style={{ fontSize: "14px", color: "#999999" }}>© 2026 Fawaz Bailey</p>
        <Link href="/" style={{ fontSize: "14px", color: "#999999", textDecoration: "none" }}>
          ← Home
        </Link>
      </footer>
    </div>
  );
}
