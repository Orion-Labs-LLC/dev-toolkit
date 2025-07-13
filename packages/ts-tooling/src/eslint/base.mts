import eslint from "@eslint/js";
// @ts-expect-error - No typedefs for this
import securityPlugin from "eslint-plugin-security";
import sonarjs from "eslint-plugin-sonarjs";
import tseslint from "typescript-eslint";
import type { TSESLint } from "@typescript-eslint/utils";

const config: TSESLint.FlatConfig.ConfigArray = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  securityPlugin.configs.recommended,
  sonarjs.configs.recommended,
  
  {
    files: ["**/*.{ts,tsx, mts}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        },
      ],
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
          allowBoolean: true,
          allowAny: false,
          allowNullish: true,
          allowRegExp: true,
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
    },
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
  },

  {
    files: ["**/*.{js,mjs,cjs}"],
    ...tseslint.configs.disableTypeChecked,
  },

  {
    files: [
      "**/*.config.{js,mjs,ts}",
      "**/tailwind.config.{js,ts}",
      "**/next.config.{js,mjs}",
    ],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "import/no-anonymous-default-export": "off",
    },
  },

  {
    ignores: [
      ".eslintrc.js",
      ".eslintrc.mjs",
      ".prettierrc.js",
      ".prettierrc.mjs",
      "node_modules/**",
      "dist/**",
      "build/**",
      ".next/**",
      "out/**",
      "coverage/**",
      ".turbo/**",
      "eslint.config.mjs",
      "*.min.js",
    ],
  }
);

export default config;