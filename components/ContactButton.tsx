"use client";

import { useState } from "react";
import ContactModal from "./ContactModal";

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
        className={`btn ${filled ? "btn-ink" : "btn-ghost"}`}
        style={style}
      >
        {label}
      </button>

      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
