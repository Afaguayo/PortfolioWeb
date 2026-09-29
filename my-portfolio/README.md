# ANGEL.OS: portfolio

Original Xbox dashboard × DOS prompt × Y2K chrome. Next.js static export, hosted on AWS Amplify (`amplify.yml` at the repo root).

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
| Spotify top 5 | `.github/workflows/spotify-top5.yml` runs every 6 hours, writes `spotify.json` to the `spotify-data` branch, and the page reads it from raw.githubusercontent.com. No rebuild needed. |

All text (EN/ES) and contact info live in `src/lib/content.ts`.

## Connecting Spotify (one time)
1. Go to https://developer.spotify.com/dashboard → **Create app**. Any name; Redirect URI `http://127.0.0.1:8888/callback`; API: **Web API**.
2. Copy the app's **Client ID** and **Client secret**, then from `my-portfolio/` run:
   ```bash
   SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/spotify-auth.mjs
   ```
   It opens Spotify, you click **Agree**, and it saves the three `SPOTIFY_*` secrets to this repo with `gh`.
3. Run the workflow once: `gh workflow run "Spotify top 5" --repo Afaguayo/PortfolioWeb` (scheduled runs only start after the workflow is on `main`).
