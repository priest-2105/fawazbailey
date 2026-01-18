import Link from "next/link";
import {
  User,
  Briefcase,
  Rocket,
  GraduationCap,
  Wrench,
  Trophy,
  MapPin,
  Clock
} from "lucide-react";
import Header from "@/components/Header";
import FormSection from "@/components/FormSection";
import ExperienceItem from "@/components/ExperienceItem";
import ProjectItem from "@/components/ProjectItem";
import DateTime from "@/components/DateTime";

export default function Home() {
  return (
    <div className="min-h-screen bg-paper py-20 px-4 sm:px-6 lg:px-8">
      <main className="max-w-[75ch] mx-auto bg-white border border-form-border shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-10 sm:p-16 relative overflow-hidden">
        {/* Decorative form artifacts */}
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none select-none">
          <div className="text-[140px] font-bold leading-none -mr-10 -mt-10">26</div>
        </div>

        <Header />

        {/* 1. ABOUT SECTION */}
        <FormSection title="01. Profile & Intent" icon={User}>
          <p className="text-sm leading-relaxed text-ink-secondary font-normal">
           I’m a Computer Science student at the National Open University of Nigeria. I’ve always been a computer person, growing up around them made technology feel like a part of me. I learn best by breaking things and rebuilding them, which is why I enjoy working on real projects instead of staying only in theory. Recently, I’ve been especially interested in UI and structure, how things look, feel, and make sense to the user. Outside of coding, I enjoy chess, cooking, cycling, going to the gym, and spending time outdoors. I’m observant by nature, and I value calm, logical environments where people are open and willing to listen. Long term, I care more about mastery than speed. I want my work to allow creativity, and I want to be trusted as someone who listens carefully before building.
          </p>
        </FormSection>

        {/* 2. EXPERIENCE SECTION */}
        <FormSection title="02. Professional Experience" icon={Briefcase}>
          <ExperienceItem
            company="Always49"
            role="Design Engineer"
            duration="Oct 2025 – Present"
            technologies={["Next.js", "Laravel", "UI/UX Design", "Javascript", "React"]}
            bullets={[
              "Spearheaded UI/UX design and successfully integrated designs into the development dashboard.",
              "Engineered the integration of Laravel backends with Next.js frontend architectures.",
              "Focused on creating seamless, high-performance user interfaces and responsive systems."
            ]}
          />
          <ExperienceItem
            company="Uniskills"
            role="Frontend Engineer"
            duration="Oct 2022 – Sept 2025"
            technologies={["Next.js", "TypeScript", "NestJS", "PostgreSQL", "React"]}
            bullets={[
              "Developed and maintained the frontend of an education platform.",
              "Built a real-time chat system using React, WebSockets, and styled components.",
              "Led the migration from Laravel to Next.js, improving performance and UX.",
              "Collaborated closely with backend engineers to integrate REST APIs."
            ]}
          />
          <ExperienceItem
            company="Techend"
            role="Web Developer"
            duration="2021 – 2022"
            technologies={["React", "JavaScript", "PHP", "MYSQL"]}
            bullets={[
              "Built responsive web pages using HTML5 and CSS3.",
              "Advanced to JavaScript and React for interactive features.",
              "Used jQuery and Lodash to streamline UI interactions.",
              "Collaborated via Jira and Trello and managed code with Git and GitHub."
            ]}
          />
        </FormSection>

        {/* 3. PROJECTS SECTION */}
        <FormSection title="03. Selected Systems" icon={Rocket}>
          <ProjectItem
            name="Cardinal E-School"
            role="Software Engineer"
            duration="2024 – 2025"
            bullets={[
              "Co-built an educational platform for students, tutors, and administrators.",
              "Developed the frontend using Next.js and Tailwind CSS.",
              "Integrated with a Laravel backend and MySQL database.",
              "Worked in an Agile environment with iterative testing and deployment."
            ]}
          />
          <ProjectItem
            name="Split"
            role="Web Developer"
            duration="2024 – 2025"
            bullets={[
              "Built a condition-based event calendar using Next.js and TypeScript.",
              "Implemented authentication and data management with Supabase and PostgreSQL.",
              "Designed interactive calendar navigation inspired by Google Calendar.",
              "Delivered a responsive and accessible UI with Tailwind CSS."
            ]}
          />
        </FormSection>

        {/* 4. ACHIEVEMENTS SECTION */}
        <FormSection title="04. Verified Achievements" icon={Trophy}>
          <ul className="text-sm space-y-4 list-none text-ink-secondary">
            <li className="flex gap-4 items-start">
              <span className="text-[10px] font-mono text-ink-muted uppercase pt-1 shrink-0">[SHIPPED]</span>
              <span className="leading-relaxed">Led frontend strategy for 2 commercial platforms with 99.9% uptime.</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-[10px] font-mono text-ink-muted uppercase pt-1 shrink-0">[OPTIMIZED]</span>
              <span className="leading-relaxed">Reduced initial load time by 40% via Next.js server-side optimizations.</span>
            </li>
          </ul>
        </FormSection>

        {/* 5. EDUCATION SECTION */}
        <FormSection title="05. Education" icon={GraduationCap}>
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="text-sm font-semibold tracking-tight text-ink-primary uppercase">National Open University of Nigeria</h3>
            <span className="text-[10px] font-mono text-ink-muted uppercase">Exp. 2026</span>
          </div>
          <p className="text-xs text-ink-secondary italic mb-3">BSc Computer Science</p>
          <p className="text-[10px] text-ink-muted uppercase tracking-wider leading-relaxed">
            Curriculum: Software Engineering, Algorithms & Data Structures, Systems Design, Data-Driven Computing
          </p>
        </FormSection>

        {/* 6. SKILLS SECTION */}
        <FormSection title="06. Technical Capabilities" icon={Wrench}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 text-[11px] font-medium uppercase tracking-wider text-ink-secondary">
            <div className="border-l border-zinc-100 pl-4 py-1">
              <span className="block mb-2 text-ink-muted font-semibold text-[9px]">Frontend Architecture</span>
              <p className="leading-relaxed">HTML5 / CSS3 / JavaScript / TypeScript / React / Next.js / Vue</p>
            </div>
            <div className="border-l border-zinc-100 pl-4 py-1">
              <span className="block mb-2 text-ink-muted font-semibold text-[9px]">Design Systems & UI/UX</span>
              <p className="leading-relaxed">Design Systems / UI/UX Design / UX Research / Figma</p>
            </div>
            <div className="border-l border-zinc-100 pl-4 py-1">
              <span className="block mb-2 text-ink-muted font-semibold text-[9px]">Data Systems</span>
              <p className="leading-relaxed">PostgreSQL / MySQL / MongoDB / Supabase</p>
            </div>
            <div className="border-l border-zinc-100 pl-4 py-1">
              <span className="block mb-2 text-ink-muted font-semibold text-[9px]">Engineering Tools</span>
              <p className="leading-relaxed">Git / GitHub / Notion / Jira / Framer</p>
            </div>
          </div>
        </FormSection>

        {/* FOOTER - Subtle & Official */}
        <footer className="mt-20 pt-10 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-end text-[9px] font-mono uppercase text-ink-muted opacity-70">
          <div className="flex flex-col gap-1.5 underline-offset-4">
            <div className="flex items-center gap-2">
              <Clock size={10} strokeWidth={1.5} />
              <DateTime />
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={10} strokeWidth={1.5} />
              <span>Lagos, NG / 6.5244° N, 3.3792° E</span>
            </div>
          </div>
          <div className="mt-6 sm:mt-0 text-right leading-relaxed">
            <p>Auth: #FB-2026-PORTFOLIO-VALID</p>
            <p className="flex items-center justify-end gap-1">
              Last Updated: 18 Jan 2026 <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></span>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
