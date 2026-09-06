import Link from "next/link";
import NavBar from "@/components/NavBar";
import ContactButton from "@/components/ContactButton";
import NowPlaying from "@/components/NowPlaying";
import ProjectRow from "@/components/ProjectRow";
import { PINNED } from "@/lib/projects";

const skills = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "Golang", "Python", "Java"],
  },
  {
    label: "Frameworks",
    items: ["React", "Next.js", "React Native", "NestJS", "Laravel", "Django"],
  },
  {
    label: "Styling",
    items: ["Tailwind CSS", "Styled Components", "CSS Modules", "Framer Motion"],
  },
  {
    label: "Data & APIs",
    items: ["REST API", "GraphQL", "WebSockets", "Supabase", "Redis", "PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    label: "Tools",
    items: ["Git / GitHub", "Figma", "Docker", "Vercel", "Stripe", "Shopify", "WordPress", "Framer"],
  },
  {
    label: "Honorable Mentions",
    items: ["Three.js", "VS Code Extensions", "Web Scraping"],
  },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--paper)", color: "var(--ink)" }}>
      <NavBar />

      <main className="home-main">

        {/* ════════ HERO ════════ */}
        <section id="about" style={{ position: "relative", paddingTop: "150px", paddingBottom: "100px" }}>
          <div
            className="halftone"
            aria-hidden
            style={{
              position: "absolute",
              top: "110px",
              right: 0,
              width: "min(380px, 40vw)",
              height: "260px",
              opacity: 0.55,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "14px",
              }}
            >
              Hi, I&apos;m
            </p>

            <h1
              className="display"
              style={{ fontSize: "clamp(48px, 10vw, 132px)", marginBottom: "22px" }}
            >
              Fawaz Bailey
            </h1>

            <p
              style={{
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--ink-mute)",
                marginBottom: "36px",
                paddingBottom: "26px",
                borderBottom: "var(--border-w) solid var(--ink)",
                maxWidth: "620px",
              }}
            >
              Design &amp; Software Engineer · Lagos, Nigeria
            </p>

            <div style={{ maxWidth: "620px", marginBottom: "36px" }}>
              <p style={{ fontSize: "clamp(17px, 2.1vw, 20px)", color: "var(--ink-soft)", lineHeight: 1.7 }}>
                Most of what I&apos;ve built started the same way — something was annoying me, and
                the existing fix was worse than the problem. I care more about the decision behind
                an interface than the interface itself, so every project here tells you what I gave
                up to build it.
              </p>

              <p style={{ fontSize: "clamp(17px, 2.1vw, 20px)", color: "var(--ink-soft)", lineHeight: 1.7, marginTop: "18px" }}>
                Occasionally fast, always deliberate, and never with a component named{" "}
                <code
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.85em",
                    backgroundColor: "var(--wash)",
                    border: "1.5px solid var(--ink)",
                    padding: "1px 7px",
                  }}
                >
                  FinalFinal2.tsx
                </code>
                .
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "44px" }}>
              <ContactButton label="Get in touch" filled={true} />
              <Link href="/about" className="btn btn-ghost">About me →</Link>
              <a
                href="https://github.com/priest-2105"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                GitHub ↗
              </a>
            </div>

            {/* living detail */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                flexWrap: "wrap",
                borderTop: "1.5px solid var(--ink-faint)",
                paddingTop: "20px",
                maxWidth: "620px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--ink-mute)",
                }}
              >
                Right now
              </span>
              <NowPlaying />
            </div>
          </div>
        </section>

        {/* ════════ WORK ════════ */}
        <section id="projects" style={{ paddingBottom: "104px" }}>
          <p className="kicker">
            <span className="kicker-num">01</span> The Work
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "var(--border-w) solid var(--ink)" }}>
            {PINNED.map((p) => (
              <ProjectRow key={p.slug} project={p} />
            ))}
          </ul>

          <div style={{ marginTop: "32px" }}>
            <Link href="/projects" className="btn btn-ghost">Every project ↗</Link>
          </div>
        </section>

        {/* ════════ TOOLKIT ════════ */}
        <section style={{ paddingBottom: "104px" }}>
          <p className="kicker">
            <span className="kicker-num">02</span> Toolkit
          </p>

          <div className="grid-3col">
            {skills.map(({ label, items }) => (
              <div key={label} className="panel" style={{ padding: "24px" }}>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: "16px",
                    paddingBottom: "12px",
                    borderBottom: "1.5px solid var(--ink)",
                  }}
                >
                  {label}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {items.map((item) => (
                    <li key={item} style={{ fontSize: "15px", color: "var(--ink-soft)", lineHeight: 1.95 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ════════ EDUCATION ════════ */}
        <section style={{ paddingBottom: "128px" }}>
          <p className="kicker">
            <span className="kicker-num">03</span> Education
          </p>

          <div className="panel" style={{ padding: "clamp(24px, 4vw, 40px)" }}>
            <div className="grid-sidebar">
              <div>
                <p className="display" style={{ fontSize: "20px", marginBottom: "10px" }}>
                  National Open University of Nigeria
                </p>
                <p style={{ fontSize: "15px", color: "var(--ink-soft)" }}>
                  BSc Computer Science
                </p>
              </div>

              <p style={{ fontSize: "16px", color: "var(--ink-soft)", lineHeight: 1.8, alignSelf: "start" }}>
                Software Engineering · Web &amp; Internet Technology · Algorithms &amp; Data Structures ·
                Systems Design &amp; Security · Data-Driven Computing · Java
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* ════════ FOOTER ════════ */}
      <footer
        style={{
          backgroundColor: "var(--ink)",
          borderTop: "var(--border-w) solid var(--ink)",
          padding: "80px 48px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "56px",
              flexWrap: "wrap",
              gap: "32px",
            }}
          >
            <div>
              <p
                className="display"
                style={{ fontSize: "clamp(34px, 5.5vw, 60px)", color: "var(--paper)", marginBottom: "14px" }}
              >
                Let&apos;s build<br />something
              </p>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-mute)",
                }}
              >
                Design &amp; Software Engineer · Lagos, Nigeria
              </p>
            </div>

            <ContactButton
              label="Get in touch ↗"
              filled={true}
              style={{ backgroundColor: "var(--paper)", color: "var(--ink)", alignSelf: "flex-start" }}
            />
          </div>

          <div style={{ height: "var(--border-w)", backgroundColor: "#3a3a3a", marginBottom: "28px" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <p style={{ fontSize: "13px", color: "#666666" }}>© 2026 Fawaz Bailey</p>

            <div style={{ display: "flex", gap: "26px", flexWrap: "wrap" }}>
              {[
                { label: "GitHub",   href: "https://github.com/priest-2105" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/fawazbailey" },
                { label: "X",        href: "https://x.com/fawazbailey" },
                { label: "Email",    href: "mailto:fawzybailey782@gmail.com" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="footer-link"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
