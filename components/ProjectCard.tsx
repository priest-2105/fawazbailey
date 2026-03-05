"use client";

import { useState } from "react";

interface ProjectCardProps {
  title: string;
  company: string;
  description: string;
  tags: string[];
  bgColor?: string;
  href?: string;
}

export default function ProjectCard({
  title,
  company,
  description,
  tags,
  bgColor = "#f0f0f0",
  href,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  function scaleIn(e: React.MouseEvent<HTMLDivElement>) {
    setHovered(true);
    const img = e.currentTarget.querySelector<HTMLDivElement>(".img-inner");
    if (img) img.style.transform = "scale(1.05)";
  }
  function scaleOut(e: React.MouseEvent<HTMLDivElement>) {
    setHovered(false);
    const img = e.currentTarget.querySelector<HTMLDivElement>(".img-inner");
    if (img) img.style.transform = "scale(1)";
  }

  const card = (
    <div onMouseEnter={scaleIn} onMouseLeave={scaleOut} style={{ cursor: "pointer" }}>
      {/* ── image area ── */}
      <div
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          aspectRatio: "16 / 10",
          width: "100%",
          position: "relative",
        }}
      >
        {/* this inner div is what scales on hover */}
        <div
          className="img-inner"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: bgColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transformOrigin: "center center",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: "rgba(150,150,150,0.5)",
              fontFamily: "monospace",
              letterSpacing: "0.05em",
              userSelect: "none",
            }}
          >
            [ screenshot ]
          </span>
        </div>

        {/* tag pills — bottom-left, like jinyurao */}
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            left: "14px",
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            zIndex: 1,
          }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "12px",
                fontWeight: 500,
                backgroundColor: "rgba(255,255,255,0.92)",
                color: "#111111",
                padding: "5px 12px",
                borderRadius: "999px",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── text below ── */}
      <div style={{ paddingTop: "16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "10px",
            marginBottom: "6px",
          }}
        >
          <h3
            style={{
              fontSize: "17px",
              fontWeight: 600,
              color: "#111111",
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {title}
            <span
              style={{
                fontSize: "15px",
                color: "#aaaaaa",
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translate(0, 0)" : "translate(-4px, 4px)",
                transition: "opacity 0.2s, transform 0.2s",
                display: "inline-block",
              }}
            >
              ↗
            </span>
          </h3>
          <span style={{ fontSize: "14px", color: "#999999", flexShrink: 0 }}>
            {company}
          </span>
        </div>
        <p style={{ fontSize: "15px", color: "#666666", lineHeight: 1.55 }}>
          {description}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
        {card}
      </a>
    );
  }

  return card;
}
