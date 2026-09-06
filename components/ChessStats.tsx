"use client";

import { useEffect, useState } from "react";

interface Game {
  opponent: string;
  opponentRating: number;
  myRating: number;
  result: "win" | "loss" | "draw";
  timeClass: string;
  endTime: number;
  url: string;
  playedAs: "white" | "black";
}

interface ChessData {
  ratings: { daily: number | null; rapid: number | null; blitz: number | null };
  games: Game[];
  username: string;
}

const TIME_LABEL: Record<string, string> = {
  daily: "Daily",
  rapid: "Rapid",
  blitz: "Blitz",
};

const RESULT_LABEL: Record<Game["result"], string> = {
  win: "W",
  loss: "L",
  draw: "D",
};

export default function ChessStats() {
  const [data, setData] = useState<ChessData | null>(null);

  useEffect(() => {
    fetch("/api/chess")
      .then((response) => response.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) return null;

  const { ratings, games, username } = data;
  const ratingEntries = Object.entries(ratings).filter(([, value]) => value !== null) as [
    string,
    number
  ][];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {ratingEntries.length > 0 && (
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {ratingEntries.map(([mode, rating]) => (
            <div key={mode} className="stat-tile">
              <span className="stat-label">{TIME_LABEL[mode] ?? mode}</span>
              <span className="stat-value">{rating}</span>
            </div>
          ))}
        </div>
      )}

      {games.length > 0 && (
        <div className="panel">
          <p
            className="stat-label"
            style={{ padding: "13px 14px", borderBottom: "var(--border-w) solid var(--ink)" }}
          >
            Recent games
          </p>

          {games.slice(0, 8).map((game) => (
            <a
              key={game.url}
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              className="data-row"
            >
              <span className={`result-badge result-${game.result}`}>
                {RESULT_LABEL[game.result]}
              </span>

              <span
                className="truncate"
                style={{ fontSize: "14px", color: "var(--ink)", flex: 1, fontWeight: 500 }}
              >
                vs {game.opponent}
              </span>

              <span style={{ fontSize: "13px", color: "var(--ink-mute)", flexShrink: 0 }}>
                {game.opponentRating}
              </span>

              <span className="tag" style={{ flexShrink: 0 }}>
                {TIME_LABEL[game.timeClass] ?? game.timeClass}
              </span>
            </a>
          ))}
        </div>
      )}

      <a
        href={`https://www.chess.com/play/online/new?opponent=${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost"
        style={{ alignSelf: "flex-start" }}
      >
        Challenge me on chess.com ↗
      </a>
    </div>
  );
}
