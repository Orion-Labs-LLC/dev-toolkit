#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, resolve);
  });
}

async function copyFile(source, destination) {
  try {
    // eslint-disable-next-line security/detect-non-literal-fs-filename -- Safe: path.dirname() on controlled destination path within CLI scope
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.copyFile(source, destination);
    console.log(`✓ Copied ${path.basename(source)} to ${destination}`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to copy ${path.basename(source)}: ${error.message}`);
    return false;
  }
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function promptYesNo(message) {
  while (true) {
    const answer = await question(`${message} (y/n): `);
    const normalized = answer.toLowerCase().trim();
    if (normalized === "y" || normalized === "yes") return true;
    if (normalized === "n" || normalized === "no") return false;
    console.log("Please answer with y/yes or n/no");
  }
}

async function init() {
  const arguments_ = process.argv.slice(2);
  // Filter out the bin command name if it's passed as an argument
  // This prevents creating an 'init' folder when users run: npx @boeschj/ide-tooling init
  const filteredArgument = arguments_.find(argument => argument !== "init");
  const targetDirectory = path.resolve(filteredArgument || process.cwd());

  console.log(`\n🚀 IDE Tooling Setup`);
  console.log(`Target directory: ${targetDirectory}\n`);

  const templatesDirectory = path.resolve(__dirname, "../templates");

  const availableConfigs = [
    {
      src: ".cursorrules",
      dest: ".cursorrules",
      description: "Cursor IDE rules and preferences",
    },
    {
      src: ".vscode/settings.json",
      dest: ".vscode/settings.json",
      description: "VS Code workspace settings",
    },
    {
      src: ".vscode/extensions.json",
      dest: ".vscode/extensions.json",
      description: "VS Code recommended extensions",
    },
    {
      src: ".github/workflows/ci.yml",
      dest: ".github/workflows/ci.yml",
      description: "GitHub Actions CI workflow",
    },
  ];

  const selectedConfigs = [];

  console.log("Select which configuration files to copy:\n");

  for (const config of availableConfigs) {
    const destinationPath = path.join(targetDirectory, config.dest);
    const exists = await fileExists(destinationPath);

    let prompt = `📁 ${config.dest} - ${config.description}`;
    if (exists) {
      prompt += " (will overwrite existing file)";
    }

    const shouldCopy = await promptYesNo(prompt);
    if (shouldCopy) {
      selectedConfigs.push(config);
    }
  }

  if (selectedConfigs.length === 0) {
    console.log("\n⚠ No files selected. Exiting...");
    rl.close();
    return;
  }

  console.log(`\n📋 Will copy ${selectedConfigs.length} file(s):`);
  for (const config of selectedConfigs) console.log(`  • ${config.dest}`);

  const confirm = await promptYesNo("\nProceed with copying?");
  if (!confirm) {
    console.log("❌ Operation cancelled.");
    rl.close();
    return;
  }

  console.log("\n🔄 Copying files...\n");

  let copiedCount = 0;

  for (const config of selectedConfigs) {
    const sourcePath = path.join(templatesDirectory, config.src);
    const destinationPath = path.join(targetDirectory, config.dest);

    const success = await copyFile(sourcePath, destinationPath);
    if (success) copiedCount++;
  }

  console.log(`\n✨ Setup complete!`);
  console.log(`📁 Successfully copied ${copiedCount}/${selectedConfigs.length} files`);

  if (selectedConfigs.some(c => c.dest.includes(".vscode"))) {
    console.log(`\n💡 Next steps:`);
    console.log(`1. Restart VS Code to apply new settings`);
    console.log(`2. Install recommended extensions when prompted`);
  }

  console.log(`3. For Claude AI configuration, use: npx @boeschj/claude-code-config claude-init`);

  rl.close();
}

try {
  await init();
} catch (error) {
  console.error("Error during setup:", error);
  rl.close();
  process.exit(1);
}
