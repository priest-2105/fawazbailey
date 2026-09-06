import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import ContextMenu from "@/components/ContextMenu";
import ContactProvider from "@/components/ContactProvider";
import Millipede from "@/components/Millipede";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fawaz Bailey | Design & Software Engineer",
  description: "Design and software engineer based in Lagos, Nigeria. I build web apps that solve real problems.",
  metadataBase: new URL("https://fawazbailey.com"),
  icons: {
    icon: [{ url: "/images/FB-light.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Fawaz Bailey | Design & Software Engineer",
    description: "Design and software engineer based in Lagos, Nigeria. I build web apps that solve real problems.",
    url: "https://fawazbailey.com",
    siteName: "Fawaz Bailey",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fawaz Bailey | Design & Software Engineer",
    description: "Design and software engineer based in Lagos, Nigeria. I build web apps that solve real problems.",
    creator: "@_priest_2105_",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${archivoBlack.variable}`}>
      <body>
        <ContactProvider>
          {children}
          <ContextMenu />
          <Millipede />
        </ContactProvider>
      </body>
    </html>
  );
}
