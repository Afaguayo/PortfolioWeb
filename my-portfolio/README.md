# ANGEL.OS: portfolio

Black & white cyber angel × 8-bit DOS. Next.js static export, deployed free to GitHub Pages at https://afaguayo.github.io/PortfolioWeb/ by `.github/workflows/pages.yml` on every push to main.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

## What updates by itself
| Thing | How |
|---|---|
| Age ("LEVEL") | Computed in the visitor's browser from the birthday in `src/lib/content.ts`, so it goes up every Nov 30 with no redeploy. |
| Projects | Fetched live from `api.github.com/users/Afaguayo/repos` (public, non-fork, non-archived, newest first). Hide a repo with `HIDDEN_REPOS` in `src/lib/content.ts`. A repo's GitHub description and homepage show up on its card. |
| Spotify top 5 | `.github/workflows/live-feeds.yml` runs every 6 hours and writes `spotify.json` to the `live-data` branch; the page reads it from raw.githubusercontent.com. No rebuild needed. |
| Steam top 5 | Same workflow writes `steam.json`: most-played games over the last 30 days, computed from daily playtime snapshots in `steam-history.json` (Steam's API has no monthly stat). Until 30 days of snapshots exist it shows Steam's last-2-weeks numbers and says so. |

All text (EN/ES) and contact info live in `src/lib/content.ts`.

## Connecting Spotify (one time)
1. Go to https://developer.spotify.com/dashboard → **Create app**. Any name; Redirect URI `http://127.0.0.1:8888/callback`; API: **Web API**.
2. Copy the app's **Client ID** and **Client secret**, then from `my-portfolio/` run:
   ```bash
   SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/spotify-auth.mjs
   ```
   It opens Spotify, you click **Agree**, and it saves the three `SPOTIFY_*` secrets to this repo with `gh`.
3. Run the feeds once: `gh workflow run "Live feeds" --repo Afaguayo/PortfolioWeb`.

## Connecting Steam (one time)
1. Get a Web API key at https://steamcommunity.com/dev/apikey.
2. Steam profile → Edit Profile → Privacy Settings → **Game details: Public**.
3. Save the key and your SteamID64 (or custom profile name) as secrets:
   ```bash
   gh secret set STEAM_API_KEY --repo Afaguayo/PortfolioWeb
   gh secret set STEAM_ID --repo Afaguayo/PortfolioWeb
   ```
