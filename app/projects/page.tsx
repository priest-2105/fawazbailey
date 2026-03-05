import Link from "next/link";
import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";

const F = "var(--font-inter), 'Inter', system-ui, -apple-system, sans-serif";

const ALL_PROJECTS = [
  {
    title: "Continuum",
    company: "TypeScript · 2024–Present",
    description: "Centralized web-based archive of original software postmortems from major tech companies — preserved exactly as published, narrative and all.",
    tags: ["TypeScript", "AI", "Vector Search"],
    bgColor: "#111111",
    href: "https://github.com/priest-2105/Continuum",
    pinned: true,
  },
  {
    title: "Sentra",
    company: "TypeScript · 2024–2025",
    description: "Evaluates how production-ready a software project is by analyzing repo structure, deployment config, and engineering standards.",
    tags: ["TypeScript", "Next.js", "GitHub API"],
    bgColor: "#e8edff",
    href: "https://github.com/priest-2105/Sentra",
    pinned: true,
  },
  {
    title: "VeraLex",
    company: "JavaScript · 2024",
    description: "Comprehensive legal case management platform designed to streamline the study and analysis of legal precedents.",
    tags: ["JavaScript", "React", "Next.js"],
    bgColor: "#f5f0ff",
    href: "https://github.com/priest-2105/VeraLex",
    pinned: true,
  },
  {
    title: "Read My T&C",
    company: "JavaScript · 2024",
    description: "Full-stack React app that helps users actually understand terms and conditions — AI-powered analysis and plain-language categorization.",
    tags: ["React", "AI", "JavaScript"],
    bgColor: "#f0fdf4",
    href: "https://github.com/priest-2105/readmytermsandconditions",
    pinned: true,
  },
  {
    title: "Medscope",
    company: "JavaScript · React Native",
    description: "Mobile app for drug lookups, symptom checking, and disease research — powered by the U.S. FDA OpenFDA and NIH MedlinePlus APIs.",
    tags: ["React Native", "JavaScript", "FDA API"],
    bgColor: "#f0f9ff",
    href: "https://github.com/priest-2105/Medscope",
    pinned: true,
  },
  {
    title: "CSc3350 Docs",
    company: "TypeScript · Documentation",
    description: "Software development documentation covering architecture decisions, system design, and implementation notes for a CS lab assignment.",
    tags: ["TypeScript", "Documentation"],
    bgColor: "#fafaf8",
    href: "https://github.com/priest-2105/CSc3350-Software-Development-Lab-5-Documentation",
    pinned: true,
  },

  // ── Other ─────────────────────────────────────────────────────────────────
  {
    title: "Rugrebels",
    company: "JavaScript · E-commerce",
    description: "Ecommerce art gallery site — because art deserves better than a PDF catalogue.",
    tags: ["JavaScript", "React", "E-commerce"],
    bgColor: "#fff8f0",
    href: "https://github.com/priest-2105/Rugrebels",
    pinned: false,
  },
  {
    title: "MoodMix",
    company: "Next.js · Spotify API",
    description: "Generates personalized music playlists based on your current mood. Feelings as a feature, not a bug.",
    tags: ["Next.js", "TypeScript", "Spotify API"],
    bgColor: "#1a1a2e",
    href: "https://github.com/priest-2105/moodmix-v2",
    pinned: false,
  },
  {
    title: "Xvision",
    company: "React · Django · Stripe",
    description: "Full-stack ecommerce app with Stripe payments and a Django backend — built before it was fashionable to call everything a 'marketplace'.",
    tags: ["React", "Django", "Stripe"],
    bgColor: "#f0f4ff",
    href: "https://github.com/priest-2105/Xvision",
    pinned: false,
  },
  {
    title: "TerraDrop",
    company: "Next.js · Tailwind",
    description: "Landing site for a nonprofit using drones to plant trees and restore deforested land. Good cause, good code.",
    tags: ["Next.js", "Tailwind", "Nonprofit"],
    bgColor: "#f0fdf4",
    href: "https://github.com/priest-2105/TerraDrop",
    pinned: false,
  },
  {
    title: "LinkedMatch",
    company: "React · MySQL",
    description: "Scrapes public LinkedIn profiles, stores data in MySQL, and matches users based on shared skills, location, and goals. A dashboard visualizes match analytics.",
    tags: ["React", "MySQL", "Web Scraping"],
    bgColor: "#f0f8ff",
    href: "https://github.com/priest-2105/LinkedMatch",
    pinned: false,
  },
  {
    title: "Errandly",
    company: "JavaScript · 2024",
    description: "Smart task management platform that helps you delegate errands effortlessly — because your to-do list deserves a to-do list.",
    tags: ["JavaScript", "React", "Task Management"],
    bgColor: "#fffbf0",
    href: "https://github.com/priest-2105/Errandly",
    pinned: false,
  },
  {
    title: "920 Appoint",
    company: "JavaScript · Booking",
    description: "Web-based appointment booking platform for women's hairstyles. Scheduling that doesn't require a phone call.",
    tags: ["JavaScript", "Next.js", "Booking"],
    bgColor: "#fff0f6",
    href: "https://github.com/priest-2105/920-appoint",
    pinned: false,
  },
  {
    title: "CSS Unit Converter",
    company: "TypeScript · VS Code Extension",
    description: "VS Code extension that shows unit conversions for px, rem, vh, and vw inline. Small tool, big quality-of-life.",
    tags: ["TypeScript", "VS Code", "Extension"],
    bgColor: "#f5f0ff",
    href: "https://github.com/priest-2105/css-unit-converter-ext",
    pinned: false,
  },
  {
    title: "Shiva",
    company: "JavaScript · Website Builder",
    description: "A website builder that uses design systems — because not everyone wants to wrestle with code to make something that looks decent.",
    tags: ["JavaScript", "Design Systems"],
    bgColor: "#fafafa",
    href: "https://github.com/priest-2105/shiva",
    pinned: false,
  },
  {
    title: "ThreeJS Globe",
    company: "JavaScript · Three.js",
    description: "An attempt to replicate the GitHub homepage globe in Three.js. It works. Mostly.",
    tags: ["Three.js", "JavaScript", "3D"],
    bgColor: "#0d1117",
    href: "https://github.com/priest-2105/ThreeJS-Globe",
    pinned: false,
  },
];

