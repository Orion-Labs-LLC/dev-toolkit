#!/usr/bin/env node
import { createClaudeConfigFile, type ClaudeConfig } from "../src/index.mjs";

const defaultConfig: ClaudeConfig = {
  projectType: "typescript-library",
  includeSecurityScan: true,
  includeRefactorGuide: true,
  includeInfrastructureGuide: false,
};

const main = async (): Promise<void> => {
  const targetDirectory = process.cwd();

  try {
    await createClaudeConfigFile({
      targetDirectory,
      config: defaultConfig,
      overwrite: process.argv.includes("--overwrite"),
    });

    console.log("✅ Claude Code configuration files created successfully!");
    console.log(`📁 Created CLAUDE.md in ${targetDirectory}`);

    if (defaultConfig.includeInfrastructureGuide) {
      console.log(`📄 Created infrastructure.md in ${targetDirectory}`);
    }
  } catch (error) {
    console.error("❌ Error creating configuration files:", error);
    process.exit(1);
  }
};

void main();
