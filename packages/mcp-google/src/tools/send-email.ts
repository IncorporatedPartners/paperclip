import { z } from "zod";
import { gmail } from "../auth.js";

const IDENTITIES = {
  capitalist: {
    name: "Geoffrey — The Capitalist",
    email: "geoffrey@labelhead.co",
  },
  dealmaker: {
    name: "LabelHead Partnerships",
    email: "partnerships@labelhead.co",
  },
  curator: {
    name: "LabelHead Scouting",
    email: "scouting@labelhead.co",
  },
} as const;

export const sendEmailSchema = z.object({
  from_identity: z
    .enum(["capitalist", "dealmaker", "curator"])
    .describe(
      "Which LabelHead identity to send from: capitalist (geoffrey@), dealmaker (partnerships@), curator (scouting@)",
    ),
  to: z.string().describe("Recipient email address"),
  subject: z.string().describe("Email subject line"),
  body_html: z.string().describe("Email body in HTML"),
  cc: z.string().optional().describe("CC email address (optional)"),
  bcc: z.string().optional().describe("BCC email address (optional)"),
});

export type SendEmailInput = z.infer<typeof sendEmailSchema>;

function buildRawEmail(input: SendEmailInput): string {
  const identity = IDENTITIES[input.from_identity];

  const headers = [
    `From: ${identity.name} <${identity.email}>`,
    `To: ${input.to}`,
    `Subject: ${input.subject}`,
    "MIME-Version: 1.0",
    'Content-Type: text/html; charset="UTF-8"',
  ];

  if (input.cc) headers.push(`Cc: ${input.cc}`);
  if (input.bcc) headers.push(`Bcc: ${input.bcc}`);

  return headers.join("\r\n") + "\r\n\r\n" + input.body_html;
}

function toBase64Url(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function sendEmail(
  input: SendEmailInput,
): Promise<{ messageId: string; threadId: string }> {
  const raw = toBase64Url(buildRawEmail(input));

  const res = await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw },
  });

  return {
    messageId: res.data.id ?? "",
    threadId: res.data.threadId ?? "",
  };
}