const pinned = ALL_PROJECTS.filter((p) => p.pinned);
const others = ALL_PROJECTS.filter((p) => !p.pinned);

export default function ProjectsPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", fontFamily: F, color: "#111111" }}>

      {/* ── minimal top bar (not fixed on this page) ── */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 56px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image src="/FB.svg" alt="Fawaz Bailey" width={52} height={31} priority />
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
          ← Back
        </Link>
      </header>

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "72px 56px 120px" }}>

        {/* page title */}
        <div style={{ marginBottom: "72px" }}>
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
            {ALL_PROJECTS.length} projects — from production apps to experiments that taught me something.
          </p>
        </div>

        {/* ── Pinned ── */}
        <section style={{ marginBottom: "80px" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: "#999999",
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              marginBottom: "32px",
              fontFamily: F,
            }}
          >
            Pinned
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {pinned.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        </section>

        {/* ── Other ── */}
        <section>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: "#999999",
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              marginBottom: "32px",
              fontFamily: F,
            }}
          >
            More
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
            {others.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        </section>

      </main>

      {/* footer */}
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
        <p style={{ fontSize: "14px", color: "#999999" }}>© 2026 Fawaz Bailey</p>
        <Link href="/" style={{ fontSize: "14px", color: "#999999", textDecoration: "none", fontFamily: F }}>
          ← Back to home
        </Link>
      </footer>
    </div>
  );
}
