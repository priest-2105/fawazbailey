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
    <div className="min-h-screen bg-paper py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-3xl mx-auto bg-white border border-form-border shadow-sm p-8 sm:p-12 relative overflow-hidden">
        {/* Decorative form artifacts */}
        <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none select-none">
          <div className="text-[120px] font-bold leading-none -mr-8 -mt-8">26</div>
        </div>

        <Header />

        {/* 1. ABOUT SECTION */}
        <FormSection title="01. About (Profile Summary)" icon={User}>
          <p className="text-sm leading-relaxed text-zinc-800 font-medium">
            Computer Science student at the National Open University of Nigeria with hands-on
            experience building production web applications. Strong focus on frontend architecture,
            performance, and collaboration with backend teams. Comfortable adapting quickly
            in fast-moving, real-world environments.
          </p>
        </FormSection>

        {/* 2. EXPERIENCE SECTION */}
        <FormSection title="02. Professional Experience" icon={Briefcase}>
          <ExperienceItem
            company="Uniskills"
            role="Frontend Engineer"
            duration="10/2022 – Present"
            technologies={["Next.js", "TypeScript", "NestJS", "PostgreSQL"]}
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
            duration="11/2021 – 05/2022"
            technologies={["HTML", "CSS", "JavaScript", "React", "PHP"]}
            bullets={[
              "Built responsive web pages using HTML5 and CSS3.",
              "Advanced to JavaScript and React for interactive features.",
              "Used jQuery and Lodash to streamline UI interactions.",
              "Collaborated via Jira and Trello and managed code with Git and GitHub."
            ]}
          />
        </FormSection>

        {/* 3. PROJECTS SECTION */}
        <FormSection title="03. Selected Projects" icon={Rocket}>
          <ProjectItem
            name="Cardinal E-School"
            role="Software Engineer"
            duration="11/2024 – 03/2025"
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
            duration="10/2024 – 03/2025"
            bullets={[
              "Built a condition-based event calendar using Next.js and TypeScript.",
              "Implemented authentication and data management with Supabase and PostgreSQL.",
              "Designed interactive calendar navigation inspired by Google Calendar.",
              "Delivered a responsive and accessible UI with Tailwind CSS."
            ]}
          />
        </FormSection>

        {/* 4. ACHIEVEMENTS SECTION */}
        <FormSection title="04. Key Achievements" icon={Trophy}>
          <ul className="text-sm space-y-2 list-none font-mono uppercase tracking-tight text-zinc-700">
            <li className="flex gap-3">
              <span className="text-zinc-300 font-bold">[SHIPPED]</span>
              <span>Led frontend strategy for 2 commercial platforms with 99.9% uptime.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-zinc-300 font-bold">[OPTIMIZED]</span>
              <span>Reduced initial load time by 40% via Next.js server-side optimizations.</span>
            </li>
          </ul>
        </FormSection>

        {/* 5. EDUCATION SECTION */}
        <FormSection title="05. Education" icon={GraduationCap}>
          <div className="flex justify-between items-baseline mb-2">
            <div>
              <h3 className="font-bold text-lg uppercase tracking-tight">National Open University of Nigeria</h3>
              <p className="text-sm italic">BSc Computer Science</p>
            </div>
            <span className="text-xs font-mono text-zinc-500">Exp. 2026</span>
          </div>
          <p className="text-xs text-zinc-500 uppercase tracking-widest leading-loose">
            Relevant Coursework: Software Engineering, Algorithms & Data Structures, Systems Design, Data-Driven Computing
          </p>
        </FormSection>

        {/* 6. SKILLS SECTION */}
        <FormSection title="06. Technical Skills" icon={Wrench}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono uppercase">
            <div className="border border-dashed p-3">
              <span className="block mb-2 text-zinc-400 font-bold border-b border-dashed">Frontend</span>
              <p>HTML5 / CSS3 / JavaScript / TypeScript / React / Next.js / Vue</p>
            </div>
            <div className="border border-dashed p-3">
              <span className="block mb-2 text-zinc-400 font-bold border-b border-dashed">Databases</span>
              <p>PostgreSQL / MySQL / MongoDB</p>
            </div>
            <div className="border border-dashed p-3">
              <span className="block mb-2 text-zinc-400 font-bold border-b border-dashed">CMS</span>
              <p>Shopify / WordPress / Framer</p>
            </div>
            <div className="border border-dashed p-3">
              <span className="block mb-2 text-zinc-400 font-bold border-b border-dashed">Tools</span>
              <p>Git / GitHub / Figma / Notion</p>
            </div>
          </div>
        </FormSection>

        {/* FOOTER - Signature Feel */}
        <footer className="mt-16 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-end text-[10px] font-mono uppercase text-zinc-400">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Clock size={10} />
              <DateTime />
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={10} />
              <span>Lagos, NG (6.5244° N, 3.3792° E)</span>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <p>Verification Seal: #FB-2026-PORTFOLIO-VALID</p>
            <p>Last Evaluated: <DateTime /></p>
          </div>
        </footer>
      </main>
    </div>
  );
}
