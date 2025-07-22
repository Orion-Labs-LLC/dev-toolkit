import type { TSESLint } from "@typescript-eslint/utils";
import { describe, expect, it } from "vitest";

import baseConfig from "../../eslint/base.js";

describe("Base ESLint Configuration", () => {
  it("should export a valid ESLint configuration array", () => {
    expect(Array.isArray(baseConfig)).toBe(true);
    expect(baseConfig.length).toBeGreaterThan(0);
  });

  it("should include TypeScript file patterns", () => {
    const tsConfig = baseConfig.find((config: TSESLint.FlatConfig.Config) =>
      config.files?.includes("**/*.{ts,tsx,mts}"),
    );
    expect(tsConfig).toBeDefined();
  });

  it("should configure consistent-type-imports rule", () => {
    const tsConfig = baseConfig.find(
      (config: TSESLint.FlatConfig.Config) =>
        config.files?.includes("**/*.{ts,tsx,mts}") && config.rules,
    ) as TSESLint.FlatConfig.Config;

    expect(tsConfig?.rules?.["@typescript-eslint/consistent-type-imports"]).toBeDefined();

    const rule = tsConfig?.rules?.["@typescript-eslint/consistent-type-imports"] as [
      string,
      object,
    ];
    expect(rule[0]).toBe("error");
    expect(rule[1]).toEqual({
      prefer: "type-imports",
      fixStyle: "inline-type-imports",
      disallowTypeAnnotations: false,
    });
  });

  it("should disable problematic unicorn rules", () => {
    const tsConfig = baseConfig.find(
      (config: TSESLint.FlatConfig.Config) =>
        config.files?.includes("**/*.{ts,tsx,mts}") && config.rules,
    ) as TSESLint.FlatConfig.Config;

    expect(tsConfig?.rules?.["unicorn/no-null"]).toBe("off");
    expect(tsConfig?.rules?.["unicorn/no-array-reduce"]).toBe("off");
    expect(tsConfig?.rules?.["unicorn/prevent-abbreviations"]).toBe("off");
  });

  it("should include ignored files configuration", () => {
    const ignoreConfig = baseConfig.find((config: TSESLint.FlatConfig.Config) => config.ignores);
    expect(ignoreConfig).toBeDefined();
    expect(ignoreConfig?.ignores).toContain("node_modules/**");
    expect(ignoreConfig?.ignores).toContain("dist/**");
    expect(ignoreConfig?.ignores).toContain(".next/**");
  });

  it("should configure JavaScript files separately", () => {
    const jsConfig = baseConfig.find((config: TSESLint.FlatConfig.Config) =>
      config.files?.includes("**/*.{js,mjs,cjs}"),
    );
    expect(jsConfig).toBeDefined();
  });

  it("should allow var-requires in config files", () => {
    const configFilesRule = baseConfig.find((config: TSESLint.FlatConfig.Config) =>
      config.files?.includes("**/*.config.{js,mjs,ts}"),
    );
    expect(configFilesRule?.rules?.["@typescript-eslint/no-var-requires"]).toBe("off");
  });
});
