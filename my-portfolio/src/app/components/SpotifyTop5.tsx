"use client";

import { useEffect, useRef, useState } from "react";
import type { Copy } from "@/lib/content";
import { loadFeed } from "@/lib/feeds";

type Preview = { source: "deezer"; id: number } | { source: "itunes"; url: string } | null;
type Track = { name: string; artists: string; album: string; image: string | null; url: string; preview?: Preview };
type Feed = { updated: string; tracks: Track[] };

// Deezer preview links expire, so get a fresh one at click time. Its API has no CORS,
// but it supports JSONP.
function deezerPreview(id: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const cb = `__dz${Date.now()}${Math.floor(Math.random() * 1e6)}`;
    const script = document.createElement("script");
    const done = () => {
      delete (window as unknown as Record<string, unknown>)[cb];
      script.remove();
    };
    (window as unknown as Record<string, unknown>)[cb] = (data: { preview?: string }) => {
      done();
      if (data.preview) resolve(data.preview);
      else reject(new Error("no preview"));
    };
    script.onerror = () => {
      done();
      reject(new Error("deezer unreachable"));
    };
    script.src = `https://api.deezer.com/track/${id}?output=jsonp&callback=${cb}`;
    document.body.appendChild(script);
  });
}

export default function SpotifyTop5({ copy, locale }: { copy: Copy["music"]; locale: string }) {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);
  const [loading, setLoading] = useState<number | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    loadFeed<Feed>("spotify.json")
      .then((data) => (data.tracks?.length ? setFeed(data) : setFailed(true)))
      .catch(() => setFailed(true));
    return () => audio.current?.pause();
  }, []);

  async function toggle(i: number, preview: NonNullable<Preview>) {
    if (!audio.current) {
      audio.current = new Audio();
      audio.current.volume = 0.6;
      audio.current.onended = () => setPlaying(null);
    }
    const a = audio.current;
    if (playing === i) {
      a.pause();
      setPlaying(null);
      return;
    }
    a.pause();
    setPlaying(null);
    setLoading(i);
    try {
      a.src = preview.source === "deezer" ? await deezerPreview(preview.id) : preview.url;
      await a.play();
      setPlaying(i);
    } catch {
      setPlaying(null);
    } finally {
      setLoading(null);
    }
  }

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
          <li key={tr.url} className={`track ${playing === i ? "is-playing" : ""}`}>
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
            <span className="track-play">
              {playing === i && (
                <span className="eq" aria-hidden>
                  <i /><i /><i /><i /><i />
                </span>
              )}
              {tr.preview ? (
                <button
                  className="play-btn"
                  onClick={() => toggle(i, tr.preview!)}
                  aria-label={`${playing === i ? copy.stop : copy.play}: ${tr.name}`}
                  disabled={loading === i}
                >
                  {loading === i ? "…" : playing === i ? "■" : "▶"}
                </button>
              ) : (
                <a className="play-btn off" href={tr.url} target="_blank" rel="noopener noreferrer" title={copy.noPreview}>
                  ↗
                </a>
              )}
            </span>
          </li>
        ))}
      </ol>
      <p className="dim small right">
        {copy.previewNote} · {copy.updated}{" "}
        {new Date(feed.updated).toLocaleString(locale, { dateStyle: "medium", timeStyle: "short" })}
      </p>
    </>
  );
}
