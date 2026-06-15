import { describe, expect, it } from "vitest";
import { applyPaperclipGeminiSettings } from "./settings.js";

describe("applyPaperclipGeminiSettings", () => {
  it("adds trusted directories and a Paperclip chat override without touching built-in overrides", () => {
    const result = applyPaperclipGeminiSettings(
      {
        trustedDirectories: ["/existing"],
        modelConfigs: {
          overrides: [
            {
              match: { model: "chat-base", isRetry: true },
              modelConfig: { generateContentConfig: { temperature: 1 } },
            },
          ],
        },
      },
      {
        trustedDirectories: ["/existing", "/paperclip", "/workspace"],
        suppressThoughtsModel: "gemini-2.0-flash",
      },
    );

    expect(result.changed).toBe(true);
    expect(result.trustedDirectoriesAdded).toEqual(["/paperclip", "/workspace"]);
    expect(result.thoughtsOverrideChanged).toBe(true);
    expect(result.settings.trustedDirectories).toEqual(["/existing", "/paperclip", "/workspace"]);

    const modelConfigs = result.settings.modelConfigs as Record<string, unknown>;
    expect(modelConfigs.overrides).toEqual([
      {
        match: { model: "chat-base", isRetry: true },
        modelConfig: { generateContentConfig: { temperature: 1 } },
      },
    ]);
    expect(modelConfigs.customOverrides).toEqual([
      {
        match: {
          model: "gemini-2.0-flash",
          isChatModel: true,
          overrideScope: "core",
        },
        modelConfig: {
          generateContentConfig: {
            thinkingConfig: {
              includeThoughts: false,
            },
          },
        },
      },
    ]);
  });

  it("updates an existing Paperclip override in place and preserves sibling config", () => {
    const result = applyPaperclipGeminiSettings(
      {
        modelConfigs: {
          customOverrides: [
            {
              match: {
                model: "gemini-2.0-flash",
                isChatModel: true,
                overrideScope: "core",
              },
              modelConfig: {
                generateContentConfig: {
                  temperature: 0.2,
                  thinkingConfig: {
                    includeThoughts: true,
                    thinkingBudget: 1024,
                  },
                },
              },
            },
          ],
        },
      },
      {
        suppressThoughtsModel: "gemini-2.0-flash",
      },
    );

    expect(result.changed).toBe(true);
    expect(result.thoughtsOverrideChanged).toBe(true);
    expect(result.settings).toEqual({
      modelConfigs: {
        customOverrides: [
          {
            match: {
              model: "gemini-2.0-flash",
              isChatModel: true,
              overrideScope: "core",
            },
            modelConfig: {
              generateContentConfig: {
                temperature: 0.2,
                thinkingConfig: {
                  includeThoughts: false,
                  thinkingBudget: 1024,
                },
              },
            },
          },
        ],
      },
    });
  });

  it("is a no-op when the Paperclip override is already present", () => {
    const input = {
      trustedDirectories: ["/paperclip"],
      modelConfigs: {
        customOverrides: [
          {
            match: {
              model: "gemini-2.0-flash",
              isChatModel: true,
              overrideScope: "core",
            },
            modelConfig: {
              generateContentConfig: {
                thinkingConfig: {
                  includeThoughts: false,
                },
              },
            },
          },
        ],
      },
    };

    const result = applyPaperclipGeminiSettings(input, {
      trustedDirectories: ["/paperclip"],
      suppressThoughtsModel: "gemini-2.0-flash",
    });

    expect(result.changed).toBe(false);
    expect(result.trustedDirectoriesAdded).toEqual([]);
    expect(result.thoughtsOverrideChanged).toBe(false);
    expect(result.settings).toEqual(input);
  });
});
