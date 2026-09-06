"use client";

import { useEffect, useState } from "react";

interface Repo {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
  updatedAt: string;
  homepage: string | null;
}

export default function GitHubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((response) => response.json())
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="panel">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="data-row"
            style={{ height: "58px", animation: "pulse 1.5s ease-in-out infinite" }}
          >
            <span style={{ width: "40%", height: "12px", backgroundColor: "var(--wash)" }} />
          </div>
        ))}
      </div>
    );
  }

  if (repos.length === 0) return null;

  return (
    <div className="panel">
      <p
        className="stat-label"
        style={{ padding: "13px 14px", borderBottom: "var(--border-w) solid var(--ink)" }}
      >
        Recent repositories
      </p>

      {repos.map((repo) => (
        <a
          key={repo.name}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="data-row"
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              className="truncate"
              style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)" }}
            >
              {repo.name}
            </p>
            {repo.description && (
              <p
                className="truncate"
                style={{ fontSize: "13px", color: "var(--ink-soft)", marginTop: "2px" }}
              >
                {repo.description}
              </p>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            {repo.language && <span className="tag">{repo.language}</span>}
            {repo.stars > 0 && (
              <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink-mute)" }}>
                ★ {repo.stars}
              </span>
            )}
            <span style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 700 }}>↗</span>
          </div>
        </a>
      ))}
    </div>
  );
}
