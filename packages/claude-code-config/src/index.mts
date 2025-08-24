import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const version = "1.0.0";

export type ProjectType = "typescript-library" | "web-application" | "api-service";

export interface ClaudeConfig {
  readonly projectType: ProjectType;
  readonly includeSecurityScan: boolean;
  readonly includeRefactorGuide: boolean;
  readonly includeInfrastructureGuide: boolean;
}

export interface SetupOptions {
  readonly targetDirectory: string;
  readonly config: ClaudeConfig;
  readonly overwrite?: boolean;
}

export const createClaudeConfigFile = async (options: SetupOptions): Promise<void> => {
  const { targetDirectory, config, overwrite = false } = options;

  const templatePath = path.join(__dirname, "../templates/claude.md");
  const infraTemplatePath = path.join(__dirname, "../templates/infrastructure.md");

  const claudeFilePath = path.join(targetDirectory, "CLAUDE.md");
  const infraFilePath = path.join(targetDirectory, "infrastructure.md");

  if (!overwrite && (await fileExists(claudeFilePath))) {
    throw new Error("CLAUDE.md already exists. Use --overwrite to replace it.");
  }

  await fs.copyFile(templatePath, claudeFilePath);

  if (config.includeInfrastructureGuide) {
    await fs.copyFile(infraTemplatePath, infraFilePath);
  }
};

const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};
