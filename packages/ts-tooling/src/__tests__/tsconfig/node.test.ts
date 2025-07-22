import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const getConfigPath = (config: string) => join(process.cwd(), "src", "tsconfig", `${config}.json`);

const readConfig = (config: string) => {
  const content = readFileSync(getConfigPath(config), "utf-8");
  return JSON.parse(content);
};

describe("Node.js TSConfig Configuration", () => {
  const nodeConfig = readConfig("node");

  it("should extend base config and total-typescript Node config", () => {
    expect(Array.isArray(nodeConfig.extends)).toBe(true);
    expect(nodeConfig.extends).toContain("./base.json");
    expect(nodeConfig.extends).toContain("@total-typescript/tsconfig/bundler/no-dom/app");
  });

  it("should include Node.js types", () => {
    const { compilerOptions } = nodeConfig;
    expect(compilerOptions.types).toBeDefined();
    expect(compilerOptions.types).toContain("node");
  });

  it("should have minimal direct configuration", () => {
    const { compilerOptions } = nodeConfig;
    // Node config should be minimal, inheriting most from extended configs
    expect(Object.keys(compilerOptions)).toEqual(["types"]);
  });

  it("should exclude DOM types by using no-dom config", () => {
    // Ensures DOM types are excluded by extending the no-dom config
    expect(nodeConfig.extends).toContain("@total-typescript/tsconfig/bundler/no-dom/app");
  });

  it("should include JSON schema reference", () => {
    expect(nodeConfig.$schema).toBe("https://json.schemastore.org/tsconfig");
  });

  it("should inherit strict settings from base config", () => {
    // Since it extends base.json, it inherits all strict settings
    expect(nodeConfig.extends).toContain("./base.json");
  });

  it("should be server-side focused", () => {
    // Verified by extending the no-dom total-typescript config
    const noDomConfig = nodeConfig.extends.find((ext: string) => ext.includes("no-dom"));
    expect(noDomConfig).toBeDefined();
  });
});
