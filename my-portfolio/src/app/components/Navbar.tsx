"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
  { id: "resume", label: "Resume" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      {
        root: container,
        threshold: 0.6,
      }
    );

    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    targets.forEach((el) => observer.observe(el));

    return () => {
      targets.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg px-6 py-4 flex justify-center gap-6 text-sm font-medium text-white shadow-lg border-b border-white/10">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`relative transition-all duration-300 px-2 py-1 ${
            active === section.id ? "text-sky-400 font-semibold" : "text-white"
          }`}
        >
          {section.label}
          <span
            className={`absolute bottom-0 left-0 w-full h-[2px] bg-sky-400 transform transition-transform duration-300 ${
              active === section.id ? "scale-x-100" : "scale-x-0"
            } origin-left`}
          />
        </button>
      ))}
    </nav>
  );
}
