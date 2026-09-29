// Fetch my current top 5 Spotify tracks and write them as JSON.
// Usage: node scripts/spotify-top5.mjs <out-file>
// Needs SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN (see scripts/spotify-auth.mjs).
import { writeFileSync } from "node:fs";

const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret, SPOTIFY_REFRESH_TOKEN: refresh } = process.env;
const out = process.argv[2] ?? "spotify.json";

if (!id || !secret || !refresh) {
  console.error("Missing SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET / SPOTIFY_REFRESH_TOKEN");
  process.exit(1);
}

const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  headers: {
    Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"),
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh }),
});
if (!tokenRes.ok) throw new Error(`token refresh failed: ${tokenRes.status} ${await tokenRes.text()}`);
const { access_token } = await tokenRes.json();

// short_term = roughly the last 4 weeks, i.e. "at the moment".
const topRes = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5", {
  headers: { Authorization: `Bearer ${access_token}` },
});
if (!topRes.ok) throw new Error(`top tracks failed: ${topRes.status} ${await topRes.text()}`);
const { items } = await topRes.json();

const tracks = items.map((t) => ({
  name: t.name,
  artists: t.artists.map((a) => a.name).join(", "),
  album: t.album.name,
  // Smallest image that is still at least 64px, to keep the page light.
  image: [...t.album.images].reverse().find((img) => img.width >= 64)?.url ?? t.album.images[0]?.url ?? null,
  url: t.external_urls.spotify,
}));

// Spotify no longer returns preview clips to new apps, so find a 30s preview elsewhere.
// Deezer preview links expire, so only its track id is stored and the page fetches a fresh
// link on click; iTunes preview links are stable and stored as-is.
const norm = (s) => s.toLowerCase().replace(/\(.*?\)|\[.*?\]|feat\..*$/g, "").replace(/[^a-z0-9]/g, "");

async function findPreview(name, artists) {
  const first = artists.split(",")[0].trim();
  const same = (title, artist) => norm(title) === norm(name) && norm(artist).includes(norm(first));
  try {
    const q = `${name.replace(/\(.*?\)/g, "").trim()} ${first}`;
    const dz = await (await fetch("https://api.deezer.com/search?" + new URLSearchParams({ q, limit: "25" }))).json();
    const hit = (dz.data ?? []).find((x) => x.preview && same(x.title, x.artist.name));
    if (hit) return { source: "deezer", id: hit.id };
  } catch {}
  try {
    const params = new URLSearchParams({ term: `${name} ${first}`, media: "music", entity: "song", limit: "25" });
    const it = await (await fetch("https://itunes.apple.com/search?" + params)).json();
    const hit = (it.results ?? []).find((x) => x.previewUrl && same(x.trackName, x.artistName));
    if (hit) return { source: "itunes", url: hit.previewUrl };
  } catch {}
  return null;
}

for (const t of tracks) t.preview = await findPreview(t.name, t.artists);

writeFileSync(out, JSON.stringify({ updated: new Date().toISOString(), tracks }, null, 2) + "\n");
console.log(`wrote ${tracks.length} tracks to ${out}:`);
tracks.forEach((t, i) => console.log(`  ${i + 1}. ${t.name} - ${t.artists} [preview: ${t.preview?.source ?? "none"}]`));
