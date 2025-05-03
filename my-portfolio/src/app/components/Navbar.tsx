// src/components/Navbar.tsx
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 py-4 px-6 flex justify-between items-center shadow-md sticky top-0 z-50">
      <Link href="/" className="text-lg font-semibold text-white">
        Angel's Portfolio
      </Link>
      <div className="space-x-4 text-sm sm:text-base">
        <Link href="/about" className="hover:text-sky-400 transition">About</Link>
        <Link href="/projects" className="hover:text-sky-400 transition">Projects</Link>
        <Link href="/contact" className="hover:text-sky-400 transition">Contact</Link>
      </div>
    </nav>
  );
}
