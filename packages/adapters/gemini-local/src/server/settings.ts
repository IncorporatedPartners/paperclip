import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import type { AdapterExecutionContext } from "@paperclipai/adapter-utils";
import { parseObject } from "@paperclipai/adapter-utils/server-utils";

const PAPERCLIP_GEMINI_OVERRIDE_SCOPE = "core";

interface ApplyPaperclipGeminiSettingsOptions {
  trustedDirectories?: string[];
  suppressThoughtsModel?: string | null;
}

interface ApplyPaperclipGeminiSettingsResult {
  settings: Record<string, unknown>;
  changed: boolean;
  trustedDirectoriesAdded: string[];
  thoughtsOverrideChanged: boolean;
}

function geminiHomePath(): string {
  return path.join(os.homedir(), ".gemini");
}

function geminiSettingsPath(): string {
  return path.join(geminiHomePath(), "settings.json");
}

function geminiProjectsRegistryPath(): string {
  return path.join(geminiHomePath(), "projects.json");
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === "string") : [];
}

function hasPaperclipThoughtsOverride(value: unknown, model: string): boolean {
  const override = parseObject(value);
  const match = parseObject(override.match);
  return (
    match.model === model &&
    match.isChatModel === true &&
    match.overrideScope === PAPERCLIP_GEMINI_OVERRIDE_SCOPE
  );
}

export function applyPaperclipGeminiSettings(
  settings: Record<string, unknown>,
  options: ApplyPaperclipGeminiSettingsOptions,
): ApplyPaperclipGeminiSettingsResult {
  let changed = false;
  const nextSettings: Record<string, unknown> = { ...settings };
  const trustedDirectoriesAdded: string[] = [];

  const trustedDirectories = new Set(
    asStringArray(nextSettings.trustedDirectories).map((entry) => entry.trim()).filter(Boolean),
  );
  for (const directory of options.trustedDirectories ?? []) {
    const normalized = directory.trim();
    if (!normalized || trustedDirectories.has(normalized)) continue;
    trustedDirectories.add(normalized);
    trustedDirectoriesAdded.push(normalized);
  }
  if (trustedDirectoriesAdded.length > 0) {
    nextSettings.trustedDirectories = Array.from(trustedDirectories);
    changed = true;
  }

  let thoughtsOverrideChanged = false;
  const model = options.suppressThoughtsModel?.trim() ?? "";
  if (model) {
    const modelConfigs = parseObject(nextSettings.modelConfigs);
    const customOverrides = Array.isArray(modelConfigs.customOverrides)
      ? [...modelConfigs.customOverrides]
      : [];

    const existingIndex = customOverrides.findIndex((entry) => hasPaperclipThoughtsOverride(entry, model));
    if (existingIndex >= 0) {
      const existingOverride = parseObject(customOverrides[existingIndex]);
      const existingMatch = parseObject(existingOverride.match);
      const existingModelConfig = parseObject(existingOverride.modelConfig);
      const generateContentConfig = parseObject(existingModelConfig.generateContentConfig);
      const thinkingConfig = parseObject(generateContentConfig.thinkingConfig);

      if (thinkingConfig.includeThoughts !== false) {
        customOverrides[existingIndex] = {
          ...existingOverride,
          match: {
            ...existingMatch,
            model,
            isChatModel: true,
            overrideScope: PAPERCLIP_GEMINI_OVERRIDE_SCOPE,
          },
          modelConfig: {
            ...existingModelConfig,
            generateContentConfig: {
              ...generateContentConfig,
              thinkingConfig: {
                ...thinkingConfig,
                includeThoughts: false,
              },
            },
          },
        };
        thoughtsOverrideChanged = true;
      }
    } else {
      customOverrides.push({
        match: {
          model,
          isChatModel: true,
          overrideScope: PAPERCLIP_GEMINI_OVERRIDE_SCOPE,
        },
        modelConfig: {
          generateContentConfig: {
            thinkingConfig: {
              includeThoughts: false,
            },
          },
        },
      });
      thoughtsOverrideChanged = true;
    }

    if (thoughtsOverrideChanged) {
      nextSettings.modelConfigs = {
        ...modelConfigs,
        customOverrides,
      };
      changed = true;
    }
  }

  return {
    settings: nextSettings,
    changed,
    trustedDirectoriesAdded,
    thoughtsOverrideChanged,
  };
}

/**
 * Purge ephemeral gemini-cli state (sessions, checkpoints, logs) from
 * `~/.gemini/tmp/`.  On Railway the Gemini home is a persistent volume
 * (`/paperclip/.gemini/`), so stale checkpoint files survive container
 * restarts.  gemini-cli 0.34.0's `cleanupCheckpoints()` startup routine
 * crashes when it encounters checkpoint files whose project registry entries
 * are missing — the lookup returns `undefined` and the code dereferences it.
 *
 * Removing the `tmp/` tree before each run sidesteps this bug entirely and
 * keeps the volume from growing without bound.
 *
 * Preserved files/directories:
 *   settings.json, projects.json, skills/, extensions/, .env,
 *   trustedFolders.json, extension-enablement.json, policies/
 */
