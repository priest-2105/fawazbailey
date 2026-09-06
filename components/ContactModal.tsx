"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

interface Props {
  open: boolean;
  onClose: () => void;
}

const EMAIL = "fawzybailey782@gmail.com";

export default function ContactModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreFocusTo.current = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLInputElement>("input, textarea")?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      // Keep tabbing inside the dialog — otherwise focus wanders onto the page
      // behind the overlay, where it can't be seen.
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        "button, input, textarea, a[href]"
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = overflow;
      restoreFocusTo.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!response.ok) throw new Error("Request failed");

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-heading"
        className="modal-panel"
      >
        <button type="button" onClick={onClose} aria-label="Close" className="modal-close">
          <X size={16} strokeWidth={2.6} aria-hidden />
        </button>

        <p className="kicker" style={{ marginBottom: "14px" }}>
          <span className="kicker-num">✉</span> Say hello
        </p>

        <h2 id="contact-heading" className="display" style={{ fontSize: "30px", marginBottom: "10px" }}>
          Get in touch
        </h2>

        <p style={{ fontSize: "15px", color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: "26px" }}>
          Tell me what you&apos;re building. I read everything and reply to most of it.
        </p>

        {status === "sent" ? (
          <div className="panel panel-accent" style={{ padding: "22px" }}>
            <p className="display" style={{ fontSize: "17px", marginBottom: "8px" }}>
              Message sent
            </p>
            <p style={{ fontSize: "15px", color: "var(--ink-soft)", lineHeight: 1.6 }}>
              Thanks — I&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <input
                type="text"
                placeholder="Your name"
                aria-label="Your name"
                required
                disabled={status === "sending"}
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="field"
                style={{ flex: "1 1 150px" }}
              />
              <input
                type="email"
                placeholder="Your email"
                aria-label="Your email"
                required
                disabled={status === "sending"}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="field"
                style={{ flex: "1 1 150px" }}
              />
            </div>

            <textarea
              placeholder="What's on your mind?"
              aria-label="Your message"
              required
              rows={5}
              disabled={status === "sending"}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="field"
              style={{ resize: "vertical", lineHeight: 1.6, minHeight: "130px", maxHeight: "260px" }}
            />

            {status === "error" && (
              <p role="alert" style={{ fontSize: "13px", color: "var(--accent)", lineHeight: 1.6 }}>
                Something went wrong. Email me directly at{" "}
                <a href={`mailto:${EMAIL}`} className="ink-link" style={{ fontWeight: 600 }}>
                  {EMAIL}
                </a>
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn btn-ink"
              style={{ alignSelf: "flex-start", marginTop: "4px" }}
            >
              {status === "sending" ? "Sending…" : "Send message →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
