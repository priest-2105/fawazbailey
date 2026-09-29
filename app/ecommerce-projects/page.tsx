import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { ArrowDown, ArrowRight, ArrowUpRight, ShoppingBag } from "lucide-react";
import { COMMERCE_PROJECTS } from "@/lib/ecommerce-projects";
import ProjectScreens from "./ProjectScreens";
import CommerceResults from "./CommerceResults";
import SearchEvidence from "./SearchEvidence";
import styles from "./page.module.css";

const manrope = localFont({ src: "../fonts/manrope-latin.woff2", weight: "200 800", display: "swap", variable: "--font-commerce" });
const title = "Ecommerce Projects — Fawaz Bailey";
const description = "A collection of ecommerce experiences by Fawaz Bailey. Explore the storefronts, the shopping journeys and the stories behind the builds.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ecommerce-projects" },
  openGraph: { title, description, url: "/ecommerce-projects", images: [{ url: "/images/ecommerce/augusta-newham-desktop.jpg", width: 1440, height: 1000, alt: "Augusta Newham ecommerce storefront" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/images/ecommerce/augusta-newham-desktop.jpg"] },
};

export default function EcommerceProjects() {
  return (
    <div className={`${styles.page} ${manrope.variable}`} id="top">
      <a href="#work" className={styles.skipLink}>Skip to projects</a>
      <header className={styles.header}>
        <a href="#top" className={styles.wordmark} aria-label="Fawaz Bailey Commerce, back to top"><ShoppingBag size={22} strokeWidth={1.5} aria-hidden="true" /><span>Fawaz Bailey<span className={styles.wordmarkDivider}>/</span><span className={styles.wordmarkSection}>Commerce</span></span></a>
        <nav aria-label="Commerce navigation" className={styles.nav}>
          <a href="#work">The work</a>
          <a href="#contact">Get in touch <ArrowUpRight size={15} aria-hidden="true" /></a>
        </nav>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="page-title">
          <div className={styles.heroIntro}>
            <h1 id="page-title">Ecommerce.<br /><span>Made personal.</span></h1>
            <div className={styles.heroCopy}>
              <p>Different brands. Different ways to shop.<br />A collection of storefronts I’ve built, and the thinking behind each one.</p>
              <a className={styles.textLink} href="#work">Explore the projects <ArrowDown size={17} aria-hidden="true" /></a>
            </div>
          </div>

          <div className={styles.previewGrid}>
            {COMMERCE_PROJECTS.map((project, index) => (
              <a key={project.slug} href={`#${project.slug}`} className={styles.preview}>
                <div className={`${styles.previewImage} ${styles[project.tone]}`}>
                  <Image src={`/images/ecommerce/${project.slug}-desktop.jpg`} alt={`${project.name} storefront preview`} width={1440} height={1000} sizes="(max-width: 640px) 90vw, 45vw" preload={index === 0} className={styles.previewScreenshot} />
                  <span className={styles.previewAction}><ArrowDown size={20} aria-hidden="true" /><span className={styles.srOnly}>Read the {project.name} story</span></span>
                </div>
                <div className={styles.previewCaption}><h2>{project.name}</h2><span>{project.category}</span></div>
              </a>
            ))}
          </div>
          <div className={styles.heroFoot}><p>Designed around the brand. Built around the customer.</p><span>Design & development by Fawaz Bailey</span></div>
        </section>

        <section id="work" className={styles.work} aria-labelledby="work-title">
          <div className={styles.workHeading}><h2 id="work-title">Behind the storefronts.</h2><p>The context, the choices, and the finished experience.</p></div>
          {COMMERCE_PROJECTS.map(project => (
            <article key={project.slug} id={project.slug} className={styles.project} aria-labelledby={`${project.slug}-title`}>
              <aside className={styles.projectAside}>
                <div className={styles.projectIdentity}>
                  <h3 id={`${project.slug}-title`}>{project.name}</h3>
                  <p className={styles.category}>{project.category}</p>
                  <p className={styles.projectIntro}>{project.intro}</p>
                  {project.launchNote && <p className={styles.launchNote}>{project.launchNote}</p>}
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.siteLink}>Visit the store <ArrowUpRight size={17} aria-hidden="true" /><span className={styles.srOnly}> (opens in a new tab)</span></a>
                  <dl className={styles.projectMeta}><div><dt>Built with</dt><dd>{project.stack.join(" · ")}</dd></div><div><dt>Explore the experience</dt><dd><ul>{project.details.map(detail => <li key={detail}>{detail}</li>)}</ul></dd></div></dl>
                </div>
              </aside>
              <div className={styles.projectBody}>
                <ProjectScreens slug={project.slug} name={project.name} domain={project.domain} tone={project.tone} />
                <div className={styles.story}><h4>{project.headline}</h4><div className={styles.storySections}>{project.story.map(section => <section key={section.title}><h5>{section.title}</h5><p>{section.text}</p></section>)}</div></div>
                {project.slug === "920-luxury" ? <CommerceResults /> : <SearchEvidence />}
                <section className={styles.architecture} aria-labelledby={`${project.slug}-architecture`}>
                  <h4 id={`${project.slug}-architecture`}>Custom storefront. Shopify underneath.</h4>
                  <div className={styles.architectureLayers}><div><h5>Next.js storefront</h5><p>{project.architecture.frontend}</p></div><div><h5>Shopify backend</h5><p>{project.architecture.backend}</p></div></div>
                  <h5 className={styles.flowTitle}>{project.architecture.flowTitle}</h5>
                  <ol className={styles.commerceFlow}>{project.architecture.flow.map(step => <li key={step.title}><h6>{step.title}</h6><p>{step.text}</p></li>)}</ol>
                  <details className={styles.technicalDetails}><summary>A closer look at the implementation</summary><p>{project.architecture.technical}</p></details>
                </section>
              </div>
            </article>
          ))}
        </section>

        <section className={styles.contact} id="contact" aria-labelledby="contact-title">
          <div><h2 id="contact-title">Your brand.<br />Its next chapter.</h2><p>Have a store in mind? Let’s make an experience that feels like you.</p></div>
          <a href="mailto:fawzybailey782@gmail.com" className={styles.contactLink}>Let’s talk <ArrowUpRight size={28} strokeWidth={1.5} aria-hidden="true" /></a>
        </section>
      </main>

      <footer className={styles.footer}><span>© {new Date().getFullYear()} Fawaz Bailey</span><Link href="/">The full portfolio <ArrowRight size={16} aria-hidden="true" /></Link><a href="#top">Back to top <ArrowUpRight size={16} aria-hidden="true" /></a></footer>
    </div>
  );
}
