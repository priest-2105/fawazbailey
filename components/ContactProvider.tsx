"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import ContactModal from "./ContactModal";

const ContactContext = createContext<{ open: () => void } | null>(null);

export function useContact() {
  const context = useContext(ContactContext);
  if (!context) throw new Error("useContact must be used inside ContactProvider");
  return context;
}

export default function ContactProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <ContactContext.Provider value={value}>
      {children}
      <ContactModal open={isOpen} onClose={close} />
    </ContactContext.Provider>
  );
}
