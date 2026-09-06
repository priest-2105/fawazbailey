export type ProjectKind = "own" | "client";

export interface ProjectImage {
  src: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  /** One line. Used on list rows and as page metadata. */
  tagline: string;
  kind: ProjectKind;
  year: string;
  role: string;
  status: "Live" | "In progress" | "Archived";
  stack: string[];
  tags: string[];
  /** The four narrative panels on the detail page. */
  problem: string;
  decision: string;
  tradeoff: string;
  outcome: string;
  bgColor: string;
  githubUrl?: string;
  liveUrl?: string;
  images: ProjectImage[];
  pinned: boolean;
}

// NOTE: problem/decision/tradeoff/outcome are drafts written from the repos and
// the live sites. Rewrite them in your own voice — the tradeoffs especially.
//
// TODO(fawaz): things I had to guess or couldn't find —
//   · leads-crm has no name, URL, or screenshots. Name it.
//   · m365connect stack is fingerprinted from the live site (WordPress/Superio/
//     Manatal). Correct it if you built more than the marketing front.
//   · augusta-newham frontend framework is inferred from Vercel hosting.
//   · clayface, medscope, moodmix reference screenshots that don't exist on
//     disk — images left empty until you add them.

export const ALL_PROJECTS: Project[] = [
  {
    slug: "blick",
    title: "Blick",
    tagline: "Browse 11,000+ icons, animate them on a timeline, export them as anything.",
    kind: "own",
    year: "2026 — present",
    role: "Solo build",
    status: "Live",
    stack: ["Next.js", "TypeScript", "SVG", "Canvas"],
    tags: ["Next.js", "TypeScript", "Vector SVG", "Design System"],
    problem:
      "Animated icons take three tools to make. You find the icon in one place, animate it in After Effects or by hand-editing SVG paths, then fight to get an export a codebase can actually import. Most people give up at step two and ship something static.",
    decision:
      "Put the whole chain in one browser tab. Search across six icon libraries at once, sequence animations on a visual timeline, and export directly to the format you need — animated SVG, React component, GIF, MP4, WebM. No install, no account to try it.",
    tradeoff:
      "Encoding video in the browser is slower and more memory-hungry than a server render pipeline would be, and it caps how long an export can run. I took that hit deliberately: nothing uploads, nothing queues, and there's no signup wall between you and a working export. Cloud saving is opt-in for people who want it, not the price of entry.",
    outcome:
      "A working tool with 11,000+ icons from Lucide, Tabler, Phosphor, Heroicons, Iconoir and Remix, plus SVG upload for your own. Six animation primitives — draw-on, fade, pop, spin, stagger, pulse — compose into multi-step sequences you preview live.",
    bgColor: "#1f1f1f",
    githubUrl: "https://github.com/priest-2105/blick",
    liveUrl: "https://blick.fawazbailey.com/",
    images: [
      { src: "/images/projects/blick.fawazbailey.com.png" },
      { src: "/images/projects/blick.fawazbailey.com2.png" },
      { src: "/images/projects/blick.fawazbailey.com3.png" },
      { src: "/images/projects/blick.fawazbailey.com4.png" },
      { src: "/images/projects/blick.fawazbailey.com5.png" },
      { src: "/images/projects/blick.fawazbailey.com6.png" },
    ],
    pinned: true,
  },
  {
    slug: "continuum",
    title: "Continuum",
    tagline: "An archive of software postmortems, preserved exactly as published.",
    kind: "own",
    year: "2026 — present",
    role: "Solo build",
    status: "Live",
    stack: ["Next.js", "TypeScript", "Vector Search", "GitHub Actions"],
    tags: ["TypeScript", "AI", "Vector Search", "GitHub Actions"],
    problem:
      "Postmortems are the most honest writing our industry produces — engineers explaining, in detail, how their systems actually failed. And they rot. Blogs get redesigned, companies get acquired, links die. The institutional memory of how software breaks is scattered across dead URLs.",
    decision:
      "Preserve them whole. Not summarized, not bulleted — the original narrative as the author wrote it, because the reasoning is the value. Vector search over the full text so you can find incidents by failure mode rather than by remembering which company had the outage.",
    tradeoff:
      "Keeping full original text instead of summaries makes the corpus large and makes search harder to tune — a summary index would have been smaller, faster, and cheaper to run. It would also have thrown away the thing worth archiving. Cost and complexity were the right thing to spend here.",
    outcome:
      "A searchable archive that grows without manual curation — GitHub Actions handle ingestion and indexing on a schedule, so adding sources is a config change rather than an afternoon.",
    bgColor: "#111111",
    githubUrl: "https://github.com/priest-2105/Continuum",
    liveUrl: "https://continuum.fawazbailey.com/",
    images: [
      { src: "/images/projects/continuum.fawazbailey.com_.png" },
      { src: "/images/projects/continuum.fawazbailey.com_ (1).png" },
      { src: "/images/projects/continuum.fawazbailey.com_ (2).png" },
      { src: "/images/projects/continuum.fawazbailey.com_ (3).png" },
      { src: "/images/projects/continuum.fawazbailey.com_ (4).png" },
      { src: "/images/projects/continuum.fawazbailey.com_ (5).png" },
    ],
    pinned: true,
  },
  {
    slug: "clayface",
    title: "Clayface",
    tagline: "An AI design workspace that starts from your references, not a blank slate.",
    kind: "own",
    year: "2025 — present",
    role: "Solo build",
    status: "Live",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Figma"],
    problem:
      "AI design tools generate from nothing. Every prompt starts cold, so the output drifts away from whatever design system you already have — and you spend more time correcting house style than you saved generating.",
    decision:
      "Make references the primary input rather than an afterthought. Pull Figma context in directly, and give each project persistent memory so the workspace accumulates an understanding of your system instead of forgetting it between prompts.",
    tradeoff:
      "It needs setup before it's useful. You have to connect Figma and seed context, which makes the first run slower than typing into an empty prompt box. Every run after that is better — but it's a real cost, and it means the tool is wrong for one-off exploration.",
    outcome:
      "A workspace for building interfaces, pages, and design systems with project memory and authenticated account management, so context survives across sessions.",
    bgColor: "#f7f7f5",
    liveUrl: "https://shiva.fawazbailey.com/",
    githubUrl: "https://github.com/priest-2105/shiva",
    images: [],
    pinned: true,
  },
  {
    slug: "augusta-newham",
    title: "Augusta Newham",
    tagline: "Headless Shopify storefront for an inclusive shapewear label.",
    kind: "client",
    year: "2025",
    role: "Frontend engineer",
    status: "Live",
    stack: ["Next.js", "TypeScript", "Shopify Storefront API", "Vercel"],
    tags: ["Shopify", "Headless", "Next.js", "E-commerce"],
    problem:
      "Shopify's hosted themes are quick to launch and hard to escape. Augusta Newham's entire pitch is range — XXS through 8XL, shades for every skin tone — and range is exactly what a stock theme's product templates and filtering handle worst. The brand's differentiator was being flattened by the storefront presenting it.",
    decision:
      "Split the stack. Shopify keeps catalog, inventory, orders and checkout; the storefront gets rebuilt as a custom frontend against the Storefront API. Payments stay Shopify's problem — everything the customer actually browses becomes ours to shape.",
    tradeoff:
      "Going headless means giving up the theme editor. Nobody client-side can restyle a section without a deploy, and every app in the Shopify ecosystem that assumed Liquid templates had to be replaced or rebuilt. That's a real ongoing cost, and it's only worth paying for a brand whose whole value lives in how the range is presented.",
    outcome:
      "A live storefront with collection pages, a size guide, and newsletter capture, running on Vercel with Shopify handling commerce underneath.",
    bgColor: "#f4efe9",
    liveUrl: "https://augustanewham.com",
    images: [],
    pinned: true,
  },
  {
    slug: "m365connect",
    title: "M365Connect",
    tagline: "A two-sided recruitment marketplace for the Microsoft ecosystem.",
    kind: "client",
    year: "2025",
    role: "Web engineer",
    status: "Live",
    stack: ["WordPress", "PHP", "WooCommerce", "Manatal ATS"],
    tags: ["WordPress", "Recruitment", "Integration"],
    problem:
      "General job boards match on keywords, so a Microsoft 365 specialist and the recruiter hunting for one both end up wading through listings meant for neither. The niche is deep enough to justify its own market and small enough that the big boards will never serve it properly.",
    decision:
      "Build narrow on purpose, and don't rebuild what already exists. Two distinct paths — one for recruiters posting roles, one for professionals seeking positions and projects — rather than a single generic feed. Applicant tracking is integrated from an existing ATS rather than written from scratch.",
    tradeoff:
      "Leaning on WordPress and an off-the-shelf ATS meant launching in a fraction of the time a custom platform would have taken, at the cost of being boxed in by both. Matching logic in particular is only as good as what the integration exposes. For validating a niche marketplace, shipping early beat owning the stack.",
    outcome:
      "A live marketplace connecting Microsoft specialists with recruiters, with separate journeys for each side and job data flowing in from the ATS.",
    bgColor: "#eaf1fb",
    liveUrl: "https://m365connect.com",
    images: [],
    pinned: true,
  },
  {
    slug: "leads-crm",
    title: "Lead & Pipeline CRM",
    tagline: "Lead capture, pipeline, email and site content in one internal dashboard.",
    kind: "client",
    year: "2025",
    role: "Full-stack engineer",
    status: "Live",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    tags: ["CRM", "Dashboard", "CMS", "Email"],
    problem:
      "The business was running on a spreadsheet of leads, a shared inbox, and a separate CMS for the website. The current state of any given lead depended entirely on who you asked, and follow-ups fell through the gaps between the three.",
    decision:
      "Collapse it into one dashboard. Leads arrive, get assigned, and move through stages in the same place the outreach email is written, sent, and logged against them. Site content management lives there too, so marketing isn't a fourth tool.",
    tradeoff:
      "Bundling CRM, email and CMS into a single internal tool means it fits this business precisely and would need substantial work to fit anyone else. I chose depth for one client over something that generalizes — which is right for contract work and would be wrong for a product.",
    outcome:
      "An internal dashboard that gathers and manages inbound leads, handles email correspondence against each record, and manages site content from the same login.",
    bgColor: "#eef3ef",
    images: [],
    pinned: false,
  },
  {
    slug: "sentra",
    title: "Sentra",
    tagline: "Scores how production-ready a repo actually is, and shows its work.",
    kind: "own",
    year: "2024 — 2025",
    role: "Solo build",
    status: "Live",
    stack: ["Next.js", "TypeScript", "GitHub API"],
    tags: ["TypeScript", "Next.js", "GitHub API"],
    problem:
      "\"Is this ready to ship?\" gets answered by vibes, or by a senior engineer spending an afternoon reading a repo. Neither scales, and neither leaves a record you can compare against next month.",
    decision:
      "Make it mechanical. Analyze repo structure, deployment configuration, and engineering standards through the GitHub API, and produce a score with the reasoning attached rather than a bare number.",
    tradeoff:
      "Any score invites gaming, and this one can't see whether the code is good — only whether the scaffolding around it exists. A repo can pass with tests that assert nothing. I kept every check and its reasoning visible so it reads as a checklist to work through, not a verdict to trust.",
    outcome:
      "Point it at a repo and get a readable readiness breakdown, with history tracking so you can watch a project's score move as you fix what it flagged.",
    bgColor: "#e8edff",
    liveUrl: "https://sentra.fawazbailey.com",
    githubUrl: "https://github.com/priest-2105/Sentra",
    images: [
      { src: "/images/projects/sentra.fawazbailey.com_.png" },
      { src: "/images/projects/sentra.fawazbailey.com_ (1).png" },
      { src: "/images/projects/sentra.fawazbailey.com_ (2).png" },
      { src: "/images/projects/sentra.fawazbailey.com_ (3).png" },
      { src: "/images/projects/sentra.fawazbailey.com_history.png" },
      { src: "/images/projects/sentra.fawazbailey.com_ (4).png" },
    ],
    pinned: true,
  },
  {
    slug: "moodmix",
    title: "MoodMix",
    tagline: "Playlists generated from how you're feeling, not what you last played.",
    kind: "own",
    year: "2024",
    role: "Solo build",
    status: "Archived",
    stack: ["Next.js", "TypeScript", "Spotify API"],
    tags: ["Next.js", "TypeScript", "Spotify API"],
    problem:
      "Recommendation engines optimize for what you've already listened to, which is great for finding more of the same and useless when your mood doesn't match your history.",
    decision:
      "Take mood as the explicit input instead of inferring it from listening data, and build playlists against Spotify's audio features — valence, energy, tempo — rather than genre similarity.",
    tradeoff:
      "Asking people to name their mood is friction, and self-reported mood is a blunt instrument. Inferring it would have been smoother and less accurate; making it explicit at least means a wrong result is correctable.",
    outcome:
      "A working generator that turns a stated mood into a Spotify playlist. Feelings as a feature, not a bug.",
    bgColor: "#1a1a2e",
    githubUrl: "https://github.com/priest-2105/moodmix-v2",
    images: [],
    pinned: true,
  },
  {
    slug: "veralex",
    title: "VeraLex",
    tagline: "Case management built around how precedent actually connects.",
    kind: "own",
    year: "2024",
    role: "Solo build",
    status: "Live",
    stack: ["React", "Next.js", "JavaScript"],
    tags: ["JavaScript", "React", "Next.js"],
    problem:
      "Studying legal precedent means holding dozens of cases in your head at once and manually tracing how one ruling cites, distinguishes, or overturns another. Document folders don't model any of that — they just store files.",
    decision:
      "Treat cases as connected records rather than documents. Model the relationships between rulings as first-class data so the citation structure is something you can navigate, not something you reconstruct from notes each time.",
    tradeoff:
      "Structured records mean every case needs real data entry before the tool pays off — you can't just dump PDFs into it. That's a steep on-ramp compared to search-over-documents, and it's the main reason this suits sustained study rather than a quick lookup.",
    outcome:
      "A working platform for studying and analyzing precedent, with the relationships between cases as the primary interface.",
    bgColor: "#f5f0ff",
    githubUrl: "https://github.com/priest-2105/VeraLex",
    liveUrl: "https://veralex.fawazbailey.com/",
    images: [
      { src: "/images/projects/veralex-1.jpg" },
      { src: "/images/projects/veralex-2.jpg" },
      { src: "/images/projects/veralex-3.jpg" },
      { src: "/images/projects/veralex-4.jpg" },
      { src: "/images/projects/veralex-5.jpg" },
      { src: "/images/projects/veralex-6.jpg" },
    ],
    pinned: false,
  },
  {
    slug: "medscope",
    title: "Medscope",
    tagline: "Drug and symptom lookup built only on FDA and NIH data.",
    kind: "own",
    year: "2024",
    role: "Solo build",
    status: "Archived",
    stack: ["React Native", "JavaScript", "OpenFDA", "MedlinePlus"],
    tags: ["React Native", "JavaScript", "FDA API"],
    problem:
      "Looking up a drug or a symptom online gets you either clinical documentation written for practitioners or SEO content farms optimized for ad revenue. Neither is what you want at 2am with a pill bottle in your hand.",
    decision:
      "Build on authoritative sources only — the FDA's OpenFDA and the NIH's MedlinePlus — and do no interpretation on top of them. Surface the official record, formatted to actually be readable on a phone.",
    tradeoff:
      "Refusing to interpret means the app can't answer the question people actually have, which is \"should I take this?\" It gives you the record and stops. For anything touching medical information that's the correct limit, even though it makes the product less satisfying to use.",
    outcome:
      "A React Native app for drug lookups, symptom checking, and disease research, sourced entirely from public health APIs.",
    bgColor: "#f0f9ff",
    githubUrl: "https://github.com/priest-2105/Medscope",
    images: [],
    pinned: false,
  },
];

export const PINNED = ALL_PROJECTS.filter((p) => p.pinned);
export const OTHERS = ALL_PROJECTS.filter((p) => !p.pinned);

export const KIND_LABEL: Record<ProjectKind, string> = {
  own: "Own Work",
  client: "Client Work",
};
