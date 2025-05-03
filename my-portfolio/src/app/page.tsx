// src/app/page.tsx
"use client";

import {
  motion,
  useScroll,
  AnimatePresence,
  useAnimation,
  useInView,
} from "framer-motion";
import { useRef, useState, useEffect, ReactNode } from "react";
import Link from "next/link";

// Section variants: empty hidden, staggered show
const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

// Child fade-up variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Firebase",
  "Framer Motion",
  "Node.js",
];

const journey = [
  { year: "2023", text: "Started learning React and building sites.", emoji: "👨‍💻" },
  { year: "2024", text: "Built full-stack apps with Firebase & Node.", emoji: "🚀" },
  { year: "2025", text: "Crafted this portfolio with Next.js & Tailwind.", emoji: "🎨" },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const [showBtn, setShowBtn] = useState(false);

  // Show back-to-top after scrolling down
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => setShowBtn(el.scrollTop > 300);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });

  // Section wrapper: full viewport height + snap + re-animate on enter/exit
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
    const inView = useInView(ref, {
      root: containerRef.current,
      threshold: 0.3,
      once: false,
    });

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
        className={`snap-start h-screen bg-fixed bg-center bg-cover px-6 py-28 flex flex-col justify-center ${className}`}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-sky-400 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[70] bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex justify-center">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
            <Link href="#about" className="hover:underline">About</Link>
            <Link href="#skills" className="hover:underline">Skills</Link>
            <Link href="#projects" className="hover:underline">Projects</Link>
            <Link href="#contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Scroll Container */}
      <div
        ref={containerRef}
        id="scroll-container"
        style={{ scrollPaddingTop: "3rem" }}
        className="relative overflow-y-scroll h-screen scroll-smooth snap-y snap-mandatory bg-slate-950 text-white pt-12"
      >
        {/* HERO */}
        <Section className="bg-gradient-to-b from-slate-950 to-slate-900">
          <motion.h1
            variants={fadeUp}
            custom={0}
            className="text-5xl sm:text-7xl font-extrabold bg-gradient-to-r from-sky-400 to-cyan-600 text-transparent bg-clip-text text-center"
          >
            Angel Aguayo
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto text-center leading-relaxed"
          >
            Building animated, clean, and powerful web experiences that feel alive.
          </motion.p>
          <motion.div variants={fadeUp} custom={2} className="mt-10 text-center">
            <Link href="#projects" className="px-6 py-3 bg-sky-600 rounded-lg hover:scale-105 transition">
              View Projects
            </Link>
          </motion.div>
        </Section>

        {/* JOURNEY */}
        <Section id="about" className="bg-gradient-to-b from-slate-900 to-slate-800">
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-4xl font-bold mb-12 text-center"
          >
            🧠 My Journey
          </motion.h2>
          <div className="space-y-16 max-w-3xl mx-auto text-gray-300">
            {journey.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 1}
                className="border-l-4 border-sky-500 pl-8 relative"
              >
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-2xl w-6 h-6 flex items-center justify-center">
                  {item.emoji}
                </div>
                <h3 className="text-xl font-semibold mb-1 text-sky-400">
                  {item.year}
                </h3>
                <p className="leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills" className="bg-slate-900">
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-4xl font-bold text-center mb-12"
          >
            ⚙️ Skills & Stack
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 1}
                className="px-5 py-2 rounded-full bg-slate-800 text-sm hover:scale-110 hover:bg-sky-700 transition-all duration-300 shadow"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" className="bg-slate-950">
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-4xl font-bold text-center mb-12"
          >
            🧱 Projects
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Portfolio Website",
                desc: "Next.js, Tailwind & Framer Motion.",
                tech: ["Next.js", "Tailwind", "Framer Motion"],
              },
              {
                title: "Anime CLI Tool",
                desc: "Stream anime in terminal via MPV + Bash.",
                tech: ["Bash", "Node.js", "MPV"],
              },
              {
                title: "Task Tracker App",
                desc: "Full-stack app with auth & live sync.",
                tech: ["React", "Firebase", "TypeScript"],
              },
            ].map((project, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 1}
                className="bg-slate-900 rounded-xl p-6 shadow hover:scale-105 hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-semibold mb-2 text-sky-400">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, j) => (
                    <span
                      key={j}
                      className="bg-slate-800 px-2 py-1 rounded-full text-xs text-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" className="bg-slate-900">
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-4xl font-bold text-center mb-4"
          >
            📬 Contact Me
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-gray-300 mb-8 leading-relaxed text-center max-w-xl mx-auto"
          >
            Want to collaborate or just say hi? I’m open to opportunities and conversations.
          </motion.p>
          <motion.div variants={fadeUp} custom={2} className="text-center">
            <a
              href="mailto:your@email.com"
              className="inline-block px-6 py-3 bg-sky-600 rounded-lg text-white hover:scale-105 transition"
            >
              Say Hello
            </a>
          </motion.div>
        </Section>

        {/* Back-to-Top Button */}
        <AnimatePresence>
          {showBtn && (
            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-8 right-8 bg-sky-500 p-3 rounded-full shadow-xl backdrop-blur-sm text-white z-[70]"
            >
              ↑
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
