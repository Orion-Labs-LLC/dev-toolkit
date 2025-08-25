/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
// External ESLint plugins lack proper TypeScript definitions

import type { TSESLint } from "@typescript-eslint/utils";
// @ts-expect-error - No typedefs for this
import jsxAccessibilityPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

import baseConfig from "./base.js";

const config: TSESLint.FlatConfig.ConfigArray = tseslint.config(
  ...baseConfig,

  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxAccessibilityPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxAccessibilityPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
    },
  },

  {
    files: ["**/*.tsx"],
    rules: {
      "sonarjs/no-nested-functions": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
);

export default config;
