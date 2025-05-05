"use client";

import {
  motion,
  useScroll,
  AnimatePresence,
  useAnimation,
  useInView,
  useTransform,
} from "framer-motion";
import { useRef, useEffect, useState, ReactNode } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const skills = [
  "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS",
  "Firebase", "Framer Motion", "Node.js", "MySQL", "PHP", "Python", "Flask",
  "System Calls", "Neural Networks", "Shell Scripting", "Git", "Linux",
];

const projects = [
  {
    title: "🎟️ Ticketminer",
    desc: "Java ticket system using object-oriented principles.",
    tech: ["Java", "OOP", "File I/O"],
  },
  {
    title: "🏨 Hotel Website",
    desc: "Room booking platform with React + Firebase.",
    tech: ["React", "Firebase", "Tailwind"],
  },
  {
    title: "🦁 Zoo Database",
    desc: "Database system for a zoo using PHP and MySQL.",
    tech: ["MySQL", "PHP", "XAMPP"],
  },
  {
    title: "🔐 Emailscanner",
    desc: "Check if your email is part of a breach.",
    tech: ["Python", "APIs", "Regex"],
  },
  {
    title: "🐚 Shell Public",
    desc: "A Unix shell created from scratch using system calls.",
    tech: ["C", "System Calls", "Fork/Exec"],
  },
  {
    title: "🗜️ Archiver Public",
    desc: "Custom file archiver written with low-level operations.",
    tech: ["C", "Compression", "System Calls"],
  },
  {
    title: "🎞️ s24-video-player",
    desc: "Python-based video player using system call methods.",
    tech: ["Python", "FFmpeg", "System Calls"],
  },
  {
    title: "🌐 DDOS Tool",
    desc: "Tool for safe DDoS testing with a Flask backend.",
    tech: ["Python", "Flask", "Threading"],
  },
  {
    title: "📈 Stock AI",
    desc: "Neural net that predicts stock movement direction.",
    tech: ["Python", "TensorFlow", "Finance APIs"],
  },
  {
    title: "♟️ AIChess",
    desc: "AI agent that plays chess with strategy.",
    tech: ["Python", "Minimax", "Chess Engine"],
  },
];

const journey = [
  { year: "2023", text: "Started learning React and building sites.", emoji: "👨‍💻" },
  { year: "2024", text: "Built full-stack apps with Firebase & Node.", emoji: "🚀" },
  { year: "2025", text: "Crafted this portfolio with Next.js & Tailwind.", emoji: "🎨" },
];

function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });

  useEffect(() => {
    controls.start(inView ? "show" : "hidden");
  }, [controls, inView]);

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
      className={`snap-start min-h-screen px-6 py-28 flex flex-col justify-center ${className}`}
    >
      {children}
    </motion.section>
  );
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => setShowBtn(el.scrollTop > 300);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* Parallax background layers */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-b from-black via-slate-900 to-black z-[-2]"
        style={{ y: y1 }}
      />
      <motion.div
        className="fixed inset-0 bg-gradient-to-t from-white/5 via-transparent to-white/5 backdrop-blur-xl z-[-1]"
        style={{ y: y2 }}
      />

      <div
        ref={containerRef}
        id="scroll-container"
        className="relative overflow-y-scroll h-screen scroll-smooth snap-y snap-mandatory text-white pt-16"
      >
        {/* Hero */}
        <Section id="home" className="bg-black/70 backdrop-blur-md">
          <motion.h1 variants={fadeUp} custom={0} className="text-6xl font-bold text-center">
            Angel Aguayo
          </motion.h1>
          <motion.p variants={fadeUp} custom={1} className="text-xl text-center mt-4 text-gray-300">
            Building sleek and interactive web experiences.
          </motion.p>
        </Section>

        {/* About */}
        <Section id="about">
          <motion.h2 variants={fadeUp} custom={0} className="text-4xl font-bold text-center mb-12">
            🧠 My Journey
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-10">
            {journey.map((j, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 1}
                className="border-l-4 border-sky-500 pl-6 relative"
              >
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-xl">{j.emoji}</div>
                <h3 className="text-sky-400 font-semibold">{j.year}</h3>
                <p className="text-gray-300">{j.text}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills">
          <motion.h2 variants={fadeUp} custom={0} className="text-4xl font-bold text-center mb-10">
            ⚙️ Skills & Stack
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 1}
                className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm hover:bg-sky-600 transition shadow"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section id="projects">
          <motion.h2 variants={fadeUp} custom={0} className="text-4xl font-bold text-center mb-10">
            🧱 Projects
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="bg-white/10 backdrop-blur border border-white/10 rounded-xl p-5 hover:scale-[1.02] hover:shadow-2xl transition"
              >
                <h3 className="text-xl font-semibold text-sky-400">{proj.title}</h3>
                <p className="text-gray-300 mt-2 mb-3">{proj.desc}</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  {proj.tech.map((t, j) => (
                    <span key={j} className="bg-slate-700/70 px-2 py-1 rounded-full text-white">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience">
          <motion.h2 variants={fadeUp} custom={0} className="text-4xl font-bold text-center mb-8">
            🧑‍💼 Experience
          </motion.h2>
          <div className="max-w-2xl mx-auto space-y-6">
            <motion.div variants={fadeUp} custom={1}>
              <h3 className="text-sky-400 text-lg font-semibold">FutureTech - Software Intern</h3>
              <p className="text-gray-300">Built tools using React and Firebase.</p>
            </motion.div>
            <motion.div variants={fadeUp} custom={2}>
              <h3 className="text-sky-400 text-lg font-semibold">Freelance Developer</h3>
              <p className="text-gray-300">Delivered custom websites and portfolios.</p>
            </motion.div>
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact">
          <motion.h2 variants={fadeUp} custom={0} className="text-4xl font-bold text-center mb-4">
            📬 Contact Me
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-center text-gray-400 mb-6">
            Let’s collaborate or just chat! Open to roles and freelance work.
          </motion.p>
          <motion.div variants={fadeUp} custom={2} className="text-center">
            <a
              href="mailto:your@email.com"
              className="px-6 py-3 bg-sky-600 text-white rounded-md hover:scale-105 transition"
            >
              Say Hello
            </a>
          </motion.div>
        </Section>

        {/* Resume */}
        <Section id="resume">
          <motion.div variants={fadeUp} custom={0} className="text-center">
            <a
              href="/Angel%20Aguayo%20Resume.pdf"
              download
              className="px-6 py-3 border text-white rounded-md hover:bg-sky-600 transition"
            >
              📄 Download My Resume
            </a>
          </motion.div>
        </Section>

        {/* Scroll to Top */}
        <AnimatePresence>
          {showBtn && (
            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-8 right-8 bg-sky-600 p-3 rounded-full shadow-xl text-white z-[70]"
            >
              ⬆️
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
