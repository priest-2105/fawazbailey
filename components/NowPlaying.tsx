"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Track {
  isPlaying: boolean;
  title?:    string;
  artist?:   string;
  album?:    string;
  albumArt?: string;
  songUrl?:  string;
}

const F = "var(--font-inter), 'Inter', system-ui, -apple-system, sans-serif";

export default function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    async function fetch_() {
      try {
        const res  = await fetch("/api/spotify");
        const data = await res.json();
        setTrack(data);
      } catch {
        setTrack({ isPlaying: false });
      }
    }

    fetch_();
    const id = setInterval(fetch_, 30_000); // refresh every 30s
    return () => clearInterval(id);
  }, []);

  if (!track) return null;

  return (
    <a
      href={track.songUrl ?? "https://open.spotify.com"}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        gap:            "14px",
        padding:        "14px 18px",
        borderRadius:   "14px",
        backgroundColor: "#f7f7f7",
        textDecoration: "none",
        maxWidth:       "380px",
        width:          "100%",
        transition:     "background-color 0.2s",
        fontFamily:     F,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f7f7f7")}
    >
      {/* album art */}
      <div
        style={{
          width:        "48px",
          height:       "48px",
          borderRadius: "8px",
          overflow:     "hidden",
          flexShrink:   0,
          backgroundColor: "#e0e0e0",
          position:     "relative",
        }}
      >
        {track.albumArt && (
          <Image
            src={track.albumArt}
            alt={track.album ?? "Album art"}
            fill
            style={{ objectFit: "cover" }}
          />
        )}
      </div>

      {/* text */}
      <div style={{ minWidth: 0 }}>
        {/* spotify green dot + label */}
        <div
          style={{
            display:     "flex",
            alignItems:  "center",
            gap:         "6px",
            marginBottom: "3px",
          }}
        >
          <span
            style={{
              width:           "7px",
              height:          "7px",
              borderRadius:    "50%",
              backgroundColor: track.isPlaying ? "#1DB954" : "#999999",
              flexShrink:      0,
              animation:       track.isPlaying ? "pulse 2s infinite" : "none",
            }}
          />
          <span
            style={{
              fontSize:      "11px",
              fontWeight:    600,
              color:         "#999999",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily:    F,
            }}
          >
            {track.isPlaying ? "Now playing" : "Last played"}
          </span>
        </div>

        {track.title ? (
          <>
            <p
              style={{
                fontSize:     "14px",
                fontWeight:   600,
                color:        "#111111",
                margin:       0,
                overflow:     "hidden",
                textOverflow: "ellipsis",
                whiteSpace:   "nowrap",
                fontFamily:   F,
              }}
            >
              {track.title}
            </p>
            <p
              style={{
                fontSize:     "13px",
                color:        "#777777",
                margin:       0,
                overflow:     "hidden",
                textOverflow: "ellipsis",
                whiteSpace:   "nowrap",
                fontFamily:   F,
              }}
            >
              {track.artist}
            </p>
          </>
        ) : (
          <p style={{ fontSize: "14px", color: "#999999", margin: 0, fontFamily: F }}>
            Nothing playing right now
          </p>
        )}
      </div>

      {/* spotify logo mark */}
      <svg
        style={{ marginLeft: "auto", flexShrink: 0 }}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="#1DB954"
      >
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    </a>
  );
}
