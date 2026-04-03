"use client";

import { useState } from "react";

interface ProjectCardProps {
  title: string;
  company: string;
  description: string;
  tags: string[];
  bgColor?: string;
  href?: string;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ArrowIcon({ rotated }: { rotated: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: rotated ? "rotate(-45deg)" : "rotate(0deg)",
        transition: "transform 0.22s ease",
        display: "block",
      }}
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function ProjectCard({
  title,
  company,
  description,
  tags,
  bgColor = "#f0f0f0",
  href,
  githubUrl,
  liveUrl,
  image,
}: ProjectCardProps) {
  const [cardHovered, setCardHovered] = useState(false);
  const [arrowHovered, setArrowHovered] = useState(false);

  const arrowHref = liveUrl || githubUrl || href;

  const card = (
    <div
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      style={{ cursor: href ? "pointer" : "default" }}
    >
      {/* image area */}
      <div
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          aspectRatio: "16 / 10",
          width: "100%",
          position: "relative",
        }}
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: cardHovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: bgColor,
              transform: cardHovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          />
        )}

        {/* tag pills — bottom-left */}
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

        {/* action buttons — top-right */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            display: "flex",
            gap: "8px",
            zIndex: 1,
          }}
        >
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="View on GitHub"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#111111",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <GitHubIcon />
            </a>
          )}

          {arrowHref && (
            <a
              href={arrowHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => setArrowHovered(true)}
              onMouseLeave={() => setArrowHovered(false)}
              title={liveUrl ? "View live site" : "View on GitHub"}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#111111",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <ArrowIcon rotated={arrowHovered} />
            </a>
          )}
        </div>
      </div>

      {/* text below */}
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
            }}
          >
            {title}
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
      <a href={href} style={{ textDecoration: "none", display: "block" }}>
        {card}
      </a>
    );
  }

  return card;
}
