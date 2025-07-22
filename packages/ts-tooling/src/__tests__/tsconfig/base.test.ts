import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const getConfigPath = (config: string) => join(process.cwd(), "src", "tsconfig", `${config}.json`);

const readConfig = (config: string) => {
  const content = readFileSync(getConfigPath(config), "utf-8");
  return JSON.parse(content);
};

describe("Base TSConfig Configuration", () => {
  const baseConfig = readConfig("base");

  it("should extend @tsconfig/strictest", () => {
    expect(baseConfig.extends).toBe("@tsconfig/strictest");
  });

  it("should have required compiler options for modern TypeScript", () => {
    const { compilerOptions } = baseConfig;

    expect(compilerOptions).toBeDefined();
    expect(compilerOptions.noUncheckedSideEffectImports).toBe(true);
    expect(compilerOptions.incremental).toBe(true);
    expect(compilerOptions.forceConsistentCasingInFileNames).toBe(true);
  });

  it("should disable resolveJsonModule for strict mode", () => {
    const { compilerOptions } = baseConfig;
    expect(compilerOptions.resolveJsonModule).toBe(false);
  });

  it("should include JSON schema reference", () => {
    expect(baseConfig.$schema).toBe("https://json.schemastore.org/tsconfig");
  });

  it("should have all required strict options from @tsconfig/strictest", () => {
    // Since we extend @tsconfig/strictest, we inherit all strict options
    expect(baseConfig.extends).toBe("@tsconfig/strictest");

    // Our custom options should enhance the strict base
    const { compilerOptions } = baseConfig;
    expect(typeof compilerOptions).toBe("object");
    expect(compilerOptions).not.toBeNull();
  });
});
