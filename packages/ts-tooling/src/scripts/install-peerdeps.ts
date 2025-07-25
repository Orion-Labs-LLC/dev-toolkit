#!/usr/bin/env node
import { execSync } from "node:child_process";
import { copyFileSync, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type PackageManager = "pnpm" | "npm";

interface PackageJson {
  peerDependencies?: Record<string, string>;
}

export function findPackageRoot(startDir: string): string {
  let currentDir = startDir;

  while (currentDir !== path.dirname(currentDir)) {
    const packageJsonPath = path.join(currentDir, "package.json");
    if (existsSync(packageJsonPath)) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }

  throw new Error("Could not find package.json in any parent directory");
}

export function detectPackageManager(): PackageManager {
  try {
    // Use absolute path to avoid PATH injection risks
    const pnpmCommand = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
    // eslint-disable-next-line sonarjs/os-command
    execSync(`${pnpmCommand} --version`, { stdio: "ignore" });
    return "pnpm";
  } catch {
    console.log("pnpm not available, falling back to npm");
  }

  return "npm";
}

export function getInstallCommand(
  packageManager: PackageManager,
  packages: string[],
  isDevelopment = true,
): string {
  // Validate package names to prevent command injection
  const sanitizedPackages = packages.filter(pkg => {
    // Allow alphanumeric, @, /, -, _, ., ^, ~, and digits for semver
    return /^[@a-z0-9/_.-]+@[\^~]?\d+\.\d+\.\d+$/i.test(pkg);
  });

  if (sanitizedPackages.length !== packages.length) {
    throw new Error("Invalid package names detected");
  }

  let developmentFlag = "";
  if (isDevelopment) {
    developmentFlag = packageManager === "npm" ? "--save-dev" : "--D";
  }

  const baseCommand = packageManager === "pnpm" ? "pnpm add" : "npm install";
  return `${baseCommand} ${developmentFlag} ${sanitizedPackages.join(" ")}`.trim();
}

export function copyConfigFiles(): void {
  const packageRoot = findPackageRoot(__dirname);
  const sourcePrettierIgnore = path.join(packageRoot, "src", "prettier-config", ".prettierignore");
  const targetPrettierIgnore = path.join(process.cwd(), ".prettierignore");

  if (existsSync(sourcePrettierIgnore)) {
    try {
      copyFileSync(sourcePrettierIgnore, targetPrettierIgnore);
      console.log("✅ Copied .prettierignore to project root");
    } catch (error) {
      console.warn("⚠️ Failed to copy .prettierignore:", (error as Error).message);
    }
  } else {
    console.warn("⚠️ .prettierignore not found in package");
  }
}

export function main(): void {
  try {
    const packageRoot = findPackageRoot(__dirname);
    const packageJsonPath = path.join(packageRoot, "package.json");
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8")) as unknown as PackageJson;
    const peerDeps = packageJson.peerDependencies ?? {};

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

    // Execute command safely with validated input
    // eslint-disable-next-line sonarjs/os-command
    execSync(command, { stdio: "inherit" });
    console.log("✅ Peer dependencies installed successfully!");

    // Copy configuration files
    copyConfigFiles();
  } catch (error) {
    console.error("❌ Failed to install peer dependencies:", (error as Error).message);
    process.exit(1);
  }
}

// Only run main if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