async function purgeGeminiEphemeralState(
  onLog: AdapterExecutionContext["onLog"],
  overrideGeminiHome?: string,
): Promise<void> {
  const geminiHome = overrideGeminiHome ?? geminiHomePath();
  const preserveNames = new Set([
    "settings.json",
    "projects.json",
    "skills",
    "extensions",
    ".env",
    "trustedFolders.json",
    "extension-enablement.json",
    "policies",
  ]);

  try {
    const entries = await fs.readdir(geminiHome, { withFileTypes: true });
    let purgedCount = 0;
    for (const entry of entries) {
      if (preserveNames.has(entry.name)) continue;
      const entryPath = path.join(geminiHome, entry.name);
      try {
        await fs.rm(entryPath, { recursive: true, force: true });
        purgedCount++;
      } catch (err) {
        await onLog(
          "stderr",
          `[paperclip] Warning: could not remove ${entryPath}: ${err instanceof Error ? err.message : String(err)}\n`,
        );
      }
    }
    if (purgedCount > 0) {
      await onLog("stderr", `[paperclip] Purged ${purgedCount} ephemeral item(s) from ${geminiHome}\n`);
    }
  } catch {
    // Directory doesn't exist yet — nothing to purge.
  }
}

/**
 * Gemini CLI 0.34.x can inherit `includeThoughts: true` from `chat-base` even
 * when Paperclip asks for a raw model like `gemini-2.0-flash`. In headless
 * runs that can surface as a silent post-tool crash, so we pin a Paperclip
 * custom override that suppresses thought streaming for the active chat model.
 */
export async function ensurePaperclipGeminiSettings(
  onLog: AdapterExecutionContext["onLog"],
  options: ApplyPaperclipGeminiSettingsOptions,
): Promise<void> {
  const settingsPath = geminiSettingsPath();
  const projectsRegistryPath = geminiProjectsRegistryPath();
  try {
    await fs.mkdir(geminiHomePath(), { recursive: true });

    // Purge stale checkpoint/session dirs that crash gemini-cli 0.34.0's
    // cleanupCheckpoints() on startup (see postmortem for full context).
    await purgeGeminiEphemeralState(onLog);

    // Also purge /paperclip/.gemini/ if HOME differs from PAPERCLIP_HOME.
    // Earlier deploys used HOME=/paperclip; newer ones run as the `node` user
    // whose home is /home/node.  Stale checkpoints from the old HOME survive
    // on the Railway volume and crash gemini-cli's cleanup routine.
    const paperclipHome = process.env.PAPERCLIP_HOME;
    if (paperclipHome) {
      const legacyGeminiHome = path.join(paperclipHome, ".gemini");
      if (legacyGeminiHome !== geminiHomePath()) {
        await purgeGeminiEphemeralState(onLog, legacyGeminiHome);
        // Fix legacy projects.json if it exists with wrong format
        const legacyProjectsPath = path.join(legacyGeminiHome, "projects.json");
        try {
          const raw = await fs.readFile(legacyProjectsPath, "utf8");
          const parsed = JSON.parse(raw);
          if (!parsed.projects) {
            await fs.writeFile(legacyProjectsPath, '{"projects":{}}\n', "utf8");
            await onLog("stderr", `[paperclip] Fixed legacy projects.json format: ${legacyProjectsPath}\n`);
          }
        } catch {
          // File doesn't exist or isn't JSON — safe to ignore
        }
      }
    }

    // Ensure projects.json exists with the correct { projects: {} } structure.
    // gemini-cli 0.34.0 reads `parsed.projects` and crashes if it's undefined.
    try {
      const raw = await fs.readFile(projectsRegistryPath, "utf8");
      const parsed = JSON.parse(raw);
      if (!parsed.projects) {
        await fs.writeFile(projectsRegistryPath, '{"projects":{}}\n', "utf8");
        await onLog("stderr", `[paperclip] Fixed Gemini project registry format: ${projectsRegistryPath}\n`);
      }
    } catch {
      await fs.writeFile(projectsRegistryPath, '{"projects":{}}\n', "utf8");
      await onLog("stderr", `[paperclip] Initialized Gemini project registry: ${projectsRegistryPath}\n`);
    }

    let settings: Record<string, unknown> = {};
    try {
      const raw = await fs.readFile(settingsPath, "utf8");
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        settings = parsed as Record<string, unknown>;
      }
    } catch {
      // File missing or invalid JSON; start fresh.
    }

    const result = applyPaperclipGeminiSettings(settings, options);
    if (!result.changed) return;

    await fs.writeFile(settingsPath, JSON.stringify(result.settings, null, 2) + "\n", "utf8");
    for (const directory of result.trustedDirectoriesAdded) {
      await onLog("stderr", `[paperclip] Trusted Gemini directory: ${directory}\n`);
    }
    if (result.thoughtsOverrideChanged && options.suppressThoughtsModel?.trim()) {
      await onLog(
        "stderr",
        `[paperclip] Suppressed Gemini thought streaming for model: ${options.suppressThoughtsModel.trim()}\n`,
      );
    }
  } catch (err) {
    await onLog(
      "stderr",
      `[paperclip] Warning: could not update Gemini settings in ${settingsPath}: ${err instanceof Error ? err.message : String(err)}\n`,
    );
  }
}
