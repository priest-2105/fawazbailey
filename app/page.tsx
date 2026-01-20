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
const now = new Date();
const currentMonth = now.getMonth(); 
const targetMonth = 8;
const monthsRemaining = targetMonth - currentMonth;
const displayMonths = monthsRemaining > 0 ? monthsRemaining : 0;

return (
  <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans text-black">
    <main className="">
      ready in {displayMonths} months. i'm not a designer btw
    </main>
  </div>
);
}
