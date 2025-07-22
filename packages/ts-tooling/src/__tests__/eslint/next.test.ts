import type { TSESLint } from "@typescript-eslint/utils";
import { describe, expect, it } from "vitest";

import nextConfig from "../../eslint/next.js";

describe("Next.js ESLint Configuration", () => {
  it("should export a valid ESLint configuration array", () => {
    expect(Array.isArray(nextConfig)).toBe(true);
    expect(nextConfig.length).toBeGreaterThan(0);
  });

  it("should include React configuration", () => {
    // Next config extends React config, so should include React rules
    const reactPluginConfig = nextConfig.find(
      (config: TSESLint.FlatConfig.Config) => config.plugins?.react,
    );
    expect(reactPluginConfig).toBeDefined();
  });

  it("should configure Next.js plugin", () => {
    const nextPluginConfig = nextConfig.find(
      (config: TSESLint.FlatConfig.Config) => config.plugins?.["@next/next"],
    );
    expect(nextPluginConfig).toBeDefined();
    expect(nextPluginConfig?.plugins?.["@next/next"]).toBeDefined();
  });

  it("should include Next.js recommended and core-web-vitals rules", () => {
    const nextPluginConfig = nextConfig.find(
      (config: TSESLint.FlatConfig.Config) => config.plugins?.["@next/next"] && config.rules,
    );
    expect(nextPluginConfig?.rules).toBeDefined();
    // We can't test exact rules since they're spread from the plugin configs
    // but we can ensure the configuration exists
    expect(Object.keys(nextPluginConfig?.rules || {})).not.toHaveLength(0);
  });

  it("should target TypeScript and TSX files", () => {
    const nextPluginConfig = nextConfig.find(
      (config: TSESLint.FlatConfig.Config) => config.plugins?.["@next/next"],
    );
    expect(nextPluginConfig?.files).toContain("**/*.{ts,tsx}");
  });

  it("should inherit base and React configurations", () => {
    // Should include base TypeScript rules
    const tsConfig = nextConfig.find(
      (config: TSESLint.FlatConfig.Config) =>
        config.rules?.["@typescript-eslint/consistent-type-imports"],
    );
    expect(tsConfig).toBeDefined();

    // Should include React rules
    const reactRules = nextConfig.find(
      (config: TSESLint.FlatConfig.Config) => config.rules?.["react/react-in-jsx-scope"],
    );
    expect(reactRules).toBeDefined();
  });
});
