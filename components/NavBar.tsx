"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContact } from "./ContactProvider";

/** Internal routes must go through next/link. A plain <a> triggers a full
 *  document load, which tears down the React tree — and with it anything living
 *  in the layout, like the millipedes. */
const isRoute = (href?: string) => !!href && href.startsWith("/");

const LOGO_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
};

function LogoWrap({ href, children }: { href: string; children: React.ReactNode }) {
  if (isRoute(href)) {
    return (
      <Link href={href} style={LOGO_STYLE}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} style={LOGO_STYLE}>
      {children}
    </a>
  );
}

const SECTIONS = ["about", "projects", "experience"] as const;

/** `action: "contact"` renders a button that opens the contact modal
 *  instead of navigating. */
type NavLink = { label: string; href?: string; action?: "contact" };

const DEFAULT_LINKS: NavLink[] = [
  { label: "About",    href: "/about" },
  { label: "Projects", href: "#projects" },
  // { label: "Work",     href: "#experience" }, // hidden while the work section is commented out
  { label: "Contact",  action: "contact" },
];

export default function NavBar({
  links = DEFAULT_LINKS,
  logoHref = "#about",
}: {
  links?: NavLink[];
  logoHref?: string;
}) {
  const [active, setActive] = useState<string>("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const { open: openContact } = useContact();

  const linkStyle = (isActive: boolean): React.CSSProperties => ({
    fontSize: "14px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: isActive ? "var(--ink)" : "var(--ink-mute)",
    textDecoration: "none",
    position: "relative",
    paddingBottom: "4px",
    background: "none",
    border: "none",
    fontFamily: "inherit",
    transition: "color 0.2s",
  });

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        {
          rootMargin: "-40% 0px -55% 0px", // triggers when section is in upper-middle of viewport
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      {/* Skip to content — visible only on keyboard focus */}
      <a
        href="#about"
        style={{
          position: "fixed",
          top: "16px",
          left: "50%",
          transform: "translateX(-50%) translateY(-80px)",
          zIndex: 200,
          backgroundColor: "#111111",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: 500,
          padding: "10px 20px",
          borderRadius: "999px",
          textDecoration: "none",
          transition: "transform 0.2s",
          outline: "none",
        }}
        onFocus={(e) => (e.currentTarget.style.transform = "translateX(-50%) translateY(0)")}
        onBlur={(e) => (e.currentTarget.style.transform = "translateX(-50%) translateY(-80px)")}
      >
        Skip to content
      </a>

      <nav
        className="page-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "var(--border-w) solid var(--ink)",
        }}
      >
        {/* Logo */}
        <LogoWrap href={logoHref}>
          <Image
            src="/images/FB.svg"
            alt="Fawaz Bailey"
            width={40}
            height={31}
            priority
            style={{ display: "block", width: "40px", height: "31px" }}
          />
        </LogoWrap>

        {/* Links — desktop */}
        <div className="nav-links">
          {links.map(({ label, href, action }) => {
            const isActive = !!href && active === href.replace("#", "");

            const underline = (
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  backgroundColor: "var(--accent)",
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 0.2s",
                }}
              />
            );

            if (action === "contact") {
              return (
                <button key={label} type="button" onClick={openContact} style={linkStyle(false)}>
                  {label}
                  {underline}
                </button>
              );
            }

            if (isRoute(href)) {
              return (
                <Link key={label} href={href!} style={linkStyle(isActive)}>
                  {label}
                  {underline}
                </Link>
              );
            }

            return (
              <a key={label} href={href} style={linkStyle(isActive)}>
                {label}
                {underline}
              </a>
            );
          })}
        </div>

        {/* Hamburger — mobile only */}
        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            style={{
              width: "18px",
              height: "2px",
              backgroundColor: "#111111",
              borderRadius: "1px",
              transition: "transform 0.2s, opacity 0.2s",
              transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              width: "18px",
              height: "2px",
              backgroundColor: "#111111",
              borderRadius: "1px",
              transition: "transform 0.2s, opacity 0.2s",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              width: "18px",
              height: "2px",
              backgroundColor: "#111111",
              borderRadius: "1px",
              transition: "transform 0.2s, opacity 0.2s",
              transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </button>

        {/* Dropdown panel — mobile only */}
        {menuOpen && (
          <div className="nav-mobile-panel">
            {links.map(({ label, href, action }) => {
              const itemStyle: React.CSSProperties = {
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ink)",
                textDecoration: "none",
                textAlign: "left",
                padding: "13px 0",
                borderBottom: "1.5px solid var(--ink-faint)",
                background: "none",
                border: "none",
                borderBottomWidth: "1.5px",
                borderBottomStyle: "solid",
                borderBottomColor: "var(--ink-faint)",
                fontFamily: "inherit",
              };

              if (action === "contact") {
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      openContact();
                    }}
                    style={itemStyle}
                  >
                    {label}
                  </button>
                );
              }

              if (isRoute(href)) {
                return (
                  <Link
                    key={label}
                    href={href!}
                    onClick={() => setMenuOpen(false)}
                    style={itemStyle}
                  >
                    {label}
                  </Link>
                );
              }

              return (
                <a key={label} href={href} onClick={() => setMenuOpen(false)} style={itemStyle}>
                  {label}
                </a>
              );
            })}
          </div>
        )}
      </nav>
    </>
  );
}
