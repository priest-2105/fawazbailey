"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Track {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  songUrl?: string;
}

export default function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/spotify");
        const data = await response.json();
        if (!cancelled) setTrack(data);
      } catch {
        if (!cancelled) setTrack({ isPlaying: false });
      }
    }

    load();
    const id = setInterval(load, 30_000);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  if (!track) return null;

  return (
    <a
      href={track.songUrl ?? "https://open.spotify.com"}
      target="_blank"
      rel="noopener noreferrer"
      className="panel pop"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "14px",
        padding: "12px 16px",
        maxWidth: "400px",
        width: "100%",
        textDecoration: "none",
      }}
    >
      <div
        style={{
          width: "46px",
          height: "46px",
          flexShrink: 0,
          position: "relative",
          border: "1.5px solid var(--ink)",
          backgroundColor: "var(--wash)",
        }}
      >
        {track.albumArt && (
          <Image src={track.albumArt} alt={track.album ?? "Album art"} fill style={{ objectFit: "cover" }} />
        )}
      </div>

      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "4px" }}>
          <span
            style={{
              width: "7px",
              height: "7px",
              flexShrink: 0,
              backgroundColor: track.isPlaying ? "var(--accent)" : "var(--ink-faint)",
              animation: track.isPlaying ? "pulse 2s infinite" : "none",
            }}
          />
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink-mute)",
            }}
          >
            {track.isPlaying ? "Now playing" : "Last played"}
          </span>
        </div>

        {track.title ? (
          <>
            <p className="truncate" style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)" }}>
              {track.title}
            </p>
            <p className="truncate" style={{ fontSize: "13px", color: "var(--ink-soft)" }}>
              {track.artist}
            </p>
          </>
        ) : (
          <p style={{ fontSize: "14px", color: "var(--ink-mute)" }}>Nothing playing right now</p>
        )}
      </div>

      <svg
        style={{ flexShrink: 0, color: "var(--ink)" }}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    </a>
  );
}
