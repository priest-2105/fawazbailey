import ExperienceItem from "./ExperienceItem";

interface ProjectItemProps {
  name: string;
  role: string;
  duration?: string;
  bullets: string[];
}

/** Same shape as an experience entry without a tech stack, so it defers rather
 *  than keeping a second copy of the same markup in sync. */
export default function ProjectItem({ name, role, duration, bullets }: ProjectItemProps) {
  return (
    <ExperienceItem company={name} role={role} duration={duration ?? ""} bullets={bullets} />
  );
}
