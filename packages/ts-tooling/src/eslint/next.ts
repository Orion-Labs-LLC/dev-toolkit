/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
// External ESLint plugins lack proper TypeScript definitions

// @ts-expect-error - No typedefs for this
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
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
);

export default config;
