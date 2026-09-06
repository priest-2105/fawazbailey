"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import MillipedeHelp from "./MillipedeHelp";

const CODE = "millipede";
const MAX_CREATURES = 8;
const MAX_SEGMENTS = 40;
const MARGIN = 40;
const LIFESPAN = 30_000;
const TREAT_BONUS = 10_000;
const FADE_WINDOW = 5_000;
const DOUBLE_TAP_MS = 320;
const DOUBLE_TAP_SLOP = 40;

interface Creature {
  id: number;
  segments: number;
  spacing: number;
  size: number;
  speed: number;
  steerPhase: number;
  depthPhase: number;
  depthSpeed: number;
  expiresAt: number;
}

interface Point {
  x: number;
  y: number;
}

interface Treat {
  id: number;
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
    expiresAt: Date.now() + LIFESPAN,
  };
}

export default function Millipede() {
  const [creatures, setCreatures] = useState<Creature[]>([]);
  const [treats, setTreats] = useState<Treat[]>([]);

  // Everything the loop touches is keyed by creature id, not array index —
  // creatures now expire from anywhere in the list, and index-keyed state would
  // hand one millipede another's body the moment a gap opened up.
  const containerRefs = useRef(new Map<number, HTMLDivElement>());
  const segmentRefs = useRef(new Map<number, (SVGGElement | null)[]>());
  const legRefs = useRef(new Map<number, (SVGGElement | null)[]>());
  const chains = useRef(new Map<number, Point[]>());
  const headings = useRef(new Map<number, number>());

  const frameId = useRef<number | null>(null);
  const nextId = useRef(0);
  // Survives effect restarts so leg phase and depth don't jump every time a
  // creature is born, fed, or expires.
  const elapsed = useRef(0);

  const treatsRef = useRef<Treat[]>([]);
  const pointer = useRef<Point>({ x: 0, y: 0 });
  const lastTap = useRef<{ time: number; x: number; y: number } | null>(null);
  const hasCreatures = useRef(false);

  useEffect(() => {
    treatsRef.current = treats;
  }, [treats]);

  useEffect(() => {
    hasCreatures.current = creatures.length > 0;
  }, [creatures.length]);

  const dropTreat = useCallback((x: number, y: number) => {
    // Treats only exist once something is around to eat them, so a normal
    // double-click to select a word never leaves a green dot behind.
    if (!hasCreatures.current) return;
    setTreats((previous) => [...previous, { id: nextId.current++, x, y }]);
  }, []);

  useEffect(() => {
    let buffer = "";

    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable='true']")) return;
      if (event.key.length !== 1 || event.metaKey || event.ctrlKey || event.altKey) return;

      if (event.key.toLowerCase() === "t") {
        dropTreat(pointer.current.x, pointer.current.y);
      }

      buffer = (buffer + event.key.toLowerCase()).slice(-CODE.length);
      if (buffer !== CODE) return;

      buffer = "";
      setCreatures((previous) =>
        previous.length >= MAX_CREATURES
          ? previous
          : [...previous, makeCreature(nextId.current++)]
      );
    }

    function handlePointerMove(event: PointerEvent) {
      pointer.current = { x: event.clientX, y: event.clientY };
    }

    // Detected by hand rather than via dblclick, which is unreliable on touch
    // browsers. One path covers mouse and touch.
    function handlePointerUp(event: PointerEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button, input, textarea, [contenteditable='true']")) return;

      const now = Date.now();
      const previous = lastTap.current;

      if (
        previous &&
        now - previous.time < DOUBLE_TAP_MS &&
        Math.hypot(event.clientX - previous.x, event.clientY - previous.y) < DOUBLE_TAP_SLOP
      ) {
        lastTap.current = null;
        dropTreat(event.clientX, event.clientY);
        return;
      }

      lastTap.current = { time: now, x: event.clientX, y: event.clientY };
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dropTreat]);

  useEffect(() => {
    if (creatures.length === 0) {
      chains.current.clear();
      headings.current.clear();
      return;
    }

    const live = new Set(creatures.map((creature) => creature.id));
    for (const id of chains.current.keys()) {
      if (!live.has(id)) {
        chains.current.delete(id);
        headings.current.delete(id);
      }
    }

    creatures.forEach((creature) => {
      const existing = chains.current.get(creature.id);

      if (!existing) {
        const startX = random(MARGIN * 2, Math.max(MARGIN * 3, window.innerWidth - MARGIN * 2));
        const startY = random(MARGIN * 2, Math.max(MARGIN * 3, window.innerHeight - MARGIN * 2));

        headings.current.set(creature.id, random(0, Math.PI * 2));
        chains.current.set(
          creature.id,
          Array.from({ length: creature.segments }, (_, i) => ({
            x: startX - i * creature.spacing,
            y: startY,
          }))
        );
        return;
      }

      // Grown since the last pass — stack new segments onto the tail so the body
      // extends backwards rather than teleporting.
      while (existing.length < creature.segments) {
        const tail = existing[existing.length - 1];
        existing.push({ x: tail.x, y: tail.y });
      }
    });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let previousTime: number | null = null;

    function paint(time: number, now: number) {
      creatures.forEach((creature) => {
        const chain = chains.current.get(creature.id);
        if (!chain) return;

        const depth = 0.5 + 0.5 * Math.sin(time * creature.depthSpeed + creature.depthPhase);
        const scale = creature.size * (0.7 + depth * 0.5);
        const spacing = creature.spacing * scale;

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

        const segments = segmentRefs.current.get(creature.id);
        const legs = legRefs.current.get(creature.id);

        for (let i = 0; i < chain.length; i++) {
          const node = segments?.[i];
          if (!node) continue;

          const ahead = i === 0 ? null : chain[i - 1];
          const angle = ahead
            ? Math.atan2(ahead.y - chain[i].y, ahead.x - chain[i].x)
            : headings.current.get(creature.id) ?? 0;

          node.setAttribute(
            "transform",
            `translate(${chain[i].x.toFixed(2)} ${chain[i].y.toFixed(2)}) rotate(${(
              (angle * 180) / Math.PI
            ).toFixed(2)}) scale(${scale.toFixed(3)})`
          );

          const leg = legs?.[i];
          if (leg) {
            const wave = Math.sin(time * 0.012 * (creature.speed / 0.075) - i * 0.55) * 26;
            leg.setAttribute("transform", `rotate(${wave.toFixed(2)})`);
          }
        }

        const container = containerRefs.current.get(creature.id);
        if (container) {
          // Fading out over the last few seconds is the only signal that a
          // millipede is about to go — cleaner than a countdown on screen.
          const remaining = creature.expiresAt - now;
          const dying = remaining < FADE_WINDOW ? Math.max(0, remaining / FADE_WINDOW) : 1;

          container.style.opacity = ((0.4 + depth * 0.6) * dying).toFixed(3);
          container.style.filter = depth < 0.32 ? "blur(1.2px)" : "none";
          container.style.zIndex = depth > 0.5 ? "0" : "-1";
        }
      });
    }

    paint(elapsed.current, Date.now());
    if (reduceMotion) return;

    function step(time: number) {
      if (previousTime === null) previousTime = time;
      const delta = Math.min(time - previousTime, 50);
      previousTime = time;
      elapsed.current += delta;

      const now = Date.now();
      const currentTreats = treatsRef.current;
      const eaten = new Set<number>();
      const fed = new Set<number>();

      creatures.forEach((creature) => {
        const chain = chains.current.get(creature.id);
        if (!chain) return;

        const head = chain[0];
        let heading = headings.current.get(creature.id) ?? 0;

        let target: Treat | null = null;
        let best = Infinity;
        for (const treat of currentTreats) {
          if (eaten.has(treat.id)) continue;
          const distance = Math.hypot(treat.x - head.x, treat.y - head.y);
          if (distance < best) {
            best = distance;
            target = treat;
          }
        }

        if (target) {
          // Steer proportionally, taking the shorter way round the circle so it
          // never spins 355° to correct 5°.
          const desired = Math.atan2(target.y - head.y, target.x - head.x);
          let difference = desired - heading;
          while (difference > Math.PI) difference -= Math.PI * 2;
          while (difference < -Math.PI) difference += Math.PI * 2;
          heading += difference * Math.min(1, delta * 0.006);
        } else {
          const steer =
            Math.sin(elapsed.current * 0.00065 + creature.steerPhase) * 0.9 +
            Math.sin(elapsed.current * 0.00031 + creature.steerPhase * 2.1) * 0.55 +
            Math.sin(elapsed.current * 0.0013 + creature.steerPhase * 0.7) * 0.3;
          heading += steer * delta * 0.0016;
        }

        head.x += Math.cos(heading) * creature.speed * delta;
        head.y += Math.sin(heading) * creature.speed * delta;

        if (head.x < MARGIN || head.x > window.innerWidth - MARGIN) {
          head.x = Math.max(MARGIN, Math.min(head.x, window.innerWidth - MARGIN));
          heading = Math.PI - heading;
        }
        if (head.y < MARGIN || head.y > window.innerHeight - MARGIN) {
          head.y = Math.max(MARGIN, Math.min(head.y, window.innerHeight - MARGIN));
          heading = -heading;
        }

        headings.current.set(creature.id, heading);

        if (target && best < 18) {
          eaten.add(target.id);
          fed.add(creature.id);
        }
      });

      const expired = creatures.filter((creature) => creature.expiresAt <= now);

      if (eaten.size > 0 || expired.length > 0) {
        if (eaten.size > 0) {
          setTreats((previous) => previous.filter((treat) => !eaten.has(treat.id)));
        }

        setCreatures((previous) =>
          previous
            .filter((creature) => creature.expiresAt > now || fed.has(creature.id))
            .map((creature) =>
              fed.has(creature.id)
                ? {
                    ...creature,
                    segments: Math.min(creature.segments + 1, MAX_SEGMENTS),
                    expiresAt: Math.max(creature.expiresAt, now) + TREAT_BONUS,
                  }
                : creature
            )
        );
      }

      paint(elapsed.current, now);
      frameId.current = requestAnimationFrame(step);
    }

    frameId.current = requestAnimationFrame(step);

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
      {treats.length > 0 && (
        <div className="treat-layer" aria-hidden>
          <svg width="100%" height="100%" style={{ display: "block", overflow: "visible" }}>
            {treats.map((treat) => (
              <g key={treat.id} transform={`translate(${treat.x} ${treat.y})`}>
                <circle
                  r="7"
                  fill="var(--treat)"
                  stroke="var(--ink)"
                  strokeWidth="2"
                  style={{ animation: "pulse 1.6s infinite" }}
                />
                <circle cx="-2" cy="-2.4" r="1.6" fill="var(--paper)" opacity="0.75" />
              </g>
            ))}
          </svg>
        </div>
      )}

      {creatures.map((creature) => (
        <div
          key={creature.id}
          aria-hidden
          ref={(element) => {
            if (element) containerRefs.current.set(creature.id, element);
            else containerRefs.current.delete(creature.id);
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
                    const list = segmentRefs.current.get(creature.id) ?? [];
                    list[i] = element;
                    segmentRefs.current.set(creature.id, list);
                  }}
                >
                  <g
                    ref={(element) => {
                      const list = legRefs.current.get(creature.id) ?? [];
                      list[i] = element;
                      legRefs.current.set(creature.id, list);
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

      <div className="millipede-hud">
        <MillipedeHelp />
        <span className="millipede-count">
          {creatures.length} alive
        </span>
      </div>
    </>
  );
}
