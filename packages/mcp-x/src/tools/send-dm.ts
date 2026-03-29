import { z } from "zod";
import { twitterClient } from "../auth.js";

export const sendDmSchema = z.object({
  recipient_username: z
    .string()
    .describe("X/Twitter username of the recipient (without @)"),
  text: z.string().max(10000).describe("Direct message text"),
});

export async function sendDm(
  input: z.infer<typeof sendDmSchema>,
): Promise<{ dm_conversation_id: string; dm_event_id: string }> {
  // Resolve username to user ID
  const user = await twitterClient.v2.userByUsername(input.recipient_username);
  if (!user.data) {
    throw new Error(`User @${input.recipient_username} not found`);
  }

  const result = await twitterClient.v2.sendDmToParticipant(user.data.id, {
    text: input.text,
  });

  return {
    dm_conversation_id: result.dm_conversation_id,
    dm_event_id: result.dm_event_id,
  };
}
