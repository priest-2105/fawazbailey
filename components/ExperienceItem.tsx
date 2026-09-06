interface ExperienceItemProps {
  company: string;
  role: string;
  duration: string;
  technologies?: string[];
  bullets: string[];
}

export default function ExperienceItem({
  company,
  role,
  duration,
  technologies,
  bullets,
}: ExperienceItemProps) {
  return (
    <article className="panel" style={{ padding: "clamp(20px, 3vw, 30px)" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "6px",
        }}
      >
        <h3 className="display" style={{ fontSize: "20px" }}>
          {company}
        </h3>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          {duration}
        </span>
      </div>

      <p style={{ fontSize: "15px", color: "var(--ink-soft)", marginBottom: "16px" }}>{role}</p>

      {technologies && technologies.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "20px" }}>
          {technologies.map((item) => (
            <span key={item} className="tag">
              {item}
            </span>
          ))}
        </div>
      )}

      <ul
        style={{
          listStyle: "none",
          padding: "0 0 0 18px",
          margin: 0,
          borderLeft: "var(--border-w) solid var(--ink)",
        }}
      >
        {bullets.map((bullet, index) => (
          <li
            key={index}
            style={{
              fontSize: "15px",
              lineHeight: 1.7,
              color: "var(--ink-soft)",
              marginBottom: index === bullets.length - 1 ? 0 : "12px",
            }}
          >
            {bullet}
          </li>
        ))}
      </ul>
    </article>
  );
}
