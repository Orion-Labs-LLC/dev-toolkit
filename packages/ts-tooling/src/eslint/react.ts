// @ts-expect-error - No typedefs for this
import jsxAccessibilityPlugin from "eslint-plugin-jsx-a11y";
// @ts-expect-error - No typedefs for this
import tailwindPlugin from "eslint-plugin-tailwindcss";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import type { TSESLint } from "@typescript-eslint/utils";
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
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      tailwindcss: tailwindPlugin,
    },
    rules: {
      ...tailwindPlugin.configs.recommended.rules,
    },
    settings: {
      tailwindcss: {
        callees: ["cn", "cva"], //lint tailwind in cn or cva utils
      },
    },
  }
);

export default config;