"use client";

import { useEffect, useRef, useState } from "react";

const CODE = "millipede";
const SEGMENTS = 18;
const SPACING = 12;
const SPEED = 0.075; // px per ms
const MARGIN = 50;

interface Point {
  x: number;
  y: number;
}

export default function Millipede() {
  const [summoned, setSummoned] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<(SVGGElement | null)[]>([]);
  const legRefs = useRef<(SVGGElement | null)[]>([]);

  const points = useRef<Point[]>([]);
  const heading = useRef(0);
  const frameId = useRef<number | null>(null);

  // Listen for the summoning word. Anything typed into a field is ignored, so
  // writing "millipede" in the contact form doesn't spawn one.
  useEffect(() => {
    let buffer = "";

    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable='true']")) return;
      if (event.key.length !== 1 || event.metaKey || event.ctrlKey || event.altKey) return;

      buffer = (buffer + event.key.toLowerCase()).slice(-CODE.length);
      if (buffer === CODE) {
        buffer = "";
        setSummoned((previous) => !previous);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!summoned) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const startX = window.innerWidth * 0.5;
    const startY = window.innerHeight * 0.55;
    points.current = Array.from({ length: SEGMENTS }, (_, i) => ({
      x: startX - i * SPACING,
      y: startY,
    }));
    heading.current = 0;

    let elapsed = 0;
    let previousTime: number | null = null;

    function render(depth: number, time: number) {
      const scale = 0.55 + depth * 0.7;
      const spacing = SPACING * scale;
      const chain = points.current;

      // Each segment is pulled to a fixed distance behind the one ahead. This is
      // what makes the body trail the head instead of moving as a rigid block.
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
        const node = segmentRefs.current[i];
        if (!node) continue;

        const ahead = i === 0 ? null : chain[i - 1];
        const angle = ahead
          ? Math.atan2(ahead.y - chain[i].y, ahead.x - chain[i].x)
          : heading.current;

        node.setAttribute(
          "transform",
          `translate(${chain[i].x.toFixed(2)} ${chain[i].y.toFixed(2)}) rotate(${(
            (angle * 180) / Math.PI
          ).toFixed(2)}) scale(${scale.toFixed(3)})`
        );

        // Phase offset down the body produces the metachronal wave — the ripple
        // that makes a millipede read as a millipede.
        const legs = legRefs.current[i];
        if (legs) {
          const wave = Math.sin(time * 0.012 - i * 0.55) * 26;
          legs.setAttribute("transform", `rotate(${wave.toFixed(2)})`);
        }
      }

      if (containerRef.current) {
        containerRef.current.style.opacity = (0.45 + depth * 0.55).toFixed(3);
        containerRef.current.style.filter = depth < 0.35 ? "blur(1.1px)" : "none";
      }
    }

    // Paint once up front, otherwise every segment sits stacked at the SVG
    // origin until the first animation frame lands.
    render(1, 0);

    if (reduceMotion) return;

    function step(time: number) {
      if (previousTime === null) previousTime = time;
      const delta = Math.min(time - previousTime, 50);
      previousTime = time;
      elapsed += delta;

      // Layered sines stand in for noise: a slow drift with faster wobble on top,
      // so the path never repeats in a way the eye can latch onto.
      const steer =
        Math.sin(elapsed * 0.00065) * 0.9 +
        Math.sin(elapsed * 0.00031 + 1.7) * 0.55 +
        Math.sin(elapsed * 0.0013 + 4.2) * 0.3;
      heading.current += steer * delta * 0.0016;

      const head = points.current[0];
      head.x += Math.cos(heading.current) * SPEED * delta;
      head.y += Math.sin(heading.current) * SPEED * delta;

      // Reflect off the viewport edges so it never wanders out of sight.
      if (head.x < MARGIN || head.x > window.innerWidth - MARGIN) {
        head.x = Math.max(MARGIN, Math.min(head.x, window.innerWidth - MARGIN));
        heading.current = Math.PI - heading.current;
      }
      if (head.y < MARGIN || head.y > window.innerHeight - MARGIN) {
        head.y = Math.max(MARGIN, Math.min(head.y, window.innerHeight - MARGIN));
        heading.current = -heading.current;
      }

      const depth = 0.5 + 0.5 * Math.sin(elapsed * 0.00021);
      render(depth, elapsed);

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
  }, [summoned]);

  if (!summoned) return null;

  return (
    <>
      <div
        ref={containerRef}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          pointerEvents: "none",
        }}
      >
        <svg width="100%" height="100%" style={{ display: "block", overflow: "visible" }}>
          {Array.from({ length: SEGMENTS }).map((_, i) => {
            const isHead = i === 0;
            const taper = 1 - (i / SEGMENTS) * 0.45;

            return (
              <g
                key={i}
                ref={(element) => {
                  segmentRefs.current[i] = element;
                }}
              >
                <g
                  ref={(element) => {
                    legRefs.current[i] = element;
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

      <div className="millipede-badge">
        Millipede summoned — type it again to dismiss
      </div>
    </>
  );
}
