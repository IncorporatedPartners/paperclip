#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { postTweet, postTweetSchema } from "./tools/post-tweet.js";
import { sendDm, sendDmSchema } from "./tools/send-dm.js";

const server = new McpServer({
  name: "labelhead-x",
  version: "0.1.0",
});

// ── Post Tweet ───────────────────────────────────────────────────────

server.tool(
  "post_tweet",
  "Post a tweet from the LabelHead X/Twitter account.",
  {
    text: z.string().max(280).describe("Tweet text (max 280 characters)"),
    reply_to_id: z.string().optional().describe("Tweet ID to reply to"),
  },
  async (args) => {
    const input = postTweetSchema.parse(args);
    const result = await postTweet(input);
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  },
);

// ── Send DM ──────────────────────────────────────────────────────────

server.tool(
  "send_dm",
  "Send a direct message on X/Twitter to a user by username.",
  {
    recipient_username: z
      .string()
      .describe("Username without @ (e.g. 'labelhead')"),
    text: z.string().max(10000).describe("Message text"),
  },
  async (args) => {
    const input = sendDmSchema.parse(args);
    const result = await sendDm(input);
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  },
);

// ── Start ────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
