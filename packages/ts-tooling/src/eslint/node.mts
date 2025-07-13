import tseslint from "typescript-eslint";
import type { TSESLint } from "@typescript-eslint/utils";
import baseConfig from "./base.mts";

const config: TSESLint.FlatConfig.ConfigArray = tseslint.config(
  ...baseConfig,
  {
    files: ["**/*.{ts,mts}"],
    rules: {
      "unicorn/prefer-dom-node-text-content": "off", //DOM rules not needed in nodejs context
    "unicorn/prefer-query-selector": "off"
    },
  }
);

export default config;