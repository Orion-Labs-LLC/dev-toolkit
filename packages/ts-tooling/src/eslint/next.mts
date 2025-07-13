// @ts-expect-error - No typedefs for this
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";
import type { TSESLint } from "@typescript-eslint/utils";
import reactConfig from "./react.mts";

const config: TSESLint.FlatConfig.ConfigArray = tseslint.config(
  ...reactConfig,

  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  }
);

export default config;