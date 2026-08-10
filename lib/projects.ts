export interface Project {
  slug: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
  bgColor: string;
  githubUrl: string;
  liveUrl?: string;
  images: string[];
  pinned: boolean;
}

export const ALL_PROJECTS: Project[] = [
  {
    slug: "blick",
    title: "Blick",
    company: "TypeScript · 2026-Present",
    description:
      "Blick is a browser-based tool for browsing, animating, and exporting icons. Search across 11,000+ icons from popular libraries (Lucide, Tabler, Phosphor, Heroicons, Iconoir, Remix), or upload your own SVG. Build multi-step animation sequences (draw-on, fade, pop, spin, stagger, pulse) with a visual timeline editor, preview them live, and export as animated SVG, HTML, React component, GIF, MP4, or WebM. Optional free account for cloud-saving projects.",
    tags: ["Next.js", "TypeScript",  "Vector SVG", "Design System"],
    bgColor: "#1f1f1f1",
    githubUrl: "https://github.com/priest-2105/blick",
    liveUrl: "https://blick.fawazbailey.com/",
    images: [
      "/images/projects/blick.fawazbailey.com.png",
      "/images/projects/blick.fawazbailey.com2.png",
      "/images/projects/blick.fawazbailey.com3.png",
      "/images/projects/blick.fawazbailey.com4.png",
      "/images/projects/blick.fawazbailey.com5.png",
      "/images/projects/blick.fawazbailey.com6.png",
    ],
    pinned: true,
  },
  {
    slug: "continuum",
    title: "Continuum",
    company: "TypeScript · 2026-Present",
    description:
      "Centralized web-based archive of original software postmortems from major tech companies - preserved exactly as published, narrative and all.",
    tags: ["TypeScript", "AI", "Vector Search", "Github Actions"],
    bgColor: "#111111",
    githubUrl: "https://github.com/priest-2105/Continuum",
    liveUrl: "https://continuum.fawazbailey.com/",
    images: [
      "/images/projects/continuum.fawazbailey.com_.png",
      "/images/projects/continuum.fawazbailey.com_ (1).png",
      "/images/projects/continuum.fawazbailey.com_ (2).png",
      "/images/projects/continuum.fawazbailey.com_ (3).png",
      "/images/projects/continuum.fawazbailey.com_ (4).png",
      "/images/projects/continuum.fawazbailey.com_ (5).png",
    ],
    pinned: true,
  },
  {
    slug: "shiva",
    title: "Shiva",
    company: "Next.js · TypeScript · AI Design Workspace",
    description:
      "A reference-driven AI design workspace for building interfaces, pages, and design systems with Figma context, project memory, and authenticated account management.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Figma"],
    bgColor: "#f7f7f5",
    liveUrl: "https://shiva.fawazbailey.com/",
    githubUrl: "https://github.com/priest-2105/shiva",
    images: [
      "/images/projects/shiva-1.jpg",
      "/images/projects/shiva-2.jpg",
    ],
    pinned: true,
  },
  {
    slug: "sentra",
    title: "Sentra",
    company: "TypeScript · 2024-2025",
    description:
      "Evaluates how production-ready a software project is by analyzing repo structure, deployment config, and engineering standards.",
    tags: ["TypeScript", "Next.js", "GitHub API"],
    bgColor: "#e8edff",
    liveUrl: "https://sentra.fawazbailey.com",
    githubUrl: "https://github.com/priest-2105/Sentra",
    images: [
      "/images/projects/sentra.fawazbailey.com_.png",
      "/images/projects/sentra.fawazbailey.com_ (1).png",
      "/images/projects/sentra.fawazbailey.com_ (2).png",
      "/images/projects/sentra.fawazbailey.com_ (3).png",
      "/images/projects/sentra.fawazbailey.com_history.png",
      "/images/projects/sentra.fawazbailey.com_ (4).png",
    ],
    pinned: true,
  },
  {
    slug: "veralex",
    title: "VeraLex",
    company: "JavaScript · 2024",
    description:
      "Comprehensive legal case management platform designed to streamline the study and analysis of legal precedents.",
    tags: ["JavaScript", "React", "Next.js"],
    bgColor: "#f5f0ff",
    githubUrl: "https://github.com/priest-2105/VeraLex",
    liveUrl: "https://veralex.fawazbailey.com/",
    images: [
      "/images/projects/veralex-1.jpg",
      "/images/projects/veralex-2.jpg",
      "/images/projects/veralex-3.jpg",
      "/images/projects/veralex-4.jpg",
      "/images/projects/veralex-5.jpg",
      "/images/projects/veralex-6.jpg",
    ],
    pinned: true,
  },
  {
    slug: "read-my-tc",
    title: "Read My T&C",
    company: "JavaScript · 2024",
    description:
      "Full-stack React app that helps users actually understand terms and conditions - AI-powered analysis and plain-language categorization.",
    tags: ["React", "AI", "JavaScript"],
    bgColor: "#f0fdf4",
    githubUrl: "https://github.com/priest-2105/readmytermsandconditions",
    liveUrl: "https://readmytermsandconditions.fawazbailey.com/",
    images: [
      "/images/projects/readmytermsandconditions.fawazbailey.com_.png",
      "/images/projects/readmytermsandconditions.fawazbailey.com_ (1).png",
      "/images/projects/readmytermsandconditions.fawazbailey.com_ (2).png",
      "/images/projects/readmytermsandconditions.fawazbailey.com_ (3).png",
    ],
    pinned: true,
  },
  {
    slug: "medscope",
    title: "Medscope",
    company: "JavaScript · React Native",
    description:
      "Mobile app for drug lookups, symptom checking, and disease research - powered by the U.S. FDA OpenFDA and NIH MedlinePlus APIs.",
    tags: ["React Native", "JavaScript", "FDA API"],
    bgColor: "#f0f9ff",
    githubUrl: "https://github.com/priest-2105/Medscope",
    images: [
      "/images/projects/medscope-1.jpg",
      "/images/projects/medscope-2.jpg",
      "/images/projects/medscope-3.jpg",
    ],
    pinned: true,
  },
  {
    slug: "moodmix",
    title: "MoodMix",
    company: "Next.js · Spotify API",
    description:
      "Generates personalized music playlists based on your current mood. Feelings as a feature, not a bug.",
    tags: ["Next.js", "TypeScript", "Spotify API"],
    bgColor: "#1a1a2e",
    githubUrl: "https://github.com/priest-2105/moodmix-v2",
    images: [
      "/images/projects/moodmix-1.jpg",
      "/images/projects/moodmix-2.jpg",
    ],
    pinned: false,
  },
];

export const PINNED = ALL_PROJECTS.filter((p) => p.pinned);
export const OTHERS = ALL_PROJECTS.filter((p) => !p.pinned);
