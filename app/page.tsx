import Link from "next/link";
import NavBar from "@/components/NavBar";
import ProjectCard from "@/components/ProjectCard";

const PINNED_PROJECTS = [
  {
    title: "Continuum",
    company: "TypeScript · 2024–Present",
    description: "Centralized web-based archive of original software postmortems from major tech companies — preserved exactly as published, narrative and all.",
    tags: ["TypeScript", "AI", "Vector Search"],
    bgColor: "#111111",
    href: "https://github.com/priest-2105/Continuum",
  },
  {
    title: "Sentra",
    company: "TypeScript · 2024–2025",
    description: "Evaluates how production-ready a software project is by analyzing repo structure, deployment config, and engineering standards.",
    tags: ["TypeScript", "Next.js", "GitHub API"],
    bgColor: "#e8edff",
    href: "https://github.com/priest-2105/Sentra",
  },
  {
    title: "VeraLex",
    company: "JavaScript · 2024",
    description: "Comprehensive legal case management platform designed to streamline the study and analysis of legal precedents.",
    tags: ["JavaScript", "React", "Next.js"],
    bgColor: "#f5f0ff",
    href: "https://github.com/priest-2105/VeraLex",
  },
  {
    title: "Read My T&C",
    company: "JavaScript · 2024",
    description: "Full-stack React app that helps users actually understand terms and conditions — AI-powered analysis and plain-language categorization.",
    tags: ["React", "AI", "JavaScript"],
    bgColor: "#f0fdf4",
    href: "https://github.com/priest-2105/readmytermsandconditions",
  },
  {
    title: "Medscope",
    company: "JavaScript · React Native",
    description: "Mobile app for drug lookups, symptom checking, and disease research — powered by the U.S. FDA OpenFDA and NIH MedlinePlus APIs.",
    tags: ["React Native", "JavaScript", "FDA API"],
    bgColor: "#f0f9ff",
    href: "https://github.com/priest-2105/Medscope",
  },
  {
    title: "CSc3350 Docs",
    company: "TypeScript · Documentation",
    description: "Software development documentation written for a CS lab project — covering architecture decisions, system design, and implementation notes.",
    tags: ["TypeScript", "Documentation"],
    bgColor: "#fafaf8",
    href: "https://github.com/priest-2105/CSc3350-Software-Development-Lab-5-Documentation",
  },
];

const F = "var(--font-inter), 'Inter', system-ui, -apple-system, sans-serif";

const experiences = [
  {
    company: "Alation",
    role: "Frontend Engineer",
    period: "2026 — Current",
    stack: ["Next.js", "TypeScript", "React"],
    bullets: ["[ Details to be added ]"],
  },
  {
    company: "iHealth",
    role: "Frontend Engineer · Volunteer",
    period: "2023 — 2024",
    stack: ["React", "Git", "GitHub"],
    bullets: [
      "Contributed to the frontend codebase as a volunteer engineer, writing and reviewing React components across multiple features.",
      "Performed code reviews — catching bugs, enforcing consistency, and occasionally having to say 'this works but we're not shipping it like this'.",
      "Managed branches, PRs, and merge workflows using Git and GitHub, keeping the codebase clean across a distributed team.",
    ],
  },
  {
    company: "Always49",
    role: "Frontend Engineer",
    period: "10/2024 — 03/2025",
    stack: ["Next.js", "TypeScript", "NestJS", "PostgreSQL"],
    bullets: [
      "Built and maintained production-grade frontend applications using Next.js and TypeScript.",
      "Developed reusable component systems to ensure UI consistency across client projects.",
      "Translated Figma designs into responsive, accessible interfaces with strong attention to UX detail.",
      "Integrated REST APIs and collaborated with backend engineers to optimize data flow.",
      "Improved performance through code splitting, lazy loading, and targeted optimization strategies.",
    ],
  },
  {
    company: "UniSkills",
    role: "Software Engineer",
    period: "2022 — 09/2025",
    stack: ["Next.js", "TypeScript", "NestJS", "React", "WebSockets", "PostgreSQL"],
    bullets: [
      "Developed and maintained the frontend of an education platform connecting students with local businesses.",
      "Built a real-time chat system from scratch with React.js, WebSockets, and Styled Components.",
      "Led the Laravel to Next.js migration, focusing on performance and UX improvements.",
      "Collaborated with backend developers to integrate APIs efficiently.",
    ],
  },
];

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

