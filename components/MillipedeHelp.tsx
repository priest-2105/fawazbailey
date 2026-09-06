"use client";

import { useState } from "react";
import { Bug, Cookie, HelpCircle } from "lucide-react";

const TIPS = [
  {
    id: "summon",
    Icon: Bug,
    label: "Millipedes",
    text: "Type “millipede” anywhere to summon one. Type it again for another, up to eight. Each one only lives 30 seconds unless you feed it.",
  },
  {
    id: "treats",
    Icon: Cookie,
    label: "Treats",
    text: "Double-tap anywhere, or press T, to drop a treat. Every millipede races for the nearest one — whoever eats it grows a segment and gets 10 more seconds.",
  },
] as const;

export default function MillipedeHelp() {
  const [open, setOpen] = useState(false);
  const [activeTip, setActiveTip] = useState<string | null>(null);

  return (
    <div
      className="help"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        setActiveTip(null);
      }}
    >
      <button
        type="button"
        className="help-trigger"
        aria-expanded={open}
        aria-label="How the millipede game works"
        onClick={() => setOpen((previous) => !previous)}
      >
        <HelpCircle size={15} strokeWidth={2.5} aria-hidden />
      </button>

      <div className={`help-icons${open ? " is-open" : ""}`}>
        {TIPS.map(({ id, Icon, label, text }, index) => (
          <div key={id} className="help-slot">
            <button
              type="button"
              className="help-icon"
              // Each icon eases in after the one before it rather than the pair
              // arriving together.
              style={{ transitionDelay: open ? `${index * 90}ms` : "0ms" }}
              aria-label={label}
              onMouseEnter={() => setActiveTip(id)}
              onMouseLeave={() => setActiveTip(null)}
              onFocus={() => {
                setOpen(true);
                setActiveTip(id);
              }}
              onBlur={() => setActiveTip(null)}
            >
              <Icon size={15} strokeWidth={2.5} aria-hidden />
            </button>

            <span role="tooltip" className={`help-tip${activeTip === id ? " is-visible" : ""}`}>
              <strong style={{ display: "block", marginBottom: "4px" }}>{label}</strong>
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
