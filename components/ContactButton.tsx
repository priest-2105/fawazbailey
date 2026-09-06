"use client";

import { useContact } from "./ContactProvider";

interface Props {
  label?: string;
  filled?: boolean;
  style?: React.CSSProperties;
}

export default function ContactButton({ label = "Get in touch", filled = true, style }: Props) {
  const { open } = useContact();

  return (
    <button
      type="button"
      onClick={open}
      className={`btn ${filled ? "btn-ink" : "btn-ghost"}`}
      style={style}
    >
      {label}
    </button>
  );
}
