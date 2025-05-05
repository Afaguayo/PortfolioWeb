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
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: container,
        threshold: 0.5, // Trigger when 50% of section is in view
      }
    );

    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is Element => el !== null);

    targets.forEach((el) => observer.observe(el));

    return () => {
      targets.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md px-6 py-4 flex justify-center gap-6 text-sm font-medium text-white shadow-md">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`relative transition-colors duration-300 ${
            active === section.id ? "text-sky-400 font-semibold" : "text-white"
          }`}
        >
          {section.label}
          <span
            className={`absolute left-0 -bottom-1 h-[2px] bg-sky-400 w-full transform transition-transform duration-300 ${
              active === section.id ? "scale-x-100" : "scale-x-0"
            } origin-left`}
          ></span>
        </button>
      ))}
    </nav>
  );
}
