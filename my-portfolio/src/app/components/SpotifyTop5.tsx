"use client";

import { useEffect, useState } from "react";
import type { Copy } from "@/lib/content";
import { loadFeed } from "@/lib/feeds";

type Track = { name: string; artists: string; album: string; image: string | null; url: string };
type Feed = { updated: string; tracks: Track[] };

export default function SpotifyTop5({ copy, locale }: { copy: Copy["music"]; locale: string }) {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    loadFeed<Feed>("spotify.json")
      .then((data) => (data.tracks?.length ? setFeed(data) : setFailed(true)))
      .catch(() => setFailed(true));
  }, []);

  if (failed) {
    return (
      <div className="signal-lost">
        <div className="eq off" aria-hidden>
          <i /><i /><i /><i /><i />
        </div>
        <p className="dim">{copy.offline}</p>
      </div>
    );
  }

  if (!feed) return <p className="dim blink-cursor">...</p>;

  return (
    <>
      <ol className="tracks">
        {feed.tracks.slice(0, 5).map((tr, i) => (
          <li key={tr.url} className="track">
            <span className="track-rank">{String(i + 1).padStart(2, "0")}</span>
            {tr.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="track-art" src={tr.image} alt={tr.album} width={56} height={56} loading="lazy" />
            ) : (
              <span className="track-art" />
            )}
            <a className="track-info" href={tr.url} target="_blank" rel="noopener noreferrer">
              <span className="track-name">{tr.name}</span>
              <span className="track-artist">{tr.artists}</span>
            </a>
            {i === 0 && (
              <span className="eq" aria-hidden>
                <i /><i /><i /><i /><i />
              </span>
            )}
          </li>
        ))}
      </ol>
      <p className="dim small right">
        {copy.updated} {new Date(feed.updated).toLocaleString(locale, { dateStyle: "medium", timeStyle: "short" })}
      </p>
    </>
  );
}
