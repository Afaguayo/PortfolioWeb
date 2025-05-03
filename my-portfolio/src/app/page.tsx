// src/app/page.tsx
"use client";

import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center">
      <motion.h1
        className="text-4xl sm:text-6xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Hi, I'm Angel 👋
      </motion.h1>
      <motion.p
        className="text-lg sm:text-xl text-gray-400 max-w-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        I'm a developer building clean and techy web experiences with React and Next.js.
      </motion.p>
    </section>
  );
}
