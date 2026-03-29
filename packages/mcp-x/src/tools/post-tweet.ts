import { z } from "zod";
import { twitterClient } from "../auth.js";

export const postTweetSchema = z.object({
  text: z
    .string()
    .max(280)
    .describe("Tweet text (max 280 characters)"),
  reply_to_id: z
    .string()
    .optional()
    .describe("Tweet ID to reply to (optional)"),
});

export async function postTweet(
  input: z.infer<typeof postTweetSchema>,
): Promise<{ tweet_id: string; text: string }> {
  const params: Parameters<typeof twitterClient.v2.tweet>[0] = {
    text: input.text,
  };

  if (input.reply_to_id) {
    params.reply = { in_reply_to_tweet_id: input.reply_to_id };
  }

  const result = await twitterClient.v2.tweet(params);

  return {
    tweet_id: result.data.id,
    text: result.data.text,
  };
}