const LABEL: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 500,
  color: "#999999",
  letterSpacing: "0.13em",
  textTransform: "uppercase" as const,
  marginBottom: "40px",
  fontFamily: F,
};

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", fontFamily: F, color: "#111111" }}>
      <NavBar />

      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 48px" }}>

        {/* ────────────────────────────────────────
            HERO
        ──────────────────────────────────────── */}
        <section id="about" style={{ paddingTop: "168px", paddingBottom: "112px" }}>
          <h1
            style={{
              fontSize: "clamp(64px, 9.5vw, 112px)",
              fontWeight: 800,
              color: "#111111",
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              marginBottom: "32px",
              fontFamily: F,
            }}
          >
            Hi, I&apos;m Fawaz Bailey.
          </h1>

          {/* tagline */}
          <p
            style={{
              fontSize: "clamp(18px, 2.2vw, 22px)",
              fontWeight: 400,
              color: "#555555",
              lineHeight: 1.65,
              maxWidth: "620px",
              marginBottom: "32px",
              fontFamily: F,
            }}
          >
            Frontend engineer based in Lagos, Nigeria. I build web apps that solve real
            problems — occasionally fast, always deliberate, and never with a
            component named{" "}
            <code
              style={{
                fontFamily: "monospace",
                fontSize: "0.82em",
                backgroundColor: "#f4f4f4",
                padding: "2px 7px",
                borderRadius: "4px",
                color: "#333333",
              }}
            >
              FinalFinal2.tsx
            </code>
            .
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[
              { label: "Get in touch", href: "mailto:fawzybailey782@gmail.com", filled: true },
              { label: "About me →", href: "/about", filled: false },
              { label: "GitHub ↗", href: "https://github.com/priest-2105", filled: false },
            ].map(({ label, href, filled }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: filled ? "#111111" : "transparent",
                  color: filled ? "#ffffff" : "#111111",
                  border: filled ? "none" : "1px solid #dddddd",
                  fontSize: "15px",
                  fontWeight: 500,
                  padding: "11px 24px",
                  borderRadius: "999px",
                  textDecoration: "none",
                  fontFamily: F,
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </section>

        {/* ────────────────────────────────────────
            PROJECTS
        ──────────────────────────────────────── */}
        <section id="projects" style={{ paddingBottom: "112px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "40px" }}>
            <p style={{ ...LABEL, marginBottom: 0 }}>Projects</p>
            <Link
              href="/projects"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#999999",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontFamily: F,
                transition: "color 0.2s",
              }}
            >
              View all ↗
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "28px" }}>
            {PINNED_PROJECTS.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        </section>

        {/* ────────────────────────────────────────
            EXPERIENCE
        ──────────────────────────────────────── */}
        <section id="experience" style={{ paddingBottom: "112px" }}>
          <p style={LABEL}>Work</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {experiences.map(({ company, role, period, stack, bullets }, idx) => (
              <div
                key={company}
                style={{
                  display: "grid",
                  gridTemplateColumns: "260px 1fr",
                  gap: "40px",
                  paddingTop: idx === 0 ? 0 : "56px",
                  paddingBottom: "56px",
                  borderBottom: "1px solid #eeeeee",
                }}
              >
                {/* left col — company info */}
                <div>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#111111",
                      letterSpacing: "-0.02em",
                      marginBottom: "6px",
                      fontFamily: F,
                    }}
                  >
                    {company}
                  </p>
                  <p style={{ fontSize: "15px", color: "#888888", marginBottom: "12px", fontFamily: F }}>
                    {role}
                  </p>
                  <p style={{ fontSize: "13px", color: "#bbbbbb", marginBottom: "16px", fontFamily: F }}>
                    {period}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {stack.map((s) => (
                      <span
                        key={s}
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#555555",
                          backgroundColor: "#f5f5f5",
                          padding: "4px 10px",
                          borderRadius: "999px",
                          fontFamily: F,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* right col — bullets */}
                <ul style={{ listStyle: "none", padding: 0, margin: 0, alignSelf: "start" }}>
                  {bullets.map((b, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: "16px",
                        color: "#444444",
                        lineHeight: 1.75,
                        marginBottom: "10px",
                        paddingLeft: "18px",
                        position: "relative",
                        fontFamily: F,
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "#cccccc",
                          userSelect: "none",
                          fontSize: "16px",
                        }}
                      >
                        –
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ────────────────────────────────────────
            SKILLS
        ──────────────────────────────────────── */}
        <section style={{ paddingBottom: "112px" }}>
          <p style={LABEL}>Skills & Tools</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "48px 40px" }}>
            {skills.map(({ label, items }) => (
              <div key={label}>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#cccccc",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase" as const,
                    marginBottom: "20px",
                    fontFamily: F,
                  }}
                >
                  {label}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontSize: "16px",
                        color: "#111111",
                        lineHeight: 2,
                        fontFamily: F,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ────────────────────────────────────────
            EDUCATION
        ──────────────────────────────────────── */}
        <section style={{ paddingBottom: "140px" }}>
          <p style={LABEL}>Education</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "260px 1fr",
              gap: "40px",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#111111",
                  letterSpacing: "-0.02em",
                  marginBottom: "6px",
                  fontFamily: F,
                }}
              >
                National Open University of Nigeria
              </p>
              <p style={{ fontSize: "15px", color: "#888888", marginBottom: "12px", fontFamily: F }}>
                BSc Computer Science
              </p>
              <p style={{ fontSize: "13px", color: "#bbbbbb", fontFamily: F }}>
                Expected 2026
              </p>
            </div>

            <p style={{ fontSize: "16px", color: "#444444", lineHeight: 1.8, fontFamily: F, alignSelf: "start" }}>
              Software Engineering · Web & Internet Technology · Algorithms & Data Structures ·
              Systems Design & Security · Data-Driven Computing · Java
            </p>
          </div>
        </section>

      </main>

      {/* ────────────────────────────────────────
          FOOTER
      ──────────────────────────────────────── */}
      <footer style={{ backgroundColor: "#111111", padding: "80px 48px", fontFamily: F }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* top row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "64px",
              flexWrap: "wrap",
              gap: "32px",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "clamp(36px, 5vw, 56px)",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  marginBottom: "12px",
                  fontFamily: F,
                }}
              >
                Fawaz Bailey
              </p>
              <p style={{ fontSize: "18px", color: "#666666", fontFamily: F }}>
                Frontend Engineer · Lagos, Nigeria
              </p>
            </div>

            <a
              href="mailto:fawzybailey782@gmail.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: "#ffffff",
                color: "#111111",
                fontSize: "15px",
                fontWeight: 600,
                padding: "13px 28px",
                borderRadius: "999px",
                textDecoration: "none",
                fontFamily: F,
                alignSelf: "flex-start",
              }}
            >
              Get in touch ↗
            </a>
          </div>

          {/* divider */}
          <div style={{ height: "1px", backgroundColor: "#2a2a2a", marginBottom: "32px" }} />

          {/* bottom row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <p style={{ fontSize: "14px", color: "#555555", fontFamily: F }}>
              © 2026 Fawaz Bailey
            </p>

            <div style={{ display: "flex", gap: "28px" }}>
              {[
                { label: "GitHub",   href: "https://github.com/priest-2105" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/fawazbailey/" },
                { label: "X",        href: "https://x.com/_priest_2105_" },
                { label: "Email",    href: "mailto:fawzybailey782@gmail.com" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    fontSize: "15px",
                    color: "#666666",
                    textDecoration: "none",
                    fontFamily: F,
                  }}
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
