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
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.8 } },
};


const translations = {
  en: {
    heroTitle: "Angel Aguayo",
    heroSubtitle: "Software Engineer\nCybersecurity & AI Enthusiast",
    aboutHeading: "🧠 My Journey",
    skillsHeading: "⚙️ Skills",
    projectsHeading: "🧱 Projects",
    projectsButton: "View all projects on GitHub",
    experienceHeading: "🧑‍💼 Experience",
    contactHeading: "📬 Contact Me",
    contactText: "If you want to contact me for any reason, feel free to email me!",
    contactEmail: "angelaguayo78@outlook.com",
    resumeButton: "Download My Resume",
    projects: [
      {
        title: "🎟️ Ticketminer",
        desc: "Java ticket system using object-oriented principles.",
        tech: ["Java", "OOP"],
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
        tech: ["Python", "APIs"],
      },
      {
        title: "🐚 Shell Public",
        desc: "A Unix shell created from scratch using system calls.",
        tech: ["C", "System Calls", "Fork/Exec"],
      },
      {
        title: "🎞️ video-player",
        desc: "Python-based video player using system call methods.",
        tech: ["Python", "System Calls"],
      },
      {
        title: "🌐 DDOS Tool",
        desc: "Tool for safe DDoS testing with a Flask backend.",
        tech: ["Python", "Flask", "Threading"],
      },
      {
        title: "📈 Stock AI",
        desc: "Neural network that predicts stock movement direction.",
        tech: ["Python", "TensorFlow", "Finance APIs"],
      },
      {
        title: "♟️ AIChess",
        desc: "AI agent that plays chess with strategy.",
        tech: ["Python", "Minimax", "Chess Engine"],
      },
    ] as const,
    journey: [
      { year: "2020", text: "Started coding.",  },
      { year: "2021", text: "Got into UTEP and learned Java.",  },
      { year: "2022", text: "Learned Python and C, Databases, and OS.",  },
      { year: "2023", text: "Joined AI4ALL; learned ML & AI development.",  },
      { year: "2024", text: "Studied neural networks and modern AI.",  },
      { year: "2025", text: "Diving into cybersecurity.",  },
    ] as const,
  },
  es: {
    heroTitle: "Ángel Aguayo",
    heroSubtitle: "Ingeniero de Software\nEntusiasta de Ciberseguridad y IA",
    aboutHeading: "🧠 Mi Trayectoria",
    skillsHeading: "⚙️ Habilidades",
    projectsHeading: "🧱 Proyectos",
    projectsButton: "Ver todos los proyectos en GitHub",
    experienceHeading: "🧑‍💼 Experiencia",
    contactHeading: "📬 Contáctame",
    contactText: 
      "Si quieres contactarme por cualquier motivo, ¡no dudes en escribirme!",
    contactEmail: "angelaguayo78@outlook.com",
    resumeButton: "Descargar Mi Currículum",
    projects: [
      {
        title: "🎟️ Ticketminer",
        desc: "Sistema de tickets en Java usando principios orientados a objetos.",
        tech: ["Java", "OOP"],
      },
      {
        title: "🏨 Hotel Website",
        desc: "Plataforma de reservas de habitaciones con React + Firebase.",
        tech: ["React", "Firebase", "Tailwind"],
      },
      {
        title: "🦁 Zoo Database",
        desc: "Sistema de base de datos para un zoológico usando PHP y MySQL.",
        tech: ["MySQL", "PHP", "XAMPP"],
      },
      {
        title: "🔐 Emailscanner",
        desc: "Comprueba si tu correo está en una filtración.",
        tech: ["Python", "APIs"],
      },
      {
        title: "🐚 Shell Public",
        desc: "Shell Unix creada desde cero usando llamadas al sistema.",
        tech: ["C", "System Calls", "Fork/Exec"],
      },
      {
        title: "🎞️ video-player",
        desc: "Reproductor de vídeo en Python usando llamadas al sistema.",
        tech: ["Python", "System Calls"],
      },
      {
        title: "🌐 DDOS Tool",
        desc: "Herramienta para pruebas seguras de DDoS con Flask.",
        tech: ["Python", "Flask", "Threading"],
      },
      {
        title: "📈 Stock AI",
        desc: "Red neuronal que predice la dirección del mercado.",
        tech: ["Python", "TensorFlow", "Finance APIs"],
      },
      {
        title: "♟️ AIChess",
        desc: "Agente de IA que juega ajedrez con estrategia.",
        tech: ["Python", "Minimax", "Chess Engine"],
      },
    ] as const,
    journey: [
      { year: "2020", text: "Empecé a programar.", },
      { year: "2021", text: "Ingresé a UTEP y aprendí Java.",},
      { year: "2022", text: "Aprendí Python y C, bases de datos y SO.", },
      { year: "2023", text: 
        "Me uní a AI4ALL; aprendí desarrollo de ML e IA.",},
      { year: "2024", text: 
        "Estudié redes neuronales y IA moderna.",  },
      { year: "2025", text: "Sumergiéndome en ciberseguridad.",  },
    ] as const,
  },
};

