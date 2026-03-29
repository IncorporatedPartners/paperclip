/**
 * One-time Google OAuth2 setup script.
 *
 * Usage:
 *   GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=... npx tsx scripts/google-oauth-setup.ts
 *
 * 1. Starts a temporary local server on port 3456.
 * 2. Opens an authorization URL — visit it in your browser.
 * 3. Google redirects back to localhost with the auth code.
 * 4. Script exchanges the code for a refresh token and prints it.
 * 5. Store the refresh token as GOOGLE_REFRESH_TOKEN in Railway.
 *
 * Before running, ensure http://localhost:3456/callback is listed as an
 * authorized redirect URI in your Google Cloud Console OAuth client.
 */

import { createServer } from "node:http";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables first.",
  );
  process.exit(1);
}

const PORT = 3456;
const REDIRECT_URI = `http://localhost:${PORT}/callback`;

const SCOPES = [
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/drive.file",
];

// ---------- Build authorization URL ----------

const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
authUrl.searchParams.set("client_id", CLIENT_ID);
authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("scope", SCOPES.join(" "));
authUrl.searchParams.set("access_type", "offline");
authUrl.searchParams.set("prompt", "consent");

console.log("\n=== Google OAuth2 Setup ===\n");
console.log(
  "First, add this redirect URI to your Google Cloud Console OAuth client:",
);
console.log(`\n  ${REDIRECT_URI}\n`);
console.log(
  "Then open this URL in your browser (the script will wait for the redirect):\n",
);
console.log(authUrl.toString());
console.log("\nWaiting for authorization...\n");

// ---------- Temporary local server to catch the redirect ----------

const code = await new Promise<string>((resolve, reject) => {
  const server = createServer((req, res) => {
    const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);

    if (url.pathname !== "/callback") {
      res.writeHead(404);
      res.end();
      return;
    }

    const error = url.searchParams.get("error");
    if (error) {
      res.writeHead(400, { "Content-Type": "text/html" });
      res.end(`<h2>Authorization failed: ${error}</h2><p>You can close this tab.</p>`);
      server.close();
      reject(new Error(`OAuth error: ${error}`));
      return;
    }

    const authCode = url.searchParams.get("code");
    if (!authCode) {
      res.writeHead(400, { "Content-Type": "text/html" });
      res.end("<h2>No code in redirect.</h2>");
      server.close();
      reject(new Error("No authorization code in redirect"));
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      "<h2>Authorization successful!</h2><p>You can close this tab and return to the terminal.</p>",
    );
    server.close();
    resolve(authCode);
  });

  server.listen(PORT, "localhost", () => {
    // Server is listening
  });

  server.on("error", reject);
});

// ---------- Exchange code for tokens ----------

console.log("Authorization received. Exchanging for refresh token...\n");

const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code",
  }),
});

if (!tokenRes.ok) {
  const err = await tokenRes.text();
  console.error("Token exchange failed:", err);
  process.exit(1);
}

const tokens = (await tokenRes.json()) as {
  refresh_token?: string;
  access_token?: string;
  scope?: string;
};

if (!tokens.refresh_token) {
  console.error(
    "No refresh_token returned. The app may already be authorized.",
  );
  console.error(
    "Revoke access at https://myaccount.google.com/permissions then re-run.",
  );
  process.exit(1);
}

console.log("=== Success ===\n");
console.log("Refresh token (store as GOOGLE_REFRESH_TOKEN in Railway):\n");
console.log(tokens.refresh_token);
console.log("\nGranted scopes:", tokens.scope);
console.log();
