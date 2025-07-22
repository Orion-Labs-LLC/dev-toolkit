#!/usr/bin/env node
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function detectPackageManager() {
  try {
    // eslint-disable-next-line sonarjs/no-os-command-from-path -- Safe: checking package manager availability with hardcoded command
    execSync("pnpm --version", { stdio: "ignore" });
    return "pnpm";
  } catch {
    console.log("pnpm not available, falling back to npm");
  }

  return "npm";
}

function getInstallCommand(packageManager, packages, isDevelopment = true) {
  let developmentFlag = "";
  if (isDevelopment) {
    developmentFlag = packageManager === "npm" ? "--save-dev" : "--D";
  }

  if (packageManager === "pnpm") {
    return `pnpm add ${developmentFlag} ${packages.join(" ")}`;
  }
  return `npm install ${developmentFlag} ${packages.join(" ")}`;
}

function main() {
  try {
    // Read package.json to get peer dependencies
    const packageJsonPath = path.join(__dirname, "..", "package.json");
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
    const peerDeps = packageJson.peerDependencies || {};

    // Get all peer dependency packages with versions
    const packages = Object.entries(peerDeps).map(([name, version]) => `${name}@${version}`);

    if (packages.length === 0) {
      console.log("No peer dependencies found.");
      return;
    }

    const packageManager = detectPackageManager();
    console.log(`Detected package manager: ${packageManager}`);
    console.log(`Installing peer dependencies: ${Object.keys(peerDeps).join(", ")}`);

    const command = getInstallCommand(packageManager, packages, true);
    console.log(`Running: ${command}`);

    // eslint-disable-next-line sonarjs/os-command -- Safe: executing package manager command with controlled input from package.json
    execSync(command, { stdio: "inherit" });
    console.log("✅ Peer dependencies installed successfully!");
  } catch (error) {
    console.error("❌ Failed to install peer dependencies:", error.message);
    process.exit(1);
  }
}

main();
