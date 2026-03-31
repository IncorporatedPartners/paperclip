#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import {
  sendEmail,
  sendEmailSchema,
} from "./tools/send-email.js";
import {
  readTracker,
  readTrackerSchema,
  writeTracker,
  writeTrackerSchema,
  updateTrackerRow,
  updateTrackerRowSchema,
} from "./tools/sheets.js";

const server = new McpServer({
  name: "labelhead-google",
  version: "0.1.0",
});

// ── Gmail ────────────────────────────────────────────────────────────

server.tool(
  "send_email",
  "Send an email from a LabelHead identity (The Capitalist, The Dealmaker, or The Curator). " +
    "Uses Gmail 'Send mail as' aliases on the primary account.",
  {
    from_identity: z
      .enum(["capitalist", "dealmaker", "curator"])
      .describe(
        "capitalist = geoffrey@labelhead.co, dealmaker = partnerships@labelhead.co, curator = scouting@labelhead.co",
      ),
    to: z.string().describe("Recipient email address"),
    subject: z.string().describe("Email subject line"),
    body_html: z.string().describe("Email body (HTML)"),
    cc: z.string().optional().describe("CC address"),
    bcc: z.string().optional().describe("BCC address"),
  },
  async (args) => {
    const input = sendEmailSchema.parse(args);
    const result = await sendEmail(input);
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

// ── Google Sheets — Read ─────────────────────────────────────────────

server.tool(
  "read_tracker",
  "Read rows from a LabelHead tracker sheet.",
  {
    tracker: z
      .enum([
        "vc_pipeline",
        "sponsor_pipeline",
        "waitlist",
        "candidate_tracker",
        "weekly_founder_input",
        "weekly_syndicate_output",
        "journalist_articles",
        "newsletter_acquisition_pipeline",
      ])
      .describe("Which tracker to read"),
    range: z
      .string()
      .optional()
      .describe("A1 range (e.g. 'A1:F50'). Omit for all data."),
    limit: z
      .number()
      .optional()
      .describe("Max data rows to return (excludes header)"),
  },
  async (args) => {
    const input = readTrackerSchema.parse(args);
    const result = await readTracker(input);
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

// ── Google Sheets — Append ───────────────────────────────────────────

server.tool(
  "append_tracker",
  "Append new rows to a LabelHead tracker sheet.",
  {
    tracker: z
      .enum([
        "vc_pipeline",
        "sponsor_pipeline",
        "waitlist",
        "candidate_tracker",
        "weekly_founder_input",
        "weekly_syndicate_output",
        "journalist_articles",
        "newsletter_acquisition_pipeline",
      ])
      .describe("Which tracker to append to"),
    rows: z
      .array(z.array(z.string()))
      .min(1)
      .describe("Rows to append. Each row is an array of cell values."),
  },
  async (args) => {
    const input = writeTrackerSchema.parse(args);
    const result = await writeTracker(input);
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

// ── Google Sheets — Update Row ───────────────────────────────────────

server.tool(
  "update_tracker_row",
  "Update a specific row in a LabelHead tracker sheet by row number.",
  {
    tracker: z
      .enum([
        "vc_pipeline",
        "sponsor_pipeline",
        "waitlist",
        "candidate_tracker",
        "weekly_founder_input",
        "weekly_syndicate_output",
        "journalist_articles",
        "newsletter_acquisition_pipeline",
      ])
      .describe("Which tracker to update"),
    row_number: z
      .number()
      .describe("1-based row number (row 1 is usually the header)"),
    values: z
      .array(z.string())
      .describe("Cell values starting from column A"),
  },
  async (args) => {
    const input = updateTrackerRowSchema.parse(args);
    const result = await updateTrackerRow(input);
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
