"use client";

import { useEffect, useState } from "react";

const F = "var(--font-inter), 'Inter', system-ui, -apple-system, sans-serif";

interface Repo {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
  updatedAt: string;
  homepage: string | null;
}

const LANG_COLOR: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python:     "#3572A5",
  Go:         "#00ADD8",
  Rust:       "#dea584",
  Java:       "#b07219",
  CSS:        "#563d7c",
  HTML:       "#e34c26",
  Shell:      "#89e051",
};

export default function GitHubRepos() {
  const [repos, setRepos]       = useState<Repo[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((data) => { setRepos(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ display: "grid", gap: "12px" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: "72px",
              borderRadius: "12px",
              backgroundColor: "#f5f5f5",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        ))}
      </div>
    );
  }

  if (!repos.length) return null;

  return (
    <div style={{ display: "grid", gap: "1px", backgroundColor: "#f0f0f0", borderRadius: "14px", overflow: "hidden" }}>
      {repos.map((repo) => (
        <a
          key={repo.name}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display:         "flex",
            alignItems:      "center",
            gap:             "16px",
            padding:         "16px 20px",
            backgroundColor: "#ffffff",
            textDecoration:  "none",
            transition:      "background-color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fafafa")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
        >
          {/* repo name + description */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize:     "14px",
                fontWeight:   600,
                color:        "#111111",
                fontFamily:   F,
                marginBottom: repo.description ? "3px" : 0,
                overflow:     "hidden",
                textOverflow: "ellipsis",
                whiteSpace:   "nowrap",
              }}
            >
              {repo.name}
            </p>
            {repo.description && (
              <p
                style={{
                  fontSize:     "13px",
                  color:        "#777777",
                  fontFamily:   F,
                  overflow:     "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace:   "nowrap",
                }}
              >
                {repo.description}
              </p>
            )}
          </div>

          {/* meta */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
            {repo.language && (
              <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#777777", fontFamily: F }}>
                <span
                  style={{
                    width:           "10px",
                    height:          "10px",
                    borderRadius:    "50%",
                    backgroundColor: LANG_COLOR[repo.language] ?? "#cccccc",
                    flexShrink:      0,
                  }}
                />
                {repo.language}
              </span>
            )}
            {repo.stars > 0 && (
              <span style={{ fontSize: "12px", color: "#999999", fontFamily: F }}>
                ★ {repo.stars}
              </span>
            )}
            <span style={{ fontSize: "12px", color: "#cccccc", fontFamily: F }}>↗</span>
          </div>
        </a>
      ))}
    </div>
  );
}
