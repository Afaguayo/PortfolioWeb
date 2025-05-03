// src/app/projects/page.tsx
"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Portfolio Website",
    description: "My personal site built with Next.js, Tailwind, and Framer Motion.",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Task Tracker",
    description: "A full-stack app to manage tasks, with auth and real-time sync.",
    stack: ["React", "Firebase", "TypeScript"],
  },
  {
    title: "Anime CLI Tool",
    description: "A command-line anime player with streaming and dub support.",
    stack: ["Node.js", "MPV", "Bash"],
  },
];

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Projects</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            className="bg-slate-800 rounded-xl p-6 shadow hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-400 text-sm mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs bg-slate-700 px-2 py-1 rounded-full text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
