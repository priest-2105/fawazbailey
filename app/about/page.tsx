import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import NowPlaying from "@/components/NowPlaying";
import ChessStats from "@/components/ChessStats";
import ContactButton from "@/components/ContactButton";

export const metadata: Metadata = {
  title: "About — Fawaz Bailey",
  description:
    "Design and software engineer, chess player, and perpetual student of how things work.",
};

const BODY: React.CSSProperties = {
  fontSize: "17px",
  color: "var(--ink-soft)",
  lineHeight: 1.85,
};

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", color: "var(--ink)" }}>
      <NavBar
        logoHref="/"
        links={[
          { label: "Projects", href: "/projects" },
          { label: "Contact", action: "contact" },
        ]}
      />

      <main style={{ maxWidth: "820px", margin: "0 auto", padding: "150px 40px 120px" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: "64px" }}>
          <div
            className="panel"
            style={{
              width: "132px",
              height: "132px",
              overflow: "hidden",
              padding: 0,
              marginBottom: "32px",
            }}
          >
            <Image
              src="/images/headshot/head-profile.jpeg"
              alt="Fawaz Bailey portrait"
              width={132}
              height={132}
              priority
              style={{
                objectFit: "cover",
                objectPosition: "bottom",
                display: "block",
                width: "100%",
                height: "100%",
              }}
            />
          </div>

          <h1 className="display" style={{ fontSize: "clamp(40px, 7vw, 76px)", marginBottom: "18px" }}>
            Fawaz Bailey
          </h1>

          <p
            style={{
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink-mute)",
              paddingBottom: "26px",
              borderBottom: "var(--border-w) solid var(--ink)",
            }}
          >
            Design &amp; Software Engineer · Lagos, Nigeria
          </p>
        </div>

        {/* ── Intro ── */}
        <section style={{ marginBottom: "72px" }}>
          <p
            style={{
              fontSize: "clamp(19px, 2.4vw, 23px)",
              color: "var(--ink)",
              lineHeight: 1.65,
              fontWeight: 500,
              marginBottom: "26px",
            }}
          >
            I started writing code because I wanted to build things — not because I had a
            five-year plan or a LinkedIn post about it. I just wanted to make stuff that worked.
            That instinct stuck.
          </p>

          <p style={{ ...BODY, marginBottom: "22px" }}>
            My first name is actually spelled Fawas — but I&apos;ve always preferred it with the Z.
            I&apos;m currently a Computer Science student at the National Open University of Nigeria,
            studying while shipping real products. Most of what I know didn&apos;t come from a
            lecture — it came from doing something wrong, staring at it until I understood why,
            and then doing it again properly. The gap between understanding something in theory
            and actually building it is where most of the real learning happens. That gap is also
            where it gets interesting.
          </p>

          <p style={BODY}>
            I&apos;ve been building professionally since 2022 — across an education platform,
            a software agency, and a handful of personal projects that range from useful to
            deeply unnecessary. The unnecessary ones are usually where I learn the most.
            I gravitate towards the space where design meets software because it sits at the
            intersection of engineering and experience: the code has to work, but it also has to
            feel right. Getting both at the same time is harder than it looks and more satisfying
            than most things I know.
          </p>
        </section>

        {/* ── Chess ── */}
        <section style={{ marginBottom: "72px" }}>
          <p className="kicker">
            <span className="kicker-num">01</span> Chess
          </p>

          <p style={{ ...BODY, marginBottom: "22px" }}>
            Chess takes up a serious amount of my mental bandwidth — and I mean that in the
            best possible way. I&apos;ve spent more time studying openings, endgames, and
            positional ideas than I&apos;d like to put in writing. There&apos;s something about
            the game that maps cleanly onto how I think about problems in general: you
            rarely win by playing the best move in isolation, you win by setting up the board
            so the right move becomes obvious three moves from now. I try to bring that same
            logic to software — architecture decisions, component design, the moments where
            it&apos;s tempting to hack something together just to make the test pass.
          </p>

          <p style={{ ...BODY, marginBottom: "32px" }}>
            Chess also taught me that losing is most of the job. You can play a near-perfect
            game and still lose because of one decision on move 22 that you didn&apos;t fully
            think through. That&apos;s a useful thing to internalise when you&apos;re writing
            software. The bugs are coming. The question is whether you set things up so that
            when they arrive, you know where to look.
          </p>

          <ChessStats />
        </section>

        {/* ── Music ── */}
        <section style={{ marginBottom: "72px" }}>
          <p className="kicker">
            <span className="kicker-num">02</span> Music
          </p>

          <p style={{ ...BODY, marginBottom: "28px" }}>
            Music is always on. There&apos;s probably a pattern in there if you looked hard
            enough — my GitHub contribution graph and my listening history are essentially the
            same document presented differently. You can also reach out if you need a playlist
            recommendation.
          </p>

          <NowPlaying />
        </section>

        {/* ── Everything else ── */}
        <section style={{ marginBottom: "72px" }}>
          <p className="kicker">
            <span className="kicker-num">03</span> Everything else
          </p>

          <p style={{ ...BODY, marginBottom: "22px" }}>
            Outside of those two, I&apos;m drawn to things that are well-made. Interfaces
            that get out of your way. Tools that do exactly one thing and do it perfectly.
            Writing that doesn&apos;t waste your time. Systems that are honest about what
            they are. I notice when those things are missing, and I find it hard to leave
            them broken when I can fix them.
          </p>

          <p style={BODY}>
            I&apos;m based in Lagos, open to remote work, and currently building.
            If something I&apos;ve made or said is interesting to you, I&apos;m easy to reach.
          </p>
        </section>

        {/* ── CTA ── */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            paddingTop: "40px",
            borderTop: "var(--border-w) solid var(--ink)",
          }}
        >
          <ContactButton label="Get in touch" filled={true} />
          <a
            href="https://www.linkedin.com/in/fawazbailey/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            LinkedIn ↗
          </a>
          <Link href="/projects" className="btn btn-ghost">
            See the work →
          </Link>
        </div>
      </main>

      <footer
        style={{
          borderTop: "var(--border-w) solid var(--ink)",
          padding: "28px 56px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
          fontSize: "13px",
          color: "var(--ink-mute)",
        }}
      >
        <p>© 2026 Fawaz Bailey</p>
        <Link href="/" className="ink-link" style={{ fontWeight: 600 }}>
          ← Home
        </Link>
      </footer>
    </div>
  );
}
