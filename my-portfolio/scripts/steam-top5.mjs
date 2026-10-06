// Write my top 5 most-played Steam games of the last 30 days as JSON.
// Usage: node scripts/steam-top5.mjs <data-dir>
// Needs STEAM_API_KEY and STEAM_ID (SteamID64 or custom profile name).
//
// Steam's API only reports all-time and last-2-weeks playtime, so each run saves a daily
// snapshot of all-time minutes to <data-dir>/steam-history.json. Once a snapshot from
// 30+ days ago exists, "this month" = now minus that snapshot; until then it falls back
// to Steam's last-2-weeks numbers and says so in the feed (window: "2weeks").
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Optional filter from the STEAM_FILTER env var (JSON: { appids, names, flags }), kept out of
// the repo. Games matching an appid or name fragment, or carrying one of the store's content
// flags, are skipped. Fails open if the store API errors, so a flaky request never empties the list.
const filter = JSON.parse(process.env.STEAM_FILTER || "{}");
const { appids = [], names = [], flags = [] } = filter;
const skippedByList = (g) =>
  appids.includes(g.appid) || names.some((n) => g.name?.toLowerCase().includes(n.toLowerCase()));
async function skippedByFlags(appid) {
  if (!flags.length) return false;
  try {
    const res = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appid}&filters=content_descriptors`);
    if (!res.ok) return false;
    const ids = (await res.json())?.[appid]?.data?.content_descriptors?.ids ?? [];
    return ids.some((id) => flags.includes(id));
  } catch {
    return false;
  }
}

const { STEAM_API_KEY: key, STEAM_ID: idOrName } = process.env;
const dir = process.argv[2] ?? ".";
const HISTORY = join(dir, "steam-history.json");
const DAY = 86400000;

if (!key || !idOrName) {
  console.error("Missing STEAM_API_KEY / STEAM_ID");
  process.exit(1);
}

async function api(path, params) {
  const url = `https://api.steampowered.com/${path}?` + new URLSearchParams({ key, ...params });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${path} failed: ${res.status}`);
  return res.json();
}

// Accept a vanity name (steamcommunity.com/id/<name>) as well as a numeric SteamID64.
let steamid = idOrName;
if (!/^\d{17}$/.test(idOrName)) {
  const { response } = await api("ISteamUser/ResolveVanityURL/v1/", { vanityurl: idOrName });
  if (response.success !== 1) throw new Error(`could not resolve Steam profile "${idOrName}"`);
  steamid = response.steamid;
}

const { response } = await api("IPlayerService/GetOwnedGames/v1/", {
  steamid,
  include_appinfo: "1",
  include_played_free_games: "1",
});
if (!response.games) {
  throw new Error("no games returned: set Steam profile > Privacy > Game details to Public");
}
const games = response.games;

// Record today's snapshot (one per day) and keep 45 days of history.
const today = new Date().toISOString().slice(0, 10);
const history = existsSync(HISTORY) ? JSON.parse(readFileSync(HISTORY, "utf8")) : { snapshots: [] };
history.snapshots = history.snapshots.filter((s) => s.date !== today);
history.snapshots.push({ date: today, playtime: Object.fromEntries(games.map((g) => [g.appid, g.playtime_forever])) });
history.snapshots = history.snapshots
  .filter((s) => Date.parse(today) - Date.parse(s.date) <= 45 * DAY)
  .sort((a, b) => a.date.localeCompare(b.date));
writeFileSync(HISTORY, JSON.stringify(history) + "\n");

// Newest snapshot that is at least 30 days old = start of "this month".
const baseline = [...history.snapshots].reverse().find((s) => Date.parse(today) - Date.parse(s.date) >= 30 * DAY);
const minutes = (g) =>
  baseline ? g.playtime_forever - (baseline.playtime[g.appid] ?? 0) : g.playtime_2weeks ?? 0;

// Walk games by playtime and keep the first 5 that pass the filter.
const ranked = games
  .map((g) => ({ g, m: minutes(g) }))
  .filter(({ m }) => m > 0)
  .sort((a, b) => b.m - a.m);

const top = [];
for (const { g, m } of ranked) {
  if (top.length === 5) break;
  if (skippedByList(g) || (await skippedByFlags(g.appid))) continue;
  top.push({
    name: g.name,
    hours: Math.round((m / 60) * 10) / 10,
    image: `https://cdn.cloudflare.steamstatic.com/steam/apps/${g.appid}/capsule_184x69.jpg`,
    url: `https://store.steampowered.com/app/${g.appid}/`,
  });
}

const feed = { updated: new Date().toISOString(), window: baseline ? "month" : "2weeks", games: top };
writeFileSync(join(dir, "steam.json"), JSON.stringify(feed, null, 2) + "\n");
console.log(`wrote ${top.length} games (${feed.window}):`);
top.forEach((g, i) => console.log(`  ${i + 1}. ${g.name}: ${g.hours} h`));
