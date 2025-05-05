// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Angel Aguayo | Portfolio",
  description: "Futuristic web developer portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white font-orbitron tracking-wide">
        <Navbar />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
