"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SECTIONS = ["about", "projects", "experience"] as const;
const NAV_LINKS = [
  { label: "About",    href: "/about" },
  { label: "Projects", href: "#projects" },
  { label: "Work",     href: "#experience" },
  { label: "Contact",  href: "mailto:fawzybailey782@gmail.com" },
];

export default function NavBar() {
  const [active, setActive] = useState<string>("about");

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
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 56px",
          backgroundColor: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Logo */}
        <a href="#about" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image
            src="/FB.svg"
            alt="Fawaz Bailey"
            width={52}
            height={31}
            priority
            style={{ display: "block" }}
          />
        </a>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          {NAV_LINKS.map(({ label, href }) => {
            const sectionId = href.replace("#", "");
            const isActive = active === sectionId;

            return (
              <a
                key={label}
                href={href}
                style={{
                  fontSize: "15px",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#111111" : "#999999",
                  textDecoration: "none",
                  position: "relative",
                  paddingBottom: "3px",
                  transition: "color 0.2s",
                }}
              >
                {label}
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "1.5px",
                    backgroundColor: "#111111",
                    borderRadius: "1px",
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.2s",
                  }}
                />
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
