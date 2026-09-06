"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CODE = "millipede";
const MAX_CREATURES = 8;
const MAX_SEGMENTS = 40;
const MARGIN = 40;
const TREAT_COOLDOWN = 10_000;
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
  };
}

export default function Millipede() {
  const [creatures, setCreatures] = useState<Creature[]>([]);
  const [treats, setTreats] = useState<Treat[]>([]);
  const [cooldownLeft, setCooldownLeft] = useState(0);

  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const segmentRefs = useRef<(SVGGElement | null)[][]>([]);
  const legRefs = useRef<(SVGGElement | null)[][]>([]);

  const points = useRef<Point[][]>([]);
  const headings = useRef<number[]>([]);
  const frameId = useRef<number | null>(null);
  const nextId = useRef(0);

  // The loop reads treats through a ref so dropping one doesn't tear down and
  // restart the animation.
  const treatsRef = useRef<Treat[]>([]);
  const lastDrop = useRef(0);
  const pointer = useRef<Point>({ x: 0, y: 0 });
  const lastTap = useRef<{ time: number; x: number; y: number } | null>(null);
  const hasCreatures = useRef(false);

  useEffect(() => {
    treatsRef.current = treats;
  }, [treats]);

  useEffect(() => {
    hasCreatures.current = creatures.length > 0;
  }, [creatures.length]);

  const dismiss = useCallback(() => {
    setCreatures([]);
    setTreats([]);
  }, []);

  const dropTreat = useCallback((x: number, y: number) => {
    // Treats only exist once something is around to eat them, so a normal
    // double-click to select a word never leaves a green dot behind.
    if (!hasCreatures.current) return;

    const now = Date.now();
    if (now - lastDrop.current < TREAT_COOLDOWN) return;
    lastDrop.current = now;

    setTreats((previous) => [...previous, { id: nextId.current++, x, y }]);
    setCooldownLeft(Math.ceil(TREAT_COOLDOWN / 1000));
  }, []);

  // Tick the cooldown readout only while one is running.
  useEffect(() => {
    if (cooldownLeft <= 0) return;
    const timer = setInterval(() => {
      const remaining = Math.ceil((TREAT_COOLDOWN - (Date.now() - lastDrop.current)) / 1000);
      setCooldownLeft(remaining > 0 ? remaining : 0);
    }, 500);
    return () => clearInterval(timer);
  }, [cooldownLeft]);

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

    // Detecting the double tap by hand rather than relying on dblclick, which
    // is unreliable on touch browsers.
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
      points.current = [];
      headings.current = [];
      return;
    }

    creatures.forEach((creature, index) => {
      const existing = points.current[index];

      if (!existing) {
        const startX = random(MARGIN * 2, Math.max(MARGIN * 3, window.innerWidth - MARGIN * 2));
        const startY = random(MARGIN * 2, Math.max(MARGIN * 3, window.innerHeight - MARGIN * 2));

        headings.current[index] = random(0, Math.PI * 2);
        points.current[index] = Array.from({ length: creature.segments }, (_, i) => ({
          x: startX - i * creature.spacing,
          y: startY,
        }));
        return;
      }

      // Grown since the last pass — stack the new segments onto the tail so the
      // body extends backwards rather than teleporting.
      while (existing.length < creature.segments) {
        const tail = existing[existing.length - 1];
        existing.push({ x: tail.x, y: tail.y });
      }
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

      const currentTreats = treatsRef.current;
      const eaten = new Set<number>();
      const grown = new Set<number>();

      creatures.forEach((creature, index) => {
        const chain = points.current[index];
        if (!chain) return;

        const head = chain[0];

        // Nearest uneaten treat wins the creature's attention.
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
          // Steer proportionally toward the treat, taking the shorter way round
          // so it never spins the long way to turn a few degrees.
          const desired = Math.atan2(target.y - head.y, target.x - head.x);
          let difference = desired - headings.current[index];
          while (difference > Math.PI) difference -= Math.PI * 2;
          while (difference < -Math.PI) difference += Math.PI * 2;
          headings.current[index] += difference * Math.min(1, delta * 0.006);
        } else {
          const steer =
            Math.sin(elapsed * 0.00065 + creature.steerPhase) * 0.9 +
            Math.sin(elapsed * 0.00031 + creature.steerPhase * 2.1) * 0.55 +
            Math.sin(elapsed * 0.0013 + creature.steerPhase * 0.7) * 0.3;
          headings.current[index] += steer * delta * 0.0016;
        }

        head.x += Math.cos(headings.current[index]) * creature.speed * delta;
        head.y += Math.sin(headings.current[index]) * creature.speed * delta;

        if (head.x < MARGIN || head.x > window.innerWidth - MARGIN) {
          head.x = Math.max(MARGIN, Math.min(head.x, window.innerWidth - MARGIN));
          headings.current[index] = Math.PI - headings.current[index];
        }
        if (head.y < MARGIN || head.y > window.innerHeight - MARGIN) {
          head.y = Math.max(MARGIN, Math.min(head.y, window.innerHeight - MARGIN));
          headings.current[index] = -headings.current[index];
        }

        if (target && best < 18 && creature.segments < MAX_SEGMENTS) {
          eaten.add(target.id);
          grown.add(creature.id);
        }
      });

      if (eaten.size > 0) {
        setTreats((previous) => previous.filter((treat) => !eaten.has(treat.id)));
        setCreatures((previous) =>
          previous.map((creature) =>
            grown.has(creature.id)
              ? { ...creature, segments: Math.min(creature.segments + 1, MAX_SEGMENTS) }
              : creature
          )
        );
      }

      paint(elapsed);
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

      <div className="millipede-hud">
        <button type="button" onClick={dismiss} className="millipede-badge">
          {creatures.length} millipede{creatures.length > 1 ? "s" : ""} — dismiss
        </button>
        <span className="millipede-hint">
          {cooldownLeft > 0 ? `Treat ready in ${cooldownLeft}s` : "Double-tap or press T for a treat"}
        </span>
      </div>
    </>
  );
}
