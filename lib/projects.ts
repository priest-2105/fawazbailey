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
    slug: "continuum",
    title: "Continuum",
    company: "TypeScript · 2024–Present",
    description: "Centralized web-based archive of original software postmortems from major tech companies — preserved exactly as published, narrative and all.",
    tags: ["TypeScript", "AI", "Vector Search", "Github Actions"],
    bgColor: "#111111",
    githubUrl: "https://github.com/priest-2105/Continuum",
    images: [
      "/images/projects/continuum.fawazbailey.com_.png",
      "/images/projects/continuum.fawazbailey.com_ (1).png",
      "/images/projects/continuum.fawazbailey.com_ (2).png",
    ],
    pinned: true,
  },
  {
    slug: "sentra",
    title: "Sentra",
    company: "TypeScript · 2024–2025",
    description: "Evaluates how production-ready a software project is by analyzing repo structure, deployment config, and engineering standards.",
    tags: ["TypeScript", "Next.js", "GitHub API"],
    bgColor: "#e8edff",
    githubUrl: "https://github.com/priest-2105/Sentra",
    images: [
      "/images/projects/sentra-1.jpg",
      "/images/projects/sentra-2.jpg",
      "/images/projects/sentra-3.jpg",
    ],
    pinned: true,
  },
  {
    slug: "veralex",
    title: "VeraLex",
    company: "JavaScript · 2024",
    description: "Comprehensive legal case management platform designed to streamline the study and analysis of legal precedents.",
    tags: ["JavaScript", "React", "Next.js"],
    bgColor: "#f5f0ff",
    githubUrl: "https://github.com/priest-2105/VeraLex",
    images: [
      "/images/projects/veralex-1.jpg",
      "/images/projects/veralex-2.jpg",
      "/images/projects/veralex-3.jpg",
    ],
    pinned: true,
  },
  {
    slug: "read-my-tc",
    title: "Read My T&C",
    company: "JavaScript · 2024",
    description: "Full-stack React app that helps users actually understand terms and conditions — AI-powered analysis and plain-language categorization.",
    tags: ["React", "AI", "JavaScript"],
    bgColor: "#f0fdf4",
    githubUrl: "https://github.com/priest-2105/readmytermsandconditions",
    images: [
      "/images/projects/readmytc-1.jpg",
      "/images/projects/readmytc-2.jpg",
      "/images/projects/readmytc-3.jpg",
    ],
    pinned: true,
  },
  {
    slug: "medscope",
    title: "Medscope",
    company: "JavaScript · React Native",
    description: "Mobile app for drug lookups, symptom checking, and disease research — powered by the U.S. FDA OpenFDA and NIH MedlinePlus APIs.",
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
    description: "Generates personalized music playlists based on your current mood. Feelings as a feature, not a bug.",
    tags: ["Next.js", "TypeScript", "Spotify API"],
    bgColor: "#1a1a2e",
    githubUrl: "https://github.com/priest-2105/moodmix-v2",
    images: [
      "/images/projects/moodmix-1.jpg",
      "/images/projects/moodmix-2.jpg",
    ],
    pinned: false,
  },
  {
    slug: "shiva",
    title: "Shiva",
    company: "JavaScript · Website Builder",
    description: "A website builder that uses design systems — because not everyone wants to wrestle with code to make something that looks decent.",
    tags: ["JavaScript", "Design Systems"],
    bgColor: "#fafafa",
    githubUrl: "https://github.com/priest-2105/shiva",
    images: [
      "/images/projects/shiva-1.jpg",
      "/images/projects/shiva-2.jpg",
    ],
    pinned: false,
  },

];

export const PINNED = ALL_PROJECTS.filter((p) => p.pinned);
export const OTHERS = ALL_PROJECTS.filter((p) => !p.pinned);
