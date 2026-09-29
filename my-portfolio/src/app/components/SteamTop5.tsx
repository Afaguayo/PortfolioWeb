"use client";

import { useEffect, useState } from "react";
import type { Copy } from "@/lib/content";
import { loadFeed } from "@/lib/feeds";

type Game = { name: string; hours: number; image: string; url: string };
type Feed = { updated: string; window: "month" | "2weeks"; games: Game[] };

export default function SteamTop5({ copy, locale }: { copy: Copy["games"]; locale: string }) {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    loadFeed<Feed>("steam.json")
      .then((data) => (data.games?.length ? setFeed(data) : setFailed(true)))
      .catch(() => setFailed(true));
  }, []);

  if (failed) {
    return (
      <>
        <p className="dim">// {copy.sub.month}</p>
        <div className="signal-lost">
          <div className="eq off" aria-hidden>
            <i /><i /><i /><i /><i />
          </div>
          <p className="dim">{copy.offline}</p>
        </div>
      </>
    );
  }

  if (!feed) return <p className="dim blink-cursor">...</p>;

  return (
    <>
      <p className="dim">// {copy.sub[feed.window]}</p>
      <ol className="tracks games">
        {feed.games.slice(0, 5).map((g, i) => (
          <li key={g.url} className="track">
            <span className="track-rank">{String(i + 1).padStart(2, "0")}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="track-art game-art" src={g.image} alt="" width={120} height={45} loading="lazy" />
            <a className="track-info" href={g.url} target="_blank" rel="noopener noreferrer">
              <span className="track-name">{g.name}</span>
              <span className="track-artist">
                {g.hours.toLocaleString(locale)} {copy.hours}
              </span>
            </a>
          </li>
        ))}
      </ol>
      <p className="dim small right">
        {copy.updated} {new Date(feed.updated).toLocaleString(locale, { dateStyle: "medium", timeStyle: "short" })}
      </p>
    </>
  );
}
