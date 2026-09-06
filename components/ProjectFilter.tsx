"use client";

import { useState } from "react";
import ProjectRow from "./ProjectRow";
import { KIND_LABEL, type Project, type ProjectKind } from "@/lib/projects";

type Filter = ProjectKind | "all";

const FILTERS: Filter[] = ["all", "own", "client"];

export default function ProjectFilter({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = filter === "all" ? projects : projects.filter((p) => p.kind === filter);

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects"
        style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "32px" }}
      >
        {FILTERS.map((value) => {
          const active = filter === value;
          const count =
            value === "all" ? projects.length : projects.filter((p) => p.kind === value).length;

          return (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              aria-pressed={active}
              className={`btn ${active ? "btn-ink" : "btn-ghost"}`}
              style={{ fontSize: "13px", padding: "9px 18px" }}
            >
              {value === "all" ? "Everything" : KIND_LABEL[value]}
              <span style={{ opacity: 0.55, fontVariantNumeric: "tabular-nums" }}>{count}</span>
            </button>
          );
        })}
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          borderTop: "var(--border-w) solid var(--ink)",
        }}
      >
        {visible.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </ul>
    </>
  );
}
