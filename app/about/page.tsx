import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import NowPlaying from "@/components/NowPlaying";
import ChessStats from "@/components/ChessStats";
import ContactButton from "@/components/ContactButton";

export const metadata: Metadata = {
  title: "About — Fawaz Bailey",
  description: "Frontend engineer, chess player, and perpetual student of how things work.",
};

const F = "var(--font-inter), 'Inter', system-ui, -apple-system, sans-serif";

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", fontFamily: F, color: "#111111" }}>

      {/* ── top bar ── */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 56px",
          position: "sticky",
          top: 0,
          backgroundColor: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          zIndex: 50,
          borderBottom: "1px solid #f5f5f5",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image src="/FB.svg" alt="Fawaz Bailey" width={52} height={31} priority />
        </Link>
        <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          {[
            { label: "Projects", href: "/projects" },
            { label: "Work",     href: "/#experience" },
            { label: "Contact",  href: "mailto:fawzybailey782@gmail.com" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontSize: "15px",
                fontWeight: 400,
                color: "#999999",
                textDecoration: "none",
                fontFamily: F,
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </header>

      <main style={{ maxWidth: "780px", margin: "0 auto", padding: "80px 40px 120px" }}>

        {/* ── photo + name block ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            marginBottom: "72px",
          }}
        >
          {/* photo */}
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "999px",
              overflow: "hidden",
              backgroundColor: "#f0f0f0",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* ── REPLACE src with your actual photo path e.g. "/photo.jpg" ── */}
            <span
              style={{
                fontSize: "11px",
                color: "#aaaaaa",
                fontFamily: "monospace",
                textAlign: "center",
                padding: "8px",
                lineHeight: 1.4,
              }}
            >
              [ photo ]
            </span>
          </div>

          {/* name + title */}
          <div>
            <h1
              style={{
                fontSize: "clamp(40px, 6vw, 64px)",
                fontWeight: 800,
                color: "#111111",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                marginBottom: "12px",
                fontFamily: F,
              }}
            >
              Fawaz Bailey
            </h1>
            <p style={{ fontSize: "20px", color: "#777777", fontFamily: F, lineHeight: 1.5 }}>
              Frontend Engineer · Lagos, Nigeria
            </p>
          </div>
        </div>

        {/* ── article ── */}
        <article
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}
        >
          <p style={{ fontSize: "20px", fontWeight: 500, color: "#111111", lineHeight: 1.7, fontFamily: F }}>
            I started writing code because I wanted to build things — not because I had a
            five-year plan or a LinkedIn post about it. I just wanted to make stuff that worked.
            That instinct stuck.
          </p>

          <p style={{ fontSize: "18px", color: "#444444", lineHeight: 1.85, fontFamily: F }}>
             My first name is actually spelled Fawas — but I've always preferred it with the Z.
            I&apos;m currently a Computer Science student at the National Open University of Nigeria,
            studying while shipping real products. Most of what I know didn&apos;t come from
            a lecture — it came from doing something wrong, staring at it until I understood why,
            and then doing it again properly. I&apos;ve found that the gap between understanding
            something in theory and actually building it is where most of the real learning happens.
            That gap is also where it gets interesting.
          </p>

          <p style={{ fontSize: "18px", color: "#444444", lineHeight: 1.85, fontFamily: F }}>
            I&apos;ve been building professionally since 2022 — across an education platform,
            a software agency, and a handful of personal projects that range from useful to
            deeply unnecessary. The unnecessary ones are usually where I learn the most.
            I gravitate towards frontend because it sits at the intersection of engineering
            and experience: the code has to work, but it also has to feel right. Getting both
            at the same time is harder than it looks and more satisfying than most things I know.
          </p>

          {/* divider */}
          <div style={{ height: "1px", backgroundColor: "#f0f0f0", margin: "12px 0" }} />

          <h2
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#aaaaaa",
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              fontFamily: F,
            }}
          >
            Chess
          </h2>

          <p style={{ fontSize: "18px", color: "#444444", lineHeight: 1.85, fontFamily: F }}>
            Chess takes up a serious amount of my mental bandwidth — and I mean that in the
            best possible way. I&apos;ve spent more time studying openings, endgames, and
            positional ideas than I&apos;d like to put in writing. There&apos;s something about
            the game that maps cleanly onto how I think about problems in general: you
            rarely win by playing the best move in isolation, you win by setting up the board
            so the right move becomes obvious three moves from now. I try to bring that same
            logic to software — architecture decisions, component design, the moments where
            it&apos;s tempting to hack something together just to make the test pass.
          </p>

          <p style={{ fontSize: "18px", color: "#444444", lineHeight: 1.85, fontFamily: F }}>
            Chess also taught me that losing is most of the job. You can play a near-perfect
            game and still lose because of one decision in move 22 that you didn&apos;t fully
            think through. That&apos;s a useful thing to internalize when you&apos;re writing
            software. The bugs are coming. The question is whether you set things up so that
            when they arrive, you know where to look.
          </p>

          <ChessStats />

          {/* divider */}
          <div style={{ height: "1px", backgroundColor: "#f0f0f0", margin: "12px 0" }} />

          <h2
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#aaaaaa",
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              fontFamily: F,
            }}
          >
            Music
          </h2>

          <p style={{ fontSize: "18px", color: "#444444", lineHeight: 1.85, fontFamily: F }}>
            Music is always on. There&apos;s probably a pattern in there if you
            looked hard enough. My GitHub contribution graph and my listening history are
            essentially the same document presented differently. You can also reach out if you need a playlist recommendation
          </p>

          {/* now playing */}
          <NowPlaying />

          {/* playlist recommendation */}
          <div>
            {/* <p
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#aaaaaa",
                marginBottom: "12px",
                fontFamily: F,
              }}
            >
              A playlist worth your time ↓
            </p> */}
            {/* <iframe
              src="https://open.spotify.com/embed/playlist/0TiAJKCcuso0uCYOJdA0T5?utm_source=generator&theme=0"
              width="100%"
              height="250"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{
                border: "none",
                borderRadius: "14px",
                display: "block",
              }}
            /> */}
          </div>

          {/* divider */}
          <div style={{ height: "1px", backgroundColor: "#f0f0f0", margin: "12px 0" }} />

          <h2
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#aaaaaa",
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              fontFamily: F,
            }}
          >
            Everything else
          </h2>

          <p style={{ fontSize: "18px", color: "#444444", lineHeight: 1.85, fontFamily: F }}>
            Outside of those two, I&apos;m drawn to things that are well-made. Interfaces
            that get out of your way. Tools that do exactly one thing and do it perfectly.
            Writing that doesn&apos;t waste your time. Systems that are honest about what
            they are. I notice when those things are missing, and I find it hard to leave
            them broken when I can fix them.
          </p>

          <p style={{ fontSize: "18px", color: "#444444", lineHeight: 1.85, fontFamily: F }}>
            I&apos;m based in Lagos, open to remote work, and currently building.
            If something I&apos;ve made or said is interesting to you, I&apos;m easy to reach.
          </p>
        </article>

        {/* ── CTA ── */}
        <div style={{ marginTop: "64px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <ContactButton label="Get in touch" filled={true} />
          <a
            href="https://www.linkedin.com/in/fawazbailey/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              border: "1px solid #dddddd",
              color: "#111111",
              fontSize: "15px",
              fontWeight: 500,
              padding: "12px 26px",
              borderRadius: "999px",
              textDecoration: "none",
              fontFamily: F,
            }}
          >
            LinkedIn ↗
          </a>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              border: "1px solid #dddddd",
              color: "#111111",
              fontSize: "15px",
              fontWeight: 500,
              padding: "12px 26px",
              borderRadius: "999px",
              textDecoration: "none",
              fontFamily: F,
            }}
          >
            ← Back home
          </Link>
        </div>

      </main>

      {/* ── footer ── */}
      <footer
        style={{
          borderTop: "1px solid #f0f0f0",
          padding: "32px 56px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: F,
        }}
      >
        <p style={{ fontSize: "14px", color: "#999999" }}>© 2026 Fawaz Bailey</p>
        <Link href="/" style={{ fontSize: "14px", color: "#999999", textDecoration: "none" }}>
          ← Back to home
        </Link>
      </footer>
    </div>
  );
}
