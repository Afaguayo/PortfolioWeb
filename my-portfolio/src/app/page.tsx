"use client";

import {
  motion,
  useScroll,
  useAnimation,
  useInView,
} from "framer-motion";
import { useRef, useEffect } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef(null);
  const controls = useAnimation();

  const inView = useInView(sectionRef, {
    root: containerRef.current ?? undefined, // ✅ Fixes TypeScript error
    threshold: 0.3,
    once: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    } else {
      controls.start("initial");
    }
  }, [inView, controls]);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-y-scroll h-screen scroll-smooth snap-y snap-mandatory bg-black text-white pt-16"
    >
      <section className="snap-start h-screen flex items-center justify-center">
        <motion.div
          ref={sectionRef}
          variants={fadeInUp}
          initial="initial"
          animate={controls}
          className="text-center"
        >
          <h1 className="text-6xl font-bold">Welcome to My Portfolio</h1>
          <p className="mt-4 text-lg">Scroll down to explore more</p>
        </motion.div>
      </section>

      <section className="snap-start h-screen flex items-center justify-center bg-white text-black">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-semibold">Projects</h2>
          <p className="mt-2">Here are some things I’ve built.</p>
        </motion.div>
      </section>

      <section className="snap-start h-screen flex items-center justify-center bg-black text-white">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-semibold">Contact</h2>
          <p className="mt-2">Let’s get in touch!</p>
        </motion.div>
      </section>
    </div>
  );
}
