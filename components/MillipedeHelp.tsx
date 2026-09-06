"use client";

import { useState } from "react";
import { Bug, Cookie, HelpCircle } from "lucide-react";

const TIPS = [
  {
    id: "summon",
    Icon: Bug,
    label: "Millipedes",
    text: "Type “millipede” anywhere to summon one. Again for another, up to eight. Each lives 30 seconds unless you feed it.",
  },
  {
    id: "treats",
    Icon: Cookie,
    label: "Treats",
    text: "Double-tap anywhere, or press T, to drop a treat. They all race for the nearest one — the winner grows a segment and gains 10 seconds.",
  },
] as const;

const ICON_STEP = 36; // icon width + gap, used to slide the tooltip to its icon

export default function MillipedeHelp() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const active = activeIndex === null ? null : TIPS[activeIndex];

  return (
    <div
      className="help"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        setActiveIndex(null);
      }}
    >
      {/* One tooltip that slides to sit above whichever icon is hovered, rather
          than one box per icon — a single node can't end up half-styled or
          clipped by its slot. */}
      <div
        role="tooltip"
        aria-hidden={!active}
        className={`help-tip${active ? " is-visible" : ""}`}
        style={{ left: `${(activeIndex ?? 0) * ICON_STEP}px` }}
      >
        <strong className="help-tip-title">{active?.label ?? ""}</strong>
        <span className="help-tip-body">{active?.text ?? ""}</span>
      </div>

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
        {TIPS.map(({ id, Icon, label }, index) => (
          <button
            key={id}
            type="button"
            className="help-icon"
            // Each eases in after the one before rather than the pair arriving together.
            style={{ transitionDelay: open ? `${index * 90}ms` : "0ms" }}
            aria-label={label}
            tabIndex={open ? 0 : -1}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onFocus={() => {
              setOpen(true);
              setActiveIndex(index);
            }}
            onBlur={() => setActiveIndex(null)}
          >
            <Icon size={15} strokeWidth={2.5} aria-hidden />
          </button>
        ))}
      </div>
    </div>
  );
}
