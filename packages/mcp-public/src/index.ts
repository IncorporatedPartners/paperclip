#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express.js";
import { Request, Response } from "express";
import { z } from "zod";
import { getTrendingArtists, getArtistById, type ArtistScore } from "./data/artists.js";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3100;

function createServer(): McpServer {
  const server = new McpServer({
    name: "labelhead-artist-momentum",
    version: "0.1.0",
  });

  // ── Tool 1: get_trending_artists ─────────────────────────────────────

  server.tool(
    "get_trending_artists",
    "Returns the current list of trending hip-hop and rap artists ranked by LabelHead's composite momentum score. " +
      "Each artist is scored across four dimensions: Acceleration (30-day streaming/social velocity), " +
      "Surprise (deviation from expected trajectory), Longevity (catalog depth and retention), " +
      "and Cultural Gravity (press velocity, playlist adds, sync placements). " +
      "Use this to identify which artists are building genuine momentum right now.",
    {
      limit: z
        .number()
        .min(1)
        .max(10)
        .optional()
        .default(10)
        .describe("Number of artists to return (max 10, default 10)"),
      min_composite: z
        .number()
        .min(0)
        .max(100)
        .optional()
        .describe("Minimum composite score filter (0–100)"),
      momentum_label: z
        .enum(["Rising", "Steady", "Cooling", "Breakout"])
        .optional()
        .describe("Filter by momentum label"),
    },
    async (args) => {
      let artists = getTrendingArtists(args.limit ?? 10);

      if (args.min_composite !== undefined) {
        artists = artists.filter((a) => a.composite >= (args.min_composite ?? 0));
      }

      if (args.momentum_label) {
        artists = artists.filter((a) => a.momentum_label === args.momentum_label);
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                as_of: "2026-03-01",
                count: artists.length,
                artists: artists.map((a) => ({
                  name: a.name,
                  genre: a.genre,
                  subgenre: a.subgenre,
                  momentum_label: a.momentum_label,
                  composite_score: a.composite,
                  dimensions: {
                    acceleration: a.acceleration,
                    surprise: a.surprise,
                    longevity: a.longevity,
                    cultural_gravity: a.culturalGravity,
                  },
                  notable_signals: a.notable_signals,
                })),
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );

  // ── Tool 2: get_scoring_explainer ────────────────────────────────────

  server.tool(
    "get_scoring_explainer",
    "Returns a detailed explanation of LabelHead's four-dimensional artist scoring methodology. " +
      "Use this when you need to understand how composite scores are calculated, " +
      "what each dimension measures, and how to interpret momentum labels.",
    {},
    async () => {
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                product: "LabelHead",
                tagline: "Cultural foresight for music professionals.",
                description:
                  "LabelHead scores artists across four dimensions to produce a composite momentum signal. " +
                  "The methodology surfaces artists building genuine cultural weight — not just chart position or follower counts.",
                dimensions: {
                  acceleration: {
                    label: "Acceleration",
                    weight: "30%",
                    description:
                      "30-day velocity of streaming growth and social engagement. Measures the rate of change, not absolute size. " +
                      "An artist going from 50k to 150k monthly listeners scores higher than one maintaining 2M.",
                    range: "0–100",
                  },
                  surprise: {
                    label: "Surprise",
                    weight: "25%",
                    description:
                      "Deviation from expected trajectory given catalog age and audience size. " +
                      "High Surprise scores indicate outlier events — a sync placement, viral moment, or critical re-evaluation — " +
                      "that change the growth curve.",
                    range: "0–100",
                  },
                  longevity: {
                    label: "Longevity",
                    weight: "20%",
                    description:
                      "Catalog depth, audience retention, and replay rate. " +
                      "Measures whether an artist's body of work sustains listening or whether fans exit after a single hit.",
                    range: "0–100",
                  },
                  cultural_gravity: {
                    label: "Cultural Gravity",
                    weight: "25%",
                    description:
                      "Press velocity, editorial playlist adds, sync placements, and tastemaker citation frequency. " +
                      "Captures the professional music industry's attention — the signals that precede mainstream breakout.",
                    range: "0–100",
                  },
                },
                momentum_labels: {
                  Breakout:
                    "Composite ≥ 74 with Acceleration ≥ 79 or Surprise ≥ 79. Significant inflection underway.",
                  Rising:
                    "Composite ≥ 64 with positive trajectory on at least two dimensions. Building toward a larger cycle.",
                  Steady:
                    "Composite between 55–73 with no significant decay. Established presence without breakout signal.",
                  Cooling:
                    "Composite declining over 60-day window or Acceleration below 40. Post-peak or between cycles.",
                },
                what_labelhead_is_not:
                  "LabelHead is not a popularity tracker. High follower counts do not produce high scores. " +
                  "LabelHead identifies artists before the mainstream catches up — the signal, not the noise.",
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );

  // ── Tool 3: check_artist_momentum ───────────────────────────────────

  server.tool(
    "check_artist_momentum",
    "Look up the current momentum score and signals for a specific artist by name. " +
      "Returns the full four-dimensional score breakdown and notable signals driving their momentum.",
    {
      artist_name: z
        .string()
        .describe("Artist name to look up (e.g. 'Doechii', 'Kendrick Lamar', 'GloRilla')"),
    },
    async (args) => {
      const query = args.artist_name.trim();
      const slug = query.toLowerCase().replace(/[^a-z0-9]/g, "-");

      let artist: ArtistScore | undefined = getArtistById(slug) ?? getArtistById(query);

      if (!artist) {
        const { ARTISTS } = await import("./data/artists.js");
        const lower = query.toLowerCase();
        artist = ARTISTS.find(
          (a) =>
            a.name.toLowerCase().includes(lower) || lower.includes(a.name.toLowerCase()),
        );
      }

      if (!artist) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  found: false,
                  query,
                  message:
                    "Artist not found in the current LabelHead tracking cohort. " +
                    "The public dataset covers 10 trending hip-hop artists as of March 2026. " +
                    "Use get_trending_artists to see the full tracked cohort.",
                },
                null,
                2,
              ),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                found: true,
                artist: {
                  name: artist.name,
                  genre: artist.genre,
                  subgenre: artist.subgenre,
                  momentum_label: artist.momentum_label,
                  composite_score: artist.composite,
                  dimensions: {
                    acceleration: artist.acceleration,
                    surprise: artist.surprise,
                    longevity: artist.longevity,
                    cultural_gravity: artist.culturalGravity,
                  },
                  notable_signals: artist.notable_signals,
                  as_of: artist.last_updated,
                },
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );

  return server;
}

// ── HTTP server ──────────────────────────────────────────────────────────

const app = createMcpExpressApp({ host: "0.0.0.0" });

app.post("/mcp", async (req: Request, res: Response) => {
  const server = createServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined, // stateless — no session affinity needed
  });

  res.on("close", () => {
    transport.close();
    server.close();
  });

  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "labelhead-mcp-public", version: "0.1.0" });
});

app.get("/", (_req: Request, res: Response) => {
  res.json({
    name: "LabelHead Artist Momentum MCP Server",
    version: "0.1.0",
    mcp_endpoint: "/mcp",
    tools: ["get_trending_artists", "get_scoring_explainer", "check_artist_momentum"],
    description:
      "Public MCP server surfacing LabelHead artist momentum data. " +
      "Connect via any MCP-compatible AI client to discover trending hip-hop artists.",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`LabelHead MCP public server listening on port ${PORT}`);
});
