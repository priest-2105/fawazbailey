"use client";

import { useState } from "react";
import ContactModal from "./ContactModal";

const F = "var(--font-inter), 'Inter', system-ui, -apple-system, sans-serif";

interface Props {
  label?: string;
  filled?: boolean;
  style?: React.CSSProperties;
}

export default function ContactButton({ label = "Get in touch", filled = true, style }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          display:         "inline-flex",
          alignItems:      "center",
          backgroundColor: filled ? "#111111" : "transparent",
          color:           filled ? "#ffffff" : "#111111",
          border:          filled ? "none" : "1px solid #dddddd",
          fontSize:        "15px",
          fontWeight:      filled ? 600 : 500,
          padding:         filled ? "13px 28px" : "11px 24px",
          borderRadius:    "999px",
          textDecoration:  "none",
          fontFamily:      F,
          cursor:          "pointer",
          ...style,
        }}
      >
        {label}
      </button>

      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
