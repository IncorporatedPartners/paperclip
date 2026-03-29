/**
 * Creates the LabelHead tracker spreadsheet with four tabs and headers.
 * Outputs the spreadsheet ID to store as GOOGLE_SHEET_ID in Railway.
 *
 * Usage:
 *   GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=... GOOGLE_REFRESH_TOKEN=... \
 *     npx tsx scripts/create-tracker-sheet.ts
 */

import { google } from "googleapis";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  console.error("Missing GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, or GOOGLE_REFRESH_TOKEN");
  process.exit(1);
}

const auth = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
auth.setCredentials({ refresh_token: REFRESH_TOKEN });
const sheets = google.sheets({ version: "v4", auth });

const TABS = [
  {
    title: "VC Pipeline",
    headers: ["Fund", "Partner", "Email", "Stage", "Amount", "Status", "Last Contact", "Next Step", "Notes"],
  },
  {
    title: "Sponsor Pipeline",
    headers: ["Brand", "Contact", "Email", "Category", "Deal Value", "Status", "Last Contact", "Next Step", "Notes"],
  },
  {
    title: "Waitlist",
    headers: ["Name", "Email", "Role", "Referral", "Signed Up", "Status", "Notes"],
  },
  {
    title: "Candidate Tracker",
    headers: ["Artist", "Genre", "Spotify URL", "Monthly Listeners", "Score", "Stage", "Contacted", "Notes"],
  },
];

// Create spreadsheet with all four sheets
const res = await sheets.spreadsheets.create({
  requestBody: {
    properties: { title: "LabelHead Paperclip — Trackers" },
    sheets: TABS.map((tab) => ({
      properties: { title: tab.title },
    })),
  },
});

const spreadsheetId = res.data.spreadsheetId!;

// Write headers to each tab
for (const tab of TABS) {
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${tab.title}'!A1`,
    valueInputOption: "RAW",
    requestBody: { values: [tab.headers] },
  });
}

console.log("\n=== Spreadsheet Created ===\n");
console.log("Title: LabelHead Paperclip — Trackers");
console.log("URL:  ", `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`);
console.log("\nSpreadsheet ID (store as GOOGLE_SHEET_ID in Railway):\n");
console.log(spreadsheetId);
console.log();
