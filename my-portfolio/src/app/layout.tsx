// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Orbitron, VT323 } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["500", "700", "900"], variable: "--font-future" });
const vt323 = VT323({ subsets: ["latin"], weight: "400", variable: "--font-term" });

export const metadata: Metadata = {
  title: "Angel Aguayo | ANGEL.OS",
  description:
    "Angel Aguayo, CS graduate and software engineer in Chihuahua, MX. Cybersecurity, AI and desktop tools.",
};

export const viewport: Viewport = { themeColor: "#020602" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${vt323.variable}`}>
      <body>
        <noscript>
          <style>{`.boot{display:none}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
