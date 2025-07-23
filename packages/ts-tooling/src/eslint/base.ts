import eslint from "@eslint/js";
import type { TSESLint } from "@typescript-eslint/utils";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import securityPlugin from "eslint-plugin-security";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

const config: TSESLint.FlatConfig.ConfigArray = tseslint.config(
  eslint.configs.recommended, //basic JS rules
  tseslint.configs.strictTypeChecked, //strict TS rules that require type information
  tseslint.configs.stylisticTypeChecked, //stylistic type rules
  securityPlugin.configs.recommended, //security vulnerabilities
  sonarjs.configs.recommended, //code complexity and patterns
  unicorn.configs.recommended, //enforces modern JS usage and filename consistency
  eslintPluginPrettierRecommended, //enforce prettier config as lint rules
  {
    files: ["**/*.{ts,tsx,mts}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
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
          disallowTypeAnnotations: false,
        },
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
      "unicorn/no-null": "off", //conflict with type checking
      "unicorn/no-array-reduce": "off", //sometimes reduce is the best tool for the job 🤷‍♂️
      "unicorn/prevent-abbreviations": "off", //too opinionated
      "unicorn/prefer-node-protocol": "off", //forces us out of modern TS practices
      "security/detect-non-literal-fs-filename": "warn", //false positive in jsx
      "security/detect-object-injection": "warn", //triggers on some util functions,
      "unicorn/import-style": "off", //This rule enforces bad practice. named imports are preferred
    },
    //Disabled to mitigate an annoying warning about JSON module imports being an experimental feature
    // languageOptions: {
    //   parserOptions: {
    //     projectService: true,
    //   },
    // },
  },

  {
    files: ["**/*.{js,mjs,cjs}"],
    ...tseslint.configs.disableTypeChecked,
  },

  {
    files: ["**/*.config.{js,mjs,ts}", "**/tailwind.config.{js,ts}", "**/next.config.{js,mjs}"],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
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
  },
);

export default config;
