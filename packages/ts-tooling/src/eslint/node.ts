import type { TSESLint } from "@typescript-eslint/utils";
import globals from "globals";
import tseslint from "typescript-eslint";

import baseConfig from "./base.js";

const config: TSESLint.FlatConfig.ConfigArray = tseslint.config(...baseConfig, {
  files: ["**/*.{ts,mts,js,mjs,cjs}"],
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
  rules: {
    "unicorn/prefer-dom-node-text-content": "off", //DOM rules not needed in nodejs context
    "unicorn/prefer-query-selector": "off",
  },
});

export default config;
