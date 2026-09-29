"use client";

import { useEffect, useState } from "react";
import PixelAngel from "./PixelAngel";

const SEEN_KEY = "booted-v2";
const LINE_MS = 260;

export default function BootScreen({ lines, skipLabel }: { lines: string[]; skipLabel: string }) {
  const [visible, setVisible] = useState(true);
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      setVisible(false);
      return;
    }

    const finish = () => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      setLeaving(true);
      setTimeout(() => setVisible(false), 450);
    };

    const timers = lines.map((_, i) => setTimeout(() => setShown(i + 1), (i + 1) * LINE_MS));
    timers.push(setTimeout(finish, (lines.length + 2) * LINE_MS));

    const skip = () => {
      timers.forEach(clearTimeout);
      finish();
    };
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [lines]);

  if (!visible) return null;

  return (
    <div className={`boot ${leaving ? "boot-out" : ""}`} role="presentation">
      <PixelAngel className="boot-angel" />
      <pre className="boot-text">
        {lines.slice(0, shown).join("\n")}
        <span className="cursor">█</span>
      </pre>
      <p className="boot-skip">{skipLabel}</p>
    </div>
  );
}
