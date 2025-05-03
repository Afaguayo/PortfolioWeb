"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const skills = [
  "JavaScript", "TypeScript", "React", "Next.js",
  "Tailwind CSS", "Firebase", "Framer Motion", "Node.js"
];

export default function HomePage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ container: ref });

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-sky-400 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      <div
        ref={ref}
        className="relative overflow-y-scroll h-screen scroll-smooth bg-slate-950 text-white"
      >
        {/* HERO */}
        <section className="min-h-screen pt-20 flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-slate-950 to-slate-900">
          <motion.h1
            className="text-5xl sm:text-7xl font-extrabold bg-gradient-to-r from-sky-400 to-cyan-600 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Angel Aguayo
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 mt-6 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Building animated, clean, and powerful web experiences that feel alive.
          </motion.p>
          <div className="mt-10 space-x-4">
            <Link href="#projects" className="px-6 py-3 bg-sky-600 rounded-lg hover:scale-105 transition">
              View Projects
            </Link>
          </div>
        </section>

        {/* JOURNEY */}
        <section id="about" className="min-h-[120vh] px-6 py-28 bg-gradient-to-b from-slate-900 to-slate-800">
          <motion.h2 className="text-4xl font-bold mb-12 text-center">
            <span role="img" aria-label="brain">🧠</span> My Journey
          </motion.h2>

          <div className="space-y-16 max-w-3xl mx-auto text-gray-300">
            {[
              { year: "2023", text: "Started learning React and building small interactive sites.", emoji: "👨‍💻" },
              { year: "2024", text: "Dove into full-stack apps with Firebase, Node, and auth flows.", emoji: "🚀" },
              { year: "2025", text: "Built this portfolio with Framer Motion, Next.js & Tailwind CSS.", emoji: "🎨" }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="border-l-4 border-sky-500 pl-6 relative"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
              >
                <motion.div custom={i} variants={fadeUp} className="relative">
                  <div className="absolute -left-8 top-0 text-2xl w-6 h-6 flex items-center justify-center">
                    <span>{item.emoji}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1 text-sky-400">{item.year}</h3>
                  <p>{item.text}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="min-h-[100vh] py-24 bg-slate-900 px-6">
          <motion.div
            className="max-w-5xl mx-auto"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          >
            <motion.h2 className="text-4xl font-bold text-center mb-12" variants={fadeUp}>
              ⚙️ Skills & Stack
            </motion.h2>
            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  className="px-5 py-2 rounded-full bg-slate-800 text-sm hover:scale-110 hover:bg-sky-700 transition-all duration-300 shadow"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="min-h-screen py-24 bg-slate-950 px-6">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          >
            <motion.h2 className="text-4xl font-bold text-center mb-12" variants={fadeUp}>
              🧱 Projects
            </motion.h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Portfolio Website",
                  desc: "Built with Next.js, Tailwind, and Framer Motion.",
                  tech: ["Next.js", "Tailwind", "Framer Motion"]
                },
                {
                  title: "Anime CLI Tool",
                  desc: "Stream anime in terminal using MPV + bash.",
                  tech: ["Bash", "Node.js", "MPV"]
                },
                {
                  title: "Task Tracker App",
                  desc: "Full-stack app with auth and live sync.",
                  tech: ["React", "Firebase", "TypeScript"]
                }
              ].map((project, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  className="bg-slate-900 rounded-xl p-6 shadow hover:scale-105 hover:shadow-xl transition duration-300"
                >
                  <h3 className="text-xl font-semibold mb-2 text-sky-400">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, j) => (
                      <span key={j} className="bg-slate-800 px-2 py-1 rounded-full text-xs text-white">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="min-h-[80vh] py-24 bg-slate-900 px-6">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">📬 Contact Me</h2>
            <p className="text-gray-300 mb-8">
              Want to collaborate or just say hi? I'm open to opportunities and conversations.
            </p>
            <a
              href="mailto:your@email.com"
              className="inline-block px-6 py-3 bg-sky-600 rounded-lg text-white hover:scale-105 transition"
            >
              Say Hello
            </a>
          </motion.div>
        </section>
      </div>
    </>
  );
}
