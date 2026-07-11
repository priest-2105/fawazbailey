import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
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
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
