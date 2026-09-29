// JSON written by .github/workflows/live-feeds.yml onto the `live-data` branch,
// so refreshing Spotify/Steam never triggers a site rebuild.
const BASE = "https://raw.githubusercontent.com/Afaguayo/PortfolioWeb/live-data";

export async function loadFeed<T>(file: string): Promise<T> {
  // Cache-bust per 10 minutes so the CDN copy stays fresh without refetching every visit.
  const bucket = Math.floor(Date.now() / 600000);
  const res = await fetch(`${BASE}/${file}?v=${bucket}`);
  if (!res.ok) throw new Error(`${file}: ${res.status}`);
  return res.json();
}
