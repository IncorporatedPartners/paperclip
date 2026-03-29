import { TwitterApi } from "twitter-api-v2";

/**
 * X/Twitter API v2 client with user-context auth (OAuth 1.0a).
 *
 * Required env vars:
 *   X_API_KEY         — Consumer / API key
 *   X_API_SECRET      — Consumer / API secret
 *   X_ACCESS_TOKEN    — User access token
 *   X_ACCESS_SECRET   — User access token secret
 *
 * All four are needed for write operations (post tweets, send DMs).
 */

const API_KEY = process.env.X_API_KEY;
const API_SECRET = process.env.X_API_SECRET;
const ACCESS_TOKEN = process.env.X_ACCESS_TOKEN;
const ACCESS_SECRET = process.env.X_ACCESS_TOKEN_SECRET;

if (!API_KEY || !API_SECRET || !ACCESS_TOKEN || !ACCESS_SECRET) {
  throw new Error(
    "Missing X/Twitter env vars. Set X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET.",
  );
}

export const twitter = new TwitterApi({
  appKey: API_KEY,
  appSecret: API_SECRET,
  accessToken: ACCESS_TOKEN,
  accessSecret: ACCESS_SECRET,
});

export const twitterClient = twitter.readWrite;
