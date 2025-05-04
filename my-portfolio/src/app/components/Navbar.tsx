// src/components/Navbar.tsx
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-center">
        <div className="flex gap-6 text-sm sm:text-base uppercase font-medium">
          <Link href="#about" className="hover:text-gray-400 transition">About</Link>
          <Link href="#skills" className="hover:text-gray-400 transition">Skills</Link>
          <Link href="#projects" className="hover:text-gray-400 transition">Projects</Link>
          <Link href="#contact" className="hover:text-gray-400 transition">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
