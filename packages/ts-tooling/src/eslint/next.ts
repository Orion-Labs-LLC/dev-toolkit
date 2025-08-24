import nextPlugin from "@next/eslint-plugin-next";
import type { TSESLint } from "@typescript-eslint/utils";
import tseslint from "typescript-eslint";

import reactConfig from "./react.js";

const config: TSESLint.FlatConfig.ConfigArray = tseslint.config(
  ...reactConfig,

  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      //type assertions needed until Next.js provides proper TypeScript definitions for flat config :/
      //https://github.com/vercel/next.js/issues/82967
      ...(nextPlugin.configs.recommended.rules as Record<string, TSESLint.FlatConfig.RuleEntry>),
      ...(nextPlugin.configs["core-web-vitals"].rules as Record<
        string,
        TSESLint.FlatConfig.RuleEntry
      >),
    },
  },
);

export default config;
