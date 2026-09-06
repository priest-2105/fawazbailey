"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CODE = "millipede";
const MAX_CREATURES = 8;
const MARGIN = 40;

interface Creature {
  id: number;
  segments: number;
  spacing: number;
  size: number;
  speed: number;
  steerPhase: number;
  depthPhase: number;
  depthSpeed: number;
}

interface Point {
  x: number;
  y: number;
}

const random = (min: number, max: number) => min + Math.random() * (max - min);

function makeCreature(id: number): Creature {
  return {
    id,
    segments: Math.round(random(12, 22)),
    spacing: random(9, 14),
    size: random(0.45, 1.35),
    speed: random(0.045, 0.11),
    steerPhase: random(0, Math.PI * 2),
    depthPhase: random(0, Math.PI * 2),
    depthSpeed: random(0.00013, 0.00032),
  };
}

export default function Millipede() {
  const [creatures, setCreatures] = useState<Creature[]>([]);

  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const segmentRefs = useRef<(SVGGElement | null)[][]>([]);
  const legRefs = useRef<(SVGGElement | null)[][]>([]);

  const points = useRef<Point[][]>([]);
  const headings = useRef<number[]>([]);
  const frameId = useRef<number | null>(null);
  const nextId = useRef(0);

  const dismiss = useCallback(() => setCreatures([]), []);

  // Each summon adds another one rather than toggling, up to a cap — past a
  // handful they stop reading as creatures and start reading as noise.
  useEffect(() => {
    let buffer = "";

    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable='true']")) return;
      if (event.key.length !== 1 || event.metaKey || event.ctrlKey || event.altKey) return;

      buffer = (buffer + event.key.toLowerCase()).slice(-CODE.length);
      if (buffer !== CODE) return;

      buffer = "";
      setCreatures((previous) =>
        previous.length >= MAX_CREATURES
          ? previous
          : [...previous, makeCreature(nextId.current++)]
      );
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (creatures.length === 0) {
      points.current = [];
      headings.current = [];
      return;
    }

    // Seed any creature that just appeared; leave existing ones mid-crawl.
    creatures.forEach((creature, index) => {
      if (points.current[index]) return;

      const startX = random(MARGIN * 2, Math.max(MARGIN * 3, window.innerWidth - MARGIN * 2));
      const startY = random(MARGIN * 2, Math.max(MARGIN * 3, window.innerHeight - MARGIN * 2));

      headings.current[index] = random(0, Math.PI * 2);
      points.current[index] = Array.from({ length: creature.segments }, (_, i) => ({
        x: startX - i * creature.spacing,
        y: startY,
      }));
    });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let elapsed = 0;
    let previousTime: number | null = null;

    function paint(time: number) {
      creatures.forEach((creature, index) => {
        const chain = points.current[index];
        if (!chain) return;

        const depth =
          0.5 + 0.5 * Math.sin(time * creature.depthSpeed + creature.depthPhase);
        const scale = creature.size * (0.7 + depth * 0.5);
        const spacing = creature.spacing * scale;

        // Hold each segment a fixed distance behind the one ahead — this is what
        // makes the body trail the head instead of moving as a rigid block.
        for (let i = 1; i < chain.length; i++) {
          const ahead = chain[i - 1];
          const current = chain[i];
          const dx = ahead.x - current.x;
          const dy = ahead.y - current.y;
          const distance = Math.hypot(dx, dy) || 1;
          const pull = (distance - spacing) / distance;
          current.x += dx * pull;
          current.y += dy * pull;
        }

        for (let i = 0; i < chain.length; i++) {
          const node = segmentRefs.current[index]?.[i];
          if (!node) continue;

          const ahead = i === 0 ? null : chain[i - 1];
          const angle = ahead
            ? Math.atan2(ahead.y - chain[i].y, ahead.x - chain[i].x)
            : headings.current[index];

          node.setAttribute(
            "transform",
            `translate(${chain[i].x.toFixed(2)} ${chain[i].y.toFixed(2)}) rotate(${(
              (angle * 180) / Math.PI
            ).toFixed(2)}) scale(${scale.toFixed(3)})`
          );

          // Phase offset down the body gives the metachronal wave — the ripple
          // that makes a millipede read as a millipede.
          const legs = legRefs.current[index]?.[i];
          if (legs) {
            const wave = Math.sin(time * 0.012 * (creature.speed / 0.075) - i * 0.55) * 26;
            legs.setAttribute("transform", `rotate(${wave.toFixed(2)})`);
          }
        }

        const container = containerRefs.current[index];
        if (container) {
          container.style.opacity = (0.4 + depth * 0.6).toFixed(3);
          container.style.filter = depth < 0.32 ? "blur(1.2px)" : "none";
          // Far ones sink beneath the page entirely; near ones ride above the
          // body text but still pass under buttons and panels, which sit at
          // z-index 1. That contrast is what sells the depth.
          container.style.zIndex = depth > 0.5 ? "0" : "-1";
        }
      });
    }

    paint(0);
    if (reduceMotion) return;

    function step(time: number) {
      if (previousTime === null) previousTime = time;
      const delta = Math.min(time - previousTime, 50);
      previousTime = time;
      elapsed += delta;

      creatures.forEach((creature, index) => {
        const chain = points.current[index];
        if (!chain) return;

        // Layered sines stand in for noise. The periods share no common
        // multiple, so the path never visibly repeats.
        const steer =
          Math.sin(elapsed * 0.00065 + creature.steerPhase) * 0.9 +
          Math.sin(elapsed * 0.00031 + creature.steerPhase * 2.1) * 0.55 +
          Math.sin(elapsed * 0.0013 + creature.steerPhase * 0.7) * 0.3;
        headings.current[index] += steer * delta * 0.0016;

        const head = chain[0];
        head.x += Math.cos(headings.current[index]) * creature.speed * delta;
        head.y += Math.sin(headings.current[index]) * creature.speed * delta;

        // Reflect off the viewport edges so nothing wanders out of sight.
        if (head.x < MARGIN || head.x > window.innerWidth - MARGIN) {
          head.x = Math.max(MARGIN, Math.min(head.x, window.innerWidth - MARGIN));
          headings.current[index] = Math.PI - headings.current[index];
        }
        if (head.y < MARGIN || head.y > window.innerHeight - MARGIN) {
          head.y = Math.max(MARGIN, Math.min(head.y, window.innerHeight - MARGIN));
          headings.current[index] = -headings.current[index];
        }
      });

      paint(elapsed);
      frameId.current = requestAnimationFrame(step);
    }

    frameId.current = requestAnimationFrame(step);

    // Don't burn frames in a background tab.
    function handleVisibility() {
      if (document.hidden) {
        if (frameId.current !== null) cancelAnimationFrame(frameId.current);
        frameId.current = null;
      } else if (frameId.current === null) {
        previousTime = null;
        frameId.current = requestAnimationFrame(step);
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      if (frameId.current !== null) cancelAnimationFrame(frameId.current);
      frameId.current = null;
    };
  }, [creatures]);

  if (creatures.length === 0) return null;

  return (
    <>
      {creatures.map((creature, creatureIndex) => (
        <div
          key={creature.id}
          aria-hidden
          ref={(element) => {
            containerRefs.current[creatureIndex] = element;
          }}
          className="millipede-layer"
        >
          <svg width="100%" height="100%" style={{ display: "block", overflow: "visible" }}>
            {Array.from({ length: creature.segments }).map((_, i) => {
              const isHead = i === 0;
              const taper = 1 - (i / creature.segments) * 0.45;

              return (
                <g
                  key={i}
                  ref={(element) => {
                    (segmentRefs.current[creatureIndex] ||= [])[i] = element;
                  }}
                >
                  <g
                    ref={(element) => {
                      (legRefs.current[creatureIndex] ||= [])[i] = element;
                    }}
                  >
                    <line
                      x1="0"
                      y1="-3"
                      x2="0"
                      y2={-11 * taper}
                      stroke="var(--ink)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <line
                      x1="0"
                      y1="3"
                      x2="0"
                      y2={11 * taper}
                      stroke="var(--ink)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </g>

                  <ellipse
                    cx="0"
                    cy="0"
                    rx={(isHead ? 7.5 : 6.4) * taper}
                    ry={(isHead ? 6.4 : 5.4) * taper}
                    fill="var(--paper)"
                    stroke="var(--ink)"
                    strokeWidth="2"
                  />

                  {isHead && (
                    <>
                      <line
                        x1="4"
                        y1="-2.5"
                        x2="12"
                        y2="-7"
                        stroke="var(--ink)"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <line
                        x1="4"
                        y1="2.5"
                        x2="12"
                        y2="7"
                        stroke="var(--ink)"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <circle cx="3" cy="-2.4" r="1.15" fill="var(--ink)" />
                      <circle cx="3" cy="2.4" r="1.15" fill="var(--ink)" />
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      ))}

      <button type="button" onClick={dismiss} className="millipede-badge">
        {creatures.length} millipede{creatures.length > 1 ? "s" : ""} — dismiss
        {creatures.length >= MAX_CREATURES && " (full)"}
      </button>
    </>
  );
}
