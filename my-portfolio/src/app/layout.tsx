// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Press_Start_2P, Shippori_Mincho_B1, VT323 } from "next/font/google";
import "./globals.css";

// 8-bit labels, DOS terminal body, and an Evangelion-style heavy serif for title cards.
const pixel = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-pixel" });
const vt323 = VT323({ subsets: ["latin"], weight: "400", variable: "--font-term" });
const mincho = Shippori_Mincho_B1({ subsets: ["latin"], weight: "800", variable: "--font-eva", preload: false });

export const metadata: Metadata = {
  title: "Angel Aguayo | ANGEL.OS",
  description:
    "Angel Aguayo, CS graduate and software engineer in Chihuahua, MX. Cybersecurity, AI and desktop tools.",
};

export const viewport: Viewport = { themeColor: "#0c0c0e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pixel.variable} ${vt323.variable} ${mincho.variable}`}>
      <body>
        <noscript>
          <style>{`.boot{display:none}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
