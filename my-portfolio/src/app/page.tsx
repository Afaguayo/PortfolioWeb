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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const skills = [
  "JavaScript", "TypeScript", "React", "Next.js",
  "Tailwind CSS", "Firebase", "Framer Motion", "Node.js"
];

const journey = [
  { year: "2023", text: "Started learning React and building futuristic UIs.", emoji: "🧑‍💻" },
  { year: "2024", text: "Built full-stack apps and honed animation workflows.", emoji: "⚙️" },
  { year: "2025", text: "Launched this ultra-clean portfolio.", emoji: "🚀" },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
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
        className={`snap-start h-screen px-6 py-28 flex flex-col justify-center items-center text-center ${className}`}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Scrollable container */}
      <div
        ref={containerRef}
        id="scroll-container"
        className="relative overflow-y-scroll h-screen scroll-smooth snap-y snap-mandatory bg-black text-white pt-16 font-orbitron"
      >
        {/* HERO */}
        <Section>
          <motion.h1
            variants={fadeUp}
            custom={0}
            className="text-5xl sm:text-7xl font-extrabold tracking-wide uppercase"
          >
            Angel Aguayo
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-lg text-gray-400 mt-6 max-w-2xl leading-relaxed"
          >
            Designing clean, animated, and futuristic digital experiences.
          </motion.p>
          <motion.div variants={fadeUp} custom={2} className="mt-10">
            <Link
              href="#projects"
              className="inline-block border border-white px-6 py-3 rounded-md hover:bg-white hover:text-black transition"
            >
              View Projects
            </Link>
          </motion.div>
        </Section>

        {/* ABOUT */}
        <Section id="about">
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-4xl font-bold mb-12 uppercase"
          >
            🧠 My Journey
          </motion.h2>
          <div className="space-y-16 max-w-3xl text-gray-300">
            {journey.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 1}
                className="border-l-2 border-white/20 pl-8 relative text-left"
              >
                <div className="absolute -left-6 top-1 text-xl">{item.emoji}</div>
                <h3 className="text-lg font-semibold mb-1 text-white">{item.year}</h3>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills">
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-4xl font-bold text-center mb-12 uppercase"
          >
            ⚙️ Skills & Stack
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 1}
                className="px-5 py-2 rounded-full bg-white text-black text-sm hover:scale-110 hover:bg-gray-200 transition-all duration-300 shadow"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects">
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-4xl font-bold text-center mb-12 uppercase"
          >
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
                desc: "Terminal-based anime streaming app using MPV.",
                tech: ["Bash", "Node.js", "MPV"]
              },
              {
                title: "Task Tracker App",
                desc: "Full-stack real-time task manager with auth.",
                tech: ["React", "Firebase", "TypeScript"]
              }
            ].map((project, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 1}
                className="bg-white text-black rounded-xl p-6 shadow hover:scale-105 hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-gray-800 mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, j) => (
                    <span key={j} className="bg-black text-white px-2 py-1 rounded-full text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact">
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-4xl font-bold text-center mb-6 uppercase"
          >
            📬 Contact Me
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-gray-400 mb-8 max-w-xl"
          >
            Let’s collaborate on something innovative or just chat.
          </motion.p>
          <motion.div variants={fadeUp} custom={2}>
            <a
              href="mailto:your@email.com"
              className="inline-block border border-white px-6 py-3 rounded-md hover:bg-white hover:text-black transition"
            >
              Say Hello
            </a>
          </motion.div>
        </Section>

        {/* Back to Top */}
        <AnimatePresence>
          {showBtn && (
            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-8 right-8 bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-300 z-[70]"
            >
              ↑
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
