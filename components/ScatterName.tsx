"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { RotateCcw } from "lucide-react";

interface Offset {
  x: number;
  y: number;
}

// Keeps a dragged letter from being flung off-screen, which would both create a
// horizontal scrollbar and lose the glyph somewhere the reset button can't be seen.
const LIMIT_X = 280;
const LIMIT_Y = 180;

const clamp = (value: number, limit: number) => Math.min(limit, Math.max(-limit, value));

export default function ScatterName({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
}) {
  const [offsets, setOffsets] = useState<Record<number, Offset>>({});
  const [dragging, setDragging] = useState<number | null>(null);

  const drag = useRef<{
    index: number;
    pointerX: number;
    pointerY: number;
    baseX: number;
    baseY: number;
  } | null>(null);

  // Split into words, keeping each letter's index within the full string so
  // drag offsets stay keyed consistently.
  const words: { text: string; start: number }[] = [];
  let cursor = 0;
  for (const part of text.split(" ")) {
    words.push({ text: part, start: cursor });
    cursor += part.length + 1;
  }

  const scattered = Object.keys(offsets).length > 0;

  function handlePointerDown(index: number, event: PointerEvent<HTMLSpanElement>) {
    // Touch is deliberately excluded: capturing it would require touch-action:none
    // on the letters, which kills scrolling on the tallest element of the page.
    if (event.pointerType === "touch") return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    const base = offsets[index] ?? { x: 0, y: 0 };
    drag.current = {
      index,
      pointerX: event.clientX,
      pointerY: event.clientY,
      baseX: base.x,
      baseY: base.y,
    };
    setDragging(index);
  }

  function handlePointerMove(event: PointerEvent<HTMLSpanElement>) {
    const current = drag.current;
    if (!current) return;

    const x = clamp(current.baseX + event.clientX - current.pointerX, LIMIT_X);
    const y = clamp(current.baseY + event.clientY - current.pointerY, LIMIT_Y);

    setOffsets((prev) => ({ ...prev, [current.index]: { x, y } }));
  }

  function handlePointerUp(event: PointerEvent<HTMLSpanElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    drag.current = null;
    setDragging(null);
  }

  return (
    <div>
      {/* Fixed height so revealing the button never nudges the name downward. */}
      <div style={{ height: "30px", display: "flex", alignItems: "center" }}>
        {scattered && (
          <button
            type="button"
            onClick={() => setOffsets({})}
            className="name-reset"
            aria-label="Reset name to its original position"
            title="Reset name"
          >
            <RotateCcw size={15} strokeWidth={2.6} aria-hidden />
          </button>
        )}
      </div>

      {/* Letters are aria-hidden so assistive tech reads the name as a word
          rather than spelling it out; the label carries the real text. */}
      <h1 className={className} style={style} aria-label={text}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex}>
            {/* Each word is one unbreakable unit so a narrow viewport wraps
                between words rather than in the middle of a name. */}
            <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {Array.from(word.text).map((character, characterIndex) => {
                const index = word.start + characterIndex;
                const offset = offsets[index];
                const isDragging = dragging === index;

                return (
                  <span
                    key={index}
                    aria-hidden
                    className={`name-letter${isDragging ? " is-dragging" : ""}`}
                    onPointerDown={(event) => handlePointerDown(index, event)}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    style={{
                      transform: offset ? `translate(${offset.x}px, ${offset.y}px)` : undefined,
                      zIndex: isDragging ? 2 : undefined,
                    }}
                  >
                    {character}
                  </span>
                );
              })}
            </span>
            {wordIndex < words.length - 1 && (
              <span aria-hidden style={{ display: "inline-block", width: "0.3em" }} />
            )}
          </span>
        ))}
      </h1>
    </div>
  );
}
