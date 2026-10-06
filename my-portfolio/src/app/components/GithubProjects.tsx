"use client";

import { useEffect, useState } from "react";
import { CONTACT, GITHUB_USER, HIDDEN_REPOS, SCHOOL_REPOS, type Copy } from "@/lib/content";

type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

const CACHE_KEY = "gh-repos-v1";
const CACHE_MS = 30 * 60 * 1000;

function readCache(): Repo[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, repos } = JSON.parse(raw);
    return Date.now() - at < CACHE_MS ? repos : null;
  } catch {
    return null;
  }
}

function writeCache(repos: Repo[]) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos }));
  } catch {}
}

export default function GithubProjects({ copy, locale }: { copy: Copy["projects"]; locale: string }) {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setRepos(cached);
      return;
    }
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((all: Repo[]) => {
        const shown = all
          .filter((r) => !r.fork && !r.archived && !HIDDEN_REPOS.includes(r.name))
          .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at));
        writeCache(shown);
        setRepos(shown);
      })
      .catch(() => setFailed(true));
  }, []);

  if (failed) {
    return (
      <p className="dim">
        {copy.error}{" "}
        <a className="link" href={CONTACT.github} target="_blank" rel="noopener noreferrer">
          {CONTACT.github}
        </a>
      </p>
    );
  }

  if (!repos) return <p className="dim blink-cursor">{copy.loading}</p>;

  const projects = repos.filter((r) => !SCHOOL_REPOS.includes(r.name));
  const coursework = repos.filter((r) => SCHOOL_REPOS.includes(r.name));

  return (
    <>
      <div className="repo-grid">
        {projects.map((r, i) => (
          <article key={r.name} className="repo-card" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="repo-slot">UNIT-{String(i + 1).padStart(2, "0")}</div>
            <h3 className="repo-name">{r.name}</h3>
            <p className="repo-desc">{r.description || copy.noDesc}</p>
            <div className="repo-meta">
              {r.language && <span className="chip">{r.language}</span>}
              {r.stargazers_count > 0 && <span className="chip">★ {r.stargazers_count}</span>}
              <span className="dim small">
                {copy.updated}{" "}
                {new Date(r.pushed_at).toLocaleDateString(locale, { month: "short", year: "numeric" })}
              </span>
            </div>
            <div className="repo-actions">
              <a className="btn-blade" href={r.html_url} target="_blank" rel="noopener noreferrer">
                {copy.open}
              </a>
              {r.homepage && (
                <a className="btn-blade alt" href={r.homepage} target="_blank" rel="noopener noreferrer">
                  {copy.demo}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      {coursework.length > 0 && (
        <details className="coursework">
          <summary>
            {copy.coursework} ({coursework.length})
          </summary>
          <ul>
            {coursework.map((r) => (
              <li key={r.name}>
                <a className="link" href={r.html_url} target="_blank" rel="noopener noreferrer">
                  {r.name}
                </a>
                {r.language && <span className="dim small"> · {r.language}</span>}
              </li>
            ))}
          </ul>
        </details>
      )}
      <div className="center">
        <a className="btn-orb" href={CONTACT.github} target="_blank" rel="noopener noreferrer">
          {copy.all}
        </a>
      </div>
    </>
  );
}
