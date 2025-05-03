// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Showcasing my work and skills",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white font-sans h-full flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 max-w-5xl mx-auto">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
