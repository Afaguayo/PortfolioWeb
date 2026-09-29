"use client";

import { useEffect, useState, type ReactNode } from "react";
import BootScreen from "./components/BootScreen";
import GithubProjects from "./components/GithubProjects";
import PixelAngel from "./components/PixelAngel";
import SpotifyTop5 from "./components/SpotifyTop5";
import SteamTop5 from "./components/SteamTop5";
import { ageOn, daysToNextBirthday } from "@/lib/age";
import { CONTACT, skills, t, type Lang } from "@/lib/content";

const SECTIONS = ["home", "stats", "projects", "log", "contact", "music", "games"] as const;
const LANG_KEY = "lang";

type Card = { ep: string; card: string };

// Evangelion-style title card on top, DOS path underneath.
function Window({ id, title, card, children }: { id: string; title: string; card: Card; children: ReactNode }) {
  return (
    <section id={id} className="window">
      <header className="window-bar">
        <span className="ep">{card.ep}</span>
        <h2 className="card-title">{card.card}</h2>
      </header>
      <p className="window-path">
        C:\ANGEL\{title}&gt;<span className="cursor">_</span>
      </p>
      <div className="window-body">{children}</div>
    </section>
  );
}

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("en");
  const [age, setAge] = useState<{ years: number; days: number } | null>(null);
  const [active, setActive] = useState<string>("home");
  const c = t[lang];
  const locale = lang === "es" ? "es-MX" : "en-US";

  // Age is computed in the visitor's browser, so it ticks over on Nov 30 with no redeploy.
  useEffect(() => {
    const now = new Date();
    setAge({ years: ageOn(now), days: daysToNextBirthday(now) });
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === "en" || saved === "es") setLang(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {}
  }, [lang]);

  // Number keys 1-7 jump between sections, like a controller shortcut.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if ((e.target as HTMLElement)?.closest("input, textarea")) return;
      const i = Number(e.key) - 1;
      if (i >= 0 && i < SECTIONS.length) {
        document.getElementById(SECTIONS[i])?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <BootScreen lines={c.boot} skipLabel={c.skip} />
      <div className="crt" aria-hidden />

      <header className="sticky-head">
      <nav className="topbar">
        <a href="#home" className="brand">
          <span className="brand-halo" aria-hidden /> ANGEL.OS
        </a>
        <ul className="blades">
          {SECTIONS.map((id, i) => (
            <li key={id}>
              <a href={`#${id}`} className={`blade ${active === id ? "on" : ""}`}>
                <span className="key">{i + 1}</span>
                {c.nav[id]}
              </a>
            </li>
          ))}
        </ul>
        <div className="lang">
          {(["en", "es"] as const).map((l) => (
            <button key={l} onClick={() => setLang(l)} className={lang === l ? "on" : ""} aria-pressed={lang === l}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>
      <div className="alert-strip" aria-hidden>
        <div className="alert-track">
          <span>{c.alert} {c.alert} </span>
          <span>{c.alert} {c.alert} </span>
        </div>
      </div>
      </header>

      <main className="shell">
        <section id="home" className="hero">
          <span className="sparkle s1" aria-hidden>✦</span>
          <span className="sparkle s2" aria-hidden>✧</span>
          <span className="sparkle s3" aria-hidden>✦</span>
          <PixelAngel className="hero-angel" />
          <p className="prompt">
            C:\&gt; <span className="typed">{c.tagline}</span>
            <span className="cursor">█</span>
          </p>
          <h1 className="chrome">ANGEL AGUAYO</h1>
          <p className="role">{c.role}</p>
          <a href="#stats" className="btn-orb pulse">
            {c.start}
          </a>
        </section>

        <Window id="stats" title={c.stats.title} card={c.cards.stats}>
          <div className="stats">
            <div className="stat level">
              <span className="stat-label">{c.stats.level}</span>
              <span className="stat-big">{age ? age.years : "--"}</span>
              <span className="dim small">{age ? c.stats.levelNote(age.days) : ""}</span>
              <div className="xp" aria-hidden>
                <div className="xp-fill" style={{ width: age ? `${((365 - age.days) / 365) * 100}%` : "0%" }} />
              </div>
            </div>
            <dl className="stat-list">
              <div><dt>{c.stats.class}</dt><dd>{c.stats.classValue}</dd></div>
              <div><dt>{c.stats.base}</dt><dd>{CONTACT.location}</dd></div>
              <div><dt>{c.stats.langs}</dt><dd>{c.stats.langsValue}</dd></div>
              <div><dt>{c.stats.status}</dt><dd><span className="led" /> {c.stats.online}</dd></div>
            </dl>
          </div>
          <h3 className="sub-title">&gt; {c.stats.skills}</h3>
          <ul className="skills">
            {skills.map((s) => (
              <li key={s} className="skill">[ {s} ]</li>
            ))}
          </ul>
        </Window>

        <Window id="projects" title={c.projects.title} card={c.cards.projects}>
          <p className="dim">// {c.projects.sub}</p>
          <GithubProjects copy={c.projects} locale={locale} />
        </Window>

        <Window id="log" title={c.log.title} card={c.cards.log}>
          <ol className="log">
            {c.log.journey.map(([year, text]) => (
              <li key={year}>
                <span className="log-year">[{year}]</span> {text}
              </li>
            ))}
          </ol>
          <h3 className="sub-title">&gt; {c.log.expTitle}</h3>
          <p className="exp-role">{c.log.expRole}</p>
          <ul className="exp">
            {c.log.exp.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Window>

        <Window id="contact" title={c.contact.title} card={c.cards.contact}>
          <p className="dim">// {c.contact.sub}</p>
          <dl className="contact">
            <div><dt>{c.contact.location}</dt><dd>{CONTACT.location}</dd></div>
            <div><dt>{c.contact.phone}</dt><dd><a className="link" href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a></dd></div>
            <div><dt>{c.contact.email}</dt><dd><a className="link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd></div>
            <div><dt>{c.contact.github}</dt><dd><a className="link" href={CONTACT.github} target="_blank" rel="noopener noreferrer">github.com/Afaguayo</a></dd></div>
          </dl>
          <div className="center">
            <a className="btn-orb" href={CONTACT.resume} download>
              {c.contact.resume}
            </a>
          </div>
        </Window>

        <div className="off-duty" aria-hidden>
          <span>✦</span> {c.offDuty} <span>✦</span>
        </div>

        <Window id="music" title={c.music.title} card={c.cards.music}>
          <p className="dim">// {c.music.sub}</p>
          <SpotifyTop5 copy={c.music} locale={locale} />
        </Window>

        <Window id="games" title={c.games.title} card={c.cards.games}>
          <SteamTop5 copy={c.games} locale={locale} />
        </Window>

        <footer className="footer">
          © {new Date().getFullYear()} ANGEL AGUAYO · {c.footer}
          <span className="cursor">_</span>
        </footer>
      </main>
    </>
  );
}
