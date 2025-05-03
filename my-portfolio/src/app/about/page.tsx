// src/app/about/page.tsx
"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    year: "2023",
    title: "Started learning React",
    description: "Began building small front-end projects and exploring component-based UI.",
  },
  {
    year: "2024",
    title: "Full-stack Projects",
    description: "Used Firebase, Node.js, and built my first full-stack apps.",
  },
  {
    year: "2025",
    title: "Portfolio Launch",
    description: "Built this portfolio using Next.js, Tailwind, and Framer Motion.",
  },
];

const skills = [
  "JavaScript", "TypeScript", "React", "Next.js",
  "Tailwind CSS", "Firebase", "Node.js", "Git",
];

export default function AboutPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-10 text-center">About Me</h1>

      {/* Timeline */}
      <div className="mb-16 space-y-8">
        {timeline.map((item, i) => (
          <motion.div
            key={i}
            className="border-l-4 border-sky-500 pl-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <h3 className="text-xl font-semibold">{item.year} – {item.title}</h3>
            <p className="text-gray-400">{item.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Skills */}
      <h2 className="text-2xl font-semibold mb-4 text-center">Tech Stack</h2>
      <motion.div
        className="flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {skills.map((skill, i) => (
          <span
            key={i}
            className="bg-slate-800 text-white text-sm px-3 py-1 rounded-full shadow hover:bg-sky-600 transition"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
