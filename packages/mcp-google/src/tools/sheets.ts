import { z } from "zod";
import { sheets } from "../auth.js";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
if (!SHEET_ID) {
  throw new Error("Missing required env var: GOOGLE_SHEET_ID");
}

/**
 * Maps logical tracker names to the actual tab/sheet names inside the
 * single Google Spreadsheet identified by GOOGLE_SHEET_ID.
 */
const TRACKERS = {
  vc_pipeline: "VC Pipeline",
  sponsor_pipeline: "Sponsor Pipeline",
  waitlist: "Waitlist",
  candidate_tracker: "Candidate Tracker",
} as const;

export type TrackerName = keyof typeof TRACKERS;

// ── Schemas ──────────────────────────────────────────────────────────

export const readTrackerSchema = z.object({
  tracker: z
    .enum(["vc_pipeline", "sponsor_pipeline", "waitlist", "candidate_tracker"])
    .describe("Which tracker sheet to read"),
  range: z
    .string()
    .optional()
    .describe(
      "Optional A1 cell range within the sheet (e.g. 'A1:F50'). Defaults to entire sheet.",
    ),
  limit: z
    .number()
    .int()
    .positive()
    .optional()
    .describe("Max rows to return (excluding header). Defaults to all rows."),
});

export const writeTrackerSchema = z.object({
  tracker: z
    .enum(["vc_pipeline", "sponsor_pipeline", "waitlist", "candidate_tracker"])
    .describe("Which tracker sheet to append to"),
  rows: z
    .array(z.array(z.string()))
    .min(1)
    .describe("Array of rows to append. Each row is an array of cell values."),
});

export const updateTrackerRowSchema = z.object({
  tracker: z
    .enum(["vc_pipeline", "sponsor_pipeline", "waitlist", "candidate_tracker"])
    .describe("Which tracker sheet to update"),
  row_number: z
    .number()
    .int()
    .min(1)
    .describe("1-based row number to update (row 1 is typically the header)"),
  values: z
    .array(z.string())
    .min(1)
    .describe(
      "Cell values for the row, starting from column A. Empty strings leave cells unchanged.",
    ),
});

// ── Implementations ──────────────────────────────────────────────────

export async function readTracker(
  input: z.infer<typeof readTrackerSchema>,
): Promise<{ headers: string[]; rows: string[][]; totalRows: number }> {
  const tabName = TRACKERS[input.tracker];
  const range = input.range ? `'${tabName}'!${input.range}` : `'${tabName}'`;

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range,
  });

  const allRows = res.data.values ?? [];
  const headers = allRows[0] ?? [];
  let dataRows = allRows.slice(1);
  const totalRows = dataRows.length;

  if (input.limit && input.limit < dataRows.length) {
    dataRows = dataRows.slice(0, input.limit);
  }

  return {
    headers: headers as string[],
    rows: dataRows as string[][],
    totalRows,
  };
}

export async function writeTracker(
  input: z.infer<typeof writeTrackerSchema>,
): Promise<{ updatedRows: number }> {
  const tabName = TRACKERS[input.tracker];

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `'${tabName}'!A:A`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: input.rows },
  });

  return {
    updatedRows: res.data.updates?.updatedRows ?? 0,
  };
}

export async function updateTrackerRow(
  input: z.infer<typeof updateTrackerRowSchema>,
): Promise<{ updatedCells: number }> {
  const tabName = TRACKERS[input.tracker];
  const range = `'${tabName}'!A${input.row_number}`;

  const res = await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [input.values] },
  });

  return {
    updatedCells: res.data.updatedCells ?? 0,
  };
}
