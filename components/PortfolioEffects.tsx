"use client";

import { usePathname } from "next/navigation";
import ContextMenu from "./ContextMenu";
import Millipede from "./Millipede";

export default function PortfolioEffects() {
  const pathname = usePathname();
  if (pathname === "/ecommerce-projects" || pathname.startsWith("/ecommerce-projects/")) return null;

  return <><ContextMenu /><Millipede /></>;
}
