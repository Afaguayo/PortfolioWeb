// One-time setup: log in to Spotify and store the credentials as GitHub Actions secrets.
// Usage (from my-portfolio/):
//   SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... node scripts/spotify-auth.mjs
// The Spotify app must list http://127.0.0.1:8888/callback as a Redirect URI.
import { createServer } from "node:http";
import { spawnSync } from "node:child_process";

const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret } = process.env;
if (!id || !secret) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET first.");
  process.exit(1);
}

const REDIRECT = "http://127.0.0.1:8888/callback";
const REPO = "Afaguayo/PortfolioWeb";
const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({ client_id: id, response_type: "code", redirect_uri: REDIRECT, scope: "user-top-read" });

function setSecret(name, value) {
  // Value goes through stdin so it never shows up in the process list.
  const r = spawnSync("gh", ["secret", "set", name, "--repo", REPO], { input: value, encoding: "utf8" });
  if (r.status !== 0) throw new Error(`gh secret set ${name} failed: ${r.stderr}`);
  console.log(`  saved secret ${name}`);
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT);
  if (url.pathname !== "/callback") return res.writeHead(404).end();
  const code = url.searchParams.get("code");
  if (!code) {
    res.end("Spotify did not return a code: " + (url.searchParams.get("error") ?? "unknown"));
    return server.close();
  }
  try {
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: REDIRECT }),
    });
    if (!tokenRes.ok) throw new Error(`${tokenRes.status} ${await tokenRes.text()}`);
    const { refresh_token } = await tokenRes.json();
    setSecret("SPOTIFY_CLIENT_ID", id);
    setSecret("SPOTIFY_CLIENT_SECRET", secret);
    setSecret("SPOTIFY_REFRESH_TOKEN", refresh_token);
    res.end("Done! Spotify is connected. You can close this tab.");
    console.log("Spotify connected. Run the 'Spotify top 5' workflow once to fill the site.");
  } catch (err) {
    res.end("Failed: " + err.message);
    console.error(err);
    process.exitCode = 1;
  }
  server.close();
});

server.listen(8888, "127.0.0.1", () => {
  console.log("Opening Spotify login...\nIf nothing opens, visit:\n" + authUrl);
  spawnSync(process.platform === "darwin" ? "open" : "xdg-open", [authUrl]);
});