const skills = [
  "JavaScript", "TypeScript", "Python", "Java", "C","PHP", "Kotlin",
  "React", "Next.js", "Tailwind CSS", "Bootstrap", "CSS", "Node.js",
  "Flask", "SQL", "MySQL", "MongoDB", "Docker", "AWS", "Google Cloud Platform",
  "Git","GitHub", "Unit Testing", "Integration Testing", "End-to-End Testing",
  "Event-Driven Design", "Design Patterns", "System Design", "Performance Optimization",
  "OAuth", "Penetration Testing", "Machine Learning", "Deep Learning", "TensorFlow",
  "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Bash", "PowerShell",
  "Linux", "Shell Scripting", "System Calls", "Neural Networks", "CI/CD",
  "Firebase", "Bilingual - English & Spanish"
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
  const [lang, setLang] = useState<"en" | "es">("en");
  const t = translations[lang];

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
      {/* Language Toggle */}
      <div className="fixed bottom-4 left-4 z-50 flex space-x-2">
        <button
          onClick={() => setLang("en")}
          className={`px-3 py-1 rounded ${
            lang === "en" ? "bg-sky-600" : "bg-white/10"
          } transition`}
        >
          EN
        </button>
        <button
          onClick={() => setLang("es")}
          className={`px-3 py-1 rounded ${
            lang === "es" ? "bg-sky-600" : "bg-white/10"
          } transition`}
        >
          ES
        </button>
      </div>

      {/* Parallax backgrounds */}
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
          <motion.h1
            variants={fadeUp}
            custom={0}
            className="text-6xl font-bold text-center"
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-xl text-center mt-4 whitespace-pre-line text-gray-300"
          >
            {t.heroSubtitle}
          </motion.p>
        </Section>

        {/* About */}
        <Section id="about">
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-4xl font-bold text-center mb-12"
          >
            {t.aboutHeading}
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-10">
            {t.journey.map((j, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 1}
                className="border-l-4 border-sky-500 pl-6 relative"
              >
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-xl">
                  
                </div>
                <h3 className="text-sky-400 font-semibold">{j.year}</h3>
                <p className="text-gray-300">{j.text}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills">
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-4xl font-bold text-center mb-10"
          >
            {t.skillsHeading}
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
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-4xl font-bold text-center mb-10"
          >
            {t.projectsHeading}
          </motion.h2>

          <div className="text-center mb-8">
            <a
              href="https://github.com/Afaguayo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-sky-600 text-white rounded-md hover:bg-sky-500 hover:scale-105 transition-transform duration-200"
            >
              {t.projectsButton}
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.projects.map((proj, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="bg-white/10 backdrop-blur border border-white/10 rounded-xl p-5 hover:scale-[1.02] hover:shadow-2xl transition"
              >
                <h3 className="text-xl font-semibold text-sky-400">
                  {proj.title}
                </h3>
                <p className="text-gray-300 mt-2 mb-3">{proj.desc}</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  {proj.tech.map((t, j) => (
                    <span
                      key={j}
                      className="bg-slate-700/70 px-2 py-1 rounded-full text-white"
                    >
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
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-4xl font-bold text-center mb-8"
          >
            {t.experienceHeading}
          </motion.h2>
          <div className="max-w-2xl mx-auto space-y-6">
            <motion.div variants={fadeUp} custom={1} className="mb-8">
              <h3 className="text-sky-400 text-lg font-semibold">
                AI4ALL – Instructor Assistant
              </h3>
              <ul className="mt-2 text-gray-300 list-disc list-inside space-y-2">
                <li>
                  {lang === "en"
                    ? "Developed and designed a server-automation bot to streamline registrations."
                    : "Desarrollé y diseñé un bot de automatización de servidores para facilitar registros."}
                </li>
                <li>
                  {lang === "en"
                    ? "Oversaw server management and maintenance, ensuring smooth program operations."
                    : "Supervisé la gestión y mantenimiento de servidores, asegurando operaciones fluidas."}
                </li>
                <li>
                  {lang === "en"
                    ? "Assisted in organizing and managing the AI4ALL College Pathways program, supporting staff and participants."
                    : "Ayudé a organizar y gestionar el programa AI4ALL College Pathways, apoyando al equipo y participantes."}
                </li>
              </ul>
            </motion.div>
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact">
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-4xl font-bold text-center mb-4"
          >
            {t.contactHeading}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-center text-gray-400 mb-6"
          >
            {t.contactText}
          </motion.p>

          <motion.div variants={fadeUp} custom={2} className="text-center">
            <a
              href={`mailto:${t.contactEmail}`}
              className="px-6 py-3 bg-sky-600 text-white rounded-md hover:scale-105 transition"
            >
              {t.contactEmail}
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
              {t.resumeButton}
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
              {lang === "en" ? "Back to the top" : "Volver arriba"}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
