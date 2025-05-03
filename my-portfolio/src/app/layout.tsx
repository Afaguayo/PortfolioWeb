// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar"; // ✅ correct


export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Showcasing my work and skills",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white font-sans">
        <Navbar />
        <main className="p-4 max-w-5xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
