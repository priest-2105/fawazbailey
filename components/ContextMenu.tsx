"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, Swords } from "lucide-react";

const ITEMS = [
  { label: "Email me", href: "mailto:fawzybailey782@gmail.com", Icon: Mail },
  { label: "GitHub", href: "https://github.com/priest-2105", Icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/fawazbailey", Icon: Linkedin },
  {
    label: "Challenge me to chess",
    href: "https://www.chess.com/play/online/new?opponent=priest-2105",
    Icon: Swords,
  },
] as const;

const EDGE = 8;

/** Right-clicking these is how people actually use a browser — copying a link,
 *  saving an image, editing a field. Hijacking those is a net loss, so the
 *  native menu wins there and the custom one only fills the empty space. */
const NATIVE_MENU_TARGETS = "a, img, input, textarea, select, [contenteditable='true']";

export default function ContextMenu() {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<Element | null>(null);

  const close = useCallback(() => setPosition(null), []);

  useEffect(() => {
    function handleContextMenu(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (window.getSelection()?.toString()) return;
      if (target.closest(NATIVE_MENU_TARGETS)) return;

      event.preventDefault();
      restoreFocusTo.current = document.activeElement;
      setPosition({ x: event.clientX, y: event.clientY });
    }

    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  useEffect(() => {
    if (!position) return;

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) close();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        (restoreFocusTo.current as HTMLElement | null)?.focus?.();
        return;
      }

      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

      const items = Array.from(
        menuRef.current?.querySelectorAll<HTMLAnchorElement>("[role='menuitem']") ?? []
      );
      if (items.length === 0) return;

      event.preventDefault();
      const current = items.indexOf(document.activeElement as HTMLAnchorElement);
      const step = event.key === "ArrowDown" ? 1 : -1;
      const next = (current + step + items.length) % items.length;
      items[next].focus();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", close);
    window.addEventListener("blur", close);
    window.addEventListener("scroll", close, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", close);
      window.removeEventListener("blur", close);
      window.removeEventListener("scroll", close, true);
    };
  }, [position, close]);

  // Keep the menu on screen when opened near an edge, then hand it focus.
  useLayoutEffect(() => {
    const node = menuRef.current;
    if (!position || !node) return;

    const { width, height } = node.getBoundingClientRect();
    const x = Math.max(EDGE, Math.min(position.x, window.innerWidth - width - EDGE));
    const y = Math.max(EDGE, Math.min(position.y, window.innerHeight - height - EDGE));

    if (x !== position.x || y !== position.y) {
      setPosition({ x, y });
      return;
    }

    node.querySelector<HTMLAnchorElement>("[role='menuitem']")?.focus();
  }, [position]);

  if (!position) return null;

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Get in touch"
      className="ctx-menu"
      style={{ top: position.y, left: position.x }}
    >
      {ITEMS.map(({ label, href, Icon }) => (
        <a
          key={label}
          role="menuitem"
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="ctx-item"
          onClick={close}
        >
          <Icon size={15} strokeWidth={2.4} aria-hidden />
          {label}
        </a>
      ))}
    </div>
  );
}
