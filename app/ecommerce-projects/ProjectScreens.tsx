"use client";

import Image from "next/image";
import { Monitor, Smartphone, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import styles from "./page.module.css";

export default function ProjectScreens({ slug, name, domain, tone }: {
  slug: string; name: string; domain: string; tone: "sage" | "lilac";
}) {
  const [view, setView] = useState<"desktop" | "mobile">("desktop");
  const desktop = useRef<HTMLButtonElement>(null);
  const mobile = useRef<HTMLButtonElement>(null);
  const src = `/images/ecommerce/${slug}-${view}${slug === "augusta-newham" && view === "mobile" ? "-collection" : ""}.jpg`;

  function changeWithKeys(event: React.KeyboardEvent) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? "desktop" : event.key === "End" ? "mobile" : view === "desktop" ? "mobile" : "desktop";
    setView(next);
    (next === "desktop" ? desktop : mobile).current?.focus();
  }

  return (
    <figure className={styles.screenFigure}>
      <div className={styles.screenToolbar}>
        <span>{domain}</span>
        <div className={styles.viewTabs} role="tablist" aria-label={`${name} screenshot view`} onKeyDown={changeWithKeys}>
          <button ref={desktop} id={`${slug}-desktop-tab`} role="tab" type="button" aria-selected={view === "desktop"} aria-controls={`${slug}-screen`} tabIndex={view === "desktop" ? 0 : -1} onClick={() => setView("desktop")}><Monitor size={15} aria-hidden="true" /> Desktop</button>
          <button ref={mobile} id={`${slug}-mobile-tab`} role="tab" type="button" aria-selected={view === "mobile"} aria-controls={`${slug}-screen`} tabIndex={view === "mobile" ? 0 : -1} onClick={() => setView("mobile")}><Smartphone size={15} aria-hidden="true" /> Mobile</button>
        </div>
      </div>
      <div id={`${slug}-screen`} role="tabpanel" aria-labelledby={`${slug}-${view}-tab`} tabIndex={0} className={`${styles.screenStage} ${styles[tone]} ${view === "mobile" ? styles.mobileStage : ""}`}>
        <Image key={view} src={src} alt={`${name} ${slug === "augusta-newham" && view === "mobile" ? "shapewear collection" : "homepage"} captured at ${view} size`} width={view === "desktop" ? 1440 : 390} height={view === "desktop" ? 1000 : 844} sizes={view === "desktop" ? "(max-width: 800px) 90vw, 66vw" : "300px"} className={styles.projectScreen} />
      </div>
      <figcaption className={styles.screenCaption}>
        <span>{slug === "augusta-newham" && view === "mobile" ? "The shapewear collection on mobile" : "Captured from the live storefront"}</span>
        <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size ${name} ${view} screenshot`}>View full size <ArrowUpRight size={14} aria-hidden="true" /></a>
      </figcaption>
    </figure>
  );
}
