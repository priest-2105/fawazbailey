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

const F = "var(--font-inter), 'Inter', system-ui, -apple-system, sans-serif";

const TIME_LABEL: Record<string, string> = {
  daily: "Daily",
  rapid: "Rapid",
  blitz: "Blitz",
};

const RESULT_COLOR: Record<string, string> = {
  win:  "#16a34a",
  loss: "#dc2626",
  draw: "#999999",
};

const RESULT_LABEL: Record<string, string> = {
  win:  "W",
  loss: "L",
  draw: "D",
};

export default function ChessStats() {
  const [data, setData] = useState<ChessData | null>(null);

  useEffect(() => {
    fetch("/api/chess")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) return null;

  const { ratings, games, username } = data;
  const ratingEntries = Object.entries(ratings).filter(([, v]) => v !== null) as [string, number][];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* ratings row */}
      {ratingEntries.length > 0 && (
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {ratingEntries.map(([mode, rating]) => (
            <div
              key={mode}
              style={{
                display:         "flex",
                flexDirection:   "column",
                gap:             "2px",
                padding:         "12px 20px",
                borderRadius:    "12px",
                backgroundColor: "#f7f7f7",
                minWidth:        "80px",
                fontFamily:      F,
              }}
            >
              <span style={{ fontSize: "11px", fontWeight: 600, color: "#999999", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {TIME_LABEL[mode] ?? mode}
              </span>
              <span style={{ fontSize: "22px", fontWeight: 700, color: "#111111", lineHeight: 1.2 }}>
                {rating}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* recent games */}
      {games.length > 0 && (
        <div
          style={{
            borderRadius:    "14px",
            backgroundColor: "#f7f7f7",
            overflow:        "hidden",
            fontFamily:      F,
          }}
        >
          <p style={{ fontSize: "11px", fontWeight: 600, color: "#999999", letterSpacing: "0.1em", textTransform: "uppercase", padding: "12px 16px 8px", margin: 0 }}>
            Recent games
          </p>
          {games.slice(0, 8).map((g, i) => (
            <a
              key={i}
              href={g.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:         "flex",
                alignItems:      "center",
                gap:             "12px",
                padding:         "9px 16px",
                textDecoration:  "none",
                borderTop:       i === 0 ? "none" : "1px solid #eeeeee",
                backgroundColor: "transparent",
                transition:      "background-color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {/* result badge */}
              <span
                style={{
                  width:           "22px",
                  height:          "22px",
                  borderRadius:    "6px",
                  backgroundColor: RESULT_COLOR[g.result] + "22",
                  color:           RESULT_COLOR[g.result],
                  fontSize:        "11px",
                  fontWeight:      700,
                  display:         "flex",
                  alignItems:      "center",
                  justifyContent:  "center",
                  flexShrink:      0,
                  fontFamily:      F,
                }}
              >
                {RESULT_LABEL[g.result]}
              </span>

              {/* opponent */}
              <span style={{ fontSize: "14px", color: "#111111", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: F }}>
                vs {g.opponent}
              </span>

              {/* rating */}
              <span style={{ fontSize: "13px", color: "#777777", flexShrink: 0, fontFamily: F }}>
                {g.opponentRating}
              </span>

              {/* time class */}
              <span
                style={{
                  fontSize:        "11px",
                  fontWeight:      500,
                  color:           "#999999",
                  backgroundColor: "#eeeeee",
                  borderRadius:    "4px",
                  padding:         "2px 6px",
                  flexShrink:      0,
                  fontFamily:      F,
                }}
              >
                {TIME_LABEL[g.timeClass] ?? g.timeClass}
              </span>
            </a>
          ))}
        </div>
      )}

      {/* challenge button */}
      <a
        href={`https://www.chess.com/member/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display:         "inline-flex",
          alignItems:      "center",
          gap:             "8px",
          alignSelf:       "flex-start",
          padding:         "11px 20px",
          borderRadius:    "999px",
          border:          "1px solid #dddddd",
          color:           "#111111",
          fontSize:        "14px",
          fontWeight:      500,
          textDecoration:  "none",
          fontFamily:      F,
          transition:      "border-color 0.15s, background-color 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#111111";
          e.currentTarget.style.backgroundColor = "#f7f7f7";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#dddddd";
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        {/* chess.com knight icon */}
        <svg width="16" height="16" viewBox="0 0 45 45" fill="currentColor">
          <g>
            <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" />
            <path d="M24 18c.38 5.1-5.55 4.65-8 6c-3.22 2.85-2.33 7.37-1.5 11c-2.2-.34-4.5-1.08-6-3c-2-2.5-2-5.5-1-8.5c.25-2.25 2-4 3.5-5c2.25-1.6 7.47-1.09 7.5-7.5c.02-2.4-2.43-3.12-3.5-3.5" />
            <path d="M21.5 4.5c-.5 2.5.5 4.5 2.5 6.5c-.15 1.62 1.5 3 1 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </g>
        </svg>
        Challenge me on chess.com
      </a>
    </div>
  );
}
