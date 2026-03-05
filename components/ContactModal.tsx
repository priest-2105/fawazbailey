"use client";

import { useState, useEffect, useRef } from "react";

const F = "var(--font-inter), 'Inter', system-ui, -apple-system, sans-serif";

type Status = "idle" | "sending" | "sent" | "error";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: Props) {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus]   = useState<Status>("idle");
  const overlayRef            = useRef<HTMLDivElement>(null);

  /* close on Escape */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  /* lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setName(""); setEmail(""); setMessage("");
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    fontSize: "15px",
    fontFamily: F,
    color: "#111111",
    backgroundColor: "#f7f7f7",
    border: "1px solid transparent",
    borderRadius: "10px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s, background-color 0.15s",
  };

  return (
    /* overlay */
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position:        "fixed",
        inset:           0,
        backgroundColor: "rgba(0,0,0,0.45)",
        backdropFilter:  "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        zIndex:          1000,
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        padding:         "16px",
      }}
    >
      {/* panel */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius:    "20px",
          padding:         "clamp(24px, 5vw, 40px)",
          width:           "100%",
          maxWidth:        "480px",
          fontFamily:      F,
          boxShadow:       "0 24px 60px rgba(0,0,0,0.15)",
          position:        "relative",
        }}
      >
        {/* close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position:        "absolute",
            top:             "16px",
            right:           "16px",
            width:           "32px",
            height:          "32px",
            borderRadius:    "999px",
            border:          "none",
            backgroundColor: "#f0f0f0",
            cursor:          "pointer",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            fontSize:        "16px",
            color:           "#777777",
            fontFamily:      F,
          }}
        >
          ×
        </button>

        <h2
          style={{
            fontSize:      "22px",
            fontWeight:    700,
            color:         "#111111",
            letterSpacing: "-0.02em",
            marginBottom:  "6px",
            fontFamily:    F,
          }}
        >
          Get in touch
        </h2>
        <p style={{ fontSize: "14px", color: "#888888", marginBottom: "28px", fontFamily: F }}>
          I&apos;ll get back to you as soon as I can.
        </p>

        {status === "sent" ? (
          <div
            style={{
              padding:         "24px",
              backgroundColor: "#f0fdf4",
              borderRadius:    "12px",
              textAlign:       "center",
            }}
          >
            <p style={{ fontSize: "16px", fontWeight: 600, color: "#16a34a", marginBottom: "6px", fontFamily: F }}>
              Message sent.
            </p>
            <p style={{ fontSize: "14px", color: "#555555", fontFamily: F }}>
              Thanks — I&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <input
                type="text"
                placeholder="Your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ ...inputStyle, flex: "1 1 140px" }}
                onFocus={(e) => { e.target.style.borderColor = "#111111"; e.target.style.backgroundColor = "#ffffff"; }}
                onBlur={(e)  => { e.target.style.borderColor = "transparent"; e.target.style.backgroundColor = "#f7f7f7"; }}
              />
              <input
                type="email"
                placeholder="Your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ ...inputStyle, flex: "1 1 140px" }}
                onFocus={(e) => { e.target.style.borderColor = "#111111"; e.target.style.backgroundColor = "#ffffff"; }}
                onBlur={(e)  => { e.target.style.borderColor = "transparent"; e.target.style.backgroundColor = "#f7f7f7"; }}
              />
            </div>

            <textarea
              placeholder="What's on your mind?"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                ...inputStyle,
                resize:     "vertical",
                lineHeight: "1.6",
                minHeight:  "120px",
              }}
              onFocus={(e) => { e.target.style.borderColor = "#111111"; e.target.style.backgroundColor = "#ffffff"; }}
              onBlur={(e)  => { e.target.style.borderColor = "transparent"; e.target.style.backgroundColor = "#f7f7f7"; }}
            />

            {status === "error" && (
              <p style={{ fontSize: "13px", color: "#dc2626", fontFamily: F }}>
                Something went wrong. Try emailing me directly at fawzybailey782@gmail.com
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                backgroundColor: status === "sending" ? "#555555" : "#111111",
                color:           "#ffffff",
                border:          "none",
                borderRadius:    "999px",
                padding:         "13px 28px",
                fontSize:        "15px",
                fontWeight:      600,
                fontFamily:      F,
                cursor:          status === "sending" ? "not-allowed" : "pointer",
                alignSelf:       "flex-start",
                transition:      "background-color 0.15s",
              }}
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
